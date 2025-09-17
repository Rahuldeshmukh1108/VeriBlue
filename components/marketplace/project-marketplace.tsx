"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useBlockchain } from "@/hooks/use-blockchain"
import {
  Search,
  Filter,
  MapPin,
  Star,
  ShoppingCart,
  Eye,
  Zap,
  TreePine,
  Droplets,
  Wind,
  Factory,
  CheckCircle,
  Clock,
} from "lucide-react"

interface CarbonProject {
  id: string
  name: string
  developer: string
  type: "Forestry" | "Renewable Energy" | "Blue Carbon" | "Waste Management" | "Direct Air Capture"
  location: string
  country: string
  credits: number
  price: number
  rating: number
  verified: boolean
  image: string
  description: string
  methodology: string
  vintage: number
  additionality: number
  permanence: number
  cobenefits: string[]
  projectStart: string
  creditingPeriod: string
  lastUpdated: string
  availableCredits: number
  totalCredits: number
  impactMetrics: {
    co2Reduced: number
    treesPlanted?: number
    energyGenerated?: number
    wasteProcessed?: number
  }
}

interface MarketplaceFilters {
  search: string
  type: string
  location: string
  priceRange: [number, number]
  rating: number
  vintage: string
  sortBy: string
}

export function ProjectMarketplace() {
  const [projects, setProjects] = useState<CarbonProject[]>([])
  const [filteredProjects, setFilteredProjects] = useState<CarbonProject[]>([])
  const [filters, setFilters] = useState<MarketplaceFilters>({
    search: "",
    type: "Forestry", // Updated default value
    location: "",
    priceRange: [0, 100],
    rating: 0,
    vintage: "",
    sortBy: "newest",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [cart, setCart] = useState<{ projectId: string; credits: number }[]>([])
  const { success, error } = useToast()
  const { isConnected } = useBlockchain()

  useEffect(() => {
    const loadProjects = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockProjects: CarbonProject[] = [
          {
            id: "PRJ-001",
            name: "Amazon Rainforest Conservation",
            developer: "EcoTech Solutions",
            type: "Forestry",
            location: "Acre, Brazil",
            country: "Brazil",
            credits: 50000,
            price: 32,
            rating: 4.9,
            verified: true,
            image: "/placeholder-5m2a3.png",
            description:
              "Large-scale rainforest conservation project protecting 10,000 hectares of pristine Amazon rainforest",
            methodology: "REDD+ Methodology",
            vintage: 2024,
            additionality: 0.95,
            permanence: 0.92,
            cobenefits: ["Biodiversity", "Community Development", "Water Conservation"],
            projectStart: "2023-01-15",
            creditingPeriod: "2024-2034",
            lastUpdated: "2024-03-15T10:30:00Z",
            availableCredits: 45000,
            totalCredits: 50000,
            impactMetrics: {
              co2Reduced: 50000,
              treesPlanted: 125000,
            },
          },
          {
            id: "PRJ-002",
            name: "Offshore Wind Farm Alpha",
            developer: "GreenEnergy Corp",
            type: "Renewable Energy",
            location: "North Sea, UK",
            country: "United Kingdom",
            credits: 75000,
            price: 28,
            rating: 4.8,
            verified: true,
            image: "/placeholder-292r7.png",
            description: "State-of-the-art offshore wind farm generating clean energy for 200,000 homes",
            methodology: "CDM Methodology",
            vintage: 2024,
            additionality: 0.98,
            permanence: 0.99,
            cobenefits: ["Clean Energy", "Job Creation", "Energy Security"],
            projectStart: "2022-06-01",
            creditingPeriod: "2024-2031",
            lastUpdated: "2024-03-14T16:20:00Z",
            availableCredits: 68000,
            totalCredits: 75000,
            impactMetrics: {
              co2Reduced: 75000,
              energyGenerated: 450000, // MWh
            },
          },
          {
            id: "PRJ-003",
            name: "Mangrove Restoration Initiative",
            developer: "OceanTech Solutions",
            type: "Blue Carbon",
            location: "Palawan, Philippines",
            country: "Philippines",
            credits: 25000,
            price: 38,
            rating: 4.7,
            verified: true,
            image: "/placeholder-1tkjl.png",
            description: "Comprehensive mangrove restoration protecting coastal communities and marine ecosystems",
            methodology: "Blue Carbon Methodology",
            vintage: 2024,
            additionality: 0.89,
            permanence: 0.87,
            cobenefits: ["Coastal Protection", "Fisheries", "Tourism"],
            projectStart: "2023-03-01",
            creditingPeriod: "2024-2040",
            lastUpdated: "2024-03-13T09:15:00Z",
            availableCredits: 22000,
            totalCredits: 25000,
            impactMetrics: {
              co2Reduced: 25000,
              treesPlanted: 50000,
            },
          },
          {
            id: "PRJ-004",
            name: "Biogas Plant Network",
            developer: "CleanTech Industries",
            type: "Waste Management",
            location: "Bavaria, Germany",
            country: "Germany",
            credits: 18000,
            price: 24,
            rating: 4.6,
            verified: true,
            image: "/placeholder-hbtit.png",
            description: "Network of biogas plants converting agricultural waste into clean energy",
            methodology: "Waste Management Methodology",
            vintage: 2024,
            additionality: 0.93,
            permanence: 0.95,
            cobenefits: ["Waste Reduction", "Rural Development", "Energy Independence"],
            projectStart: "2023-09-01",
            creditingPeriod: "2024-2029",
            lastUpdated: "2024-03-12T14:45:00Z",
            availableCredits: 15000,
            totalCredits: 18000,
            impactMetrics: {
              co2Reduced: 18000,
              wasteProcessed: 50000, // tons
            },
          },
          {
            id: "PRJ-005",
            name: "Direct Air Capture Facility",
            developer: "CarbonTech Innovations",
            type: "Direct Air Capture",
            location: "Iceland",
            country: "Iceland",
            credits: 30000,
            price: 85,
            rating: 4.5,
            verified: true,
            image: "/placeholder-a2oiq.png",
            description: "Advanced direct air capture facility powered by geothermal energy",
            methodology: "Direct Air Capture Methodology",
            vintage: 2024,
            additionality: 1.0,
            permanence: 0.99,
            cobenefits: ["Technology Innovation", "Permanent Storage", "Scalability"],
            projectStart: "2023-11-01",
            creditingPeriod: "2024-2050",
            lastUpdated: "2024-03-11T11:30:00Z",
            availableCredits: 28000,
            totalCredits: 30000,
            impactMetrics: {
              co2Reduced: 30000,
            },
          },
        ]

        setProjects(mockProjects)
        setFilteredProjects(mockProjects)
        setIsLoading(false)
      } catch (err) {
        error("Failed to load projects", "Please try refreshing the page")
        setIsLoading(false)
      }
    }

    loadProjects()
  }, [error])

  useEffect(() => {
    let filtered = [...projects]

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          project.developer.toLowerCase().includes(filters.search.toLowerCase()) ||
          project.location.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    // Type filter
    if (filters.type) {
      filtered = filtered.filter((project) => project.type === filters.type)
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter((project) => project.country === filters.location)
    }

    // Price range filter
    filtered = filtered.filter(
      (project) => project.price >= filters.priceRange[0] && project.price <= filters.priceRange[1],
    )

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((project) => project.rating >= filters.rating)
    }

    // Vintage filter
    if (filters.vintage) {
      filtered = filtered.filter((project) => project.vintage.toString() === filters.vintage)
    }

    // Sort
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "credits":
        filtered.sort((a, b) => b.availableCredits - a.availableCredits)
        break
      default:
        filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    }

    setFilteredProjects(filtered)
  }, [projects, filters])

  const addToCart = (projectId: string, credits: number) => {
    if (!isConnected) {
      error("Wallet Required", "Please connect your wallet to purchase credits")
      return
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.projectId === projectId)
      if (existing) {
        return prev.map((item) => (item.projectId === projectId ? { ...item, credits: item.credits + credits } : item))
      }
      return [...prev, { projectId, credits }]
    })

    success("Added to Cart", `${credits} credits added to your cart`)
  }

  const getProjectIcon = (type: string) => {
    switch (type) {
      case "Forestry":
        return TreePine
      case "Renewable Energy":
        return Zap
      case "Blue Carbon":
        return Droplets
      case "Waste Management":
        return Factory
      case "Direct Air Capture":
        return Wind
      default:
        return TreePine
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Marketplace Filters
          </CardTitle>
          <CardDescription>Find the perfect carbon credit projects for your needs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search Projects</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name, developer, or location..."
                  value={filters.search}
                  onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="type">Project Type</Label>
              <Select value={filters.type} onValueChange={(value) => setFilters((prev) => ({ ...prev, type: value }))}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Forestry" /> {/* Updated default value */}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Forestry">Forestry</SelectItem>
                  <SelectItem value="Renewable Energy">Renewable Energy</SelectItem>
                  <SelectItem value="Blue Carbon">Blue Carbon</SelectItem>
                  <SelectItem value="Waste Management">Waste Management</SelectItem>
                  <SelectItem value="Direct Air Capture">Direct Air Capture</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Select
                value={filters.location}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, location: value }))}
              >
                <SelectTrigger id="location">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  <SelectItem value="Brazil">Brazil</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="Philippines">Philippines</SelectItem>
                  <SelectItem value="Germany">Germany</SelectItem>
                  <SelectItem value="Iceland">Iceland</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="sort">Sort By</Label>
              <Select
                value={filters.sortBy}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, sortBy: value }))}
              >
                <SelectTrigger id="sort">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="credits">Most Credits</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>
                Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]} per credit
              </Label>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, priceRange: value as [number, number] }))}
                max={100}
                min={0}
                step={5}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Minimum Rating: {filters.rating > 0 ? `${filters.rating}+ stars` : "Any"}</Label>
              <Slider
                value={[filters.rating]}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, rating: value[0] }))}
                max={5}
                min={0}
                step={0.5}
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing {filteredProjects.length} of {projects.length} projects
        </p>
        <div className="flex items-center space-x-2">
          <ShoppingCart className="h-4 w-4" />
          <span className="text-sm font-medium">Cart: {cart.reduce((sum, item) => sum + item.credits, 0)} credits</span>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const Icon = getProjectIcon(project.type)
          const cartItem = cart.find((item) => item.projectId === project.id)

          return (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={`${project.name} project`}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-gray-800">
                    <Icon className="h-3 w-3 mr-1" />
                    {project.type}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  {project.verified && (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>

              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription>by {project.developer}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">${project.price}</div>
                    <p className="text-xs text-muted-foreground">per credit</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {project.location}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                    {project.rating}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Available Credits</span>
                    <span className="font-medium">{project.availableCredits.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Vintage</span>
                    <span className="font-medium">{project.vintage}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Additionality</span>
                    <span className="font-medium">{Math.round(project.additionality * 100)}%</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {project.cobenefits.slice(0, 2).map((benefit) => (
                    <Badge key={benefit} variant="outline" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                  {project.cobenefits.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.cobenefits.length - 2} more
                    </Badge>
                  )}
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Eye className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => addToCart(project.id, 100)}
                    disabled={!isConnected}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    {cartItem ? `+${cartItem.credits}` : "Buy"}
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Updated {new Date(project.lastUpdated).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">No Projects Found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your filters to see more projects</p>
            <Button
              onClick={() =>
                setFilters({
                  search: "",
                  type: "Forestry",
                  location: "",
                  priceRange: [0, 100],
                  rating: 0,
                  vintage: "",
                  sortBy: "newest",
                })
              }
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
