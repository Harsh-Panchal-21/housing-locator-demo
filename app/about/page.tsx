'use client'

import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Building2,
  Users,
  Target,
  Heart,
  Award,
  MapPin,
  ArrowRight,
  CheckCircle,
  Globe,
  Shield,
  Handshake,
} from 'lucide-react'

const teamMembers = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Executive Director',
    description: 'Leading IHDA housing initiatives for over 15 years',
  },
  {
    name: 'Michael Chen',
    role: 'Director of Technology',
    description: 'Building innovative housing solutions',
  },
  {
    name: 'Lisa Rodriguez',
    role: 'Community Relations Manager',
    description: 'Connecting families with housing resources',
  },
  {
    name: 'James Thompson',
    role: 'Policy & Compliance Director',
    description: 'Ensuring fair housing practices statewide',
  },
]

const milestones = [
  { year: '2010', event: 'IHDA Housing Locator Program Launched' },
  { year: '2015', event: 'Expanded to all 102 Illinois counties' },
  { year: '2018', event: 'Online portal and waitlist system introduced' },
  { year: '2020', event: 'Emergency housing response during COVID-19' },
  { year: '2023', event: 'Case manager portal launched' },
  { year: '2026', event: 'New interactive map and mobile features' },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary py-16 lg:py-24">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl text-balance">
                About IHDA Housing Locator
              </h1>
              <p className="text-lg text-primary-foreground/90 text-pretty">
                Connecting Illinois residents with safe, affordable housing since 2010. 
                We believe everyone deserves a place to call home.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="mb-6 text-3xl font-bold text-foreground">Our Mission</h2>
                <p className="mb-6 text-lg text-muted-foreground">
                  The Illinois Housing Development Authority (IHDA) Housing Locator is dedicated 
                  to increasing access to affordable housing across Illinois. We provide a 
                  comprehensive platform that connects families, individuals, and vulnerable 
                  populations with housing opportunities that meet their needs and budget.
                </p>
                <p className="mb-8 text-muted-foreground">
                  Through partnerships with landlords, property managers, case managers, and 
                  community organizations, we streamline the housing search process and help 
                  reduce barriers to stable housing.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link href="/search">
                      Search Housing
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/resources">
                      View Resources
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <Target className="mx-auto mb-4 h-10 w-10 text-primary" />
                    <h3 className="mb-2 font-semibold text-foreground">Accessibility</h3>
                    <p className="text-sm text-muted-foreground">
                      Making housing information available to everyone, regardless of circumstance
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <Heart className="mx-auto mb-4 h-10 w-10 text-primary" />
                    <h3 className="mb-2 font-semibold text-foreground">Compassion</h3>
                    <p className="text-sm text-muted-foreground">
                      Treating every housing seeker with dignity and respect
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <Shield className="mx-auto mb-4 h-10 w-10 text-primary" />
                    <h3 className="mb-2 font-semibold text-foreground">Integrity</h3>
                    <p className="text-sm text-muted-foreground">
                      Maintaining accurate, up-to-date housing information
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <Handshake className="mx-auto mb-4 h-10 w-10 text-primary" />
                    <h3 className="mb-2 font-semibold text-foreground">Partnership</h3>
                    <p className="text-sm text-muted-foreground">
                      Working together with communities to solve housing challenges
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="border-y border-border bg-secondary/30 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground">Our Impact</h2>
              <p className="text-muted-foreground">
                Since 2010, we have helped thousands of Illinois families find stable housing
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="mb-2 text-5xl font-bold text-primary">50,000+</div>
                <div className="text-muted-foreground">Families Housed</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-5xl font-bold text-primary">5,000+</div>
                <div className="text-muted-foreground">Active Listings</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-5xl font-bold text-primary">500+</div>
                <div className="text-muted-foreground">Partner Landlords</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-5xl font-bold text-primary">102</div>
                <div className="text-muted-foreground">Counties Served</div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground">What We Do</h2>
              <p className="text-muted-foreground">
                Comprehensive housing services for Illinois residents
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <Building2 className="mb-4 h-10 w-10 text-primary" />
                  <h3 className="mb-2 text-lg font-semibold text-foreground">Housing Search</h3>
                  <p className="text-muted-foreground">
                    Search thousands of affordable housing units across Illinois with detailed 
                    filters for bedrooms, price, accessibility, and subsidy programs.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <MapPin className="mb-4 h-10 w-10 text-primary" />
                  <h3 className="mb-2 text-lg font-semibold text-foreground">Interactive Map</h3>
                  <p className="text-muted-foreground">
                    Explore housing options visually on our interactive map. Find properties 
                    near schools, jobs, healthcare, and public transportation.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <Users className="mb-4 h-10 w-10 text-primary" />
                  <h3 className="mb-2 text-lg font-semibold text-foreground">Waitlist Management</h3>
                  <p className="text-muted-foreground">
                    Join waitlists for properties and track your position. Receive notifications 
                    when units become available or when your turn arrives.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <Award className="mb-4 h-10 w-10 text-primary" />
                  <h3 className="mb-2 text-lg font-semibold text-foreground">Case Manager Portal</h3>
                  <p className="text-muted-foreground">
                    Social workers and case managers can submit referrals for clients, 
                    track applications, and coordinate housing placements.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <Globe className="mb-4 h-10 w-10 text-primary" />
                  <h3 className="mb-2 text-lg font-semibold text-foreground">Landlord Services</h3>
                  <p className="text-muted-foreground">
                    Property owners can list units, manage inquiries, screen applicants, 
                    and connect with qualified tenants and voucher programs.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <CheckCircle className="mb-4 h-10 w-10 text-primary" />
                  <h3 className="mb-2 text-lg font-semibold text-foreground">Resources & Support</h3>
                  <p className="text-muted-foreground">
                    Access guides, FAQs, and support for navigating the housing process. 
                    Learn about subsidy programs, tenant rights, and more.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="border-t border-border bg-card py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground">Our Journey</h2>
              <p className="text-muted-foreground">
                Key milestones in our mission to expand affordable housing access
              </p>
            </div>
            <div className="mx-auto max-w-3xl">
              <div className="relative border-l-2 border-primary/30 pl-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative mb-8 last:mb-0">
                    <div className="absolute -left-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {index + 1}
                    </div>
                    <div className="rounded-lg border border-border bg-card p-4">
                      <span className="mb-1 inline-block rounded bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                        {milestone.year}
                      </span>
                      <p className="mt-2 font-medium text-foreground">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground">Leadership Team</h2>
              <p className="text-muted-foreground">
                Dedicated professionals committed to housing accessibility
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">{member.name}</h3>
                    <p className="mb-2 text-sm text-primary">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold text-primary-foreground">
              Ready to Find Your Home?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/90">
              Start your housing search today or contact us for personalized assistance.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/search">
                  Search Housing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
