'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Home, Mail, Lock, User, Phone, Building2, ArrowRight, ArrowLeft } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState('public')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    organization: '',
    agreeTerms: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Demo: redirect based on user type
    switch (userType) {
      case 'landlord':
        router.push('/dashboard/landlord')
        break
      case 'case_manager':
        router.push('/dashboard/case-manager')
        break
      default:
        router.push('/')
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Panel */}
      <div className="hidden w-1/2 bg-primary lg:flex lg:flex-col lg:justify-between p-12">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/20">
              <Home className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <p className="text-xl font-bold text-primary-foreground">IHDA Housing Locator</p>
              <p className="text-sm text-primary-foreground/70">Illinois Housing Development Authority</p>
            </div>
          </Link>
        </div>
        
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-primary-foreground leading-tight text-balance">
            Join the Illinois Housing Network
          </h1>
          <p className="text-lg text-primary-foreground/80 text-pretty">
            Whether you&apos;re searching for housing, listing properties, or helping clients find homes, 
            our platform connects you with opportunities statewide.
          </p>
          
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20 text-primary-foreground">
                <User className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-primary-foreground">Public Users</p>
                <p className="text-sm text-primary-foreground/70">Search and save housing listings</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20 text-primary-foreground">
                <Building2 className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-primary-foreground">Property Owners</p>
                <p className="text-sm text-primary-foreground/70">List units and manage waitlists</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20 text-primary-foreground">
                <User className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-primary-foreground">Case Managers</p>
                <p className="text-sm text-primary-foreground/70">Submit referrals for clients</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-primary-foreground/50">
          &copy; 2026 Illinois Housing Development Authority
        </p>
      </div>

      {/* Right Panel - Registration Form */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12 lg:px-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-8 text-center lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Home className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">IHDA Housing</span>
            </Link>
          </div>

          <Card className="border-0 shadow-xl lg:border lg:shadow-none">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Create your account</CardTitle>
              <CardDescription>
                {step === 1 ? 'Choose your account type' : 'Enter your details'}
              </CardDescription>
              {/* Progress indicator */}
              <div className="mt-4 flex justify-center gap-2">
                <div className={`h-2 w-16 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-muted'}`} />
                <div className={`h-2 w-16 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-4">
                    <Label>I am a...</Label>
                    <RadioGroup value={userType} onValueChange={setUserType} className="space-y-3">
                      <div className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:bg-muted/50 cursor-pointer">
                        <RadioGroupItem value="public" id="public" />
                        <Label htmlFor="public" className="flex-1 cursor-pointer">
                          <span className="font-medium">Housing Seeker</span>
                          <p className="text-sm text-muted-foreground">
                            I&apos;m looking for affordable housing
                          </p>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:bg-muted/50 cursor-pointer">
                        <RadioGroupItem value="landlord" id="landlord" />
                        <Label htmlFor="landlord" className="flex-1 cursor-pointer">
                          <span className="font-medium">Property Owner / Landlord</span>
                          <p className="text-sm text-muted-foreground">
                            I want to list affordable housing units
                          </p>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:bg-muted/50 cursor-pointer">
                        <RadioGroupItem value="case_manager" id="case_manager" />
                        <Label htmlFor="case_manager" className="flex-1 cursor-pointer">
                          <span className="font-medium">Case Manager</span>
                          <p className="text-sm text-muted-foreground">
                            I help clients find housing through an agency
                          </p>
                        </Label>
                      </div>
                    </RadioGroup>
                    <Button
                      type="button"
                      className="w-full mt-4"
                      size="lg"
                      onClick={() => setStep(2)}
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div className="grid gap-4 grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({ ...formData, firstName: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({ ...formData, lastName: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="pl-9"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(555) 555-5555"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="pl-9"
                        />
                      </div>
                    </div>

                    {(userType === 'landlord' || userType === 'case_manager') && (
                      <div className="space-y-2">
                        <Label htmlFor="organization">Organization Name</Label>
                        <Input
                          id="organization"
                          placeholder={
                            userType === 'landlord'
                              ? 'Property management company'
                              : 'Housing agency or organization'
                          }
                          value={formData.organization}
                          onChange={(e) =>
                            setFormData({ ...formData, organization: e.target.value })
                          }
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Create a password"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                          }
                          className="pl-9"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            setFormData({ ...formData, confirmPassword: e.target.value })
                          }
                          className="pl-9"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, agreeTerms: checked as boolean })
                        }
                        required
                      />
                      <Label htmlFor="terms" className="text-sm font-normal leading-tight">
                        I agree to the{' '}
                        <Link href="/terms" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <Button type="submit" className="flex-1">
                        Create Account
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 border-t bg-muted/30 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
