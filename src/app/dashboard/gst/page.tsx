'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { 
  FileText, Plus, Search, Filter, Calendar, Eye, Download,
  AlertCircle, CheckCircle2, Clock, Send, ArrowLeft, RefreshCw,
  Receipt
} from 'lucide-react'
import { Button, Card, CardContent, Badge } from '@/components/ui'
import styles from './page.module.css'

interface GSTFiling {
  id: string
  gstin: string
  tradeName?: string
  returnType: string
  period: string
  financialYear: string
  status: string
  totalSales?: string
  totalPurchases?: string
  taxPayable?: string
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

const returnTypes = [
  { value: 'GSTR1', label: 'GSTR-1', desc: 'Outward supplies' },
  { value: 'GSTR3B', label: 'GSTR-3B', desc: 'Monthly return' },
  { value: 'GSTR4', label: 'GSTR-4', desc: 'Composition scheme' },
  { value: 'GSTR9', label: 'GSTR-9', desc: 'Annual return' },
  { value: 'GSTR9C', label: 'GSTR-9C', desc: 'Annual return (audited)' },
]

export default function GSTFilingsPage() {
  const { user } = useAuth()
  const [filings, setFilings] = useState<GSTFiling[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [returnTypeFilter, setReturnTypeFilter] = useState<string>('all')

  useEffect(() => {
    fetchFilings()
  }, [])

  const fetchFilings = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/gst', {
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch GST filings')
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
      filing.gstin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      filing.returnType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      filing.period.toLowerCase().includes(searchQuery.toLowerCase()) ||
      filing.acknowledgmentNo?.includes(searchQuery)
    
    const matchesStatus = statusFilter === 'all' || filing.status === statusFilter
    const matchesReturnType = returnTypeFilter === 'all' || filing.returnType === returnTypeFilter

    return matchesSearch && matchesStatus && matchesReturnType
  })

