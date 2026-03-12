import Link from 'next/link'
import { Home, Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-sidebar text-sidebar-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
                <Home className="h-6 w-6 text-sidebar-primary-foreground" />
              </div>
              <div>
                <p className="font-bold">IHDA Housing Locator</p>
                <p className="text-xs text-sidebar-foreground/70">Illinois Housing Development Authority</p>
              </div>
            </div>
            <p className="text-sm text-sidebar-foreground/80">
              Connecting Illinois residents with affordable housing options across the state.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/search" className="text-sidebar-foreground/80 hover:text-sidebar-foreground transition-colors">
                  Search Housing
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-sidebar-foreground/80 hover:text-sidebar-foreground transition-colors">
                  Interactive Map
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-sidebar-foreground/80 hover:text-sidebar-foreground transition-colors">
                  Housing Resources
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sidebar-foreground/80 hover:text-sidebar-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* For Partners */}
          <div className="space-y-4">
            <h3 className="font-semibold">For Partners</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard/landlord" className="text-sidebar-foreground/80 hover:text-sidebar-foreground transition-colors">
                  Landlord Portal
                </Link>
              </li>
              <li>
                <Link href="/dashboard/case-manager" className="text-sidebar-foreground/80 hover:text-sidebar-foreground transition-colors">
                  Case Manager Portal
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-sidebar-foreground/80 hover:text-sidebar-foreground transition-colors">
                  Register Property
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sidebar-foreground/80 hover:text-sidebar-foreground transition-colors">
                  Partner With Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-sidebar-foreground/60" />
                <span className="text-sidebar-foreground/80">1-800-555-IHDA</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-sidebar-foreground/60" />
                <span className="text-sidebar-foreground/80">support@ihda.org</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-sidebar-foreground/60 mt-0.5" />
                <span className="text-sidebar-foreground/80">
                  111 E. Wacker Drive<br />
                  Suite 1000<br />
                  Chicago, IL 60601
                </span>
              </li>
            </ul>
            <p className="text-xs text-sidebar-foreground/60">
              Support Hours: 9:00 AM - 5:00 PM CST<br />
              7 days per week
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-sidebar-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-sidebar-foreground/60 md:flex-row">
            <p>&copy; 2026 Illinois Housing Development Authority. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-sidebar-foreground transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-sidebar-foreground transition-colors">Terms of Service</Link>
              <Link href="/accessibility" className="hover:text-sidebar-foreground transition-colors">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
