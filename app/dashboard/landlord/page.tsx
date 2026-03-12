'use client'

import Link from 'next/link'
import { DashboardLayout } from '@/components/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { mockProperties, mockWaitlist } from '@/lib/mock-data'
import {
  Building2,
  Users,
  Plus,
  ArrowRight,
  DollarSign,
  Eye,
  Edit,
  TrendingUp,
  Bell,
  CheckCircle,
  Clock,
} from 'lucide-react'

export default function LandlordDashboard() {
  // Filter properties owned by this landlord (using l1 as demo)
  const myProperties = mockProperties.filter((p) => p.landlordId === 'l1')
  const myWaitlistEntries = mockWaitlist.filter((w) =>
    myProperties.some((p) => p.id === w.propertyId)
  )

  const stats = {
    totalProperties: myProperties.length,
    totalUnits: myProperties.length,
    totalWaitlist: myWaitlistEntries.length,
    pendingApplications: myWaitlistEntries.filter((w) => w.status === 'pending').length,
    monthlyRevenue: myProperties.reduce((sum, p) => sum + p.rent, 0),
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>
      case 'housed':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Housed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <DashboardLayout userRole="landlord" userName="Oak Property Management">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Welcome back, Oak Property Management
            </h1>
            <p className="text-muted-foreground">
              Manage your property listings and tenant applications.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/landlord/add-property">
              <Plus className="mr-2 h-4 w-4" />
              Add New Property
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                My Properties
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalProperties}</div>
              <p className="mt-1 text-xs text-muted-foreground">Active listings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Waitlist Total
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalWaitlist}</div>
              <p className="mt-1 text-xs text-muted-foreground">Applicants waiting</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Review
              </CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {stats.pendingApplications}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Need your attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Potential Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                ${stats.monthlyRevenue.toLocaleString()}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Monthly total</p>
            </CardContent>
          </Card>
        </div>

        {/* Properties */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>My Properties</CardTitle>
              <CardDescription>Manage your property listings</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/landlord/properties">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Rent</TableHead>
                  <TableHead>Waitlist</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myProperties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{property.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} bed`} |{' '}
                          {property.bathrooms} bath
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {property.city}, {property.state}
                    </TableCell>
                    <TableCell className="font-medium">${property.rent}/mo</TableCell>
                    <TableCell>
                      {property.waitlistOpen ? (
                        <Badge variant="secondary">{property.waitlistCount} waiting</Badge>
                      ) : (
                        <span className="text-muted-foreground">Closed</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {property.status === 'available' ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          Available
                        </Badge>
                      ) : (
                        <Badge variant="outline">{property.status}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/property/${property.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Latest waitlist applications for your properties</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/landlord/waitlist">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {myWaitlistEntries.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Household</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myWaitlistEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        <p className="font-medium">{entry.applicantName}</p>
                        <p className="text-xs text-muted-foreground">
                          via {entry.caseManagerName}
                        </p>
                      </TableCell>
                      <TableCell className="max-w-[150px] truncate">
                        {entry.propertyTitle}
                      </TableCell>
                      <TableCell>{entry.householdSize} people</TableCell>
                      <TableCell>{getStatusBadge(entry.status)}</TableCell>
                      <TableCell>
                        {new Date(entry.submittedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="py-8 text-center">
                <Users className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
                <p className="text-muted-foreground">No applications yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="cursor-pointer transition-shadow hover:shadow-md">
            <Link href="/dashboard/landlord/add-property">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Add Property</h3>
                  <p className="text-sm text-muted-foreground">List a new unit</p>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="cursor-pointer transition-shadow hover:shadow-md">
            <Link href="/dashboard/landlord/waitlist">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Manage Waitlist</h3>
                  <p className="text-sm text-muted-foreground">Review applications</p>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="cursor-pointer transition-shadow hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Notifications</h3>
                <p className="text-sm text-muted-foreground">View all alerts</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
