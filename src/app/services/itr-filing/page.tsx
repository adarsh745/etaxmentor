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
  {
    id: 'itr-7',
    name: 'ITR-7',
    description: 'For political claims',
    eligibility: [
      'Political party claiming exemption',
      'Trust/institution',
      'Assessee claiming exemption',
    ],
    notFor: [
      'Exemption is not applicable on income from business & professional',
      'Income from capital gains',
    ],
    price: 7999,
    popular: false,
    icon: Building2,
    color: 'bg-teal-500',
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
      {/* HERO */}
      <section className="flex items-center justify-center bg-gradient-to-br from-[#1E3A8A] via-[#1E40AF] to-[#3B82F6] py-20 text-center">
        <div className="max-w-4xl text-white">
          <Badge className="mb-6 bg-white/20">
            <Clock className="w-4 h-4 mr-1" />
            File Before July 31st
          </Badge>

          <h1 className="text-5xl font-bold mb-6">
            Income Tax Return Filing
          </h1>

          <p className="text-xl text-blue-100 mb-8">
            Expert CA-assisted ITR filing. Starting at just ₹499.
          </p>
            <div className="h-4"></div> {/* Added space */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-white text-[#1E3A8A]">
                File ITR Now <ArrowRight />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white">
                Talk to Expert
              </Button>
            </Link>
          </div>
        </div>
      </section>
       {/* Quick Stats */}
      <section className="py-16 bg-gray-50">
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
     <section className="py-24">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Choose Your ITR Type
      </h2>
      <p className="text-lg text-gray-600 text-center whitespace-nowrap mx-auto">
  Not sure which ITR form applies to you? Don&apos;t worry - our experts will help you choose the right form based on your income sources.
</p>
<div className="h-4"></div> {/* Added space */}
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {itrTypes.map((itr) => {
        const Icon = itr.icon
        return (
          <Card
            key={itr.id}
            className={`relative overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-[#1E3A8A]`}
          >
            {itr.popular && (
              <div className="absolute top-0 right-0 bg-[#1E3A8A] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                MOST COMMON
              </div>
            )}
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-12 h-12 ${itr.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                >
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
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
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
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-gray-400"
                    >
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
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-10 py-4 text-lg w-full sm:w-auto text-center" // increased width horizontally
                  >
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
      <section className="py-24 bg-gray-50">
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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-5xl">
              <div className="text-center mb-8">
                <div className="h-4"></div> {/* Added space */}
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                  <Calendar className="w-8 h-8 text-[#EF4444]" />
                  ITR Filing Deadlines
                </h2>
                <p className="text-gray-600">Don&apos;t miss these important dates</p>
              </div>

              <Card className="overflow-hidden shadow-lg border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#1E3A8A] text-white">
                        <th className="text-left p-4 pl-6">Category</th>
                        <th className="text-left p-4">Deadline</th>
                        <th className="text-center p-4 pr-6">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deadlines.map((item, idx) => (
                        <tr
                          key={idx}
                          className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                        >
                          <td className="p-4 pl-6 font-medium text-gray-900">
                            {item.type}
                          </td>
                          <td className="p-4 text-gray-600">
                            {item.deadline}
                          </td>
                          <td className="p-4 pr-6 text-center">
                            <Badge
                              className={
                                item.extended
                                  ? "bg-green-100 text-green-800 border border-green-200 hover:bg-green-100"
                                  : "bg-yellow-100 text-yellow-800 border border-yellow-200 hover:bg-yellow-100"
                              }
                            >
                              {item.extended ? "Extended" : "Upcoming"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <p className="text-center text-sm text-gray-500 mt-6">
                * Late filing attracts penalty of ₹5,000 (₹1,000 if income &lt; ₹5 lakhs)
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Benefits Section */}
      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-[#1E3A8A]/5 to-[#3B82F6]/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-16">

            {/* Part 1: Why File with eTaxMentor */}
            <div className="w-full">
              <div className="h-4"></div> {/* Added space */}
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Why File with eTaxMentor?
              </h2>
              <div className="h-4"></div> {/* Added space */}

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {[
                  { icon: Shield, title: 'Expert CA Team', desc: 'Qualified professionals ensure accurate filing' },
                  { icon: TrendingUp, title: 'Maximum Refund', desc: 'We identify all deductions available' },
                  { icon: Clock, title: 'Quick Processing', desc: 'Most returns filed within 24-48 hours' },
                  { icon: Home, title: 'Convenience', desc: 'File from home - no office visits needed' },
                  { icon: CheckCircle, title: 'Error-Free', desc: '99.9% accuracy rate with review layers' },
                  { icon: Users, title: 'Post-Filing Support', desc: 'Help with notices and queries after filing' },
                ].map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-center text-center gap-3 p-4 rounded-xl bg-white/50 hover:bg-white transition-colors"
                    >
                      <div className="w-12 h-12 bg-[#10B981]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-[#10B981]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Part 2: Documents Required */}
            <div className="flex justify-center w-full">
              <div className="w-full max-w-5xl">
                <Card className="bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] text-white shadow-xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-8 text-center">
                      Documents Required
                    </h3>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 mb-8 px-4 md:px-12">
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
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-blue-100 text-lg">{doc}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-center pt-4">
                      <Link href="/register">
                        <Button className="bg-white text-[#1E3A8A] hover:bg-gray-100 font-semibold text-lg px-8 py-6 h-auto rounded-full">
                          Start Filing Now
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-[#10B981] to-[#059669]">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to File Your Income Tax Return?
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-3xl mx-auto text-center">
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
