'use client'

import Link from 'next/link'
import { 
  Receipt, FileText, Calculator, Building2, CheckCircle, ArrowRight,
  Clock, Shield, Users, HelpCircle, AlertCircle, Calendar,
  TrendingUp, FileCheck, Truck, BarChart3
} from 'lucide-react'
import { Button, Card, CardContent, Badge } from '@/components/ui'

const gstServices = [
  {
    id: 'registration',
    icon: Building2,
    title: 'GST Registration',
    description: 'Get your business registered under GST quickly and hassle-free',
    features: [
      'New GST Registration',
      'Amendment/Modification',
      'Cancellation of GST',
      'Revocation of Cancellation',
    ],
    price: 'Starting at ₹999',
    color: 'bg-blue-500',
  },
  {
    id: 'returns',
    icon: FileText,
    title: 'GST Return Filing',
    description: 'Timely and accurate GST return filing by experts',
    features: [
      'GSTR-1 (Outward Supplies)',
      'GSTR-3B (Summary Return)',
      'GSTR-4 (Composition)',
      'GSTR-9 (Annual Return)',
    ],
    price: 'Starting at ₹499/return',
    color: 'bg-green-500',
  },
  {
    id: 'reconciliation',
    icon: Calculator,
    title: 'GST Reconciliation',
    description: 'Match your books with GST returns and portal data',
    features: [
      'GSTR-2A/2B Matching',
      'ITC Reconciliation',
      'E-Invoice Reconciliation',
      'Vendor Follow-ups',
    ],
    price: 'Starting at ₹2,999/month',
    color: 'bg-purple-500',
  },
  {
    id: 'eway-bill',
    icon: Truck,
    title: 'E-Way Bill Management',
    description: 'Complete E-way bill generation and management',
    features: [
      'E-Way Bill Generation',
      'Bulk E-Way Bills',
      'Extension & Cancellation',
      'Consolidated E-Way Bills',
    ],
    price: 'Starting at ₹1,999/month',
    color: 'bg-orange-500',
  },
  {
    id: 'audit',
    icon: FileCheck,
    title: 'GST Audit',
    description: 'Comprehensive GST audit and compliance review',
    features: [
      'GSTR-9C Certification',
      'ITC Audit',
      'Compliance Review',
      'Gap Analysis',
    ],
    price: 'Custom Quote',
    color: 'bg-red-500',
  },
  {
    id: 'advisory',
    icon: HelpCircle,
    title: 'GST Advisory',
    description: 'Expert consultation on complex GST matters',
    features: [
      'GST Planning',
      'Classification Queries',
      'Anti-Profiteering',
      'Refund Assistance',
    ],
    price: 'Starting at ₹5,000/consultation',
    color: 'bg-cyan-500',
  },
]

const deadlines = [
  { return: 'GSTR-1 (Monthly)', deadline: '11th of next month' },
  { return: 'GSTR-3B (Monthly)', deadline: '20th of next month' },
  { return: 'GSTR-1 (Quarterly)', deadline: '13th of month after quarter' },
  { return: 'GSTR-4 (Composition)', deadline: '30th April (Annually)' },
  { return: 'GSTR-9 (Annual)', deadline: '31st December' },
  { return: 'GSTR-9C (Audit)', deadline: '31st December' },
]

const packages = [
  {
    name: 'Starter',
    description: 'For small businesses',
    price: 999,
    period: '/month',
    features: [
      'GST Registration',
      'GSTR-1 & GSTR-3B Filing',
      'Up to 50 invoices/month',
      'Email Support',
      'Basic Reconciliation',
    ],
    notIncluded: ['Annual Return', 'GST Audit', 'Advisory'],
  },
  {
    name: 'Growth',
    description: 'For growing businesses',
    price: 2499,
    period: '/month',
    popular: true,
    features: [
      'Everything in Starter',
      'Up to 200 invoices/month',
      'E-Way Bill Management',
      'Full Reconciliation',
      'Chat + Email Support',
      'Annual Return Filing',
    ],
    notIncluded: ['GST Audit'],
  },
  {
    name: 'Enterprise',
    description: 'For large businesses',
    price: 4999,
    period: '/month',
    features: [
      'Everything in Growth',
      'Unlimited invoices',
      'Dedicated Account Manager',
      'GST Audit Support',
      'Phone + Priority Support',
      'Advisory (2 hrs/month)',
      'Compliance Dashboard',
    ],
    notIncluded: [],
  },
]

