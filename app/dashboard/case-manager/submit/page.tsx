'use client'

import { useState } from 'react'
import Link from 'next/link'
import { DashboardLayout } from '@/components/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { mockProperties } from '@/lib/mock-data'
import { ArrowLeft, Send, CheckCircle } from 'lucide-react'

export default function SubmitReferralPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    clientFirstName: '',
    clientLastName: '',
    clientEmail: '',
    clientPhone: '',
    propertyId: '',
    householdSize: '',
    annualIncome: '',
    priority: 'standard',
    notes: '',
  })

  const availableProperties = mockProperties.filter((p) => p.waitlistOpen)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate submission
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <DashboardLayout userRole="case_manager" userName="Sarah Johnson">
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardContent className="py-16 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">Referral Submitted!</h2>
              <p className="mb-6 text-muted-foreground">
                Your client referral has been submitted successfully. You will receive a
                notification when the landlord reviews the application.
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/case-manager">Back to Dashboard</Link>
                </Button>
                <Button onClick={() => setSubmitted(false)}>Submit Another</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole="case_manager" userName="Sarah Johnson">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/dashboard/case-manager">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Submit Client Referral</h1>
          <p className="text-muted-foreground">
            Complete the form below to submit a housing referral for your client.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Client Information */}
            <Card>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
                <CardDescription>Enter your client&apos;s contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.clientFirstName}
                      onChange={(e) =>
                        setFormData({ ...formData, clientFirstName: e.target.value })
                      }
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.clientLastName}
                      onChange={(e) =>
                        setFormData({ ...formData, clientLastName: e.target.value })
                      }
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.clientEmail}
                      onChange={(e) =>
                        setFormData({ ...formData, clientEmail: e.target.value })
                      }
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.clientPhone}
                      onChange={(e) =>
                        setFormData({ ...formData, clientPhone: e.target.value })
                      }
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Property Selection</CardTitle>
                <CardDescription>Choose a property with an open waitlist</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="property">Select Property *</Label>
                  <Select
                    value={formData.propertyId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, propertyId: value })
                    }
                    required
                  >
                    <SelectTrigger id="property" className="mt-1">
                      <SelectValue placeholder="Choose a property" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableProperties.map((property) => (
                        <SelectItem key={property.id} value={property.id}>
                          {property.title} - ${property.rent}/mo ({property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} bed`})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Household Information */}
            <Card>
              <CardHeader>
                <CardTitle>Household Information</CardTitle>
                <CardDescription>
                  Provide details about the client&apos;s household
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="householdSize">Household Size *</Label>
                    <Select
                      value={formData.householdSize}
                      onValueChange={(value) =>
                        setFormData({ ...formData, householdSize: value })
                      }
                      required
                    >
                      <SelectTrigger id="householdSize" className="mt-1">
                        <SelectValue placeholder="Number of people" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? 'person' : 'people'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="income">Annual Household Income *</Label>
                    <Input
                      id="income"
                      type="number"
                      placeholder="Enter amount"
                      value={formData.annualIncome}
                      onChange={(e) =>
                        setFormData({ ...formData, annualIncome: e.target.value })
                      }
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="priority">Priority Level *</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) =>
                      setFormData({ ...formData, priority: value })
                    }
                  >
                    <SelectTrigger id="priority" className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Select urgent only for emergency housing situations
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Notes</CardTitle>
                <CardDescription>
                  Include any relevant information about the client&apos;s housing needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter any special requirements, accessibility needs, or other relevant information..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                />
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button" asChild>
                <Link href="/dashboard/case-manager">Cancel</Link>
              </Button>
              <Button type="submit">
                <Send className="mr-2 h-4 w-4" />
                Submit Referral
              </Button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
