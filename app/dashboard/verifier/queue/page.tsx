"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Search, Filter, Clock, MapPin, Calendar, Leaf, Eye, FileText } from "lucide-react"
import Link from "next/link"

export default function VerificationQueuePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const projects = [
    {
      id: "PRJ-001",
      name: "Amazon Reforestation Initiative",
      developer: "EcoTech Solutions",
      type: "Forestry & Land Use",
      location: "Acre, Brazil",
      credits: 50000,
      priority: "High",
      deadline: "2024-01-15",
      status: "Awaiting",
      submittedDate: "2024-01-01",
      methodology: "VCS VM0009",
      estimatedDuration: "3-4 weeks",
    },
    {
      id: "PRJ-002",
      name: "Solar Farm Development",
      developer: "GreenEnergy Corp",
      type: "Renewable Energy",
      location: "Nairobi, Kenya",
      credits: 25000,
      priority: "Medium",
      deadline: "2024-01-20",
      status: "In Review",
      submittedDate: "2023-12-15",
      methodology: "CDM AMS-I.D",
      estimatedDuration: "2-3 weeks",
    },
    {
      id: "PRJ-003",
      name: "Methane Capture Facility",
      developer: "CleanTech Industries",
      type: "Waste Management",
      location: "Texas, USA",
      credits: 15000,
      priority: "Low",
      deadline: "2024-01-25",
      status: "Awaiting",
      submittedDate: "2024-01-05",
      methodology: "CDM AM0001",
      estimatedDuration: "2-3 weeks",
    },
    {
      id: "PRJ-004",
      name: "Mangrove Restoration Project",
      developer: "Ocean Restore Inc",
      type: "Forestry & Land Use",
      location: "Palawan, Philippines",
      credits: 18000,
      priority: "High",
      deadline: "2024-01-18",
      status: "In Review",
      submittedDate: "2023-12-20",
      methodology: "VCS VM0033",
      estimatedDuration: "3-4 weeks",
    },
    {
      id: "PRJ-005",
      name: "Wind Farm Installation",
      developer: "WindTech Solutions",
      type: "Renewable Energy",
      location: "Scotland, UK",
      credits: 35000,
      priority: "Medium",
      deadline: "2024-01-22",
      status: "Completed",
      submittedDate: "2023-11-30",
      methodology: "CDM AMS-I.D",
      estimatedDuration: "2-3 weeks",
    },
    {
      id: "PRJ-006",
      name: "Agricultural Carbon Sequestration",
      developer: "FarmGreen Co",
      type: "Agriculture",
      location: "Iowa, USA",
      credits: 12000,
      priority: "Low",
      deadline: "2024-01-28",
      status: "Awaiting",
      submittedDate: "2024-01-08",
      methodology: "VCS VM0026",
      estimatedDuration: "2-3 weeks",
    },
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.developer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status.toLowerCase().replace(" ", "-") === statusFilter
    const matchesPriority = priorityFilter === "all" || project.priority.toLowerCase() === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Awaiting":
        return "secondary"
      case "In Review":
        return "default"
      case "Completed":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive"
      case "Medium":
        return "default"
      case "Low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/verifier" className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">VeriBlue</span>
            </Link>
            <Badge variant="secondary">Verifier</Badge>
          </div>
          <Link href="/dashboard/verifier">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Verification Queue</h1>
          <p className="text-muted-foreground">Manage and review pending carbon credit projects</p>
        </div>

        {/* Queue Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center text-primary">
                <Clock className="h-4 w-4 mr-2" />
                Awaiting Review
              </CardDescription>
              <CardTitle className="text-2xl text-primary">
                {projects.filter((p) => p.status === "Awaiting").length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Projects pending</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 bg-secondary/5">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center text-secondary">
                <Eye className="h-4 w-4 mr-2" />
                In Review
              </CardDescription>
              <CardTitle className="text-2xl text-secondary">
                {projects.filter((p) => p.status === "In Review").length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Currently reviewing</p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-accent/5">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center text-accent-foreground">
                <FileText className="h-4 w-4 mr-2" />
                Completed
              </CardDescription>
              <CardTitle className="text-2xl text-accent-foreground">
                {projects.filter((p) => p.status === "Completed").length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="border-chart-4/20 bg-chart-4/5">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center text-chart-4">
                <Clock className="h-4 w-4 mr-2" />
                Avg. Review Time
              </CardDescription>
              <CardTitle className="text-2xl text-chart-4">2.8</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">weeks</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="awaiting">Awaiting</SelectItem>
                    <SelectItem value="in-review">In Review</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All priorities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Actions</label>
                <Button variant="outline" className="w-full bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Table */}
        <Card>
          <CardHeader>
            <CardTitle>Projects ({filteredProjects.length})</CardTitle>
            <CardDescription>Click on a project to start verification</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Developer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-muted-foreground">{project.methodology}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{project.developer}</p>
                      <p className="text-sm text-muted-foreground">Submitted {project.submittedDate}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{project.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                        {project.location}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{project.credits.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={getPriorityColor(project.priority)}>{project.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(project.status)}>{project.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        {project.deadline}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Link href="/dashboard/verifier/audit">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Review
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
