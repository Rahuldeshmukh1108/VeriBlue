"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import {
  FileText,
  MapPin,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  X,
  Eye,
  Download,
  Camera,
  Satellite,
  BarChart3,
  Clock,
  User,
  Hash,
} from "lucide-react"

interface ReportData {
  id: string
  projectName: string
  developer: string
  reportPeriod: string
  submittedAt: string
  location: string
  projectType: string
  carbonSequestration: number
  energyGeneration: number
  waterUsage: number
  biodiversityIndex: number
  soilHealth: number
  iotData: any[]
  supportingDocuments: string[]
  ipfsHash: string
  previousReports: number
}

interface VerificationChecklist {
  id: string
  category: string
  item: string
  status: "pending" | "verified" | "flagged"
  notes: string
  required: boolean
}

export function ReportReviewInterface({ reportId }: { reportId: string }) {
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [checklist, setChecklist] = useState<VerificationChecklist[]>([])
  const [verificationNotes, setVerificationNotes] = useState("")
  const [decision, setDecision] = useState<"approve" | "reject" | "request-info" | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { success, error } = useToast()

  useEffect(() => {
    const loadReportData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockReportData: ReportData = {
          id: reportId,
          projectName: "Amazon Reforestation Initiative",
          developer: "EcoTech Solutions",
          reportPeriod: "Q1 2024",
          submittedAt: "2024-03-15T10:30:00Z",
          location: "Acre, Brazil",
          projectType: "Forestry",
          carbonSequestration: 2.4,
          energyGeneration: 0,
          waterUsage: 850,
          biodiversityIndex: 0.78,
          soilHealth: 0.85,
          iotData: [
            { sensor: "Temperature", value: 24.5, unit: "°C", status: "normal" },
            { sensor: "Humidity", value: 68, unit: "%", status: "normal" },
            { sensor: "Soil Moisture", value: 45, unit: "%", status: "normal" },
            { sensor: "CO2 Monitor", value: 420, unit: "ppm", status: "warning" },
          ],
          supportingDocuments: ["field_photos.zip", "satellite_imagery.pdf", "soil_analysis.pdf"],
          ipfsHash: "QmXXX...ABC123",
          previousReports: 3,
        }

        const mockChecklist: VerificationChecklist[] = [
          {
            id: "data_accuracy",
            category: "Data Verification",
            item: "IoT sensor data accuracy and consistency",
            status: "verified",
            notes: "All sensor readings within expected ranges",
            required: true,
          },
          {
            id: "methodology",
            category: "Methodology",
            item: "Carbon calculation methodology compliance",
            status: "verified",
            notes: "Follows IPCC guidelines for forestry projects",
            required: true,
          },
          {
            id: "documentation",
            category: "Documentation",
            item: "Supporting documentation completeness",
            status: "pending",
            notes: "",
            required: true,
          },
          {
            id: "field_validation",
            category: "Field Validation",
            item: "On-site verification or satellite confirmation",
            status: "pending",
            notes: "",
            required: true,
          },
          {
            id: "baseline",
            category: "Baseline",
            item: "Baseline measurements and additionality",
            status: "verified",
            notes: "Clear baseline established, additionality demonstrated",
            required: true,
          },
          {
            id: "monitoring",
            category: "Monitoring",
            item: "Monitoring plan implementation",
            status: "flagged",
            notes: "Some gaps in monitoring frequency",
            required: true,
          },
        ]

        setReportData(mockReportData)
        setChecklist(mockChecklist)
        setIsLoading(false)
      } catch (err) {
        error("Failed to load report", "Please try refreshing the page")
        setIsLoading(false)
      }
    }

    loadReportData()
  }, [reportId, error])

  const updateChecklistItem = (id: string, status: VerificationChecklist["status"], notes: string) => {
    setChecklist((prev) => prev.map((item) => (item.id === id ? { ...item, status, notes } : item)))
  }

  const submitVerification = async () => {
    if (!decision) {
      error("Decision Required", "Please select approve, reject, or request more information")
      return
    }

    const requiredItems = checklist.filter((item) => item.required)
    const pendingRequired = requiredItems.filter((item) => item.status === "pending")

    if (decision === "approve" && pendingRequired.length > 0) {
      error("Incomplete Verification", "Please complete all required verification items")
      return
    }

    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const verificationResult = {
        reportId,
        decision,
        verificationNotes,
        checklist,
        verifierId: "verifier_001",
        timestamp: new Date().toISOString(),
      }

      success(
        "Verification Submitted",
        `Report ${decision === "approve" ? "approved" : decision === "reject" ? "rejected" : "flagged for more info"}`,
      )

      // In real app, this would trigger the next step in the workflow
    } catch (err) {
      error("Submission Failed", "Failed to submit verification decision")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading || !reportData) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
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
      {/* Report Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                {reportData.projectName} - {reportData.reportPeriod}
              </CardTitle>
              <CardDescription className="flex items-center mt-2 space-x-4">
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {reportData.developer}
                </span>
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {reportData.location}
                </span>
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(reportData.submittedAt).toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <Hash className="h-4 w-4 mr-1" />
                  {reportData.ipfsHash}
                </span>
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
              <Clock className="h-3 w-3 mr-1" />
              Under Review
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="data">IoT Data</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="decision">Decision</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Carbon Sequestration
                </CardDescription>
                <CardTitle className="text-2xl text-green-600">{reportData.carbonSequestration} t/day</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={75} className="h-2" />
                <p className="text-sm text-muted-foreground mt-1">75% of target</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Biodiversity Index
                </CardDescription>
                <CardTitle className="text-2xl text-purple-600">{reportData.biodiversityIndex}</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={78} className="h-2" />
                <p className="text-sm text-muted-foreground mt-1">Good diversity</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Soil Health
                </CardDescription>
                <CardTitle className="text-2xl text-orange-600">{reportData.soilHealth}</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={85} className="h-2" />
                <p className="text-sm text-muted-foreground mt-1">Excellent health</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Previous Reports
                </CardDescription>
                <CardTitle className="text-2xl text-blue-600">{reportData.previousReports}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Consistent reporting</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>IoT Sensor Data</CardTitle>
              <CardDescription>Real-time monitoring data from project sensors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {reportData.iotData.map((sensor, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{sensor.sensor}</h4>
                      <p className="text-2xl font-bold">
                        {sensor.value} {sensor.unit}
                      </p>
                    </div>
                    <Badge
                      className={
                        sensor.status === "normal"
                          ? "bg-green-100 text-green-800"
                          : sensor.status === "warning"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {sensor.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Supporting Documents</CardTitle>
              <CardDescription>Review all submitted documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reportData.supportingDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-3 text-muted-foreground" />
                      <span className="font-medium">{doc}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Field Validation Tools</CardTitle>
              <CardDescription>Additional verification resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Satellite className="h-6 w-6 mb-2" />
                  Satellite Imagery
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Camera className="h-6 w-6 mb-2" />
                  Field Photos
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <BarChart3 className="h-6 w-6 mb-2" />
                  Data Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Verification Checklist</CardTitle>
              <CardDescription>Complete all required verification items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {checklist.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{item.item}</h4>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.required && <Badge variant="outline">Required</Badge>}
                        <Badge
                          className={
                            item.status === "verified"
                              ? "bg-green-100 text-green-800"
                              : item.status === "flagged"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                          }
                        >
                          {item.status === "verified" && <CheckCircle className="h-3 w-3 mr-1" />}
                          {item.status === "flagged" && <AlertTriangle className="h-3 w-3 mr-1" />}
                          {item.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant={item.status === "verified" ? "default" : "outline"}
                          onClick={() => updateChecklistItem(item.id, "verified", item.notes)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Verified
                        </Button>
                        <Button
                          size="sm"
                          variant={item.status === "flagged" ? "destructive" : "outline"}
                          onClick={() => updateChecklistItem(item.id, "flagged", item.notes)}
                        >
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Flag Issue
                        </Button>
                      </div>
                      <Textarea
                        placeholder="Add verification notes..."
                        value={item.notes}
                        onChange={(e) => updateChecklistItem(item.id, item.status, e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="decision" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Verification Decision</CardTitle>
              <CardDescription>Make your final verification decision</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="decision">Decision</Label>
                <div className="flex space-x-4 mt-2">
                  <Button
                    variant={decision === "approve" ? "default" : "outline"}
                    onClick={() => setDecision("approve")}
                    className="flex-1"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    variant={decision === "reject" ? "destructive" : "outline"}
                    onClick={() => setDecision("reject")}
                    className="flex-1"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    variant={decision === "request-info" ? "secondary" : "outline"}
                    onClick={() => setDecision("request-info")}
                    className="flex-1"
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Request Info
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Verification Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Provide detailed notes about your verification decision..."
                  value={verificationNotes}
                  onChange={(e) => setVerificationNotes(e.target.value)}
                  rows={4}
                  className="mt-2"
                />
              </div>

              <Button onClick={submitVerification} disabled={isSubmitting || !decision} className="w-full">
                {isSubmitting ? "Submitting..." : "Submit Verification Decision"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
