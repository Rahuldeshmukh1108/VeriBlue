"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Leaf, ArrowLeft, Users, Shield, TrendingUp, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const roles = [
  {
    value: "developer",
    label: "Project Developer",
    icon: Users,
    description: "Create and manage carbon credit projects",
  },
  {
    value: "verifier",
    label: "Verifier / Auditor",
    icon: Shield,
    description: "Verify and audit carbon credit projects",
  },
  {
    value: "buyer",
    label: "Corporate Buyer",
    icon: TrendingUp,
    description: "Purchase verified carbon credits for your business",
  },
]

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    role: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showGoogleRoleModal, setShowGoogleRoleModal] = useState(false)
  const router = useRouter()

  const validatePassword = (password: string) => {
    if (password.length < 8) return "Password must be at least 8 characters long"
    if (!/(?=.*[a-z])/.test(password)) return "Password must contain at least one lowercase letter"
    if (!/(?=.*[A-Z])/.test(password)) return "Password must contain at least one uppercase letter"
    if (!/(?=.*\d)/.test(password)) return "Password must contain at least one number"
    return ""
  }

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "") // Remove non-digits
    if (value.length <= 10) {
      setFormData({ ...formData, mobile: value })
      if (errors.mobile) {
        setErrors({ ...errors, mobile: "" })
      }
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Full name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email"

    const passwordError = validatePassword(formData.password)
    if (!formData.password) newErrors.password = "Password is required"
    else if (passwordError) newErrors.password = passwordError

    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password"
    else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required"
    else if (formData.mobile.length !== 10) newErrors.mobile = "Mobile number must be 10 digits"

    if (!formData.role) newErrors.role = "Please select a role"

    return newErrors
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = validateForm()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setIsLoading(true)

    // Simulate signup process
    await new Promise((resolve) => setTimeout(resolve, 1000))

    router.push(`/onboarding?role=${formData.role}`)
    setIsLoading(false)
  }

  const handleGoogleSignup = () => {
    setShowGoogleRoleModal(true)
  }

  const handleGoogleRoleSelection = (selectedRole: string) => {
    setShowGoogleRoleModal(false)
    // Simulate Google OAuth flow with role
    console.log("Google signup initiated with role:", selectedRole)
    // In real implementation, this would redirect to Google OAuth with role parameter
    // For now, simulate successful Google signup and redirect to onboarding
    router.push(`/onboarding?role=${selectedRole}&googleAuth=true`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-2 bg-emerald-100 rounded-xl">
              <Leaf className="h-8 w-8 text-emerald-600" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Carbon Fiesta
            </span>
          </div>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">Create your account</CardTitle>
            <CardDescription className="text-gray-600">Join the transparent carbon credit ecosystem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignup}
                className="w-full h-12 border-gray-300 hover:bg-gray-50 flex items-center justify-center space-x-3 bg-transparent"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="font-medium text-gray-700">Sign up with Google</span>
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSignup} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value })
                    if (errors.name) setErrors({ ...errors, name: "" })
                  }}
                  className={`h-11 ${errors.name ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-emerald-500"}`}
                />
                {errors.name && (
                  <div className="flex items-center space-x-1 text-red-500 text-xs">
                    <AlertCircle className="h-3 w-3" />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value })
                    if (errors.email) setErrors({ ...errors, email: "" })
                  }}
                  className={`h-11 ${errors.email ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-emerald-500"}`}
                />
                {errors.email && (
                  <div className="flex items-center space-x-1 text-red-500 text-xs">
                    <AlertCircle className="h-3 w-3" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Create Password *
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value })
                    if (errors.password) setErrors({ ...errors, password: "" })
                  }}
                  className={`h-11 ${errors.password ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-emerald-500"}`}
                />
                {errors.password && (
                  <div className="flex items-center space-x-1 text-red-500 text-xs">
                    <AlertCircle className="h-3 w-3" />
                    <span>{errors.password}</span>
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  Must contain 8+ characters with uppercase, lowercase, and number
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm Password *
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData({ ...formData, confirmPassword: e.target.value })
                    if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" })
                  }}
                  className={`h-11 ${errors.confirmPassword ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-emerald-500"}`}
                />
                {errors.confirmPassword && (
                  <div className="flex items-center space-x-1 text-red-500 text-xs">
                    <AlertCircle className="h-3 w-3" />
                    <span>{errors.confirmPassword}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-sm font-medium text-gray-700">
                  Mobile Number *
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
                    +91
                  </div>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="9876543210"
                    value={formData.mobile}
                    onChange={handleMobileChange}
                    className={`h-11 pl-12 ${errors.mobile ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-emerald-500"}`}
                    maxLength={10}
                  />
                </div>
                {errors.mobile && (
                  <div className="flex items-center space-x-1 text-red-500 text-xs">
                    <AlertCircle className="h-3 w-3" />
                    <span>{errors.mobile}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                  Role Selection *
                </Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => {
                    setFormData({ ...formData, role: value })
                    if (errors.role) setErrors({ ...errors, role: "" })
                  }}
                >
                  <SelectTrigger
                    className={`h-11 ${errors.role ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-emerald-500"}`}
                  >
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        <div className="flex items-center space-x-3 py-2">
                          <div className="p-1.5 bg-emerald-100 rounded-lg">
                            <role.icon className="h-4 w-4 text-emerald-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{role.label}</div>
                            <div className="text-xs text-gray-500">{role.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.role && (
                  <div className="flex items-center space-x-1 text-red-500 text-xs">
                    <AlertCircle className="h-3 w-3" />
                    <span>{errors.role}</span>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {showGoogleRoleModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold text-gray-900">Select Your Role</CardTitle>
                <CardDescription className="text-gray-600">
                  Choose your role to continue with Google signup
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {roles.map((role) => (
                  <Button
                    key={role.value}
                    variant="outline"
                    onClick={() => handleGoogleRoleSelection(role.value)}
                    className="w-full h-auto p-4 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <role.icon className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{role.label}</div>
                        <div className="text-sm text-gray-500">{role.description}</div>
                      </div>
                    </div>
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  onClick={() => setShowGoogleRoleModal(false)}
                  className="w-full mt-4 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
