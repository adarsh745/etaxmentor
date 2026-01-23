'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Upload, FileText, CheckCircle2, AlertTriangle, Clock, 
  Search, Filter, Download, Eye, Trash2, Plus, RefreshCw,
  FileImage, FileSpreadsheet, MoreHorizontal, Calendar,
  User, FolderOpen, Archive, Shield
} from 'lucide-react'
import { 
  Button, Card, CardContent, Badge, Input,
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui'
import styles from './page.module.css'

interface Document {
  id: string
  fileName: string
  originalName: string
  mimeType: string
  size: number
  type: string
  status: string
  financialYear?: string
  assessmentYear?: string
  verifiedAt?: string
  rejectionReason?: string
  createdAt: string
  updatedAt: string
}

interface DocumentStats {
  total: number
  uploaded: number
  verified: number
  rejected: number
  processing: number
}

const statusConfig: Record<string, { label: string; color: string; icon: any; description: string }> = {
  UPLOADED: { 
    label: 'Uploaded', 
    color: 'bg-blue-100 text-blue-800', 
    icon: FileText,
    description: 'Document uploaded successfully'
  },
  VERIFIED: { 
    label: 'Verified', 
    color: 'bg-green-100 text-green-800', 
    icon: CheckCircle2,
    description: 'Document verified by expert'
  },
  REJECTED: { 
    label: 'Rejected', 
    color: 'bg-red-100 text-red-800', 
    icon: AlertTriangle,
    description: 'Document rejected - needs correction'
  },
  PROCESSING: { 
    label: 'Processing', 
    color: 'bg-yellow-100 text-yellow-800', 
    icon: Clock,
    description: 'Document under review'
  },
}

const documentTypeLabels: Record<string, string> = {
  PAN_CARD: 'PAN Card',
  AADHAAR: 'Aadhaar Card',
  FORM_16: 'Form 16',
  FORM_26AS: 'Form 26AS',
  AIS_TIS: 'AIS/TIS',
  BANK_STATEMENT: 'Bank Statement',
  INVESTMENT_PROOF: 'Investment Proof',
  SALARY_SLIP: 'Salary Slip',
  CAPITAL_GAINS: 'Capital Gains',
  RENTAL_AGREEMENT: 'Rental Agreement',
  LOAN_CERTIFICATE: 'Loan Certificate',
  GST_CERTIFICATE: 'GST Certificate',
  OTHER: 'Other',
}

const getFileIcon = (mimeType: string) => {
  if (mimeType.startsWith('image/')) return FileImage
  if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) return FileSpreadsheet
  return FileText
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [stats, setStats] = useState<DocumentStats>({
    total: 0, uploaded: 0, verified: 0, rejected: 0, processing: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [yearFilter, setYearFilter] = useState('all')
  
  // UI States
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null)
  const [showUpload, setShowUpload] = useState(false)

  useEffect(() => {
    fetchDocuments()
  }, [searchQuery, statusFilter, typeFilter, yearFilter])

  const fetchDocuments = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      
      if (searchQuery) params.set('search', searchQuery)
      if (statusFilter !== 'all') params.set('status', statusFilter)
      if (typeFilter !== 'all') params.set('type', typeFilter)
      if (yearFilter !== 'all') params.set('financialYear', yearFilter)
      
      const response = await fetch(`/api/documents?${params}`, {
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch documents')
      }

      const data = await response.json()
      setDocuments(data.documents)
      setStats(data.stats)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (doc: Document) => {
    try {
      const response = await fetch(`/api/documents/${doc.id}/download`, {
        credentials: 'include',
      })
      
      if (!response.ok) throw new Error('Failed to download')
      
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = doc.originalName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Download failed:', err)
    }
  }

  const handleDelete = async (doc: Document) => {
    if (!confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/documents/${doc.id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to delete document')
      }

      // Refresh documents list
      fetchDocuments()
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <RefreshCw className={styles.loadingSpinner} />
          <p className={styles.loadingText}>Loading documents...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.headerTitle}>Document Manager</h1>
            <p className={styles.headerDescription}>Upload, organize, and manage all your tax documents</p>
          </div>
          <Link href="/dashboard/documents/upload">
            <Button className={styles.uploadButton}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Documents
            </Button>
          </Link>
        </div>

        {error && (
          <Card className={styles.errorCard}>
            <CardContent className={styles.errorContent}>
              <AlertTriangle className={styles.errorIcon} />
              {error}
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <Card className={styles.statCard}>
            <CardContent className={styles.statContent}>
              <FolderOpen className={styles.statIcon} style={{ color: '#7c3aed' }} />
              <div>
                <p className={styles.statValue}>{stats.total}</p>
                <p className={styles.statLabel}>Total Documents</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className={styles.statCard}>
            <CardContent className={styles.statContent}>
              <FileText className={styles.statIcon} style={{ color: '#3b82f6' }} />
              <div>
                <p className={styles.statValue}>{stats.uploaded}</p>
                <p className={styles.statLabel}>Uploaded</p>
              </div>
            </CardContent>
          </Card>

          <Card className={styles.statCard}>
            <CardContent className={styles.statContent}>
              <Clock className={styles.statIcon} style={{ color: '#eab308' }} />
              <div>
                <p className={styles.statValue}>{stats.processing}</p>
                <p className={styles.statLabel}>Processing</p>
              </div>
            </CardContent>
          </Card>

          <Card className={styles.statCard}>
            <CardContent className={styles.statContent}>
              <CheckCircle2 className={styles.statIcon} style={{ color: '#22c55e' }} />
              <div>
                <p className={styles.statValue}>{stats.verified}</p>
                <p className={styles.statLabel}>Verified</p>
              </div>
            </CardContent>
          </Card>

          <Card className={styles.statCard}>
            <CardContent className={styles.statContent}>
              <AlertTriangle className={styles.statIcon} style={{ color: '#ef4444' }} />
              <div>
                <p className={styles.statValue}>{stats.rejected}</p>
                <p className={styles.statLabel}>Rejected</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className={styles.filtersCard}>
          <CardContent className={styles.filtersContent}>
            <div className={styles.filtersGrid}>
              <div className={styles.searchContainer}>
                <Search className={styles.searchIcon} />
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="UPLOADED">Uploaded</SelectItem>
                  <SelectItem value="PROCESSING">Processing</SelectItem>
                  <SelectItem value="VERIFIED">Verified</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {Object.entries(documentTypeLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2024-25">FY 2024-25</SelectItem>
                  <SelectItem value="2023-24">FY 2023-24</SelectItem>
                  <SelectItem value="2022-23">FY 2022-23</SelectItem>
                  <SelectItem value="2021-22">FY 2021-22</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Documents Grid */}
        {documents.length === 0 ? (
          <Card className={styles.emptyCard}>
            <CardContent className={styles.emptyContent}>
              <Archive className={styles.emptyIcon} />
              <h3 className={styles.emptyTitle}>No Documents Found</h3>
              <p className={styles.emptyDescription}>
                {searchQuery || statusFilter !== 'all' || typeFilter !== 'all' 
                  ? 'No documents match your current filters.' 
                  : 'Upload your first document to get started.'}
              </p>
              <Link href="/dashboard/documents/upload">
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className={styles.documentsGrid}>
            {documents.map((doc) => {
              const statusInfo = statusConfig[doc.status] || statusConfig.UPLOADED
              const StatusIcon = statusInfo.icon
              const FileIcon = getFileIcon(doc.mimeType)

              return (
                <Card key={doc.id} className={styles.documentCard}>
                  <CardContent className={styles.documentContent}>
                    <div className={styles.documentHeader}>
                      <div className={styles.documentInfo}>
                        <div className={styles.documentFileIcon}>
                          <FileIcon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className={styles.documentDetails}>
                          <p className={styles.documentName}>
                            {doc.originalName}
                          </p>
                          <p className={styles.documentType}>
                            {documentTypeLabels[doc.type]}
                          </p>
                        </div>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className={styles.documentActions}>
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedDoc(doc)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownload(doc)}>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          {doc.status !== 'VERIFIED' && (
                            <DropdownMenuItem 
                              onClick={() => handleDelete(doc)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className={styles.documentBody}>
                      <div className={styles.documentStatus}>
                        <Badge className={statusInfo.color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusInfo.label}
                        </Badge>
                        <span className={styles.documentSize}>
                          {formatFileSize(doc.size)}
                        </span>
                      </div>

                      {doc.financialYear && (
                        <div className={styles.documentYear}>
                          <Calendar className="w-4 h-4 mr-1" />
                          FY {doc.financialYear}
                        </div>
                      )}

                      {doc.rejectionReason && (
                        <div className={styles.rejectionReason}>
                          {doc.rejectionReason}
                        </div>
                      )}

                      <div className={styles.documentMeta}>
                        <span>
                          Uploaded {new Date(doc.createdAt).toLocaleDateString()}
                        </span>
                        {doc.verifiedAt && (
                          <div className={styles.verifiedBadge}>
                            <Shield className="w-3 h-3 mr-1" />
                            Verified
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Document Details Modal */}
        {selectedDoc && (
          <Dialog open={true} onOpenChange={() => setSelectedDoc(null)}>
            <DialogContent className={styles.modalContent}>
              <DialogHeader className={styles.modalHeader}>
                <DialogTitle className={styles.modalTitle}>Document Details</DialogTitle>
              </DialogHeader>
              <div className={styles.modalBody}>
                <div className={styles.modalDetails}>
                  <div className={styles.detailItem}>
                    <p className={styles.detailLabel}>Original Name</p>
                    <p className={styles.detailValue}>{selectedDoc.originalName}</p>
                  </div>
                  <div className={styles.detailItem}>
                    <p className={styles.detailLabel}>Document Type</p>
                    <p className={styles.detailValue}>{documentTypeLabels[selectedDoc.type]}</p>
                  </div>
                  <div className={styles.detailItem}>
                    <p className={styles.detailLabel}>Status</p>
                    <Badge className={statusConfig[selectedDoc.status].color}>
                      {statusConfig[selectedDoc.status].label}
                    </Badge>
                  </div>
                  <div className={styles.detailItem}>
                    <p className={styles.detailLabel}>File Size</p>
                    <p className={styles.detailValue}>{formatFileSize(selectedDoc.size)}</p>
                  </div>
                  {selectedDoc.financialYear && (
                    <div className={styles.detailItem}>
                      <p className={styles.detailLabel}>Financial Year</p>
                      <p className={styles.detailValue}>FY {selectedDoc.financialYear}</p>
                    </div>
                  )}
                  <div className={styles.detailItem}>
                    <p className={styles.detailLabel}>Uploaded On</p>
                    <p className={styles.detailValue}>
                      {new Date(selectedDoc.createdAt).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
                
                {selectedDoc.rejectionReason && (
                  <div className={styles.modalRejection}>
                    <p className={styles.modalRejectionLabel}>Rejection Reason</p>
                    <div className={styles.modalRejectionContent}>
                      {selectedDoc.rejectionReason}
                    </div>
                  </div>
                )}

                <div className={styles.modalActions}>
                  <Button onClick={() => handleDownload(selectedDoc)}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  {selectedDoc.status !== 'VERIFIED' && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        handleDelete(selectedDoc)
                        setSelectedDoc(null)
                      }}
                      className={styles.modalDeleteButton}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}