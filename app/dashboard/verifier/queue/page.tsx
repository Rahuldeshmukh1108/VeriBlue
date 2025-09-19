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
} from "lucide-react"
import { UserApprovalModal } from "@/components/verifier/user-approval-modal"

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
              Dashboard
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Verification Queue</h1>
          <p className="text-muted-foreground">
            Review and process user applications and project reports awaiting verification
          </p>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
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
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full md:w-40">
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
                <SelectTrigger className="w-full md:w-40">
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

        {/* Tabbed Interface */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              New User Approvals ({filteredUserApplications.length})
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Project Report Verifications ({filteredProjectReports.length})
            </TabsTrigger>
          </TabsList>

          {/* User Approvals Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-secondary" />
                  User Applications Pending Review
                </CardTitle>
                <CardDescription>Review and approve new user registrations for the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Signup Date</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUserApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {application.userName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{application.userName}</p>
                              <p className="text-xs text-muted-foreground">{application.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <span>{application.organization}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={application.role === "developer" ? "default" : "secondary"}>
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
                            {new Date(application.signupDate).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{application.documentsCount} docs</Badge>
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
                          >
                            {application.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={application.status === "pending" ? "secondary" : "default"}>
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
                          <Button size="sm" variant="outline" onClick={() => handleReviewApplication(application.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Review Application
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Project Reports Tab */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Project Reports Awaiting Verification
                </CardTitle>
                <CardDescription>Audit MRV reports and verify carbon credit claims</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Developer</TableHead>
                      <TableHead>Report Date</TableHead>
                      <TableHead>Credits Claimed</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Waiting</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProjectReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <span className="font-medium">{report.projectName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <span>{report.developer}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {new Date(report.reportDate).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-right">
                            <div className="font-medium">{report.creditsClaimed.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">credits</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {report.reportType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{report.daysWaiting}d</span>
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
                          >
                            {report.priority === "high" && <AlertTriangle className="h-3 w-3 mr-1" />}
                            {report.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={report.status === "pending" ? "secondary" : "default"}>
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
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            Begin Audit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Queue Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Queue Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{userApplications.length + projectReports.length}</div>
              <p className="text-xs text-muted-foreground">
                {userApplications.length} users, {projectReports.length} reports
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">High Priority Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {[...userApplications, ...projectReports].filter((item) => item.priority === "high").length}
              </div>
              <p className="text-xs text-muted-foreground">require immediate attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Wait Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">4.2</div>
              <p className="text-xs text-muted-foreground">days in queue</p>
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
