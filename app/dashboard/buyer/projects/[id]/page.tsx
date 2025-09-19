"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Leaf,
  ArrowLeft,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Star,
  ExternalLink,
  Download,
  Play,
  TrendingUp,
  Shield,
  FileText,
  ImageIcon,
  Video,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// TypeScript interfaces
interface ProjectDetail {
  id: string
  name: string
  type: "mangrove" | "seagrass" | "solar" | "wind" | "forest" | "peatland"
  location: string
  country: string
  coordinates: { lat: number; lng: number }
  pricePerCredit: number
  creditsAvailable: number
  totalCredits: number
  rating: number
  reviews: number
  description: string
  longDescription: string
  verificationStatus: "verified" | "pending" | "unverified"
  verificationStandard: string
  developer: string
  developerLogo: string
  estimatedDelivery: string
  vintage: string
  methodology: string
  images: string[]
  videos: string[]
  documents: Array<{
    name: string
    type: string
    url: string
    size: string
  }>
  impact: {
    co2Reduction: number
    biodiversityBenefit: string
    communityImpact: string
    sdgGoals: number[]
  }
  timeline: Array<{
    date: string
    milestone: string
    status: "completed" | "in-progress" | "upcoming"
  }>
  financials: {
    totalFunding: number
    fundingProgress: number
    priceHistory: Array<{
      date: string
      price: number
    }>
  }
}

