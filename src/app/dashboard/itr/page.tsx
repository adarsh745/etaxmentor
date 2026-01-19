'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { 
  FileText, Plus, Search, Filter, Calendar, Eye, Download,
  AlertCircle, CheckCircle2, Clock, Send, ArrowLeft, RefreshCw
} from 'lucide-react'
import { Button, Card, CardContent, Badge } from '@/components/ui'

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My ITR Filings</h1>
              <p className="text-gray-600">Track and manage your income tax returns</p>
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
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Filings</p>
                  <p className="text-2xl font-bold text-gray-900">{filings.length}</p>
                </div>
                <FileText className="w-10 h-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Completed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {filings.filter((f) => f.status === 'COMPLETED' || f.status === 'ACKNOWLEDGED').length}
                  </p>
                </div>
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">In Progress</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {filings.filter((f) => 
                      ['UNDER_REVIEW', 'CA_ASSIGNED', 'PROCESSING'].includes(f.status)
                    ).length}
                  </p>
                </div>
                <Clock className="w-10 h-10 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Drafts</p>
                  <p className="text-2xl font-bold text-gray-600">
                    {filings.filter((f) => f.status === 'DRAFT').length}
                  </p>
                </div>
                <FileText className="w-10 h-10 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by ITR type, year, or ACK number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-start">
            <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Filings List */}
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600">Loading your filings...</p>
          </div>
        ) : filteredFilings.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {filings.length === 0 ? 'No ITR filings yet' : 'No filings match your filters'}
              </h3>
              <p className="text-gray-600 mb-6">
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
          <div className="space-y-4">
            {filteredFilings.map((filing) => {
              const statusInfo = statusConfig[filing.status] || statusConfig.DRAFT
              const StatusIcon = statusInfo.icon

              return (
                <Card key={filing.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <h3 className="text-lg font-semibold text-gray-900 mr-3">
                            {filing.itrType} - AY {filing.assessmentYear}
                          </h3>
                          <Badge className={statusInfo.color}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusInfo.label}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4 mb-4">
                          {filing.grossIncome !== undefined && (
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Gross Income</p>
                              <p className="text-sm font-medium text-gray-900">
                                ₹{filing.grossIncome.toLocaleString('en-IN')}
                              </p>
                            </div>
                          )}
                          
                          {filing.taxableIncome !== undefined && (
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Taxable Income</p>
                              <p className="text-sm font-medium text-gray-900">
                                ₹{filing.taxableIncome.toLocaleString('en-IN')}
                              </p>
                            </div>
                          )}

                          {filing.taxPayable !== undefined && (
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Tax Payable</p>
                              <p className="text-sm font-medium text-red-600">
                                ₹{filing.taxPayable.toLocaleString('en-IN')}
                              </p>
                            </div>
                          )}

                          {filing.refundDue !== undefined && filing.refundDue > 0 && (
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Refund Due</p>
                              <p className="text-sm font-medium text-green-600">
                                ₹{filing.refundDue.toLocaleString('en-IN')}
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
                              ACK: {filing.acknowledgmentNo}
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
  )
}
