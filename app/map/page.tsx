'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Header } from '@/components/header'
import { SearchFilters, type SearchFilters as SearchFiltersType } from '@/components/search-filters'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
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
  Accessibility,
  Clock,
  Users,
  Phone,
  Mail,
  MapPinned,
  Layers,
  ZoomIn,
  ZoomOut,
  Navigation,
  Grid3X3,
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

// Dynamic import for the map component to avoid SSR issues
const MapContainer = dynamic(
  () => import('@/components/leaflet-map').then((mod) => mod.LeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-secondary/30">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <span className="text-sm text-muted-foreground">Loading map...</span>
        </div>
      </div>
    ),
  }
)

export default function MapPage() {
  const [filters, setFilters] = useState<SearchFiltersType>(defaultFilters)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [hoveredProperty, setHoveredProperty] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'map' | 'split'>('split')
  const [mapCenter, setMapCenter] = useState<[number, number]>([40.0, -89.0])
  const [mapZoom, setMapZoom] = useState(7)

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

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property)
    setMapCenter([property.lat, property.lng])
    setMapZoom(14)
  }

  const handleFlyToProperty = (property: Property) => {
    setMapCenter([property.lat, property.lng])
    setMapZoom(15)
  }

  const stats = useMemo(() => {
    return {
      total: filteredProperties.length,
      available: filteredProperties.filter(p => p.status === 'available').length,
      waitlistOpen: filteredProperties.filter(p => p.waitlistOpen).length,
      accessible: filteredProperties.filter(p => p.accessibilityFeatures.length > 0).length,
    }
  }, [filteredProperties])

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <Header />

      <main className="flex flex-1 flex-col overflow-hidden">
        {/* Map Header */}
        <div className="z-20 border-b border-border bg-card px-4 py-3 shadow-sm">
          <div className="container mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-lg font-bold text-foreground md:text-xl">Illinois Housing Map</h1>
                <p className="text-sm text-muted-foreground">
                  {filteredProperties.length} properties found
                </p>
              </div>
              
              {/* Quick Stats */}
              <div className="hidden items-center gap-2 md:flex">
                <Badge variant="secondary" className="gap-1">
                  <Building2 className="h-3 w-3" />
                  {stats.available} Available
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Clock className="h-3 w-3" />
                  {stats.waitlistOpen} Open Waitlist
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Accessibility className="h-3 w-3" />
                  {stats.accessible} Accessible
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* View Mode Toggle */}
              <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'map' | 'split')} className="hidden md:block">
                <TabsList className="h-9">
                  <TabsTrigger value="split" className="gap-1 text-xs">
                    <Grid3X3 className="h-3.5 w-3.5" />
                    Split
                  </TabsTrigger>
                  <TabsTrigger value="map" className="gap-1 text-xs">
                    <MapPinned className="h-3.5 w-3.5" />
                    Map
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Sheet open={showFilters} onOpenChange={setShowFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span className="hidden sm:inline">Filters</span>
                    {(filters.county || filters.minBedrooms || filters.subsidyPrograms.length > 0) && (
                      <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                        {[filters.county, filters.minBedrooms, ...filters.subsidyPrograms].filter(Boolean).length}
                      </Badge>
                    )}
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
                <Link href="/search" className="gap-2">
                  <List className="h-4 w-4" />
                  <span className="hidden sm:inline">List View</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative flex flex-1 overflow-hidden">
          {/* Property List Sidebar */}
          {viewMode === 'split' && (
            <div className="hidden w-96 flex-shrink-0 border-r border-border bg-card md:flex md:flex-col">
              <div className="border-b border-border p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">
                    Showing {filteredProperties.length} properties
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setMapCenter([40.0, -89.0])
                      setMapZoom(7)
                    }}
                  >
                    <Navigation className="mr-1 h-3 w-3" />
                    Reset View
                  </Button>
                </div>
              </div>
              <ScrollArea className="flex-1">
                <div className="divide-y divide-border">
                  {filteredProperties.map((property) => (
                    <div
                      key={property.id}
                      className={`cursor-pointer p-4 transition-colors hover:bg-secondary/50 ${
                        selectedProperty?.id === property.id ? 'bg-secondary' : ''
                      } ${hoveredProperty === property.id ? 'bg-secondary/30' : ''}`}
                      onClick={() => handlePropertySelect(property)}
                      onMouseEnter={() => setHoveredProperty(property.id)}
                      onMouseLeave={() => setHoveredProperty(null)}
                    >
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-medium text-foreground line-clamp-1">
                            {property.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {property.address}, {property.city}
                          </p>
                        </div>
                        <p className="whitespace-nowrap text-lg font-bold text-primary">
                          ${property.rent}
                        </p>
                      </div>

                      <div className="mb-2 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Bed className="h-3 w-3" />
                          {property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} bed`}
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="h-3 w-3" />
                          {property.bathrooms} bath
                        </span>
                        <span>{property.squareFeet} sqft</span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {property.status === 'available' && (
                          <Badge className="bg-green-600 text-white text-xs">Available</Badge>
                        )}
                        {property.waitlistOpen && (
                          <Badge variant="outline" className="text-xs">Waitlist Open</Badge>
                        )}
                        {property.accessibilityFeatures.length > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            <Accessibility className="mr-1 h-3 w-3" />
                            Accessible
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Map Container */}
          <div className="relative flex-1">
            <MapContainer
              properties={filteredProperties}
              selectedProperty={selectedProperty}
              hoveredProperty={hoveredProperty}
              center={mapCenter}
              zoom={mapZoom}
              onPropertySelect={handlePropertySelect}
              onPropertyHover={setHoveredProperty}
            />

            {/* Map Controls */}
            <div className="absolute right-4 top-4 z-[1000] flex flex-col gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-9 w-9 shadow-lg"
                      onClick={() => setMapZoom(Math.min(mapZoom + 1, 18))}
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">Zoom In</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-9 w-9 shadow-lg"
                      onClick={() => setMapZoom(Math.max(mapZoom - 1, 5))}
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">Zoom Out</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-9 w-9 shadow-lg"
                      onClick={() => {
                        setMapCenter([40.0, -89.0])
                        setMapZoom(7)
                      }}
                    >
                      <Layers className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">Reset View</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 z-[1000] rounded-xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur-sm">
              <p className="mb-3 text-sm font-semibold text-foreground">Map Legend</p>
              <div className="flex flex-col gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
                    <Building2 className="h-3 w-3" />
                  </div>
                  <span className="text-muted-foreground">Available Now</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Clock className="h-3 w-3" />
                  </div>
                  <span className="text-muted-foreground">Waitlist Open</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Accessibility className="h-3 w-3" />
                  </div>
                  <span className="text-muted-foreground">Accessible Unit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Property Card */}
          {selectedProperty && (
            <div className="absolute bottom-4 right-4 z-[1000] w-full max-w-md md:bottom-auto md:right-4 md:top-4">
              <Card className="shadow-2xl">
                <CardContent className="p-0">
                  <button
                    className="absolute right-3 top-3 z-10 rounded-full bg-card/90 p-1.5 shadow-md transition-colors hover:bg-card"
                    onClick={() => setSelectedProperty(null)}
                  >
                    <X className="h-4 w-4" />
                  </button>

                  {/* Property Image Placeholder */}
                  <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg bg-secondary">
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                      <Building2 className="h-16 w-16 text-primary/40" />
                    </div>
                    <div className="absolute left-3 top-3 flex gap-2">
                      {selectedProperty.status === 'available' && (
                        <Badge className="bg-green-600 text-white shadow-md">Available Now</Badge>
                      )}
                      {selectedProperty.waitlistOpen && (
                        <Badge className="bg-primary text-primary-foreground shadow-md">
                          <Users className="mr-1 h-3 w-3" />
                          {selectedProperty.waitlistCount} on waitlist
                        </Badge>
                      )}
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <Badge variant="secondary" className="bg-card/90 text-lg font-bold shadow-md">
                        ${selectedProperty.rent}/mo
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="mb-1 text-lg font-bold text-foreground">
                      {selectedProperty.title}
                    </h3>
                    <p className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {selectedProperty.address}, {selectedProperty.city}, IL {selectedProperty.zip}
                    </p>

                    {/* Property Details Grid */}
                    <div className="mb-4 grid grid-cols-3 gap-3 rounded-lg bg-secondary/50 p-3">
                      <div className="text-center">
                        <Bed className="mx-auto mb-1 h-5 w-5 text-primary" />
                        <p className="text-xs text-muted-foreground">Beds</p>
                        <p className="font-semibold text-foreground">
                          {selectedProperty.bedrooms === 0 ? 'Studio' : selectedProperty.bedrooms}
                        </p>
                      </div>
                      <div className="text-center">
                        <Bath className="mx-auto mb-1 h-5 w-5 text-primary" />
                        <p className="text-xs text-muted-foreground">Baths</p>
                        <p className="font-semibold text-foreground">{selectedProperty.bathrooms}</p>
                      </div>
                      <div className="text-center">
                        <Grid3X3 className="mx-auto mb-1 h-5 w-5 text-primary" />
                        <p className="text-xs text-muted-foreground">Sq Ft</p>
                        <p className="font-semibold text-foreground">{selectedProperty.squareFeet}</p>
                      </div>
                    </div>

                    {/* Subsidy Programs */}
                    {selectedProperty.subsidyPrograms.length > 0 && (
                      <div className="mb-4">
                        <p className="mb-2 text-xs font-medium text-muted-foreground">Accepts:</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedProperty.subsidyPrograms.map((program) => (
                            <Badge key={program} variant="outline" className="text-xs">
                              {program}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Accessibility Features */}
                    {selectedProperty.accessibilityFeatures.length > 0 && (
                      <div className="mb-4">
                        <p className="mb-2 text-xs font-medium text-muted-foreground">Accessibility:</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedProperty.accessibilityFeatures.map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs">
                              <Accessibility className="mr-1 h-3 w-3" />
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Contact Info */}
                    <div className="mb-4 rounded-lg border border-border p-3">
                      <p className="mb-2 text-sm font-medium text-foreground">
                        {selectedProperty.landlordName}
                      </p>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <a href={`tel:${selectedProperty.landlordPhone}`} className="flex items-center gap-1 hover:text-primary">
                          <Phone className="h-3 w-3" />
                          {selectedProperty.landlordPhone}
                        </a>
                        <a href={`mailto:${selectedProperty.landlordEmail}`} className="flex items-center gap-1 hover:text-primary">
                          <Mail className="h-3 w-3" />
                          Email
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button asChild className="flex-1">
                        <Link href={`/property/${selectedProperty.id}`}>
                          View Full Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" onClick={() => handleFlyToProperty(selectedProperty)}>
                        <Navigation className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
