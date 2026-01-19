import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/db'

// Get user dashboard data
export async function GET() {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }
    
    // Get counts
    const [
      itrFilings,
      gstFilings,
      documents,
      recentActivity,
      pendingItr,
      pendingGst,
    ] = await Promise.all([
      prisma.iTRFiling.count({ where: { userId: user.id } }),
      prisma.gSTFiling.count({ where: { userId: user.id } }),
      prisma.document.count({ where: { userId: user.id } }),
      prisma.activityLog.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: {
          id: true,
          action: true,
          description: true,
          createdAt: true,
        },
      }),
      prisma.iTRFiling.count({
        where: { 
          userId: user.id,
          status: { in: ['DRAFT', 'SUBMITTED', 'IN_PROGRESS', 'REVISION_REQUIRED'] }
        }
      }),
      prisma.gSTFiling.count({
        where: { 
          userId: user.id,
          status: { in: ['DRAFT', 'SUBMITTED', 'IN_PROGRESS', 'REVISION_REQUIRED'] }
        }
      }),
    ])
    
    // Get recent filings
    const recentItrFilings = await prisma.iTRFiling.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        assessmentYear: true,
        itrType: true,
        status: true,
        totalIncome: true,
        taxPayable: true,
        createdAt: true,
      },
    })
    
    const recentGstFilings = await prisma.gSTFiling.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        gstin: true,
        returnType: true,
        period: true,
        status: true,
        netTaxPayable: true,
        createdAt: true,
      },
    })
    
    return NextResponse.json({
      stats: {
        totalItrFilings: itrFilings,
        totalGstFilings: gstFilings,
        totalDocuments: documents,
        pendingItr,
        pendingGst,
      },
      recentActivity,
      recentItrFilings,
      recentGstFilings,
    }, { status: 200 })
  } catch (error) {
    console.error('Dashboard data error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
