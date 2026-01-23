'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { 
  ArrowLeft, FileText, Upload, Plus, X, Save, Send,
  AlertCircle, CheckCircle2, Info, Receipt
} from 'lucide-react'
import Link from 'next/link'
import { Button, Card, CardContent, Input, Badge } from '@/components/ui'
import styles from './page.module.css'

const returnTypes = [
  { value: 'GSTR1', label: 'GSTR-1', desc: 'Details of outward supplies' },
  { value: 'GSTR3B', label: 'GSTR-3B', desc: 'Monthly summary return' },
  { value: 'GSTR4', label: 'GSTR-4', desc: 'Quarterly return (Composition scheme)' },
  { value: 'GSTR9', label: 'GSTR-9', desc: 'Annual return' },
  { value: 'GSTR9C', label: 'GSTR-9C', desc: 'Reconciliation statement' },
]

const periods = [
  'Apr-2025', 'May-2025', 'Jun-2025', 'Jul-2025', 'Aug-2025', 'Sep-2025',
  'Oct-2025', 'Nov-2025', 'Dec-2025', 'Jan-2026', 'Feb-2026', 'Mar-2026',
  'Q1-2025-26', 'Q2-2025-26', 'Q3-2025-26', 'Q4-2025-26',
  'Apr-2024', 'May-2024', 'Jun-2024', 'Jul-2024', 'Aug-2024', 'Sep-2024',
  'Oct-2024', 'Nov-2024', 'Dec-2024', 'Jan-2025', 'Feb-2025', 'Mar-2025',
]

