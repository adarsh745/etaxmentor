'use client'

import { useState } from 'react'
import { Shield, Bell, Lock, Mail, Smartphone, Trash2, Eye, EyeOff, CheckCircle, Loader2 } from 'lucide-react'
import { Button, Input, Card, CardContent } from '@/components/ui'
import { useAuth } from '@/contexts'
import styles from './page.module.css'

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<'security' | 'notifications' | 'preferences'>('security')

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Settings</h1>
          <p className={styles.subtitle}>Manage your account settings and preferences</p>
        </div>

        <div className={styles.gridLayout}>
          <div className={styles.sidebar}>
            <Card>
              <CardContent className={styles.navCard}>
                <nav className={styles.navList}>
                  <button
                    onClick={() => setActiveTab('security')}
                    className={`${styles.navButton} ${
                      activeTab === 'security'
                        ? styles.navButtonActive
                        : styles.navButtonInactive
                    }`}
                  >
                    <Shield className={styles.navIcon} />
                    <span className={styles.navLabel}>Security</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`${styles.navButton} ${
                      activeTab === 'notifications'
                        ? styles.navButtonActive
                        : styles.navButtonInactive
                    }`}
                  >
                    <Bell className={styles.navIcon} />
                    <span className={styles.navLabel}>Notifications</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('preferences')}
                    className={`${styles.navButton} ${
                      activeTab === 'preferences'
                        ? styles.navButtonActive
                        : styles.navButtonInactive
                    }`}
                  >
                    <Mail className={styles.navIcon} />
                    <span className={styles.navLabel}>Preferences</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          <div className={styles.mainContent}>
            {activeTab === 'security' && <SecuritySettings />}
            {activeTab === 'notifications' && <NotificationSettings />}
            {activeTab === 'preferences' && <PreferencesSettings />}
          </div>
        </div>
      </div>
    </div>
  )
}

