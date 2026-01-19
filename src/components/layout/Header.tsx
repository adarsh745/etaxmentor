'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronDown, Phone, Mail, User, LogOut, LayoutDashboard } from 'lucide-react'
import { NAV_LINKS, APP_CONFIG } from '@/lib/constants'
import { useAuth } from '@/contexts'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, isAuthenticated, logout, isLoading } = useAuth()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      {/* Top Bar */}
      <div className="bg-[#1E3A8A] text-white py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href={`tel:${APP_CONFIG.phone}`} className="flex items-center gap-2 hover:text-blue-200 transition-colors">
              <Phone size={14} />
              <span>{APP_CONFIG.phone}</span>
            </a>
            <a href={`mailto:${APP_CONFIG.email}`} className="flex items-center gap-2 hover:text-blue-200 transition-colors">
              <Mail size={14} />
              <span>{APP_CONFIG.email}</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            {!isLoading && (
              isAuthenticated && user ? (
                <div className="flex items-center gap-3">
                  <span className="text-blue-100">Welcome, {user.name.split(' ')[0]}</span>
                  <Link href="/dashboard" className="hover:text-blue-200 transition-colors">
                    Dashboard
                  </Link>
                </div>
              ) : (
                <>
                  <Link href="/login" className="hover:text-blue-200 transition-colors">
                    Login
                  </Link>
                  <span className="text-blue-300">|</span>
                  <Link href="/register" className="hover:text-blue-200 transition-colors">
                    Register
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-linear-to-br from-[#1E3A8A] to-[#3B82F6] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">eT</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#1E3A8A]">eTaxMentor</span>
              <span className="text-[10px] text-gray-500 -mt-1 hidden sm:block">Expert Tax Solutions</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.main.map((link) => (
              link.name === 'Services' ? (
                <div 
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <button className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-[#1E3A8A] font-medium transition-colors">
                    {link.name}
                    <ChevronDown size={16} className={`transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown */}
                  {isServicesOpen && (
                    <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fadeIn">
                      {NAV_LINKS.services.map((service) => (
                        <Link
                          key={service.name}
                          href={service.href}
                          className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <div className="font-medium text-gray-800">{service.name}</div>
                          <div className="text-sm text-gray-500">{service.description}</div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-gray-700 hover:text-[#1E3A8A] font-medium transition-colors"
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {!isLoading && (
              isAuthenticated && user ? (
                <div 
                  className="relative"
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-[#1E3A8A] font-medium transition-colors">
                    <div className="w-8 h-8 bg-linear-to-br from-[#1E3A8A] to-[#3B82F6] rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span>{user.name.split(' ')[0]}</span>
                    <ChevronDown size={16} className={`transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute top-full right-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fadeIn">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700"
                      >
                        <LayoutDashboard size={18} />
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/profile"
                        className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700"
                      >
                        <User size={18} />
                        Profile
                      </Link>
                      <hr className="my-1" />
                      <button
                        onClick={logout}
                        className="flex items-center gap-2 px-4 py-3 hover:bg-red-50 transition-colors text-red-600 w-full"
                      >
                        <LogOut size={18} />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 text-[#1E3A8A] font-semibold hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/services/itr-filing"
                    className="px-5 py-2.5 bg-linear-to-r from-[#10B981] to-[#059669] text-white font-semibold rounded-lg hover:shadow-lg transition-all hover:-translate-y-0.5"
                  >
                    File ITR Now
                  </Link>
                </>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 animate-fadeIn">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.main.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#1E3A8A] font-medium rounded-lg transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="my-2" />
              {!isLoading && (
                isAuthenticated && user ? (
                  <>
                    <div className="px-4 py-2 text-sm text-gray-500">
                      Signed in as <span className="font-medium text-gray-900">{user.name}</span>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-3 text-[#1E3A8A] font-semibold hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        logout()
                      }}
                      className="px-4 py-3 text-red-600 font-semibold hover:bg-red-50 rounded-lg transition-colors text-left"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-3 text-[#1E3A8A] font-semibold hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/services/itr-filing"
                      onClick={() => setIsMenuOpen(false)}
                      className="mx-4 py-3 bg-linear-to-r from-[#10B981] to-[#059669] text-white font-semibold rounded-lg text-center hover:shadow-lg transition-all"
                    >
                      File ITR Now
                    </Link>
                  </>
                )
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
