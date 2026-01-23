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
          <br/>
          <div className="w-full flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center w-full">
              About eTaxMentor
            </h1>
            <br/>
            <p className="text-xl text-blue-100 mb-8 text-center max-w-4xl mx-auto">
              Your trusted partner in tax compliance and financial success. 
              Since 2008, we&apos;ve been helping individuals and businesses 
              navigate the complex world of taxation with expertise and care.
            </p>
            <br/>
          </div>
        </div>
      </section>
            <div style={{height:'1cm'}}></div>


      {/* Stats Section */}
      <section className="py-12 -mt-8 relative z-10 ">
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
            <div style={{height:'1cm'}}></div>


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
                <p className="text-gray-600 leading-relaxed ">
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
      <div style={{height:'1cm'}}></div>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 w-full">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 text-center w-full">
              These principles guide everything we do at eTaxMentor
            </p>
          </div>
          <br></br>

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
      <div style={{height:'1cm'}}></div>


      {/* Our Journey */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600">A timeline of growth and excellence</p>
          </div>

          <div className="max-w-3xl mx-auto flex justify-center items-center">
            <div className="relative py-8 w-full" style={{ minHeight: '650px' }}>
              {/* SVG Snake Curved Path */}
              <svg 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
                viewBox="0 0 800 650"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.5" />
                    <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                {/* Snake Curved Path - zigzag left to right */}
                <path
                  d="M 400 40 
                     C 250 70, 200 90, 150 130
                     S 200 180, 300 220
                     S 500 260, 650 300
                     S 600 370, 500 410
                     S 300 450, 200 490
                     S 250 560, 400 600"
                  fill="none"
                  stroke="url(#timelineGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Timeline Items */}
              {milestones.map((milestone, idx) => {
                // Snake positions - alternating left and right
                const positions = [
                  { top: '8%', left: '50%' },     // 2008 - center top
                  { top: '20%', left: '19%' },    // 2012 - left
                  { top: '34%', left: '37%' },    // 2015 - center-left
                  { top: '46%', left: '81%' },    // 2018 - right
                  { top: '63%', left: '62%' },    // 2020 - center-right
                  { top: '76%', left: '25%' },    // 2023 - left
                ];
                
                const isLeft = idx % 2 === 1;
                
                return (
                  <div 
                    key={idx} 
                    className="absolute transition-all duration-500 hover:scale-105"
                    style={{ 
                      top: positions[idx].top,
                      left: positions[idx].left,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {/* Timeline Dot with Glow */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="relative">
                        <div className="w-5 h-5 bg-[#1E3A8A] rounded-full border-4 border-white shadow-lg relative z-10 hover:scale-125 transition-transform duration-300">
                          <div className="absolute inset-0 bg-[#3B82F6] rounded-full animate-ping opacity-20"></div>
                        </div>
                        <div className="absolute inset-0 w-5 h-5 bg-[#3B82F6]/30 rounded-full blur-md"></div>
                      </div>
                    </div>

                    {/* Card */}
                    <div 
                      className="absolute"
                      style={{
                        width: '280px',
                        left: '50%',
                        top: '50%',
                        marginLeft: '-140px',
                        marginTop: isLeft ? '45px' : '-210px',
                        opacity: 1,
                        animation: `fadeInUp 0.6s ease-out ${idx * 0.15}s both`
                      }}
                    >
                      <Card className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group">
                        <CardContent className="p-5">
                          <div className="flex items-start gap-4">
                            <div className="flex-1">
                              <div className="text-xl font-bold text-[#1E3A8A] mb-2 group-hover:text-[#3B82F6] transition-colors">
                                {milestone.year}
                              </div>
                              <p className="text-gray-600 text-sm leading-relaxed">
                                {milestone.event}
                              </p>
                            </div>
                          </div>
                          {/* Decorative gradient bar */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1E3A8A] via-[#3B82F6] to-[#10B981] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Keyframe Animation */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
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
