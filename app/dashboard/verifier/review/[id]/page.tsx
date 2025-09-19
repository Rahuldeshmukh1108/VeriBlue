"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  FileText,
  MapPin,
  Calendar,
  Building2,
  Download,
  ExternalLink,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Satellite,
  BarChart3,
  Layers,
  Zap,
  Clock,
} from "lucide-react"

// TypeScript interfaces for audit data
interface ProjectAuditData {
  id: string
  projectName: string
  developer: string
  reportDate: string
  creditsClaimed: number
  reportType: "quarterly" | "annual" | "milestone"
  status: "pending" | "under_review"
  priority: "high" | "medium" | "low"
  daysWaiting: number

  // Project details
  projectDetails: {
    location: string
    projectType: string
    methodology: string
    startDate: string
    area: string
    description: string
  }

  // Report summary
  reportSummary: {
    reportingPeriod: string
    monitoringData: {
      biomassGrowth: number
      carbonSequestration: number
      biodiversityIndex: number
      communityBenefit: number
    }
    verificationStandard: string
    previousCredits: number
  }

  // Documents
  documents: {
    id: string
    name: string
    type: string
    uploadDate: string
    size: string
    ipfsHash: string
  }[]

  // Satellite data
  satelliteData: {
    beforeImage: string
    afterImage: string
    analysisDate: string
    vegetationIndex: number
    changeDetection: string
  }
}

// Mock audit data
const mockAuditData: ProjectAuditData = {
  id: "1",
  projectName: "Amazon Rainforest Conservation",
  developer: "EcoForest Solutions",
  reportDate: "2024-01-08",
  creditsClaimed: 2500,
  reportType: "quarterly",
  status: "under_review",
  priority: "high",
  daysWaiting: 8,

  projectDetails: {
    location: "Acre State, Brazil (-9.0238, -70.8120)",
    projectType: "REDD+ Forest Conservation",
    methodology: "VM0015 - Methodology for Avoided Unplanned Deforestation",
    startDate: "2022-03-15",
    area: "12,500 hectares",
    description:
      "Large-scale forest conservation project protecting primary rainforest from deforestation while supporting local communities through sustainable livelihood programs.",
  },

  reportSummary: {
    reportingPeriod: "Q4 2024 (Oct - Dec 2024)",
    monitoringData: {
      biomassGrowth: 15.2,
      carbonSequestration: 2847,
      biodiversityIndex: 8.7,
      communityBenefit: 94,
    },
    verificationStandard: "Verified Carbon Standard (VCS)",
    previousCredits: 9750,
  },

  documents: [
    {
      id: "1",
      name: "Project Design Document (PDD)",
      type: "Project Document",
      uploadDate: "2024-01-08",
      size: "15.2 MB",
      ipfsHash: "QmX7Y8Z9...",
    },
    {
      id: "2",
      name: "Monitoring Report Q4 2024",
      type: "Monitoring Report",
      uploadDate: "2024-01-08",
      size: "8.7 MB",
      ipfsHash: "QmA1B2C3...",
    },
    {
      id: "3",
      name: "Third-Party Validation Report",
      type: "Validation Report",
      uploadDate: "2024-01-08",
      size: "4.3 MB",
      ipfsHash: "QmD4E5F6...",
    },
    {
      id: "4",
      name: "Community Impact Assessment",
      type: "Impact Report",
      uploadDate: "2024-01-08",
      size: "6.1 MB",
      ipfsHash: "QmG7H8I9...",
    },
    {
      id: "5",
      name: "Biodiversity Monitoring Data",
      type: "Scientific Data",
      uploadDate: "2024-01-08",
      size: "12.8 MB",
      ipfsHash: "QmJ1K2L3...",
    },
  ],

  satelliteData: {
    beforeImage: "/mangrove-forest-restoration.jpg",
    afterImage: "/mangrove-forest-restoration.jpg",
    analysisDate: "2024-01-05",
    vegetationIndex: 0.78,
    changeDetection: "Positive vegetation growth detected across 89% of project area",
  },
}

