"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Shield,
  Search,
  Filter,
  UserCheck,
  FileText,
  Calendar,
  Building2,
  User,
  Clock,
  AlertTriangle,
  Eye,
  Home,
  UserCircle,
} from "lucide-react"
import { UserApprovalModal } from "@/components/verifier/user-approval-modal"
import Link from "next/link"

// TypeScript interfaces for queue data
interface UserApplication {
  id: string
  userName: string
  organization: string
  role: "developer" | "buyer"
  signupDate: string
  email: string
  status: "pending" | "under_review"
  priority: "high" | "medium" | "low"
  documentsCount: number
}

interface ProjectReport {
  id: string
  projectName: string
  developer: string
  reportDate: string
  creditsClaimed: number
  reportType: "quarterly" | "annual" | "milestone"
  status: "pending" | "under_review"
  priority: "high" | "medium" | "low"
  daysWaiting: number
}

// Mock data for verification queue
const userApplications: UserApplication[] = [
  {
    id: "1",
    userName: "Marcus Thompson",
    organization: "TechCorp Inc.",
    role: "buyer",
    signupDate: "2024-01-10",
    email: "marcus@techcorp.com",
    status: "pending",
    priority: "high",
    documentsCount: 8,
  },
  {
    id: "2",
    userName: "Sarah Kim",
    organization: "EcoForest Solutions",
    role: "developer",
    signupDate: "2024-01-12",
    email: "sarah@ecoforest.org",
    status: "under_review",
    priority: "medium",
    documentsCount: 12,
  },
  {
    id: "3",
    userName: "David Rodriguez",
    organization: "GreenTech Innovations",
    role: "buyer",
    signupDate: "2024-01-14",
    email: "david@greentech.com",
    status: "pending",
    priority: "medium",
    documentsCount: 6,
  },
  {
    id: "4",
    userName: "Lisa Chen",
    organization: "Blue Carbon Initiative",
    role: "developer",
    signupDate: "2024-01-15",
    email: "lisa@bluecarbon.org",
    status: "pending",
    priority: "low",
    documentsCount: 10,
  },
]

const projectReports: ProjectReport[] = [
  {
    id: "1",
    projectName: "Amazon Rainforest Conservation",
    developer: "EcoForest Solutions",
    reportDate: "2024-01-08",
    creditsClaimed: 2500,
    reportType: "quarterly",
    status: "pending",
    priority: "high",
    daysWaiting: 8,
  },
  {
    id: "2",
    projectName: "Mangrove Restoration Project",
    developer: "Blue Carbon Initiative",
    reportDate: "2024-01-10",
    creditsClaimed: 1800,
    reportType: "milestone",
    status: "under_review",
    priority: "medium",
    daysWaiting: 6,
  },
  {
    id: "3",
    projectName: "Kenya Solar Farm Phase 2",
    developer: "Solar Energy Co.",
    reportDate: "2024-01-12",
    creditsClaimed: 3200,
    reportType: "annual",
    status: "pending",
    priority: "medium",
    daysWaiting: 4,
  },
  {
    id: "4",
    projectName: "Indonesian Peatland Restoration",
    developer: "Peatland Conservation Trust",
    reportDate: "2024-01-14",
    creditsClaimed: 1500,
    reportType: "quarterly",
    status: "pending",
    priority: "low",
    daysWaiting: 2,
  },
]

