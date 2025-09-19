"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  ThumbsUp,
  MapPin,
  Calendar,
  DollarSign,
  Leaf,
  CheckCircle,
  Clock,
  User,
  Check,
  X,
  LogOut,
  UserCog,
} from "lucide-react"
import { useState } from "react"

export default function AdminDashboard() {
  const [verifiedProjects, setVerifiedProjects] = useState<Set<string>>(new Set())

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
      location: "San Francisco, CA",
      experience: "8 years",
      certifications: ["ISO 14064", "VCS", "Gold Standard"],
      bio: "Dr. Sarah Chen is a leading expert in forestry carbon projects with over 8 years of experience in REDD+ methodology. She has verified over 45 projects across Southeast Asia and Latin America.",
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
      location: "Austin, TX",
      experience: "12 years",
      certifications: ["CDM", "VCS", "ACR"],
      bio: "Professor Michael Rodriguez specializes in renewable energy carbon projects with extensive experience in wind and solar verification across North and South America.",
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
      location: "Miami, FL",
      experience: "6 years",
      certifications: ["VCS", "Plan Vivo"],
      bio: "Dr. Emma Thompson is a marine biologist turned carbon verifier, specializing in blue carbon ecosystems including mangroves, seagrass, and salt marshes.",
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
      location: "Amazon Basin, Brazil",
      startDate: "2023-06-15",
      endDate: "2028-06-15",
      area: "12,500 hectares",
      methodology: "VM0007 REDD+ Methodology Framework",
      carbonPrice: "$15.50 per credit",
      totalInvestment: "$2.5M",
      verificationDate: "2024-01-15",
      nextVerification: "2024-07-15",
      description:
        "Large-scale reforestation project in the Amazon rainforest focusing on native species restoration and biodiversity conservation. The project aims to sequester 50,000 tons of CO2 over 5 years while providing sustainable livelihoods for local communities.",
      keyMetrics: {
        treesPlanted: "125,000",
        speciesCount: "45 native species",
        communityJobs: "150 local jobs created",
        biodiversityIndex: "High (8.5/10)",
      },
      verifierNotes:
        "Excellent project implementation with strong community engagement. Monitoring systems are robust and data quality is high. Recommended for continued verification.",
      riskAssessment: "Low risk - Well-established methodology, experienced developer, strong local partnerships",
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
      location: "Rajasthan, India",
      startDate: "2023-09-01",
      endDate: "2033-09-01",
      area: "500 hectares",
      methodology: "ACM0002 Grid-connected electricity generation",
      carbonPrice: "$12.75 per credit",
      totalInvestment: "$15M",
      verificationDate: "Pending",
      nextVerification: "2024-02-01",
      description:
        "Utility-scale solar photovoltaic power plant generating clean electricity for the regional grid. The project displaces fossil fuel-based electricity generation and contributes to India's renewable energy targets.",
      keyMetrics: {
        capacity: "50 MW",
        annualGeneration: "85 GWh",
        householdsServed: "45,000",
        co2Avoided: "25,000 tons/year",
      },
      verifierNotes:
        "Project documentation is comprehensive. Site visit completed successfully. Awaiting final grid connection approval before verification completion.",
      riskAssessment: "Medium risk - Regulatory approvals pending, but technical implementation is sound",
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
      location: "Texas, USA",
      startDate: "2023-03-01",
      endDate: "2043-03-01",
      area: "2,000 hectares",
      methodology: "ACM0002 Grid-connected electricity generation",
      carbonPrice: "$14.25 per credit",
      totalInvestment: "$45M",
      verificationDate: "2023-12-10",
      nextVerification: "On hold",
      description:
        "Large-scale wind energy project with 25 turbines generating clean electricity. Project currently suspended due to environmental impact assessment review.",
      keyMetrics: {
        capacity: "75 MW",
        annualGeneration: "180 GWh",
        householdsServed: "65,000",
        co2Avoided: "35,000 tons/year",
      },
      verifierNotes:
        "Technical implementation is excellent, but project suspended pending resolution of environmental concerns raised by local wildlife protection agency.",
      riskAssessment: "High risk - Environmental compliance issues under review",
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

  const handleVerifyProject = (projectId: string) => {
    setVerifiedProjects((prev) => new Set([...prev, projectId]))
  }

  const getProjectDetails = (projectId: string) => {
    return projects.find((p) => p.id === projectId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">System oversight and management</p>
          </div>
          <div className="flex items-center gap-4">
            <Button className="bg-slate-600 hover:bg-slate-700">
              <Settings className="w-4 h-4 mr-2" />
              System Settings
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/admin-avatar.jpg" alt="Admin" />
                    <AvatarFallback className="bg-blue-600 text-white">AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Admin User</p>
                    <p className="text-xs leading-none text-muted-foreground">admin@carbonfiesta.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserCog className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Account Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-blue-200 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                Total Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">1,247</div>
              <p className="text-xs text-gray-500 mt-1">+23 this month</p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                Active Verifiers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">47</div>
              <p className="text-xs text-gray-500 mt-1">3 pending approval</p>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-amber-600" />
                Total Credits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">15.2M</div>
              <p className="text-xs text-gray-500 mt-1">Verified credits</p>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-red-600" />
                Open Disputes
              </CardTitle>
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
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button size="sm" variant="outline" title="View verifier details">
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                    <DialogHeader>
                                      <DialogTitle className="flex items-center gap-2">
                                        <User className="w-5 h-5 text-blue-600" />
                                        Verifier Profile: {verifier.name}
                                      </DialogTitle>
                                      <DialogDescription>
                                        Comprehensive verifier details and performance metrics
                                      </DialogDescription>
                                    </DialogHeader>

                                    <div className="space-y-6">
                                      {/* Verifier Overview */}
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Card>
                                          <CardHeader className="pb-3">
                                            <CardTitle className="text-lg">Personal Information</CardTitle>
                                          </CardHeader>
                                          <CardContent className="space-y-3">
                                            <div className="flex items-center gap-2">
                                              <User className="w-4 h-4 text-gray-500" />
                                              <span className="text-sm">{verifier.name}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <MapPin className="w-4 h-4 text-gray-500" />
                                              <span className="text-sm">{verifier.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <Calendar className="w-4 h-4 text-gray-500" />
                                              <span className="text-sm">Joined: {verifier.joinDate}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <Shield className="w-4 h-4 text-gray-500" />
                                              <span className="text-sm">Experience: {verifier.experience}</span>
                                            </div>
                                          </CardContent>
                                        </Card>

                                        <Card>
                                          <CardHeader className="pb-3">
                                            <CardTitle className="text-lg">Performance Metrics</CardTitle>
                                          </CardHeader>
                                          <CardContent className="space-y-3">
                                            <div className="flex justify-between">
                                              <span className="text-sm text-gray-600">Projects Verified</span>
                                              <span className="text-sm font-medium">{verifier.verified}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-sm text-gray-600">Average Rating</span>
                                              <span className="text-sm font-medium">{verifier.rating} ★</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-sm text-gray-600">Specialization</span>
                                              <span className="text-sm font-medium">{verifier.specialization}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-sm text-gray-600">Status</span>
                                              <Badge variant={verifier.status === "active" ? "default" : "secondary"}>
                                                {verifier.status}
                                              </Badge>
                                            </div>
                                          </CardContent>
                                        </Card>
                                      </div>

                                      {/* Bio */}
                                      <Card>
                                        <CardHeader>
                                          <CardTitle className="text-lg">Professional Background</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <p className="text-sm text-gray-700 leading-relaxed">{verifier.bio}</p>
                                        </CardContent>
                                      </Card>

                                      {/* Certifications */}
                                      <Card>
                                        <CardHeader>
                                          <CardTitle className="text-lg">Certifications</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <div className="flex flex-wrap gap-2">
                                            {verifier.certifications.map((cert, index) => (
                                              <Badge key={index} variant="outline" className="bg-blue-50">
                                                {cert}
                                              </Badge>
                                            ))}
                                          </div>
                                        </CardContent>
                                      </Card>
                                    </div>
                                  </DialogContent>
                                </Dialog>

                                {verifier.status === "active" ? (
                                  <Button size="sm" className="bg-green-600 hover:bg-green-700" title="Active verifier">
                                    <Check className="w-4 h-4" />
                                  </Button>
                                ) : verifier.status === "pending" ? (
                                  <Button size="sm" className="bg-red-600 hover:bg-red-700" title="Pending approval">
                                    <X className="w-4 h-4" />
                                  </Button>
                                ) : (
                                  <Button size="sm" variant="outline" title="Suspended">
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
                              {verifiedProjects.has(project.id) ? (
                                <Badge className="bg-green-100 text-green-800 border-green-300">Verified ✓</Badge>
                              ) : (
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
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      title="View detailed project report"
                                      className="hover:bg-blue-50 bg-transparent"
                                    >
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                    <DialogHeader>
                                      <DialogTitle className="flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-blue-600" />
                                        Project Report: {project.name}
                                      </DialogTitle>
                                      <DialogDescription>
                                        Comprehensive project details and verification report
                                      </DialogDescription>
                                    </DialogHeader>

                                    <div className="space-y-6">
                                      {/* Project Overview */}
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Card>
                                          <CardHeader className="pb-3">
                                            <CardTitle className="text-lg">Project Overview</CardTitle>
                                          </CardHeader>
                                          <CardContent className="space-y-3">
                                            <div className="flex items-center gap-2">
                                              <MapPin className="w-4 h-4 text-gray-500" />
                                              <span className="text-sm">{project.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <Calendar className="w-4 h-4 text-gray-500" />
                                              <span className="text-sm">
                                                {project.startDate} - {project.endDate}
                                              </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <Leaf className="w-4 h-4 text-gray-500" />
                                              <span className="text-sm">Area: {project.area}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <DollarSign className="w-4 h-4 text-gray-500" />
                                              <span className="text-sm">{project.carbonPrice}</span>
                                            </div>
                                          </CardContent>
                                        </Card>

                                        <Card>
                                          <CardHeader className="pb-3">
                                            <CardTitle className="text-lg">Verification Status</CardTitle>
                                          </CardHeader>
                                          <CardContent className="space-y-3">
                                            <div className="flex items-center gap-2">
                                              <User className="w-4 h-4 text-gray-500" />
                                              <span className="text-sm">Verifier: {project.verifier}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <CheckCircle className="w-4 h-4 text-gray-500" />
                                              <span className="text-sm">Last Verified: {project.verificationDate}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <Clock className="w-4 h-4 text-gray-500" />
                                              <span className="text-sm">
                                                Next Verification: {project.nextVerification}
                                              </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <FileText className="w-4 h-4 text-gray-500" />
                                              <span className="text-sm">Methodology: {project.methodology}</span>
                                            </div>
                                          </CardContent>
                                        </Card>
                                      </div>

                                      {/* Project Description */}
                                      <Card>
                                        <CardHeader>
                                          <CardTitle className="text-lg">Project Description</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <p className="text-sm text-gray-700 leading-relaxed">{project.description}</p>
                                        </CardContent>
                                      </Card>

                                      {/* Key Metrics */}
                                      <Card>
                                        <CardHeader>
                                          <CardTitle className="text-lg">Key Performance Metrics</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {Object.entries(project.keyMetrics).map(([key, value]) => (
                                              <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                                                <p className="text-sm font-medium text-gray-600 capitalize">
                                                  {key.replace(/([A-Z])/g, " $1").trim()}
                                                </p>
                                                <p className="text-lg font-bold text-blue-600">{value}</p>
                                              </div>
                                            ))}
                                          </div>
                                        </CardContent>
                                      </Card>

                                      {/* Verifier Assessment */}
                                      <Card>
                                        <CardHeader>
                                          <CardTitle className="text-lg">Verifier Assessment</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                          <div>
                                            <h4 className="font-medium text-sm mb-2">Verification Notes:</h4>
                                            <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg">
                                              {project.verifierNotes}
                                            </p>
                                          </div>
                                          <div>
                                            <h4 className="font-medium text-sm mb-2">Risk Assessment:</h4>
                                            <p
                                              className={`text-sm p-3 rounded-lg ${
                                                project.riskAssessment.includes("Low")
                                                  ? "bg-green-50 text-green-800"
                                                  : project.riskAssessment.includes("Medium")
                                                    ? "bg-yellow-50 text-yellow-800"
                                                    : "bg-red-50 text-red-800"
                                              }`}
                                            >
                                              {project.riskAssessment}
                                            </p>
                                          </div>
                                        </CardContent>
                                      </Card>

                                      {/* Financial Information */}
                                      <Card>
                                        <CardHeader>
                                          <CardTitle className="text-lg">Financial Summary</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="text-center p-3 bg-emerald-50 rounded-lg">
                                              <p className="text-sm font-medium text-gray-600">Total Investment</p>
                                              <p className="text-xl font-bold text-emerald-600">
                                                {project.totalInvestment}
                                              </p>
                                            </div>
                                            <div className="text-center p-3 bg-blue-50 rounded-lg">
                                              <p className="text-sm font-medium text-gray-600">Carbon Credits</p>
                                              <p className="text-xl font-bold text-blue-600">
                                                {project.credits.toLocaleString()}
                                              </p>
                                            </div>
                                            <div className="text-center p-3 bg-purple-50 rounded-lg">
                                              <p className="text-sm font-medium text-gray-600">Estimated Value</p>
                                              <p className="text-xl font-bold text-purple-600">
                                                $
                                                {(
                                                  project.credits *
                                                  Number.parseFloat(project.carbonPrice.replace("$", "").split(" ")[0])
                                                ).toLocaleString()}
                                              </p>
                                            </div>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    </div>
                                  </DialogContent>
                                </Dialog>

                                {!verifiedProjects.has(project.id) && project.status !== "suspended" ? (
                                  <Button
                                    size="sm"
                                    className="bg-emerald-600 hover:bg-emerald-700"
                                    title="Verify project after reviewing report"
                                    onClick={() => handleVerifyProject(project.id)}
                                  >
                                    <ThumbsUp className="w-4 h-4" />
                                  </Button>
                                ) : project.status === "suspended" ? (
                                  <Button size="sm" variant="outline" title="Suspend project">
                                    <Ban className="w-4 h-4" />
                                  </Button>
                                ) : null}
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
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      Project Statistics
                    </CardTitle>
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
                    <div className="flex justify-between">
                      <span className="text-sm">Verified Today</span>
                      <span className="text-sm font-medium text-green-600">{verifiedProjects.size}</span>
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
