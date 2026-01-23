'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  FileText, Upload, Clock, CheckCircle, AlertCircle,
  Plus, Eye, Calendar, Loader2, ArrowRight
} from 'lucide-react'
import { Button, Card, CardContent, Badge } from '@/components/ui'
import { useAuth } from '@/contexts'
import styles from './page.module.css'

interface DashboardData {
  stats: {
    totalItrFilings: number
    totalGstFilings: number
    totalDocuments: number
    pendingItr: number
    pendingGst: number
  }
  recentItrFilings: Array<{
    id: string
    assessmentYear: string
    itrType: string
    status: string
    grossIncome: number
    taxPayable: number
    createdAt: string
  }>
  recentGstFilings: Array<{
    id: string
    gstin: string
    returnType: string
    period: string
    status: string
    taxPayable: number
    createdAt: string
  }>
  recentActivity: Array<{
    id: string
    action: string
    description: string
    createdAt: string
  }>
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/dashboard')

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data')
      }

      const data = await response.json()
      setDashboardData(data)
    } catch (err) {
      console.error('Dashboard fetch error:', err)
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'COMPLETED':
      case 'FILED':
        return 'success'
      case 'DRAFT':
      case 'DOCUMENTS_PENDING':
        return 'warning'
      case 'UNDER_REVIEW':
      case 'PROCESSING':
        return 'info'
      case 'REJECTED':
        return 'error'
      default:
        return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toUpperCase()) {
      case 'COMPLETED':
      case 'FILED':
        return CheckCircle
      case 'DRAFT':
      case 'DOCUMENTS_PENDING':
      case 'UNDER_REVIEW':
      case 'PROCESSING':
        return Clock
      default:
        return AlertCircle
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const totalFilings = (dashboardData?.stats.totalItrFilings || 0) + (dashboardData?.stats.totalGstFilings || 0)
  const pendingFilings = (dashboardData?.stats.pendingItr || 0) + (dashboardData?.stats.pendingGst || 0)
  const completedFilings = totalFilings - pendingFilings

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard Overview</h1>
          <p className={styles.subtitle}>
            Welcome back, <span className={styles.userName}>{user?.name || 'User'}</span>!
          </p>
        </div>
        <div>
          <Link href="/dashboard/itr/new">
            <Button size="default" className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 shadow-md transition-all">
              <Plus className="w-4 h-4 mr-2" />
              New ITR Filing
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>
          <Loader2 className={styles.spinner} />
        </div>
      ) : error ? (
        <div className={styles.errorContainer}>
          <AlertCircle className="w-6 h-6" />
          <span className="font-medium">{error}</span>
        </div>
      ) : (
        <>
          <div className={styles.statsGrid}>
            <Card className={`${styles.statsCard} ${styles.blueCard}`}>
              <CardContent className={styles.statsCardContent}>
                <div className={styles.statsInfo}>
                  <p className={styles.statsNumber}>{totalFilings}</p>
                  <p className={styles.statsLabel}>Total Filings</p>
                </div>
                <div className={`${styles.statsIcon} ${styles.blueIcon}`}>
                  <FileText className="w-5 h-5" />
                </div>
              </CardContent>
            </Card>

            <Card className={`${styles.statsCard} ${styles.yellowCard}`}>
              <CardContent className={styles.statsCardContent}>
                <div className={styles.statsInfo}>
                  <p className={styles.statsNumber}>{pendingFilings}</p>
                  <p className={styles.statsLabel}>Pending Action</p>
                </div>
                <div className={`${styles.statsIcon} ${styles.yellowIcon}`}>
                  <Clock className="w-5 h-5" />
                </div>
              </CardContent>
            </Card>

            <Card className={`${styles.statsCard} ${styles.greenCard}`}>
              <CardContent className={styles.statsCardContent}>
                <div className={styles.statsInfo}>
                  <p className={styles.statsNumber}>{completedFilings}</p>
                  <p className={styles.statsLabel}>Completed</p>
                </div>
                <div className={`${styles.statsIcon} ${styles.greenIcon}`}>
                  <CheckCircle className="w-5 h-5" />
                </div>
              </CardContent>
            </Card>

            <Card className={`${styles.statsCard} ${styles.purpleCard}`}>
              <CardContent className={styles.statsCardContent}>
                <div className={styles.statsInfo}>
                  <p className={styles.statsNumber}>{dashboardData?.stats.totalDocuments || 0}</p>
                  <p className={styles.statsLabel}>Documents</p>
                </div>
                <div className={`${styles.statsIcon} ${styles.purpleIcon}`}>
                  <Upload className="w-5 h-5" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className={styles.mainGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Recent Filings</h2>
                <Link href="/dashboard/itr" className={styles.viewAllLink}>
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <Card className={styles.filingsCard}>
                <CardContent className={styles.filingsCardContent}>
                  {dashboardData?.recentItrFilings && dashboardData.recentItrFilings.length > 0 ? (
                    <div className={styles.filingsList}>
                      {dashboardData.recentItrFilings.map((filing) => {
                        const StatusIcon = getStatusIcon(filing.status)
                        return (
                          <div key={filing.id} className={styles.filingItem}>
                            <div className={styles.filingMain}>
                              <div className={styles.filingIconWrapper}>
                                <FileText className={styles.filingIcon} />
                              </div>
                              <div className={styles.filingInfo}>
                                <h3 className={styles.filingTitle}>
                                  {filing.itrType} • {filing.assessmentYear}
                                </h3>
                                <p className={styles.filingDate}>
                                  Filed on {formatDate(filing.createdAt)}
                                </p>
                              </div>
                            </div>

                            <div className={styles.filingActions}>
                              <div className={styles.filingTax}>
                                <p className={styles.taxLabel}>Tax Payable</p>
                                <p className={styles.taxAmount}>{formatCurrency(filing.taxPayable)}</p>
                              </div>
                              <div className={styles.filingStatus}>
                                <Badge variant={getStatusColor(filing.status) as any} className={styles.statusBadge}>
                                  <StatusIcon className="w-3 h-3 mr-1" />
                                  {filing.status.replace('_', ' ')}
                                </Badge>
                                <Link href={`/dashboard/itr/${filing.id}`}>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-600">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className={styles.emptyState}>
                      <div className={styles.emptyIcon}>
                        <FileText className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className={styles.emptyTitle}>No filings yet</h3>
                      <p className={styles.emptyDescription}>
                        Get started by creating your first Income Tax Return filing today.
                      </p>
                      <Link href="/dashboard/itr/new">
                        <Button className={styles.primaryButton}>
                          Create New Filing
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className={styles.rightColumn}>
              <div className={styles.activitySection}>
                <h2 className={styles.sectionTitle}>Recent Activity</h2>
                <Card className={styles.activityCard}>
                  <CardContent className={styles.activityCardContent}>
                    {dashboardData?.recentActivity && dashboardData.recentActivity.length > 0 ? (
                      <div className={styles.activityList}>
                        {dashboardData.recentActivity.slice(0, 5).map((activity) => (
                          <div key={activity.id} className={styles.activityItem}>
                            <div className={styles.activityDot} />
                            <div className={styles.activityContent}>
                              <p className={styles.activityHeader}>
                                {activity.action}
                                <span className={styles.activityDate}>
                                  {formatDate(activity.createdAt)}
                                </span>
                              </p>
                              <p className={styles.activityDescription}>
                                {activity.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className={styles.emptyActivity}>
                        <Clock className="w-10 h-10 text-gray-200 mx-auto mb-4" />
                        <p className={styles.emptyActivityTitle}>No recent activity</p>
                        <p className={styles.emptyActivityDescription}>Start by creating your first filing</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className={styles.deadlineCard}>
                <div className={styles.deadlineHeader}>
                  <div className={styles.deadlineHeaderContent}>
                    <Calendar className="w-5 h-5 text-white" />
                    <div className={styles.deadlineTitle}>Upcoming Deadline</div>
                  </div>
                  <p className={styles.deadlineSubtitle}>Don't miss the date</p>
                </div>

                <div className={styles.deadlineInfo}>
                  <p className={styles.deadlineLabel}>ITR Filing Deadline</p>
                  <p className={styles.deadlineDate}>July 31, 2026</p>
                </div>

                <Link href="/dashboard/itr/new" className={styles.deadlineButtonWrapper}>
                  <Button variant="outline" className={styles.deadlineButton}>
                    File Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
