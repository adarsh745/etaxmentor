import Link from 'next/link'
import { 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Award, 
  Cpu, 
  HeartHandshake,
  Briefcase,
  Laptop,
  GraduationCap,
  Rocket,
  Building,
  Building2,
  Heart,
  FileText,
  Calculator,
  ShieldCheck,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui'
import { APP_CONFIG, PRICING_PLANS, TESTIMONIALS, TARGET_AUDIENCE } from '@/lib/constants'

// Icon mapping for target audience
const iconMap: Record<string, React.ElementType> = {
  Briefcase,
  Laptop,
  GraduationCap,
  Rocket,
  Building,
  Building2,
  Heart,
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-[#1E3A8A] via-[#1E40AF] to-[#3B82F6] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm">Trusted by 10,000+ Happy Clients</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Empower Your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-300">
                Financial Future
              </span>
              <br className="hidden md:block" />
              with Expert Tax Solutions
            </h1>
            
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Seamless tax compliance powered by AI and expertise. All-in-one platform for 
              ITR filing, GST, TDS, CFO, and business structuring services.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Link href="/services/itr-filing">
                <Button size="xl" variant="secondary" className="w-full sm:w-auto min-w-55">
                  Explore Services
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="xl" variant="outline" className="w-full sm:w-auto min-w-55">
                  Talk to Expert
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* File ITR Options */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Start Your <span className="text-[#1E3A8A]">Tax Filing</span> Journey
            </h2>
            <p className="text-lg text-gray-600">Choose your preferred filing method</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Option 1 */}
            <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-10 border border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
              <div className="w-16 h-16 bg-[#1E3A8A] rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">File ITR with eTaxMentor</h3>
              <p className="text-gray-600 mb-8 grow">
                Get your ITR filed by expert CAs with secure, accurate, and personalized support for maximum savings.
              </p>
              <Link href="/services/itr-filing" className="mt-auto">
                <Button size="lg" variant="primary" className="w-full">
                  File with an Expert
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
            
            {/* Option 2 */}
            <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-8 md:p-10 border border-green-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
              <div className="w-16 h-16 bg-[#10B981] rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">File ITR Yourself</h3>
              <p className="text-gray-600 mb-8 grow">
                Quick and simple ITR filing with step-by-step guidance and complete compliance support — all done online.
              </p>
              <Link href="/dashboard/itr-filing/new" className="mt-auto">
                <Button size="lg" variant="secondary" className="w-full">
                  File Your ITR Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-[#1E3A8A]">eTaxMentor</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience Excellence in Tax Services with over 24 years of expertise
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#1E3A8A]" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-1">{APP_CONFIG.stats.clients}</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[#10B981]" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-[#10B981] mb-1">{APP_CONFIG.stats.yearsExperience}</div>
              <div className="text-gray-600">Years of Expertise</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Cpu className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-1">AI</div>
              <div className="text-gray-600">Powered Solutions</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <HeartHandshake className="w-8 h-8 text-orange-500" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-1">End-to-End</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/about">
              <Button size="lg" variant="outline">
                Discover the eTaxMentor Advantage
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Who We <span className="text-[#1E3A8A]">Serve</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From salaried individuals and gig workers to fast-growing startups, NGOs, and large enterprises
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {TARGET_AUDIENCE.map((item) => {
              const Icon = iconMap[item.icon] || Briefcase
              return (
                <div 
                  key={item.title}
                  className="flex items-center gap-3 px-6 py-4 bg-gray-50 hover:bg-blue-50 rounded-full border border-gray-200 hover:border-blue-200 transition-all cursor-pointer group"
                >
                  <Icon className="w-5 h-5 text-gray-500 group-hover:text-[#1E3A8A] transition-colors" />
                  <span className="font-medium text-gray-700 group-hover:text-[#1E3A8A] transition-colors">{item.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-[#1E3A8A]">Services</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From Tax Filing to CFO Advisory — We&apos;ve Got You Covered
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Calculator, title: 'Taxation Services', desc: 'ITR, GST & tax advisory by experts', color: 'blue', href: '/itr-filing' },
              { icon: FileText, title: 'GST Filing', desc: 'GST registration and compliance', color: 'green', href: '/gst-filing' },
              { icon: ShieldCheck, title: 'Advisory Services', desc: 'Compliance, strategy & growth guidance', color: 'purple', href: '/services' },
              { icon: Briefcase, title: 'CFO Services', desc: 'On-demand CFOs for finance & payroll', color: 'orange', href: '/services' },
              { icon: Building2, title: 'Structuring Services', desc: 'Company setup & business restructuring', color: 'indigo', href: '/services' },
              { icon: Award, title: 'Funding Services', desc: 'Fundraising & investor-readiness support', color: 'pink', href: '/services' },
            ].map((service) => (
              <Link 
                key={service.title}
                href={service.href}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group block"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-[#1E3A8A]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/services">
              <Button size="lg" variant="primary">
                Explore All Services
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transparent <span className="text-[#1E3A8A]">Pricing</span> Plans
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {PRICING_PLANS.map((plan) => (
              <div 
                key={plan.name}
                className={`relative bg-white rounded-2xl p-6 border-2 ${
                  plan.popular ? 'border-[#1E3A8A] shadow-xl' : 'border-gray-100'
                } hover:shadow-xl transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1E3A8A] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                
                <div className="mb-4">
                  {plan.price ? (
                    <>
                      {plan.originalPrice && (
                        <span className="text-gray-400 line-through text-sm">₹{plan.originalPrice}</span>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-[#1E3A8A]">₹{plan.price}</span>
                      </div>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-[#1E3A8A]">Custom</span>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.slice(0, 5).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link href="/pricing">
                  <Button 
                    variant={plan.popular ? 'primary' : 'outline'} 
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/pricing" className="text-[#1E3A8A] font-medium hover:underline">
              See Detailed Pricing Plans →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hear From Our <span className="text-[#1E3A8A]">Clients</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {TESTIMONIALS.slice(0, 6).map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">&quot;{testimonial.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1E3A8A] rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{testimonial.name}</div>
                    <div className="text-xs text-gray-500">{testimonial.source}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="https://www.google.com/search?q=etaxmentor" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline">
                Read All Reviews
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-linear-to-br from-[#1E3A8A] to-[#3B82F6] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Need Help with Your Income Tax Filing?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Avoid Penalties. Maximize Deductions. File Your ITR Accurately with eTaxMentor&apos;s Trusted CAs. 
              100% Compliant and Stress-Free.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Link href="/contact">
                <Button size="xl" variant="secondary" className="min-w-55">
                  Contact Us Today
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </Link>
              <Link href="/services/itr-filing">
                <Button size="xl" variant="outline" className="min-w-55 border-white text-white hover:bg-white hover:text-[#1E3A8A]">
                  Start Filing Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Stay Updated with eTaxMentor
            </h2>
            <p className="text-gray-600 mb-8">
              Subscribe for the latest tax news, tips, and compliance alerts directly in your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-5 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] text-base"
              />
              <Button type="submit" size="lg" variant="primary" className="sm:min-w-45">
                Subscribe Now
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
