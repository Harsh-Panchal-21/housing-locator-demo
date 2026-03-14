'use client'

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PropertyCard } from '@/components/property-card'
import { SearchFilters, type SearchFilters as SearchFiltersType } from '@/components/search-filters'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { mockProperties } from '@/lib/mock-data'
import { Grid3X3, List, MapPin, Loader2 } from 'lucide-react'
import Link from 'next/link'

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

function SearchPageContent() {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<SearchFiltersType>(() => ({
    ...defaultFilters,
    keyword: searchParams.get('q') || '',
    county: searchParams.get('county') || '',
    minBedrooms: searchParams.get('beds') || '',
  }))
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredProperties = useMemo(() => {
    let results = [...mockProperties]

    // Keyword filter
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase()
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(keyword) ||
          p.address.toLowerCase().includes(keyword) ||
          p.city.toLowerCase().includes(keyword) ||
          p.zip.includes(keyword)
      )
    }

    // County filter
    if (filters.county && filters.county !== 'all') {
      results = results.filter((p) => p.county === filters.county)
    }

    // Bedrooms filter
    if (filters.minBedrooms && filters.minBedrooms !== 'any') {
      const min = parseInt(filters.minBedrooms)
      results = results.filter((p) => p.bedrooms >= min)
    }
    if (filters.maxBedrooms && filters.maxBedrooms !== 'any') {
      const max = parseInt(filters.maxBedrooms)
      results = results.filter((p) => p.bedrooms <= max)
    }

    // Rent filter
    if (filters.minRent) {
      const min = parseInt(filters.minRent)
      results = results.filter((p) => p.rent >= min)
    }
    if (filters.maxRent) {
      const max = parseInt(filters.maxRent)
      results = results.filter((p) => p.rent <= max)
    }

    // Subsidy programs filter
    if (filters.subsidyPrograms.length > 0) {
      results = results.filter((p) =>
        filters.subsidyPrograms.some((program) => p.subsidyPrograms.includes(program))
      )
    }

    // Accessibility filter
    if (filters.accessibilityFeatures.length > 0) {
      results = results.filter((p) =>
        filters.accessibilityFeatures.some((feature) =>
          p.accessibilityFeatures.includes(feature)
        )
      )
    }

    // Waitlist filter
    if (filters.waitlistOpen) {
      results = results.filter((p) => p.waitlistOpen)
    }

    // Sort
    switch (sortBy) {
      case 'rent-low':
        results.sort((a, b) => a.rent - b.rent)
        break
      case 'rent-high':
        results.sort((a, b) => b.rent - a.rent)
        break
      case 'beds':
        results.sort((a, b) => b.bedrooms - a.bedrooms)
        break
      case 'newest':
      default:
        results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    return results
  }, [filters, sortBy])

  const handleSearch = () => {
    // Filters are already applied via useMemo
  }

  const handleReset = () => {
    setFilters(defaultFilters)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Search Header */}
        <section className="border-b border-border bg-card py-8">
          <div className="container mx-auto px-4">
            <h1 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">
              Search Housing
            </h1>
            <SearchFilters
              filters={filters}
              onFiltersChange={setFilters}
              onSearch={handleSearch}
              onReset={handleReset}
            />
          </div>
        </section>

        {/* Results */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="lg:flex lg:gap-8">
              {/* Sidebar Filters (Desktop) */}
              <aside className="hidden lg:block lg:w-72 lg:shrink-0">
                <SearchFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  onSearch={handleSearch}
                  onReset={handleReset}
                  compact
                />
              </aside>

              {/* Results Grid */}
              <div className="flex-1">
                {/* Results Header */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-medium text-foreground">
                      {filteredProperties.length} properties found
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Showing affordable housing across Illinois
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/map">
                        <MapPin className="mr-2 h-4 w-4" />
                        Map View
                      </Link>
                    </Button>

                    <div className="flex items-center gap-1 rounded-lg border border-border p-1">
                      <Button
                        variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>

                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="rent-low">Rent: Low to High</SelectItem>
                        <SelectItem value="rent-high">Rent: High to Low</SelectItem>
                        <SelectItem value="beds">Most Bedrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Property Grid */}
                {filteredProperties.length > 0 ? (
                  <div
                    className={
                      viewMode === 'grid'
                        ? 'grid gap-6 md:grid-cols-2 xl:grid-cols-3'
                        : 'space-y-4'
                    }
                  >
                    {filteredProperties.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-border bg-card p-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <MapPin className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                      No properties found
                    </h3>
                    <p className="mb-4 text-muted-foreground">
                      Try adjusting your search filters to find more results
                    </p>
                    <Button variant="outline" onClick={handleReset}>
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function SearchLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">Loading search...</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchPageContent />
    </Suspense>
  )
}
