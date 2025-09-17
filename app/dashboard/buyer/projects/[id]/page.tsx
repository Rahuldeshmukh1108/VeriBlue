import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Star,
  Calendar,
  TrendingUp,
  Leaf,
  Users,
  Award,
  ShoppingCart,
  ArrowLeft,
  CheckCircle,
  Clock,
} from "lucide-react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  // Mock project data - in real app, fetch based on params.id
  const project = {
    id: "PRJ-001",
    name: "Amazon Rainforest Conservation Initiative",
    developer: "EcoTech Solutions",
    type: "Forestry",
    location: "Acre, Brazil",
    coordinates: { lat: -9.0238, lng: -70.812 },
    credits: 100000,
    creditsAvailable: 75000,
    price: 32,
    rating: 4.9,
    reviews: 127,
    verified: true,
    description:
      "A comprehensive forest conservation project protecting 50,000 hectares of pristine Amazon rainforest while supporting local indigenous communities through sustainable economic opportunities.",
    impact: {
      treesProtected: 500000,
      co2Sequestered: 2500000,
      biodiversityScore: 95,
      communitiesSupported: 12,
      jobsCreated: 450,
    },
    images: ["/amazon-rainforest.png", "/amazon-conservation-team.jpg", "/amazon-wildlife.jpg"],
    methodology: "Verified Carbon Standard (VCS) + Climate, Community & Biodiversity (CCB)",
    startDate: "2022-01-15",
    endDate: "2032-01-15",
    status: "Active",
  }

  const verificationLog = [
    {
      id: "VER-001",
      date: "2024-01-15",
      type: "Annual Verification",
      verifier: "Dr. Sarah Chen",
      status: "Completed",
      credits: 25000,
      notes: "Satellite imagery confirms forest protection targets exceeded by 12%",
    },
    {
      id: "VER-002",
      date: "2023-07-20",
      type: "Mid-year Assessment",
      verifier: "Prof. Miguel Santos",
      status: "Completed",
      credits: 12500,
      notes: "Community engagement programs showing excellent results",
    },
    {
      id: "VER-003",
      date: "2023-01-15",
      type: "Annual Verification",
      verifier: "Dr. Sarah Chen",
      status: "Completed",
      credits: 24000,
      notes: "Project exceeding biodiversity conservation goals",
    },
  ]

  const impactStats = [
    {
      label: "Trees Protected",
      value: project.impact.treesProtected.toLocaleString(),
      icon: Leaf,
      color: "text-emerald-600",
    },
    {
      label: "CO₂ Sequestered (tons)",
      value: project.impact.co2Sequestered.toLocaleString(),
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      label: "Communities Supported",
      value: project.impact.communitiesSupported.toString(),
      icon: Users,
      color: "text-purple-600",
    },
    { label: "Jobs Created", value: project.impact.jobsCreated.toString(), icon: Award, color: "text-amber-600" },
  ]

  return (
    <DashboardLayout userRole="buyer" userName="Alex Johnson">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Link href="/dashboard/buyer/marketplace">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Marketplace
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
              <p className="text-gray-600 mt-1">by {project.developer}</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Lease Credits
            </Button>
          </div>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 3D Visualization Placeholder */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="relative h-96 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-lg overflow-hidden">
                  <img
                    src={
                      project.images[0] || "/placeholder.svg?height=400&width=600&query=Amazon rainforest aerial view"
                    }
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <div className="w-8 h-8 bg-white/40 rounded-full animate-pulse"></div>
                      </div>
                      <p className="text-sm font-medium">3D Visualization</p>
                      <p className="text-xs opacity-80">Interactive forest model</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Info */}
            <div className="space-y-4">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-3xl font-bold text-blue-600">${project.price}</div>
                      <p className="text-sm text-gray-500">per credit</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{project.rating}</span>
                        <span className="text-sm text-gray-500">({project.reviews} reviews)</span>
                      </div>
                      {project.verified && (
                        <Badge className="bg-emerald-100 text-emerald-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>
                        {project.startDate} - {project.endDate}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Credits Available</span>
                      <span>
                        {project.creditsAvailable.toLocaleString()} / {project.credits.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={(project.creditsAvailable / project.credits) * 100} className="h-2" />
                  </div>

                  <Badge variant="outline" className="mr-2">
                    {project.type}
                  </Badge>
                  <Badge variant="outline">{project.status}</Badge>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                {impactStats.map((stat, index) => (
                  <Card key={index} className="bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-4 text-center">
                      <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                      <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                      <p className="text-xs text-gray-600">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="impact">Impact Stats</TabsTrigger>
              <TabsTrigger value="verification">Verification Log</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Project Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed mb-4">{project.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Methodology</h4>
                      <p className="text-sm text-gray-600">{project.methodology}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Project Duration</h4>
                      <p className="text-sm text-gray-600">10 years (2022-2032)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.images.map((image, index) => (
                  <Card key={index} className="bg-white/80 backdrop-blur-sm overflow-hidden">
                    <img
                      src={image || `/placeholder.svg?height=200&width=300&query=Amazon forest image ${index + 1}`}
                      alt={`${project.name} - Image ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="impact" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {impactStats.map((stat, index) => (
                  <Card key={index} className="bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <stat.icon className={`w-12 h-12 ${stat.color} mx-auto mb-4`} />
                      <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Environmental Impact Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Biodiversity Conservation</span>
                        <span className="text-sm text-gray-600">{project.impact.biodiversityScore}%</span>
                      </div>
                      <Progress value={project.impact.biodiversityScore} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Community Engagement</span>
                        <span className="text-sm text-gray-600">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Forest Protection</span>
                        <span className="text-sm text-gray-600">98%</span>
                      </div>
                      <Progress value={98} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="verification" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Verification Timeline</CardTitle>
                  <p className="text-sm text-gray-600">Complete history of project verifications and assessments</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {verificationLog.map((entry, index) => (
                      <div key={entry.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              entry.status === "Completed" ? "bg-emerald-100" : "bg-yellow-100"
                            }`}
                          >
                            {entry.status === "Completed" ? (
                              <CheckCircle className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <Clock className="w-5 h-5 text-yellow-600" />
                            )}
                          </div>
                          {index < verificationLog.length - 1 && <div className="w-px h-16 bg-gray-200 mt-2"></div>}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">{entry.type}</h4>
                              <p className="text-sm text-gray-600">Verified by {entry.verifier}</p>
                            </div>
                            <div className="text-right">
                              <Badge variant={entry.status === "Completed" ? "default" : "secondary"}>
                                {entry.status}
                              </Badge>
                              <p className="text-xs text-gray-500 mt-1">{entry.date}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{entry.notes}</p>
                          <div className="text-sm">
                            <span className="font-medium text-blue-600">{entry.credits.toLocaleString()} credits</span>
                            <span className="text-gray-500"> verified</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="location" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Project Location</CardTitle>
                  <p className="text-sm text-gray-600">{project.location}</p>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <MapPin className="w-16 h-16 mx-auto mb-4 text-emerald-600" />
                      <p className="font-medium">Interactive Map</p>
                      <p className="text-sm">
                        Coordinates: {project.coordinates.lat}, {project.coordinates.lng}
                      </p>
                      <p className="text-xs mt-2">Map integration with Leaflet would be implemented here</p>
                    </div>
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
