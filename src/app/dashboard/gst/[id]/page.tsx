'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  ArrowLeft, Eye, Download, Edit, Send, Clock, CheckCircle2, 
  AlertCircle, FileText, DollarSign, TrendingUp, User, Calendar,
  Phone, MapPin, Plus, Share2, RefreshCw, X, Receipt
} from 'lucide-react'
import { Button, Card, CardContent, Badge } from '@/components/ui'
import styles from './page.module.css'

interface GSTFilingDetails {
  id: string
  gstin: string
  tradeName?: string
  returnType: string
  period: string
  financialYear: string
  status: string
  totalSales?: string
  totalPurchases?: string
  igst?: string
  cgst?: string
  sgst?: string
  itcClaimed?: string
  taxPayable?: string
  acknowledgmentNo?: string
  filedAt?: string
  formData?: any
  remarks?: string
  createdAt: string
  updatedAt: string
}

const statusConfig: Record<string, { label: string; color: string; icon: any; description: string }> = {
  DRAFT: { 
    label: 'Draft', 
    color: 'bg-gray-100 text-gray-800', 
    icon: FileText,
    description: 'Your filing is saved as draft. You can edit it anytime.'
  },
  DOCUMENTS_PENDING: { 
    label: 'Documents Pending', 
    color: 'bg-yellow-100 text-yellow-800', 
    icon: AlertCircle,
    description: 'Please upload required documents to proceed.'
  },
  UNDER_REVIEW: { 
    label: 'Under Review', 
    color: 'bg-blue-100 text-blue-800', 
    icon: Clock,
    description: 'Your filing is under review by our GST experts.'
  },
  CA_ASSIGNED: { 
    label: 'CA Assigned', 
    color: 'bg-purple-100 text-purple-800', 
    icon: User,
    description: 'A CA expert has been assigned to your filing.'
  },
  PROCESSING: { 
    label: 'Processing', 
    color: 'bg-indigo-100 text-indigo-800', 
    icon: RefreshCw,
    description: 'Your filing is being processed.'
  },
  FILED: { 
    label: 'Filed', 
    color: 'bg-green-100 text-green-800', 
    icon: Send,
    description: 'Your GST return has been filed with the GST portal.'
  },
  ACKNOWLEDGED: { 
    label: 'Acknowledged', 
    color: 'bg-green-100 text-green-800', 
    icon: CheckCircle2,
    description: 'Your filing has been acknowledged by GST portal.'
  },
  COMPLETED: { 
    label: 'Completed', 
    color: 'bg-green-100 text-green-800', 
    icon: CheckCircle2,
    description: 'Your GST filing is complete.'
  },
  REJECTED: { 
    label: 'Rejected', 
    color: 'bg-red-100 text-red-800', 
    icon: AlertCircle,
    description: 'Your filing has been rejected. Please contact support.'
  },
}

const statusFlow = ['DRAFT', 'DOCUMENTS_PENDING', 'UNDER_REVIEW', 'CA_ASSIGNED', 'PROCESSING', 'FILED', 'ACKNOWLEDGED', 'COMPLETED']

const returnTypeInfo: Record<string, { label: string; description: string }> = {
  GSTR1: { label: 'GSTR-1', description: 'Details of outward supplies' },
  GSTR3B: { label: 'GSTR-3B', description: 'Monthly summary return' },
  GSTR4: { label: 'GSTR-4', description: 'Quarterly return (Composition scheme)' },
  GSTR9: { label: 'GSTR-9', description: 'Annual return' },
  GSTR9C: { label: 'GSTR-9C', description: 'Reconciliation statement' },
}

