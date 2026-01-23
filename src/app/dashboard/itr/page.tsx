'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { 
  FileText, Plus, Search, Filter, Calendar, Eye, Download,
  AlertCircle, CheckCircle2, Clock, Send, ArrowLeft, RefreshCw
} from 'lucide-react'
import { Button, Card, CardContent, Badge } from '@/components/ui'
import styles from './page.module.css'

interface ITRFiling {
  id: string
  itrType: string
  assessmentYear: string
  status: string
  grossIncome?: number
  taxableIncome?: number
  taxPayable?: number
  refundDue?: number
  acknowledgmentNo?: string
  filedAt?: string
  createdAt: string
  updatedAt: string
}

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  DRAFT: { label: 'Draft', color: 'bg-gray-100 text-gray-800', icon: FileText },
  DOCUMENTS_PENDING: { label: 'Documents Pending', color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
  UNDER_REVIEW: { label: 'Under Review', color: 'bg-blue-100 text-blue-800', icon: Clock },
  CA_ASSIGNED: { label: 'CA Assigned', color: 'bg-purple-100 text-purple-800', icon: CheckCircle2 },
  PROCESSING: { label: 'Processing', color: 'bg-indigo-100 text-indigo-800', icon: RefreshCw },
  FILED: { label: 'Filed', color: 'bg-green-100 text-green-800', icon: Send },
  ACKNOWLEDGED: { label: 'Acknowledged', color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
  REFUND_INITIATED: { label: 'Refund Initiated', color: 'bg-emerald-100 text-emerald-800', icon: CheckCircle2 },
  COMPLETED: { label: 'Completed', color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
  REJECTED: { label: 'Rejected', color: 'bg-red-100 text-red-800', icon: AlertCircle },
}

export default function ITRFilingsPage() {
  const { user } = useAuth()
  const [filings, setFilings] = useState<ITRFiling[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [yearFilter, setYearFilter] = useState<string>('all')

  useEffect(() => {
    fetchFilings()
  }, [])

  const fetchFilings = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/itr', {
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch filings')
      }

      const data = await response.json()
      setFilings(data.filings || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const filteredFilings = filings.filter((filing) => {
    const matchesSearch = 
      filing.itrType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      filing.assessmentYear.includes(searchQuery) ||
      filing.acknowledgmentNo?.includes(searchQuery)
    
    const matchesStatus = statusFilter === 'all' || filing.status === statusFilter
    const matchesYear = yearFilter === 'all' || filing.assessmentYear === yearFilter

    return matchesSearch && matchesStatus && matchesYear
  })

  const years = Array.from(new Set(filings.map((f) => f.assessmentYear)))

  return (
    <div className={styles.pageBackground}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <Link href="/dashboard" className={styles.backLink}>
            <ArrowLeft className={styles.backLinkIcon} />
            Back to Dashboard
          </Link>
          <div className={styles.headerContent}>
            <div>
              <h1 className={styles.headerTitle}>My ITR Filings</h1>
              <p className={styles.headerSubtitle}>Track and manage your income tax returns</p>
            </div>
            <Link href="/dashboard/itr/new">
              <Button size="lg">
                <Plus className="w-5 h-5 mr-2" />
                New ITR Filing
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <Card className={styles.statsCard}>
            <CardContent className={styles.statsCardContent}>
              <div className={styles.statsInfo}>
                <p className={styles.statsLabel}>Total Filings</p>
                <p className={styles.statsValue}>{filings.length}</p>
              </div>
              <FileText className={styles.statsIcon} />
            </CardContent>
          </Card>

          <Card className={styles.statsCard}>
            <CardContent className={styles.statsCardContent}>
              <div className={styles.statsInfo}>
                <p className={styles.statsLabel}>Completed</p>
                <p className={`${styles.statsValue} ${styles.statsValueGreen}`}>
                  {filings.filter((f) => f.status === 'COMPLETED' || f.status === 'ACKNOWLEDGED').length}
                </p>
              </div>
              <CheckCircle2 className={styles.statsIcon} />
            </CardContent>
          </Card>

          <Card className={styles.statsCard}>
            <CardContent className={styles.statsCardContent}>
              <div className={styles.statsInfo}>
                <p className={styles.statsLabel}>In Progress</p>
                <p className={`${styles.statsValue} ${styles.statsValueBlue}`}>
                  {filings.filter((f) => 
                    ['UNDER_REVIEW', 'CA_ASSIGNED', 'PROCESSING'].includes(f.status)
                  ).length}
                </p>
              </div>
              <Clock className={styles.statsIcon} />
            </CardContent>
          </Card>

          <Card className={styles.statsCard}>
            <CardContent className={styles.statsCardContent}>
              <div className={styles.statsInfo}>
                <p className={styles.statsLabel}>Drafts</p>
                <p className={`${styles.statsValue} ${styles.statsValueGray}`}>
                  {filings.filter((f) => f.status === 'DRAFT').length}
                </p>
              </div>
              <FileText className={styles.statsIcon} />
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className={styles.filtersCard}>
          <CardContent className={styles.filtersCardContent}>
            <div className={styles.filtersGrid}>
              {/* Search */}
              <div className={styles.searchContainer}>
                <Search className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search by ITR type, year, or ACK number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>

              {/* Status Filter */}
              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="all">All Statuses</option>
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <option key={key} value={key}>{config.label}</option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div>
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="all">All Years</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        </div>
        {/* Error Message */}
        {error && (
          <div className={styles.errorMessage}>
            <AlertCircle className={styles.errorIcon} />
            <span>{error}</span>
          </div>
        )}

        {/* Filings List */}
        {loading ? (
          <div className={styles.loadingContainer}>
            <RefreshCw className={styles.loadingSpinner} />
            <p className={styles.loadingText}>Loading your filings...</p>
          </div>
        ) : filteredFilings.length === 0 ? (
          <Card className={styles.emptyStateCard}>
            <CardContent className={styles.emptyStateCardContent}>
              <FileText className={styles.emptyStateIcon} />
              <h3 className={styles.emptyStateTitle}>
                {filings.length === 0 ? 'No ITR filings yet' : 'No filings match your filters'}
              </h3>
              <p className={styles.emptyStateDescription}>
                {filings.length === 0 
                  ? 'Get started by filing your first Income Tax Return'
                  : 'Try adjusting your search or filters'}
              </p>
              {filings.length === 0 && (
                <Link href="/dashboard/itr/new">
                  <Button size="lg">
                    <Plus className="w-5 h-5 mr-2" />
                    File New ITR
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className={styles.filingsList}>
            {filteredFilings.map((filing) => {
              const statusInfo = statusConfig[filing.status] || statusConfig.DRAFT
              const StatusIcon = statusInfo.icon

              return (
                <Card key={filing.id} className={styles.filingCard}>
                  <CardContent className={styles.filingCardContent}>
                    <div className={styles.filingHeader}>
                      <div className={styles.filingInfo}>
                        <div className={styles.filingTitleRow}>
                          <h3 className={styles.filingTitle}>
                            {filing.itrType} - AY {filing.assessmentYear}
                          </h3>
                          <Badge className={statusInfo.color}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusInfo.label}
                          </Badge>
                        </div>

                        <div className={styles.filingDetailsGrid}>
                          {filing.grossIncome !== undefined && (
                            <div className={styles.filingDetail}>
                              <p className={styles.filingDetailLabel}>Gross Income</p>
                              <p className={styles.filingDetailValue}>
                                ₹{filing.grossIncome.toLocaleString('en-IN')}
                              </p>
                            </div>
                          )}
                          
                          {filing.taxableIncome !== undefined && (
                            <div className={styles.filingDetail}>
                              <p className={styles.filingDetailLabel}>Taxable Income</p>
                              <p className={styles.filingDetailValue}>
                                ₹{filing.taxableIncome.toLocaleString('en-IN')}
                              </p>
                            </div>
                          )}

                          {filing.taxPayable !== undefined && (
                            <div className={styles.filingDetail}>
                              <p className={styles.filingDetailLabel}>Tax Payable</p>
                              <p className={`${styles.filingDetailValue} ${styles.filingDetailValueRed}`}>
                                ₹{filing.taxPayable.toLocaleString('en-IN')}
                              </p>
                            </div>
                          )}

                          {filing.refundDue !== undefined && filing.refundDue > 0 && (
                            <div className={styles.filingDetail}>
                              <p className={styles.filingDetailLabel}>Refund Due</p>
                              <p className={`${styles.filingDetailValue} ${styles.filingDetailValueGreen}`}>
                                ₹{filing.refundDue.toLocaleString('en-IN')}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className={styles.filingMeta}>
                          <div className={styles.filingMetaItem}>
                            <Calendar className={styles.filingMetaIcon} />
                            Created {new Date(filing.createdAt).toLocaleDateString('en-IN')}
                          </div>
                          {filing.acknowledgmentNo && (
                            <div className={styles.filingMetaItem}>
                              <CheckCircle2 className={styles.filingMetaIcon} />
                              ACK: {filing.acknowledgmentNo}
                            </div>
                          )}
                          {filing.filedAt && (
                            <div className={styles.filingMetaItem}>
                              <Send className={styles.filingMetaIcon} />
                              Filed {new Date(filing.filedAt).toLocaleDateString('en-IN')}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className={styles.filingActions}>
                        <Link href={`/dashboard/itr/${filing.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </Link>
                        {filing.acknowledgmentNo && (
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>

        </div>
        
    </div>
  )
}



