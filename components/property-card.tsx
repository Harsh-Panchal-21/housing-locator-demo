import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Property } from '@/lib/mock-data'
import { Bed, Bath, Square, MapPin, Calendar, Users, DollarSign } from 'lucide-react'

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative aspect-video bg-muted">
        <div className="absolute inset-0 flex items-center justify-center bg-secondary">
          <div className="text-center">
            <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Property Image</p>
          </div>
        </div>
        <div className="absolute left-2 top-2 flex gap-1">
          {property.status === 'available' && (
            <Badge className="bg-green-600 text-white hover:bg-green-700">Available</Badge>
          )}
          {property.waitlistOpen && (
            <Badge variant="secondary">Waitlist Open</Badge>
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="font-semibold text-foreground line-clamp-1">{property.title}</h3>
        </div>
        <p className="mb-3 text-sm text-muted-foreground">
          {property.address}, {property.city}, {property.state} {property.zip}
        </p>
        
        <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            {property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} Bed`}
          </span>
          <span className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            {property.bathrooms} Bath
          </span>
          <span className="flex items-center gap-1">
            <Square className="h-4 w-4" />
            {property.squareFeet} sqft
          </span>
        </div>

        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center gap-1 text-lg font-bold text-primary">
            <DollarSign className="h-5 w-5" />
            {property.rent.toLocaleString()}/mo
          </span>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Available {new Date(property.availableDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>

        {property.subsidyPrograms.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {property.subsidyPrograms.slice(0, 2).map((program) => (
              <Badge key={program} variant="outline" className="text-xs">
                {program}
              </Badge>
            ))}
            {property.subsidyPrograms.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{property.subsidyPrograms.length - 2} more
              </Badge>
            )}
          </div>
        )}

        {property.waitlistOpen && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{property.waitlistCount} on waitlist</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t bg-secondary/30 p-4">
        <Button asChild className="w-full">
          <Link href={`/property/${property.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
