'use client'

import Link from 'next/link'
import { 
  FileText, Calculator, Building2, Shield, Clock, Users, 
  ArrowRight, CheckCircle, FileSearch, Receipt, BadgeCheck,
  TrendingUp, Briefcase, Scale
} from 'lucide-react'
import { Button, Card, CardContent } from '@/components/ui'

const services = [
  {
    id: 'itr-filing',
    icon: FileText,
    title: 'Income Tax Return Filing',
    shortDesc: 'Expert-assisted ITR filing for all types',
    description: 'Get your income tax returns filed accurately by our expert CAs. We handle all ITR types from salaried individuals to business owners.',
    features: [
      'All ITR types: ITR-1 to ITR-7',
      'Maximum deduction optimization',
      'Quick refund processing',
      'Expert CA verification',
      'Revised return filing',
      'Response to notices',
    ],
    pricing: 'Starting at ₹499',
    color: 'bg-blue-500',
    href: '/services/itr-filing',
  },
  {
    id: 'gst-services',
    icon: Receipt,
    title: 'GST Services',
    shortDesc: 'Complete GST compliance solutions',
    description: 'End-to-end GST services including registration, monthly/quarterly returns, annual returns, and compliance support.',
    features: [
      'GST Registration',
      'GSTR-1, GSTR-3B Filing',
      'GSTR-9 Annual Returns',
      'GST Reconciliation',
      'E-Way Bill Management',
      'GST Audit Support',
    ],
    pricing: 'Starting at ₹999/month',
    color: 'bg-green-500',
    href: '/services/gst',
  },
  {
    id: 'tds-services',
    icon: Calculator,
    title: 'TDS Services',
    shortDesc: 'TDS return filing & compliance',
    description: 'Comprehensive TDS services for businesses including quarterly returns, certificates, and compliance management.',
    features: [
      'TDS Return Filing (24Q, 26Q, 27Q)',
      'Form 16/16A Generation',
      'TDS Reconciliation',
      'Lower Deduction Certificates',
      'TDS Refund Claims',
      'Compliance Calendar',
    ],
    pricing: 'Starting at ₹1,499/quarter',
    color: 'bg-purple-500',
    href: '/services/tds',
  },
  {
    id: 'business-registration',
    icon: Building2,
    title: 'Business Registration',
    shortDesc: 'Start your business the right way',
    description: 'Register your business with proper legal structure. We help with company incorporation, LLP registration, and more.',
    features: [
      'Private Limited Company',
      'LLP Registration',
      'One Person Company',
      'Partnership Firm',
      'Proprietorship',
      'MSME Registration',
    ],
    pricing: 'Starting at ₹4,999',
    color: 'bg-orange-500',
    href: '/services/business-registration',
  },
  {
    id: 'tax-planning',
    icon: TrendingUp,
    title: 'Tax Planning',
    shortDesc: 'Minimize taxes legally',
    description: 'Strategic tax planning to help you save more. Our experts analyze your finances and recommend optimal tax-saving strategies.',
    features: [
      'Personal Tax Planning',
      'Business Tax Optimization',
      'Investment Advisory',
      'Section 80 Deductions',
      'Capital Gains Planning',
      'HUF Tax Benefits',
    ],
    pricing: 'Starting at ₹2,999',
    color: 'bg-cyan-500',
    href: '/services/tax-planning',
  },
  {
    id: 'audit-assurance',
    icon: FileSearch,
    title: 'Audit & Assurance',
    shortDesc: 'Statutory & Tax Audits',
    description: 'Comprehensive audit services to ensure compliance and transparency in your financial reporting.',
    features: [
      'Statutory Audit',
      'Tax Audit (44AB)',
      'Internal Audit',
      'GST Audit',
      'Stock Audit',
      'Certification Services',
    ],
    pricing: 'Custom Quote',
    color: 'bg-red-500',
    href: '/services/audit',
  },
  {
    id: 'compliance',
    icon: BadgeCheck,
    title: 'Compliance Services',
    shortDesc: 'Stay compliant year-round',
    description: 'Annual compliance services for companies including ROC filings, annual returns, and board meeting support.',
    features: [
      'ROC Annual Filing',
      'Directors KYC',
      'Board Meeting Minutes',
      'Statutory Registers',
      'Compliance Calendar',
      'Change Management',
    ],
    pricing: 'Starting at ₹5,999/year',
    color: 'bg-indigo-500',
    href: '/services/compliance',
  },
  {
    id: 'legal-services',
    icon: Scale,
    title: 'Legal Services',
    shortDesc: 'Business legal support',
    description: 'Legal documentation and advisory services for businesses including agreements, contracts, and legal compliance.',
    features: [
      'Contract Drafting',
      'Legal Agreements',
      'Trademark Registration',
      'Legal Consultation',
      'Notice Handling',
      'Dispute Resolution',
    ],
    pricing: 'Custom Quote',
    color: 'bg-pink-500',
    href: '/services/legal',
  },
]

const whyChoose = [
  {
    icon: Shield,
    title: 'Expert CA Team',
    description: 'Qualified CAs with 10+ years of experience handle your filings',
  },
  {
    icon: Clock,
    title: 'Quick Turnaround',
    description: 'Most filings completed within 24-48 hours',
  },
  {
    icon: Users,
    title: '10,000+ Happy Clients',
    description: 'Trusted by individuals and businesses across India',
  },
  {
    icon: Briefcase,
    title: 'Comprehensive Solutions',
    description: 'One-stop shop for all your tax and compliance needs',
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-[#1E3A8A] via-[#1E40AF] to-[#3B82F6] py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Comprehensive tax and compliance solutions for individuals and businesses. 
              Expert assistance at every step of your financial journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#1E3A8A]">
                Explore Services
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button size="lg" variant="secondary">
                Get Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#10B981] font-semibold text-sm uppercase tracking-wider">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Complete Tax & Business Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From individual tax filing to complex business compliance, we&apos;ve got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {service.shortDesc}
                    </p>
                    <ul className="space-y-2 mb-4">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-[#1E3A8A] font-semibold mb-3">{service.pricing}</p>
                      <Link href={service.href}>
                        <Button variant="outline" className="w-full">
                          Learn More
                          <ArrowRight className="w-4 h-4" />
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

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose eTaxMentor?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChoose.map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 bg-[#1E3A8A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-[#1E3A8A]" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-[#10B981] to-[#059669]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation. Our experts will guide you 
            through the best solutions for your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#10B981]">
                Contact Us
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" className="bg-white text-[#10B981] hover:bg-gray-100">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
