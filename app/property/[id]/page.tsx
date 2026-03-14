'use client'

import { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { mockProperties } from '@/lib/mock-data'
import {
  ArrowLeft,
  Bed,
  Bath,
  Square,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Phone,
  Mail,
  Building2,
  Heart,
  Share2,
  Printer,
  CheckCircle,
  AlertCircle,
  Accessibility,
  PawPrint,
  Zap,
} from 'lucide-react'

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const property = mockProperties.find((p) => p.id === id)

  if (!property) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link href="/search" className="text-muted-foreground hover:text-foreground">
                Search
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground">{property.title}</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/search">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Search
            </Link>
          </Button>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image */}
              <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
                <img
                  src={property.images[0] || '/images/property-1.jpg'}
                  alt={property.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute left-4 top-4 flex gap-2">
                  {property.status === 'available' && (
                    <Badge className="bg-green-600 text-white">Available</Badge>
                  )}
                  {property.waitlistOpen && (
                    <Badge variant="secondary">Waitlist Open</Badge>
                  )}
                </div>
                <div className="absolute right-4 top-4 flex gap-2">
                  <Button size="icon" variant="secondary">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary">
                    <Printer className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Title & Location */}
              <div>
                <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                  {property.title}
                </h1>
                <p className="mt-2 flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {property.address}, {property.city}, {property.state} {property.zip}
                </p>
                <p className="text-sm text-muted-foreground">{property.county} County</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 rounded-lg border border-border bg-card p-4 md:grid-cols-4">
                <div className="text-center">
                  <Bed className="mx-auto mb-1 h-5 w-5 text-primary" />
                  <p className="text-lg font-semibold text-foreground">
                    {property.bedrooms === 0 ? 'Studio' : property.bedrooms}
                  </p>
                  <p className="text-xs text-muted-foreground">Bedrooms</p>
                </div>
                <div className="text-center">
                  <Bath className="mx-auto mb-1 h-5 w-5 text-primary" />
                  <p className="text-lg font-semibold text-foreground">{property.bathrooms}</p>
                  <p className="text-xs text-muted-foreground">Bathrooms</p>
                </div>
                <div className="text-center">
                  <Square className="mx-auto mb-1 h-5 w-5 text-primary" />
                  <p className="text-lg font-semibold text-foreground">{property.squareFeet}</p>
                  <p className="text-xs text-muted-foreground">Sq. Ft.</p>
                </div>
                <div className="text-center">
                  <Calendar className="mx-auto mb-1 h-5 w-5 text-primary" />
                  <p className="text-lg font-semibold text-foreground">
                    {new Date(property.availableDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground">Available</p>
                </div>
              </div>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                </CardContent>
              </Card>

              {/* Amenities */}
              <Card>
                <CardHeader>
                  <CardTitle>Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {property.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2 text-foreground">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Accessibility Features */}
              {property.accessibilityFeatures.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Accessibility className="h-5 w-5" />
                      Accessibility Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                      {property.accessibilityFeatures.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-foreground">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Additional Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <PawPrint className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Pet Policy</p>
                      <p className="text-sm text-muted-foreground">{property.petPolicy}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start gap-3">
                    <Zap className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">Utilities</p>
                      <p className="text-sm text-muted-foreground">{property.utilities.join(', ')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Rent & Apply */}
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <div className="mb-4 text-center">
                    <p className="text-sm text-muted-foreground">Monthly Rent</p>
                    <p className="flex items-center justify-center gap-1 text-4xl font-bold text-primary">
                      <DollarSign className="h-8 w-8" />
                      {property.rent.toLocaleString()}
                    </p>
                  </div>

                  {property.subsidyPrograms.length > 0 && (
                    <div className="mb-4">
                      <p className="mb-2 text-sm font-medium text-foreground">
                        Accepted Subsidy Programs
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {property.subsidyPrograms.map((program) => (
                          <Badge key={program} variant="outline" className="text-xs">
                            {program}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <Separator className="my-4" />

                  {property.waitlistOpen ? (
                    <div className="mb-4 rounded-lg bg-secondary p-4 text-center">
                      <Users className="mx-auto mb-2 h-6 w-6 text-primary" />
                      <p className="font-medium text-foreground">Waitlist Open</p>
                      <p className="text-sm text-muted-foreground">
                        {property.waitlistCount} applicants on waitlist
                      </p>
                    </div>
                  ) : (
                    <div className="mb-4 rounded-lg bg-muted p-4 text-center">
                      <AlertCircle className="mx-auto mb-2 h-6 w-6 text-muted-foreground" />
                      <p className="font-medium text-foreground">Waitlist Closed</p>
                      <p className="text-sm text-muted-foreground">
                        Save this listing to be notified when it opens
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      {property.waitlistOpen ? 'Join Waitlist' : 'Save Listing'}
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      Contact Landlord
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Landlord Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Property Manager
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="font-medium text-foreground">{property.landlordName}</p>
                  <div className="space-y-2">
                    <a
                      href={`tel:${property.landlordPhone}`}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      {property.landlordPhone}
                    </a>
                    <a
                      href={`mailto:${property.landlordEmail}`}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      {property.landlordEmail}
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Case Manager CTA */}
              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="p-6 text-center">
                  <Users className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <h3 className="mb-2 font-semibold text-foreground">Are you a Case Manager?</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Submit a referral for your client directly through our portal.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/case-manager">Case Manager Portal</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
