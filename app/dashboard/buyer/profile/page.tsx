"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Leaf,
  ArrowLeft,
  User,
  Building2,
  Mail,
  Calendar,
  Camera,
  Save,
  CheckCircle,
  AlertCircle,
  Wallet,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

// TypeScript interfaces
interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar: string
  bio: string
  company: {
    name: string
    industry: string
    size: string
    website: string
    address: {
      street: string
      city: string
      state: string
      country: string
      zipCode: string
    }
  }
  preferences: {
    newsletter: boolean
    marketingEmails: boolean
    projectUpdates: boolean
    transactionNotifications: boolean
  }
  stats: {
    joinedDate: string
    totalCredits: number
    totalSpent: number
    projectsSupported: number
    co2Offset: number
  }
  wallets: Array<{
    address: string
    network: string
    isDefault: boolean
  }>
}

// Mock user data
const userProfile: UserProfile = {
  id: "1",
  firstName: "Sarah",
  lastName: "Chen",
  email: "sarah.chen@ecotech.com",
  phone: "+1 (555) 123-4567",
  avatar: "/placeholder.svg",
  bio: "Sustainability Director at EcoTech Solutions, passionate about driving corporate climate action through innovative carbon offset strategies.",
  company: {
    name: "EcoTech Solutions",
    industry: "Technology",
    size: "500-1000 employees",
    website: "https://ecotech.com",
    address: {
      street: "123 Green Street",
      city: "San Francisco",
      state: "CA",
      country: "United States",
      zipCode: "94105",
    },
  },
  preferences: {
    newsletter: true,
    marketingEmails: false,
    projectUpdates: true,
    transactionNotifications: true,
  },
  stats: {
    joinedDate: "2023-12-01",
    totalCredits: 2847,
    totalSpent: 284750,
    projectsSupported: 12,
    co2Offset: 15420,
  },
  wallets: [
    {
      address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5b8e",
      network: "Ethereum",
      isDefault: true,
    },
    {
      address: "0x8ba1f109551bD432803012645Hac136c22C501e5",
      network: "Polygon",
      isDefault: false,
    },
  ],
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(userProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")

  const handleSave = async () => {
    setSaveStatus("saving")

    // Simulate API call
    setTimeout(() => {
      setSaveStatus("saved")
      setIsEditing(false)

      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus("idle")
      }, 3000)
    }, 1500)
  }

  const handleCancel = () => {
    setProfile(userProfile) // Reset to original data
    setIsEditing(false)
    setSaveStatus("idle")
  }

  const updateProfile = (field: string, value: any) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateCompany = (field: string, value: any) => {
    setProfile((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        [field]: value,
      },
    }))
  }

  const updateAddress = (field: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        address: {
          ...prev.company.address,
          [field]: value,
        },
      },
    }))
  }

  const updatePreferences = (field: string, value: boolean) => {
    setProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value,
      },
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Navigation Header */}
      <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/buyer" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">Carbon Fiesta</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={profile.avatar || "/placeholder.svg"} alt="User" />
              <AvatarFallback>
                {profile.firstName[0]}
                {profile.lastName[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Profile & Settings</h1>
            <p className="text-muted-foreground">Manage your account information and preferences</p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saveStatus === "saving"}>
                  {saveStatus === "saving" ? (
                    <>
                      <Save className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <User className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Save Status Alert */}
        {saveStatus === "saved" && (
          <Alert className="mb-6 border-green-200 bg-green-50 dark:bg-green-950">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription>Profile updated successfully!</AlertDescription>
          </Alert>
        )}

        {saveStatus === "error" && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Failed to update profile. Please try again.</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="relative inline-block">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profile.avatar || "/placeholder.svg"} alt="Profile" />
                      <AvatarFallback className="text-2xl">
                        {profile.firstName[0]}
                        {profile.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-transparent"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">
                      {profile.firstName} {profile.lastName}
                    </h2>
                    <p className="text-muted-foreground">{profile.company.name}</p>
                  </div>

                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Member since {new Date(profile.stats.joinedDate).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Impact Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{profile.stats.totalCredits.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Credits Owned</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary">{profile.stats.co2Offset.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">tonnes CO₂</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent-foreground">{profile.stats.projectsSupported}</div>
                    <div className="text-xs text-muted-foreground">Projects</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-chart-4">
                      ${(profile.stats.totalSpent / 1000).toFixed(0)}K
                    </div>
                    <div className="text-xs text-muted-foreground">Invested</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Wallets Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-secondary" />
                  Connected Wallets
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {profile.wallets.map((wallet, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{wallet.network}</div>
                      <div className="text-xs text-muted-foreground font-mono">
                        {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                      </div>
                    </div>
                    {wallet.isDefault && (
                      <Badge variant="secondary" className="text-xs">
                        Default
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="company">Company Details</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              {/* Personal Information Tab */}
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>Update your personal details and contact information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profile.firstName}
                          onChange={(e) => updateProfile("firstName", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profile.lastName}
                          onChange={(e) => updateProfile("lastName", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => updateProfile("email", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => updateProfile("phone", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => updateProfile("bio", e.target.value)}
                        disabled={!isEditing}
                        rows={4}
                        placeholder="Tell us about yourself and your role in sustainability..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Company Details Tab */}
              <TabsContent value="company">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-secondary" />
                      Company Details
                    </CardTitle>
                    <CardDescription>Manage your organization information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                          id="companyName"
                          value={profile.company.name}
                          onChange={(e) => updateCompany("name", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Input
                          id="industry"
                          value={profile.company.industry}
                          onChange={(e) => updateCompany("industry", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companySize">Company Size</Label>
                        <Input
                          id="companySize"
                          value={profile.company.size}
                          onChange={(e) => updateCompany("size", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={profile.company.website}
                          onChange={(e) => updateCompany("website", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">Company Address</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="street">Street Address</Label>
                          <Input
                            id="street"
                            value={profile.company.address.street}
                            onChange={(e) => updateAddress("street", e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              value={profile.company.address.city}
                              onChange={(e) => updateAddress("city", e.target.value)}
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State/Province</Label>
                            <Input
                              id="state"
                              value={profile.company.address.state}
                              onChange={(e) => updateAddress("state", e.target.value)}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input
                              id="country"
                              value={profile.company.address.country}
                              onChange={(e) => updateAddress("country", e.target.value)}
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                            <Input
                              id="zipCode"
                              value={profile.company.address.zipCode}
                              onChange={(e) => updateAddress("zipCode", e.target.value)}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preferences Tab */}
              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-accent-foreground" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>Manage your email and notification settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Newsletter</div>
                          <div className="text-sm text-muted-foreground">
                            Receive our monthly newsletter with platform updates and climate insights
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={profile.preferences.newsletter}
                          onChange={(e) => updatePreferences("newsletter", e.target.checked)}
                          disabled={!isEditing}
                          className="h-4 w-4"
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Marketing Emails</div>
                          <div className="text-sm text-muted-foreground">
                            Receive promotional emails about new features and special offers
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={profile.preferences.marketingEmails}
                          onChange={(e) => updatePreferences("marketingEmails", e.target.checked)}
                          disabled={!isEditing}
                          className="h-4 w-4"
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Project Updates</div>
                          <div className="text-sm text-muted-foreground">
                            Get notified about updates from projects you've supported
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={profile.preferences.projectUpdates}
                          onChange={(e) => updatePreferences("projectUpdates", e.target.checked)}
                          disabled={!isEditing}
                          className="h-4 w-4"
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Transaction Notifications</div>
                          <div className="text-sm text-muted-foreground">
                            Receive confirmations for purchases, retirements, and other transactions
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={profile.preferences.transactionNotifications}
                          onChange={(e) => updatePreferences("transactionNotifications", e.target.checked)}
                          disabled={!isEditing}
                          className="h-4 w-4"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
