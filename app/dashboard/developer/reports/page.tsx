"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BreadcrumbNav } from "@/components/navigation/breadcrumb-nav"
import { DashboardNav } from "@/components/navigation/dashboard-nav"
import { SkipLink } from "@/components/accessibility/skip-link"
import { KeyboardNavigation } from "@/components/accessibility/keyboard-navigation"
import { ReportWorkflowTracker } from "@/components/workflow/report-workflow-tracker"
import { ReportGenerationForm } from "@/components/mrv/report-generation-form"
import { FileText, Plus, TrendingUp, Clock } from "lucide-react"
import Link from "next/link"

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <KeyboardNavigation />
      <DashboardNav userType="developer" />

      <main id="main-content" tabIndex={-1} className="container mx-auto px-4 py-8">
        <BreadcrumbNav />

        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Report Management</h1>
              <p className="text-muted-foreground">
                Track your MRV reports through the verification and credit minting process
              </p>
            </div>
            <Link href="/dashboard/developer/reports/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Report
              </Button>
            </Link>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Total Reports
              </CardDescription>
              <CardTitle className="text-2xl text-primary">12</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">+3 this quarter</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Under Review
              </CardDescription>
              <CardTitle className="text-2xl text-yellow-600">4</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Avg. 3.2 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Verified
              </CardDescription>
              <CardTitle className="text-2xl text-green-600">8</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">66.7% success rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Credits Minted
              </CardDescription>
              <CardTitle className="text-2xl text-purple-600">15,240</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">From verified reports</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Active Workflows</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="new">Submit New Report</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <ReportWorkflowTracker projectId="all" />
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Completed Reports</CardTitle>
                <CardDescription>Successfully verified reports and minted credits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Solar Farm Development - Q4 2023</h4>
                      <p className="text-sm text-muted-foreground">Verified on Jan 13, 2024 • 3,250 credits minted</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Mangrove Restoration - Q3 2023</h4>
                      <p className="text-sm text-muted-foreground">Verified on Dec 8, 2023 • 2,180 credits minted</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="new" className="space-y-6">
            <ReportGenerationForm projectId="new" />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
