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
import { mockProperties, mockWaitlist, mockUsers, mockReferrals } from '@/lib/mock-data'
import {
  Building2,
  Users,
  ClipboardList,
  TrendingUp,
  ArrowRight,
  Home,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  FileText,
  UserPlus,
} from 'lucide-react'

export default function AdminDashboard() {
  const stats = {
    totalProperties: mockProperties.length,
    availableUnits: mockProperties.filter((p) => p.status === 'available').length,
    totalWaitlist: mockWaitlist.length,
    pendingApplications: mockWaitlist.filter((w) => w.status === 'pending').length,
    housed: mockWaitlist.filter((w) => w.status === 'housed').length,
    totalUsers: mockUsers.length,
    landlords: mockUsers.filter((u) => u.role === 'landlord').length,
    caseManagers: mockUsers.filter((u) => u.role === 'case_manager').length,
  }

  const recentWaitlistEntries = mockWaitlist.slice(0, 5)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>
      case 'housed':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Housed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="destructive">Urgent</Badge>
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">High</Badge>
      default:
        return <Badge variant="outline">Standard</Badge>
    }
  }

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              System overview and management tools for IHDA Housing Locator.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/dashboard/admin/reports">
                <BarChart3 className="mr-2 h-4 w-4" />
                Generate Reports
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Properties
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalProperties}</div>
              <p className="mt-1 text-xs text-muted-foreground">
                {stats.availableUnits} currently available
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Waitlist Entries
              </CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalWaitlist}</div>
              <p className="mt-1 text-xs text-muted-foreground">
                {stats.pendingApplications} pending review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Successfully Housed
              </CardTitle>
              <Home className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.housed}</div>
              <p className="mt-1 text-xs text-green-600">
                <TrendingUp className="mr-1 inline h-3 w-3" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                System Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalUsers}</div>
              <p className="mt-1 text-xs text-muted-foreground">
                {stats.landlords} landlords, {stats.caseManagers} case managers
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Waitlist Management */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Waitlist Activity</CardTitle>
                <CardDescription>Latest applications and status changes</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/admin/waitlists">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentWaitlistEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{entry.applicantName}</p>
                          <p className="text-xs text-muted-foreground">
                            via {entry.caseManagerName}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[150px] truncate">
                        {entry.propertyTitle}
                      </TableCell>
                      <TableCell>{getPriorityBadge(entry.priority)}</TableCell>
                      <TableCell>{getStatusBadge(entry.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="space-y-6">
            {/* Urgent Items */}
            <Card className="border-orange-200 bg-orange-50/50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <AlertCircle className="h-5 w-5" />
                  Requires Attention
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-orange-700">Urgent applications</span>
                  <Badge variant="destructive">
                    {mockWaitlist.filter((w) => w.priority === 'urgent').length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-orange-700">Pending reviews</span>
                  <Badge variant="secondary">{stats.pendingApplications}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-orange-700">Expiring listings</span>
                  <Badge variant="outline">2</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/dashboard/admin/properties">
                    <Building2 className="mr-2 h-4 w-4" />
                    Manage Properties
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/dashboard/admin/users">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Manage Users
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/dashboard/admin/reports">
                    <FileText className="mr-2 h-4 w-4" />
                    Export Reports
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Database</span>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Healthy
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">API Status</span>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Online
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Backup</span>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Property Overview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Property Overview</CardTitle>
              <CardDescription>All registered properties in the system</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/admin/properties">
                Manage All
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
                  <TableHead>Landlord</TableHead>
                  <TableHead>Rent</TableHead>
                  <TableHead>Waitlist</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProperties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell className="font-medium">{property.title}</TableCell>
                    <TableCell>
                      {property.city}, {property.county}
                    </TableCell>
                    <TableCell>{property.landlordName}</TableCell>
                    <TableCell>${property.rent}/mo</TableCell>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
