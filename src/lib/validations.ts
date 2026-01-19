import { z } from 'zod'

// Auth validations
export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number').optional(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

// Contact form validation
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
})

// ITR Filing validation
export const itrFilingSchema = z.object({
  assessmentYear: z.string().regex(/^\d{4}-\d{2}$/, 'Invalid assessment year format'),
  itrType: z.enum(['ITR1', 'ITR2', 'ITR3', 'ITR4', 'ITR5', 'ITR6', 'ITR7']),
  panNumber: z.string()
    .regex(/^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/, 'Invalid PAN number format')
    .transform(val => val.toUpperCase()),
  dateOfBirth: z.string().datetime().optional(),
  
  // Income details
  salaryIncome: z.number().min(0).optional(),
  housePropertyIncome: z.number().optional(),
  capitalGains: z.number().optional(),
  businessIncome: z.number().optional(),
  otherIncome: z.number().optional(),
  
  // Deductions
  section80C: z.number().min(0).max(150000).optional(),
  section80D: z.number().min(0).max(100000).optional(),
  section80G: z.number().min(0).optional(),
  homeLoanInterest: z.number().min(0).max(200000).optional(),
  
  // Bank details
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code').optional(),
})

// GST Filing validation
export const gstFilingSchema = z.object({
  gstin: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GSTIN'),
  returnType: z.enum(['GSTR1', 'GSTR3B', 'GSTR4', 'GSTR9', 'GSTR9C']),
  period: z.string(), // e.g., "January 2026" or "Q1 2025-26"
  
  // Outward supplies
  taxableValue: z.number().min(0),
  igst: z.number().min(0).optional(),
  cgst: z.number().min(0).optional(),
  sgst: z.number().min(0).optional(),
  cess: z.number().min(0).optional(),
  
  // Inward supplies (ITC)
  itcIgst: z.number().min(0).optional(),
  itcCgst: z.number().min(0).optional(),
  itcSgst: z.number().min(0).optional(),
  itcCess: z.number().min(0).optional(),
})

// Document upload validation
export const documentSchema = z.object({
  name: z.string().min(1, 'Document name is required'),
  type: z.enum(['PAN_CARD', 'AADHAAR', 'FORM_16', 'BANK_STATEMENT', 'INVESTMENT_PROOF', 'OTHER']),
  fileUrl: z.string().url('Invalid file URL'),
  fileSize: z.number().max(10 * 1024 * 1024, 'File size must be less than 10MB'),
  mimeType: z.string(),
})

// Profile update validation
export const profileUpdateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number').optional(),
  image: z.string().url('Invalid image URL').optional(),
})

// Password change validation
export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Type exports
export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type ContactInput = z.infer<typeof contactSchema>
export type ITRFilingInput = z.infer<typeof itrFilingSchema>
export type GSTFilingInput = z.infer<typeof gstFilingSchema>
export type DocumentInput = z.infer<typeof documentSchema>
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>
export type PasswordChangeInput = z.infer<typeof passwordChangeSchema>
