"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BreadcrumbNav } from "@/components/navigation/breadcrumb-nav"
import { DashboardNav } from "@/components/navigation/dashboard-nav"
import { SkipLink } from "@/components/accessibility/skip-link"
import { KeyboardNavigation } from "@/components/accessibility/keyboard-navigation"
import { IoTMonitoringDashboard } from "@/components/mrv/iot-monitoring-dashboard"
import { ReportGenerationForm } from "@/components/mrv/report-generation-form"
import { useParams } from "next/navigation"
import { ArrowLeft, Activity, FileText, Settings } from "lucide-react"
import Link from "next/link"

export default function MRVSystemPage() {
  const params = useParams()
  const projectId = params.id as string

  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <KeyboardNavigation />
      <DashboardNav userType="developer" />

      <main id="main-content" tabIndex={-1} className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href={`/dashboard/developer/projects/${projectId}`}>
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Project
            </Button>
          </Link>
          <BreadcrumbNav />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">MRV System</h1>
          <p className="text-muted-foreground">
            Monitoring, Reporting, and Verification system for real-time project tracking
          </p>
        </div>

        <Tabs defaultValue="monitoring" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="monitoring" className="flex items-center">
              <Activity className="h-4 w-4 mr-2" />
              Monitoring
            </TabsTrigger>
            <TabsTrigger value="reporting" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Reporting
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="monitoring" className="space-y-6">
            <IoTMonitoringDashboard projectId={projectId} />
          </TabsContent>

          <TabsContent value="reporting" className="space-y-6">
            <ReportGenerationForm projectId={projectId} />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>IoT Configuration</CardTitle>
                <CardDescription>Configure your IoT sensors and monitoring parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Data Collection Interval</label>
                      <select className="w-full mt-1 p-2 border rounded-md">
                        <option>Every 30 seconds</option>
                        <option>Every 1 minute</option>
                        <option>Every 5 minutes</option>
                        <option>Every 15 minutes</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Alert Threshold</label>
                      <select className="w-full mt-1 p-2 border rounded-md">
                        <option>Conservative</option>
                        <option>Moderate</option>
                        <option>Aggressive</option>
                      </select>
                    </div>
                  </div>
                  <Button>Save Configuration</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
