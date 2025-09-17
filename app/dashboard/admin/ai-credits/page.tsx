"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BreadcrumbNav } from "@/components/navigation/breadcrumb-nav"
import { DashboardNav } from "@/components/navigation/dashboard-nav"
import { SkipLink } from "@/components/accessibility/skip-link"
import { KeyboardNavigation } from "@/components/accessibility/keyboard-navigation"
import { CreditCalculationEngine } from "@/components/ai/credit-calculation-engine"
import { Brain, TrendingUp, Clock, CheckCircle, Coins } from "lucide-react"
import Link from "next/link"

export default function AICreditCalculationPage() {
  const pendingCalculations = [
    {
      id: "RPT-001",
      projectName: "Amazon Reforestation Initiative",
      developer: "EcoTech Solutions",
      reportPeriod: "Q1 2024",
      verifiedAt: "2024-03-15T14:30:00Z",
      status: "ready",
      estimatedCredits: "2,400-3,200",
    },
    {
      id: "RPT-002",
      projectName: "Solar Farm Development",
      developer: "GreenEnergy Corp",
      reportPeriod: "Q4 2023",
      verifiedAt: "2024-01-13T10:30:00Z",
      status: "calculated",
      estimatedCredits: "3,250",
    },
    {
      id: "RPT-003",
      projectName: "Mangrove Restoration",
      developer: "OceanTech Solutions",
      reportPeriod: "Q1 2024",
      verifiedAt: "2024-03-10T16:20:00Z",
      status: "processing",
      estimatedCredits: "1,800-2,100",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <KeyboardNavigation />
      <DashboardNav userType="admin" />

      <main id="main-content" tabIndex={-1} className="container mx-auto px-4 py-8">
        <BreadcrumbNav />

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Credit Calculation System</h1>
          <p className="text-muted-foreground">
            Advanced AI-powered analysis for determining carbon credit amounts from verified reports
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Pending Calculations
              </CardDescription>
              <CardTitle className="text-2xl text-yellow-600">8</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Awaiting AI analysis</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center">
                <Brain className="h-4 w-4 mr-2" />
                AI Calculations Today
              </CardDescription>
              <CardTitle className="text-2xl text-blue-600">12</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Completed analyses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center">
                <Coins className="h-4 w-4 mr-2" />
                Credits Calculated
              </CardDescription>
              <CardTitle className="text-2xl text-green-600">45,280</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Ready for minting</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Accuracy Rate
              </CardDescription>
              <CardTitle className="text-2xl text-purple-600">96.8%</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">AI prediction accuracy</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="queue" className="space-y-6">
          <TabsList>
            <TabsTrigger value="queue">Calculation Queue</TabsTrigger>
            <TabsTrigger value="engine">AI Engine</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="queue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Verified Reports Awaiting AI Calculation</CardTitle>
                <CardDescription>
                  Reports that have passed verification and are ready for credit calculation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingCalculations.map((report) => (
                    <div key={report.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{report.projectName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {report.reportPeriod} Report by {report.developer}
                          </p>
                        </div>
                        <Badge
                          className={
                            report.status === "ready"
                              ? "bg-green-100 text-green-800"
                              : report.status === "calculated"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {report.status === "ready" && <CheckCircle className="h-3 w-3 mr-1" />}
                          {report.status === "calculated" && <Coins className="h-3 w-3 mr-1" />}
                          {report.status === "processing" && <Clock className="h-3 w-3 mr-1" />}
                          {report.status}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          <span>Verified: {new Date(report.verifiedAt).toLocaleDateString()}</span>
                          <span className="ml-4">Estimated: {report.estimatedCredits} credits</span>
                        </div>
                        <Link href={`/dashboard/admin/ai-credits/${report.id}`}>
                          <Button size="sm" disabled={report.status === "processing"}>
                            <Brain className="h-4 w-4 mr-2" />
                            {report.status === "calculated" ? "View Results" : "Run Calculation"}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engine" className="space-y-6">
            <CreditCalculationEngine reportId="RPT-001" />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Performance Metrics</CardTitle>
                  <CardDescription>Machine learning model performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Prediction Accuracy</span>
                      <span className="text-sm font-bold text-green-600">96.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Average Processing Time</span>
                      <span className="text-sm font-bold">2.3 minutes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Confidence Score</span>
                      <span className="text-sm font-bold text-blue-600">94.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Model Version</span>
                      <span className="text-sm font-bold">v2.1.3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Calculations</CardTitle>
                  <CardDescription>Latest AI credit calculations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Solar Farm Development</p>
                        <p className="text-xs text-muted-foreground">3,250 credits • 95% confidence</p>
                      </div>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Wind Energy Project</p>
                        <p className="text-xs text-muted-foreground">4,120 credits • 92% confidence</p>
                      </div>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Ocean Cleanup Initiative</p>
                        <p className="text-xs text-muted-foreground">1,890 credits • 89% confidence</p>
                      </div>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
