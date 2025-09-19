import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  FileText,
  MapPin,
  Calendar,
  Download,
  CheckCircle,
  XCircle,
  Leaf,
  Satellite,
  ImageIcon,
} from "lucide-react"
import Link from "next/link"

export default function AuditPage() {
  const projectData = {
    id: "PRJ-001",
    name: "Amazon Reforestation Initiative",
    developer: "EcoTech Solutions",
    type: "Forestry & Land Use",
    location: "Acre, Brazil",
    coordinates: { lat: -9.0238, lng: -70.812 },
    credits: 50000,
    methodology: "VCS VM0009 - Afforestation/Reforestation",
    submittedDate: "2024-01-01",
    deadline: "2024-01-15",
    area: "10,000 hectares",
    species: "25 native species",
    estimatedCO2: "50,000 tCO2e",
  }

  const documents = [
    {
      name: "Project Design Document",
      type: "PDF",
      size: "2.4 MB",
      uploaded: "2024-01-01",
      status: "reviewed",
    },
    {
      name: "Environmental Impact Assessment",
      type: "PDF",
      size: "1.8 MB",
      uploaded: "2024-01-01",
      status: "reviewed",
    },
    {
      name: "Baseline Study Report",
      type: "PDF",
      size: "3.2 MB",
      uploaded: "2024-01-01",
      status: "pending",
    },
    {
      name: "Monitoring Plan",
      type: "PDF",
      size: "1.1 MB",
      uploaded: "2024-01-01",
      status: "reviewed",
    },
    {
      name: "Stakeholder Consultation Report",
      type: "PDF",
      size: "2.7 MB",
      uploaded: "2024-01-01",
      status: "pending",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/verifier" className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">VeriBlue</span>
            </Link>
            <Badge variant="secondary">Verifier</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/verifier/queue">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Queue
              </Button>
            </Link>
            <Link href="/dashboard/verifier/attestation">
              <Button className="bg-primary hover:bg-primary/90">Proceed to Attestation</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Project Audit</h1>
              <p className="text-muted-foreground">Review project documentation and satellite imagery</p>
            </div>
            <Badge className="bg-secondary text-secondary-foreground">In Review</Badge>
          </div>
        </div>

        {/* Project Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{projectData.name}</CardTitle>
            <CardDescription>by {projectData.developer}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground">Project Type</label>
                  <p className="font-medium">{projectData.type}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Methodology</label>
                  <p className="font-medium">{projectData.methodology}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Location</label>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                    <p className="font-medium">{projectData.location}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground">Expected Credits</label>
                  <p className="font-medium">{projectData.credits.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Project Area</label>
                  <p className="font-medium">{projectData.area}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">CO₂ Reduction</label>
                  <p className="font-medium">{projectData.estimatedCO2}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground">Submitted</label>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <p className="font-medium">{projectData.submittedDate}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Deadline</label>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <p className="font-medium">{projectData.deadline}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Species</label>
                  <p className="font-medium">{projectData.species}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Split Screen Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Documents & Metadata */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  Project Documents
                </CardTitle>
                <CardDescription>Review all submitted documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {doc.type} • {doc.size} • Uploaded {doc.uploaded}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={doc.status === "reviewed" ? "default" : "secondary"}>{doc.status}</Badge>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>MRV Data</CardTitle>
                <CardDescription>Monitoring, Reporting & Verification metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Baseline Carbon Stock</p>
                      <p className="text-lg font-semibold">125 tCO₂/ha</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Projected Stock</p>
                      <p className="text-lg font-semibold">250 tCO₂/ha</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Leakage Rate</p>
                      <p className="text-lg font-semibold">5%</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Permanence Risk</p>
                      <p className="text-lg font-semibold">Low</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Satellite Imagery */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Satellite className="h-5 w-5 mr-2 text-secondary" />
                  Satellite Imagery Analysis
                </CardTitle>
                <CardDescription>Before and after comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="before" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="before">Before (2020)</TabsTrigger>
                    <TabsTrigger value="after">After (2024)</TabsTrigger>
                  </TabsList>

                  <TabsContent value="before" className="space-y-4">
                    <div className="aspect-square bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                      <div className="text-center">
                        <ImageIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-lg font-semibold">Baseline Satellite Image</p>
                        <p className="text-muted-foreground">Degraded land - 2020</p>
                        <p className="text-sm text-muted-foreground mt-2">Resolution: 10m/pixel • Source: Sentinel-2</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Forest Cover</p>
                        <p className="font-semibold">15%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Degraded Area</p>
                        <p className="font-semibold">85%</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="after" className="space-y-4">
                    <div className="aspect-square bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                      <div className="text-center">
                        <ImageIcon className="h-16 w-16 text-primary mx-auto mb-4" />
                        <p className="text-lg font-semibold">Current Satellite Image</p>
                        <p className="text-muted-foreground">Restored forest - 2024</p>
                        <p className="text-sm text-muted-foreground mt-2">Resolution: 10m/pixel • Source: Sentinel-2</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Forest Cover</p>
                        <p className="font-semibold text-primary">75%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Restoration Progress</p>
                        <p className="font-semibold text-primary">+60%</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verification Checklist</CardTitle>
                <CardDescription>Complete all verification steps</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Project Design Document</span>
                    </div>
                    <Badge variant="default">Complete</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Baseline Assessment</span>
                    </div>
                    <Badge variant="default">Complete</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <XCircle className="h-5 w-5 text-secondary" />
                      <span>Satellite Verification</span>
                    </div>
                    <Badge variant="secondary">In Progress</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <XCircle className="h-5 w-5 text-muted-foreground" />
                      <span>Field Verification</span>
                    </div>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <XCircle className="h-5 w-5 text-muted-foreground" />
                      <span>Final Report</span>
                    </div>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
