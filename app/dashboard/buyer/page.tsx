"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardSkeleton } from "@/components/loading/dashboard-skeleton"
import { EmptyMarketplace } from "@/components/empty-states/empty-marketplace"
import { BreadcrumbNav } from "@/components/navigation/breadcrumb-nav"
import { SkipLink } from "@/components/accessibility/skip-link"
import { ScreenReaderOnly } from "@/components/accessibility/screen-reader-only"
import { KeyboardNavigation } from "@/components/accessibility/keyboard-navigation"
import { useToast } from "@/hooks/use-toast"
import {
  ShoppingCart,
  TrendingUp,
  Leaf,
  Award,
  Search,
  Filter,
  MapPin,
  Star,
  Store,
  CreditCard,
  Trophy,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

export default function BuyerDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [marketplaceProjects, setMarketplaceProjects] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const { success, error } = useToast()

  const activeLeases = [
    {
      id: "LEASE-001",
      project: "Amazon Reforestation Initiative",
      credits: 10000,
      price: 25,
      progress: 75,
      impact: "2,500 trees planted",
      expires: "2024-06-15",
    },
    {
      id: "LEASE-002",
      project: "Solar Farm Development",
      credits: 5000,
      price: 30,
      progress: 45,
      impact: "15 MWh clean energy",
      expires: "2024-08-20",
    },
  ]

  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500))

        const mockProjects = [
          {
            id: "PRJ-001",
            name: "Wind Farm Project Beta",
            developer: "GreenEnergy Corp",
            type: "Renewable Energy",
            location: "Texas, USA",
            credits: 25000,
            price: 28,
            rating: 4.8,
            verified: true,
            image: "/wind-farm-renewable-energy.jpg",
          },
          {
            id: "PRJ-002",
            name: "Mangrove Restoration",
            developer: "OceanTech Solutions",
            type: "Blue Carbon",
            location: "Philippines",
            credits: 15000,
            price: 35,
            rating: 4.9,
            verified: true,
            image: "/mangrove-restoration-blue-carbon.jpg",
          },
          {
            id: "PRJ-003",
            name: "Biogas Plant Initiative",
            developer: "CleanTech Industries",
            type: "Waste Management",
            location: "Germany",
            credits: 8000,
            price: 22,
            rating: 4.6,
            verified: true,
            image: "/biogas-plant-waste-management.jpg",
          },
        ]

        setMarketplaceProjects(mockProjects)
        setIsLoading(false)
        success("Dashboard loaded", "Latest marketplace data has been updated.")
      } catch (err) {
        error("Failed to load dashboard", "Please try refreshing the page.")
        setIsLoading(false)
      }
    }

    loadData()
  }, [success, error])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
        <SkipLink />
        <KeyboardNavigation />
        <div className="max-w-7xl mx-auto p-6">
          <DashboardSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
      <SkipLink />
      <KeyboardNavigation />

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <BreadcrumbNav />

        {/* Header */}
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Buyer Dashboard</h1>
            <p className="text-gray-600 mt-1">Discover and lease carbon credits</p>
          </div>
          <nav className="flex gap-3" role="navigation" aria-label="Dashboard actions">
            <Link href="/dashboard/buyer/marketplace">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Store className="w-4 h-4" aria-hidden="true" />
                Marketplace
                <ScreenReaderOnly>- Browse carbon credit projects</ScreenReaderOnly>
              </Button>
            </Link>
            <Link href="/dashboard/buyer/portfolio">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <BarChart3 className="w-4 h-4" aria-hidden="true" />
                Portfolio
                <ScreenReaderOnly>- View your credit portfolio</ScreenReaderOnly>
              </Button>
            </Link>
            <Link href="/dashboard/buyer/rewards">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Trophy className="w-4 h-4" aria-hidden="true" />
                Rewards
                <ScreenReaderOnly>- Check your achievements</ScreenReaderOnly>
              </Button>
            </Link>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ShoppingCart className="w-4 h-4 mr-2" aria-hidden="true" />
              View Cart (3)
              <ScreenReaderOnly>- 3 items in shopping cart</ScreenReaderOnly>
            </Button>
          </nav>
        </header>

        {/* Quick Navigation Cards */}
        <section aria-label="Quick navigation">
          <ScreenReaderOnly>
            <h2>Quick Navigation</h2>
          </ScreenReaderOnly>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Link href="/dashboard/buyer/marketplace">
              <Card className="cursor-pointer hover:shadow-md transition-shadow border-blue-200 bg-white/80 backdrop-blur-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
                <CardContent className="p-4 text-center">
                  <Store className="w-8 h-8 text-blue-600 mx-auto mb-2" aria-hidden="true" />
                  <h3 className="font-semibold text-gray-900">Marketplace</h3>
                  <p className="text-sm text-gray-600">Browse projects</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard/buyer/portfolio">
              <Card className="cursor-pointer hover:shadow-md transition-shadow border-emerald-200 bg-white/80 backdrop-blur-sm focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2">
                <CardContent className="p-4 text-center">
                  <BarChart3 className="w-8 h-8 text-emerald-600 mx-auto mb-2" aria-hidden="true" />
                  <h3 className="font-semibold text-gray-900">Portfolio</h3>
                  <p className="text-sm text-gray-600">Track leases</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard/buyer/rewards">
              <Card className="cursor-pointer hover:shadow-md transition-shadow border-amber-200 bg-white/80 backdrop-blur-sm focus-within:ring-2 focus-within:ring-amber-500 focus-within:ring-offset-2">
                <CardContent className="p-4 text-center">
                  <Trophy className="w-8 h-8 text-amber-600 mx-auto mb-2" aria-hidden="true" />
                  <h3 className="font-semibold text-gray-900">Rewards</h3>
                  <p className="text-sm text-gray-600">Earn badges</p>
                </CardContent>
              </Card>
            </Link>

            <Card className="border-purple-200 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4 text-center">
                <CreditCard className="w-8 h-8 text-purple-600 mx-auto mb-2" aria-hidden="true" />
                <h3 className="font-semibold text-gray-900">Quick Lease</h3>
                <p className="text-sm text-gray-600">Fast checkout</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats Cards */}
        <section aria-label="Dashboard statistics">
          <ScreenReaderOnly>
            <h2>Your Statistics</h2>
          </ScreenReaderOnly>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-blue-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Active Leases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600" aria-label="15 active leases">
                  15
                </div>
                <p className="text-xs text-gray-500 mt-1">2 expiring soon</p>
              </CardContent>
            </Card>

            <Card className="border-emerald-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Credits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600" aria-label="125,000 total credits">
                  125K
                </div>
                <p className="text-xs text-gray-500 mt-1">Leased credits</p>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">CO₂ Offset</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600" aria-label="125 tons of CO2 offset">
                  125
                </div>
                <p className="text-xs text-gray-500 mt-1">Tons CO₂ offset</p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Impact Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600" aria-label="A plus environmental rating">
                  A+
                </div>
                <p className="text-xs text-gray-500 mt-1">Environmental rating</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Main Content */}
        <main id="main-content" tabIndex={-1} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Marketplace */}
          <section className="lg:col-span-2" aria-label="Carbon credit marketplace">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="w-5 h-5 text-blue-600" aria-hidden="true" />
                      Carbon Credit Marketplace
                    </CardTitle>
                    <CardDescription>Discover verified carbon credit projects</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" aria-label="Open filters">
                    <Filter className="w-4 h-4 mr-2" aria-hidden="true" />
                    Filters
                  </Button>
                </div>

                {/* Search and Filters */}
                <div className="flex gap-4 mt-4">
                  <div className="flex-1">
                    <label htmlFor="project-search" className="sr-only">
                      Search projects
                    </label>
                    <Input
                      id="project-search"
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      aria-describedby="search-help"
                    />
                    <div id="search-help" className="sr-only">
                      Search for carbon credit projects by name, location, or type
                    </div>
                  </div>
                  <Select>
                    <SelectTrigger className="w-40" aria-label="Filter by project type">
                      <SelectValue placeholder="Project Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="forestry">Forestry</SelectItem>
                      <SelectItem value="renewable">Renewable Energy</SelectItem>
                      <SelectItem value="waste">Waste Management</SelectItem>
                      <SelectItem value="blue">Blue Carbon</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-32" aria-label="Filter by location">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usa">USA</SelectItem>
                      <SelectItem value="brazil">Brazil</SelectItem>
                      <SelectItem value="germany">Germany</SelectItem>
                      <SelectItem value="philippines">Philippines</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {marketplaceProjects.length === 0 ? (
                  <EmptyMarketplace />
                ) : (
                  <div role="list" aria-label="Available carbon credit projects">
                    {marketplaceProjects.map((project) => (
                      <article
                        key={project.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
                        role="listitem"
                      >
                        <div className="flex gap-4">
                          <img
                            src={project.image || "/placeholder.svg"}
                            alt={`${project.name} project image`}
                            className="w-24 h-24 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                                <p className="text-sm text-gray-600">by {project.developer}</p>
                              </div>
                              <div className="text-right">
                                <div
                                  className="text-lg font-bold text-blue-600"
                                  aria-label={`$${project.price} per credit`}
                                >
                                  ${project.price}
                                </div>
                                <p className="text-xs text-gray-500">per credit</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" aria-hidden="true" />
                                <span>{project.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                                <span aria-label={`${project.rating} out of 5 stars`}>{project.rating}</span>
                              </div>
                              {project.verified && (
                                <Badge variant="default" className="bg-emerald-100 text-emerald-800">
                                  <ScreenReaderOnly>Project is </ScreenReaderOnly>
                                  Verified
                                </Badge>
                              )}
                            </div>

                            <div className="flex justify-between items-center">
                              <div>
                                <span className="text-sm font-medium">
                                  {project.credits.toLocaleString()} credits available
                                </span>
                                <Badge variant="outline" className="ml-2">
                                  {project.type}
                                </Badge>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" aria-label={`View details for ${project.name}`}>
                                  View Details
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-blue-600 hover:bg-blue-700"
                                  aria-label={`Lease credits from ${project.name}`}
                                >
                                  Lease Credits
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          {/* Sidebar */}
          <aside className="space-y-6" aria-label="Dashboard sidebar">
            {/* Active Leases */}
            <section aria-label="Your active leases">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-600" aria-hidden="true" />
                    Active Leases
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeLeases.map((lease) => (
                    <article key={lease.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{lease.project}</h4>
                        <Badge variant="outline" aria-label={`${lease.credits.toLocaleString()} credits`}>
                          {lease.credits.toLocaleString()}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{lease.impact}</p>
                      <div className="flex justify-between text-xs mb-2">
                        <span>Progress</span>
                        <span aria-label={`${lease.progress} percent complete`}>{lease.progress}%</span>
                      </div>
                      <Progress
                        value={lease.progress}
                        className="h-2 mb-2"
                        aria-label={`Project progress: ${lease.progress}%`}
                      />
                      <p className="text-xs text-gray-500">Expires: {lease.expires}</p>
                    </article>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Impact Summary */}
            <section aria-label="Your environmental impact">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-emerald-600" aria-hidden="true" />
                    Impact Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-emerald-50 rounded-lg">
                    <Award className="w-8 h-8 text-emerald-600 mx-auto mb-2" aria-hidden="true" />
                    <p className="font-semibold text-emerald-800">Climate Champion</p>
                    <p className="text-xs text-emerald-600">Top 5% of buyers</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Equivalent to:</span>
                    </div>
                    <dl className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <dt>
                          <span aria-hidden="true">🚗</span> Cars off road
                        </dt>
                        <dd className="font-medium" aria-label="27 cars worth of emissions offset">
                          27
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>
                          <span aria-hidden="true">🏠</span> Homes powered
                        </dt>
                        <dd className="font-medium" aria-label="15 homes worth of energy">
                          15
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt>
                          <span aria-hidden="true">🌳</span> Trees planted
                        </dt>
                        <dd className="font-medium" aria-label="3,125 trees planted equivalent">
                          3,125
                        </dd>
                      </div>
                    </dl>
                  </div>
                </CardContent>
              </Card>
            </section>
          </aside>
        </main>
      </div>
    </div>
  )
}
