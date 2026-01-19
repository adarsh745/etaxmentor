'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  ArrowLeft, Eye, Download, Edit, Send, Clock, CheckCircle2, 
  AlertCircle, FileText, DollarSign, TrendingUp, User, Calendar,
  Phone, MapPin, Plus, Share2, RefreshCw, X
} from 'lucide-react'
import { Button, Card, CardContent, Badge } from '@/components/ui'

interface ITRFilingDetails {
  id: string
  itrType: string
  assessmentYear: string
  financialYear: string
  status: string
  pan?: string
  aadhaar?: string
  grossIncome?: string
  taxableIncome?: string
  totalDeductions?: string
  taxPayable?: string
  tdsDeducted?: string
  refundDue?: string
  acknowledgmentNo?: string
  filedAt?: string
  assignedCAId?: string
  assignedAt?: string
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
    description: 'Your filing is under review by our CA experts.'
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
    description: 'Your ITR has been filed with the IT Department.'
  },
  ACKNOWLEDGED: { 
    label: 'Acknowledged', 
    color: 'bg-green-100 text-green-800', 
    icon: CheckCircle2,
    description: 'Your filing has been acknowledged by IT Department.'
  },
  COMPLETED: { 
    label: 'Completed', 
    color: 'bg-green-100 text-green-800', 
    icon: CheckCircle2,
    description: 'Your ITR filing is complete.'
  },
  REJECTED: { 
    label: 'Rejected', 
    color: 'bg-red-100 text-red-800', 
    icon: AlertCircle,
    description: 'Your filing has been rejected. Please contact support.'
  },
}

const statusFlow = ['DRAFT', 'DOCUMENTS_PENDING', 'UNDER_REVIEW', 'CA_ASSIGNED', 'PROCESSING', 'FILED', 'ACKNOWLEDGED', 'COMPLETED']

export default function ITRFilingDetailsPage() {
  const params = useParams()
  const filingId = params.id as string
  
  const [filing, setFiling] = useState<ITRFilingDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchFilingDetails()
  }, [filingId])

  const fetchFilingDetails = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/itr/${filingId}`, {
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
      const response = await fetch(`/api/itr/${filingId}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to delete filing')
      }

      // Redirect to filings list after successful deletion
      window.location.href = '/dashboard/itr'
    } catch (err: any) {
      setError(err.message)
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl text-center py-24">
          <RefreshCw className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading filing details...</p>
        </div>
      </div>
    )
  }

  if (error || !filing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link href="/dashboard/itr" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Filings
          </Link>
          <Card>
            <CardContent className="p-12 text-center">
              <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Filing Not Found</h3>
              <p className="text-gray-600 mb-6">{error || 'Could not load this filing'}</p>
              <Link href="/dashboard/itr">
                <Button>Back to Filings</Button>
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
  const grossIncomeNum = filing.grossIncome ? parseFloat(filing.grossIncome) : 0
  const taxableIncomeNum = filing.taxableIncome ? parseFloat(filing.taxableIncome) : 0
  const taxPayableNum = filing.taxPayable ? parseFloat(filing.taxPayable) : 0
  const refundDueNum = filing.refundDue ? parseFloat(filing.refundDue) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard/itr" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Filings
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {filing.itrType} Filing - AY {filing.assessmentYear}
              </h1>
              <p className="text-gray-600">Filing ID: {filing.id}</p>
            </div>
            <div className="flex items-center space-x-3">
              {(['DRAFT', 'DOCUMENTS_PENDING'].includes(filing.status)) && (
                <Link href={`/dashboard/itr/new?id=${filing.id}`}>
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
                          isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {index + 1}
                      </div>
                      {index < statusFlow.length - 1 && (
                        <div
                          className={`flex-1 h-1 ${isActive ? 'bg-blue-600' : 'bg-gray-200'}`}
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
                  <span className="font-semibold">Acknowledgment Number:</span> {filing.acknowledgmentNo}
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
                    <p className="text-xs text-gray-500 mb-1">PAN Number</p>
                    <p className="font-medium text-gray-900">{filing.pan || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Aadhaar Number</p>
                    <p className="font-medium text-gray-900">{filing.aadhaar || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Financial Year</p>
                    <p className="font-medium text-gray-900">{filing.financialYear}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Assessment Year</p>
                    <p className="font-medium text-gray-900">{filing.assessmentYear}</p>
                  </div>
                </div>
              </div>

              {/* Income & Deductions */}
              <div className="mb-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-4 text-sm">Income Breakdown</h4>
                {filing.formData && (
                  <div className="space-y-2 text-sm">
                    {filing.formData.salaryIncome > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Salary Income:</span>
                        <span className="font-medium">₹{filing.formData.salaryIncome.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {filing.formData.housePropertyIncome > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">House Property Income:</span>
                        <span className="font-medium">₹{filing.formData.housePropertyIncome.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {filing.formData.capitalGains > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Capital Gains:</span>
                        <span className="font-medium">₹{filing.formData.capitalGains.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {filing.formData.businessIncome > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Business Income:</span>
                        <span className="font-medium">₹{filing.formData.businessIncome.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {filing.formData.otherIncome > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Other Income:</span>
                        <span className="font-medium">₹{filing.formData.otherIncome.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-4 text-sm">Deductions</h4>
                {filing.formData && (
                  <div className="space-y-2 text-sm">
                    {filing.formData.section80C > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Section 80C:</span>
                        <span className="font-medium">₹{filing.formData.section80C.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {filing.formData.section80D > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Section 80D:</span>
                        <span className="font-medium">₹{filing.formData.section80D.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {filing.formData.section80G > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Section 80G:</span>
                        <span className="font-medium">₹{filing.formData.section80G.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {filing.formData.homeLoanInterest > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Home Loan Interest:</span>
                        <span className="font-medium">₹{filing.formData.homeLoanInterest.toLocaleString('en-IN')}</span>
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
                  <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                  Tax Summary
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Gross Income</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{grossIncomeNum.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-xs text-gray-500 mb-1">Total Deductions</p>
                    <p className="text-xl font-semibold text-green-600">
                      - ₹{(filing.totalDeductions ? parseFloat(filing.totalDeductions) : 0).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="border-t pt-4 bg-blue-50 p-4 rounded">
                    <p className="text-xs text-gray-500 mb-1">Taxable Income</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ₹{taxableIncomeNum.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="border-t pt-4">
                    {taxPayableNum > 0 ? (
                      <>
                        <p className="text-xs text-gray-500 mb-1">Tax Payable</p>
                        <p className="text-2xl font-bold text-red-600">
                          ₹{taxPayableNum.toLocaleString('en-IN')}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-xs text-gray-500 mb-1">Refund Due</p>
                        <p className="text-2xl font-bold text-green-600">
                          ₹{refundDueNum.toLocaleString('en-IN')}
                        </p>
                      </>
                    )}
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
                  {filing.assignedAt && (
                    <div className="border-t pt-3">
                      <p className="text-xs text-gray-500">Assigned to CA</p>
                      <p className="font-medium">{new Date(filing.assignedAt).toLocaleDateString('en-IN')}</p>
                    </div>
                  )}
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
            <Link href={`/dashboard/itr/new?id=${filing.id}`}>
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
