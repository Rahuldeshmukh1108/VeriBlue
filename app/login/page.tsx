"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf, ArrowLeft, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
    }

    return newErrors
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = validateForm()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setIsLoading(true)

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, redirect to dashboard
    router.push("/dashboard")
    setIsLoading(false)
  }

  const handleGoogleLogin = () => {
    console.log("Google login initiated")
    // In real implementation, this would redirect to Google OAuth
    // For now, simulate successful Google login
    router.push("/dashboard")
  }

  const handleSkipLogin = (role: string) => {
    const dashboardRoutes = {
      dev: "/dashboard/developer",
      ver: "/dashboard/verifier",
      buyer: "/dashboard/buyer",
      admin: "/dashboard/admin",
    }
    router.push(dashboardRoutes[role as keyof typeof dashboardRoutes])
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
            <CardTitle className="text-2xl font-bold text-gray-900">Welcome back</CardTitle>
            <CardDescription className="text-gray-600">
              Sign in to your account to continue your climate impact journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleLogin}
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
                <span className="font-medium text-gray-700">Sign in with Google</span>
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

            <form onSubmit={handleLogin} className="space-y-5">
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
                  className={`h-11 ${
                    errors.email ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-emerald-500"
                  }`}
                />
                {errors.email && (
                  <div className="flex items-center space-x-1 text-red-500 text-xs">
                    <AlertCircle className="h-3 w-3" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password *
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-emerald-600 hover:text-emerald-700 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value })
                    if (errors.password) setErrors({ ...errors, password: "" })
                  }}
                  className={`h-11 ${
                    errors.password ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-emerald-500"
                  }`}
                />
                {errors.password && (
                  <div className="flex items-center space-x-1 text-red-500 text-xs">
                    <AlertCircle className="h-3 w-3" />
                    <span>{errors.password}</span>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <div className="mt-8 p-4 bg-emerald-50/50 rounded-lg border border-emerald-200/50">
              <p className="text-xs text-emerald-700 mb-3 text-center font-medium">🧪 Testing Shortcuts (Skip Login)</p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSkipLogin("dev")}
                  className="text-xs border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                >
                  Skip for Dev
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSkipLogin("ver")}
                  className="text-xs border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                >
                  Skip for Ver
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSkipLogin("buyer")}
                  className="text-xs border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                >
                  Skip for Buyer
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSkipLogin("admin")}
                  className="text-xs border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                >
                  Skip for Admin
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/signup" className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
