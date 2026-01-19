import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/db'

// Get specific GST filing
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
    
    const filing = await prisma.gSTFiling.findFirst({
      where: {
        id,
        userId: user.id,
      },
    })
    
    if (!filing) {
      return NextResponse.json(
        { error: 'GST filing not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      {
        filing: {
          ...filing,
          totalSales: filing.totalSales?.toString(),
          totalPurchases: filing.totalPurchases?.toString(),
          igst: filing.igst?.toString(),
          cgst: filing.cgst?.toString(),
          sgst: filing.sgst?.toString(),
          itcClaimed: filing.itcClaimed?.toString(),
          taxPayable: filing.taxPayable?.toString(),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get GST filing error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GST filing' },
      { status: 500 }
    )
  }
}

// Update GST filing
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
    const existingFiling = await prisma.gSTFiling.findFirst({
      where: {
        id,
        userId: user.id,
      },
    })
    
    if (!existingFiling) {
      return NextResponse.json(
        { error: 'GST filing not found' },
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
    
    // Recalculate totals
    const formData = body.formData || existingFiling.formData
    const totalSales = 
      (formData.b2bSales || 0) +
      (formData.b2cSales || 0) +
      (formData.exportSales || 0) +
      (formData.exemptSales || 0)

    const totalPurchases = 
      (formData.purchases || 0) +
      (formData.importPurchases || 0)

    const totalTax = 
      (formData.igst || 0) +
      (formData.cgst || 0) +
      (formData.sgst || 0)

    const taxPayable = Math.max(0, totalTax - (formData.itcClaimed || 0))
    
    // Update filing
    const filing = await prisma.gSTFiling.update({
      where: { id },
      data: {
        formData,
        totalSales: totalSales ? parseFloat(totalSales.toString()) : null,
        totalPurchases: totalPurchases ? parseFloat(totalPurchases.toString()) : null,
        igst: formData.igst ? parseFloat(formData.igst.toString()) : null,
        cgst: formData.cgst ? parseFloat(formData.cgst.toString()) : null,
        sgst: formData.sgst ? parseFloat(formData.sgst.toString()) : null,
        itcClaimed: formData.itcClaimed ? parseFloat(formData.itcClaimed.toString()) : null,
        taxPayable: taxPayable ? parseFloat(taxPayable.toString()) : null,
        status: body.submitForReview ? 'UNDER_REVIEW' : existingFiling.status,
        remarks: body.remarks,
      },
    })
    
    // Log activity
    try {
      await prisma.activityLog.create({
        data: {
          userId: user.id,
          action: 'GST_SUBMIT',
          description: body.submitForReview 
            ? `Submitted GST filing for ${filing.period}` 
            : `Updated GST filing for ${filing.period}`,
          metadata: { filingId: filing.id },
        },
      })
    } catch (logError) {
      console.error('Error logging activity:', logError)
    }
    
    return NextResponse.json(
      { 
        message: body.submitForReview ? 'GST filing submitted for review' : 'GST filing updated',
        filing: {
          ...filing,
          totalSales: filing.totalSales?.toString(),
          totalPurchases: filing.totalPurchases?.toString(),
          igst: filing.igst?.toString(),
          cgst: filing.cgst?.toString(),
          sgst: filing.sgst?.toString(),
          itcClaimed: filing.itcClaimed?.toString(),
          taxPayable: filing.taxPayable?.toString(),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Update GST filing error:', error)
    return NextResponse.json(
      { error: 'Failed to update GST filing' },
      { status: 500 }
    )
  }
}

// Delete GST filing
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
    const existingFiling = await prisma.gSTFiling.findFirst({
      where: {
        id,
        userId: user.id,
      },
    })
    
    if (!existingFiling) {
      return NextResponse.json(
        { error: 'GST filing not found' },
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
    
    await prisma.gSTFiling.delete({ where: { id } })
    
    return NextResponse.json(
      { message: 'GST filing deleted' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Delete GST filing error:', error)
    return NextResponse.json(
      { error: 'Failed to delete GST filing' },
      { status: 500 }
    )
  }
}