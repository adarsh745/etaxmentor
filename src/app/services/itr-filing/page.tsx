'use client'

import Link from 'next/link'
import { 
  FileText, Users, Briefcase, Building2, Home, TrendingUp,
  CheckCircle, ArrowRight, Clock, Shield, Calculator,
  AlertCircle, Calendar, Download
} from 'lucide-react'
import { Button, Card, CardContent, Badge } from '@/components/ui'

const itrTypes = [
  {
    id: 'itr-1',
    name: 'ITR-1 (Sahaj)',
    description: 'For salaried individuals with income up to ₹50 lakhs',
    eligibility: [
      'Income from Salary/Pension',
      'Income from One House Property',
      'Income from Other Sources (Interest, etc.)',
      'Agricultural income up to ₹5,000',
    ],
    notFor: [
      'Total income above ₹50 lakhs',
      'Directors of companies',
      'Unlisted equity shares holders',
      'Multiple house properties',
    ],
    price: 499,
    popular: true,
    icon: Users,
    color: 'bg-blue-500',
  },
  {
    id: 'itr-2',
    name: 'ITR-2',
    description: 'For individuals and HUFs with capital gains',
    eligibility: [
      'Income from Salary/Pension',
      'Multiple House Properties',
      'Capital Gains (Stocks, Property, etc.)',
      'Foreign Income/Assets',
      'Income above ₹50 lakhs',
    ],
    notFor: [
      'Business/Profession Income',
      'Partnership Firm Income',
    ],
    price: 1499,
    popular: false,
    icon: TrendingUp,
    color: 'bg-green-500',
  },
  {
    id: 'itr-3',
    name: 'ITR-3',
    description: 'For individuals and HUFs with business income',
    eligibility: [
      'Business/Profession Income',
      'Freelancers and Consultants',
      'Partners in Firms',
      'All incomes eligible in ITR-1 & ITR-2',
    ],
    notFor: [
      'Companies',
      'LLPs',
    ],
    price: 2499,
    popular: false,
    icon: Briefcase,
    color: 'bg-purple-500',
  },
  {
    id: 'itr-4',
    name: 'ITR-4 (Sugam)',
    description: 'For presumptive income scheme users',
    eligibility: [
      'Business under Section 44AD',
      'Profession under Section 44ADA',
      'Income from Salary/Pension',
      'One House Property',
    ],
    notFor: [
      'Total income above ₹50 lakhs',
      'Foreign assets/income',
      'Directors of companies',
    ],
    price: 999,
    popular: false,
    icon: Calculator,
    color: 'bg-orange-500',
  },
  {
    id: 'itr-5',
    name: 'ITR-5',
    description: 'For firms, LLPs, AOPs, BOIs',
    eligibility: [
      'Partnership Firms',
      'Limited Liability Partnerships',
      'Association of Persons',
      'Body of Individuals',
    ],
    notFor: [
      'Individuals',
      'HUFs',
      'Companies',
    ],
    price: 3999,
    popular: false,
    icon: Building2,
    color: 'bg-red-500',
  },
  {
    id: 'itr-6',
    name: 'ITR-6',
    description: 'For companies (except Section 11)',
    eligibility: [
      'All Companies except those claiming Section 11 exemption',
      'Private Limited Companies',
      'Public Limited Companies',
    ],
    notFor: [
      'Companies claiming exemption under Section 11',
    ],
    price: 7999,
    popular: false,
    icon: Building2,
    color: 'bg-indigo-500',
  },
]

const process = [
  {
    step: 1,
    title: 'Upload Documents',
    description: 'Share your Form 16, bank statements, and investment proofs through our secure portal',
    icon: Download,
  },
  {
    step: 2,
    title: 'Expert Review',
    description: 'Our CA team reviews your documents and prepares your return with maximum deductions',
    icon: Users,
  },
  {
    step: 3,
    title: 'Your Approval',
    description: 'Review the computed tax and return details before final filing',
    icon: CheckCircle,
  },
  {
    step: 4,
    title: 'E-Filing & Verification',
    description: 'We file your return and assist with e-verification for instant processing',
    icon: FileText,
  },
]

const deadlines = [
  { type: 'Salaried Individuals', deadline: 'July 31, 2024', extended: false },
  { type: 'Audit Cases', deadline: 'October 31, 2024', extended: false },
  { type: 'Transfer Pricing Cases', deadline: 'November 30, 2024', extended: false },
  { type: 'Revised Return', deadline: 'December 31, 2024', extended: false },
]

