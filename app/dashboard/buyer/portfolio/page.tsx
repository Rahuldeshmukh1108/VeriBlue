import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart3, TrendingUp, Leaf, MapPin, Calendar, Clock, DollarSign, Award } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function PortfolioPage() {
  const activeLeases = [
    {
      id: "LEASE-001",
      project: "Amazon Rainforest Conservation",
      developer: "EcoTech Solutions",
      credits: 10000,
      price: 32,
      progress: 75,
      impact: "2,500 trees protected",
      expires: "2024-06-15",
      daysLeft: 45,
      location: "Brazil",
      type: "Forestry",
      status: "Active",
    },
    {
      id: "LEASE-002",
      project: "Offshore Wind Farm Alpha",
      developer: "GreenEnergy Corp",
      credits: 5000,
      price: 28,
      progress: 45,
      impact: "15 MWh clean energy",
      expires: "2024-08-20",
      daysLeft: 111,
      location: "North Sea",
      type: "Renewable Energy",
      status: "Active",
    },
    {
      id: "LEASE-003",
      project: "Mangrove Restoration Project",
      developer: "OceanTech Solutions",
      credits: 3000,
      price: 35,
      progress: 90,
      impact: "500 hectares restored",
      expires: "2024-04-10",
      daysLeft: 5,
      location: "Philippines",
      type: "Blue Carbon",
      status: "Expiring Soon",
    },
  ]

  const leaseHistory = [
    {
      id: "LEASE-H001",
      project: "Solar Farm Development",
      credits: 8000,
      price: 26,
      total: 208000,
      startDate: "2023-01-15",
      endDate: "2024-01-15",
      status: "Completed",
      impact: "20 MWh generated",
    },
    {
      id: "LEASE-H002",
      project: "Biogas Plant Initiative",
      credits: 4000,
      price: 22,
      total: 88000,
      startDate: "2023-03-20",
      endDate: "2024-03-20",
      status: "Completed",
      impact: "10,000 tons waste processed",
    },
  ]

  const portfolioStats = {
    totalCredits: 30000,
    totalInvestment: 890000,
    co2Offset: 30000,
    activeLeases: 3,
    completedLeases: 2,
    avgReturn: 12.5,
  }

  const projectLocations = [
    { name: "Amazon Rainforest Conservation", location: "Brazil", lat: -9.0238, lng: -70.812, credits: 10000 },
    { name: "Offshore Wind Farm Alpha", location: "North Sea", lat: 56.0, lng: 3.0, credits: 5000 },
    { name: "Mangrove Restoration Project", location: "Philippines", lat: 12.8797, lng: 121.774, credits: 3000 },
  ]

  return (
    <DashboardLayout userRole="buyer" userName="Alex Johnson">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
              <p className="text-gray-600 mt-1">Track your carbon credit leases and environmental impact</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <BarChart3 className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Portfolio Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Credits</p>
                    <p className="text-2xl font-bold text-blue-600">{portfolioStats.totalCredits.toLocaleString()}</p>
                  </div>
                  <Leaf className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">CO₂ Offset</p>
                    <p className="text-2xl font-bold text-emerald-600">{portfolioStats.co2Offset.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">tons CO₂</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-amber-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Investment</p>
                    <p className="text-2xl font-bold text-amber-600">
                      ${portfolioStats.totalInvestment.toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-amber-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Leases</p>
                    <p className="text-2xl font-bold text-purple-600">{portfolioStats.activeLeases}</p>
                  </div>
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="active" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active">Active Leases</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="map">Project Map</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {activeLeases.map((lease) => (
                  <Card key={lease.id} className="bg-white/80 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{lease.project}</CardTitle>
                          <p className="text-sm text-gray-600">by {lease.developer}</p>
                        </div>
                        <Badge variant={lease.status === "Expiring Soon" ? "destructive" : "default"}>
                          {lease.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{lease.credits.toLocaleString()} credits</span>
                        <span className="text-sm text-gray-600">${lease.price}/credit</span>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{lease.progress}%</span>
                        </div>
                        <Progress value={lease.progress} className="h-2" />
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span>{lease.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span>Expires {lease.expires}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>{lease.daysLeft} days left</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t">
                        <p className="text-sm text-gray-700 mb-3">{lease.impact}</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            View Details
                          </Button>
                          <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                            Extend Lease
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Lease History</CardTitle>
                  <p className="text-sm text-gray-600">Complete record of your past carbon credit leases</p>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Credits</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Impact</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leaseHistory.map((lease) => (
                        <TableRow key={lease.id}>
                          <TableCell className="font-medium">{lease.project}</TableCell>
                          <TableCell>{lease.credits.toLocaleString()}</TableCell>
                          <TableCell>${lease.price}</TableCell>
                          <TableCell>${lease.total.toLocaleString()}</TableCell>
                          <TableCell>
                            {lease.startDate} - {lease.endDate}
                          </TableCell>
                          <TableCell>{lease.impact}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                              {lease.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="map" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    Supported Projects Map
                  </CardTitle>
                  <p className="text-sm text-gray-600">Geographic distribution of your carbon credit portfolio</p>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-lg flex items-center justify-center mb-6">
                    <div className="text-center text-gray-600">
                      <MapPin className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                      <p className="font-medium">Interactive World Map</p>
                      <p className="text-sm">Leaflet integration would show project locations here</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {projectLocations.map((project, index) => (
                      <Card key={index} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-sm mb-2">{project.name}</h4>
                          <div className="space-y-1 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{project.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Leaf className="w-3 h-3" />
                              <span>{project.credits.toLocaleString()} credits</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
