import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

// Document upload validation schema
const documentUploadSchema = z.object({
  type: z.enum([
    'PAN_CARD', 'AADHAAR', 'FORM_16', 'FORM_26AS', 'AIS_TIS',
    'BANK_STATEMENT', 'INVESTMENT_PROOF', 'SALARY_SLIP', 'CAPITAL_GAINS',
    'RENTAL_AGREEMENT', 'LOAN_CERTIFICATE', 'GST_CERTIFICATE', 'OTHER'
  ]),
  financialYear: z.string().optional(),
  assessmentYear: z.string().optional(),
})

// Document query filters
const documentQuerySchema = z.object({
  type: z.string().optional(),
  status: z.enum(['UPLOADED', 'VERIFIED', 'REJECTED', 'PROCESSING']).optional(),
  financialYear: z.string().optional(),
  search: z.string().optional(),
  page: z.string().default('1'),
  limit: z.string().default('50'),
})

// Mock user ID for development - replace with real auth
const MOCK_USER_ID = 'user_123'

// GET - List user documents
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = documentQuerySchema.parse({
      type: searchParams.get('type') || undefined,
      status: searchParams.get('status') as any || undefined,
      financialYear: searchParams.get('financialYear') || undefined,
      search: searchParams.get('search') || undefined,
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '50',
    })

    const page = parseInt(query.page)
    const limit = parseInt(query.limit)
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      userId: MOCK_USER_ID,
    }

    if (query.type) {
      where.type = query.type
    }

    if (query.status) {
      where.status = query.status
    }

    if (query.financialYear) {
      where.financialYear = query.financialYear
    }

    if (query.search) {
      where.OR = [
        { fileName: { contains: query.search, mode: 'insensitive' } },
        { originalName: { contains: query.search, mode: 'insensitive' } },
      ]
    }

    // Get documents with pagination
    const [documents, total] = await Promise.all([
      prisma.document.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          fileName: true,
          originalName: true,
          mimeType: true,
          size: true,
          type: true,
          status: true,
          financialYear: true,
          assessmentYear: true,
          verifiedAt: true,
          rejectionReason: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.document.count({ where }),
    ])

    // Get summary statistics
    const stats = await prisma.document.groupBy({
      by: ['status'],
      where: { userId: MOCK_USER_ID },
      _count: { id: true },
    })

    const statusStats = {
      total: total,
      uploaded: stats.find(s => s.status === 'UPLOADED')?._count.id || 0,
      verified: stats.find(s => s.status === 'VERIFIED')?._count.id || 0,
      rejected: stats.find(s => s.status === 'REJECTED')?._count.id || 0,
      processing: stats.find(s => s.status === 'PROCESSING')?._count.id || 0,
    }

    return NextResponse.json({
      success: true,
      documents,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      stats: statusStats,
    })

  } catch (error) {
    console.error('Documents API Error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid query parameters', errors: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, message: 'Failed to fetch documents' },
      { status: 500 }
    )
  }
}

// POST - Upload document
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string
    const financialYear = formData.get('financialYear') as string
    const assessmentYear = formData.get('assessmentYear') as string

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate document metadata
    const metadata = documentUploadSchema.parse({
      type,
      financialYear: financialYear || undefined,
      assessmentYear: assessmentYear || undefined,
    })

    // Validate file
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, message: 'File too large. Maximum size is 10MB' },
        { status: 400 }
      )
    }

    // Allowed file types
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/jpg',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: 'Invalid file type. Only PDF, images, and Excel files are allowed' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const fileExtension = path.extname(file.name)
    const fileName = `${uuidv4()}${fileExtension}`
    const uploadDir = path.join(process.cwd(), 'uploads', MOCK_USER_ID)
    const filePath = path.join(uploadDir, fileName)

    // Create upload directory if it doesn't exist
    await mkdir(uploadDir, { recursive: true })

    // Save file
    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(filePath, buffer)

    // Save document record to database
    const document = await prisma.document.create({
      data: {
        userId: MOCK_USER_ID,
        fileName,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        path: filePath,
        type: metadata.type,
        financialYear: metadata.financialYear,
        assessmentYear: metadata.assessmentYear,
        status: 'UPLOADED',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Document uploaded successfully',
      document: {
        id: document.id,
        fileName: document.fileName,
        originalName: document.originalName,
        type: document.type,
        size: document.size,
        status: document.status,
        createdAt: document.createdAt,
      },
    })

  } catch (error) {
    console.error('Document Upload Error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid document data', errors: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, message: 'Failed to upload document' },
      { status: 500 }
    )
  }
}