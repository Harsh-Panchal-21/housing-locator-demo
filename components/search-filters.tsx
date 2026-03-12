'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { illinoisCounties, subsidyPrograms, accessibilityOptions } from '@/lib/mock-data'
import { Search, SlidersHorizontal, X } from 'lucide-react'

export interface SearchFilters {
  keyword: string
  city: string
  county: string
  minBedrooms: string
  maxBedrooms: string
  minRent: string
  maxRent: string
  subsidyPrograms: string[]
  accessibilityFeatures: string[]
  waitlistOpen: boolean
}

interface SearchFiltersProps {
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
  onSearch: () => void
  onReset: () => void
  compact?: boolean
}

export function SearchFilters({
  filters,
  onFiltersChange,
  onSearch,
  onReset,
  compact = false,
}: SearchFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSubsidyChange = (program: string, checked: boolean) => {
    const newPrograms = checked
      ? [...filters.subsidyPrograms, program]
      : filters.subsidyPrograms.filter((p) => p !== program)
    onFiltersChange({ ...filters, subsidyPrograms: newPrograms })
  }

  const handleAccessibilityChange = (feature: string, checked: boolean) => {
    const newFeatures = checked
      ? [...filters.accessibilityFeatures, feature]
      : filters.accessibilityFeatures.filter((f) => f !== feature)
    onFiltersChange({ ...filters, accessibilityFeatures: newFeatures })
  }

  if (compact) {
    return (
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <SlidersHorizontal className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="keyword">Search</Label>
            <div className="relative mt-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="keyword"
                placeholder="City, address, or property name"
                value={filters.keyword}
                onChange={(e) => onFiltersChange({ ...filters, keyword: e.target.value })}
                className="pl-9"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="county">County</Label>
            <Select
              value={filters.county}
              onValueChange={(value) => onFiltersChange({ ...filters, county: value })}
            >
              <SelectTrigger id="county" className="mt-1">
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

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="minBedrooms">Min Beds</Label>
              <Select
                value={filters.minBedrooms}
                onValueChange={(value) => onFiltersChange({ ...filters, minBedrooms: value })}
              >
                <SelectTrigger id="minBedrooms" className="mt-1">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="0">Studio</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="maxBedrooms">Max Beds</Label>
              <Select
                value={filters.maxBedrooms}
                onValueChange={(value) => onFiltersChange({ ...filters, maxBedrooms: value })}
              >
                <SelectTrigger id="maxBedrooms" className="mt-1">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="0">Studio</SelectItem>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="minRent">Min Rent</Label>
              <Input
                id="minRent"
                type="number"
                placeholder="$0"
                value={filters.minRent}
                onChange={(e) => onFiltersChange({ ...filters, minRent: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="maxRent">Max Rent</Label>
              <Input
                id="maxRent"
                type="number"
                placeholder="No max"
                value={filters.maxRent}
                onChange={(e) => onFiltersChange({ ...filters, maxRent: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>

          <Accordion type="multiple" className="w-full">
            <AccordionItem value="subsidies">
              <AccordionTrigger className="text-sm">Subsidy Programs</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {subsidyPrograms.map((program) => (
                    <div key={program} className="flex items-center gap-2">
                      <Checkbox
                        id={`subsidy-${program}`}
                        checked={filters.subsidyPrograms.includes(program)}
                        onCheckedChange={(checked) =>
                          handleSubsidyChange(program, checked as boolean)
                        }
                      />
                      <Label htmlFor={`subsidy-${program}`} className="text-sm font-normal">
                        {program}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="accessibility">
              <AccordionTrigger className="text-sm">Accessibility Features</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {accessibilityOptions.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Checkbox
                        id={`access-${feature}`}
                        checked={filters.accessibilityFeatures.includes(feature)}
                        onCheckedChange={(checked) =>
                          handleAccessibilityChange(feature, checked as boolean)
                        }
                      />
                      <Label htmlFor={`access-${feature}`} className="text-sm font-normal">
                        {feature}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex items-center gap-2">
            <Checkbox
              id="waitlistOpen"
              checked={filters.waitlistOpen}
              onCheckedChange={(checked) =>
                onFiltersChange({ ...filters, waitlistOpen: checked as boolean })
              }
            />
            <Label htmlFor="waitlistOpen" className="text-sm font-normal">
              Waitlist open only
            </Label>
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={onSearch} className="flex-1">
              Apply Filters
            </Button>
            <Button variant="outline" onClick={onReset}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex-1">
          <Label htmlFor="keyword-main">Search</Label>
          <div className="relative mt-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="keyword-main"
              placeholder="City, address, zip code, or property name"
              value={filters.keyword}
              onChange={(e) => onFiltersChange({ ...filters, keyword: e.target.value })}
              className="pl-9"
            />
          </div>
        </div>
        <div className="w-full md:w-48">
          <Label htmlFor="county-main">County</Label>
          <Select
            value={filters.county}
            onValueChange={(value) => onFiltersChange({ ...filters, county: value })}
          >
            <SelectTrigger id="county-main" className="mt-1">
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
          <Label htmlFor="beds-main">Bedrooms</Label>
          <Select
            value={filters.minBedrooms}
            onValueChange={(value) => onFiltersChange({ ...filters, minBedrooms: value })}
          >
            <SelectTrigger id="beds-main" className="mt-1">
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
        <Button onClick={onSearch} size="lg">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          {showAdvanced ? 'Hide' : 'More'} Filters
        </Button>
      </div>

      {showAdvanced && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <Label>Rent Range</Label>
                <div className="mt-1 flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minRent}
                    onChange={(e) => onFiltersChange({ ...filters, minRent: e.target.value })}
                  />
                  <span className="text-muted-foreground">-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxRent}
                    onChange={(e) => onFiltersChange({ ...filters, maxRent: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label>Subsidy Programs</Label>
                <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
                  {subsidyPrograms.slice(0, 4).map((program) => (
                    <div key={program} className="flex items-center gap-2">
                      <Checkbox
                        id={`sub-main-${program}`}
                        checked={filters.subsidyPrograms.includes(program)}
                        onCheckedChange={(checked) =>
                          handleSubsidyChange(program, checked as boolean)
                        }
                      />
                      <Label htmlFor={`sub-main-${program}`} className="text-sm font-normal">
                        {program}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Accessibility</Label>
                <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
                  {accessibilityOptions.slice(0, 4).map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Checkbox
                        id={`acc-main-${feature}`}
                        checked={filters.accessibilityFeatures.includes(feature)}
                        onCheckedChange={(checked) =>
                          handleAccessibilityChange(feature, checked as boolean)
                        }
                      />
                      <Label htmlFor={`acc-main-${feature}`} className="text-sm font-normal">
                        {feature}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div className="flex items-center gap-2 mt-2">
                  <Checkbox
                    id="waitlist-main"
                    checked={filters.waitlistOpen}
                    onCheckedChange={(checked) =>
                      onFiltersChange({ ...filters, waitlistOpen: checked as boolean })
                    }
                  />
                  <Label htmlFor="waitlist-main" className="text-sm font-normal">
                    Waitlist open only
                  </Label>
                </div>
                <Button variant="outline" onClick={onReset} className="mt-4">
                  <X className="mr-2 h-4 w-4" />
                  Reset Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
