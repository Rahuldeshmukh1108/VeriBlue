import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Eye, MessageSquare, Clock, CheckCircle, Filter } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function DisputesPage() {
  const disputes = [
    {
      id: "DIS-001",
      project: "Solar Farm Development",
      projectId: "PRJ-002",
      reporter: "GreenBuy Corp",
      reporterEmail: "disputes@greenbuy.com",
      type: "Credit Quality",
      description: "Concerns about the actual CO2 reduction calculations",
      status: "open",
      priority: "high",
      created: "2024-01-19",
      lastUpdate: "2024-01-20",
      assignedTo: "Admin Team",
    },
    {
      id: "DIS-002",
      project: "Wind Farm Project Beta",
      projectId: "PRJ-003",
      reporter: "EcoInvest Ltd",
      reporterEmail: "legal@ecoinvest.com",
      type: "Verification Process",
      description: "Questions about verifier independence and methodology",
      status: "investigating",
      priority: "medium",
      created: "2024-01-17",
      lastUpdate: "2024-01-19",
      assignedTo: "James Wilson",
    },
    {
      id: "DIS-003",
      project: "Mangrove Restoration",
      projectId: "PRJ-004",
      reporter: "Carbon Solutions",
      reporterEmail: "support@carbonsolutions.org",
      type: "Documentation",
      description: "Missing environmental impact documentation",
      status: "resolved",
      priority: "low",
      created: "2024-01-10",
      lastUpdate: "2024-01-15",
      assignedTo: "Sarah Chen",
      resolution: "Additional documentation provided and verified",
    },
    {
      id: "DIS-004",
      project: "Amazon Reforestation Initiative",
      projectId: "PRJ-001",
      reporter: "ClimateWatch NGO",
      reporterEmail: "alerts@climatewatch.org",
      type: "Additionality",
      description: "Concerns about project additionality claims",
      status: "escalated",
      priority: "high",
      created: "2024-01-12",
      lastUpdate: "2024-01-18",
      assignedTo: "Legal Team",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800"
      case "investigating":
        return "bg-amber-100 text-amber-800"
      case "escalated":
        return "bg-purple-100 text-purple-800"
      case "resolved":
        return "bg-emerald-100 text-emerald-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-amber-100 text-amber-800"
      case "low":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dispute Management</h1>
              <p className="text-gray-600 mt-1">Monitor and resolve platform disputes</p>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Search disputes..." className="w-64" />
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-red-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Open Disputes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {disputes.filter((d) => d.status === "open").length}
                </div>
                <p className="text-xs text-gray-500 mt-1">Requires immediate attention</p>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Investigating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600">
                  {disputes.filter((d) => d.status === "investigating").length}
                </div>
                <p className="text-xs text-gray-500 mt-1">Under review</p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Escalated</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {disputes.filter((d) => d.status === "escalated").length}
                </div>
                <p className="text-xs text-gray-500 mt-1">Legal review</p>
              </CardContent>
            </Card>

            <Card className="border-emerald-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Resolved (30d)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600">
                  {disputes.filter((d) => d.status === "resolved").length}
                </div>
                <p className="text-xs text-gray-500 mt-1">95% resolution rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="active" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active">Active Disputes</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    Active Disputes
                  </CardTitle>
                  <CardDescription>Disputes requiring attention or investigation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {disputes
                      .filter((d) => d.status !== "resolved")
                      .map((dispute) => (
                        <div key={dispute.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900">{dispute.project}</h3>
                              <p className="text-sm text-gray-600">Dispute ID: {dispute.id}</p>
                            </div>
                            <div className="flex gap-2">
                              <Badge className={getPriorityColor(dispute.priority)}>{dispute.priority}</Badge>
                              <Badge className={getStatusColor(dispute.status)}>{dispute.status}</Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Reporter</p>
                              <p className="text-sm text-gray-600">{dispute.reporter}</p>
                              <p className="text-xs text-gray-500">{dispute.reporterEmail}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">Type</p>
                              <p className="text-sm text-gray-600">{dispute.type}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">Assigned To</p>
                              <p className="text-sm text-gray-600">{dispute.assignedTo}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">Last Update</p>
                              <p className="text-sm text-gray-600">{dispute.lastUpdate}</p>
                            </div>
                          </div>

                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-1">Description</p>
                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{dispute.description}</p>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Created: {dispute.created}</span>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-1" />
                                View Details
                              </Button>
                              <Button variant="outline" size="sm">
                                <MessageSquare className="w-4 h-4 mr-1" />
                                Add Comment
                              </Button>
                              {dispute.status === "open" && (
                                <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                                  <Clock className="w-4 h-4 mr-1" />
                                  Start Investigation
                                </Button>
                              )}
                              {dispute.status === "investigating" && (
                                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Resolve
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resolved" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    Resolved Disputes
                  </CardTitle>
                  <CardDescription>Successfully resolved disputes and their outcomes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {disputes
                      .filter((d) => d.status === "resolved")
                      .map((dispute) => (
                        <div key={dispute.id} className="border rounded-lg p-4 bg-emerald-50">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900">{dispute.project}</h3>
                              <p className="text-sm text-gray-600">Dispute ID: {dispute.id}</p>
                            </div>
                            <Badge className="bg-emerald-100 text-emerald-800">Resolved</Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Reporter</p>
                              <p className="text-sm text-gray-600">{dispute.reporter}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">Type</p>
                              <p className="text-sm text-gray-600">{dispute.type}</p>
                            </div>
                          </div>

                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-1">Resolution</p>
                            <p className="text-sm text-gray-600 bg-white p-3 rounded border">{dispute.resolution}</p>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Resolved: {dispute.lastUpdate}</span>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View Full History
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Dispute Types</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Credit Quality</span>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Verification Process</span>
                        <span className="text-sm font-medium">28%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Documentation</span>
                        <span className="text-sm font-medium">22%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Additionality</span>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Resolution Times</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Average Resolution</span>
                        <span className="text-sm font-medium">5.2 days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">High Priority</span>
                        <span className="text-sm font-medium">2.1 days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Medium Priority</span>
                        <span className="text-sm font-medium">4.8 days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Low Priority</span>
                        <span className="text-sm font-medium">8.3 days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
