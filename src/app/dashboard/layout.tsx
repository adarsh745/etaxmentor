'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home, User, FileText, Receipt, Upload,
  CreditCard, Bell, MessageSquare,
  Settings, LogOut, Calculator
} from 'lucide-react'
import { useAuth } from '@/contexts'
import styles from './layout.module.css'

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

  // Map paths to proper titles
  const getPageTitle = () => {
    const pathMap: Record<string, string> = {
      '/dashboard': 'Dashboard',
      '/dashboard/profile': 'My Profile',
      '/dashboard/itr': 'ITR Filing',
      '/dashboard/itr/new': 'New ITR Filing',
      '/dashboard/gst': 'GST Services',
      '/dashboard/documents': 'Documents',
      '/dashboard/notifications': 'Notifications',
      '/dashboard/tickets': 'Support Tickets',
      '/dashboard/calculator': 'Tax Calculator',
      '/dashboard/settings': 'Settings',
    }
    
    return pathMap[pathname] || 'Dashboard'
  }

  return (
    <div className={styles.container}>

      {/* ───────────── SIDEBAR (ALWAYS OPEN) ───────────── */}
      <aside className={styles.sidebar}>

        {/* Logo */}
        <div className={styles.sidebarLogo}>
          <div className={styles.logoIcon}>
            eT
          </div>
          <span className={styles.logoText}>
            eTaxMentor
          </span>
        </div>

        {/* Menu */}
        <nav className={styles.sidebarNav}>
          {sidebarItems.map(item => {
            const Icon = item.icon
            const active = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.sidebarItem} ${active ? styles.sidebarItemActive : ''}`}
              >
                <span className={styles.sidebarIcon}>
                  <Icon size={20} />
                </span>
                <span className={styles.sidebarLabel}>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className={styles.logoutButtonContainer}>
          <button
            onClick={logout}
            className={styles.logoutButton}
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* ───────────── RIGHT SECTION ───────────── */}
      <div className={styles.mainContent}>

        {/* TOP NAVBAR 1 */}
        <header className="h-16 bg-blue-900 text-white flex items-center px-6">
           <h1 className="font-semibold text-lg text-white" style={{ paddingLeft: '2rem' }}>Global Header</h1>
         </header>
 
         {/* TOP NAVBAR 2 */}
         <header className={styles.topNavbar}>
           <span className={styles.pageTitle}>
             {getPageTitle()}
           </span>

          <div className={styles.navbarActions}>
            <Link href="/dashboard/notifications" className={styles.notificationLink}>
              <Bell size={18} className="text-gray-500" />
            </Link>
            <Link href="/dashboard/profile" className={styles.userProfileLink}>
               <span className={styles.userName}>{user?.name || 'User'}</span>
               <div className={styles.userAvatar}>
                 {user?.name?.charAt(0) || 'U'}
               </div>
             </Link>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className={styles.pageContent}>
          {children}
        </main>
      </div>
    </div>
  )
}
