'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { 
  ArrowLeft, FileText, Upload, Plus, X, Save, Send,
  AlertCircle, CheckCircle2, Info
} from 'lucide-react'
import Link from 'next/link'
import { Button, Card, CardContent, Input, Badge, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui'
import styles from './page.module.css'


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

function NewITRFilingContent() {
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
    itrType: 'ITR1',
    assessmentYear: '2024-25',
    panNumber: '',
    aadhaar: '',
    salaryIncome: '',
    housePropertyIncome: '',
    capitalGains: '',
    businessIncome: '',
    otherIncome: '',
    section80C: '',
    section80D: '',
    section80G: '',
    homeLoanInterest: '',
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
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.header}>
          <Link href="/dashboard" className={styles.backLink}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className={styles.headerSpacing} />
          <h1 className={styles.title}>{isEditing ? 'Edit ITR Filing' : 'New ITR Filing'}</h1>
          <p className={styles.subtitle}>{isEditing ? 'Update your Income Tax Return filing' : 'Complete your Income Tax Return filing with expert assistance'}</p>
        </div>
        <div className={styles.headerSpacing} />

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
        <div className={styles.progressSpacing} />

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
                  <FileText className={styles.sectionIcon} />
                  Basic Details
                </h2>

                <div className={styles.formSection}>
                  <div className={styles.formGridTwoCol}>
                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>
                        ITR Type <span className={styles.required}>*</span>
                      </label>
                      <Select value={formData.itrType} onValueChange={(value) => setFormData({...formData, itrType: value})}>
                        <SelectTrigger className={styles.selectTrigger}>
                          <SelectValue placeholder="Select ITR Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {itrTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label} - {type.desc}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>
                        Assessment Year <span className={styles.required}>*</span>
                      </label>
                      <Select value={formData.assessmentYear} onValueChange={(value) => setFormData({...formData, assessmentYear: value})}>
                        <SelectTrigger className={styles.selectTrigger}>
                          <SelectValue placeholder="Select Assessment Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {assessmentYears.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>
                        PAN Number <span className={styles.required}>*</span>
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
                      <p className={styles.fieldHint}>Format: 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)</p>
                    </div>

                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>
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
                </div>

                <div className={styles.buttonGroup}>
                  <Button type="button" onClick={() => setStep(2)}>
                    Next: Income Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className={styles.card}>
              <CardContent className={styles.cardContent}>
                <h2 className={styles.sectionTitle}>Income & Deductions</h2>

                <div className={styles.formSection}>
                  <h3 className={styles.subsectionTitle}>Income Details</h3>
                  <div className={styles.formGridTwoCol}>
                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>
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

                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>
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

                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>
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

                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>
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

                    <div className={`${styles.fieldWrapper} ${styles.fullWidth}`}>
                      <label className={styles.fieldLabel}>
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

                <div className={`${styles.formSection} ${styles.mt8}`}>
                  <h3 className={styles.subsectionTitle}>Deductions</h3>
                  <div className={styles.formGridTwoCol}>
                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>
                        Section 80C (₹) <span className={styles.maxHint}>Max: 1,50,000</span>
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

                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>
                        Section 80D (₹) <span className={styles.maxHint}>Max: 1,00,000</span>
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

                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>
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

                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>
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

                <div className={styles.summaryBox}>
                  <h4 className={styles.summaryTitle}>Summary</h4>
                  <div className={styles.summaryContent}>
                    <div className={styles.summaryRow}>
                      <span>Total Income:</span>
                      <span className={styles.summaryValue}>₹{totals.totalIncome.toLocaleString('en-IN')}</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span>Total Deductions:</span>
                      <span className={styles.summaryDeduction}>- ₹{totals.totalDeductions.toLocaleString('en-IN')}</span>
                    </div>
                    <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                      <span className={styles.summaryTotalLabel}>Taxable Income:</span>
                      <span className={styles.summaryTotalValue}>₹{totals.taxableIncome.toLocaleString('en-IN')}</span>
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
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="file-upload" className={styles.uploadLabel}>
                      <Upload className={styles.uploadIcon} />
                      <p className={styles.uploadText}>
                        Click to upload Form 16, Form 26AS, Bank Statements, etc.
                      </p>
                      <p className={styles.uploadSubtext}>PDF, JPG, PNG (Max 10MB each)</p>
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

                <div className={styles.formSection}>
                  <h3 className={styles.subsectionTitle}>Additional Information</h3>
                  <div className={styles.fieldWrapper}>
                    <label className={styles.fieldLabel}>
                      Additional Remarks (Optional)
                    </label>
                    <textarea
                      name="remarks"
                      value={formData.remarks}
                      onChange={handleChange}
                      rows={4}
                      className={styles.textarea}
                      placeholder="Any additional information for our CA experts..."
                    />
                  </div>
                </div>

                <div className={styles.infoBox}>
                  <Info className={styles.infoIcon} />
                  <div className={styles.infoContent}>
                    <p className={styles.infoTitle}>What happens next?</p>
                    <ul className={styles.infoList}>
                      <li>Your filing will be reviewed by our CA experts</li>
                      <li>You'll receive a call for verification within 24 hours</li>
                      <li>Your ITR will be filed and you'll get acknowledgment</li>
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

export default function NewITRFilingPage() {
  return (
    <Suspense fallback={
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    }>
      <NewITRFilingContent />
    </Suspense>
  )
}