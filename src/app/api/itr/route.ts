import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { itrFilingSchema } from '@/lib/validations'

// Get user's ITR filings
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
    const assessmentYear = searchParams.get('assessmentYear')
    
    const filings = await prisma.iTRFiling.findMany({
      where: {
        userId: user.id,
        ...(status && { status: status as any }),
        ...(assessmentYear && { assessmentYear }),
      },
      orderBy: { createdAt: 'desc' },
    })
    
    return NextResponse.json({ filings }, { status: 200 })
  } catch (error) {
    console.error('Get ITR filings error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ITR filings' },
      { status: 500 }
    )
  }
}

// Create new ITR filing
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
    
    // Validate input
    const validatedData = itrFilingSchema.safeParse(body)
    
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validatedData.error.flatten() },
        { status: 400 }
      )
    }
    
    const data = validatedData.data
    
    // Calculate total income and tax (simplified)
    const totalIncome = 
      (data.salaryIncome || 0) +
      (data.housePropertyIncome || 0) +
      (data.capitalGains || 0) +
      (data.businessIncome || 0) +
      (data.otherIncome || 0)
    
    const totalDeductions = 
      (data.section80C || 0) +
      (data.section80D || 0) +
      (data.section80G || 0) +
      (data.homeLoanInterest || 0)
    
    const taxableIncome = Math.max(0, totalIncome - totalDeductions)
    
    // Simple tax calculation (Old Regime for demo)
    let taxAmount = 0
    if (taxableIncome > 1000000) {
      taxAmount = 112500 + (taxableIncome - 1000000) * 0.30
    } else if (taxableIncome > 500000) {
      taxAmount = 12500 + (taxableIncome - 500000) * 0.20
    } else if (taxableIncome > 250000) {
      taxAmount = (taxableIncome - 250000) * 0.05
    }
    
    // Create filing
    const filing = await prisma.iTRFiling.create({
      data: {
        userId: user.id,
        financialYear: data.assessmentYear.split('-')[0] + '-' + (parseInt(data.assessmentYear.split('-')[0]) + 1).toString().slice(-2),
        assessmentYear: data.assessmentYear,
        itrType: data.itrType,
        pan: data.panNumber,
        grossIncome: totalIncome.toString(),
        totalDeductions: totalDeductions.toString(),
        taxableIncome: taxableIncome.toString(),
        taxPayable: taxAmount.toString(),
        formData: data as any,
        status: body.status || 'DRAFT',
      },
    })
    
    // Log activity
    try {
      await prisma.activityLog.create({
        data: {
          userId: user.id,
          action: 'ITR_CREATE',
          description: `Created ITR filing for AY ${data.assessmentYear}`,
          metadata: { filingId: filing.id, itrType: data.itrType },
        },
      })
    } catch (logError) {
      console.error('Error logging activity:', logError)
      // Don't fail the entire operation if logging fails
    }
    
    return NextResponse.json(
      { 
        message: 'ITR filing created successfully',
        filing: {
          id: filing.id,
          assessmentYear: filing.assessmentYear,
          itrType: filing.itrType,
          status: filing.status,
          totalIncome: filing.totalIncome,
          taxPayable: filing.taxPayable,
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create ITR filing error:', error)
    return NextResponse.json(
      { error: 'Failed to create ITR filing' },
      { status: 500 }
    )
  }
}
