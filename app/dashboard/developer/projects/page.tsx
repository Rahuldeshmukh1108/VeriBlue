import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, MapPin, Calendar, FileText, Upload, Eye, Edit, Trash2 } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function ProjectsPage() {
  const projects = [
    {
      id: "PRJ-001",
      name: "Amazon Reforestation Initiative",
      type: "Forestry",
      location: "Brazil",
      status: "verified",
      progress: 75,
      credits: 5200,
      startDate: "2024-01-15",
      nextMilestone: "Q2 MRV Report",
      image: "/amazon-rainforest.png",
    },
    {
      id: "PRJ-002",
      name: "Solar Farm Development",
      type: "Renewable Energy",
      location: "Kenya",
      status: "in-review",
      progress: 45,
      credits: 0,
      startDate: "2024-03-10",
      nextMilestone: "Verification Review",
      image: "/expansive-solar-farm.png",
    },
    {
      id: "PRJ-003",
      name: "Mangrove Restoration",
      type: "Blue Carbon",
      location: "Philippines",
      status: "planning",
      progress: 15,
      credits: 0,
      startDate: "2024-05-01",
      nextMilestone: "Environmental Assessment",
      image: "/mangrove-restoration-blue-carbon.jpg",
    },
  ]

  return (
    <DashboardLayout userRole="developer" userName="Sarah Chen">
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Project Management</h1>
              <p className="text-gray-600 mt-1">Manage your carbon credit projects and track progress</p>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>

          {/* Project Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-emerald-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Active Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600">8</div>
                <p className="text-xs text-gray-500 mt-1">3 pending verification</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Credits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">12,450</div>
                <p className="text-xs text-gray-500 mt-1">Generated to date</p>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Avg. Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600">67%</div>
                <p className="text-xs text-gray-500 mt-1">Across all projects</p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">94%</div>
                <p className="text-xs text-gray-500 mt-1">Verification rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Project Overview</TabsTrigger>
              <TabsTrigger value="create">Create Project</TabsTrigger>
              <TabsTrigger value="reports">MRV Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="bg-white/80 backdrop-blur-sm hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge
                        className={`absolute top-3 right-3 ${
                          project.status === "verified"
                            ? "bg-emerald-600"
                            : project.status === "in-review"
                              ? "bg-amber-600"
                              : "bg-gray-600"
                        }`}
                      >
                        {project.status === "verified"
                          ? "Verified"
                          : project.status === "in-review"
                            ? "In Review"
                            : "Planning"}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{project.name}</h3>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {project.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {project.startDate}
                        </div>
                      </div>

                      <Badge variant="outline" className="mb-3">
                        {project.type}
                      </Badge>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>

                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium">
                          {project.credits > 0 ? `${project.credits.toLocaleString()} credits` : "No credits yet"}
                        </span>
                        <span className="text-xs text-gray-500">{project.nextMilestone}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="create" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Create New Project</CardTitle>
                  <CardDescription>Start a new carbon credit project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="project-name">Project Name</Label>
                      <Input id="project-name" placeholder="Enter project name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-type">Project Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="forestry">Forestry & REDD+</SelectItem>
                          <SelectItem value="renewable">Renewable Energy</SelectItem>
                          <SelectItem value="waste">Waste Management</SelectItem>
                          <SelectItem value="blue">Blue Carbon</SelectItem>
                          <SelectItem value="agriculture">Agriculture</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="Project location" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input id="start-date" type="date" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your project, methodology, and expected impact..."
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="expected-credits">Expected Credits (Annual)</Label>
                      <Input id="expected-credits" type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-duration">Project Duration (Years)</Label>
                      <Input id="project-duration" type="number" placeholder="10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Project Documents</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Upload project documents, methodology, and supporting files
                      </p>
                      <Button variant="outline" className="mt-2 bg-transparent">
                        Choose Files
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button className="bg-emerald-600 hover:bg-emerald-700">Create Project</Button>
                    <Button variant="outline">Save as Draft</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    MRV Reports
                  </CardTitle>
                  <CardDescription>Monitoring, Reporting, and Verification submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Amazon Reforestation - Q1 2024</h4>
                        <p className="text-sm text-gray-600">Submitted March 31, 2024</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="default" className="bg-emerald-100 text-emerald-800">
                          Approved
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Solar Farm - Q1 2024</h4>
                        <p className="text-sm text-gray-600">Submitted March 28, 2024</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Under Review</Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg border-dashed">
                      <div>
                        <h4 className="font-medium text-gray-500">Mangrove Restoration - Q1 2024</h4>
                        <p className="text-sm text-gray-400">Due April 30, 2024</p>
                      </div>
                      <Button className="bg-emerald-600 hover:bg-emerald-700">
                        <Upload className="w-4 h-4 mr-2" />
                        Submit Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
