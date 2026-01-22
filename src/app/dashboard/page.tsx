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
        return 'danger'
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

  // Calculate totals
  const totalFilings = (dashboardData?.stats.totalItrFilings || 0) + (dashboardData?.stats.totalGstFilings || 0)
  const pendingFilings = (dashboardData?.stats.pendingItr || 0) + (dashboardData?.stats.pendingGst || 0)
  const completedFilings = totalFilings - pendingFilings

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Title Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back, <span className="font-semibold text-gray-700">{user?.name || 'User'}</span>!</p>
        </div>
        <div>
          <Link href="/dashboard/itr/new">
            <Button size="md" className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 shadow-md transition-all">
              <Plus className="w-4 h-4 mr-2" />
              New ITR Filing
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 text-red-700">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      ) : (
        <>
          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Filings */}
            <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-600">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Total Filings</p>
                    <p className="text-3xl font-bold text-gray-900">{totalFilings}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pending */}
            <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-yellow-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Pending Action</p>
                    <p className="text-3xl font-bold text-gray-900">{pendingFilings}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Completed */}
            <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Completed</p>
                    <p className="text-3xl font-bold text-gray-900">{completedFilings}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Documents</p>
                    <p className="text-3xl font-bold text-gray-900">{dashboardData?.stats.totalDocuments || 0}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                    <Upload className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Filings Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Recent Filings</h2>
                <Link href="/dashboard/itr" className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center gap-1 transition-colors">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <Card className="shadow-sm border border-gray-200">
                <CardContent className="p-0">
                  {dashboardData?.recentItrFilings && dashboardData.recentItrFilings.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {dashboardData.recentItrFilings.map((filing) => {
                        const StatusIcon = getStatusIcon(filing.status)
                        return (
                          <div key={filing.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-gray-50 transition-colors gap-4">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 sm:mt-0">
                                <FileText className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{filing.itrType} <span className="text-gray-400 font-normal mx-1">•</span> {filing.assessmentYear}</p>
                                <p className="text-sm text-gray-500 mt-0.5">Filed on {formatDate(filing.createdAt)}</p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pl-14 sm:pl-0">
                              <div className="text-left sm:text-right">
                                <p className="text-xs text-gray-500 uppercase font-medium tracking-wide">Tax Amount</p>
                                <p className="font-semibold text-gray-900">{formatCurrency(filing.taxPayable)}</p>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                <Badge variant={getStatusColor(filing.status) as any}>
                                  <StatusIcon className="w-3 h-3 mr-1.5" />
                                  {filing.status}
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
                    <div className="text-center py-16 px-4">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900">No filings yet</h3>
                      <p className="text-gray-500 mb-6 max-w-sm mx-auto">Get started by creating your first Income Tax Return filing today.</p>
                      <Link href="/dashboard/itr/new">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Create New Filing
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Activity & Deadline */}
            <div className="space-y-8">
              {/* Recent Activity */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <Card className="shadow-sm border border-gray-200">
                  <CardContent className="p-0">
                    {dashboardData?.recentActivity && dashboardData.recentActivity.length > 0 ? (
                      <div className="divide-y divide-gray-100">
                        {dashboardData.recentActivity.slice(0, 5).map((activity) => (
                          <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex gap-3">
                              <div className="mt-1">
                                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.1)]"></div>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{activity.description}</p>
                                <p className="text-[10px] text-gray-400 mt-1.5 uppercase font-medium">{formatDate(activity.createdAt)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 px-4">
                        <Clock className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm">No recent activity found</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Deadline Card - Enhanced */}
              <Card className="bg-gradient-to-br from-blue-900 to-blue-700 border-none shadow-lg text-white relative overflow-hidden group">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/20 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/30 rounded-full -ml-12 -mb-12 blur-xl"></div>
                
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight">Upcoming Deadline</h3>
                      <p className="text-blue-100 text-xs">Don't miss the date</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-blue-100 text-sm">ITR Filing Deadline</p>
                      <p className="text-2xl font-bold mt-1">July 31, 2026</p>
                    </div>
                    
                    <Link href="/dashboard/itr/new" className="block">
                      <Button size="sm" className="w-full bg-white text-blue-900 hover:bg-blue-50 font-semibold border-none shadow-sm">
                        File Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  )
}