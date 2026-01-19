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

      // Redirect to filings list after successful deletion
      window.location.href = '/dashboard/gst'
    } catch (err: any) {
      setError(err.message)
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl text-center py-24">
          <RefreshCw className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading filing details...</p>
        </div>
      </div>
    )
  }

  if (error || !filing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link href="/dashboard/gst" className="inline-flex items-center text-orange-600 hover:text-orange-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to GST Filings
          </Link>
          <Card>
            <CardContent className="p-12 text-center">
              <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Filing Not Found</h3>
              <p className="text-gray-600 mb-6">{error || 'Could not load this filing'}</p>
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard/gst" className="inline-flex items-center text-orange-600 hover:text-orange-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to GST Filings
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {returnInfo.label} Filing - {filing.period}
              </h1>
              <p className="text-gray-600">Filing ID: {filing.id}</p>
            </div>
            <div className="flex items-center space-x-3">
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
                  className="text-red-600 hover:text-red-800 border-red-200 hover:border-red-300"
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

        {/* Status Card */}
        <Card className="mb-8 border-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${statusInfo.color}`}>
                  <StatusIcon className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{statusInfo.label}</h2>
                  <p className="text-gray-600">{statusInfo.description}</p>
                </div>
              </div>
              <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
            </div>

            {/* Status Progress */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Filing Progress</p>
              <div className="flex items-center justify-between">
                {statusFlow.map((status, index) => {
                  const isActive = index <= currentStatusIndex
                  return (
                    <div key={status} className="flex flex-col items-center flex-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                          isActive ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {index + 1}
                      </div>
                      {index < statusFlow.length - 1 && (
                        <div
                          className={`flex-1 h-1 ${isActive ? 'bg-orange-600' : 'bg-gray-200'}`}
                          style={{ margin: '8px 0', width: '100%' }}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {filing.acknowledgmentNo && (
              <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <p className="text-sm text-green-700">
                  <span className="font-semibold">Acknowledgment ARN:</span> {filing.acknowledgmentNo}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Filing Summary */}
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-6">Filing Summary</h3>

              {/* Basic Info */}
              <div className="mb-8">
                <h4 className="font-medium text-gray-700 mb-4 text-sm">Basic Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">GSTIN</p>
                    <p className="font-medium text-gray-900">{filing.gstin}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Trade Name</p>
                    <p className="font-medium text-gray-900">{filing.tradeName || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Return Type</p>
                    <p className="font-medium text-gray-900">{returnInfo.label}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Period</p>
                    <p className="font-medium text-gray-900">{filing.period}</p>
                  </div>
                </div>
              </div>

              {/* Sales & Purchase Breakdown */}
              <div className="mb-8 p-4 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-4 text-sm">Sales Breakdown</h4>
                {filing.formData && (
                  <div className="space-y-2 text-sm">
                    {filing.formData.b2bSales > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">B2B Sales:</span>
                        <span className="font-medium">₹{filing.formData.b2bSales.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {filing.formData.b2cSales > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">B2C Sales:</span>
                        <span className="font-medium">₹{filing.formData.b2cSales.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {filing.formData.exportSales > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Export Sales:</span>
                        <span className="font-medium">₹{filing.formData.exportSales.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {filing.formData.exemptSales > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Exempt Sales:</span>
                        <span className="font-medium">₹{filing.formData.exemptSales.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-4 text-sm">Tax Details</h4>
                {filing.formData && (
                  <div className="space-y-2 text-sm">
                    {filing.formData.igst > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">IGST:</span>
                        <span className="font-medium">₹{filing.formData.igst.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {filing.formData.cgst > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">CGST:</span>
                        <span className="font-medium">₹{filing.formData.cgst.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {filing.formData.sgst > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">SGST:</span>
                        <span className="font-medium">₹{filing.formData.sgst.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {filing.formData.itcClaimed > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">ITC Claimed:</span>
                        <span className="font-medium text-green-600">₹{filing.formData.itcClaimed.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {filing.remarks && (
                <div className="mt-8">
                  <h4 className="font-medium text-gray-700 mb-3">Remarks</h4>
                  <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded">{filing.remarks}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tax Summary Sidebar */}
          <div className="space-y-6">
            {/* Tax Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Receipt className="w-5 h-5 mr-2 text-orange-600" />
                  GST Summary
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Total Sales</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{totalSalesNum.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-xs text-gray-500 mb-1">Total Purchases</p>
                    <p className="text-xl font-semibold text-blue-600">
                      ₹{totalPurchasesNum.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-xs text-gray-500 mb-1">ITC Claimed</p>
                    <p className="text-xl font-semibold text-green-600">
                      ₹{(filing.itcClaimed ? parseFloat(filing.itcClaimed) : 0).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="border-t pt-4 bg-orange-50 p-4 rounded">
                    <p className="text-xs text-gray-500 mb-1">Tax Payable</p>
                    <p className="text-2xl font-bold text-orange-600">
                      ₹{taxPayableNum.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                  Timeline
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-500">Created</p>
                    <p className="font-medium">{new Date(filing.createdAt).toLocaleDateString('en-IN')}</p>
                  </div>
                  {filing.filedAt && (
                    <div className="border-t pt-3">
                      <p className="text-xs text-gray-500">Filed</p>
                      <p className="font-medium">{new Date(filing.filedAt).toLocaleDateString('en-IN')}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        {filing.status === 'DRAFT' && (
          <div className="mb-8 text-center">
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