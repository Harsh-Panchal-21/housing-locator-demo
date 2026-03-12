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
import { mockReferrals, mockWaitlist } from '@/lib/mock-data'
import {
  ClipboardList,
  Users,
  CheckCircle,
  Clock,
  Plus,
  ArrowRight,
  TrendingUp,
  Home,
  AlertCircle,
} from 'lucide-react'

export default function CaseManagerDashboard() {
  const myReferrals = mockReferrals.filter((r) => r.caseManagerId === 'cm1')
  const myWaitlistEntries = mockWaitlist.filter((w) => w.caseManagerId === 'cm1')

  const stats = {
    totalReferrals: myReferrals.length,
    pending: myReferrals.filter((r) => r.status === 'submitted' || r.status === 'under_review').length,
    approved: myReferrals.filter((r) => r.status === 'approved').length,
    housed: myWaitlistEntries.filter((w) => w.status === 'housed').length,
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Badge variant="secondary">Submitted</Badge>
      case 'under_review':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Under Review</Badge>
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>
      case 'denied':
        return <Badge variant="destructive">Denied</Badge>
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
    <DashboardLayout userRole="case_manager" userName="Sarah Johnson">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back, Sarah</h1>
            <p className="text-muted-foreground">
              Here&apos;s an overview of your client referrals and housing placements.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/case-manager/submit">
              <Plus className="mr-2 h-4 w-4" />
              Submit New Referral
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Referrals
              </CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalReferrals}</div>
              <p className="mt-1 text-xs text-muted-foreground">All time submissions</p>
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
              <div className="text-3xl font-bold text-foreground">{stats.pending}</div>
              <p className="mt-1 text-xs text-muted-foreground">Awaiting landlord response</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Approved
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.approved}</div>
              <p className="mt-1 text-xs text-muted-foreground">Ready for move-in</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Successfully Housed
              </CardTitle>
              <Home className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.housed}</div>
              <p className="mt-1 text-xs text-muted-foreground">Clients placed this year</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Referrals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Referrals</CardTitle>
              <CardDescription>Your latest client referral submissions</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/case-manager/referrals">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myReferrals.map((referral) => (
                  <TableRow key={referral.id}>
                    <TableCell className="font-medium">{referral.clientName}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {referral.propertyTitle}
                    </TableCell>
                    <TableCell>
                      {new Date(referral.submittedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{getStatusBadge(referral.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Waitlist Tracking */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Client Waitlist Status</CardTitle>
              <CardDescription>Track your clients on property waitlists</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Household Size</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myWaitlistEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{entry.applicantName}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {entry.propertyTitle}
                    </TableCell>
                    <TableCell>{getPriorityBadge(entry.priority)}</TableCell>
                    <TableCell>
                      {entry.status === 'housed' ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Housed</Badge>
                      ) : entry.status === 'approved' ? (
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Approved</Badge>
                      ) : (
                        <Badge variant="secondary">Pending</Badge>
                      )}
                    </TableCell>
                    <TableCell>{entry.householdSize} people</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="cursor-pointer transition-shadow hover:shadow-md">
            <Link href="/search">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Search Housing</h3>
                  <p className="text-sm text-muted-foreground">Find available units for clients</p>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="cursor-pointer transition-shadow hover:shadow-md">
            <Link href="/dashboard/case-manager/submit">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">New Referral</h3>
                  <p className="text-sm text-muted-foreground">Submit a client application</p>
                </div>
              </CardContent>
            </Link>
          </Card>

          <Card className="cursor-pointer transition-shadow hover:shadow-md">
            <Link href="/resources">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Resources</h3>
                  <p className="text-sm text-muted-foreground">Housing assistance programs</p>
                </div>
              </CardContent>
            </Link>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
