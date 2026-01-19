import Link from 'next/link'
import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, MapPin } from 'lucide-react'
import { NAV_LINKS, APP_CONFIG } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-[#1E3A8A] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-[#1E3A8A] font-bold text-lg">eT</span>
              </div>
              <span className="text-2xl font-bold">eTaxMentor</span>
            </Link>
            <p className="text-blue-200 text-sm leading-relaxed mb-6">
              Our mission is to empower businesses and individuals with seamless, technology-driven 
              financial solutions that simplify compliance, optimize tax strategies, and drive growth.
            </p>
            <div className="flex gap-3">
              <a 
                href={APP_CONFIG.social.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a 
                href={APP_CONFIG.social.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a 
                href={APP_CONFIG.social.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a 
                href={APP_CONFIG.social.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Information</h3>
            <ul className="space-y-3">
              {NAV_LINKS.footer.information.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-blue-200 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-3">
              {NAV_LINKS.footer.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-blue-200 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href={`tel:${APP_CONFIG.phone}`}
                  className="flex items-start gap-3 text-blue-200 hover:text-white transition-colors text-sm"
                >
                  <Phone size={18} className="mt-0.5 shrink-0" />
                  <span>{APP_CONFIG.phone}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${APP_CONFIG.email}`}
                  className="flex items-start gap-3 text-blue-200 hover:text-white transition-colors text-sm"
                >
                  <Mail size={18} className="mt-0.5 shrink-0" />
                  <span>{APP_CONFIG.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-blue-200 text-sm">
                <MapPin size={18} className="mt-0.5 shrink-0" />
                <span>{APP_CONFIG.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-200 text-sm">
              Copyright © {new Date().getFullYear()} eTaxMentor. All Rights Reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {NAV_LINKS.footer.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-blue-200 hover:text-white text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
