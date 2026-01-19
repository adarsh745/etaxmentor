'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { 
  ArrowLeft, FileText, Upload, Plus, X, Save, Send,
  AlertCircle, CheckCircle2, Info, Receipt
} from 'lucide-react'
import Link from 'next/link'
import { Button, Card, CardContent, Input, Badge } from '@/components/ui'

const returnTypes = [
  { value: 'GSTR1', label: 'GSTR-1', desc: 'Details of outward supplies' },
  { value: 'GSTR3B', label: 'GSTR-3B', desc: 'Monthly summary return' },
  { value: 'GSTR4', label: 'GSTR-4', desc: 'Quarterly return (Composition scheme)' },
  { value: 'GSTR9', label: 'GSTR-9', desc: 'Annual return' },
  { value: 'GSTR9C', label: 'GSTR-9C', desc: 'Reconciliation statement' },
]

const currentYear = new Date().getFullYear()
const periods = [
  // Monthly periods for current FY
  'Apr-2025', 'May-2025', 'Jun-2025', 'Jul-2025', 'Aug-2025', 'Sep-2025',
  'Oct-2025', 'Nov-2025', 'Dec-2025', 'Jan-2026', 'Feb-2026', 'Mar-2026',
  // Quarterly periods
  'Q1-2025-26', 'Q2-2025-26', 'Q3-2025-26', 'Q4-2025-26',
  // Previous year
  'Apr-2024', 'May-2024', 'Jun-2024', 'Jul-2024', 'Aug-2024', 'Sep-2024',
  'Oct-2024', 'Nov-2024', 'Dec-2024', 'Jan-2025', 'Feb-2025', 'Mar-2025',
]

