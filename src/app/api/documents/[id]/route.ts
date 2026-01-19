import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { unlink, readFile } from 'fs/promises'
// import path from 'path'

const prisma = new PrismaClient()

// Mock user ID for development - replace with real auth
const MOCK_USER_ID = 'user_123'

// Document update validation schema
const documentUpdateSchema = z.object({
  status: z.enum(['UPLOADED', 'VERIFIED', 'REJECTED', 'PROCESSING']).optional(),
  rejectionReason: z.string().optional(),
  verifiedBy: z.string().optional(),
  type: z.enum([
    'PAN_CARD', 'AADHAAR', 'FORM_16', 'FORM_26AS', 'AIS_TIS',
    'BANK_STATEMENT', 'INVESTMENT_PROOF', 'SALARY_SLIP', 'CAPITAL_GAINS',
    'RENTAL_AGREEMENT', 'LOAN_CERTIFICATE', 'GST_CERTIFICATE', 'OTHER'
  ]).optional(),
  financialYear: z.string().optional(),
  assessmentYear: z.string().optional(),
})

// GET - Get single document details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const document = await prisma.document.findFirst({
      where: {
        id,
        userId: MOCK_USER_ID,
      },
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
        verifiedBy: true,
        rejectionReason: true,
        createdAt: true,
        updatedAt: true,
        path: true,
      },
    })

    if (!document) {
      return NextResponse.json(
        { success: false, message: 'Document not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      document,
    })

  } catch (error) {
    console.error('Document GET Error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch document' },
      { status: 500 }
    )
  }
}

// PATCH - Update document
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    // Validate update data
    const updateData = documentUpdateSchema.parse(body)

    // Check if document exists and belongs to user
    const existingDoc = await prisma.document.findFirst({
      where: {
        id,
        userId: MOCK_USER_ID,
      },
    })

    if (!existingDoc) {
      return NextResponse.json(
        { success: false, message: 'Document not found' },
        { status: 404 }
      )
    }

    // Prepare update data
    const updateFields: any = { ...updateData }

    // Add verification timestamp if status is being changed to VERIFIED
    if (updateData.status === 'VERIFIED' && existingDoc.status !== 'VERIFIED') {
      updateFields.verifiedAt = new Date()
    }

    // Clear rejection reason if status is not REJECTED
    if (updateData.status && updateData.status !== 'REJECTED') {
      updateFields.rejectionReason = null
    }

    // Update document
    const document = await prisma.document.update({
      where: { id },
      data: updateFields,
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
        verifiedBy: true,
        rejectionReason: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Document updated successfully',
      document,
    })

  } catch (error) {
    console.error('Document UPDATE Error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Invalid update data', errors: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, message: 'Failed to update document' },
      { status: 500 }
    )
  }
}

// DELETE - Delete document
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Find document
    const document = await prisma.document.findFirst({
      where: {
        id,
        userId: MOCK_USER_ID,
      },
    })

    if (!document) {
      return NextResponse.json(
        { success: false, message: 'Document not found' },
        { status: 404 }
      )
    }

    // Don't allow deletion of verified documents
    if (document.status === 'VERIFIED') {
      return NextResponse.json(
        { success: false, message: 'Cannot delete verified documents' },
        { status: 400 }
      )
    }

    // Delete file from filesystem
    try {
      await unlink(document.path)
    } catch (fileError) {
      console.warn('Failed to delete file from filesystem:', fileError)
      // Continue with database deletion even if file deletion fails
    }

    // Delete from database
    await prisma.document.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: 'Document deleted successfully',
    })

  } catch (error) {
    console.error('Document DELETE Error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete document' },
      { status: 500 }
    )
  }
}

// Helper function to serve document file (for download endpoint)
export async function handleDownload(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Find document
    const document = await prisma.document.findFirst({
      where: {
        id,
        userId: MOCK_USER_ID,
      },
    })

    if (!document) {
      return NextResponse.json(
        { success: false, message: 'Document not found' },
        { status: 404 }
      )
    }

    // Read file
    const fileBuffer = await readFile(document.path)
    
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': document.mimeType,
        'Content-Length': document.size.toString(),
        'Content-Disposition': `attachment; filename="${document.originalName}"`,
      },
    })

  } catch (error) {
    console.error('Document Download Error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to download document' },
      { status: 500 }
    )
  }
}