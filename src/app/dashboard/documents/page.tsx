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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12">
        <div className="container mx-auto px-4 max-w-7xl text-center py-24">
          <RefreshCw className="w-12 h-12 animate-spin text-purple-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading documents...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Manager</h1>
            <p className="text-gray-600">Upload, organize, and manage all your tax documents</p>
          </div>
          <Link href="/dashboard/documents/upload">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Upload className="w-4 h-4 mr-2" />
              Upload Documents
            </Button>
          </Link>
        </div>

        {error && (
          <Card className="mb-6 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center text-red-600">
                <AlertTriangle className="w-4 h-4 mr-2" />
                {error}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FolderOpen className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  <p className="text-xs text-gray-500">Total Documents</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stats.uploaded}</p>
                  <p className="text-xs text-gray-500">Uploaded</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stats.processing}</p>
                  <p className="text-xs text-gray-500">Processing</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stats.verified}</p>
                  <p className="text-xs text-gray-500">Verified</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
                  <p className="text-xs text-gray-500">Rejected</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
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
          <Card>
            <CardContent className="p-12 text-center">
              <Archive className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Documents Found</h3>
              <p className="text-gray-600 mb-6">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {documents.map((doc) => {
              const statusInfo = statusConfig[doc.status] || statusConfig.UPLOADED
              const StatusIcon = statusInfo.icon
              const FileIcon = getFileIcon(doc.mimeType)

              return (
                <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                          <FileIcon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {doc.originalName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {documentTypeLabels[doc.type]}
                          </p>
                        </div>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
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

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge className={statusInfo.color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusInfo.label}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {formatFileSize(doc.size)}
                        </span>
                      </div>

                      {doc.financialYear && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          FY {doc.financialYear}
                        </div>
                      )}

                      {doc.rejectionReason && (
                        <div className="p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
                          {doc.rejectionReason}
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>
                          Uploaded {new Date(doc.createdAt).toLocaleDateString()}
                        </span>
                        {doc.verifiedAt && (
                          <div className="flex items-center">
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
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Document Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Original Name</p>
                    <p className="text-gray-900">{selectedDoc.originalName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Document Type</p>
                    <p className="text-gray-900">{documentTypeLabels[selectedDoc.type]}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <Badge className={statusConfig[selectedDoc.status].color}>
                      {statusConfig[selectedDoc.status].label}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">File Size</p>
                    <p className="text-gray-900">{formatFileSize(selectedDoc.size)}</p>
                  </div>
                  {selectedDoc.financialYear && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Financial Year</p>
                      <p className="text-gray-900">FY {selectedDoc.financialYear}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-500">Uploaded On</p>
                    <p className="text-gray-900">
                      {new Date(selectedDoc.createdAt).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
                
                {selectedDoc.rejectionReason && (
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-2">Rejection Reason</p>
                    <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700">
                      {selectedDoc.rejectionReason}
                    </div>
                  </div>
                )}

                <div className="flex space-x-3 pt-4">
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
                      className="text-red-600 hover:text-red-700"
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