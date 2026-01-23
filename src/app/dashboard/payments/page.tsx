'use client'

import { useState, useEffect } from 'react'
import { CreditCard, Download, Search, CheckCircle, Clock, XCircle, Calendar, FileText, Loader2 } from 'lucide-react'
import { Button, Card, CardContent } from '@/components/ui'
import styles from './page.module.css'

interface Payment {
  id: string
  amount: number
  status: 'PENDING' | 'COMPLETED' | 'FAILED'
  serviceType: string
  serviceName: string
  description: string | null
  gatewayId: string | null
  invoiceNumber: string | null
  invoiceUrl: string | null
  createdAt: string
  updatedAt: string
  completedAt: string | null
  user?: {
    id: string
    name: string
    email: string
  }
}

interface PaymentStats {
  totalPayments: number
  totalAmount: number
  successfulPayments: number
  successfulAmount: number
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [stats, setStats] = useState<PaymentStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'COMPLETED' | 'PENDING' | 'FAILED'>('all')

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/payments')
      if (!response.ok) throw new Error('Failed to fetch payments')
      const data = await response.json()
      setPayments(data.payments || [])
      setStats(data.stats || null)
    } catch (error) {
      console.error('Error fetching payments:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const normalizedStatus = status.toLowerCase()
    const badgeClasses: Record<string, string> = {
      completed: styles.statusCompleted,
      pending: styles.statusPending,
      failed: styles.statusFailed,
    }
    const icons: Record<string, React.ReactNode> = {
      completed: <CheckCircle className={styles.statusIcon} />,
      pending: <Clock className={styles.statusIcon} />,
      failed: <XCircle className={styles.statusIcon} />,
    }
    return (
      <span className={`${styles.statusBadge} ${badgeClasses[normalizedStatus] || badgeClasses.pending}`}>
        {icons[normalizedStatus] || icons.pending}
        {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
      </span>
    )
  }

  const filteredPayments = payments
    .filter(p => statusFilter === 'all' || p.status === statusFilter)
    .filter(p => 
      p.serviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.gatewayId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase())
    )

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader2 className={styles.loadingIcon} />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Payments & Billing</h1>
          <p className={styles.subtitle}>Track your payment history and download invoices</p>
        </div>

        <div className={styles.statsGrid}>
          <Card>
            <CardContent className={styles.statsCard}>
              <div className={styles.statsContent}>
                <div className={styles.statsInfo}>
                  <p className={styles.statsLabel}>Total Spent</p>
                  <p className={styles.statsValue}>₹{(stats?.successfulAmount || 0).toLocaleString()}</p>
                </div>
                <div className={`${styles.statsIcon} ${styles.statsIconGreen}`}>
                  <CreditCard className={styles.iconGreen} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className={styles.statsCard}>
              <div className={styles.statsContent}>
                <div className={styles.statsInfo}>
                  <p className={styles.statsLabel}>Completed</p>
                  <p className={styles.statsValue}>
                    {payments.filter(p => p.status === 'COMPLETED').length}
                  </p>
                </div>
                <div className={`${styles.statsIcon} ${styles.statsIconBlue}`}>
                  <CheckCircle className={styles.iconBlue} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className={styles.statsCard}>
              <div className={styles.statsContent}>
                <div className={styles.statsInfo}>
                  <p className={styles.statsLabel}>Pending</p>
                  <p className={styles.statsValue}>
                    {payments.filter(p => p.status === 'PENDING').length}
                  </p>
                </div>
                <div className={`${styles.statsIcon} ${styles.statsIconYellow}`}>
                  <Clock className={styles.iconYellow} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className={styles.noticeCard}>
          <CardContent className={styles.noticeContent}>
            <CreditCard className={styles.noticeIcon} />
            <div>
              <h3 className={styles.noticeTitle}>Payment System Ready</h3>
              <p className={styles.noticeText}>
                Payment integration with Razorpay is configured. Once you provide your Razorpay keys in .env, users will be able to make payments directly through this platform.
              </p>
              <div className={styles.noticeActions}>
                <Button size="sm" disabled>
                  Add Payment Method (Coming Soon)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={styles.filtersCard}>
          <CardContent className={styles.filtersContent}>
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search by order ID or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <div className={styles.filterButtons}>
              <Button
                variant={statusFilter === 'all' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'COMPLETED' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('COMPLETED')}
              >
                Completed
              </Button>
              <Button
                variant={statusFilter === 'PENDING' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('PENDING')}
              >
                Pending
              </Button>
              <Button
                variant={statusFilter === 'FAILED' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('FAILED')}
              >
                Failed
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className={styles.tableCard}>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead className={styles.tableHead}>
                  <tr>
                    <th className={styles.tableHeaderCell}>Order ID</th>
                    <th className={styles.tableHeaderCell}>Service</th>
                    <th className={styles.tableHeaderCell}>Amount</th>
                    <th className={styles.tableHeaderCell}>Status</th>
                    <th className={styles.tableHeaderCell}>Method</th>
                    <th className={styles.tableHeaderCell}>Date</th>
                    <th className={styles.tableHeaderCell}>Action</th>
                  </tr>
                </thead>
                <tbody className={styles.tableBody}>
                  {filteredPayments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className={styles.emptyRow}>
                        <CreditCard className={styles.emptyIcon} />
                        <p className={styles.emptyText}>No payments found</p>
                      </td>
                    </tr>
                  ) : (
                    filteredPayments.map((payment) => (
                      <tr key={payment.id} className={styles.tableRow}>
                        <td className={styles.tableCell}>
                          <div className={styles.orderIdCell}>
                            <FileText className={styles.orderIcon} />
                            <span className={styles.orderText}>{payment.gatewayId || payment.invoiceNumber || payment.id.slice(0, 8)}</span>
                          </div>
                        </td>
                        <td className={styles.tableCellWrap}>
                          <span className={styles.serviceText}>{payment.serviceName}</span>
                        </td>
                        <td className={styles.tableCell}>
                          <span className={styles.amountText}>
                            ₹{payment.amount.toLocaleString()}
                          </span>
                        </td>
                        <td className={styles.tableCell}>
                          {getStatusBadge(payment.status)}
                        </td>
                        <td className={styles.tableCell}>
                          <span className={styles.methodText}>Razorpay</span>
                        </td>
                        <td className={styles.tableCell}>
                          <div className={styles.dateCell}>
                            <Calendar className={styles.dateIcon} />
                            {new Date(payment.createdAt).toLocaleDateString('en-IN')}
                          </div>
                        </td>
                        <td className={styles.tableCell}>
                          {payment.status === 'COMPLETED' && payment.invoiceUrl ? (
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Invoice
                            </Button>
                          ) : payment.status === 'PENDING' ? (
                            <Button size="sm" disabled>
                              Pay Now (Soon)
                            </Button>
                          ) : (
                            <span className={styles.noAction}>-</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}