'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  User,
  MapPin,
  Briefcase,
  Calendar,
  Edit2,
  Save,
  X,
  Loader2,
} from 'lucide-react'
import { Button, Input, Card, CardContent } from '@/components/ui'
import { useAuth } from '@/contexts'
import styles from './page.module.css'

export default function ProfilePage() {
  const router = useRouter()
  const { user } = useAuth()

  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    panNumber: '',
    aadhaarNumber: '',
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        panNumber: '',
        aadhaarNumber: '',
      })
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Update failed')

      setSuccess('Profile updated successfully')
      setIsEditing(false)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setError('')
    setSuccess('')
  }

  return (
    <div className={styles.profilePage}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>My Profile</h1>
        
        <p className={styles.pageDescription}>
          Manage your personal and account information
        </p>
      </div>

      <div className={styles.cardContainer}>
        <Card className={styles.profileCard}>
          <div className={styles.cardContent}>
            {/* Profile Header */}
            <div className={styles.profileHeader}>
              <div className={styles.avatarSection}>
                <div className={styles.avatar}>
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>

                <div className={styles.userInfo}>
                  <h2 className={styles.userName}>
                    {user?.name}
                  </h2>
                  <p className={styles.userEmail}>{user?.email}</p>

                  <span
                    className={`${styles.verificationBadge} ${
                      user?.emailVerified
                        ? styles.verified
                        : styles.unverified
                    }`}
                  >
                    {user?.emailVerified ? 'Verified' : 'Unverified'}
                  </span>
                </div>
              </div>

              {!isEditing && (
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 className={styles.buttonIcon} />
                  Edit Profile
                </Button>
              )}
            </div>

            {/* Alerts */}
            {success && (
              <div className={`${styles.alert} ${styles.successAlert}`}>
                {success}
              </div>
            )}
            {error && (
              <div className={`${styles.alert} ${styles.errorAlert}`}>
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Personal Info */}
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  <User className={styles.sectionIcon} />
                  Personal Information
                </h3>

                <div className={styles.grid}>
                  <Input
                    label="Full Name"
                    value={formData.name}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />

                  <Input
                    label="Email"
                    value={formData.email}
                    disabled
                    helperText="Email cannot be changed"
                  />

                  <Input
                    label="Phone"
                    value={formData.phone}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />

                  <Input label="Date of Birth" type="date" disabled />
                </div>
              </section>

              {/* Address */}
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  <MapPin className={styles.sectionIcon} />
                  Address
                </h3>

                <Input
                  label="Address"
                  disabled={!isEditing}
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />

                <div className={`${styles.grid} ${styles.gridThree}`}>
                  <Input
                    label="City"
                    disabled={!isEditing}
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />
                  <Input
                    label="State"
                    disabled={!isEditing}
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                  />
                  <Input
                    label="Pincode"
                    disabled={!isEditing}
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) =>
                      setFormData({ ...formData, pincode: e.target.value })
                    }
                  />
                </div>
              </section>

              {/* Tax Info */}
              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  <Briefcase className={styles.sectionIcon} />
                  Tax Information
                </h3>

                <div className={styles.grid}>
                  <Input
                    label="PAN Number"
                    disabled={!isEditing}
                    maxLength={10}
                    value={formData.panNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        panNumber: e.target.value.toUpperCase(),
                      })
                    }
                  />
                  <Input
                    label="Aadhaar Number"
                    disabled={!isEditing}
                    maxLength={12}
                    value={formData.aadhaarNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        aadhaarNumber: e.target.value,
                      })
                    }
                  />
                </div>
              </section>

              {/* Action Buttons */}
              {isEditing && (
                <div className={styles.actionButtons}>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    <X className={styles.buttonIcon} />
                    Cancel
                  </Button>

                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className={`${styles.buttonIcon} animate-spin`} />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className={styles.buttonIcon} />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              )}
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
}