export default function NewGSTFilingPage() {
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
    gstin: '',
    tradeName: '',
    returnType: 'GSTR3B',
    period: 'Jan-2026',
    
    // Sales details
    b2bSales: '',
    b2cSales: '',
    exportSales: '',
    exemptSales: '',
    
    // Purchase details
    purchases: '',
    importPurchases: '',
    
    // Tax details
    igst: '',
    cgst: '',
    sgst: '',
    itcClaimed: '',
    
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
      const response = await fetch(`/api/gst/${id}`, {
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to load GST filing data')
      }

      const data = await response.json()
      const filing = data.filing

      if (!['DRAFT', 'DOCUMENTS_PENDING'].includes(filing.status)) {
        setError('Only draft and pending filings can be edited')
        return
      }

      // Populate form with existing data
      setFormData({
        gstin: filing.gstin || '',
        tradeName: filing.tradeName || '',
        returnType: filing.returnType || 'GSTR3B',
        period: filing.period || 'Jan-2026',
        b2bSales: filing.formData?.b2bSales?.toString() || '',
        b2cSales: filing.formData?.b2cSales?.toString() || '',
        exportSales: filing.formData?.exportSales?.toString() || '',
        exemptSales: filing.formData?.exemptSales?.toString() || '',
        purchases: filing.formData?.purchases?.toString() || '',
        importPurchases: filing.formData?.importPurchases?.toString() || '',
        igst: filing.formData?.igst?.toString() || '',
        cgst: filing.formData?.cgst?.toString() || '',
        sgst: filing.formData?.sgst?.toString() || '',
        itcClaimed: filing.formData?.itcClaimed?.toString() || '',
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
    
    // Auto-uppercase GSTIN
    if (e.target.name === 'gstin') {
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
    const totalSales = 
      Number(formData.b2bSales || 0) +
      Number(formData.b2cSales || 0) +
      Number(formData.exportSales || 0) +
      Number(formData.exemptSales || 0)

    const totalPurchases = 
      Number(formData.purchases || 0) +
      Number(formData.importPurchases || 0)

    const totalTax = 
      Number(formData.igst || 0) +
      Number(formData.cgst || 0) +
      Number(formData.sgst || 0)

    const taxPayable = Math.max(0, totalTax - Number(formData.itcClaimed || 0))

    return { totalSales, totalPurchases, totalTax, taxPayable }
  }

  const handleSubmit = async (e: React.FormEvent, isDraft: boolean = false) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const payload = {
        formData: {
          b2bSales: Number(formData.b2bSales) || 0,
          b2cSales: Number(formData.b2cSales) || 0,
          exportSales: Number(formData.exportSales) || 0,
          exemptSales: Number(formData.exemptSales) || 0,
          purchases: Number(formData.purchases) || 0,
          importPurchases: Number(formData.importPurchases) || 0,
          igst: Number(formData.igst) || 0,
          cgst: Number(formData.cgst) || 0,
          sgst: Number(formData.sgst) || 0,
          itcClaimed: Number(formData.itcClaimed) || 0,
        },
        gstin: formData.gstin,
        tradeName: formData.tradeName,
        returnType: formData.returnType,
        period: formData.period,
        remarks: formData.remarks,
        status: isDraft ? 'DRAFT' : 'DOCUMENTS_PENDING',
        submitForReview: !isDraft
      }

      const url = isEditing ? `/api/gst/${filingId}` : '/api/gst'
      const method = isEditing ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `Failed to ${isEditing ? 'update' : 'submit'} GST filing`)
      }

      setSuccess(isEditing 
        ? (isDraft ? 'GST filing updated!' : 'GST filing submitted for review!') 
        : (isDraft ? 'GST filing saved as draft!' : 'GST filing submitted successfully!')
      )
      
      setTimeout(() => {
        router.push('/dashboard/gst')
      }, 2000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const totals = calculateTotals()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard/gst" className="inline-flex items-center text-orange-600 hover:text-orange-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to GST Filings
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{isEditing ? 'Edit GST Filing' : 'New GST Filing'}</h1>
          <p className="text-gray-600">{isEditing ? 'Update your GST return filing' : 'Complete your GST return filing with expert assistance'}</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-center space-x-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  s <= step
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 h-1 mx-2 ${
                    s < step ? 'bg-orange-600' : 'bg-gray-200'
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
                  <Receipt className="w-5 h-5 mr-2 text-orange-600" />
                  Basic Details
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GSTIN <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      name="gstin"
                      value={formData.gstin}
                      onChange={handleChange}
                      placeholder="22AAAAA0000A1Z5"
                      maxLength={15}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">15-digit GST Identification Number</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Trade Name
                    </label>
                    <Input
                      type="text"
                      name="tradeName"
                      value={formData.tradeName}
                      onChange={handleChange}
                      placeholder="Your business name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Return Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="returnType"
                      value={formData.returnType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    >
                      {returnTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label} - {type.desc}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Period <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="period"
                      value={formData.period}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    >
                      {periods.map((period) => (
                        <option key={period} value={period}>{period}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button type="button" onClick={() => setStep(2)}>
                    Next: Sales & Purchase Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Sales & Purchase Details */}
          {step === 2 && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Sales & Purchase Details</h2>

                {/* Sales Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4 text-orange-600">Sales Details</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        B2B Sales (₹)
                      </label>
                      <Input
                        type="number"
                        name="b2bSales"
                        value={formData.b2bSales}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        B2C Sales (₹)
                      </label>
                      <Input
                        type="number"
                        name="b2cSales"
                        value={formData.b2cSales}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Export Sales (₹)
                      </label>
                      <Input
                        type="number"
                        name="exportSales"
                        value={formData.exportSales}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Exempt Sales (₹)
                      </label>
                      <Input
                        type="number"
                        name="exemptSales"
                        value={formData.exemptSales}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>

                {/* Purchases Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4 text-blue-600">Purchase Details</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Purchases (₹)
                      </label>
                      <Input
                        type="number"
                        name="purchases"
                        value={formData.purchases}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Import Purchases (₹)
                      </label>
                      <Input
                        type="number"
                        name="importPurchases"
                        value={formData.importPurchases}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>

                {/* Tax Section */}
                <div>
                  <h3 className="text-lg font-medium mb-4 text-green-600">Tax Details</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        IGST (₹)
                      </label>
                      <Input
                        type="number"
                        name="igst"
                        value={formData.igst}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CGST (₹)
                      </label>
                      <Input
                        type="number"
                        name="cgst"
                        value={formData.cgst}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SGST (₹)
                      </label>
                      <Input
                        type="number"
                        name="sgst"
                        value={formData.sgst}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ITC Claimed (₹)
                      </label>
                      <Input
                        type="number"
                        name="itcClaimed"
                        value={formData.itcClaimed}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="mt-8 p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold mb-3">Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Sales:</span>
                      <span className="font-semibold">₹{totals.totalSales.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Purchases:</span>
                      <span className="font-semibold">₹{totals.totalPurchases.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Tax:</span>
                      <span className="font-semibold">₹{totals.totalTax.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ITC Claimed:</span>
                      <span className="font-semibold text-green-600">- ₹{Number(formData.itcClaimed || 0).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-orange-200">
                      <span className="font-semibold">Tax Payable:</span>
                      <span className="font-bold text-orange-600">₹{totals.taxPayable.toLocaleString('en-IN')}</span>
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
                  <Upload className="w-5 h-5 mr-2 text-orange-600" />
                  Upload Documents & Additional Info
                </h2>

                {/* Document Upload */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supporting Documents
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition-colors">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Click to upload GSTR-2A, Purchase invoices, Bank statements, etc.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG, Excel (Max 10MB each)</p>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Any additional information for our GST experts..."
                  />
                </div>

                {/* Info Box */}
                <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 flex items-start">
                  <Info className="w-5 h-5 mr-3 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">What happens next?</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Your GST return will be reviewed by our experts</li>
                      <li>You'll receive a call for verification within 24 hours</li>
                      <li>Your return will be filed and you'll get acknowledgment</li>
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