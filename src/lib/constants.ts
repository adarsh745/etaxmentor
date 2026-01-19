// App Configuration
export const APP_CONFIG = {
  name: 'eTaxMentor',
  tagline: 'Empower Your Financial Future with Expert Tax Solutions',
  description: 'All-in-one platform trusted by 10,000+ for seamless ITR filing, GST, TDS, CFO, and business structuring services.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://www.etaxmentor.com',
  email: 'enquiry@etaxmentor.com',
  phone: '+91 89779 44578',
  address: '#709, 7th Floor, Gowra Fountainhead, HUDA Techno Enclave, HITEC City, Hyderabad, Telangana - 500081',
  social: {
    facebook: 'https://www.facebook.com/etmefile',
    instagram: 'https://www.instagram.com/etaxmentoroff/',
    twitter: 'https://x.com/etaxmentoroff',
    linkedin: 'https://www.linkedin.com/company/70954706',
  },
  stats: {
    clients: '10,000+',
    yearsExperience: '24+',
    rating: '5.0',
  },
}

// Navigation Links
export const NAV_LINKS = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'ITR Filing', href: '/itr-filing' },
    { name: 'GST Filing', href: '/gst-filing' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'ITR Filing', href: '/itr-filing', description: 'File your income tax returns with expert CA assistance' },
    { name: 'GST Filing', href: '/gst-filing', description: 'GST registration and compliance services' },
    { name: 'Form 16', href: '/form-16', description: 'Form 16 generation and verification' },
    { name: 'UAN EPFO', href: '/uan-epfo', description: 'UAN and PF related services' },
    { name: 'Tax Notice', href: '/tax-notice', description: 'Handle income tax notices with expert guidance' },
    { name: 'Advance Tax', href: '/advance-tax', description: 'Calculate and pay advance tax on time' },
  ],
  footer: {
    information: [
      { name: 'About Us', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Careers', href: '/careers' },
    ],
    services: [
      { name: 'ITR Filing', href: '/itr-filing' },
      { name: 'GST Filing', href: '/gst-filing' },
      { name: 'Form 16', href: '/form-16' },
      { name: 'UAN EPFO', href: '/uan-epfo' },
      { name: 'Tax Notice', href: '/tax-notice' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms and Conditions', href: '/terms' },
      { name: 'Refund Policy', href: '/refund-policy' },
      { name: 'Shipping Policy', href: '/shipping-policy' },
    ],
  },
}

// ITR Types
export const ITR_TYPES = [
  {
    type: 'ITR1',
    name: 'ITR-1 (Sahaj)',
    description: 'For salaried individuals with income up to ₹50 lakhs',
    eligibility: [
      'Salary/Pension income',
      'Income from one house property',
      'Income from other sources (Interest, etc.)',
      'Agricultural income up to ₹5,000',
    ],
    price: 499,
  },
  {
    type: 'ITR2',
    name: 'ITR-2',
    description: 'For individuals and HUFs not having income from business/profession',
    eligibility: [
      'Salary/Pension income',
      'Multiple house properties',
      'Capital gains',
      'Foreign income/assets',
      'Income above ₹50 lakhs',
    ],
    price: 999,
  },
  {
    type: 'ITR3',
    name: 'ITR-3',
    description: 'For individuals and HUFs having income from business/profession',
    eligibility: [
      'Business income',
      'Professional income',
      'Freelancing income',
      'Partner in a firm',
    ],
    price: 1499,
  },
  {
    type: 'ITR4',
    name: 'ITR-4 (Sugam)',
    description: 'For presumptive income from business/profession',
    eligibility: [
      'Business income under Section 44AD',
      'Professional income under Section 44ADA',
      'Turnover up to ₹2 crores',
    ],
    price: 999,
  },
]

// Pricing Plans
export const PRICING_PLANS = [
  {
    name: 'Basic',
    price: 499,
    originalPrice: 999,
    description: 'Best for salaried individuals with Form 16',
    features: [
      'ITR-1 Filing',
      'Form 16 Processing',
      'Tax Computation',
      'E-filing with acknowledgment',
      'Email Support',
    ],
    popular: false,
    serviceType: 'ITR_BASIC',
  },
  {
    name: 'Standard',
    price: 999,
    originalPrice: 1999,
    description: 'Best for freelancers and consultants',
    features: [
      'ITR-1 to ITR-4 Filing',
      'Capital Gains Computation',
      'Multiple Income Sources',
      'Deduction Optimization',
      'Priority Support',
      'CA Consultation (15 mins)',
    ],
    popular: true,
    serviceType: 'ITR_STANDARD',
  },
  {
    name: 'Premium',
    price: 1499,
    originalPrice: 2999,
    description: 'Best for NRIs, Crypto, Capital Gains',
    features: [
      'All ITR Types',
      'NRI Tax Filing',
      'Crypto/Stock Trading',
      'Foreign Income Reporting',
      'DTAA Benefits',
      'Dedicated CA Support',
      'Tax Planning Advisory',
    ],
    popular: false,
    serviceType: 'ITR_PREMIUM',
  },
  {
    name: 'Enterprise',
    price: null, // Custom pricing
    originalPrice: null,
    description: 'For businesses, audits, and complex filings',
    features: [
      'All Premium Features',
      'Business Tax Filing',
      'Tax Audit Support',
      'GST Compliance',
      'Virtual CFO Services',
      'Dedicated Account Manager',
      'Unlimited Consultations',
    ],
    popular: false,
    serviceType: 'ITR_ENTERPRISE',
  },
]

// GST Return Types
export const GST_RETURN_TYPES = [
  { type: 'GSTR1', name: 'GSTR-1', description: 'Outward supplies' },
  { type: 'GSTR3B', name: 'GSTR-3B', description: 'Monthly summary return' },
  { type: 'GSTR4', name: 'GSTR-4', description: 'Composition scheme return' },
  { type: 'GSTR9', name: 'GSTR-9', description: 'Annual return' },
  { type: 'GSTR9C', name: 'GSTR-9C', description: 'Reconciliation statement' },
]

// Document Types
export const DOCUMENT_TYPES = [
  { type: 'PAN_CARD', name: 'PAN Card', required: true },
  { type: 'AADHAAR', name: 'Aadhaar Card', required: true },
  { type: 'FORM_16', name: 'Form 16', required: false },
  { type: 'FORM_26AS', name: 'Form 26AS', required: false },
  { type: 'AIS_TIS', name: 'AIS/TIS Statement', required: false },
  { type: 'BANK_STATEMENT', name: 'Bank Statement', required: false },
  { type: 'INVESTMENT_PROOF', name: 'Investment Proofs', required: false },
  { type: 'SALARY_SLIP', name: 'Salary Slips', required: false },
  { type: 'CAPITAL_GAINS', name: 'Capital Gains Statement', required: false },
  { type: 'RENTAL_AGREEMENT', name: 'Rental Agreement', required: false },
  { type: 'LOAN_CERTIFICATE', name: 'Loan Interest Certificate', required: false },
  { type: 'GST_CERTIFICATE', name: 'GST Certificate', required: false },
  { type: 'OTHER', name: 'Other Documents', required: false },
]

// Who We Serve
export const TARGET_AUDIENCE = [
  {
    title: 'Salaried',
    description: 'Claim TDS refunds and show compliance',
    icon: 'Briefcase',
  },
  {
    title: 'Freelancers',
    description: 'Income from freelancing, consulting, or gig work',
    icon: 'Laptop',
  },
  {
    title: 'Students',
    description: 'Part-time income and scholarship reporting',
    icon: 'GraduationCap',
  },
  {
    title: 'Startups',
    description: 'Business income and compliance management',
    icon: 'Rocket',
  },
  {
    title: 'SMEs',
    description: 'Complete tax and GST compliance',
    icon: 'Building',
  },
  {
    title: 'NGOs',
    description: 'Tax exemptions and compliance',
    icon: 'Heart',
  },
  {
    title: 'Enterprises',
    description: 'Complex tax structures and audits',
    icon: 'Building2',
  },
]

// Testimonials
export const TESTIMONIALS = [
  {
    name: 'Pratap Pudi',
    rating: 5,
    text: 'I have been using e-tax mentor for the last ten years. Their team and service is great.',
    source: 'Google Reviews',
  },
  {
    name: 'Yarram Naresh',
    rating: 5,
    text: 'As part of ITR filing, team is very helpful and good approaching mind set. Thanks alot for all the effort and helping me to complete ITR filing.',
    source: 'Google Reviews',
  },
  {
    name: 'Anil Kumar Retikal',
    rating: 5,
    text: 'Very Good Professional Tax consultant firm. E Tax mentor has been handling my taxes for the past four years, and they are very professional, efficient.',
    source: 'Google Reviews',
  },
  {
    name: 'Saikrishnavamsi Palanki',
    rating: 5,
    text: 'eTaxMentor helped me recover a missed refund of ₹18,000 by reviewing my AIS report. Their expert guidance made all the difference!',
    source: 'Google Reviews',
  },
  {
    name: 'Zakir Hussain',
    rating: 5,
    text: 'Team was very professional and fast in responding to my queries. Once they collected all the documents the processing also was done very fast.',
    source: 'Google Reviews',
  },
]

// FAQ Categories
export const FAQ_CATEGORIES = [
  'General',
  'ITR Filing',
  'GST',
  'Payments',
  'Documents',
  'Refunds',
]

// File Upload Config
export const FILE_UPLOAD_CONFIG = {
  maxSize: 10 * 1024 * 1024, // 10MB
  acceptedTypes: [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/jpg',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  acceptedExtensions: ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'],
}

// Status Labels
export const STATUS_LABELS: Record<string, string> = {
  DRAFT: 'Draft',
  DOCUMENTS_PENDING: 'Documents Pending',
  UNDER_REVIEW: 'Under Review',
  CA_ASSIGNED: 'CA Assigned',
  PROCESSING: 'Processing',
  VERIFICATION_PENDING: 'Verification Pending',
  FILED: 'Filed',
  ACKNOWLEDGED: 'Acknowledged',
  REFUND_INITIATED: 'Refund Initiated',
  COMPLETED: 'Completed',
  REJECTED: 'Rejected',
  PENDING: 'Pending',
  FAILED: 'Failed',
  REFUNDED: 'Refunded',
  CANCELLED: 'Cancelled',
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  SUSPENDED: 'Suspended',
  PENDING_VERIFICATION: 'Pending Verification',
}
