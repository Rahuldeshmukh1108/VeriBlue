import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, MapPin, Building, Award, TrendingUp, Leaf, Car, Home } from "lucide-react"

export default function BuyerProfile() {
  return (
    <DashboardLayout userRole="buyer" userName="Maria Rodriguez">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src="/diverse-user-avatars.png" />
                  <AvatarFallback>MR</AvatarFallback>
                </Avatar>
                <Badge className="bg-purple-100 text-purple-800 mb-2">Climate Champion</Badge>
                <Button variant="outline" size="sm">
                  Edit Profile
                </Button>
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">Maria Rodriguez</h1>
                <p className="text-gray-600 mb-4">maria.rodriguez@greentech.com</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">GreenTech Solutions Inc.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Member since February 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Austin, TX</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Sustainability Leader</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Carbon Neutral Goal Progress</span>
                    <span>68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Credits Leased</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">85,420</div>
              <p className="text-xs text-gray-500 mt-1">+12,500 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Credits Returned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">78,900</div>
              <p className="text-xs text-gray-500 mt-1">92.4% return rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Active Leases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">15</div>
              <p className="text-xs text-gray-500 mt-1">Across 8 projects</p>
            </CardContent>
          </Card>
        </div>

        {/* Impact Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Environmental Impact Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-lg">
                <Car className="w-8 h-8 text-emerald-600" />
                <div>
                  <div className="text-2xl font-bold text-emerald-600">342</div>
                  <p className="text-sm text-gray-600">Cars off road for 1 year</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <Leaf className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-blue-600">1,250</div>
                  <p className="text-sm text-gray-600">Trees planted equivalent</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                <Home className="w-8 h-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-purple-600">28</div>
                  <p className="text-sm text-gray-600">Homes powered for 1 year</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Snapshot */}
        <Card>
          <CardHeader>
            <CardTitle>Project Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Amazon Reforestation Phase 3",
                  type: "Forestry",
                  credits: "25,000",
                  status: "Active",
                  impact: "High",
                },
                {
                  name: "Solar Farm Expansion",
                  type: "Renewable Energy",
                  credits: "18,750",
                  status: "Active",
                  impact: "Medium",
                },
                {
                  name: "Mangrove Restoration",
                  type: "Blue Carbon",
                  credits: "15,200",
                  status: "Completed",
                  impact: "High",
                },
                {
                  name: "Wind Energy Project",
                  type: "Renewable Energy",
                  credits: "12,500",
                  status: "Active",
                  impact: "Medium",
                },
              ].map((project, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{project.name}</h4>
                    <p className="text-sm text-gray-500">
                      {project.type} • {project.credits} credits
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={project.impact === "High" ? "default" : "secondary"}>{project.impact} Impact</Badge>
                    <Badge variant={project.status === "Active" ? "default" : "outline"}>{project.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rewards & Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Rewards & Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center p-4 border rounded-lg">
                <Award className="w-8 h-8 text-yellow-500 mb-2" />
                <h4 className="font-medium text-sm">Early Adopter</h4>
                <p className="text-xs text-gray-500 text-center">First 100 buyers</p>
              </div>
              <div className="flex flex-col items-center p-4 border rounded-lg">
                <Leaf className="w-8 h-8 text-emerald-500 mb-2" />
                <h4 className="font-medium text-sm">Climate Champion</h4>
                <p className="text-xs text-gray-500 text-center">50K+ credits offset</p>
              </div>
              <div className="flex flex-col items-center p-4 border rounded-lg">
                <TrendingUp className="w-8 h-8 text-blue-500 mb-2" />
                <h4 className="font-medium text-sm">Consistent Buyer</h4>
                <p className="text-xs text-gray-500 text-center">6 months active</p>
              </div>
              <div className="flex flex-col items-center p-4 border rounded-lg opacity-50">
                <Award className="w-8 h-8 text-gray-400 mb-2" />
                <h4 className="font-medium text-sm">Carbon Neutral</h4>
                <p className="text-xs text-gray-500 text-center">100K+ credits</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
