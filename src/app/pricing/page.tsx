'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, X, HelpCircle, ArrowRight, Sparkles, Shield, Users } from 'lucide-react'
import { Button, Card, CardContent, Badge } from '@/components/ui'

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    tagline: 'For salaried individuals',
    price: 499,
    originalPrice: 999,
    period: '/filing',
    description: 'Perfect for individuals with salary income only',
    features: [
      { name: 'ITR-1 Filing', included: true },
      { name: 'Single Form-16', included: true },
      { name: 'Basic Tax Optimization', included: true },
      { name: 'Email Support', included: true },
      { name: 'Filing Acknowledgment', included: true },
      { name: 'Multiple Form-16s', included: false },
      { name: 'Capital Gains', included: false },
      { name: 'CA Consultation', included: false },
      { name: 'Priority Support', included: false },
      { name: 'Notice Handling', included: false },
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    id: 'standard',
    name: 'Standard',
    tagline: 'Most Popular Choice',
    price: 999,
    originalPrice: 1999,
    period: '/filing',
    description: 'For salaried with multiple incomes',
    features: [
      { name: 'ITR-1, ITR-2 Filing', included: true },
      { name: 'Multiple Form-16s', included: true },
      { name: 'House Property Income', included: true },
      { name: 'Capital Gains (Stocks)', included: true },
      { name: 'Tax Optimization', included: true },
      { name: 'Email + Chat Support', included: true },
      { name: 'CA Review', included: true },
      { name: 'Business Income', included: false },
      { name: 'GST Filing', included: false },
      { name: 'Audit Support', included: false },
    ],
    cta: 'Choose Standard',
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'For professionals & freelancers',
    price: 2499,
    originalPrice: 4999,
    period: '/filing',
    description: 'Complete solution for complex returns',
    features: [
      { name: 'All ITR Types', included: true },
      { name: 'Business/Freelance Income', included: true },
      { name: 'Foreign Income', included: true },
      { name: 'All Capital Gains', included: true },
      { name: 'Expert Tax Planning', included: true },
      { name: 'Dedicated CA', included: true },
      { name: 'Priority Phone Support', included: true },
      { name: 'Notice Handling (1 year)', included: true },
      { name: 'Revised Return', included: true },
      { name: 'Video Consultation', included: true },
    ],
    cta: 'Go Premium',
    popular: false,
  },
  {
    id: 'business',
    name: 'Business',
    tagline: 'For businesses & companies',
    price: 4999,
    originalPrice: 9999,
    period: '/year',
    description: 'Comprehensive business compliance',
    features: [
      { name: 'Business ITR Filing', included: true },
      { name: 'GST Returns (Monthly)', included: true },
      { name: 'TDS Returns', included: true },
      { name: 'Bookkeeping Support', included: true },
      { name: 'Compliance Calendar', included: true },
      { name: 'Dedicated Account Manager', included: true },
      { name: '24/7 Priority Support', included: true },
      { name: 'Audit Support', included: true },
      { name: 'Notice Handling', included: true },
      { name: 'Financial Advisory', included: true },
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

const faqs = [
  {
    question: 'Can I upgrade my plan later?',
    answer: 'Yes, you can upgrade your plan at any time. The price difference will be adjusted accordingly.',
  },
  {
    question: 'What if my return gets rejected?',
    answer: 'We offer free re-filing for any rejections caused by our errors. Our experts will work with you to resolve any issues.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a full refund if we are unable to file your return successfully, provided all required documents were submitted.',
  },
  {
    question: 'What is notice handling?',
    answer: 'If you receive any income tax notice related to a return we filed, our CA team will help you respond and resolve it at no extra cost (within the coverage period).',
  },
  {
    question: 'Can I file for previous years?',
    answer: 'Yes, we can help you file returns for previous years (belated/revised returns) at the same pricing, subject to applicable late fees by the IT department.',
  },
]

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'individual' | 'business'>('individual')

  const displayedPlans = billingPeriod === 'individual' 
    ? plans.filter(p => p.id !== 'business')
    : plans.filter(p => p.id === 'business')

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1E3A8A] via-[#1E40AF] to-[#3B82F6] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Badge className="bg-white/20 text-white mb-6">
              <Sparkles className="w-4 h-4 mr-1" />
              Limited Time Offer: 50% OFF
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Choose the plan that fits your needs. No hidden charges, 
              no surprises. Just expert tax filing at affordable prices.
            </p>
            
            {/* Toggle */}
            <div className="inline-flex items-center bg-white/10 rounded-full p-1">
              <button
                onClick={() => setBillingPeriod('individual')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingPeriod === 'individual'
                    ? 'bg-white text-[#1E3A8A]'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Individual
              </button>
              <button
                onClick={() => setBillingPeriod('business')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  billingPeriod === 'business'
                    ? 'bg-white text-[#1E3A8A]'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Business
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-gray-50 -mt-8">
        <div className="container mx-auto px-4">
          <div className={`grid gap-8 ${
            billingPeriod === 'individual' 
              ? 'md:grid-cols-2 lg:grid-cols-3' 
              : 'max-w-lg mx-auto'
          }`}>
            {displayedPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative overflow-hidden ${
                  plan.popular 
                    ? 'ring-2 ring-[#1E3A8A] shadow-xl scale-105' 
                    : 'hover:shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-[#1E3A8A] text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-sm text-gray-500">{plan.tagline}</p>
                  </div>

                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-bold text-[#1E3A8A]">₹{plan.price}</span>
                      <span className="text-gray-500">{plan.period}</span>
                    </div>
                    <div className="text-sm text-gray-400 line-through">₹{plan.originalPrice}</div>
                    <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 flex-shrink-0" />
                        )}
                        <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link href={plan.id === 'business' ? '/contact' : '/register'}>
                    <Button 
                      className="w-full" 
                      variant={plan.popular ? 'primary' : 'outline'}
                      size="lg"
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-[#10B981]" />
              <div>
                <div className="font-semibold text-gray-900">100% Secure</div>
                <div className="text-sm text-gray-500">Bank-grade encryption</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-[#1E3A8A]" />
              <div>
                <div className="font-semibold text-gray-900">10,000+ Clients</div>
                <div className="text-sm text-gray-500">Trust our services</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-[#F59E0B]" />
              <div>
                <div className="font-semibold text-gray-900">Expert Support</div>
                <div className="text-sm text-gray-500">CA assistance included</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Compare Plans</h2>
            <p className="text-gray-600">Find the right plan for your needs</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold text-gray-900">Features</th>
                  <th className="p-4 font-semibold text-gray-900">Basic</th>
                  <th className="p-4 font-semibold text-[#1E3A8A]">Standard</th>
                  <th className="p-4 font-semibold text-gray-900">Premium</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'ITR Types', basic: 'ITR-1', standard: 'ITR-1, 2', premium: 'All' },
                  { feature: 'Capital Gains', basic: false, standard: 'Stocks', premium: 'All' },
                  { feature: 'Business Income', basic: false, standard: false, premium: true },
                  { feature: 'CA Review', basic: false, standard: true, premium: 'Dedicated' },
                  { feature: 'Support Level', basic: 'Email', standard: 'Email + Chat', premium: 'Phone + Video' },
                  { feature: 'Notice Handling', basic: false, standard: false, premium: '1 Year' },
                  { feature: 'Tax Planning', basic: 'Basic', standard: true, premium: 'Expert' },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b last:border-0">
                    <td className="p-4 font-medium text-gray-700">{row.feature}</td>
                    <td className="p-4 text-center">
                      {typeof row.basic === 'boolean' ? (
                        row.basic ? <Check className="w-5 h-5 text-[#10B981] mx-auto" /> : <X className="w-5 h-5 text-gray-300 mx-auto" />
                      ) : (
                        <span className="text-gray-600">{row.basic}</span>
                      )}
                    </td>
                    <td className="p-4 text-center bg-blue-50/50">
                      {typeof row.standard === 'boolean' ? (
                        row.standard ? <Check className="w-5 h-5 text-[#10B981] mx-auto" /> : <X className="w-5 h-5 text-gray-300 mx-auto" />
                      ) : (
                        <span className="text-gray-600">{row.standard}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof row.premium === 'boolean' ? (
                        row.premium ? <Check className="w-5 h-5 text-[#10B981] mx-auto" /> : <X className="w-5 h-5 text-gray-300 mx-auto" />
                      ) : (
                        <span className="text-gray-600">{row.premium}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">Got questions? We&apos;ve got answers.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#10B981] to-[#059669]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to File Your Taxes?
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            Get started with our expert-assisted tax filing today. 
            50% off for a limited time!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-white text-[#10B981] hover:bg-gray-100">
                Start Filing Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#10B981]">
                Talk to Expert
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
