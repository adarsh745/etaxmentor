'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, Plus, Search, Filter, Clock, CheckCircle, XCircle, MessageCircle, Send, Paperclip, ChevronLeft, Loader2 } from 'lucide-react'
import { Button, Card, CardContent, Input } from '@/components/ui'
import { useAuth } from '@/contexts'
import styles from './page.module.css'

interface Ticket {
  id: string
  subject: string
  category: string
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  createdAt: string
  lastReply: string
  messages: Message[]
  user?: {
    name: string
    email: string
  }
}

interface Message {
  id: string
  senderId: string
  senderType: 'USER' | 'ADMIN' | 'CA_EXPERT'
  message: string
  createdAt: string
}

export default function TicketsPage() {
  const { user } = useAuth()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [showNewTicket, setShowNewTicket] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: 'GENERAL',
    priority: 'MEDIUM',
    message: '',
  })

  // Fetch tickets from API
  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/tickets')
      if (!response.ok) throw new Error('Failed to fetch tickets')
      const data = await response.json()
      setTickets(data.tickets || [])
    } catch (err) {
      setError('Failed to load tickets')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchTicketDetails = async (ticketId: string) => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}`)
      if (!response.ok) throw new Error('Failed to fetch ticket')
      const data = await response.json()
      setSelectedTicket(data.ticket)
    } catch (err) {
      console.error(err)
    }
  }

  const getStatusBadge = (status: string) => {
    const normalizedStatus = status.toLowerCase().replace('_', '-')
    const badgeClasses: Record<string, string> = {
      open: styles.statusBadgeOpen,
      'in-progress': styles.statusBadgeInProgress,
      resolved: styles.statusBadgeResolved,
      closed: styles.statusBadgeClosed,
    }
    const icons: Record<string, React.ReactNode> = {
      open: <Clock className={styles.statusBadgeIcon} />,
      'in-progress': <MessageCircle className={styles.statusBadgeIcon} />,
      resolved: <CheckCircle className={styles.statusBadgeIcon} />,
      closed: <XCircle className={styles.statusBadgeIcon} />,
    }
    return (
      <span className={`${styles.statusBadge} ${badgeClasses[normalizedStatus] || badgeClasses.open}`}>
        {icons[normalizedStatus] || icons.open}
        {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </span>
    )
  }

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: styles.priorityLow,
      medium: styles.priorityMedium,
      high: styles.priorityHigh,
      urgent: styles.priorityUrgent,
    }
    return colors[priority.toLowerCase()] || colors.medium
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedTicket || submitting) return

    setSubmitting(true)
    try {
      const response = await fetch(`/api/tickets/${selectedTicket.id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newMessage }),
      })
      
      if (!response.ok) throw new Error('Failed to send message')
      
      // Refresh ticket details
      await fetchTicketDetails(selectedTicket.id)
      setNewMessage('')
    } catch (err) {
      console.error(err)
      alert('Failed to send message')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCreateTicket = async () => {
    if (!newTicket.subject.trim() || !newTicket.message.trim() || submitting) return

    setSubmitting(true)
    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: newTicket.subject,
          description: newTicket.message,
          category: newTicket.category,
          priority: newTicket.priority,
        }),
      })
      
      if (!response.ok) throw new Error('Failed to create ticket')
      
      const data = await response.json()
      setTickets(prev => [data.ticket, ...prev])
      setShowNewTicket(false)
      setNewTicket({ subject: '', category: 'GENERAL', priority: 'MEDIUM', message: '' })
      await fetchTicketDetails(data.ticket.id)
    } catch (err) {
      console.error(err)
      alert('Failed to create ticket')
    } finally {
      setSubmitting(false)
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader2 className={styles.loadingSpinner} />
      </div>
    )
  }

  if (showNewTicket) {
    return (
      <div className={styles.pageBackground}>
        <div className={styles.formContainer}>
          <button
            onClick={() => setShowNewTicket(false)}
            className={styles.backButton}
          >
            <ChevronLeft className={styles.backButtonIcon} />
            Back to Tickets
          </button>

          <Card className={styles.formCard}>
            <CardContent className={styles.formCardContent}>
              <h2 className={styles.formTitle}>Create New Ticket</h2>

              <div className="space-y-6">
                <Input
                  label="Subject"
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  placeholder="Brief description of your issue"
                  required
                />

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Category</label>
                    <select
                      value={newTicket.category}
                      onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                      className={styles.formSelect}
                    >
                      <option value="General">General</option>
                      <option value="ITR Filing">ITR Filing</option>
                      <option value="GST Filing">GST Filing</option>
                      <option value="Payment">Payment</option>
                      <option value="Document">Document</option>
                      <option value="Technical">Technical</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Priority</label>
                    <select
                      value={newTicket.priority}
                      onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                      className={styles.formSelect}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Message</label>
                  <textarea
                    value={newTicket.message}
                    onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                    rows={6}
                    className={styles.formTextarea}
                    placeholder="Describe your issue in detail..."
                    required
                  />
                </div>

                <div className={styles.formActions}>
                  <Button onClick={handleCreateTicket}>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Ticket
                  </Button>
                  <Button variant="outline" onClick={() => setShowNewTicket(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (selectedTicket) {
    return (
      <div className={styles.pageBackground}>
        <div className={styles.detailsContainer}>
          <button
            onClick={() => setSelectedTicket(null)}
            className={styles.backButton}
          >
            <ChevronLeft className={styles.backButtonIcon} />
            Back to All Tickets
          </button>

          <Card className={styles.detailsHeaderCard}>
            <CardContent className={styles.detailsHeaderContent}>
              <div className={styles.detailsHeader}>
                <div>
                  <h2 className={styles.detailsTitle}>{selectedTicket.subject}</h2>
                  <div className={styles.detailsMeta}>
                    <span className={styles.detailsMetaItem}>Ticket ID: <strong className={styles.detailsMetaStrong}>{selectedTicket.id}</strong></span>
                    <span className={styles.detailsMetaItem}>•</span>
                    <span className={styles.detailsMetaItem}>{selectedTicket.category}</span>
                    <span className={styles.detailsMetaItem}>•</span>
                    <span className={`${styles.detailsMetaItem} ${styles[`priority${selectedTicket.priority}`]}`}>
                      {selectedTicket.priority.toUpperCase()} Priority
                    </span>
                  </div>
                </div>
                {getStatusBadge(selectedTicket.status)}
              </div>
            </CardContent>
          </Card>

          <Card className={styles.messagesCard}>
            <CardContent className={styles.messagesCardContent}>
              <div className={styles.messagesList}>
                {selectedTicket.messages.map((msg) => {
                  const isUserMessage = msg.senderType === 'USER'
                  return (
                    <div
                      key={msg.id}
                      className={`${styles.message} ${isUserMessage ? styles.messageUser : styles.messageSupport}`}
                    >
                      <div className={styles.messageContent}>
                        <div
                          className={`${styles.messageBubble} ${isUserMessage
                            ? styles.messageBubbleUser
                            : styles.messageBubbleSupport}`}
                        >
                          <p className="text-sm">{msg.message}</p>
                        </div>
                        <p className={`${styles.messageMeta} ${isUserMessage ? styles.messageMetaUser : styles.messageMetaSupport}`}>
                          {isUserMessage ? 'You' : 'Support'} • {formatTime(msg.createdAt)}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {selectedTicket.status !== 'CLOSED' && (
                <div className={styles.messageInputContainer}>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className={styles.messageInput}
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.pageBackground}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.headerTitle}>Support Tickets</h1>
            <p className={styles.headerSubtitle}>Get help from our support team</p>
          </div>
          <Button onClick={() => setShowNewTicket(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Ticket
          </Button>
        </div>

        <div className={styles.statsGrid}>
          <Card className={styles.statsCard}>
            <CardContent className={styles.statsCardContent}>
              <p className={styles.statsLabel}>Total Tickets</p>
              <p className={styles.statsValue}>{tickets.length}</p>
            </CardContent>
          </Card>
          <Card className={styles.statsCard}>
            <CardContent className={styles.statsCardContent}>
              <p className={styles.statsLabel}>Open</p>
              <p className={`${styles.statsValue} ${styles.statsValueBlue}`}>
                {tickets.filter(t => t.status === 'OPEN').length}
              </p>
            </CardContent>
          </Card>
          <Card className={styles.statsCard}>
            <CardContent className={styles.statsCardContent}>
              <p className={styles.statsLabel}>In Progress</p>
              <p className={`${styles.statsValue} ${styles.statsValueYellow}`}>
                {tickets.filter(t => t.status === 'IN_PROGRESS').length}
              </p>
            </CardContent>
          </Card>
          <Card className={styles.statsCard}>
            <CardContent className={styles.statsCardContent}>
              <p className={styles.statsLabel}>Resolved</p>
              <p className={`${styles.statsValue} ${styles.statsValueGreen}`}>
                {tickets.filter(t => t.status === 'RESOLVED').length}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className={styles.ticketsList}>
          {tickets.map((ticket) => (
            <Card
              key={ticket.id}
              className={styles.ticketCard}
              onClick={() => setSelectedTicket(ticket)}
            >
              <CardContent className={styles.ticketCardContent}>
                <div className={styles.ticketHeader}>
                  <div className="flex-1">
                    <div className={styles.ticketHeader}>
                      <h3 className={styles.ticketTitle}>{ticket.subject}</h3>
                      {getStatusBadge(ticket.status)}
                    </div>
                    <div className={styles.ticketMeta}>
                      <span className={styles.ticketMetaItem}>
                        <MessageSquare className={styles.ticketMetaIcon} />
                        {ticket.id}
                      </span>
                      <span>•</span>
                      <span className={styles.ticketMetaItem}>{ticket.category}</span>
                      <span>•</span>
                      <span className={`${styles.ticketMetaItem} ${styles[`priority${ticket.priority}`]}`}>
                        {ticket.priority.toUpperCase()}
                      </span>
                      <span>•</span>
                      <span className={styles.ticketMetaItem}>{ticket.messages.length} messages</span>
                    </div>
                    <p className={styles.ticketLastReply}>
                      Last reply: {formatTime(ticket.lastReply)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {tickets.length === 0 && (
          <Card className={styles.emptyStateCard}>
            <CardContent className={styles.emptyStateCardContent}>
              <MessageSquare className={styles.emptyStateIcon} />
              <h3 className={styles.emptyStateTitle}>No tickets yet</h3>
              <p className={styles.emptyStateDescription}>Create your first support ticket to get help</p>
              <Button onClick={() => setShowNewTicket(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Ticket
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}