  const totalFilings = filings.length
  const completedFilings = filings.filter(f => ['COMPLETED', 'ACKNOWLEDGED'].includes(f.status)).length
  const inProgressFilings = filings.filter(f => ['UNDER_REVIEW', 'CA_ASSIGNED', 'PROCESSING'].includes(f.status)).length
  const draftFilings = filings.filter(f => f.status === 'DRAFT').length

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.header}>
          <Link href="/dashboard" className={styles.backLink}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className={styles.headerContent}>
            <div className={styles.headerInfo}>
              <h1>My GST Filings</h1>
              <p>Track and manage your GST returns</p>
            </div>
            <Link href="/dashboard/gst/new">
              <Button size="lg">
                <Plus className="w-5 h-5 mr-2" />
                New GST Filing
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <Card>
            <CardContent className={styles.statsCard}>
              <div className={styles.statsCardContent}>
                <Receipt className={`${styles.statsIcon} ${styles.blueIcon}`} />
                <div className={styles.statsInfo}>
                  <p className={styles.statsLabel}>Total Filings</p>
                  <p className={styles.statsNumber}>{totalFilings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className={styles.statsCard}>
              <div className={styles.statsCardContent}>
                <CheckCircle2 className={`${styles.statsIcon} ${styles.greenIcon}`} />
                <div className={styles.statsInfo}>
                  <p className={styles.statsLabel}>Completed</p>
                  <p className={`${styles.statsNumber} ${styles.statsNumberGreen}`}>{completedFilings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className={styles.statsCard}>
              <div className={styles.statsCardContent}>
                <Clock className={`${styles.statsIcon} ${styles.orangeIcon}`} />
                <div className={styles.statsInfo}>
                  <p className={styles.statsLabel}>In Progress</p>
                  <p className={`${styles.statsNumber} ${styles.statsNumberOrange}`}>{inProgressFilings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className={styles.statsCard}>
              <div className={styles.statsCardContent}>
                <FileText className={`${styles.statsIcon} ${styles.grayIcon}`} />
                <div className={styles.statsInfo}>
                  <p className={styles.statsLabel}>Drafts</p>
                  <p className={`${styles.statsNumber} ${styles.statsNumberGray}`}>{draftFilings}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className={styles.filterCard}>
          <CardContent className={styles.filterContent}>
            <div className={styles.filterGrid}>
              <div className={styles.searchWrapper}>
                <Search className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search by GSTIN, return type, period..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={styles.select}
              >
                <option value="all">All Statuses</option>
                <option value="DRAFT">Draft</option>
                <option value="DOCUMENTS_PENDING">Documents Pending</option>
                <option value="UNDER_REVIEW">Under Review</option>
                <option value="FILED">Filed</option>
                <option value="COMPLETED">Completed</option>
              </select>

              <select
                value={returnTypeFilter}
                onChange={(e) => setReturnTypeFilter(e.target.value)}
                className={styles.select}
              >
                <option value="all">All Return Types</option>
                {returnTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>

              <Button
                variant="outline"
                onClick={fetchFilings}
                disabled={loading}
              >
                <RefreshCw className={`${styles.refreshIcon} ${loading ? styles.refreshIconSpin : ''}`} />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Error State */}
        {error && (
          <Card className={styles.errorCard}>
            <CardContent className={styles.errorContent}>
              <AlertCircle className={styles.errorIcon} />
              <h3 className={styles.errorTitle}>Error Loading Filings</h3>
              <p className={styles.errorMessage}>{error}</p>
              <Button onClick={fetchFilings}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {loading ? (
          <Card>
            <CardContent className={styles.loadingCard}>
              <RefreshCw className={styles.loadingIcon} />
              <p className={styles.loadingText}>Loading your GST filings...</p>
            </CardContent>
          </Card>
        ) : filteredFilings.length === 0 ? (
          <Card>
            <CardContent className={styles.emptyCard}>
              <Receipt className={styles.emptyIcon} />
              <h3 className={styles.emptyTitle}>
                {filings.length === 0 ? 'No GST Filings Yet' : 'No Matching Filings'}
              </h3>
              <p className={styles.emptyMessage}>
                {filings.length === 0 
                  ? 'Start by creating your first GST return filing'
                  : 'Try adjusting your search or filters'}
              </p>
              {filings.length === 0 && (
                <Link href="/dashboard/gst/new">
                  <Button size="lg">
                    <Plus className="w-5 h-5 mr-2" />
                    File New GST Return
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
                  <CardContent className={styles.filingContent}>
                    <div className={styles.filingLayout}>
                      <div className={styles.filingMain}>
                        <div className={styles.filingHeader}>
                          <h3 className={styles.filingTitle}>
                            {filing.returnType} - {filing.period}
                          </h3>
                          <Badge className={statusInfo.color}>
                            <StatusIcon className={styles.badgeIcon} />
                            {statusInfo.label}
                          </Badge>
                        </div>

                        <div className={styles.filingGrid}>
                          <div className={styles.filingField}>
                            <p className={styles.filingFieldLabel}>GSTIN</p>
                            <p className={styles.filingFieldValue}>
                              {filing.gstin}
                            </p>
                          </div>

                          {filing.tradeName && (
                            <div className={styles.filingField}>
                              <p className={styles.filingFieldLabel}>Trade Name</p>
                              <p className={styles.filingFieldValue}>
                                {filing.tradeName}
                              </p>
                            </div>
                          )}

                          {filing.totalSales && (
                            <div className={styles.filingField}>
                              <p className={styles.filingFieldLabel}>Total Sales</p>
                              <p className={styles.filingFieldValue}>
                                ₹{parseFloat(filing.totalSales).toLocaleString('en-IN')}
                              </p>
                            </div>
                          )}

                          {filing.taxPayable && (
                            <div className={styles.filingField}>
                              <p className={styles.filingFieldLabel}>Tax Payable</p>
                              <p className={styles.filingFieldValueRed}>
                                ₹{parseFloat(filing.taxPayable).toLocaleString('en-IN')}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className={styles.filingMeta}>
                          <div className={styles.filingMetaItem}>
                            <Calendar className={styles.metaIcon} />
                            Created {new Date(filing.createdAt).toLocaleDateString('en-IN')}
                          </div>
                          {filing.acknowledgmentNo && (
                            <div className={styles.filingMetaItem}>
                              <CheckCircle2 className={styles.metaIcon} />
                              ARN: {filing.acknowledgmentNo}
                            </div>
                          )}
                          {filing.filedAt && (
                            <div className={styles.filingMetaItem}>
                              <Send className={styles.metaIcon} />
                              Filed {new Date(filing.filedAt).toLocaleDateString('en-IN')}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className={styles.filingActions}>
                        <Link href={`/dashboard/gst/${filing.id}`}>
                          <Button variant="outline" size="sm" className={styles.actionButton}>
                            <Eye className={styles.actionIcon} />
                            View
                          </Button>
                        </Link>
                        {filing.acknowledgmentNo && (
                          <Button variant="outline" size="sm" className={styles.actionButton}>
                            <Download className={styles.actionIcon} />
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
  )
}