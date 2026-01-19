'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { 
  ArrowLeft, FileText, Upload, Plus, X, Save, Send,
  AlertCircle, CheckCircle2, Info
} from 'lucide-react'
import Link from 'next/link'
import { Button, Card, CardContent, Input, Badge } from '@/components/ui'

const itrTypes = [
  { value: 'ITR1', label: 'ITR-1 (Sahaj)', desc: 'Salaried individuals, ₹50L income' },
  { value: 'ITR2', label: 'ITR-2', desc: 'Capital gains, multiple properties' },
  { value: 'ITR3', label: 'ITR-3', desc: 'Business/Professional income' },
  { value: 'ITR4', label: 'ITR-4 (Sugam)', desc: 'Presumptive taxation' },
  { value: 'ITR5', label: 'ITR-5', desc: 'Firms, LLPs, AOPs' },
  { value: 'ITR6', label: 'ITR-6', desc: 'Companies (except 44AE)' },
  { value: 'ITR7', label: 'ITR-7', desc: 'Trusts, Political parties' },
]

const assessmentYears = [
  '2024-25', '2023-24', '2022-23', '2021-22', '2020-21'
]

export default function NewITRFilingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [step, setStep] = useState(1)
  const [isEditing, setIsEditing] = useState(false)
  const [filingId, setFilingId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    // Basic details
    itrType: 'ITR1',
    assessmentYear: '2024-25',
    panNumber: '',
    aadhaar: '',
    
    // Income details
    salaryIncome: '',
    housePropertyIncome: '',
    capitalGains: '',
    businessIncome: '',
    otherIncome: '',
    
    // Deductions
    section80C: '',
    section80D: '',
    section80G: '',
    homeLoanInterest: '',
    
    // Additional info
    remarks: '',
  })

  const [documents, setDocuments] = useState<File[]>([])

  // Load existing draft if editing
  useEffect(() => {
    const id = searchParams.get('id')
    if (id) {
      setFilingId(id)
      setIsEditing(true)
      loadExistingFiling(id)
    }
  }, [searchParams])

  const loadExistingFiling = async (id: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/itr/${id}`, {
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to load filing data')
      }

      const data = await response.json()
      const filing = data.filing

      if (!['DRAFT', 'DOCUMENTS_PENDING'].includes(filing.status)) {
        setError('Only draft and pending filings can be edited')
        return
      }

      // Populate form with existing data
      setFormData({
        itrType: filing.itrType || 'ITR1',
        assessmentYear: filing.assessmentYear || '2024-25',
        panNumber: filing.pan || '',
        aadhaar: filing.aadhaar || '',
        salaryIncome: filing.formData?.salaryIncome?.toString() || '',
        housePropertyIncome: filing.formData?.housePropertyIncome?.toString() || '',
        capitalGains: filing.formData?.capitalGains?.toString() || '',
        businessIncome: filing.formData?.businessIncome?.toString() || '',
        otherIncome: filing.formData?.otherIncome?.toString() || '',
        section80C: filing.formData?.section80C?.toString() || '',
        section80D: filing.formData?.section80D?.toString() || '',
        section80G: filing.formData?.section80G?.toString() || '',
        homeLoanInterest: filing.formData?.homeLoanInterest?.toString() || '',
        remarks: filing.remarks || '',
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    let value = e.target.value
    
    // Auto-uppercase PAN
    if (e.target.name === 'panNumber') {
      value = value.toUpperCase()
    }
    
    setFormData({ ...formData, [e.target.name]: value })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocuments([...documents, ...Array.from(e.target.files)])
    }
  }

  const removeDocument = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index))
  }

  const calculateTotals = () => {
    const totalIncome = 
      Number(formData.salaryIncome || 0) +
      Number(formData.housePropertyIncome || 0) +
      Number(formData.capitalGains || 0) +
      Number(formData.businessIncome || 0) +
      Number(formData.otherIncome || 0)

    const totalDeductions = 
      Number(formData.section80C || 0) +
      Number(formData.section80D || 0) +
      Number(formData.section80G || 0) +
      Number(formData.homeLoanInterest || 0)

    const taxableIncome = Math.max(0, totalIncome - totalDeductions)

    return { totalIncome, totalDeductions, taxableIncome }
  }

  const handleSubmit = async (e: React.FormEvent, isDraft: boolean = false) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const payload = {
        formData: {
          salaryIncome: Number(formData.salaryIncome) || 0,
          housePropertyIncome: Number(formData.housePropertyIncome) || 0,
          capitalGains: Number(formData.capitalGains) || 0,
          businessIncome: Number(formData.businessIncome) || 0,
          otherIncome: Number(formData.otherIncome) || 0,
          section80C: Number(formData.section80C) || 0,
          section80D: Number(formData.section80D) || 0,
          section80G: Number(formData.section80G) || 0,
          homeLoanInterest: Number(formData.homeLoanInterest) || 0,
        },
        itrType: formData.itrType,
        assessmentYear: formData.assessmentYear,
        pan: formData.panNumber,
        aadhaar: formData.aadhaar,
        remarks: formData.remarks,
        status: isDraft ? 'DRAFT' : 'DOCUMENTS_PENDING',
        submitForReview: !isDraft
      }

      const url = isEditing ? `/api/itr/${filingId}` : '/api/itr'
      const method = isEditing ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `Failed to ${isEditing ? 'update' : 'submit'} ITR filing`)
      }

      setSuccess(isEditing 
        ? (isDraft ? 'ITR filing updated!' : 'ITR filing submitted for review!') 
        : (isDraft ? 'ITR filing saved as draft!' : 'ITR filing submitted successfully!')
      )
      
      setTimeout(() => {
        router.push('/dashboard/itr')
      }, 2000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const totals = calculateTotals()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{isEditing ? 'Edit ITR Filing' : 'New ITR Filing'}</h1>
          <p className="text-gray-600">{isEditing ? 'Update your Income Tax Return filing' : 'Complete your Income Tax Return filing with expert assistance'}</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-center space-x-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  s <= step
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 h-1 mx-2 ${
                    s < step ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-start">
            <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 flex items-start">
            <CheckCircle2 className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={(e) => handleSubmit(e, false)}>
          {/* Step 1: Basic Details */}
          {step === 1 && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Basic Details
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ITR Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="itrType"
                      value={formData.itrType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      {itrTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label} - {type.desc}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assessment Year <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="assessmentYear"
                      value={formData.assessmentYear}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      {assessmentYears.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PAN Number <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      name="panNumber"
                      value={formData.panNumber}
                      onChange={handleChange}
                      placeholder="ABCDE1234F"
                      maxLength={10}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Format: 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Aadhaar Number
                    </label>
                    <Input
                      type="text"
                      name="aadhaar"
                      value={formData.aadhaar}
                      onChange={handleChange}
                      placeholder="1234 5678 9012"
                      maxLength={12}
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button type="button" onClick={() => setStep(2)}>
                    Next: Income Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Income & Deductions */}
          {step === 2 && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Income & Deductions</h2>

                {/* Income Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4 text-blue-600">Income Details</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Salary Income (₹)
                      </label>
                      <Input
                        type="number"
                        name="salaryIncome"
                        value={formData.salaryIncome}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        House Property Income (₹)
                      </label>
                      <Input
                        type="number"
                        name="housePropertyIncome"
                        value={formData.housePropertyIncome}
                        onChange={handleChange}
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Capital Gains (₹)
                      </label>
                      <Input
                        type="number"
                        name="capitalGains"
                        value={formData.capitalGains}
                        onChange={handleChange}
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business/Professional Income (₹)
                      </label>
                      <Input
                        type="number"
                        name="businessIncome"
                        value={formData.businessIncome}
                        onChange={handleChange}
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Other Income (₹)
                      </label>
                      <Input
                        type="number"
                        name="otherIncome"
                        value={formData.otherIncome}
                        onChange={handleChange}
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Deductions Section */}
                <div>
                  <h3 className="text-lg font-medium mb-4 text-green-600">Deductions</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section 80C (₹) <span className="text-gray-500 text-xs">Max: 1,50,000</span>
                      </label>
                      <Input
                        type="number"
                        name="section80C"
                        value={formData.section80C}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        max="150000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section 80D (₹) <span className="text-gray-500 text-xs">Max: 1,00,000</span>
                      </label>
                      <Input
                        type="number"
                        name="section80D"
                        value={formData.section80D}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        max="100000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section 80G (₹)
                      </label>
                      <Input
                        type="number"
                        name="section80G"
                        value={formData.section80G}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Home Loan Interest (₹)
                      </label>
                      <Input
                        type="number"
                        name="homeLoanInterest"
                        value={formData.homeLoanInterest}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold mb-3">Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Income:</span>
                      <span className="font-semibold">₹{totals.totalIncome.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Deductions:</span>
                      <span className="font-semibold text-green-600">- ₹{totals.totalDeductions.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-blue-200">
                      <span className="font-semibold">Taxable Income:</span>
                      <span className="font-bold text-blue-600">₹{totals.taxableIncome.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="button" onClick={() => setStep(3)}>
                    Next: Review & Submit
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Documents & Submit */}
          {step === 3 && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-blue-600" />
                  Upload Documents & Additional Info
                </h2>

                {/* Document Upload */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supporting Documents
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Click to upload Form 16, Form 26AS, Bank Statements, etc.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 10MB each)</p>
                    </label>
                  </div>

                  {/* Uploaded Files List */}
                  {documents.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {documents.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <FileText className="w-4 h-4 mr-2 text-gray-600" />
                            <span className="text-sm">{file.name}</span>
                            <span className="text-xs text-gray-500 ml-2">
                              ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeDocument(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Remarks */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Remarks (Optional)
                  </label>
                  <textarea
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any additional information for our CA experts..."
                  />
                </div>

                {/* Info Box */}
                <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 flex items-start">
                  <Info className="w-5 h-5 mr-3 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">What happens next?</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Your filing will be reviewed by our CA experts</li>
                      <li>You'll receive a call for verification within 24 hours</li>
                      <li>Your ITR will be filed and you'll get acknowledgment</li>
                      <li>Track status anytime from your dashboard</li>
                    </ul>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <div className="space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={(e) => handleSubmit(e, true)}
                      disabled={loading}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save as Draft
                    </Button>
                    <Button type="submit" disabled={loading}>
                      <Send className="w-4 h-4 mr-2" />
                      {loading ? (isEditing ? 'Updating...' : 'Submitting...') : (isEditing ? 'Update Filing' : 'Submit Filing')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </div>
    </div>
  )
}
