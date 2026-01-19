'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  FileText, Upload, Clock, CheckCircle, AlertCircle, 
  CreditCard, Bell, Settings, LogOut, User, Home, 
  Receipt, TrendingUp, HelpCircle, ChevronRight,
  Plus, Download, Eye, Calendar, BarChart3
} from 'lucide-react'
import { Button, Card, CardContent, Badge } from '@/components/ui'

// Mock data - will be replaced with real data from API
const userStats = {
  totalFilings: 5,
  pendingFilings: 1,
  completedFilings: 4,
  totalRefund: 45000,
}

const recentFilings = [
  {
    id: '1',
    type: 'ITR-1',
    year: 'AY 2024-25',
    status: 'completed',
    date: '2024-07-15',
    refund: 12500,
  },
  {
    id: '2',
    type: 'ITR-1',
    year: 'AY 2023-24',
    status: 'completed',
    date: '2023-07-28',
    refund: 8000,
  },
  {
    id: '3',
    type: 'ITR-2',
    year: 'AY 2022-23',
    status: 'completed',
    date: '2022-07-20',
    refund: 15000,
  },
]

const notifications = [
  {
    id: '1',
    title: 'ITR Filing Deadline',
    message: 'File your ITR before July 31st to avoid late fees',
    type: 'warning',
    date: '2024-07-01',
  },
  {
    id: '2',
    title: 'Refund Credited',
    message: 'Your refund of ₹12,500 has been credited',
    type: 'success',
    date: '2024-06-28',
  },
]

const sidebarItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard', active: true },
  { icon: FileText, label: 'ITR Filing', href: '/dashboard/itr' },
  { icon: Receipt, label: 'GST Services', href: '/dashboard/gst' },
  { icon: Upload, label: 'Documents', href: '/dashboard/documents' },
  { icon: CreditCard, label: 'Payments', href: '/dashboard/payments' },
  { icon: Bell, label: 'Notifications', href: '/dashboard/notifications' },
  { icon: HelpCircle, label: 'Support', href: '/dashboard/support' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success'
      case 'pending': return 'warning'
      case 'processing': return 'info'
      default: return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle
      case 'pending': return Clock
      case 'processing': return Clock
      default: return AlertCircle
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 fixed left-0 top-0 h-full z-40 transition-all duration-300`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">eT</span>
            </div>
            {sidebarOpen && (
              <span className="text-xl font-bold text-[#1E3A8A]">eTaxMentor</span>
            )}
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-[#1E3A8A] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, John!</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-10 h-10 bg-[#1E3A8A] rounded-full flex items-center justify-center text-white font-semibold">
              J
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Filings</p>
                    <p className="text-3xl font-bold text-gray-900">{userStats.totalFilings}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Pending</p>
                    <p className="text-3xl font-bold text-yellow-600">{userStats.pendingFilings}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Completed</p>
                    <p className="text-3xl font-bold text-green-600">{userStats.completedFilings}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Refund</p>
                    <p className="text-3xl font-bold text-[#1E3A8A]">₹{userStats.totalRefund.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/dashboard/itr/new">
                <Card className="hover:shadow-lg transition-all hover:border-[#1E3A8A] cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-[#1E3A8A]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Plus className="w-6 h-6 text-[#1E3A8A]" />
                    </div>
                    <p className="font-medium text-gray-900">New ITR Filing</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/dashboard/documents">
                <Card className="hover:shadow-lg transition-all hover:border-[#10B981] cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-6 h-6 text-[#10B981]" />
                    </div>
                    <p className="font-medium text-gray-900">Upload Documents</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/dashboard/support">
                <Card className="hover:shadow-lg transition-all hover:border-[#F59E0B] cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-[#F59E0B]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <HelpCircle className="w-6 h-6 text-[#F59E0B]" />
                    </div>
                    <p className="font-medium text-gray-900">Get Support</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/dashboard/calculator">
                <Card className="hover:shadow-lg transition-all hover:border-[#8B5CF6] cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BarChart3 className="w-6 h-6 text-[#8B5CF6]" />
                    </div>
                    <p className="font-medium text-gray-900">Tax Calculator</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Filings */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Recent Filings</h2>
                    <Link href="/dashboard/filings" className="text-[#1E3A8A] text-sm hover:underline flex items-center gap-1">
                      View All <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {recentFilings.map((filing) => {
                      const StatusIcon = getStatusIcon(filing.status)
                      return (
                        <div key={filing.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-[#1E3A8A]/10 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-[#1E3A8A]" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{filing.type} - {filing.year}</p>
                              <p className="text-sm text-gray-500">Filed on {filing.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Refund</p>
                              <p className="font-semibold text-green-600">₹{filing.refund.toLocaleString()}</p>
                            </div>
                            <Badge variant={getStatusColor(filing.status) as any}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {filing.status}
                            </Badge>
                            <div className="flex gap-2">
                              <button className="p-2 hover:bg-gray-200 rounded-lg" title="View">
                                <Eye className="w-4 h-4 text-gray-500" />
                              </button>
                              <button className="p-2 hover:bg-gray-200 rounded-lg" title="Download">
                                <Download className="w-4 h-4 text-gray-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Notifications */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
                    <Link href="/dashboard/notifications" className="text-[#1E3A8A] text-sm hover:underline">
                      View All
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`p-4 rounded-lg ${
                        notification.type === 'warning' ? 'bg-yellow-50 border border-yellow-100' :
                        notification.type === 'success' ? 'bg-green-50 border border-green-100' :
                        'bg-gray-50'
                      }`}>
                        <div className="flex items-start gap-3">
                          {notification.type === 'warning' ? (
                            <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                          ) : (
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          )}
                          <div>
                            <p className="font-medium text-gray-900">{notification.title}</p>
                            <p className="text-sm text-gray-600">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Deadline Reminder */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] rounded-lg text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-5 h-5" />
                      <span className="font-semibold">Upcoming Deadline</span>
                    </div>
                    <p className="text-blue-100 text-sm mb-3">
                      ITR filing deadline: July 31, 2024
                    </p>
                    <Button size="sm" className="bg-white text-[#1E3A8A] hover:bg-gray-100 w-full">
                      File Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