export default function VerificationQueue() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null)
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false)

  const filteredUserApplications = userApplications.filter((app) => {
    const matchesSearch =
      app.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.organization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = priorityFilter === "all" || app.priority === priorityFilter
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    return matchesSearch && matchesPriority && matchesStatus
  })

  const filteredProjectReports = projectReports.filter((report) => {
    const matchesSearch =
      report.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.developer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = priorityFilter === "all" || report.priority === priorityFilter
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    return matchesSearch && matchesPriority && matchesStatus
  })

  const handleReviewApplication = (applicationId: string) => {
    setSelectedApplicationId(applicationId)
    setIsApprovalModalOpen(true)
  }

  const handleCloseApprovalModal = () => {
    setIsApprovalModalOpen(false)
    setSelectedApplicationId(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">VeriBlue</span>
            <Badge variant="secondary" className="ml-2">
              Verifier
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/verifier">
              <Button variant="outline" size="sm" className="hover:bg-primary/10 transition-colors bg-transparent">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/verifier/profile">
              <Button variant="outline" size="sm" className="hover:bg-primary/10 transition-colors bg-transparent">
                <UserCircle className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </Link>
            <Avatar className="ring-2 ring-primary/20 hover:ring-primary/40 transition-all cursor-pointer">
              <AvatarImage src="/placeholder.svg" alt="Dr. Elena Rodriguez" />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">ER</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Verification Queue
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Review and process user applications and project reports awaiting verification
          </p>
        </div>

        <Card className="mb-6 shadow-sm border-primary/10">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="h-5 w-5 text-primary" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, organization, or project..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-primary/20 focus:border-primary/40 transition-colors"
                  />
                </div>
              </div>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full md:w-40 border-primary/20 focus:border-primary/40">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40 border-primary/20 focus:border-primary/40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50 p-1 rounded-lg">
            <TabsTrigger
              value="users"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
            >
              <UserCheck className="h-4 w-4" />
              New User Approvals ({filteredUserApplications.length})
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
            >
              <FileText className="h-4 w-4" />
              Project Report Verifications ({filteredProjectReports.length})
            </TabsTrigger>
          </TabsList>

          {/* User Approvals Tab */}
          <TabsContent value="users">
            <Card className="shadow-sm border-primary/10">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <UserCheck className="h-6 w-6 text-secondary" />
                  User Applications Pending Review
                </CardTitle>
                <CardDescription className="text-base">
                  Review and approve new user registrations for the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-primary/10 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/30">
                      <TableRow className="hover:bg-muted/50">
                        <TableHead className="font-semibold">User</TableHead>
                        <TableHead className="font-semibold">Organization</TableHead>
                        <TableHead className="font-semibold">Role</TableHead>
                        <TableHead className="font-semibold">Signup Date</TableHead>
                        <TableHead className="font-semibold">Documents</TableHead>
                        <TableHead className="font-semibold">Priority</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUserApplications.map((application) => (
                        <TableRow key={application.id} className="hover:bg-muted/30 transition-colors">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10 ring-2 ring-primary/10">
                                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                                  {application.userName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-foreground">{application.userName}</p>
                                <p className="text-sm text-muted-foreground">{application.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{application.organization}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={application.role === "developer" ? "default" : "secondary"}
                              className="font-medium"
                            >
                              {application.role === "developer" ? (
                                <>
                                  <User className="h-3 w-3 mr-1" />
                                  Developer
                                </>
                              ) : (
                                <>
                                  <Building2 className="h-3 w-3 mr-1" />
                                  Buyer
                                </>
                              )}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">
                                {new Date(application.signupDate).toLocaleDateString()}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-medium">
                              {application.documentsCount} docs
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                application.priority === "high"
                                  ? "destructive"
                                  : application.priority === "medium"
                                    ? "secondary"
                                    : "outline"
                              }
                              className="font-medium"
                            >
                              {application.priority === "high" && <AlertTriangle className="h-3 w-3 mr-1" />}
                              {application.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={application.status === "pending" ? "secondary" : "default"}
                              className="font-medium"
                            >
                              {application.status === "pending" ? (
                                <>
                                  <Clock className="h-3 w-3 mr-1" />
                                  Pending
                                </>
                              ) : (
                                <>
                                  <Eye className="h-3 w-3 mr-1" />
                                  Under Review
                                </>
                              )}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReviewApplication(application.id)}
                              className="hover:bg-primary hover:text-primary-foreground transition-colors"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Review Application
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Project Reports Tab */}
          <TabsContent value="reports">
            <Card className="shadow-sm border-primary/10">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <FileText className="h-6 w-6 text-primary" />
                  Project Reports Awaiting Verification
                </CardTitle>
                <CardDescription className="text-base">
                  Audit MRV reports and verify carbon credit claims
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-primary/10 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/30">
                      <TableRow className="hover:bg-muted/50">
                        <TableHead className="font-semibold">Project</TableHead>
                        <TableHead className="font-semibold">Developer</TableHead>
                        <TableHead className="font-semibold">Report Date</TableHead>
                        <TableHead className="font-semibold">Credits Claimed</TableHead>
                        <TableHead className="font-semibold">Type</TableHead>
                        <TableHead className="font-semibold">Waiting</TableHead>
                        <TableHead className="font-semibold">Priority</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProjectReports.map((report) => (
                        <TableRow key={report.id} className="hover:bg-muted/30 transition-colors">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-primary" />
                              <span className="font-medium">{report.projectName}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{report.developer}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{new Date(report.reportDate).toLocaleDateString()}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-right">
                              <div className="font-bold text-primary">{report.creditsClaimed.toLocaleString()}</div>
                              <div className="text-sm text-muted-foreground">credits</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize font-medium">
                              {report.reportType}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{report.daysWaiting}d</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                report.priority === "high"
                                  ? "destructive"
                                  : report.priority === "medium"
                                    ? "secondary"
                                    : "outline"
                              }
                              className="font-medium"
                            >
                              {report.priority === "high" && <AlertTriangle className="h-3 w-3 mr-1" />}
                              {report.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={report.status === "pending" ? "secondary" : "default"}
                              className="font-medium"
                            >
                              {report.status === "pending" ? (
                                <>
                                  <Clock className="h-3 w-3 mr-1" />
                                  Pending
                                </>
                              ) : (
                                <>
                                  <Eye className="h-3 w-3 mr-1" />
                                  Under Review
                                </>
                              )}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Link href={`/dashboard/verifier/review/${report.id}`}>
                              <Button
                                size="sm"
                                variant="outline"
                                className="hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Begin Audit
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="shadow-sm border-primary/10 hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Total Queue Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-1">
                {userApplications.length + projectReports.length}
              </div>
              <p className="text-sm text-muted-foreground">
                {userApplications.length} users, {projectReports.length} reports
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-primary/10 hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                High Priority Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive mb-1">
                {[...userApplications, ...projectReports].filter((item) => item.priority === "high").length}
              </div>
              <p className="text-sm text-muted-foreground">require immediate attention</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-primary/10 hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Average Wait Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary mb-1">4.2</div>
              <p className="text-sm text-muted-foreground">days in queue</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <UserApprovalModal
        isOpen={isApprovalModalOpen}
        onClose={handleCloseApprovalModal}
        applicationId={selectedApplicationId}
      />
    </div>
  )
}
