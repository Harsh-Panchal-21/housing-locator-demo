import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  FileText,
  Phone,
  Mail,
  ExternalLink,
  HelpCircle,
  DollarSign,
  Home,
  Users,
  Shield,
  Accessibility,
  Globe,
  BookOpen,
} from 'lucide-react'

const resources = [
  {
    title: 'Section 8 Housing Choice Voucher Program',
    description:
      'Federal rental assistance program that helps low-income families, the elderly, and disabled afford housing in the private market.',
    category: 'Rental Assistance',
    link: '#',
  },
  {
    title: 'Low Income Housing Tax Credit (LIHTC)',
    description:
      'Tax incentive program that provides affordable rental housing for low and moderate income families.',
    category: 'Rental Assistance',
    link: '#',
  },
  {
    title: 'Emergency Rental Assistance Program',
    description:
      'Financial assistance for renters facing eviction due to COVID-19 related hardships.',
    category: 'Emergency',
    link: '#',
  },
  {
    title: 'Homeless Prevention Program',
    description:
      'Services and assistance for individuals and families at risk of becoming homeless.',
    category: 'Prevention',
    link: '#',
  },
  {
    title: 'Senior Housing Programs',
    description:
      'Housing options specifically designed for seniors aged 62 and older, including Section 202 housing.',
    category: 'Senior',
    link: '#',
  },
  {
    title: 'Disability Housing Resources',
    description:
      'Accessible housing options and programs for individuals with disabilities, including Section 811.',
    category: 'Disability',
    link: '#',
  },
]

const faqs = [
  {
    question: 'How do I apply for affordable housing?',
    answer:
      'Search for available properties on our platform, find units that match your needs, and join the waitlist or contact the landlord directly. Case managers can also submit referrals on your behalf.',
  },
  {
    question: 'What documents do I need to apply?',
    answer:
      'Typically you will need proof of identity, proof of income, rental history, and references. Specific requirements vary by property and program.',
  },
  {
    question: 'How long are waitlists?',
    answer:
      'Waitlist times vary greatly depending on the property, location, and unit type. Some waitlists are months while others can be years. We recommend applying to multiple properties.',
  },
  {
    question: 'What income qualifications are there?',
    answer:
      'Income limits vary by program and are typically based on Area Median Income (AMI). Most affordable housing programs serve households earning 30-80% of AMI.',
  },
]

export default function ResourcesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
              Housing Resources
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-primary-foreground/90">
              Find information about housing assistance programs, tenant rights, and resources
              available to help you secure affordable housing in Illinois.
            </p>
          </div>
        </section>

        {/* Quick Contacts */}
        <section className="border-b border-border bg-card py-8">
          <div className="container mx-auto px-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Housing Hotline</p>
                    <p className="text-primary">1-800-555-IHDA</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email Support</p>
                    <p className="text-primary">support@ihda.org</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <HelpCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Support Hours</p>
                    <p className="text-muted-foreground">9 AM - 5 PM CST, 7 days</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Programs */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                Housing Assistance Programs
              </h2>
              <p className="mt-2 text-muted-foreground">
                Learn about programs that can help you afford housing
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <div className="mb-2">
                      <Badge variant="secondary">{resource.category}</Badge>
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <Button variant="outline" className="w-full" asChild>
                      <a href={resource.link}>
                        Learn More
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="border-y border-border bg-secondary/30 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Quick Links</h2>
              <p className="mt-2 text-muted-foreground">
                Access important housing information and services
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="cursor-pointer transition-shadow hover:shadow-md">
                <CardContent className="flex items-center gap-4 p-6">
                  <DollarSign className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">Income Guidelines</h3>
                    <p className="text-sm text-muted-foreground">Check eligibility</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer transition-shadow hover:shadow-md">
                <CardContent className="flex items-center gap-4 p-6">
                  <Shield className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">Tenant Rights</h3>
                    <p className="text-sm text-muted-foreground">Know your rights</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer transition-shadow hover:shadow-md">
                <CardContent className="flex items-center gap-4 p-6">
                  <Accessibility className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">Accessibility</h3>
                    <p className="text-sm text-muted-foreground">ADA resources</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer transition-shadow hover:shadow-md">
                <CardContent className="flex items-center gap-4 p-6">
                  <Globe className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">Multi-Language</h3>
                    <p className="text-sm text-muted-foreground">Translation services</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-2 text-muted-foreground">
                Common questions about affordable housing in Illinois
              </p>
            </div>

            <div className="mx-auto max-w-3xl space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-semibold text-foreground">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="mb-4 text-muted-foreground">
                Still have questions? Contact our support team.
              </p>
              <Button asChild>
                <a href="tel:18005551432">
                  <Phone className="mr-2 h-4 w-4" />
                  Call 1-800-555-IHDA
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-2xl font-bold text-primary-foreground">
              Ready to Find Housing?
            </h2>
            <p className="mb-6 text-primary-foreground/90">
              Start your search today and find affordable housing options across Illinois.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/search">
                <Home className="mr-2 h-4 w-4" />
                Search Housing
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
