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
<section className="relative bg-linear-to-br from-[#1E3A8A] via-[#1E40AF] to-[#3B82F6] text-white overflow-hidden flex justify-center">

  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
  </div>

  {/* True viewport-centered content */}
  <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
    <div className="relative left-1/2 -translate-x-1/2 w-full max-w-4xl text-center flex flex-col items-center gap-11">

      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        <span className="text-sm font-medium">
          Trusted by 10,000+ Happy Clients
        </span>
      </div>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
        Empower Your <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-300">
          Financial Future
        </span>
        <br className="hidden md:block" />
        with Expert Tax Solutions
      </h1>

      <p className="text-lg md:text-xl text-blue-100 max-w-2xl leading-relaxed -mt-4">
        Seamless tax compliance powered by AI and expertise. All-in-one platform for
        ITR filing, GST, TDS, CFO, and business structuring services.
      </p>

      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">

  {/* Explore Services – outline style */}
  <Link
  href="/services/itr-filing"
  className="
    inline-flex items-center justify-center gap-2
    min-w-[180px] h-11
    px-7
    bg-white text-[#1E3A8A] font-bold text-base
    leading-none
    border-2 border-[#1E3A8A]
    rounded-full
    hover:bg-blue-50
    transition-colors
    whitespace-nowrap
  "
>
  Explore Services
  <ArrowRight className="w-5 h-5 text-[#1E3A8A]" />
</Link>



  {/* Talk to Expert – green gradient primary */}
  <Link
    href="/contact"
    className="
      inline-flex items-center justify-center
      min-w-[180px] h-11
      px-7
      bg-linear-to-r from-[#10B981] to-[#059669]
      text-white font-bold text-base
      leading-none
      rounded-full
      whitespace-nowrap
      transition-all
      hover:shadow-lg hover:-translate-y-0.5
    "
  >
    Talk to Expert
  </Link>

</div>


    </div>
  </div>

  {/* Wave Divider */}
  <div className="absolute bottom-0 left-0 right-0">
    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
        fill="white"
      />
    </svg>
  </div>
</section>

      {/* File ITR Options */}
      <section className="py-20 md:py-28 bg-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
        Start Your <span className="text-[#1E3A8A]">Tax Filing</span> Journey
      </h2>
      <p className="text-lg text-gray-600 font-medium">Choose your preferred filing method</p>
    </div>

    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {/* Option 1 - ITR Expert */}
      <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-10 border border-blue-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col">
        <div className="w-16 h-16 bg-[#1E3A8A] rounded-xl flex items-center justify-center mb-6">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">File ITR with eTaxMentor</h3>
        <p className="text-gray-600 mb-8 grow leading-relaxed">
          Get your ITR filed by expert CAs with secure, accurate, and personalized support for maximum savings.
        </p>
        <Link href="/services/itr-filing" className="mt-auto">
          <Button size="lg" variant="primary" className="w-full font-semibold">
            File with an Expert
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      {/* Option 2 - ITR Yourself */}
      <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-8 md:p-10 border border-green-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col">
        <div className="w-16 h-16 bg-[#10B981] rounded-xl flex items-center justify-center mb-6">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">File ITR Yourself</h3>
        <p className="text-gray-600 mb-8 grow leading-relaxed">
          Quick and simple ITR filing with step-by-step guidance and complete compliance support — all done online.
        </p>
        <Link href="/dashboard/itr/new" className="mt-auto">
          <Button size="lg" variant="secondary" className="w-full font-semibold">
            File Your ITR Now
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      {/* Option 3 - GST */}
      <div className="bg-linear-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 md:p-10 border border-yellow-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col">
        <div className="w-16 h-16 bg-[#F59E0B] rounded-xl flex items-center justify-center mb-6">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">GST Filing</h3>
        <p className="text-gray-600 mb-8 grow leading-relaxed">
          Simplify your GST compliance with step-by-step guidance and accurate filing for your business.
        </p>
        <Link href="/services/gst-filing" className="mt-auto">
          <Button size="lg" variant="secondary" className="w-full font-semibold">
            File GST Now
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>

      {/* Option 4 - UAN-EPFO */}
      <div className="bg-linear-to-br from-purple-50 to-violet-50 rounded-2xl p-8 md:p-10 border border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col">
        <div className="w-16 h-16 bg-[#7C3AED] rounded-xl flex items-center justify-center mb-6">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">UAN / EPFO</h3>
        <p className="text-gray-600 mb-8 grow leading-relaxed">
          Manage your EPFO contributions and UAN services easily with our guided support and automation.
        </p>
        <Link href="/services/epfo-uan" className="mt-auto">
          <Button size="lg" variant="secondary" className="w-full font-semibold">
            Access UAN
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  </div>
</section>


      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-[#1E3A8A]">eTaxMentor</span>
            </h2>
            <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
              Experience Excellence in Tax Services with over 24 years of expertise
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto mb-12">
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Users className="w-8 h-8 text-[#1E3A8A]" />
              </div>
              <div className="text-4xl font-bold text-[#1E3A8A] mb-2">{APP_CONFIG.stats.clients}</div>
              <div className="text-gray-600 font-medium">Happy Clients</div>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Award className="w-8 h-8 text-[#10B981]" />
              </div>
              <div className="text-4xl font-bold text-[#10B981] mb-2">{APP_CONFIG.stats.yearsExperience}</div>
              <div className="text-gray-600 font-medium">Years of Expertise</div>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Cpu className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-4xl font-bold text-purple-600 mb-2">AI</div>
              <div className="text-gray-600 font-medium">Powered Solutions</div>
            </div>
            
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <HeartHandshake className="w-8 h-8 text-orange-500" />
              </div>
              <div className="text-4xl font-bold text-orange-500 mb-2">End-to-End</div>
              <div className="text-gray-600 font-medium">Support</div>
            </div>
          </div>
          
          <div className="text-center">
            <Link href="/about">
              <Button size="lg" variant="outline" className="font-semibold">
                Discover the eTaxMentor Advantage
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Who We <span className="text-[#1E3A8A]">Serve</span>
            </h2>
            <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
              From salaried individuals and gig workers to fast-growing startups, NGOs, and large enterprises
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {TARGET_AUDIENCE.map((item) => {
              const Icon = iconMap[item.icon] || Briefcase
              return (
                <div 
                  key={item.title}
                  className="flex items-center gap-3 px-6 py-4 bg-gray-50 hover:bg-blue-50 rounded-full border border-gray-200 hover:border-blue-200 transition-all cursor-pointer group font-medium"
                >
                  <Icon className="w-5 h-5 text-gray-500 group-hover:text-[#1E3A8A] transition-colors" />
                  <span className="text-gray-700 group-hover:text-[#1E3A8A] transition-colors">{item.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-[#1E3A8A]">Services</span>
            </h2>
            <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
              From Tax Filing to CFO Advisory — We&apos;ve Got You Covered
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {[
              { icon: Calculator, title: 'ITR Filing', desc: 'Income tax returns filed by expert CAs', color: 'blue', href: '/services/itr-filing' },
              { icon: FileText, title: 'GST Services', desc: 'GST registration, filing & compliance', color: 'green', href: '/services/gst' },
              { icon: ShieldCheck, title: 'Tax Advisory', desc: 'Expert tax planning and consultation', color: 'purple', href: '/services' },
              { icon: Briefcase, title: 'CFO Services', desc: 'On-demand CFOs for finance management', color: 'orange', href: '/services' },
              { icon: Building2, title: 'Business Setup', desc: 'Company incorporation & structuring', color: 'indigo', href: '/services' },
              { icon: Award, title: 'Compliance', desc: 'ROC filings & statutory compliance', color: 'pink', href: '/services' },
            ].map((service) => (
              <Link 
                key={service.title}
                href={service.href}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group block"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-[#1E3A8A]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              </Link>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/services">
              <Button size="lg" variant="primary" className="font-semibold">
                Explore All Services
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Transparent <span className="text-[#1E3A8A]">Pricing</span> Plans
            </h2>
            <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
              Choose the plan that fits your needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-10">
            {PRICING_PLANS.map((plan) => (
              <div 
                key={plan.name}
                className={`relative bg-white rounded-2xl p-7 border-2 ${
                  plan.popular ? 'border-[#1E3A8A] shadow-xl' : 'border-gray-100'
                } hover:shadow-lg transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#1E3A8A] text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-lg font-bold text-gray-900 mb-3">{plan.name}</h3>
                
                <div className="mb-5">
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
                
                <p className="text-sm text-gray-600 mb-5 line-clamp-2">{plan.description}</p>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.slice(0, 5).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href="/pricing" className="block">
                  <Button 
                    variant={plan.popular ? 'primary' : 'outline'} 
                    className="w-full font-semibold"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/pricing" className="text-[#1E3A8A] font-semibold hover:underline text-lg">
              See Detailed Pricing Plans →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Hear From Our <span className="text-[#1E3A8A]">Clients</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {TESTIMONIALS.slice(0, 6).map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-5 italic leading-relaxed">&quot;{testimonial.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-[#1E3A8A] rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-xs text-gray-500">{testimonial.source}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <a 
              href="https://www.google.com/search?q=etaxmentor" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="font-semibold">
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
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              Need Help with Your Income Tax Filing?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              Avoid Penalties. Maximize Deductions. File Your ITR Accurately with eTaxMentor&apos;s Trusted CAs. 
              100% Compliant and Stress-Free.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/contact">
                <Button size="xl" variant="secondary" className="min-w-56 font-semibold">
                  Contact Us Today
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </Link>
              <Link href="/services/itr-filing">
                <Button size="xl" variant="outline" className="min-w-56 border-white text-white hover:bg-white hover:text-[#1E3A8A] font-semibold">
                  Start Filing Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Stay Updated with eTaxMentor
            </h2>
            <p className="text-gray-600 mb-10 text-lg font-medium">
              Subscribe for the latest tax news, tips, and compliance alerts directly in your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 px-5 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] text-base"
              />
              <Button type="submit" size="lg" variant="primary" className="sm:min-w-48 font-semibold">
                Subscribe Now
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