export default function GSTServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[linear-gradient(to_bottom_right,#10B981,#059669)] py-20 md:py-32 overflow-hidden min-h-[450px] flex flex-col items-center justify-center text-center">
        <div className="w-full max-w-4xl px-4 relative z-10 flex flex-col items-center justify-center">
          <br/>
          <Badge className="bg-white/20 text-white mb-8 py-2 px-4 flex items-center gap-2 rounded-full backdrop-blur-sm">
            <Receipt className="w-5 h-5" />
            <span className="font-medium tracking-wide">Complete GST Solutions</span>
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-white tracking-tight">
            GST Services
          </h1>
          <br/>
          <p className="text-xl md:text-2xl text-green-50 mb-12 max-w-2xl mx-auto leading-relaxed">
            End-to-end GST compliance solutions for businesses of all sizes. 
            From registration to annual returns, we handle it all.
          </p>
          <br/>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-y-6 gap-x-6 w-full mt-20">
  <Link href="/register" className="w-full sm:w-auto">
    <Button
      size="xl"
      className="bg-white text-[#10B981] hover:bg-gray-50 min-w-[220px] shadow-xl group font-bold rounded-full"
    >
      Get Started
      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
    </Button>
  </Link>

  <Link href="/contact" className="w-full sm:w-auto">
    <Button
      size="xl"
      variant="outline"
      className="border-2 border-white text-white hover:bg-white hover:text-[#10B981] min-w-[220px] group font-bold rounded-full"
    >
      <HelpCircle className="w-5 h-5 mr-2" />
      Talk to Expert
    </Button>
  </Link>
</div>

        </div>
      </section>
      <br/>

      {/* Quick Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-[#10B981]">5,000+</div>
              <div className="text-gray-600">GST Registrations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1E3A8A]">50,000+</div>
              <div className="text-gray-600">Returns Filed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#F59E0B]">99.8%</div>
              <div className="text-gray-600">On-time Filing</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#EF4444]">₹50Cr+</div>
              <div className="text-gray-600">ITC Recovered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <div style={{ height: '1cm' }}></div>
      <section className="py-20 mb-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our GST Services
            </h2>
            <br />
            <p className="text-lg text-gray-600">
              Comprehensive GST solutions to keep your business compliant
            </p>
          </div>

          <div style={{ height: '1cm' }}></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {gstServices.map((service) => {
              const Icon = service.icon
              return (
                <Card key={service.id} className="flex flex-col h-full hover:shadow-xl transition-all">
                  <CardContent className="p-10 flex flex-col h-full">
                    <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-4 flex-1">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-gray-100 mt-auto">
                      <p className="text-[#10B981] font-semibold">{service.price}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      <div style={{ height: '1.5cm' }}></div>
      <section className="py-20 bg-gray-50 my-32">
        <div className="container mx-auto px-4 items-center">
          <div className="flex flex-col items-center justify-center text-center mb-16">
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              GST Compliance Packages
            </h2>
            <br/>
            <p className="text-lg text-gray-600">
              Choose a plan that fits your business needs
            </p>
            <br/>
          </div>

          <div className="flex justify-center">
            <div className="grid md:grid-cols-3 gap-12 max-w-6xl items-stretch">
            {packages.map((pkg) => (
              <Card 
                key={pkg.name} 
                className={`relative overflow-hidden flex flex-col h-full ${pkg.popular ? 'ring-2 ring-[#10B981] shadow-xl' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-[#10B981] text-white text-xs font-bold px-4 py-1 rounded-bl-lg z-10">
                    RECOMMENDED
                  </div>
                )}
                <CardContent className="p-10 flex flex-col flex-1">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                    <p className="text-sm text-gray-500">{pkg.description}</p>
                  </div>
                  
                  <div className="text-center mb-6">
                    <div className="flex items-end justify-center">
                      <span className="text-4xl font-bold text-[#10B981]">₹{pkg.price}</span>
                      <span className="text-gray-500">{pkg.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-[#10B981] shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                    {pkg.notIncluded.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-gray-300 shrink-0" />
                        <span className="text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Link href="/contact">
                      <Button 
                        className="w-full" 
                        variant={pkg.popular ? 'secondary' : 'outline'}
                        size="lg"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* Deadlines */}
      <div style={{ height: '1.5cm' }}></div>
      <section className="py-20 my-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              <Calendar className="inline w-8 h-8 mr-2 text-[#10B981]" />
              GST Return Deadlines
            </h2>
            <br/>
            <p className="text-gray-600">Don&apos;t miss these important due dates</p>
          </div>
          <br/>

          <div className="flex justify-center">
            <div className="max-w-3xl w-full">
              <Card className="overflow-hidden">
                <div className="overflow-x-auto bg-pink-50 border rounded-2xl">
                  <table className="w-full border border-gray-500 border-collapse">
                    <thead className='border border-gray-500 px-10 py-2 font-bold text-center'>
                      <tr className="bg-[#10B981] text-white ">
                        <th className="text-left p-4">Return Type</th>
                        <th className="text-left p-4">Due Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deadlines.map((item, idx) => (
                        <tr key={idx} className="border-b last:border-0 hover:bg-gray-50">
                          <td className="p-4 font-medium text-gray-900">{item.return}</td>
                          <td className="p-4 text-gray-600">{item.deadline}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
              <br/>

              <p className="text-center text-sm text-gray-500 mt-4">
                * Late filing attracts interest @ 18% p.a. and late fee of ₹50/day (₹20 for NIL return)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <div  style={{height:'1.5cm'}}></div>
      <section className="py-20 bg-[linear-gradient(to_bottom_right,#10B981/5,#059669/5)] my-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose eTaxMentor for GST?
              </h2>
              <div className="space-y-4">
                {[
                  { icon: Shield, title: 'Expert Team', desc: 'Qualified GST practitioners with years of experience' },
                  { icon: Clock, title: 'On-time Filing', desc: '99.8% on-time filing rate - never miss a deadline' },
                  { icon: TrendingUp, title: 'ITC Optimization', desc: 'Maximize your Input Tax Credit with proper reconciliation' },
                  { icon: BarChart3, title: 'Compliance Dashboard', desc: 'Real-time visibility of your GST compliance status' },
                  { icon: Users, title: 'Dedicated Support', desc: 'Assigned account manager for all your queries' },
                  { icon: CheckCircle, title: 'Error-Free', desc: 'Multiple review layers ensure accurate returns' },
                ].map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#10B981]/10 rounded-lg flex items-center justify-center shrink-0">
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

            <Card className="bg-[linear-gradient(to_bottom_right,#10B981,#059669)] text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Need GST Registration?</h3>
                <p className="text-green-100 mb-6">
                  Get your business GST registered in just 3-5 working days. 
                  Our experts handle the entire process.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'PAN Card of Business/Owner',
                    'Aadhaar Card',
                    'Address Proof (Electricity Bill)',
                    'Bank Account Details',
                    'Photograph',
                    'Business Registration Document',
                  ].map((doc, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-300 shrink-0" />
                      <span className="text-green-50">{doc}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register">
                  <Button className="w-full bg-white text-[#10B981] hover:bg-gray-100">
                    Register Now @ ₹999
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div style={{height:'1.5cm'}}></div>
      <section className="py-20 bg-[linear-gradient(to_right,#1E3A8A,#3B82F6)]">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center">
          <br/>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Simplify Your GST Compliance?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Let our experts handle your GST while you focus on growing your business.
          </p>
          <br/>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-white text-[#1E3A8A] hover:bg-gray-100">
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#1E3A8A]">
                View All Plans
              </Button>
            </Link>
          </div>
          <br/>
        </div>
      </section>
    </div>
  )
}