function NewGSTFilingContent() {
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
    gstin: '',
    tradeName: '',
    returnType: 'GSTR3B',
    period: 'Jan-2026',
    b2bSales: '',
    b2cSales: '',
    exportSales: '',
    exemptSales: '',
    purchases: '',
    importPurchases: '',
    igst: '',
    cgst: '',
    sgst: '',
    itcClaimed: '',
    remarks: '',
  })

  const [documents, setDocuments] = useState<File[]>([])

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
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.header}>
          <Link href="/dashboard/gst" className={styles.backLink}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to GST Filings
          </Link>
          <h1 className={styles.title}>{isEditing ? 'Edit GST Filing' : 'New GST Filing'}</h1>
          <p className={styles.subtitle}>{isEditing ? 'Update your GST return filing' : 'Complete your GST return filing with expert assistance'}</p>
        </div>

        <div className={styles.progressContainer}>
          {[1, 2, 3].map((s) => (
            <div key={s} className={styles.stepWrapper}>
              <div className={`${styles.stepCircle} ${s <= step ? styles.stepCircleActive : styles.stepCircleInactive}`}>
                {s}
              </div>
              {s < 3 && (
                <div className={`${styles.stepConnector} ${s < step ? styles.stepConnectorActive : styles.stepConnectorInactive}`} />
              )}
            </div>
          ))}
        </div>

        {error && (
          <div className={styles.errorAlert}>
            <AlertCircle className={styles.alertIcon} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className={styles.successAlert}>
            <CheckCircle2 className={styles.alertIcon} />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={(e) => handleSubmit(e, false)}>
          {step === 1 && (
            <Card className={styles.card}>
              <CardContent className={styles.cardContent}>
                <h2 className={styles.sectionTitle}>
                  <Receipt className={styles.sectionIcon} />
                  Basic Details
                </h2>

                <div className={styles.formGridTwoCol}>
                  <div className={styles.fieldWrapper}>
                    <label className={styles.fieldLabel}>
                      GSTIN <span className={styles.required}>*</span>
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
                    <p className={styles.fieldHint}>15-digit GST Identification Number</p>
                  </div>

                  <div className={styles.fieldWrapper}>
                    <label className={styles.fieldLabel}>
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

                  <div className={styles.fieldWrapper}>
                    <label className={styles.fieldLabel}>
                      Return Type <span className={styles.required}>*</span>
                    </label>
                    <select
                      name="returnType"
                      value={formData.returnType}
                      onChange={handleChange}
                      className={styles.select}
                      required
                    >
                      {returnTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label} - {type.desc}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.fieldWrapper}>
                    <label className={styles.fieldLabel}>
                      Period <span className={styles.required}>*</span>
                    </label>
                    <select
                      name="period"
                      value={formData.period}
                      onChange={handleChange}
                      className={styles.select}
                      required
                    >
                      {periods.map((period) => (
                        <option key={period} value={period}>{period}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.buttonGroup}>
                  <Button type="button" onClick={() => setStep(2)}>
                    Next: Sales & Purchase Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className={styles.card}>
              <CardContent className={styles.cardContent}>
                <h2 className={styles.sectionTitle}>Sales & Purchase Details</h2>

                <div className={styles.salesSection}>
                  <h3 className={`${styles.subsectionTitle} ${styles.subsectionTitleOrange}`}>Sales Details</h3>
                  <div className={styles.formGridTwoCol}>
                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>
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

                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>
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

                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>
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

                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>
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

                <div className={styles.purchasesSection}>
                  <h3 className={`${styles.subsectionTitle} ${styles.subsectionTitleBlue}`}>Purchase Details</h3>
                  <div className={styles.formGridTwoCol}>
                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>
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

                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>
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

                <div className={styles.taxSection}>
                  <h3 className={`${styles.subsectionTitle} ${styles.subsectionTitleGreen}`}>Tax Details</h3>
                  <div className={styles.formGridTwoCol}>
                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>
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

                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>
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

                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>
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

                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>
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

                <div className={styles.summaryBox}>
                  <h4 className={styles.summaryTitle}>Summary</h4>
                  <div className={styles.summaryContent}>
                    <div className={styles.summaryRow}>
                      <span>Total Sales:</span>
                      <span className={styles.summaryValue}>₹{totals.totalSales.toLocaleString('en-IN')}</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span>Total Purchases:</span>
                      <span className={styles.summaryValue}>₹{totals.totalPurchases.toLocaleString('en-IN')}</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span>Total Tax:</span>
                      <span className={styles.summaryValue}>₹{totals.totalTax.toLocaleString('en-IN')}</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span>ITC Claimed:</span>
                      <span className={styles.summaryValueGreen}>- ₹{Number(formData.itcClaimed || 0).toLocaleString('en-IN')}</span>
                    </div>
                    <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                      <span className={styles.summaryTotalLabel}>Tax Payable:</span>
                      <span className={styles.summaryTotalValue}>₹{totals.taxPayable.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.buttonGroupSpaced}>
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

          {step === 3 && (
            <Card className={styles.card}>
              <CardContent className={styles.cardContent}>
                <h2 className={styles.sectionTitle}>
                  <Upload className={styles.sectionIcon} />
                  Upload Documents & Additional Info
                </h2>

                <div className={styles.uploadSection}>
                  <label className={`${styles.fieldLabel} ${styles.mb2}`}>
                    Supporting Documents
                  </label>
                  <div className={styles.uploadBox}>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className={styles.uploadInput}
                      id="file-upload"
                      accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls"
                    />
                    <label htmlFor="file-upload" className={styles.uploadLabel}>
                      <Upload className={styles.uploadIcon} />
                      <p className={styles.uploadText}>
                        Click to upload GSTR-2A, Purchase invoices, Bank statements, etc.
                      </p>
                      <p className={styles.uploadSubtext}>PDF, JPG, PNG, Excel (Max 10MB each)</p>
                    </label>
                  </div>

                  {documents.length > 0 && (
                    <div className={styles.fileList}>
                      {documents.map((file, index) => (
                        <div key={index} className={styles.fileItem}>
                          <div className={styles.fileInfo}>
                            <FileText className={styles.fileIcon} />
                            <span className={styles.fileName}>{file.name}</span>
                            <span className={styles.fileSize}>
                              ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeDocument(index)}
                            className={styles.removeButton}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className={styles.remarksSection}>
                  <label className={`${styles.fieldLabel} ${styles.mb2}`}>
                    Additional Remarks (Optional)
                  </label>
                  <textarea
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    rows={4}
                    className={styles.textarea}
                    placeholder="Any additional information for our GST experts..."
                  />
                </div>

                <div className={styles.infoBox}>
                  <Info className={styles.infoIcon} />
                  <div className={styles.infoContent}>
                    <p className={styles.infoTitle}>What happens next?</p>
                    <ul className={styles.infoList}>
                      <li>Your GST return will be reviewed by our experts</li>
                      <li>You'll receive a call for verification within 24 hours</li>
                      <li>Your return will be filed and you'll get acknowledgment</li>
                      <li>Track status anytime from your dashboard</li>
                    </ul>
                  </div>
                </div>

                <div className={styles.buttonGroupSpaced}>
                  <Button type="button" variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <div className={styles.buttonGroupRight}>
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

export default function NewGSTFilingPage() {
  return (
    <Suspense fallback={
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    }>
      <NewGSTFilingContent />
    </Suspense>
  )
}