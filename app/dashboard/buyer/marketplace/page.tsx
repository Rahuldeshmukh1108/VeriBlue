"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Leaf, Search, Filter, MapPin, DollarSign, Globe, ArrowLeft, Star, Users, Calendar } from "lucide-react"
import Link from "next/link"

// TypeScript interfaces
interface Project {
  id: string
  name: string
  type: "mangrove" | "seagrass" | "solar" | "wind" | "forest" | "peatland"
  location: string
  country: string
  pricePerCredit: number
  creditsAvailable: number
  totalCredits: number
  rating: number
  reviews: number
  image: string
  description: string
  verificationStatus: "verified" | "pending" | "unverified"
  developer: string
  estimatedDelivery: string
}

// Mock data for projects
const projects: Project[] = [
  {
    id: "1",
    name: "Sundarbans Mangrove Restoration",
    type: "mangrove",
    location: "Bangladesh",
    country: "BD",
    pricePerCredit: 25,
    creditsAvailable: 15000,
    totalCredits: 50000,
    rating: 4.8,
    reviews: 127,
    image: "/mangrove-forest-restoration.jpg",
    description: "Protecting and restoring critical mangrove ecosystems in the Sundarbans delta region.",
    verificationStatus: "verified",
    developer: "Bangladesh Forest Department",
    estimatedDelivery: "Q2 2024",
  },
  {
    id: "2",
    name: "Great Barrier Reef Seagrass Conservation",
    type: "seagrass",
    location: "Queensland, Australia",
    country: "AU",
    pricePerCredit: 32,
    creditsAvailable: 8500,
    totalCredits: 25000,
    rating: 4.9,
    reviews: 89,
    image: "/seagrass-underwater-conservation.jpg",
    description: "Restoring vital seagrass meadows that support marine biodiversity and carbon sequestration.",
    verificationStatus: "verified",
    developer: "Marine Conservation Australia",
    estimatedDelivery: "Q3 2024",
  },
  {
    id: "3",
    name: "Kenya Solar Farm Initiative",
    type: "solar",
    location: "Nairobi, Kenya",
    country: "KE",
    pricePerCredit: 18,
    creditsAvailable: 22000,
    totalCredits: 100000,
    rating: 4.6,
    reviews: 203,
    image: "/solar-farm-panels-africa.jpg",
    description: "Large-scale solar energy generation providing clean power to rural communities.",
    verificationStatus: "verified",
    developer: "Kenya Renewable Energy",
    estimatedDelivery: "Q1 2024",
  },
  {
    id: "4",
    name: "Amazon Rainforest Conservation",
    type: "forest",
    location: "Acre, Brazil",
    country: "BR",
    pricePerCredit: 28,
    creditsAvailable: 35000,
    totalCredits: 150000,
    rating: 4.7,
    reviews: 156,
    image: "/amazon-rainforest-conservation.jpg",
    description: "Protecting primary rainforest and supporting indigenous communities.",
    verificationStatus: "verified",
    developer: "Amazon Conservation Alliance",
    estimatedDelivery: "Q2 2024",
  },
  {
    id: "5",
    name: "North Sea Wind Farm",
    type: "wind",
    location: "North Sea, UK",
    country: "GB",
    pricePerCredit: 22,
    creditsAvailable: 18000,
    totalCredits: 75000,
    rating: 4.5,
    reviews: 94,
    image: "/offshore-wind-turbines-sea.jpg",
    description: "Offshore wind energy generation reducing reliance on fossil fuels.",
    verificationStatus: "verified",
    developer: "UK Wind Energy Ltd",
    estimatedDelivery: "Q4 2024",
  },
  {
    id: "6",
    name: "Indonesian Peatland Restoration",
    type: "peatland",
    location: "Sumatra, Indonesia",
    country: "ID",
    pricePerCredit: 30,
    creditsAvailable: 12000,
    totalCredits: 40000,
    rating: 4.4,
    reviews: 67,
    image: "/peatland-restoration-indonesia.jpg",
    description: "Restoring degraded peatlands to prevent fires and store carbon.",
    verificationStatus: "pending",
    developer: "Indonesian Peat Restoration Agency",
    estimatedDelivery: "Q3 2024",
  },
]

const projectTypeColors = {
  mangrove: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  seagrass: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
  solar: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  wind: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300",
  forest: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  peatland: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
}

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedCountry, setSelectedCountry] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || project.type === selectedType
    const matchesCountry = selectedCountry === "all" || project.country === selectedCountry
    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "low" && project.pricePerCredit < 20) ||
      (priceRange === "medium" && project.pricePerCredit >= 20 && project.pricePerCredit < 30) ||
      (priceRange === "high" && project.pricePerCredit >= 30)

    return matchesSearch && matchesType && matchesCountry && matchesPrice
  })

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
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Carbon Credit Marketplace</h1>
          <p className="text-muted-foreground">
            Discover and purchase verified carbon credits from projects around the world
          </p>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Advanced Filtering & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Project Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="mangrove">Mangrove</SelectItem>
                  <SelectItem value="seagrass">Seagrass</SelectItem>
                  <SelectItem value="solar">Solar</SelectItem>
                  <SelectItem value="wind">Wind</SelectItem>
                  <SelectItem value="forest">Forest</SelectItem>
                  <SelectItem value="peatland">Peatland</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  <SelectItem value="BD">Bangladesh</SelectItem>
                  <SelectItem value="AU">Australia</SelectItem>
                  <SelectItem value="KE">Kenya</SelectItem>
                  <SelectItem value="BR">Brazil</SelectItem>
                  <SelectItem value="GB">United Kingdom</SelectItem>
                  <SelectItem value="ID">Indonesia</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="low">Under $20</SelectItem>
                  <SelectItem value="medium">$20 - $30</SelectItem>
                  <SelectItem value="high">Over $30</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="flex-1"
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("map")}
                  className="flex-1"
                >
                  Map
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>

        {/* Project Grid */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={projectTypeColors[project.type]}>
                      {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant={project.verificationStatus === "verified" ? "default" : "secondary"}>
                      {project.verificationStatus}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {project.location}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{project.rating}</span>
                        <span className="text-sm text-muted-foreground">({project.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {project.developer}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span className="font-bold text-primary">${project.pricePerCredit}</span>
                        <span className="text-sm text-muted-foreground">per credit</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {project.creditsAvailable.toLocaleString()} available
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {project.estimatedDelivery}
                      </div>
                      <div>{Math.round((project.creditsAvailable / project.totalCredits) * 100)}% available</div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button asChild className="flex-1">
                      <Link href={`/dashboard/buyer/projects/${project.id}`}>View Details</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/dashboard/buyer/checkout?project=${project.id}`}>Buy Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // Map View Placeholder
          <Card className="h-96">
            <CardContent className="h-full flex items-center justify-center">
              <div className="text-center">
                <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Interactive Map View</h3>
                <p className="text-muted-foreground">
                  Map integration coming soon. View all project locations on an interactive world map.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
