'use client'

import { useState } from 'react'
import { 
  MapPin, Phone, Mail, Clock, Send, MessageCircle, 
  Building2, ArrowRight, CheckCircle 
} from 'lucide-react'
import { Button, Input, Card, CardContent } from '@/components/ui'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['123 Tax Plaza, Financial District', 'Bangalore, Karnataka 560001', 'India'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+91 80-1234-5678', '+91 98765-43210', 'Toll Free: 1800-123-4567'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['info@etaxmentor.com', 'support@etaxmentor.com', 'sales@etaxmentor.com'],
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: ['Monday - Friday: 9AM - 7PM', 'Saturday: 10AM - 4PM', 'Sunday: Closed'],
  },
]

const faqs = [
  {
    question: 'How long does it take to file ITR?',
    answer: 'For simple returns (ITR-1), we can complete filing within 24 hours. Complex returns may take 2-3 business days.',
  },
  {
    question: 'What documents do I need for ITR filing?',
    answer: 'You need PAN card, Aadhaar, Form 16 (for salaried), bank statements, investment proofs, and any other income documents.',
  },
  {
    question: 'Do you provide assistance for tax notices?',
    answer: 'Yes, we provide complete support for all types of income tax notices including scrutiny, defective returns, and demand notices.',
  },
  {
    question: 'What are your payment options?',
    answer: 'We accept UPI, credit/debit cards, net banking, and EMI options for larger amounts. Payment is due after service completion.',
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: '', email: '', phone: '', service: '', message: '' })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-[#1E3A8A] via-[#1E40AF] to-[#3B82F6] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-blue-100">
              Have questions? We&apos;re here to help. Reach out to us through any 
              of the channels below or fill out the form.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, idx) => {
              const Icon = info.icon
              return (
                <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-[#1E3A8A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-[#1E3A8A]" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-600 text-sm">{detail}</p>
                    ))}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Send us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>

              {submitted ? (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-green-700 mb-4">
                      Thank you for contacting us. Our team will reach out to you shortly.
                    </p>
                    <Button onClick={() => setSubmitted(false)} variant="secondary">
                      Send Another Message
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <Input
                      label="Full Name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="+91 98765-43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Service Required
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent transition-all"
                        required
                      >
                        <option value="">Select a service</option>
                        <option value="itr-filing">ITR Filing</option>
                        <option value="gst">GST Services</option>
                        <option value="tds">TDS Services</option>
                        <option value="business-registration">Business Registration</option>
                        <option value="tax-planning">Tax Planning</option>
                        <option value="audit">Audit & Assurance</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your requirements..."
                      rows={5}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent transition-all resize-none"
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
                    <Send className="w-5 h-5" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Map & Quick Actions */}
            <div className="space-y-6">
              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-xl h-75 flex items-center justify-center">
                <div className="text-center">
                  <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Interactive Map</p>
                  <p className="text-sm text-gray-400">Google Maps integration coming soon</p>
                </div>
              </div>

              {/* Quick Actions */}
              <Card className="bg-linear-to-br from-[#1E3A8A] to-[#3B82F6] text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Need Immediate Help?</h3>
                  <p className="text-blue-100 mb-6">
                    Our support team is available during business hours for instant assistance.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="tel:+918012345678"
                      className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      <span>Call: +91 80-1234-5678</span>
                    </a>
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>WhatsApp Support</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">Quick answers to common queries</p>
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

          <div className="text-center mt-8">
            <a href="/faq" className="inline-flex items-center gap-2 text-[#1E3A8A] font-semibold hover:underline">
              View All FAQs
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
