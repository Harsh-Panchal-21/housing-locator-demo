'use client'

import { useState } from 'react'
import Link from 'next/link'
import { DashboardLayout } from '@/components/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { mockWaitlist, type WaitlistEntry } from '@/lib/mock-data'
import {
  Search,
  Filter,
  ArrowLeft,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Download,
  Mail,
  Phone,
} from 'lucide-react'

export default function WaitlistManagementPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [selectedEntry, setSelectedEntry] = useState<WaitlistEntry | null>(null)

  const filteredEntries = mockWaitlist.filter((entry) => {
    const matchesSearch =
      entry.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.caseManagerName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || entry.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || entry.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

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

  const stats = {
    total: mockWaitlist.length,
    pending: mockWaitlist.filter((w) => w.status === 'pending').length,
    approved: mockWaitlist.filter((w) => w.status === 'approved').length,
    housed: mockWaitlist.filter((w) => w.status === 'housed').length,
  }

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Button variant="ghost" asChild className="mb-2">
              <Link href="/dashboard/admin">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Waitlist Management</h1>
            <p className="text-muted-foreground">
              Review and manage housing waitlist applications.
            </p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Entries</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
                <Clock className="h-5 w-5 text-yellow-700" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
                <p className="text-xs text-muted-foreground">Pending Review</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <CheckCircle className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.approved}</p>
                <p className="text-xs text-muted-foreground">Approved</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <CheckCircle className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.housed}</p>
                <p className="text-xs text-muted-foreground">Successfully Housed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name, property, or case manager..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="housed">Housed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Waitlist Entries ({filteredEntries.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Case Manager</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{entry.applicantName}</p>
                        <p className="text-xs text-muted-foreground">
                          Household: {entry.householdSize}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {entry.propertyTitle}
                    </TableCell>
                    <TableCell>{entry.caseManagerName}</TableCell>
                    <TableCell>{getPriorityBadge(entry.priority)}</TableCell>
                    <TableCell>{getStatusBadge(entry.status)}</TableCell>
                    <TableCell>
                      {new Date(entry.submittedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedEntry(entry)}
                          >
                            <Eye className="mr-1 h-4 w-4" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader>
                            <DialogTitle>Application Details</DialogTitle>
                            <DialogDescription>
                              Review waitlist application details
                            </DialogDescription>
                          </DialogHeader>
                          {selectedEntry && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">
                                    Applicant
                                  </p>
                                  <p className="font-semibold">{selectedEntry.applicantName}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">
                                    Priority
                                  </p>
                                  <div className="mt-1">
                                    {getPriorityBadge(selectedEntry.priority)}
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">
                                    Household Size
                                  </p>
                                  <p>{selectedEntry.householdSize} people</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">
                                    Annual Income
                                  </p>
                                  <p>${selectedEntry.income.toLocaleString()}</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                  Property
                                </p>
                                <p>{selectedEntry.propertyTitle}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                  Case Manager
                                </p>
                                <p>{selectedEntry.caseManagerName}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-muted-foreground">
                                  Contact
                                </p>
                                <div className="flex items-center gap-4 text-sm">
                                  <span className="flex items-center gap-1">
                                    <Mail className="h-3 w-3" />
                                    {selectedEntry.applicantEmail}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Phone className="h-3 w-3" />
                                    {selectedEntry.applicantPhone}
                                  </span>
                                </div>
                              </div>
                              {selectedEntry.notes && (
                                <div>
                                  <p className="text-sm font-medium text-muted-foreground">
                                    Notes
                                  </p>
                                  <p className="text-sm">{selectedEntry.notes}</p>
                                </div>
                              )}
                            </div>
                          )}
                          <DialogFooter className="gap-2">
                            <Button variant="destructive" size="sm">
                              <XCircle className="mr-1 h-4 w-4" />
                              Reject
                            </Button>
                            <Button size="sm">
                              <CheckCircle className="mr-1 h-4 w-4" />
                              Approve
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
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
