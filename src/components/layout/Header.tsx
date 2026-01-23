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
<<<<<<< HEAD
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
          {/* <div className="flex items-center gap-4">
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
          </div> */}
        </div>
      </div>
=======
      {/* Top Bar - Hidden */}
      {/* <div className="bg-[#1E3A8A] text-white py-2 hidden md:block">
        ... 
      </div> */}
>>>>>>> upstream/main

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-2 md:py-3">
        <div className="flex items-center justify-between h-16 md:h-20 px-4 md:px-6 -mx-4 md:-mx-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-12 h-12 bg-linear-to-br from-[#1E3A8A] to-[#3B82F6] rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">eT</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg md:text-2xl font-bold text-[#1E3A8A]">eTaxMentor</span>
              <span className="text-xs md:text-[11px] text-gray-500 -mt-0.5 hidden sm:block font-medium">Expert Tax Solutions</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 ml-16">
            {NAV_LINKS.main.map((link) => (
              link.name === 'Services' ? (
                <div 
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <button className="flex items-center gap-1.5 px-5 py-2.5 text-gray-700 hover:text-[#1E3A8A] font-bold text-base transition-colors rounded-lg hover:bg-gray-50">
                    {link.name}
                    <ChevronDown size={18} className={`transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown */}
                  {isServicesOpen && (
                    <div className="absolute top-full ml-10/12  w-90 bg-white rounded-xl shadow-xl border border-gray-100  animate-fadeIn">
                      {NAV_LINKS.services.map((service) => (
                        <Link
                          key={service.name}
                          href={service.href}
                          className="block px-6 py-3 hover:bg-gray-50 transition-all group"
                        >
                          <div className=" font-medium text-gray-800  text-[15px]  decoration-gray-400 underline-offset-4 group-hover:decoration-[#1E3A8A] group-hover:text-[#1E3A8A] transition-all">
                            {service.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-5 py-2.5 text-gray-700 hover:text-[#1E3A8A] font-bold text-base transition-colors rounded-lg hover:bg-gray-50"
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4 ml-auto">
            {!isLoading && (
              isAuthenticated && user ? (
                <div 
                  className="relative"
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <button className="flex items-center gap-2.5 px-5 py-2.5 text-gray-700 hover:text-[#1E3A8A] font-semibold transition-colors rounded-lg hover:bg-gray-50">
                    <div className="w-9 h-9 bg-linear-to-br from-[#1E3A8A] to-[#3B82F6] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span>{user.name.split(' ')[0]}</span>
                    <ChevronDown size={18} className={`transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
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
  className="
    ml-4
    inline-flex items-center justify-center
    min-w-[160px]
    h-10
    px-6
    text-[#1E3A8A] font-bold text-base
    leading-none
    border-2 border-[#1E3A8A]
    rounded-full
    hover:bg-blue-50
    transition-colors
    whitespace-nowrap
  "
>
  Login / Register
</Link>


                 <Link
  href="/services/itr-filing"
  className="
    inline-flex items-center justify-center
    min-w-[180px]
    h-11
    px-7
    bg-linear-to-r from-[#10B981] to-[#059669]
    text-white font-bold text-base
    leading-none
    border-2 border-transparent
    rounded-full
    whitespace-nowrap
    transition-all
    hover:shadow-lg hover:-translate-y-0.5
  "
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
