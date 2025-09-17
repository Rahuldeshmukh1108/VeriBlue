import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, MapPin, Star, ShoppingCart } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function MarketplacePage() {
  const featuredProjects = [
    {
      id: "PRJ-001",
      name: "Amazon Rainforest Conservation",
      developer: "EcoTech Solutions",
      type: "Forestry",
      location: "Brazil",
      credits: 100000,
      price: 32,
      rating: 4.9,
      verified: true,
      impact: "500,000 trees protected",
      image: "/amazon-rainforest.png",
    },
    {
      id: "PRJ-002",
      name: "Offshore Wind Farm Alpha",
      developer: "GreenEnergy Corp",
      type: "Renewable Energy",
      location: "North Sea",
      credits: 75000,
      price: 28,
      rating: 4.8,
      verified: true,
      impact: "150 MW clean energy",
      image: "/wind-farm-renewable-energy.jpg",
    },
    {
      id: "PRJ-003",
      name: "Mangrove Restoration Project",
      developer: "OceanTech Solutions",
      type: "Blue Carbon",
      location: "Philippines",
      credits: 50000,
      price: 35,
      rating: 4.9,
      verified: true,
      impact: "2,000 hectares restored",
      image: "/mangrove-restoration-blue-carbon.jpg",
    },
  ]

  const allProjects = [
    ...featuredProjects,
    {
      id: "PRJ-004",
      name: "Biogas Plant Initiative",
      developer: "CleanTech Industries",
      type: "Waste Management",
      location: "Germany",
      credits: 25000,
      price: 22,
      rating: 4.6,
      verified: true,
      impact: "50,000 tons waste processed",
      image: "/biogas-plant-waste-management.jpg",
    },
    {
      id: "PRJ-005",
      name: "Solar Farm Development",
      developer: "SunPower Solutions",
      type: "Renewable Energy",
      location: "California, USA",
      credits: 60000,
      price: 26,
      rating: 4.7,
      verified: true,
      impact: "100 MW solar capacity",
      image: "/expansive-solar-farm.png",
    },
  ]

  return (
    <DashboardLayout userRole="buyer" userName="Alex Johnson">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Carbon Credit Marketplace</h1>
              <p className="text-gray-600 mt-1">Discover and lease verified carbon credits from global projects</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart (3)
            </Button>
          </div>

          {/* Search and Filters */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search projects by name, location, or developer..."
                    className="w-full"
                    icon={<Search className="w-4 h-4" />}
                  />
                </div>
                <div className="flex gap-4">
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Project Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="forestry">Forestry</SelectItem>
                      <SelectItem value="renewable">Renewable Energy</SelectItem>
                      <SelectItem value="waste">Waste Management</SelectItem>
                      <SelectItem value="blue">Blue Carbon</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="usa">USA</SelectItem>
                      <SelectItem value="brazil">Brazil</SelectItem>
                      <SelectItem value="germany">Germany</SelectItem>
                      <SelectItem value="philippines">Philippines</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </div>

              {/* Price Range */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Price Range:</span>
                  <div className="flex-1 max-w-xs">
                    <Slider defaultValue={[20, 40]} max={50} step={1} className="w-full" />
                  </div>
                  <span className="text-sm text-gray-600">$20 - $40 per credit</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Featured Projects */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <Card key={project.id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-3 right-3 bg-emerald-600">Featured</Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 line-clamp-1">{project.name}</h3>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">${project.price}</div>
                        <p className="text-xs text-gray-500">per credit</p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">by {project.developer}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {project.rating}
                      </div>
                    </div>

                    <div className="mb-3">
                      <Badge variant="outline" className="mr-2">
                        {project.type}
                      </Badge>
                      {project.verified && (
                        <Badge variant="default" className="bg-emerald-100 text-emerald-800">
                          Verified
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mb-3">{project.impact}</p>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{project.credits.toLocaleString()} available</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Lease
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Projects */}
          <Tabs defaultValue="grid" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">All Projects</h2>
              <TabsList>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="grid" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProjects.map((project) => (
                  <Card key={project.id} className="bg-white/80 backdrop-blur-sm hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.name}
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900 line-clamp-1">{project.name}</h3>
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-600">${project.price}</div>
                          <p className="text-xs text-gray-500">per credit</p>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-2">by {project.developer}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {project.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          {project.rating}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{project.type}</Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Lease
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list" className="space-y-4">
              {allProjects.map((project) => (
                <Card key={project.id} className="bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.name}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{project.name}</h3>
                            <p className="text-sm text-gray-600">by {project.developer}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-blue-600">${project.price}</div>
                            <p className="text-xs text-gray-500">per credit</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {project.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {project.rating}
                          </div>
                          <Badge variant="outline">{project.type}</Badge>
                          {project.verified && (
                            <Badge variant="default" className="bg-emerald-100 text-emerald-800">
                              Verified
                            </Badge>
                          )}
                        </div>

                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-sm font-medium">
                              {project.credits.toLocaleString()} credits available
                            </span>
                            <p className="text-xs text-gray-500">{project.impact}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              Lease Credits
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