export default function ITRFilingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1E3A8A] via-[#1E40AF] to-[#3B82F6] py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="bg-white/20 text-white mb-6">
              <Clock className="w-4 h-4 mr-1" />
              File Before July 31st - Avoid Late Fees
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Income Tax Return Filing
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Expert CA-assisted ITR filing for all types. Get maximum refund 
              with accurate filing. Starting at just ₹499.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="bg-white text-[#1E3A8A] hover:bg-gray-100">
                  File ITR Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#1E3A8A]">
                  Talk to Expert
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-[#1E3A8A]">50,000+</div>
              <div className="text-gray-600">ITRs Filed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#10B981]">₹100Cr+</div>
              <div className="text-gray-600">Refunds Claimed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#F59E0B]">24-48 hrs</div>
              <div className="text-gray-600">Filing Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#EF4444]">99.9%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* ITR Types */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your ITR Type
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Not sure which ITR form applies to you? Don&apos;t worry - our experts 
              will help you choose the right form based on your income sources.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itrTypes.map((itr) => {
              const Icon = itr.icon
              return (
                <Card key={itr.id} className={`relative overflow-hidden hover:shadow-xl transition-all ${itr.popular ? 'ring-2 ring-[#1E3A8A]' : ''}`}>
                  {itr.popular && (
                    <div className="absolute top-0 right-0 bg-[#1E3A8A] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      MOST COMMON
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 ${itr.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{itr.name}</h3>
                        <p className="text-sm text-gray-600">{itr.description}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Eligible For:</h4>
                      <ul className="space-y-1">
                        {itr.eligibility.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Not For:</h4>
                      <ul className="space-y-1">
                        {itr.notFor.slice(0, 2).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-[#1E3A8A]">₹{itr.price}</span>
                        <span className="text-gray-500 text-sm ml-1">onwards</span>
                      </div>
                      <Link href="/register">
                        <Button variant={itr.popular ? 'primary' : 'outline'} size="sm">
                          File Now
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">Simple 4-step process to file your ITR</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step) => {
              const Icon = step.icon
              return (
                <div key={step.step} className="text-center relative">
                  <div className="w-16 h-16 bg-[#1E3A8A] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                  
                  {step.step < 4 && (
                    <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-[#1E3A8A]/20" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Deadlines */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                <Calendar className="inline w-8 h-8 mr-2 text-[#EF4444]" />
                ITR Filing Deadlines
              </h2>
              <p className="text-gray-600">Don&apos;t miss these important dates</p>
            </div>

            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#1E3A8A] text-white">
                      <th className="text-left p-4">Category</th>
                      <th className="text-left p-4">Deadline</th>
                      <th className="text-center p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deadlines.map((item, idx) => (
                      <tr key={idx} className="border-b last:border-0">
                        <td className="p-4 font-medium text-gray-900">{item.type}</td>
                        <td className="p-4 text-gray-600">{item.deadline}</td>
                        <td className="p-4 text-center">
                          <Badge variant={item.extended ? 'success' : 'warning'}>
                            {item.extended ? 'Extended' : 'Upcoming'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <p className="text-center text-sm text-gray-500 mt-4">
              * Late filing attracts penalty of ₹5,000 (₹1,000 if income &lt; ₹5 lakhs)
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gradient-to-br from-[#1E3A8A]/5 to-[#3B82F6]/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why File with eTaxMentor?
              </h2>
              <div className="space-y-4">
                {[
                  { icon: Shield, title: 'Expert CA Team', desc: 'Qualified professionals ensure accurate filing' },
                  { icon: TrendingUp, title: 'Maximum Refund', desc: 'We identify all deductions you\'re eligible for' },
                  { icon: Clock, title: 'Quick Processing', desc: 'Most returns filed within 24-48 hours' },
                  { icon: Home, title: 'Convenience', desc: 'File from home - no office visits needed' },
                  { icon: CheckCircle, title: 'Error-Free', desc: '99.9% accuracy rate with multiple review layers' },
                  { icon: Users, title: 'Post-Filing Support', desc: 'Help with notices and queries after filing' },
                ].map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#10B981]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#10B981]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <Card className="bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Documents Required</h3>
                <ul className="space-y-3 mb-8">
                  {[
                    'PAN Card',
                    'Aadhaar Card',
                    'Form 16 (from employer)',
                    'Bank Statements',
                    'Investment Proofs (80C, 80D, etc.)',
                    'Property documents (if applicable)',
                    'Capital gains statements',
                    'Previous year ITR (if any)',
                  ].map((doc, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-blue-100">{doc}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register">
                  <Button className="w-full bg-white text-[#1E3A8A] hover:bg-gray-100">
                    Start Filing Now
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#10B981] to-[#059669]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to File Your Income Tax Return?
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Join 10,000+ taxpayers who trust eTaxMentor. Get started today 
            and file before the deadline!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-white text-[#10B981] hover:bg-gray-100">
                File ITR @ ₹499
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#10B981]">
                View All Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
