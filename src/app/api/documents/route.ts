import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { randomUUID } from 'crypto'

// Force dynamic rendering to avoid build-time execution
export const dynamic = 'force-dynamic'

/* ---------------------------------- */
/* ZOD SCHEMAS */
/* ---------------------------------- */

// Document upload validation
const documentUploadSchema = z.object({
  type: z.enum([
    'PAN_CARD',
    'AADHAAR',
    'FORM_16',
    'FORM_26AS',
    'AIS_TIS',
    'BANK_STATEMENT',
    'INVESTMENT_PROOF',
    'SALARY_SLIP',
    'CAPITAL_GAINS',
    'RENTAL_AGREEMENT',
    'LOAN_CERTIFICATE',
    'GST_CERTIFICATE',
    'OTHER',
  ]),
  financialYear: z.string().optional(),
  assessmentYear: z.string().optional(),
})

// Query filters
const documentQuerySchema = z.object({
  type: z.string().optional(),
  status: z.enum(['UPLOADED', 'VERIFIED', 'REJECTED', 'PROCESSING']).optional(),
  financialYear: z.string().optional(),
  search: z.string().optional(),
  page: z.string().default('1'),
  limit: z.string().default('50'),
})

// ⚠️ Replace with real auth later
const MOCK_USER_ID = 'user_123'

/* ---------------------------------- */
/* GET – LIST DOCUMENTS */
/* ---------------------------------- */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const query = documentQuerySchema.parse({
      type: searchParams.get('type') || undefined,
      status: searchParams.get('status') || undefined,
      financialYear: searchParams.get('financialYear') || undefined,
      search: searchParams.get('search') || undefined,
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '50',
    })

    const page = Number(query.page)
    const limit = Number(query.limit)
    const skip = (page - 1) * limit

    const where: any = { userId: MOCK_USER_ID }

    if (query.type) where.type = query.type
    if (query.status) where.status = query.status
    if (query.financialYear) where.financialYear = query.financialYear

    if (query.search) {
      where.OR = [
        { fileName: { contains: query.search, mode: 'insensitive' } },
        { originalName: { contains: query.search, mode: 'insensitive' } },
      ]
    }

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

    const stats = await prisma.document.groupBy({
      by: ['status'],
      where: { userId: MOCK_USER_ID },
      _count: { id: true },
    })

    const statusStats = {
      total,
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
    console.error('Documents GET Error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid query parameters', errors: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Failed to fetch documents' },
      { status: 500 }
    )
  }
}

/* ---------------------------------- */
/* POST – UPLOAD DOCUMENT */
/* ---------------------------------- */

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const file = formData.get('file') as File | null
    const type = formData.get('type') as string
    const financialYear = formData.get('financialYear') as string
    const assessmentYear = formData.get('assessmentYear') as string

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      )
    }

    const metadata = documentUploadSchema.parse({
      type,
      financialYear: financialYear || undefined,
      assessmentYear: assessmentYear || undefined,
    })

    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, message: 'File too large (max 10MB)' },
        { status: 400 }
      )
    }

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
        { success: false, message: 'Invalid file type' },
        { status: 400 }
      )
    }

    const fileExtension = path.extname(file.name)
    const fileName = `${randomUUID()}${fileExtension}`
    const uploadDir = path.join(process.cwd(), 'uploads', MOCK_USER_ID)
    const filePath = path.join(uploadDir, fileName)

    await mkdir(uploadDir, { recursive: true })

    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(filePath, buffer)

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
    console.error('Document POST Error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid document data', errors: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Failed to upload document' },
      { status: 500 }
    )
  }
}
