'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PropertyCard } from '@/components/property-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { mockProperties, illinoisCounties } from '@/lib/mock-data'
import {
  Search,
  MapPin,
  Building2,
  Users,
  ClipboardList,
  Shield,
  Phone,
  ArrowRight,
  Home,
  CheckCircle,
} from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCounty, setSelectedCounty] = useState('')
  const [bedrooms, setBedrooms] = useState('')

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    if (selectedCounty && selectedCounty !== 'all') params.set('county', selectedCounty)
    if (bedrooms && bedrooms !== 'any') params.set('beds', bedrooms)
    router.push(`/search?${params.toString()}`)
  }

  const featuredProperties = mockProperties.slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary py-20 lg:py-32">
          <div className="absolute inset-0">
            <img
              src="/images/hero-house.jpg"
              alt="Beautiful Illinois Home"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
          </div>
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl text-balance">
                Find Your Home in Illinois
              </h1>
              <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl text-pretty">
                Search thousands of affordable housing options across Illinois. 
                The IHDA Housing Locator connects you with available units, waitlists, and housing resources.
              </p>

              {/* Search Box */}
              <Card className="mx-auto max-w-4xl shadow-xl">
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-end">
                    <div className="flex-1">
                      <label className="mb-1 block text-left text-sm font-medium text-foreground">
                        Location
                      </label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="City, address, or zip code"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-9"
                          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-48">
                      <label className="mb-1 block text-left text-sm font-medium text-foreground">
                        County
                      </label>
                      <Select value={selectedCounty} onValueChange={setSelectedCounty}>
                        <SelectTrigger>
                          <SelectValue placeholder="All Counties" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Counties</SelectItem>
                          {illinoisCounties.map((county) => (
                            <SelectItem key={county} value={county}>
                              {county}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-full md:w-36">
                      <label className="mb-1 block text-left text-sm font-medium text-foreground">
                        Bedrooms
                      </label>
                      <Select value={bedrooms} onValueChange={setBedrooms}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any</SelectItem>
                          <SelectItem value="0">Studio</SelectItem>
                          <SelectItem value="1">1+</SelectItem>
                          <SelectItem value="2">2+</SelectItem>
                          <SelectItem value="3">3+</SelectItem>
                          <SelectItem value="4">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button size="lg" onClick={handleSearch} className="md:px-8">
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-primary-foreground/80">
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  Free to use
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  24/7 available
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  Statewide coverage
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="border-b border-border bg-card py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Link href="/search" className="group">
                <Card className="h-full transition-all hover:border-primary hover:shadow-lg">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Search className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Search Housing</h3>
                      <p className="text-sm text-muted-foreground">
                        Find available units with advanced filters
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/map" className="group">
                <Card className="h-full transition-all hover:border-primary hover:shadow-lg">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Interactive Map</h3>
                      <p className="text-sm text-muted-foreground">
                        Explore housing on a geographic map
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/dashboard/landlord" className="group">
                <Card className="h-full transition-all hover:border-primary hover:shadow-lg">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">List Your Property</h3>
                      <p className="text-sm text-muted-foreground">
                        Landlord portal for listings
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/dashboard/case-manager" className="group">
                <Card className="h-full transition-all hover:border-primary hover:shadow-lg">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <ClipboardList className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Case Manager</h3>
                      <p className="text-sm text-muted-foreground">
                        Submit client referrals
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Properties */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                  Featured Properties
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Recently listed affordable housing options
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/search">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="border-y border-border bg-secondary/30 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                How It Works
              </h2>
              <p className="mt-2 text-muted-foreground">
                Find your next home in three simple steps
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  1
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">Search</h3>
                <p className="text-muted-foreground">
                  Use our advanced search filters to find housing that meets your needs, 
                  budget, and accessibility requirements.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  2
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">Apply</h3>
                <p className="text-muted-foreground">
                  Join waitlists or contact landlords directly. Case managers can submit 
                  referrals on behalf of clients.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  3
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">Move In</h3>
                <p className="text-muted-foreground">
                  Once approved, work with the landlord to complete your move. 
                  Track your application status online.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-primary">5,000+</div>
                <div className="text-muted-foreground">Housing Units Listed</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-primary">102</div>
                <div className="text-muted-foreground">Counties Covered</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-primary">500+</div>
                <div className="text-muted-foreground">Partner Landlords</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-primary">10,000+</div>
                <div className="text-muted-foreground">Families Housed</div>
              </div>
            </div>
          </div>
        </section>

        {/* For Partners */}
        <section className="border-t border-border bg-card py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
                  For Property Owners
                </h2>
                <p className="mb-6 text-muted-foreground">
                  List your affordable housing units on the IHDA Housing Locator and connect 
                  with qualified tenants across Illinois.
                </p>
                <ul className="mb-6 space-y-3">
                  <li className="flex items-center gap-2 text-foreground">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Free property listing
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Waitlist management tools
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Direct referrals from case managers
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Tenant screening integration
                  </li>
                </ul>
                <Button asChild>
                  <Link href="/dashboard/landlord">
                    <Building2 className="mr-2 h-4 w-4" />
                    Landlord Portal
                  </Link>
                </Button>
              </div>

              <div>
                <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
                  For Case Managers
                </h2>
                <p className="mb-6 text-muted-foreground">
                  Help your clients find housing faster with our dedicated case manager portal. 
                  Submit referrals and track application status in real-time.
                </p>
                <ul className="mb-6 space-y-3">
                  <li className="flex items-center gap-2 text-foreground">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Submit client referrals online
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Track waitlist positions
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Receive status notifications
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Access housing resources
                  </li>
                </ul>
                <Button asChild>
                  <Link href="/dashboard/case-manager">
                    <Users className="mr-2 h-4 w-4" />
                    Case Manager Portal
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-2xl font-bold text-primary-foreground md:text-3xl">
              Need Help Finding Housing?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-primary-foreground/90">
              Our support team is available 7 days a week to help you navigate the housing 
              search process. Call us or explore our resources.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" variant="secondary">
                <Phone className="mr-2 h-4 w-4" />
                1-800-555-IHDA
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="/resources" className="flex items-center">
                  Housing Resources
                  <ArrowRight className="ml-2 h-4 w-4" />
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
