"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BreadcrumbNav } from "@/components/navigation/breadcrumb-nav"
import { DashboardNav } from "@/components/navigation/dashboard-nav"
import { SkipLink } from "@/components/accessibility/skip-link"
import { KeyboardNavigation } from "@/components/accessibility/keyboard-navigation"
import { Clock, Eye, MapPin, Calendar, Search, FileText, TrendingUp, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function VerifierDashboard() {
  const verificationQueue = [
    {
      id: "RPT-001",
      name: "Amazon Reforestation Initiative",
      developer: "EcoTech Solutions",
      type: "Forestry",
      location: "Brazil",
      credits: 50000,
      priority: "High",
      deadline: "2024-01-15",
      status: "pending",
      progress: 0,
      reportPeriod: "Q1 2024",
    },
    {
      id: "RPT-002",
      name: "Solar Farm Development",
      developer: "GreenEnergy Corp",
      type: "Renewable Energy",
      location: "California, USA",
      credits: 25000,
      priority: "Medium",
      deadline: "2024-01-20",
      status: "in-review",
      progress: 45,
      reportPeriod: "Q4 2023",
    },
    {
      id: "RPT-003",
      name: "Methane Capture Facility",
      developer: "CleanTech Industries",
      type: "Waste Management",
      location: "Texas, USA",
      credits: 15000,
      priority: "Low",
      deadline: "2024-01-25",
      status: "pending",
      progress: 0,
      reportPeriod: "Q1 2024",
    },
  ]

  const recentVerifications = [
    {
      project: "Wind Farm Project Alpha",
      credits: 30000,
      status: "approved",
      date: "2024-01-10",
    },
    {
      project: "Ocean Cleanup Initiative",
      credits: 20000,
      status: "rejected",
      date: "2024-01-08",
    },
    {
      project: "Urban Tree Planting",
      credits: 5000,
      status: "approved",
      date: "2024-01-05",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <KeyboardNavigation />
      <DashboardNav userType="verifier" />

      <main id="main-content" tabIndex={-1} className="container mx-auto px-4 py-8">
        <BreadcrumbNav />

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Verifier Dashboard</h1>
          <p className="text-muted-foreground">Review and verify carbon credit projects and MRV reports</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-primary">Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">12</div>
              <p className="text-xs text-muted-foreground mt-1">+3 from last week</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 bg-secondary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-secondary">Verified Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">2.4M</div>
              <p className="text-xs text-muted-foreground mt-1">Total verified</p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-accent/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-accent-foreground">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent-foreground">94.2%</div>
              <p className="text-xs text-muted-foreground mt-1">Approval rate</p>
            </CardContent>
          </Card>

          <Card className="border-chart-4/20 bg-chart-4/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-chart-4">Reputation Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-4">4.9</div>
              <p className="text-xs text-muted-foreground mt-1">Out of 5.0</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Verification Queue */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      MRV Report Queue
                    </CardTitle>
                    <CardDescription>Reports awaiting your verification</CardDescription>
                  </div>
                  <Link href="/dashboard/verifier/queue">
                    <Button variant="outline" size="sm">
                      <Search className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {verificationQueue.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{report.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {report.reportPeriod} Report by {report.developer}
                        </p>
                      </div>
                      <Badge
                        variant={
                          report.priority === "High"
                            ? "destructive"
                            : report.priority === "Medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {report.priority}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {report.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Due {report.deadline}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm font-medium">{report.credits.toLocaleString()} credits</span>
                        <Badge variant="outline" className="ml-2">
                          {report.type}
                        </Badge>
                      </div>
                      <Link href={`/dashboard/verifier/review/${report.id}`}>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          <Eye className="h-4 w-4 mr-2" />
                          Review Report
                        </Button>
                      </Link>
                    </div>

                    {report.progress > 0 && (
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Review Progress</span>
                          <span>{report.progress}%</span>
                        </div>
                        <Progress value={report.progress} className="h-2" />
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/dashboard/verifier/queue">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Clock className="w-4 h-4 mr-2" />
                    View Queue
                  </Button>
                </Link>
                <Link href="/dashboard/verifier/review/RPT-001">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Start Review
                  </Button>
                </Link>
                <Link href="/dashboard/verifier/analytics">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </Link>
                <Link href="/dashboard/verifier/alerts">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <AlertTriangle className="w-4 w-4 mr-2" />
                    View Alerts
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Verifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentVerifications.map((verification, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{verification.project}</p>
                      <p className="text-xs text-muted-foreground">{verification.credits.toLocaleString()} credits</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={verification.status === "approved" ? "default" : "destructive"} className="mb-1">
                        {verification.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{verification.date}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