export default function AuditInterface({ params }: { params: { id: string } }) {
  const [verifiedCredits, setVerifiedCredits] = useState("")
  const [auditNotes, setAuditNotes] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentTab, setCurrentTab] = useState("summary")

  // In a real app, fetch audit data based on params.id
  const auditData = mockAuditData

  const handleSignAndApprove = async () => {
    setIsProcessing(true)
    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsProcessing(false)
    // Show success toast and redirect
  }

  const handleReject = async () => {
    setIsProcessing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    // Show rejection toast and redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Navigation Header */}
      <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">VeriBlue</span>
            <Badge variant="secondary" className="ml-2">
              Verifier
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Back to Queue
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Dr. Elena Rodriguez" />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{auditData.projectName}</h1>
              <p className="text-muted-foreground">
                Audit MRV report and verify carbon credit claims for {auditData.developer}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  auditData.priority === "high"
                    ? "destructive"
                    : auditData.priority === "medium"
                      ? "secondary"
                      : "outline"
                }
              >
                {auditData.priority === "high" && <AlertTriangle className="h-3 w-3 mr-1" />}
                {auditData.priority} priority
              </Badge>
              <Badge variant="outline">
                <Clock className="h-3 w-3 mr-1" />
                {auditData.daysWaiting} days waiting
              </Badge>
            </div>
          </div>
        </div>

        {/* Multi-Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="satellite">Satellite</TabsTrigger>
                <TabsTrigger value="verification">Verification</TabsTrigger>
              </TabsList>

              {/* Report Summary Tab */}
              <TabsContent value="summary" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Project Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Location</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm">{auditData.projectDetails.location}</p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Project Type</Label>
                        <p className="text-sm mt-1">{auditData.projectDetails.projectType}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Methodology</Label>
                        <p className="text-sm mt-1">{auditData.projectDetails.methodology}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Project Area</Label>
                        <p className="text-sm mt-1">{auditData.projectDetails.area}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Project Description</Label>
                      <p className="text-sm mt-1 text-muted-foreground">{auditData.projectDetails.description}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-secondary" />
                      Monitoring Data
                    </CardTitle>
                    <CardDescription>Reporting Period: {auditData.reportSummary.reportingPeriod}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Biomass Growth</span>
                            <span>{auditData.reportSummary.monitoringData.biomassGrowth}%</span>
                          </div>
                          <Progress value={auditData.reportSummary.monitoringData.biomassGrowth} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Biodiversity Index</span>
                            <span>{auditData.reportSummary.monitoringData.biodiversityIndex}/10</span>
                          </div>
                          <Progress
                            value={auditData.reportSummary.monitoringData.biodiversityIndex * 10}
                            className="h-2"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                          <div className="text-2xl font-bold text-primary">
                            {auditData.reportSummary.monitoringData.carbonSequestration.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">tonnes CO₂ sequestered</div>
                        </div>
                        <div className="text-center p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                          <div className="text-2xl font-bold text-secondary">
                            {auditData.reportSummary.monitoringData.communityBenefit}%
                          </div>
                          <div className="text-xs text-muted-foreground">community benefit score</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-chart-4" />
                      Supporting Documents
                    </CardTitle>
                    <CardDescription>
                      All project documents stored on IPFS for transparency and immutability
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {auditData.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {doc.type} • {doc.size} • Uploaded {new Date(doc.uploadDate).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-muted-foreground font-mono">IPFS: {doc.ipfsHash}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Satellite Data Tab */}
              <TabsContent value="satellite" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Satellite className="h-5 w-5 text-accent-foreground" />
                      Satellite Imagery Analysis
                    </CardTitle>
                    <CardDescription>Side-by-side comparison of satellite imagery over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Before (Project Start)</Label>
                        <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                          <img
                            src={auditData.satelliteData.beforeImage || "/placeholder.svg"}
                            alt="Before satellite image"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">After (Current)</Label>
                        <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                          <img
                            src={auditData.satelliteData.afterImage || "/placeholder.svg"}
                            alt="After satellite image"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Layers className="h-4 w-4 text-primary" />
                            <span className="font-medium">Vegetation Index</span>
                          </div>
                          <div className="text-2xl font-bold text-primary">
                            {auditData.satelliteData.vegetationIndex}
                          </div>
                          <p className="text-xs text-muted-foreground">NDVI Score</p>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="h-4 w-4 text-secondary" />
                            <span className="font-medium">Analysis Date</span>
                          </div>
                          <div className="text-lg font-bold text-secondary">
                            {new Date(auditData.satelliteData.analysisDate).toLocaleDateString()}
                          </div>
                          <p className="text-xs text-muted-foreground">Latest imagery</p>
                        </div>
                      </div>

                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                        <h4 className="font-medium mb-2">Change Detection Analysis</h4>
                        <p className="text-sm text-muted-foreground">{auditData.satelliteData.changeDetection}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Verification Tab */}
              <TabsContent value="verification" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Verification Standards
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Standard</Label>
                        <p className="text-sm mt-1">{auditData.reportSummary.verificationStandard}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Previous Credits Issued</Label>
                        <p className="text-sm mt-1">
                          {auditData.reportSummary.previousCredits.toLocaleString()} credits
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
                      <h4 className="font-medium mb-2">Verification Checklist</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>Project Design Document reviewed</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>Monitoring data validated</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>Satellite imagery analysis completed</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>Third-party validation confirmed</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-6">
            {/* Project Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  Project Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {auditData.developer
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{auditData.developer}</p>
                    <p className="text-xs text-muted-foreground">Project Developer</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Report Type</span>
                    <Badge variant="outline" className="capitalize">
                      {auditData.reportType}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Credits Claimed</span>
                    <span className="font-medium">{auditData.creditsClaimed.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Report Date</span>
                    <span>{new Date(auditData.reportDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Project Start</span>
                    <span>{new Date(auditData.projectDetails.startDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Final Attestation Module */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Final Attestation
                </CardTitle>
                <CardDescription>Sign and approve to mint verified credits on-chain</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="verified-credits" className="text-sm font-medium">
                    Verified Credit Amount
                  </Label>
                  <Input
                    id="verified-credits"
                    type="number"
                    placeholder="Enter verified credits"
                    value={verifiedCredits}
                    onChange={(e) => setVerifiedCredits(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Maximum claimable: {auditData.creditsClaimed.toLocaleString()} credits
                  </p>
                </div>

                <div>
                  <Label htmlFor="audit-notes" className="text-sm font-medium">
                    Audit Notes
                  </Label>
                  <Textarea
                    id="audit-notes"
                    placeholder="Add verification notes..."
                    value={auditNotes}
                    onChange={(e) => setAuditNotes(e.target.value)}
                    className="mt-1 min-h-20"
                  />
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button className="w-full" onClick={handleSignAndApprove} disabled={isProcessing || !verifiedCredits}>
                    {isProcessing ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Processing Transaction...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Sign & Approve
                      </>
                    )}
                  </Button>

                  <Button variant="destructive" className="w-full" onClick={handleReject} disabled={isProcessing}>
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Report
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground">
                  <p>⚠️ This action will create an immutable on-chain record</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
