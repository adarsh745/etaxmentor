'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home, User, FileText, Receipt, Upload,
  CreditCard, Bell, MessageSquare,
  Settings, LogOut, Calculator
} from 'lucide-react'
import { useAuth } from '@/contexts'

const sidebarItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: User, label: 'My Profile', href: '/dashboard/profile' },
  { icon: FileText, label: 'ITR Filing', href: '/dashboard/itr' },
  { icon: Receipt, label: 'GST Services', href: '/dashboard/gst' },
  { icon: Upload, label: 'Documents', href: '/dashboard/documents' },
  { icon: CreditCard, label: 'Payments', href: '/dashboard/payments' },
  { icon: Bell, label: 'Notifications', href: '/dashboard/notifications' },
  { icon: MessageSquare, label: 'Support Tickets', href: '/dashboard/tickets' },
  { icon: Calculator, label: 'Tax Calculator', href: '/dashboard/calculator' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* ───────────── SIDEBAR (ALWAYS OPEN) ───────────── */}
      <aside className="w-64 bg-white border-r flex flex-col">

        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-4 border-b bg-pink-50">
          <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold">
            eT
          </div>
          <span className="font-bold text-blue-900 text-lg">
            eTaxMentor
          </span>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {sidebarItems.map(item => {
            const Icon = item.icon
            const active = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                ${active
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center justify-center w-6 h-6 flex-shrink-0">
                  <Icon size={20} />
                </span>
                <span className="truncate">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="border-t p-3">
          <button
            onClick={logout}
            className="flex items-center gap-3 text-red-600 w-full px-3 py-2.5 rounded-lg hover:bg-red-50"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* ───────────── RIGHT SECTION ───────────── */}
      <div className="flex flex-col flex-1">

        {/* TOP NAVBAR 1 */}
        <header className="h-16 bg-blue-900 text-white flex items-center px-6">
          <h1 className="font-semibold text-lg">Global Header</h1>
        </header>

        {/* TOP NAVBAR 2 */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          <span className="capitalize text-gray-600 font-medium">
            {pathname.replace('/dashboard', '') || 'Dashboard'}
          </span>

          <div className="flex items-center gap-4">
            <Bell size={18} className="text-gray-500" />
            <div className="flex items-center gap-2">
              <span className="text-sm">{user?.name || 'User'}</span>
              <div className="w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center">
                {user?.name?.charAt(0) || 'U'}
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
