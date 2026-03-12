'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SearchFilters, type SearchFilters as SearchFiltersType } from '@/components/search-filters'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { mockProperties, type Property } from '@/lib/mock-data'
import {
  MapPin,
  List,
  SlidersHorizontal,
  Bed,
  Bath,
  DollarSign,
  X,
  Building2,
  ArrowRight,
} from 'lucide-react'

const defaultFilters: SearchFiltersType = {
  keyword: '',
  city: '',
  county: '',
  minBedrooms: '',
  maxBedrooms: '',
  minRent: '',
  maxRent: '',
  subsidyPrograms: [],
  accessibilityFeatures: [],
  waitlistOpen: false,
}

// Illinois coordinates (centered)
const ILLINOIS_CENTER = { lat: 40.0, lng: -89.0 }

export default function MapPage() {
  const [filters, setFilters] = useState<SearchFiltersType>(defaultFilters)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const filteredProperties = useMemo(() => {
    let results = [...mockProperties]

    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase()
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(keyword) ||
          p.address.toLowerCase().includes(keyword) ||
          p.city.toLowerCase().includes(keyword)
      )
    }

    if (filters.county && filters.county !== 'all') {
      results = results.filter((p) => p.county === filters.county)
    }

    if (filters.minBedrooms && filters.minBedrooms !== 'any') {
      const min = parseInt(filters.minBedrooms)
      results = results.filter((p) => p.bedrooms >= min)
    }

    if (filters.minRent) {
      results = results.filter((p) => p.rent >= parseInt(filters.minRent))
    }

    if (filters.maxRent) {
      results = results.filter((p) => p.rent <= parseInt(filters.maxRent))
    }

    if (filters.subsidyPrograms.length > 0) {
      results = results.filter((p) =>
        filters.subsidyPrograms.some((program) => p.subsidyPrograms.includes(program))
      )
    }

    if (filters.accessibilityFeatures.length > 0) {
      results = results.filter((p) =>
        filters.accessibilityFeatures.some((feature) =>
          p.accessibilityFeatures.includes(feature)
        )
      )
    }

    if (filters.waitlistOpen) {
      results = results.filter((p) => p.waitlistOpen)
    }

    return results
  }, [filters])

  const handleSearch = () => {
    setShowFilters(false)
  }

  const handleReset = () => {
    setFilters(defaultFilters)
  }

  // Convert lat/lng to position on the map (simplified projection)
  const getMarkerPosition = (lat: number, lng: number) => {
    // Simple linear mapping for Illinois
    const minLat = 37.0
    const maxLat = 42.5
    const minLng = -91.5
    const maxLng = -87.0

    const x = ((lng - minLng) / (maxLng - minLng)) * 100
    const y = ((maxLat - lat) / (maxLat - minLat)) * 100

    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex flex-1 flex-col">
        {/* Map Header */}
        <div className="border-b border-border bg-card px-4 py-3">
          <div className="container mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground">Interactive Housing Map</h1>
              <p className="text-sm text-muted-foreground">
                {filteredProperties.length} properties across Illinois
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Sheet open={showFilters} onOpenChange={setShowFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Search Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <SearchFilters
                      filters={filters}
                      onFiltersChange={setFilters}
                      onSearch={handleSearch}
                      onReset={handleReset}
                      compact
                    />
                  </div>
                </SheetContent>
              </Sheet>
              <Button variant="outline" size="sm" asChild>
                <Link href="/search">
                  <List className="mr-2 h-4 w-4" />
                  List View
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative flex-1">
          {/* Interactive Map Area */}
          <div className="absolute inset-0 bg-secondary/50">
            {/* Illinois Map Background */}
            <div className="relative h-full w-full overflow-hidden">
              {/* Simplified Illinois outline */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Illinois shape (simplified) */}
                <path
                  d="M 30 5 L 70 5 L 72 10 L 75 15 L 73 25 L 70 35 L 68 45 L 65 55 L 60 65 L 55 75 L 50 85 L 45 90 L 40 95 L 35 90 L 30 85 L 28 75 L 30 65 L 32 55 L 33 45 L 32 35 L 30 25 L 28 15 L 30 5 Z"
                  fill="oklch(0.92 0.03 220)"
                  stroke="oklch(0.55 0.15 230)"
                  strokeWidth="0.5"
                />
                {/* Major cities labels */}
                <text x="50" y="25" fontSize="3" fill="oklch(0.45 0.02 230)" textAnchor="middle">Chicago</text>
                <text x="45" y="45" fontSize="2.5" fill="oklch(0.45 0.02 230)" textAnchor="middle">Peoria</text>
                <text x="45" y="70" fontSize="2.5" fill="oklch(0.45 0.02 230)" textAnchor="middle">Springfield</text>
              </svg>

              {/* Property Markers */}
              {filteredProperties.map((property) => {
                const pos = getMarkerPosition(property.lat, property.lng)
                return (
                  <button
                    key={property.id}
                    className={`absolute z-10 -translate-x-1/2 -translate-y-full transition-all hover:z-20 ${
                      selectedProperty?.id === property.id ? 'z-20 scale-125' : ''
                    }`}
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    onClick={() => setSelectedProperty(property)}
                  >
                    <div
                      className={`flex h-8 min-w-16 items-center justify-center rounded-lg px-2 shadow-lg ${
                        selectedProperty?.id === property.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card text-foreground border border-border'
                      }`}
                    >
                      <DollarSign className="h-3 w-3" />
                      <span className="text-xs font-semibold">{property.rent.toLocaleString()}</span>
                    </div>
                    <div
                      className={`mx-auto h-2 w-2 -translate-y-0.5 rotate-45 ${
                        selectedProperty?.id === property.id ? 'bg-primary' : 'bg-card border-b border-r border-border'
                      }`}
                    />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Selected Property Card */}
          {selectedProperty && (
            <div className="absolute bottom-4 left-4 right-4 z-30 md:left-auto md:right-4 md:w-96">
              <Card className="shadow-xl">
                <CardContent className="p-0">
                  <button
                    className="absolute right-2 top-2 z-10 rounded-full bg-card/80 p-1 hover:bg-card"
                    onClick={() => setSelectedProperty(null)}
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <div className="relative aspect-video bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center bg-secondary">
                      <Building2 className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div className="absolute left-2 top-2 flex gap-1">
                      {selectedProperty.status === 'available' && (
                        <Badge className="bg-green-600 text-white text-xs">Available</Badge>
                      )}
                      {selectedProperty.waitlistOpen && (
                        <Badge variant="secondary" className="text-xs">Waitlist Open</Badge>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="mb-1 font-semibold text-foreground">
                      {selectedProperty.title}
                    </h3>
                    <p className="mb-3 text-sm text-muted-foreground">
                      {selectedProperty.address}, {selectedProperty.city}
                    </p>

                    <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        {selectedProperty.bedrooms === 0 ? 'Studio' : `${selectedProperty.bedrooms} Bed`}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        {selectedProperty.bathrooms} Bath
                      </span>
                    </div>

                    <div className="mb-4 flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xl font-bold text-primary">
                        <DollarSign className="h-5 w-5" />
                        {selectedProperty.rent.toLocaleString()}/mo
                      </span>
                    </div>

                    <Button asChild className="w-full">
                      <Link href={`/property/${selectedProperty.id}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Legend */}
          <div className="absolute left-4 top-4 rounded-lg border border-border bg-card p-3 shadow-lg">
            <p className="mb-2 text-xs font-semibold text-foreground">Property Markers</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex h-6 items-center rounded bg-card border border-border px-2">
                <DollarSign className="h-3 w-3" />
                <span>1,200</span>
              </div>
              <span>Monthly rent</span>
            </div>
          </div>

          {/* Property List (Mini) */}
          <div className="absolute right-4 top-4 hidden max-h-[calc(100%-8rem)] w-80 overflow-y-auto rounded-lg border border-border bg-card shadow-lg lg:block">
            <div className="border-b border-border p-3">
              <p className="font-semibold text-foreground">
                {filteredProperties.length} Properties
              </p>
            </div>
            <div className="divide-y divide-border">
              {filteredProperties.slice(0, 5).map((property) => (
                <button
                  key={property.id}
                  className={`w-full p-3 text-left transition-colors hover:bg-secondary/50 ${
                    selectedProperty?.id === property.id ? 'bg-secondary' : ''
                  }`}
                  onClick={() => setSelectedProperty(property)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground line-clamp-1">
                        {property.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {property.city}, {property.county} County
                      </p>
                    </div>
                    <p className="font-semibold text-primary">${property.rent}</p>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} bed`}</span>
                    <span>{property.bathrooms} bath</span>
                  </div>
                </button>
              ))}
            </div>
            {filteredProperties.length > 5 && (
              <div className="border-t border-border p-3">
                <Button variant="outline" className="w-full" size="sm" asChild>
                  <Link href="/search">View All Properties</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
