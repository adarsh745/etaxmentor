'use client'

import { useState, useEffect } from 'react'
import { Bell, CheckCheck, Trash2, Filter, FileText, CreditCard, AlertCircle, Info, Clock, Loader2 } from 'lucide-react'
import { Button, Card, CardContent } from '@/components/ui'
import styles from './page.module.css'

interface Notification {
  id: string
  type: string
  title: string
  message: string
  createdAt: string
  isRead: boolean
  data?: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/notifications')
      if (!response.ok) throw new Error('Failed to fetch notifications')
      const data = await response.json()
      setNotifications(data.notifications || [])
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  const markAsRead = async (id: string) => {
    try {
      await fetch('/api/notifications/mark-read', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId: id }),
      })
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
      )
    } catch (error) {
      console.error('Error marking as read:', error)
    }
  }

  const markAllAsRead = async () => {
    try {
      await fetch('/api/notifications/mark-read', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markAll: true }),
      })
      setNotifications(prev =>
        prev.map(n => ({ ...n, isRead: true }))
      )
    } catch (error) {
      console.error('Error marking all as read:', error)
    }
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'FILING_UPDATE':
        return <FileText className={styles.iconFiling} />
      case 'PAYMENT_UPDATE':
        return <CreditCard className={styles.iconPayment} />
      case 'DOCUMENT_REQUEST':
        return <AlertCircle className={styles.iconDocument} />
      case 'TICKET_UPDATE':
        return <Info className={styles.iconTicket} />
      case 'GENERAL':
      default:
        return <Bell className={styles.iconGeneral} />
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (hours < 1) return 'Just now'
    if (hours < 24) return `${hours}h ago`
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader2 className={styles.loadingIcon} />
      </div>
    )
  }

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => !n.isRead)

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <h1 className={styles.title}>Notifications</h1>
            {unreadCount > 0 && (
              <span className={styles.badge}>
                {unreadCount} new
              </span>
            )}
          </div>
          <p className={styles.subtitle}>Stay updated with your account activity</p>
        </div>

        <div className={styles.actionsBar}>
          <div className={styles.filterButtons}>
            <Button
              variant={filter === 'all' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'unread' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter('unread')}
            >
              Unread ({unreadCount})
            </Button>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
            >
              <CheckCheck className="w-4 h-4 mr-2" />
              Mark all as read
            </Button>
          )}
        </div>

        <div className={styles.notificationsList}>
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className={styles.emptyCard}>
                <Bell className={styles.emptyIcon} />
                <h3 className={styles.emptyTitle}>No notifications</h3>
                <p className={styles.emptyMessage}>
                  {filter === 'unread' 
                    ? "You're all caught up! No unread notifications."
                    : "You don't have any notifications yet."}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`${styles.notificationCard} ${
                  !notification.isRead ? styles.notificationCardUnread : ''
                }`}
              >
                <CardContent className={styles.notificationContent}>
                  <div className={styles.notificationLayout}>
                    <div className={styles.notificationIconWrapper}>
                      {getIcon(notification.type)}
                    </div>
                    <div className={styles.notificationBody}>
                      <div className={styles.notificationHeader}>
                        <h3 className={styles.notificationTitle}>
                          {notification.title}
                        </h3>
                        <div className={styles.notificationActions}>
                          {!notification.isRead && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className={styles.markReadButton}
                              title="Mark as read"
                            >
                              <CheckCheck className={styles.actionIcon} />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className={styles.deleteButton}
                            title="Delete"
                          >
                            <Trash2 className={styles.actionIcon} />
                          </button>
                        </div>
                      </div>
                      <p className={styles.notificationMessage}>
                        {notification.message}
                      </p>
                      <div className={styles.notificationTime}>
                        <Clock className={styles.timeIcon} />
                        <span>{formatTime(notification.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <Card className={styles.infoCard}>
          <CardContent className={styles.infoContent}>
            <Info className={styles.infoIcon} />
            <div>
              <h3 className={styles.infoTitle}>Notification Settings</h3>
              <p className={styles.infoText}>
                You can manage your notification preferences in the{' '}
                <a href="/dashboard/settings" className={styles.infoLink}>
                  Settings
                </a>{' '}
                page.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}