// Mock project data
const getProjectById = (id: string): ProjectDetail => {
  const projects: Record<string, ProjectDetail> = {
    "1": {
      id: "1",
      name: "Sundarbans Mangrove Restoration",
      type: "mangrove",
      location: "Sundarbans, Bangladesh",
      country: "Bangladesh",
      coordinates: { lat: 21.9497, lng: 89.1833 },
      pricePerCredit: 25,
      creditsAvailable: 15000,
      totalCredits: 50000,
      rating: 4.8,
      reviews: 127,
      description: "Protecting and restoring critical mangrove ecosystems in the Sundarbans delta region.",
      longDescription:
        "The Sundarbans Mangrove Restoration Project is a comprehensive initiative aimed at protecting and restoring one of the world's largest mangrove forests. This project focuses on reforestation, community engagement, and sustainable livelihood development while providing significant carbon sequestration benefits. The project covers 10,000 hectares of degraded mangrove areas and involves local communities in conservation efforts.",
      verificationStatus: "verified",
      verificationStandard: "VCS (Verified Carbon Standard)",
      developer: "Bangladesh Forest Department",
      developerLogo: "/placeholder.svg",
      estimatedDelivery: "Q2 2024",
      vintage: "2024",
      methodology: "VM0007 - REDD+ Methodology Framework",
      images: [
        "/mangrove-forest-restoration.jpg",
        "/placeholder.svg?key=mangrove2",
        "/placeholder.svg?key=mangrove3",
        "/placeholder.svg?key=mangrove4",
      ],
      videos: ["/videos/mangrove-project-overview.mp4", "/videos/community-impact.mp4"],
      documents: [
        {
          name: "Project Design Document",
          type: "PDF",
          url: "/documents/pdd-sundarbans.pdf",
          size: "2.4 MB",
        },
        {
          name: "Verification Report",
          type: "PDF",
          url: "/documents/verification-sundarbans.pdf",
          size: "1.8 MB",
        },
        {
          name: "Monitoring Report 2024",
          type: "PDF",
          url: "/documents/monitoring-2024.pdf",
          size: "3.2 MB",
        },
      ],
      impact: {
        co2Reduction: 125000,
        biodiversityBenefit: "Habitat for 400+ species including Bengal tigers",
        communityImpact: "Supporting 5,000+ local families with sustainable livelihoods",
        sdgGoals: [13, 14, 15, 1, 8],
      },
      timeline: [
        {
          date: "2023-01-15",
          milestone: "Project Registration",
          status: "completed",
        },
        {
          date: "2023-06-01",
          milestone: "Community Engagement Phase",
          status: "completed",
        },
        {
          date: "2024-01-01",
          milestone: "Restoration Activities Begin",
          status: "in-progress",
        },
        {
          date: "2024-06-01",
          milestone: "First Credit Issuance",
          status: "upcoming",
        },
      ],
      financials: {
        totalFunding: 2500000,
        fundingProgress: 68,
        priceHistory: [
          { date: "2023-01", price: 22 },
          { date: "2023-06", price: 24 },
          { date: "2023-12", price: 25 },
          { date: "2024-01", price: 25 },
        ],
      },
    },
  }

  return projects[id] || projects["1"]
}

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = params.id as string
  const project = getProjectById(projectId)
  const [selectedImage, setSelectedImage] = useState(0)
  const [purchaseAmount, setPurchaseAmount] = useState(100)

  const sdgGoalNames: Record<number, string> = {
    1: "No Poverty",
    8: "Decent Work and Economic Growth",
    13: "Climate Action",
    14: "Life Below Water",
    15: "Life on Land",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Navigation Header */}
      <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/buyer/marketplace" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Marketplace</span>
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
        {/* Project Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image Gallery */}
            <Card className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={project.images[selectedImage] || "/placeholder.svg"}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-primary text-primary-foreground">
                    {project.type.charAt(0).toUpperCase() + project.type.slice(1)}
                  </Badge>
                  <Badge variant={project.verificationStatus === "verified" ? "default" : "secondary"}>
                    <Shield className="h-3 w-3 mr-1" />
                    {project.verificationStatus}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex gap-2 overflow-x-auto">
                  {project.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? "border-primary" : "border-transparent"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${project.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project Information */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{project.name}</CardTitle>
                    <CardDescription className="flex items-center gap-4 text-base">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {project.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {project.rating} ({project.reviews} reviews)
                      </div>
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">${project.pricePerCredit}</div>
                    <div className="text-sm text-muted-foreground">per credit</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{project.longDescription}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{project.creditsAvailable.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Credits Available</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-secondary">
                      {project.impact.co2Reduction.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">tonnes CO₂/year</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-accent-foreground">{project.vintage}</div>
                    <div className="text-sm text-muted-foreground">Vintage Year</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-chart-4">
                      {Math.round((project.creditsAvailable / project.totalCredits) * 100)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Available</div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Developer Information */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={project.developerLogo || "/placeholder.svg"} alt={project.developer} />
                    <AvatarFallback>
                      {project.developer
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{project.developer}</div>
                    <div className="text-sm text-muted-foreground">Project Developer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Buy Credits Module */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Buy Credits
                </CardTitle>
                <CardDescription>Purchase verified carbon credits from this project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Number of Credits</label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPurchaseAmount(Math.max(1, purchaseAmount - 10))}
                    >
                      -10
                    </Button>
                    <input
                      type="number"
                      value={purchaseAmount}
                      onChange={(e) => setPurchaseAmount(Math.max(1, Number.parseInt(e.target.value) || 1))}
                      className="flex-1 text-center border rounded-md px-3 py-2"
                      min="1"
                      max={project.creditsAvailable}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPurchaseAmount(Math.min(project.creditsAvailable, purchaseAmount + 10))}
                    >
                      +10
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Price per credit:</span>
                    <span>${project.pricePerCredit}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Platform fee (2%):</span>
                    <span>${(purchaseAmount * project.pricePerCredit * 0.02).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>${(purchaseAmount * project.pricePerCredit * 1.02).toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button asChild className="w-full" size="lg">
                    <Link href={`/dashboard/buyer/checkout?project=${project.id}&amount=${purchaseAmount}`}>
                      Buy {purchaseAmount} Credits
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Add to Watchlist
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground">
                  <div className="flex items-center gap-1 mb-1">
                    <Calendar className="h-3 w-3" />
                    Estimated delivery: {project.estimatedDelivery}
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Verified by {project.verificationStandard}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Funding Progress</span>
                    <span>{project.financials.fundingProgress}%</span>
                  </div>
                  <Progress value={project.financials.fundingProgress} className="h-2" />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Funding:</span>
                    <span>${project.financials.totalFunding.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Methodology:</span>
                    <span className="text-right">{project.methodology}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="impact" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="impact">Impact & Benefits</TabsTrigger>
            <TabsTrigger value="documents">Verification Documents</TabsTrigger>
            <TabsTrigger value="timeline">Project Timeline</TabsTrigger>
            <TabsTrigger value="media">Media Gallery</TabsTrigger>
          </TabsList>

          {/* Impact & Benefits Tab */}
          <TabsContent value="impact">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Environmental Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="font-medium mb-2">Annual CO₂ Reduction</div>
                    <div className="text-2xl font-bold text-primary">
                      {project.impact.co2Reduction.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">tonnes CO₂ equivalent per year</div>
                  </div>

                  <div>
                    <div className="font-medium mb-2">Biodiversity Benefit</div>
                    <p className="text-sm text-muted-foreground">{project.impact.biodiversityBenefit}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-secondary" />
                    Community Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="font-medium mb-2">Local Community Benefits</div>
                    <p className="text-sm text-muted-foreground">{project.impact.communityImpact}</p>
                  </div>

                  <div>
                    <div className="font-medium mb-2">UN SDG Goals</div>
                    <div className="flex flex-wrap gap-2">
                      {project.impact.sdgGoals.map((goal) => (
                        <Badge key={goal} variant="outline">
                          SDG {goal}: {sdgGoalNames[goal]}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Verification Documents Tab */}
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-accent-foreground" />
                  Verification Documents
                </CardTitle>
                <CardDescription>Direct links to audit reports and scientific data stored on IPFS</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {doc.type} • {doc.size}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={doc.url} target="_blank">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Link>
                        </Button>
                        <Button size="sm" variant="ghost" asChild>
                          <Link href={doc.url} target="_blank">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Project Timeline Tab */}
          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-chart-4" />
                  Project Timeline
                </CardTitle>
                <CardDescription>Key milestones and project development progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {project.timeline.map((milestone, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div
                        className={`w-4 h-4 rounded-full mt-1 ${
                          milestone.status === "completed"
                            ? "bg-green-500"
                            : milestone.status === "in-progress"
                              ? "bg-yellow-500"
                              : "bg-gray-300"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{milestone.milestone}</div>
                          <Badge
                            variant={
                              milestone.status === "completed"
                                ? "default"
                                : milestone.status === "in-progress"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {milestone.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(milestone.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Gallery Tab */}
          <TabsContent value="media">
            <div className="space-y-6">
              {/* Images */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-primary" />
                    Image Gallery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {project.images.map((image, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${project.name} ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                          onClick={() => setSelectedImage(index)}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Videos */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-secondary" />
                    Video Gallery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.videos.map((video, index) => (
                      <div key={index} className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <Button variant="outline" size="lg">
                          <Play className="h-6 w-6 mr-2" />
                          Play Video {index + 1}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
