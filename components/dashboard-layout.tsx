'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Home,
  Menu,
  X,
  LogOut,
  User,
  Settings,
  Building2,
  ClipboardList,
  Users,
  FileText,
  BarChart3,
  Bell,
  Plus,
  Search,
} from 'lucide-react'

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: 'case_manager' | 'landlord' | 'admin'
  userName: string
}

const navItems: Record<string, NavItem[]> = {
  case_manager: [
    { title: 'Dashboard', href: '/dashboard/case-manager', icon: Home },
    { title: 'My Referrals', href: '/dashboard/case-manager/referrals', icon: ClipboardList },
    { title: 'Submit Referral', href: '/dashboard/case-manager/submit', icon: Plus },
    { title: 'Search Housing', href: '/search', icon: Search },
    { title: 'Resources', href: '/resources', icon: FileText },
  ],
  landlord: [
    { title: 'Dashboard', href: '/dashboard/landlord', icon: Home },
    { title: 'My Properties', href: '/dashboard/landlord/properties', icon: Building2 },
    { title: 'Add Property', href: '/dashboard/landlord/add-property', icon: Plus },
    { title: 'Waitlist', href: '/dashboard/landlord/waitlist', icon: Users },
    { title: 'Applications', href: '/dashboard/landlord/applications', icon: ClipboardList },
  ],
  admin: [
    { title: 'Dashboard', href: '/dashboard/admin', icon: Home },
    { title: 'Properties', href: '/dashboard/admin/properties', icon: Building2 },
    { title: 'Waitlists', href: '/dashboard/admin/waitlists', icon: Users },
    { title: 'Users', href: '/dashboard/admin/users', icon: User },
    { title: 'Reports', href: '/dashboard/admin/reports', icon: BarChart3 },
  ],
}

const roleLabels = {
  case_manager: 'Case Manager',
  landlord: 'Landlord',
  admin: 'Administrator',
}

export function DashboardLayout({ children, userRole, userName }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const items = navItems[userRole]

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
              <Home className="h-4 w-4 text-sidebar-primary-foreground" />
            </div>
            <span className="font-semibold">IHDA Housing</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-sidebar-foreground"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* User Info */}
        <div className="border-b border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-accent">
              <User className="h-5 w-5 text-sidebar-accent-foreground" />
            </div>
            <div>
              <p className="font-medium text-sidebar-foreground">{userName}</p>
              <p className="text-xs text-sidebar-foreground/70">{roleLabels[userRole]}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {items.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-sidebar-border p-4">
          <ul className="space-y-1">
            <li>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-4 shadow-sm">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold text-foreground">
              {roleLabels[userRole]} Portal
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
