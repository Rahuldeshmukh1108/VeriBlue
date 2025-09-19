import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Calendar,
  DollarSign,
  Leaf,
  ArrowLeft,
  Download,
  Upload,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  // Mock project data based on slug
  const projectData = {
    "amazon-reforestation": {
      name: "Amazon Reforestation Initiative",
      description:
        "Large-scale reforestation project in the Brazilian Amazon rainforest, focusing on native species restoration and biodiversity conservation. This project aims to restore 10,000 hectares of degraded land while providing sustainable livelihoods for local communities.",
      location: "Acre, Brazil",
      coordinates: { lat: -9.0238, lng: -70.812 },
      startDate: "January 2024",
      status: "Verified",
      progress: 75,
      totalCredits: 50000,
      generatedCredits: 5200,
      methodology: "VCS VM0009 - Afforestation/Reforestation",
      developer: "EcoTech Solutions",
      verifier: "Green Verify Corp",
      estimatedValue: "$1,250,000",
      co2Reduction: "50,000 tCO2e",
      area: "10,000 hectares",
      species: "25 native species",
    },
    "solar-farm": {
      name: "Solar Farm Development",
      description:
        "Utility-scale solar photovoltaic installation providing clean energy to the regional grid. The project includes 100MW capacity with advanced tracking systems and battery storage integration.",
      location: "Nairobi, Kenya",
      coordinates: { lat: -1.2921, lng: 36.8219 },
      startDate: "March 2024",
      status: "In Review",
      progress: 45,
      totalCredits: 25000,
      generatedCredits: 0,
      methodology: "CDM AMS-I.D - Grid Connected Renewable",
      developer: "GreenEnergy Corp",
      verifier: "Carbon Trust Verify",
      estimatedValue: "$625,000",
      co2Reduction: "25,000 tCO2e",
      area: "200 hectares",
      capacity: "100MW",
    },
    "mangrove-restoration": {
      name: "Mangrove Restoration",
      description:
        "Coastal mangrove ecosystem restoration project focusing on climate resilience and marine biodiversity. The project includes community-based management and sustainable aquaculture integration.",
      location: "Palawan, Philippines",
      coordinates: { lat: 9.8349, lng: 118.7384 },
      startDate: "May 2024",
      status: "Planning",
      progress: 15,
      totalCredits: 15000,
      generatedCredits: 0,
      methodology: "VCS VM0033 - Tidal Wetland Restoration",
      developer: "Ocean Restore Inc",
      verifier: "TBD",
      estimatedValue: "$375,000",
      co2Reduction: "15,000 tCO2e",
      area: "500 hectares",
      species: "12 mangrove species",
    },
  }

  const project = projectData[params.slug as keyof typeof projectData] || projectData["amazon-reforestation"]

  const mrvTimeline = [
    {
      date: "2024-01-15",
      type: "Baseline Report",
      status: "approved",
      credits: 0,
      description: "Initial baseline assessment and project documentation",
    },
    {
      date: "2024-03-15",
      type: "Q1 Monitoring",
      status: "approved",
      credits: 1200,
      description: "First quarter monitoring report with satellite verification",
    },
    {
      date: "2024-06-15",
      type: "Q2 Monitoring",
      status: "approved",
      credits: 1800,
      description: "Second quarter progress with field verification",
    },
    {
      date: "2024-09-15",
      type: "Q3 Monitoring",
      status: "approved",
      credits: 2200,
      description: "Third quarter report showing accelerated growth",
    },
    {
      date: "2024-12-15",
      type: "Annual Verification",
      status: "pending",
      credits: 0,
      description: "Comprehensive annual verification in progress",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/developer" className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">VeriBlue</span>
            </Link>
            <Badge variant="secondary">Developer</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/developer">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Project Banner */}
        <div className="relative mb-8">
          <div className="h-64 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative h-full flex items-end p-8">
              <div className="text-white">
                <div className="flex items-center space-x-4 mb-4">
                  <Badge
                    className={`${
                      project.status === "Verified"
                        ? "bg-primary"
                        : project.status === "In Review"
                          ? "bg-secondary"
                          : "bg-muted"
                    } text-white`}
                  >
                    {project.status}
                  </Badge>
                  <span className="text-sm opacity-90">{project.methodology}</span>
                </div>
                <h1 className="text-4xl font-bold mb-2">{project.name}</h1>
                <div className="flex items-center space-x-6 text-sm opacity-90">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {project.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Started {project.startDate}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {project.estimatedValue}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Progress</CardDescription>
              <CardTitle className="text-2xl text-primary">{project.progress}%</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={project.progress} className="h-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Credits Generated</CardDescription>
              <CardTitle className="text-2xl text-secondary">{project.generatedCredits.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">of {project.totalCredits.toLocaleString()} total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>CO₂ Reduction</CardDescription>
              <CardTitle className="text-2xl text-accent-foreground">{project.co2Reduction}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Estimated impact</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Project Area</CardDescription>
              <CardTitle className="text-2xl text-chart-4">{project.area}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Total coverage</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="timeline">MRV Timeline</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Project Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-6">{project.description}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Project Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Developer:</span>
                          <span>{project.developer}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Verifier:</span>
                          <span>{project.verifier}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Methodology:</span>
                          <span>{project.methodology}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Impact Metrics</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Area:</span>
                          <span>{project.area}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">CO₂ Reduction:</span>
                          <span>{project.co2Reduction}</span>
                        </div>
                        {"species" in project && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Species:</span>
                            <span>{project.species}</span>
                          </div>
                        )}
                        {"capacity" in project && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Capacity:</span>
                            <span>{project.capacity}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Submit MRV Report
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    View Documents
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Analytics Dashboard
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="location" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Location</CardTitle>
                <CardDescription>GPS coordinates and geographical information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Location Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Location:</span>
                          <span>{project.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Latitude:</span>
                          <span>{project.coordinates.lat}°</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Longitude:</span>
                          <span>{project.coordinates.lng}°</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Area:</span>
                          <span>{project.area}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Satellite Data</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last Updated:</span>
                          <span>2024-09-15</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Resolution:</span>
                          <span>10m/pixel</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Source:</span>
                          <span>Sentinel-2</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Map Placeholder */}
                  <div className="h-96 bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                      <p className="text-lg font-semibold">Interactive Map</p>
                      <p className="text-muted-foreground">Leaflet map showing project location</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Coordinates: {project.coordinates.lat}, {project.coordinates.lng}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>MRV Timeline</CardTitle>
                <CardDescription>Monitoring, Reporting, and Verification submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mrvTimeline.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 pb-6 border-b last:border-b-0">
                      <div className="flex-shrink-0">
                        {item.status === "approved" ? (
                          <CheckCircle className="h-6 w-6 text-primary" />
                        ) : item.status === "pending" ? (
                          <Clock className="h-6 w-6 text-secondary" />
                        ) : (
                          <AlertTriangle className="h-6 w-6 text-destructive" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{item.type}</h4>
                          <div className="flex items-center space-x-2">
                            {item.credits > 0 && (
                              <Badge variant="outline" className="text-primary">
                                +{item.credits.toLocaleString()} credits
                              </Badge>
                            )}
                            <Badge
                              variant={
                                item.status === "approved"
                                  ? "default"
                                  : item.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {item.status}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(item.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Documents</CardTitle>
                <CardDescription>All project-related documentation and reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Project Design Document</p>
                        <p className="text-sm text-muted-foreground">Initial project specification and methodology</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-secondary" />
                      <div>
                        <p className="font-medium">Baseline Assessment Report</p>
                        <p className="text-sm text-muted-foreground">Pre-project environmental baseline</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-accent-foreground" />
                      <div>
                        <p className="font-medium">Q3 2024 Monitoring Report</p>
                        <p className="text-sm text-muted-foreground">Latest quarterly monitoring submission</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-chart-4" />
                      <div>
                        <p className="font-medium">Verification Statement</p>
                        <p className="text-sm text-muted-foreground">Third-party verification results</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