function SecuritySettings() {
  const { logout } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to change password')
      }

      setSuccess('Password changed successfully!')
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.contentWrapper}>
      <Card>
        <CardContent className={styles.card}>
          <h2 className={styles.cardTitle}>
            <Lock className={styles.cardIcon} />
            Change Password
          </h2>

          {success && (
            <div className={styles.successAlert}>
              <CheckCircle className={styles.alertIcon} />
              {success}
            </div>
          )}
          {error && (
            <div className={styles.errorAlert}>
              {error}
            </div>
          )}

          <form onSubmit={handleChangePassword} className={styles.formSection}>
            <div>
              <Input
                label="Current Password"
                type={showPassword ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                required
              />
            </div>
            <div>
              <Input
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                helperText="Must be at least 8 characters with uppercase, lowercase, number and special character"
                required
              />
            </div>
            <div>
              <Input
                label="Confirm New Password"
                type={showPassword ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                required
              />
            </div>

            <div className={styles.checkboxWrapper}>
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                className={styles.checkbox}
              />
              <label htmlFor="showPassword" className={styles.checkboxLabel}>
                Show passwords
              </label>
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Changing...
                </>
              ) : (
                'Change Password'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className={styles.card}>
          <h2 className={styles.cardTitle}>
            <Smartphone className={styles.cardIcon} />
            Two-Factor Authentication
          </h2>
          <p className={styles.cardSubtitle}>
            Add an extra layer of security to your account by enabling 2FA.
          </p>
          <div className={styles.twoFactorBox}>
            <p className={styles.twoFactorStatus}>
              Status: <span className={styles.twoFactorStatusValue}>Disabled</span>
            </p>
            <Button variant="outline" disabled>
              Enable 2FA (Coming Soon)
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className={styles.card}>
          <h2 className={`${styles.cardTitle} ${styles.cardTitleRed}`}>
            <Trash2 className={styles.cardIconRed} />
            Danger Zone
          </h2>
          <div className={styles.dangerBox}>
            <h3 className={styles.dangerTitle}>Delete Account</h3>
            <p className={styles.dangerText}>
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="outline" className={styles.dangerButton}>
              Delete My Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    filingUpdates: true,
    paymentReminders: true,
    promotions: false,
    weeklyDigest: true,
    smsNotifications: false,
  })

  const handleSave = () => {
    alert('Settings saved!')
  }

  return (
    <Card>
      <CardContent className={styles.card}>
        <h2 className={styles.cardTitle}>Notification Preferences</h2>

        <div className={styles.notificationsList}>
          <div className={styles.notificationItem}>
            <div className={styles.notificationInfo}>
              <h3>Email Notifications</h3>
              <p>Receive notifications via email</p>
            </div>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                className={styles.toggleInput}
              />
              <div className={styles.toggleSwitch}></div>
            </label>
          </div>

          <div className={styles.notificationItem}>
            <div className={styles.notificationInfo}>
              <h3>Filing Updates</h3>
              <p>Get notified about ITR/GST filing status changes</p>
            </div>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={settings.filingUpdates}
                onChange={(e) => setSettings({ ...settings, filingUpdates: e.target.checked })}
                className={styles.toggleInput}
              />
              <div className={styles.toggleSwitch}></div>
            </label>
          </div>

          <div className={styles.notificationItem}>
            <div className={styles.notificationInfo}>
              <h3>Payment Reminders</h3>
              <p>Reminders for pending payments</p>
            </div>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={settings.paymentReminders}
                onChange={(e) => setSettings({ ...settings, paymentReminders: e.target.checked })}
                className={styles.toggleInput}
              />
              <div className={styles.toggleSwitch}></div>
            </label>
          </div>

          <div className={styles.notificationItem}>
            <div className={styles.notificationInfo}>
              <h3>Promotional Emails</h3>
              <p>Receive offers and promotional content</p>
            </div>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={settings.promotions}
                onChange={(e) => setSettings({ ...settings, promotions: e.target.checked })}
                className={styles.toggleInput}
              />
              <div className={styles.toggleSwitch}></div>
            </label>
          </div>

          <div className={styles.notificationItem}>
            <div className={styles.notificationInfo}>
              <h3>Weekly Digest</h3>
              <p>Weekly summary of your account activity</p>
            </div>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={settings.weeklyDigest}
                onChange={(e) => setSettings({ ...settings, weeklyDigest: e.target.checked })}
                className={styles.toggleInput}
              />
              <div className={styles.toggleSwitch}></div>
            </label>
          </div>

          <div className={`${styles.notificationItem} ${styles.notificationItemDisabled}`}>
            <div className={styles.notificationInfo}>
              <h3>SMS Notifications</h3>
              <p>Receive important updates via SMS (Coming Soon)</p>
            </div>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                disabled
                className={styles.toggleInput}
              />
              <div className={styles.toggleSwitch}></div>
            </label>
          </div>
        </div>

        <div className={styles.bottomActions}>
          <Button onClick={handleSave}>Save Preferences</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function PreferencesSettings() {
  const [language, setLanguage] = useState('en')
  const [timezone, setTimezone] = useState('Asia/Kolkata')
  const [currency, setCurrency] = useState('INR')

  return (
    <Card>
      <CardContent className={styles.card}>
        <h2 className={styles.cardTitle}>General Preferences</h2>

        <div className={styles.preferencesSection}>
          <div>
            <label className={styles.fieldLabel}>Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={styles.select}
            >
              <option value="en">English</option>
              <option value="hi" disabled>Hindi (Coming Soon)</option>
            </select>
          </div>

          <div>
            <label className={styles.fieldLabel}>Timezone</label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className={styles.select}
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="Asia/Dubai">Asia/Dubai (GST)</option>
              <option value="America/New_York">America/New York (EST)</option>
            </select>
          </div>

          <div>
            <label className={styles.fieldLabel}>Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              disabled
              className={`${styles.select} ${styles.selectDisabled}`}
            >
              <option value="INR">₹ INR - Indian Rupee</option>
            </select>
          </div>
        </div>

        <div className={styles.bottomActions}>
          <Button>Save Preferences</Button>
        </div>
      </CardContent>
    </Card>
  )
}