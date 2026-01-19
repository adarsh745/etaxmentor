import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/db'

// Get user's GST filings
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }
    
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const returnType = searchParams.get('returnType')
    
    const filings = await prisma.gSTFiling.findMany({
      where: {
        userId: user.id,
        ...(status && { status: status as any }),
        ...(returnType && { returnType }),
      },
      orderBy: { createdAt: 'desc' },
    })
    
    // Convert Decimal fields to strings for JSON response
    const serializedFilings = filings.map(filing => ({
      ...filing,
      totalSales: filing.totalSales?.toString(),
      totalPurchases: filing.totalPurchases?.toString(),
      igst: filing.igst?.toString(),
      cgst: filing.cgst?.toString(),
      sgst: filing.sgst?.toString(),
      itcClaimed: filing.itcClaimed?.toString(),
      taxPayable: filing.taxPayable?.toString(),
    }))
    
    return NextResponse.json({ filings: serializedFilings }, { status: 200 })
  } catch (error) {
    console.error('Get GST filings error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GST filings' },
      { status: 500 }
    )
  }
}

// Create new GST filing
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    
    // Calculate totals from form data
    const formData = body.formData || {}
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

    // Extract financial year from period
    const currentYear = new Date().getFullYear()
    const financialYear = body.period?.includes('2026') ? '2025-26' : `${currentYear-1}-${currentYear.toString().slice(2)}`
    
    // Create filing
    const filing = await prisma.gSTFiling.create({
      data: {
        userId: user.id,
        gstin: body.gstin,
        tradeName: body.tradeName,
        returnType: body.returnType,
        period: body.period,
        financialYear,
        status: body.status || 'DRAFT',
        totalSales: totalSales ? parseFloat(totalSales.toString()) : null,
        totalPurchases: totalPurchases ? parseFloat(totalPurchases.toString()) : null,
        igst: formData.igst ? parseFloat(formData.igst.toString()) : null,
        cgst: formData.cgst ? parseFloat(formData.cgst.toString()) : null,
        sgst: formData.sgst ? parseFloat(formData.sgst.toString()) : null,
        itcClaimed: formData.itcClaimed ? parseFloat(formData.itcClaimed.toString()) : null,
        taxPayable: taxPayable ? parseFloat(taxPayable.toString()) : null,
        formData: body.formData,
        remarks: body.remarks,
      },
    })
    
    // Log activity
    try {
      await prisma.activityLog.create({
        data: {
          userId: user.id,
          action: 'GST_CREATE',
          description: `Created GST filing: ${filing.returnType} for ${filing.period}`,
          metadata: {
            filingId: filing.id,
            returnType: filing.returnType,
            period: filing.period,
          },
        },
      })
    } catch (logError) {
      console.error('Error logging activity:', logError)
    }
    
    return NextResponse.json(
      { 
        message: 'GST filing created successfully',
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
      { status: 201 }
    )
  } catch (error) {
    console.error('Create GST filing error:', error)
    return NextResponse.json(
      { error: 'Failed to create GST filing' },
      { status: 500 }
    )
  }
}
