'use client'

import { useState, useEffect } from 'react'
import {
  User,
  MapPin,
  Briefcase,
  Edit2,
  Save,
  X,
  Loader2,
} from 'lucide-react'
import { Button, Input, Card, CardContent } from '@/components/ui'
import { useAuth } from '@/contexts'

export default function ProfilePage() {
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
    /* ✅ TOP-ALIGNED PAGE (NO GAP) */
    <div className="min-h-screen bg-slate-50 flex justify-center px-4 pt-6">
      <div className="w-full max-w-5xl">
        {/* PAGE HEADER */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
          <p className="text-slate-500 mt-1">
            Manage your personal and account information
          </p>
        </div>

        {/* CARD */}
        <Card className="shadow-sm rounded-2xl">
          <CardContent className="p-6 sm:p-8">
            {/* PROFILE HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-indigo-700 to-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {user?.name}
                  </h2>
                  <p className="text-slate-500 text-sm">{user?.email}</p>

                  <span
                    className={`inline-block mt-2 rounded-full px-3 py-1 text-xs font-medium ${
                      user?.emailVerified
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {user?.emailVerified ? 'Verified' : 'Unverified'}
                  </span>
                </div>
              </div>

              {!isEditing && (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>

            {/* ALERTS */}
            {success && (
              <div className="mb-4 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                {success}
              </div>
            )}
            {error && (
              <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* PERSONAL INFO */}
              <section className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <User className="h-5 w-5 text-indigo-700" />
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={formData.name}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
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

              {/* ADDRESS */}
              <section className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <MapPin className="h-5 w-5 text-indigo-700" />
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    value={formData.pincode}
                    onChange={(e) =>
                      setFormData({ ...formData, pincode: e.target.value })
                    }
                  />
                </div>
              </section>

              {/* TAX INFO */}
              <section className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <Briefcase className="h-5 w-5 text-indigo-700" />
                  Tax Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="PAN Number"
                    disabled={!isEditing}
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

              {/* ACTION BUTTONS */}
              {isEditing && (
                <div className="flex justify-end gap-3 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>

                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
