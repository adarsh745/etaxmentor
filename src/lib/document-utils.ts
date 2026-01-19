import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

// File validation schemas
export const fileValidationSchema = z.object({
  size: z.number().max(10 * 1024 * 1024, 'File size must be less than 10MB'),
  type: z.string().refine(
    (type) => [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/jpg',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ].includes(type),
    'Invalid file type. Only PDF, images, and Excel files are allowed'
  ),
})

export const documentMetadataSchema = z.object({
  type: z.enum([
    'PAN_CARD', 'AADHAAR', 'FORM_16', 'FORM_26AS', 'AIS_TIS',
    'BANK_STATEMENT', 'INVESTMENT_PROOF', 'SALARY_SLIP', 'CAPITAL_GAINS',
    'RENTAL_AGREEMENT', 'LOAN_CERTIFICATE', 'GST_CERTIFICATE', 'OTHER'
  ]),
  financialYear: z.string().optional(),
  assessmentYear: z.string().optional(),
})

// Utility functions
export const generateFileName = (originalName: string): string => {
  const extension = originalName.split('.').pop()
  return `${uuidv4()}.${extension}`
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const getFileIcon = (mimeType: string): string => {
  if (mimeType.startsWith('image/')) return 'image'
  if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) return 'spreadsheet'
  if (mimeType === 'application/pdf') return 'pdf'
  return 'file'
}

export const documentTypeLabels: Record<string, string> = {
  PAN_CARD: 'PAN Card',
  AADHAAR: 'Aadhaar Card',
  FORM_16: 'Form 16',
  FORM_26AS: 'Form 26AS',
  AIS_TIS: 'AIS/TIS',
  BANK_STATEMENT: 'Bank Statement',
  INVESTMENT_PROOF: 'Investment Proof',
  SALARY_SLIP: 'Salary Slip',
  CAPITAL_GAINS: 'Capital Gains Statement',
  RENTAL_AGREEMENT: 'Rental Agreement',
  LOAN_CERTIFICATE: 'Loan Certificate',
  GST_CERTIFICATE: 'GST Certificate',
  OTHER: 'Other Document',
}

export const statusConfig = {
  UPLOADED: { 
    label: 'Uploaded', 
    color: 'bg-blue-100 text-blue-800', 
    description: 'Document uploaded successfully'
  },
  VERIFIED: { 
    label: 'Verified', 
    color: 'bg-green-100 text-green-800', 
    description: 'Document verified by expert'
  },
  REJECTED: { 
    label: 'Rejected', 
    color: 'bg-red-100 text-red-800', 
    description: 'Document rejected - needs correction'
  },
  PROCESSING: { 
    label: 'Processing', 
    color: 'bg-yellow-100 text-yellow-800', 
    description: 'Document under review'
  },
}

// File processing utilities
export const createFileBlob = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as ArrayBuffer)
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

export const validateFile = (file: File): { valid: boolean; error?: string } => {
  try {
    fileValidationSchema.parse({ size: file.size, type: file.type })
    return { valid: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, error: error.errors[0].message }
    }
    return { valid: false, error: 'Invalid file' }
  }
}

// Document categorization helpers
export const getDocumentCategory = (type: string): string => {
  const categories: Record<string, string[]> = {
    'Identity': ['PAN_CARD', 'AADHAAR'],
    'Income': ['FORM_16', 'SALARY_SLIP', 'FORM_26AS', 'AIS_TIS'],
    'Investment': ['INVESTMENT_PROOF', 'CAPITAL_GAINS'],
    'Banking': ['BANK_STATEMENT', 'LOAN_CERTIFICATE'],
    'Property': ['RENTAL_AGREEMENT'],
    'Business': ['GST_CERTIFICATE'],
    'Other': ['OTHER'],
  }
  
  for (const [category, types] of Object.entries(categories)) {
    if (types.includes(type)) return category
  }
  return 'Other'
}

export const getDocumentPriority = (type: string): 'high' | 'medium' | 'low' => {
  const highPriority = ['PAN_CARD', 'AADHAAR', 'FORM_16']
  const mediumPriority = ['FORM_26AS', 'AIS_TIS', 'BANK_STATEMENT', 'INVESTMENT_PROOF']
  
  if (highPriority.includes(type)) return 'high'
  if (mediumPriority.includes(type)) return 'medium'
  return 'low'
}

// Search and filter utilities
export const searchDocuments = (documents: any[], query: string): any[] => {
  if (!query) return documents
  
  const lowercaseQuery = query.toLowerCase()
  return documents.filter(doc => 
    doc.originalName.toLowerCase().includes(lowercaseQuery) ||
    doc.fileName.toLowerCase().includes(lowercaseQuery) ||
    documentTypeLabels[doc.type]?.toLowerCase().includes(lowercaseQuery)
  )
}

export const filterDocuments = (documents: any[], filters: {
  status?: string
  type?: string
  financialYear?: string
  category?: string
}): any[] => {
  return documents.filter(doc => {
    if (filters.status && filters.status !== 'all' && doc.status !== filters.status) {
      return false
    }
    if (filters.type && filters.type !== 'all' && doc.type !== filters.type) {
      return false
    }
    if (filters.financialYear && filters.financialYear !== 'all' && doc.financialYear !== filters.financialYear) {
      return false
    }
    if (filters.category && filters.category !== 'all' && getDocumentCategory(doc.type) !== filters.category) {
      return false
    }
    return true
  })
}

// Date utilities
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

export const getRelativeTime = (date: string | Date): string => {
  const now = new Date()
  const docDate = new Date(date)
  const diffTime = now.getTime() - docDate.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
}

// Constants
export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png', 
  'image/jpg',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]

export const FINANCIAL_YEARS = [
  { value: '2024-25', label: 'FY 2024-25 (AY 2025-26)' },
  { value: '2023-24', label: 'FY 2023-24 (AY 2024-25)' },
  { value: '2022-23', label: 'FY 2022-23 (AY 2023-24)' },
  { value: '2021-22', label: 'FY 2021-22 (AY 2022-23)' },
  { value: '2020-21', label: 'FY 2020-21 (AY 2021-22)' },
]