import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, MapPin, Wallet, Award, Clock } from "lucide-react"

export default function DeveloperProfile() {
  return (
    <DashboardLayout userRole="developer" userName="Alex Chen">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src="/diverse-user-avatars.png" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <Badge className="bg-emerald-100 text-emerald-800 mb-2">Expert Developer</Badge>
                <Button variant="outline" size="sm">
                  Edit Profile
                </Button>
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">Alex Chen</h1>
                <p className="text-gray-600 mb-4">alex.chen@carbonfiesta.com</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">0x742d...8f3a</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Joined March 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Level 3 Developer</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to Level 4</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">12</div>
              <p className="text-xs text-gray-500 mt-1">+2 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Credits Minted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">45,230</div>
              <p className="text-xs text-gray-500 mt-1">+5,420 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Active Leases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">8</div>
              <p className="text-xs text-gray-500 mt-1">Generating revenue</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Amazon Reforestation Phase 3", status: "Active", credits: "12,500", date: "2024-03-15" },
                { name: "Solar Farm Expansion", status: "Verification", credits: "8,750", date: "2024-03-10" },
                { name: "Mangrove Restoration", status: "Completed", credits: "15,200", date: "2024-02-28" },
              ].map((project, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{project.name}</h4>
                    <p className="text-sm text-gray-500">
                      {project.credits} credits • {project.date}
                    </p>
                  </div>
                  <Badge
                    variant={
                      project.status === "Active"
                        ? "default"
                        : project.status === "Verification"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* MRV Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Recent MRV Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  project: "Amazon Reforestation Phase 3",
                  type: "Monthly Report",
                  date: "2024-03-20",
                  status: "Approved",
                },
                {
                  project: "Solar Farm Expansion",
                  type: "Quarterly Audit",
                  date: "2024-03-15",
                  status: "Under Review",
                },
                { project: "Mangrove Restoration", type: "Impact Assessment", date: "2024-03-10", status: "Approved" },
              ].map((submission, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <h4 className="font-medium">{submission.project}</h4>
                    <p className="text-sm text-gray-500">
                      {submission.type} • {submission.date}
                    </p>
                  </div>
                  <Badge variant={submission.status === "Approved" ? "default" : "secondary"}>
                    {submission.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
