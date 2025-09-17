import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Shield,
  Users,
  AlertTriangle,
  TrendingUp,
  Settings,
  UserCheck,
  Ban,
  Eye,
  Activity,
  BarChart3,
  FileText,
  CheckCircle,
} from "lucide-react"

export default function AdminDashboard() {
  const verifiers = [
    {
      id: "VER-001",
      name: "Dr. Sarah Chen",
      email: "sarah.chen@climateverify.com",
      specialization: "Forestry & REDD+",
      verified: 45,
      rating: 4.9,
      status: "active",
      joinDate: "2023-03-15",
    },
    {
      id: "VER-002",
      name: "Prof. Michael Rodriguez",
      email: "m.rodriguez@carbonaudit.org",
      specialization: "Renewable Energy",
      verified: 32,
      rating: 4.7,
      status: "active",
      joinDate: "2023-05-20",
    },
    {
      id: "VER-003",
      name: "Dr. Emma Thompson",
      email: "emma.t@greenverify.com",
      specialization: "Blue Carbon",
      verified: 28,
      rating: 4.8,
      status: "pending",
      joinDate: "2024-01-10",
    },
  ]

  const systemAlerts = [
    {
      type: "warning",
      message: "High verification queue - 15 projects pending",
      time: "2 hours ago",
    },
    {
      type: "info",
      message: "New verifier application received",
      time: "4 hours ago",
    },
    {
      type: "error",
      message: "Dispute raised on Project PRJ-045",
      time: "6 hours ago",
    },
  ]

  const recentActivity = [
    {
      action: "Project Approved",
      details: "Amazon Reforestation Initiative - 50K credits",
      user: "Dr. Sarah Chen",
      time: "1 hour ago",
    },
    {
      action: "Verifier Added",
      details: "Dr. Emma Thompson approved as Blue Carbon specialist",
      user: "System",
      time: "3 hours ago",
    },
    {
      action: "Dispute Resolved",
      details: "Solar Farm Project Beta - Credits released",
      user: "Admin Team",
      time: "5 hours ago",
    },
  ]

  const projects = [
    {
      id: "PRJ-001",
      name: "Amazon Reforestation Initiative",
      developer: "EcoTech Solutions",
      type: "Forestry",
      credits: 50000,
      status: "active",
      verifier: "Dr. Sarah Chen",
      lastUpdate: "2024-01-20",
    },
    {
      id: "PRJ-002",
      name: "Solar Farm Development",
      developer: "GreenEnergy Corp",
      type: "Renewable Energy",
      credits: 25000,
      status: "pending",
      verifier: "Prof. Michael Rodriguez",
      lastUpdate: "2024-01-18",
    },
    {
      id: "PRJ-003",
      name: "Wind Farm Project Beta",
      developer: "CleanTech Industries",
      type: "Renewable Energy",
      credits: 35000,
      status: "suspended",
      verifier: "Dr. Emma Thompson",
      lastUpdate: "2024-01-15",
    },
  ]

  const disputes = [
    {
      id: "DIS-001",
      project: "Solar Farm Development",
      reporter: "GreenBuy Corp",
      type: "Credit Quality",
      status: "open",
      priority: "high",
      created: "2024-01-19",
    },
    {
      id: "DIS-002",
      project: "Wind Farm Project Beta",
      reporter: "EcoInvest Ltd",
      type: "Verification Process",
      status: "investigating",
      priority: "medium",
      created: "2024-01-17",
    },
    {
      id: "DIS-003",
      project: "Mangrove Restoration",
      reporter: "Carbon Solutions",
      type: "Documentation",
      status: "resolved",
      priority: "low",
      created: "2024-01-10",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">System oversight and management</p>
          </div>
          <Button className="bg-slate-600 hover:bg-slate-700">
            <Settings className="w-4 h-4 mr-2" />
            System Settings
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-blue-200 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">1,247</div>
              <p className="text-xs text-gray-500 mt-1">+23 this month</p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Verifiers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">47</div>
              <p className="text-xs text-gray-500 mt-1">3 pending approval</p>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Credits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">15.2M</div>
              <p className="text-xs text-gray-500 mt-1">Verified credits</p>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Open Disputes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">3</div>
              <p className="text-xs text-gray-500 mt-1">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="verifiers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="verifiers">Verifier Management</TabsTrigger>
            <TabsTrigger value="projects">Project Oversight</TabsTrigger>
            <TabsTrigger value="analytics">System Analytics</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
          </TabsList>

          <TabsContent value="verifiers" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      Verifier Management
                    </CardTitle>
                    <CardDescription>Manage verifier accounts and permissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Verifier</TableHead>
                          <TableHead>Specialization</TableHead>
                          <TableHead>Verified</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {verifiers.map((verifier) => (
                          <TableRow key={verifier.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{verifier.name}</p>
                                <p className="text-sm text-gray-500">{verifier.email}</p>
                              </div>
                            </TableCell>
                            <TableCell>{verifier.specialization}</TableCell>
                            <TableCell>{verifier.verified}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <span>{verifier.rating}</span>
                                <span className="text-yellow-400">★</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={verifier.status === "active" ? "default" : "secondary"}>
                                {verifier.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                {verifier.status === "pending" ? (
                                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                                    <UserCheck className="w-4 h-4" />
                                  </Button>
                                ) : (
                                  <Button size="sm" variant="outline">
                                    <Ban className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* System Alerts */}
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-600" />
                      System Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {systemAlerts.map((alert, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border-l-4 ${
                          alert.type === "error"
                            ? "bg-red-50 border-red-400"
                            : alert.type === "warning"
                              ? "bg-amber-50 border-amber-400"
                              : "bg-blue-50 border-blue-400"
                        }`}
                      >
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <UserCheck className="w-4 h-4 mr-2" />
                      Add New Verifier
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Shield className="w-4 h-4 mr-2" />
                      Emergency Stop
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      Project Management
                    </CardTitle>
                    <CardDescription>Monitor and manage carbon credit projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Project</TableHead>
                          <TableHead>Developer</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Credits</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects.map((project) => (
                          <TableRow key={project.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{project.name}</p>
                                <p className="text-sm text-gray-500">{project.id}</p>
                              </div>
                            </TableCell>
                            <TableCell>{project.developer}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{project.type}</Badge>
                            </TableCell>
                            <TableCell>{project.credits.toLocaleString()}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  project.status === "active"
                                    ? "default"
                                    : project.status === "pending"
                                      ? "secondary"
                                      : "destructive"
                                }
                              >
                                {project.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                {project.status === "pending" ? (
                                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                                    <CheckCircle className="w-4 h-4" />
                                  </Button>
                                ) : (
                                  <Button size="sm" variant="outline">
                                    <Ban className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Disputes Overview */}
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      Active Disputes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {disputes
                      .filter((d) => d.status !== "resolved")
                      .map((dispute) => (
                        <div
                          key={dispute.id}
                          className={`p-3 rounded-lg border-l-4 ${
                            dispute.priority === "high"
                              ? "bg-red-50 border-red-400"
                              : dispute.priority === "medium"
                                ? "bg-amber-50 border-amber-400"
                                : "bg-blue-50 border-blue-400"
                          }`}
                        >
                          <p className="text-sm font-medium">{dispute.project}</p>
                          <p className="text-xs text-gray-600">{dispute.type}</p>
                          <div className="flex justify-between items-center mt-2">
                            <Badge variant="outline" className="text-xs">
                              {dispute.priority}
                            </Badge>
                            <span className="text-xs text-gray-500">{dispute.created}</span>
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>

                {/* Project Stats */}
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Project Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Active Projects</span>
                      <span className="text-sm font-medium">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Pending Verification</span>
                      <span className="text-sm font-medium">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Suspended</span>
                      <span className="text-sm font-medium">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Credits</span>
                      <span className="text-sm font-medium">15.2M</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    Platform Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600">Monthly Revenue</p>
                      <p className="text-2xl font-bold text-blue-600">$127K</p>
                      <p className="text-xs text-green-600">+12% from last month</p>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-lg">
                      <p className="text-sm text-gray-600">Active Users</p>
                      <p className="text-2xl font-bold text-emerald-600">2,847</p>
                      <p className="text-xs text-green-600">+8% from last month</p>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <p className="text-sm text-gray-600">Credits Traded</p>
                      <p className="text-2xl font-bold text-amber-600">450K</p>
                      <p className="text-xs text-green-600">+15% from last month</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600">Avg. Transaction</p>
                      <p className="text-2xl font-bold text-purple-600">$2,340</p>
                      <p className="text-xs text-red-600">-3% from last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Developers</span>
                        <span>1,247 (+23)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Buyers</span>
                        <span>892 (+15)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Verifiers</span>
                        <span>47 (+3)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: "25%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Response Time</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">145ms</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database Performance</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">98.7%</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Server Uptime</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">99.9%</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Error Rate</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">0.1%</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Transaction Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Today</span>
                      <span className="text-sm font-medium">$45,230</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">This Week</span>
                      <span className="text-sm font-medium">$312,450</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">This Month</span>
                      <span className="text-sm font-medium">$1,247,890</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">All Time</span>
                      <span className="text-sm font-medium">$15,678,234</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Recent Activity
                </CardTitle>
                <CardDescription>System-wide activity and events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.details}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">by {activity.user}</span>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
