'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Home, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Demo: redirect based on email pattern
    if (email.includes('admin')) {
      router.push('/dashboard/admin')
    } else if (email.includes('case') || email.includes('manager')) {
      router.push('/dashboard/case-manager')
    } else if (email.includes('landlord') || email.includes('property')) {
      router.push('/dashboard/landlord')
    } else {
      router.push('/')
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Panel - Branding */}
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
            Find affordable housing across Illinois
          </h1>
          <p className="text-lg text-primary-foreground/80 text-pretty">
            Search thousands of available units, join waitlists, and connect with housing resources 
            through our statewide platform.
          </p>
          <div className="flex items-center gap-4 text-sm text-primary-foreground/70">
            <span>24/7 Available</span>
            <span>|</span>
            <span>Free to use</span>
            <span>|</span>
            <span>102 Counties</span>
          </div>
        </div>

        <p className="text-sm text-primary-foreground/50">
          &copy; 2026 Illinois Housing Development Authority
        </p>
      </div>

      {/* Right Panel - Login Form */}
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
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription>Sign in to your account to continue</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-9 pr-10"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm font-normal">
                    Remember me for 30 days
                  </Label>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>Demo accounts:</p>
                <p className="mt-1">
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">admin@ihda.org</code>,{' '}
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">casemanager@agency.org</code>,{' '}
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">landlord@property.com</code>
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 border-t bg-muted/30 text-center">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="font-medium text-primary hover:underline">
                  Create one
                </Link>
              </p>
            </CardFooter>
          </Card>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-foreground">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
