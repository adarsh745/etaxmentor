import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/db'

// Get specific ITR filing
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }
    
    const { id } = await params
    
    const filing = await prisma.iTRFiling.findFirst({
      where: {
        id,
        userId: user.id,
      },
    })
    
    if (!filing) {
      return NextResponse.json(
        { error: 'ITR filing not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      {
        filing: {
          ...filing,
          grossIncome: filing.grossIncome?.toString(),
          taxableIncome: filing.taxableIncome?.toString(),
          totalDeductions: filing.totalDeductions?.toString(),
          taxPayable: filing.taxPayable?.toString(),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get ITR filing error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ITR filing' },
      { status: 500 }
    )
  }
}

// Update ITR filing
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }
    
    const { id } = await params
    const body = await request.json()
    
    // Find existing filing
    const existingFiling = await prisma.iTRFiling.findFirst({
      where: {
        id,
        userId: user.id,
      },
    })
    
    if (!existingFiling) {
      return NextResponse.json(
        { error: 'ITR filing not found' },
        { status: 404 }
      )
    }
    
    // Only allow updates if status is DRAFT, DOCUMENTS_PENDING, or REVISION_REQUIRED
    if (!['DRAFT', 'DOCUMENTS_PENDING', 'REVISION_REQUIRED'].includes(existingFiling.status)) {
      return NextResponse.json(
        { error: 'Cannot update filing in current status' },
        { status: 400 }
      )
    }
    
    // Recalculate if income data changed
    const formData = body.formData || existingFiling.formData
    const totalIncome = 
      (formData.salaryIncome || 0) +
      (formData.housePropertyIncome || 0) +
      (formData.capitalGains || 0) +
      (formData.businessIncome || 0) +
      (formData.otherIncome || 0)
    
    const totalDeductions = 
      (formData.section80C || 0) +
      (formData.section80D || 0) +
      (formData.section80G || 0) +
      (formData.homeLoanInterest || 0)
    
    const taxableIncome = Math.max(0, totalIncome - totalDeductions)
    
    let taxAmount = 0
    if (taxableIncome > 1000000) {
      taxAmount = 112500 + (taxableIncome - 1000000) * 0.30
    } else if (taxableIncome > 500000) {
      taxAmount = 12500 + (taxableIncome - 500000) * 0.20
    } else if (taxableIncome > 250000) {
      taxAmount = (taxableIncome - 250000) * 0.05
    }
    
    // Update filing
    const filing = await prisma.iTRFiling.update({
      where: { id },
      data: {
        formData,
        grossIncome: totalIncome ? parseFloat(totalIncome.toString()) : null,
        totalDeductions: totalDeductions ? parseFloat(totalDeductions.toString()) : null,
        taxableIncome: taxableIncome ? parseFloat(taxableIncome.toString()) : null,
        taxPayable: taxAmount ? parseFloat(taxAmount.toString()) : null,
        status: body.submitForReview ? 'UNDER_REVIEW' : existingFiling.status,
      },
    })
    
    // Log activity
    try {
      await prisma.activityLog.create({
        data: {
          userId: user.id,
          action: body.submitForReview ? 'ITR_UPDATE' : 'ITR_UPDATE',
          description: body.submitForReview 
            ? `Submitted ITR filing for AY ${filing.assessmentYear}` 
            : `Updated ITR filing for AY ${filing.assessmentYear}`,
          metadata: { filingId: filing.id },
        },
      })
    } catch (logError) {
      console.error('Error logging activity:', logError)
    }
    
    return NextResponse.json(
      { 
        message: body.submitForReview ? 'ITR filing submitted for review' : 'ITR filing updated',
        filing: {
          ...filing,
          grossIncome: filing.grossIncome?.toString(),
          taxableIncome: filing.taxableIncome?.toString(),
          totalDeductions: filing.totalDeductions?.toString(),
          taxPayable: filing.taxPayable?.toString(),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Update ITR filing error:', error)
    return NextResponse.json(
      { error: 'Failed to update ITR filing' },
      { status: 500 }
    )
  }
}

// Delete ITR filing
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }
    
    const { id } = await params
    
    // Find existing filing
    const existingFiling = await prisma.iTRFiling.findFirst({
      where: {
        id,
        userId: user.id,
      },
    })
    
    if (!existingFiling) {
      return NextResponse.json(
        { error: 'ITR filing not found' },
        { status: 404 }
      )
    }
    
    // Only allow deletion if status is DRAFT
    if (existingFiling.status !== 'DRAFT') {
      return NextResponse.json(
        { error: 'Cannot delete filing that has been submitted' },
        { status: 400 }
      )
    }
    
    await prisma.iTRFiling.delete({ where: { id } })
    
    return NextResponse.json(
      { message: 'ITR filing deleted' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Delete ITR filing error:', error)
    return NextResponse.json(
      { error: 'Failed to delete ITR filing' },
      { status: 500 }
    )
  }
}
