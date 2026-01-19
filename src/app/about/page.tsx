'use client'

// import Image from 'next/image'
import Link from 'next/link'
import { 
  Target, Eye, Award, Users, CheckCircle, ArrowRight,
  Shield, Clock, ThumbsUp, Headphones, TrendingUp, Heart
} from 'lucide-react'
import { Button, Card, CardContent } from '@/components/ui'

const stats = [
  { number: '10,000+', label: 'Happy Clients' },
  { number: '15+', label: 'Years Experience' },
  { number: '50,000+', label: 'Returns Filed' },
  { number: '99.9%', label: 'Accuracy Rate' },
]

const values = [
  {
    icon: Shield,
    title: 'Trust & Integrity',
    description: 'We maintain the highest ethical standards in all our dealings.',
  },
  {
    icon: Clock,
    title: 'Timeliness',
    description: 'Meeting deadlines is our promise to every client.',
  },
  {
    icon: ThumbsUp,
    title: 'Excellence',
    description: 'We strive for perfection in every service we deliver.',
  },
  {
    icon: Headphones,
    title: 'Client First',
    description: 'Your success and satisfaction are our top priorities.',
  },
]

const team = [
  {
    name: 'CA Rajesh Kumar',
    role: 'Founder & Managing Partner',
    experience: '20+ years',
    expertise: 'Direct Taxation, Corporate Law',
    image: '/team/rajesh.jpg',
  },
  {
    name: 'CA Priya Sharma',
    role: 'Partner - GST Practice',
    experience: '15+ years',
    expertise: 'Indirect Taxation, GST',
    image: '/team/priya.jpg',
  },
  {
    name: 'CA Amit Verma',
    role: 'Partner - Audit',
    experience: '12+ years',
    expertise: 'Statutory Audit, Internal Audit',
    image: '/team/amit.jpg',
  },
  {
    name: 'CA Sneha Patel',
    role: 'Senior Manager',
    experience: '10+ years',
    expertise: 'Tax Planning, NRI Taxation',
    image: '/team/sneha.jpg',
  },
]

const milestones = [
  { year: '2008', event: 'eTaxMentor founded with a vision to simplify tax compliance' },
  { year: '2012', event: 'Expanded to serve businesses across India' },
  { year: '2015', event: 'Launched online tax filing platform' },
  { year: '2018', event: 'Crossed 5,000+ satisfied clients milestone' },
  { year: '2020', event: 'Introduced comprehensive GST services' },
  { year: '2023', event: 'Serving 10,000+ clients with 50+ team members' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-[#1E3A8A] via-[#1E40AF] to-[#3B82F6] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About eTaxMentor
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Your trusted partner in tax compliance and financial success. 
              Since 2008, we&apos;ve been helping individuals and businesses 
              navigate the complex world of taxation with expertise and care.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-l-4 border-[#1E3A8A]">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[#1E3A8A]/10 rounded-full flex items-center justify-center">
                    <Target className="w-7 h-7 text-[#1E3A8A]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To democratize access to quality tax and financial services by combining 
                  technology with expert guidance. We aim to make tax compliance simple, 
                  accurate, and stress-free for every Indian taxpayer - from individuals 
                  filing their first return to large businesses managing complex compliance.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-[#10B981]">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[#10B981]/10 rounded-full flex items-center justify-center">
                    <Eye className="w-7 h-7 text-[#10B981]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To be India&apos;s most trusted and accessible tax services provider. 
                  We envision a future where every taxpayer has access to expert financial 
                  guidance, and where compliance is no longer a burden but a seamless 
                  part of financial growth.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at eTaxMentor
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon
              return (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 bg-linear-to-br from-[#1E3A8A] to-[#3B82F6] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600">A timeline of growth and excellence</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#1E3A8A]/20" />
              
              {milestones.map((milestone, idx) => (
                <div key={idx} className={`relative flex items-center mb-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[#1E3A8A] rounded-full -translate-x-1/2" />
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pl-8' : 'md:pr-8 md:text-right'}`}>
                    <Card className="inline-block">
                      <CardContent className="p-4">
                        <div className="text-[#1E3A8A] font-bold text-lg">{milestone.year}</div>
                        <p className="text-gray-600 text-sm">{milestone.event}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to your financial success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <Card key={idx} className="text-center overflow-hidden group">
                <CardContent className="p-6">
                  {/* Avatar placeholder */}
                  <div className="w-24 h-24 bg-linear-to-br from-[#1E3A8A] to-[#3B82F6] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                  <p className="text-[#1E3A8A] text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-gray-500 text-sm mb-1">{member.experience} experience</p>
                  <p className="text-gray-500 text-xs">{member.expertise}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why 10,000+ Clients Trust Us
              </h2>
              <div className="space-y-4">
                {[
                  'Experienced team of CAs and tax experts',
                  'Technology-driven efficient processes',
                  'Transparent pricing with no hidden charges',
                  'End-to-end support from filing to refund',
                  'Personalized attention to every case',
                  'Quick turnaround times',
                  'Post-filing support for notices',
                  'Secure and confidential handling',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#10B981] shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-linear-to-br from-[#1E3A8A]/5 to-[#3B82F6]/5 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <Award className="w-10 h-10 text-[#1E3A8A] mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">15+</div>
                  <div className="text-sm text-gray-600">Years of Excellence</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <Users className="w-10 h-10 text-[#10B981] mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">50+</div>
                  <div className="text-sm text-gray-600">Expert Team</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <TrendingUp className="w-10 h-10 text-[#F59E0B] mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">₹100Cr+</div>
                  <div className="text-sm text-gray-600">Refunds Processed</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <Heart className="w-10 h-10 text-[#EF4444] mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                  <div className="text-sm text-gray-600">Client Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-linear-to-r from-[#1E3A8A] to-[#3B82F6]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Experience the eTaxMentor Difference?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients who trust us with their tax needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#1E3A8A]">
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" className="bg-white text-[#1E3A8A] hover:bg-gray-100">
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
