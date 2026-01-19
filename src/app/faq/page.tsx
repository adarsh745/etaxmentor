'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Search, HelpCircle, FileText, Receipt, Calculator, Building2 } from 'lucide-react'
import { Card } from '@/components/ui'

const faqCategories = [
  { id: 'itr', name: 'Income Tax Return', icon: FileText },
  { id: 'gst', name: 'GST', icon: Receipt },
  { id: 'tds', name: 'TDS', icon: Calculator },
  { id: 'business', name: 'Business Registration', icon: Building2 },
  { id: 'general', name: 'General', icon: HelpCircle },
]

const faqs = [
  // ITR FAQs
  {
    category: 'itr',
    question: 'Who is required to file Income Tax Return in India?',
    answer: `You are required to file ITR if:
• Your gross total income exceeds the basic exemption limit (₹2.5 lakhs for individuals below 60)
• You want to claim a tax refund
• You want to carry forward losses
• You are a company or firm (mandatory regardless of income)
• You have foreign income or assets
• You have deposited more than ₹1 crore in a bank account`
  },
  {
    category: 'itr',
    question: 'What is the due date for filing ITR?',
    answer: `The due dates for ITR filing are:
• Salaried individuals and non-audit cases: July 31
• Audit cases (businesses with turnover > ₹1 crore): October 31
• Transfer pricing cases: November 30
• Belated return: December 31 (of the assessment year)
• Revised return: December 31 (of the assessment year)

Note: Dates may be extended by the government.`
  },
  {
    category: 'itr',
    question: 'Which ITR form should I use?',
    answer: `ITR form depends on your income sources:
• ITR-1 (Sahaj): Salaried individuals with income up to ₹50 lakhs
• ITR-2: Individuals with capital gains or multiple house properties
• ITR-3: Individuals with business/professional income
• ITR-4 (Sugam): Presumptive income under 44AD/44ADA
• ITR-5: Partnership firms, LLPs, AOPs
• ITR-6: Companies (except those claiming Section 11)
• ITR-7: Charitable trusts, political parties`
  },
  {
    category: 'itr',
    question: 'What documents are required for ITR filing?',
    answer: `Common documents required:
• PAN Card
• Aadhaar Card
• Form 16 (for salaried)
• Bank statements
• Investment proofs (80C, 80D, etc.)
• Property documents (if applicable)
• Capital gains statements
• Previous year ITR (if any)
• Form 26AS (Tax Credit Statement)`
  },
  {
    category: 'itr',
    question: 'How long does it take to get a tax refund?',
    answer: `Refund processing time depends on:
• E-verification: Refunds are processed within 4-6 weeks after e-verification
• Physical verification: Takes additional 2-3 weeks
• Defective returns: Delays until defect is resolved
• Scrutiny cases: May take several months

Tips for faster refund:
• E-verify your return immediately
• Ensure bank account details are correct
• File well before the deadline`
  },

  // GST FAQs
  {
    category: 'gst',
    question: 'Who needs to register for GST?',
    answer: `GST registration is mandatory if:
• Annual turnover exceeds ₹40 lakhs (₹20 lakhs for service providers)
• You make inter-state supplies
• You are an e-commerce operator
• You are a casual taxable person
• You are liable to pay tax under reverse charge
• Input service distributor
• TDS/TCS deductors

Voluntary registration is allowed for others.`
  },
  {
    category: 'gst',
    question: 'What are the different types of GST returns?',
    answer: `Main GST returns:
• GSTR-1: Details of outward supplies (11th of next month)
• GSTR-3B: Summary return with tax payment (20th of next month)
• GSTR-4: For composition dealers (annually)
• GSTR-9: Annual return (31st December)
• GSTR-9C: Reconciliation statement with audit (31st December)

Other returns: GSTR-5 (NRI), GSTR-6 (ISD), GSTR-7 (TDS), GSTR-8 (TCS)`
  },
  {
    category: 'gst',
    question: 'What is Input Tax Credit (ITC)?',
    answer: `Input Tax Credit is the tax that a business pays on purchases (input) and can use to reduce its tax liability on sales (output).

Conditions for claiming ITC:
• You must be a registered taxpayer
• You must have a tax invoice or debit note
• You must have received the goods/services
• Tax charged must have been paid to the government
• You must have filed GSTR-3B

ITC cannot be claimed on personal use, exempt supplies, or blocked items.`
  },
  {
    category: 'gst',
    question: 'What is the penalty for late GST filing?',
    answer: `Late filing penalties:
• Late fee: ₹50/day (₹25 CGST + ₹25 SGST) for regular returns
• Late fee for NIL return: ₹20/day (₹10 CGST + ₹10 SGST)
• Maximum late fee: ₹10,000 per return (₹5,000 each for CGST & SGST)
• Interest: 18% p.a. on tax amount due

Note: Late filing can also result in blocking of e-way bill generation and ITC claim issues.`
  },

  // TDS FAQs
  {
    category: 'tds',
    question: 'What is TDS and who should deduct it?',
    answer: `TDS (Tax Deducted at Source) is tax collected at the source of income.

Who should deduct TDS:
• Employers (on salary)
• Banks (on interest above ₹40,000)
• Persons paying rent above ₹50,000/month
• Persons paying professional fees above ₹30,000
• Companies paying contractors

Common TDS sections: 192 (Salary), 194A (Interest), 194C (Contractors), 194J (Professional fees)`
  },
  {
    category: 'tds',
    question: 'What are the due dates for TDS return filing?',
    answer: `TDS return due dates:
• Q1 (Apr-Jun): July 31
• Q2 (Jul-Sep): October 31
• Q3 (Oct-Dec): January 31
• Q4 (Jan-Mar): May 31

Form 16/16A issuance:
• Form 16: June 15 (for salary TDS)
• Form 16A: Within 15 days from due date of TDS return`
  },

  // Business Registration FAQs
  {
    category: 'business',
    question: 'What are the types of business structures in India?',
    answer: `Common business structures:
• Proprietorship: Single owner, easiest to start, unlimited liability
• Partnership Firm: 2+ partners, governed by Partnership Act
• LLP: Limited liability, separate legal entity, 2+ partners
• Private Limited Company: Limited liability, 2+ shareholders, more compliance
• Public Limited Company: Shares tradable, minimum 7 shareholders
• One Person Company (OPC): Single member company, limited liability`
  },
  {
    category: 'business',
    question: 'How long does it take to register a company?',
    answer: `Registration timelines:
• Proprietorship: 1-2 days
• Partnership Firm: 3-5 days
• LLP: 7-10 days
• Private Limited Company: 10-15 days
• OPC: 10-15 days

Note: Timelines depend on document availability and government processing.`
  },

  // General FAQs
  {
    category: 'general',
    question: 'How do I track the status of my filing?',
    answer: `You can track your filing status through:
• Login to your eTaxMentor dashboard
• Check the filing status in "My Filings" section
• You will receive email/SMS updates on status changes
• For ITR: Check status on Income Tax Portal
• For GST: Check on GST Portal

Our support team is also available to help with any queries.`
  },
  {
    category: 'general',
    question: 'What are your payment options?',
    answer: `We accept multiple payment methods:
• UPI (Google Pay, PhonePe, Paytm)
• Credit/Debit Cards
• Net Banking
• EMI options (for amounts above ₹5,000)
• Wallet payments

Payment is generally collected after service completion or in installments for larger projects.`
  },
  {
    category: 'general',
    question: 'Do you provide support for tax notices?',
    answer: `Yes, we provide comprehensive support for tax notices:
• Analysis of notice and required response
• Drafting reply to the notice
• Representation before tax authorities
• Assistance in assessment proceedings
• Appeals if required

Premium plan customers get notice handling included. Others can avail it as an add-on service.`
  },
]

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('itr')
  const [searchQuery, setSearchQuery] = useState('')
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[linear-gradient(to_bottom_right,#1E3A8A,#3B82F6)] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Find answers to common questions about tax filing, GST, and business compliance.
            </p>
            
            {/* Search */}
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto gap-2 py-4">
            {faqCategories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    activeCategory === category.id
                      ? 'bg-[#1E3A8A] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-4">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">Try adjusting your search or browse different categories</p>
              </div>
            ) : (
              filteredFAQs.map((faq, idx) => (
                <Card key={idx} className="overflow-hidden">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === `${faq.category}-${idx}` ? null : `${faq.category}-${idx}`)}
                    className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                    {openFAQ === `${faq.category}-${idx}` ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                    )}
                  </button>
                  {openFAQ === `${faq.category}-${idx}` && (
                    <div className="px-6 pb-6">
                      <div className="pt-4 border-t text-gray-600 whitespace-pre-line">
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mb-8">
            Can&apos;t find what you&apos;re looking for? Our team is here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#1E3A8A]/90 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="tel:+918012345678"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