export default function GSTFilingDetailsPage() {
  const params = useParams()
  const filingId = params.id as string
  
  const [filing, setFiling] = useState<GSTFilingDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchFilingDetails()
  }, [filingId])

  const fetchFilingDetails = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/gst/${filingId}`, {
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch filing details')
      }

      const data = await response.json()
      setFiling(data.filing)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this filing? This action cannot be undone.')) {
      return
    }

    try {
      setDeleting(true)
      const response = await fetch(`/api/gst/${filingId}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to delete filing')
      }

      window.location.href = '/dashboard/gst'
    } catch (err: any) {
      setError(err.message)
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.loadingContainer}>
            <RefreshCw className={styles.loadingIcon} />
            <p className={styles.loadingText}>Loading filing details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !filing) {
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.header}>
            <Link href="/dashboard/gst" className={styles.backLink}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to GST Filings
            </Link>
          </div>
          <Card>
            <CardContent className={styles.errorCard}>
              <AlertCircle className={styles.errorIcon} />
              <h3 className={styles.errorTitle}>Filing Not Found</h3>
              <p className={styles.errorMessage}>{error || 'Could not load this filing'}</p>
              <Link href="/dashboard/gst">
                <Button>Back to GST Filings</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const statusInfo = statusConfig[filing.status] || statusConfig.DRAFT
  const StatusIcon = statusInfo.icon
  const currentStatusIndex = statusFlow.indexOf(filing.status)
  const returnInfo = returnTypeInfo[filing.returnType] || { label: filing.returnType, description: '' }
  
  const totalSalesNum = filing.totalSales ? parseFloat(filing.totalSales) : 0
  const totalPurchasesNum = filing.totalPurchases ? parseFloat(filing.totalPurchases) : 0
  const taxPayableNum = filing.taxPayable ? parseFloat(filing.taxPayable) : 0

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.header}>
          <Link href="/dashboard/gst" className={styles.backLink}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to GST Filings
          </Link>
          <div className={styles.headerContent}>
            <div className={styles.headerInfo}>
              <h1>
                {returnInfo.label} Filing - {filing.period}
              </h1>
              <p>Filing ID: {filing.id}</p>
            </div>
            <div className={styles.headerActions}>
              {(['DRAFT', 'DOCUMENTS_PENDING'].includes(filing.status)) && (
                <Link href={`/dashboard/gst/new?id=${filing.id}`}>
                  <Button variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </Link>
              )}
              {filing.status === 'DRAFT' && (
                <Button 
                  variant="outline" 
                  onClick={handleDelete}
                  disabled={deleting}
                  className={styles.deleteButton}
                >
                  <X className="w-4 h-4 mr-2" />
                  {deleting ? 'Deleting...' : 'Delete'}
                </Button>
              )}
              {filing.acknowledgmentNo && (
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              )}
            </div>
          </div>
        </div>

        <Card className={styles.statusCard}>
          <CardContent className={styles.statusCardContent}>
            <div className={styles.statusHeader}>
              <div className={styles.statusHeaderLeft}>
                <div className={`${styles.statusIconWrapper} ${statusInfo.color}`}>
                  <StatusIcon className={styles.statusIconLarge} />
                </div>
                <div>
                  <h2 className={styles.statusTitle}>{statusInfo.label}</h2>
                  <p className={styles.statusDescription}>{statusInfo.description}</p>
                </div>
              </div>
              <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
            </div>

            <div className={styles.statusProgress}>
              <p className={styles.progressLabel}>Filing Progress</p>
              <div className={styles.progressBar}>
                {statusFlow.map((status, index) => {
                  const isActive = index <= currentStatusIndex
                  return (
                    <div key={status} className={styles.progressStep}>
                      <div className={`${styles.progressStepCircle} ${isActive ? styles.progressStepActive : styles.progressStepInactive}`}>
                        {index + 1}
                      </div>
                      {index < statusFlow.length - 1 && (
                        <div className={`${styles.progressConnector} ${isActive ? styles.progressConnectorActive : styles.progressConnectorInactive}`} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {filing.acknowledgmentNo && (
              <div className={styles.acknowledgmentBox}>
                <p className={styles.acknowledgmentText}>
                  <span className={styles.acknowledgmentLabel}>Acknowledgment ARN:</span> {filing.acknowledgmentNo}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className={styles.gridLayout}>
          <Card className={styles.gridLeft}>
            <CardContent className={styles.summaryCard}>
              <h3 className={styles.sectionTitle}>Filing Summary</h3>

              <div className={styles.infoSection}>
                <h4 className={styles.subsectionTitle}>Basic Information</h4>
                <div className={styles.infoGrid}>
                  <div className={styles.infoField}>
                    <p className={styles.infoLabel}>GSTIN</p>
                    <p className={styles.infoValue}>{filing.gstin}</p>
                  </div>
                  <div className={styles.infoField}>
                    <p className={styles.infoLabel}>Trade Name</p>
                    <p className={styles.infoValue}>{filing.tradeName || 'Not provided'}</p>
                  </div>
                  <div className={styles.infoField}>
                    <p className={styles.infoLabel}>Return Type</p>
                    <p className={styles.infoValue}>{returnInfo.label}</p>
                  </div>
                  <div className={styles.infoField}>
                    <p className={styles.infoLabel}>Period</p>
                    <p className={styles.infoValue}>{filing.period}</p>
                  </div>
                </div>
              </div>

              <div className={`${styles.breakdownBox} ${styles.breakdownBoxOrange}`}>
                <h4 className={styles.subsectionTitle}>Sales Breakdown</h4>
                {filing.formData && (
                  <div className={styles.breakdownContent}>
                    {filing.formData.b2bSales > 0 && (
                      <div className={styles.breakdownRow}>
                        <span className={styles.breakdownLabel}>B2B Sales:</span>
                        <span className={styles.breakdownValue}>₹{filing.formData.b2bSales.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {filing.formData.b2cSales > 0 && (
                      <div className={styles.breakdownRow}>
                        <span className={styles.breakdownLabel}>B2C Sales:</span>
                        <span className={styles.breakdownValue}>₹{filing.formData.b2cSales.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {filing.formData.exportSales > 0 && (
                      <div className={styles.breakdownRow}>
                        <span className={styles.breakdownLabel}>Export Sales:</span>
                        <span className={styles.breakdownValue}>₹{filing.formData.exportSales.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {filing.formData.exemptSales > 0 && (
                      <div className={styles.breakdownRow}>
                        <span className={styles.breakdownLabel}>Exempt Sales:</span>
                        <span className={styles.breakdownValue}>₹{filing.formData.exemptSales.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className={`${styles.breakdownBox} ${styles.breakdownBoxBlue}`}>
                <h4 className={styles.subsectionTitle}>Tax Details</h4>
                {filing.formData && (
                  <div className={styles.breakdownContent}>
                    {filing.formData.igst > 0 && (
                      <div className={styles.breakdownRow}>
                        <span className={styles.breakdownLabel}>IGST:</span>
                        <span className={styles.breakdownValue}>₹{filing.formData.igst.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {filing.formData.cgst > 0 && (
                      <div className={styles.breakdownRow}>
                        <span className={styles.breakdownLabel}>CGST:</span>
                        <span className={styles.breakdownValue}>₹{filing.formData.cgst.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {filing.formData.sgst > 0 && (
                      <div className={styles.breakdownRow}>
                        <span className={styles.breakdownLabel}>SGST:</span>
                        <span className={styles.breakdownValue}>₹{filing.formData.sgst.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {filing.formData.itcClaimed > 0 && (
                      <div className={styles.breakdownRow}>
                        <span className={styles.breakdownLabel}>ITC Claimed:</span>
                        <span className={styles.breakdownValueGreen}>₹{filing.formData.itcClaimed.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {filing.remarks && (
                <div className={styles.remarksSection}>
                  <h4 className={styles.subsectionTitle}>Remarks</h4>
                  <p className={styles.remarksBox}>{filing.remarks}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className={styles.sidebar}>
            <Card>
              <CardContent className={styles.taxSummaryCard}>
                <h3 className={styles.taxSummaryTitle}>
                  <Receipt className={styles.taxSummaryIcon} />
                  GST Summary
                </h3>
                <div className={styles.taxSummaryContent}>
                  <div className={styles.taxSummaryItem}>
                    <p className={styles.taxSummaryLabel}>Total Sales</p>
                    <p className={styles.taxSummaryValue}>
                      ₹{totalSalesNum.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className={`${styles.taxSummaryItem} ${styles.taxSummaryDivider}`}>
                    <p className={styles.taxSummaryLabel}>Total Purchases</p>
                    <p className={styles.taxSummaryValueBlue}>
                      ₹{totalPurchasesNum.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className={`${styles.taxSummaryItem} ${styles.taxSummaryDivider}`}>
                    <p className={styles.taxSummaryLabel}>ITC Claimed</p>
                    <p className={styles.taxSummaryValueGreen}>
                      ₹{(filing.itcClaimed ? parseFloat(filing.itcClaimed) : 0).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className={`${styles.taxSummaryItem} ${styles.taxSummaryDivider} ${styles.taxSummaryHighlight}`}>
                    <p className={styles.taxSummaryLabel}>Tax Payable</p>
                    <p className={styles.taxSummaryValueOrange}>
                      ₹{taxPayableNum.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className={styles.timelineCard}>
                <h3 className={styles.timelineTitle}>
                  <Calendar className={styles.timelineIcon} />
                  Timeline
                </h3>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineItem}>
                    <p className={styles.timelineLabel}>Created</p>
                    <p className={styles.timelineValue}>{new Date(filing.createdAt).toLocaleDateString('en-IN')}</p>
                  </div>
                  {filing.filedAt && (
                    <div className={`${styles.timelineItem} ${styles.timelineDivider}`}>
                      <p className={styles.timelineLabel}>Filed</p>
                      <p className={styles.timelineValue}>{new Date(filing.filedAt).toLocaleDateString('en-IN')}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {filing.status === 'DRAFT' && (
          <div className={styles.actionSection}>
            <Link href={`/dashboard/gst/new?id=${filing.id}`}>
              <Button size="lg">
                <Edit className="w-5 h-5 mr-2" />
                Continue Editing
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}