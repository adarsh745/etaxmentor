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

  // Calculate stats
  const totalFilings = filings.length
  const completedFilings = filings.filter(f => ['COMPLETED', 'ACKNOWLEDGED'].includes(f.status)).length
  const inProgressFilings = filings.filter(f => ['UNDER_REVIEW', 'CA_ASSIGNED', 'PROCESSING'].includes(f.status)).length
  const draftFilings = filings.filter(f => f.status === 'DRAFT').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-orange-600 hover:text-orange-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My GST Filings</h1>
              <p className="text-gray-600">Track and manage your GST returns</p>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Receipt className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Filings</p>
                  <p className="text-2xl font-bold text-gray-900">{totalFilings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle2 className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{completedFilings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-orange-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-orange-600">{inProgressFilings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-gray-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Drafts</p>
                  <p className="text-2xl font-bold text-gray-600">{draftFilings}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by GSTIN, return type, period..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Error State */}
        {error && (
          <Card className="mb-6">
            <CardContent className="p-6 text-center">
              <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Filings</h3>
              <p className="text-gray-600 mb-4">{error}</p>
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
            <CardContent className="p-12 text-center">
              <RefreshCw className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
              <p className="text-gray-600">Loading your GST filings...</p>
            </CardContent>
          </Card>
        ) : filteredFilings.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {filings.length === 0 ? 'No GST Filings Yet' : 'No Matching Filings'}
              </h3>
              <p className="text-gray-600 mb-6">
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
          <div className="space-y-4">
            {filteredFilings.map((filing) => {
              const statusInfo = statusConfig[filing.status] || statusConfig.DRAFT
              const StatusIcon = statusInfo.icon
              const returnTypeInfo = returnTypes.find(t => t.value === filing.returnType)

              return (
                <Card key={filing.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <h3 className="text-lg font-semibold text-gray-900 mr-3">
                            {filing.returnType} - {filing.period}
                          </h3>
                          <Badge className={statusInfo.color}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusInfo.label}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">GSTIN</p>
                            <p className="text-sm font-medium text-gray-900">
                              {filing.gstin}
                            </p>
                          </div>

                          {filing.tradeName && (
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Trade Name</p>
                              <p className="text-sm font-medium text-gray-900">
                                {filing.tradeName}
                              </p>
                            </div>
                          )}

                          {filing.totalSales && (
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Total Sales</p>
                              <p className="text-sm font-medium text-gray-900">
                                ₹{parseFloat(filing.totalSales).toLocaleString('en-IN')}
                              </p>
                            </div>
                          )}

                          {filing.taxPayable && (
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Tax Payable</p>
                              <p className="text-sm font-medium text-red-600">
                                ₹{parseFloat(filing.taxPayable).toLocaleString('en-IN')}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-6 text-xs text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            Created {new Date(filing.createdAt).toLocaleDateString('en-IN')}
                          </div>
                          {filing.acknowledgmentNo && (
                            <div className="flex items-center">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              ARN: {filing.acknowledgmentNo}
                            </div>
                          )}
                          {filing.filedAt && (
                            <div className="flex items-center">
                              <Send className="w-3 h-3 mr-1" />
                              Filed {new Date(filing.filedAt).toLocaleDateString('en-IN')}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <Link href={`/dashboard/gst/${filing.id}`}>
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
  )
}