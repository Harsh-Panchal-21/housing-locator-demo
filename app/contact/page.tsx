'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Building2,
  HelpCircle,
  FileText,
  CheckCircle,
} from 'lucide-react'

const contactReasons = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'housing-search', label: 'Housing Search Help' },
  { value: 'landlord', label: 'Landlord/Property Owner' },
  { value: 'case-manager', label: 'Case Manager Support' },
  { value: 'technical', label: 'Technical Support' },
  { value: 'feedback', label: 'Feedback/Suggestions' },
  { value: 'complaint', label: 'File a Complaint' },
]

const officeLocations = [
  {
    name: 'Chicago Main Office',
    address: '111 E. Wacker Drive, Suite 1000',
    city: 'Chicago, IL 60601',
    phone: '312-836-5200',
    hours: 'Mon-Fri: 8:30 AM - 5:00 PM',
  },
  {
    name: 'Springfield Office',
    address: '401 N. 4th Street, Suite 700',
    city: 'Springfield, IL 62701',
    phone: '217-524-4621',
    hours: 'Mon-Fri: 8:30 AM - 5:00 PM',
  },
]

const faqs = [
  {
    question: 'How do I apply for housing?',
    answer: 'Search for available properties on our website, then click "Join Waitlist" or contact the landlord directly to begin the application process.',
  },
  {
    question: 'What is Section 8?',
    answer: 'Section 8, also known as the Housing Choice Voucher program, provides rental assistance to eligible low-income families to help them afford safe, decent housing.',
  },
  {
    question: 'How long are waitlists?',
    answer: 'Waitlist times vary by property and location. Some may be weeks while others could be months or years. Check individual property listings for current waitlist information.',
  },
  {
    question: 'Can I list my property?',
    answer: 'Yes! Property owners can register through our Landlord Portal to list affordable housing units and connect with qualified tenants.',
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex flex-1 items-center justify-center py-16">
          <Card className="mx-4 max-w-md text-center">
            <CardContent className="p-8">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">Message Sent!</h2>
              <p className="mb-6 text-muted-foreground">
                Thank you for contacting us. We will respond to your inquiry within 1-2 business days.
              </p>
              <div className="flex flex-col gap-2">
                <Button asChild>
                  <Link href="/">Return Home</Link>
                </Button>
                <Button variant="outline" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary py-16 lg:py-20">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl text-balance">
                Contact Us
              </h1>
              <p className="text-lg text-primary-foreground/90 text-pretty">
                We are here to help you find housing. Reach out with questions, feedback, or to get personalized assistance.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="border-b border-border bg-card py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">Call Us</h3>
                  <p className="mb-2 text-2xl font-bold text-primary">1-800-555-IHDA</p>
                  <p className="text-sm text-muted-foreground">Mon-Fri, 8:30 AM - 5:00 PM</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">Email Us</h3>
                  <p className="mb-2 text-lg font-semibold text-primary">info@ihda.org</p>
                  <p className="text-sm text-muted-foreground">We respond within 1-2 business days</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">Live Chat</h3>
                  <p className="mb-2 text-lg font-semibold text-primary">Available Online</p>
                  <p className="text-sm text-muted-foreground">Chat with our support team</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Contact Form */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-foreground">Send a Message</h2>
                <Card>
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        <div>
                          <Label htmlFor="reason">Reason for Contact *</Label>
                          <Select
                            value={formData.reason}
                            onValueChange={(value) => setFormData({ ...formData, reason: value })}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a reason" />
                            </SelectTrigger>
                            <SelectContent>
                              {contactReasons.map((reason) => (
                                <SelectItem key={reason.value} value={reason.value}>
                                  {reason.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          required
                          placeholder="Brief description of your inquiry"
                        />
                      </div>
                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          placeholder="Please provide details about your inquiry..."
                          rows={5}
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Office Locations */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-foreground">Office Locations</h2>
                <div className="space-y-4">
                  {officeLocations.map((office, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <h3 className="mb-3 font-semibold text-foreground">{office.name}</h3>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p className="flex items-start gap-2">
                            <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                            <span>
                              {office.address}
                              <br />
                              {office.city}
                            </span>
                          </p>
                          <p className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-primary" />
                            {office.phone}
                          </p>
                          <p className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            {office.hours}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Quick Links */}
                <h3 className="mb-4 mt-8 text-lg font-semibold text-foreground">Quick Links</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Card className="hover:border-primary transition-colors">
                    <Link href="/resources">
                      <CardContent className="flex items-center gap-3 p-4">
                        <FileText className="h-5 w-5 text-primary" />
                        <span className="font-medium text-foreground">Housing Resources</span>
                      </CardContent>
                    </Link>
                  </Card>
                  <Card className="hover:border-primary transition-colors">
                    <Link href="/dashboard/landlord">
                      <CardContent className="flex items-center gap-3 p-4">
                        <Building2 className="h-5 w-5 text-primary" />
                        <span className="font-medium text-foreground">Landlord Portal</span>
                      </CardContent>
                    </Link>
                  </Card>
                  <Card className="hover:border-primary transition-colors">
                    <Link href="/dashboard/case-manager">
                      <CardContent className="flex items-center gap-3 p-4">
                        <HelpCircle className="h-5 w-5 text-primary" />
                        <span className="font-medium text-foreground">Case Manager Help</span>
                      </CardContent>
                    </Link>
                  </Card>
                  <Card className="hover:border-primary transition-colors">
                    <Link href="/about">
                      <CardContent className="flex items-center gap-3 p-4">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        <span className="font-medium text-foreground">About IHDA</span>
                      </CardContent>
                    </Link>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="border-t border-border bg-secondary/30 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-start gap-3 text-base">
                        <HelpCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        {faq.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pl-11 pt-0">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-8 text-center">
                <p className="mb-4 text-muted-foreground">
                  Did not find your answer? We are here to help.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/resources">
                    View All Resources
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
