import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, MapPin, Shield, Award, TrendingUp, CheckCircle, XCircle } from "lucide-react"

export default function VerifierProfile() {
  return (
    <DashboardLayout userRole="verifier" userName="Dr. Sarah Kim">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src="/diverse-user-avatars.png" />
                  <AvatarFallback>SK</AvatarFallback>
                </Avatar>
                <Badge className="bg-blue-100 text-blue-800 mb-2">Lead Verifier</Badge>
                <Button variant="outline" size="sm">
                  Edit Profile
                </Button>
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">Dr. Sarah Kim</h1>
                <p className="text-gray-600 mb-4">sarah.kim@carbonfiesta.com</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Verifier ID: VER-2024-001</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Certified January 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Global Remote</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Reputation Score: 98.5%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Trust Level Progress</span>
                    <span>98.5%</span>
                  </div>
                  <Progress value={98.5} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Projects Verified</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">127</div>
              <p className="text-xs text-gray-500 mt-1">+8 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Credits Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">2.1M</div>
              <p className="text-xs text-gray-500 mt-1">+150K this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Rejections Made</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">12</div>
              <p className="text-xs text-gray-500 mt-1">1.5% rejection rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Avg. Review Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">2.3</div>
              <p className="text-xs text-gray-500 mt-1">days per project</p>
            </CardContent>
          </Card>
        </div>

        {/* Badge System */}
        <Card>
          <CardHeader>
            <CardTitle>Verifier Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center p-4 border rounded-lg">
                <Award className="w-8 h-8 text-yellow-500 mb-2" />
                <h4 className="font-medium text-sm">Trusted Verifier</h4>
                <p className="text-xs text-gray-500 text-center">100+ verified projects</p>
              </div>
              <div className="flex flex-col items-center p-4 border rounded-lg">
                <Shield className="w-8 h-8 text-blue-500 mb-2" />
                <h4 className="font-medium text-sm">Senior Verifier</h4>
                <p className="text-xs text-gray-500 text-center">2+ years experience</p>
              </div>
              <div className="flex flex-col items-center p-4 border rounded-lg">
                <TrendingUp className="w-8 h-8 text-emerald-500 mb-2" />
                <h4 className="font-medium text-sm">Lead Verifier</h4>
                <p className="text-xs text-gray-500 text-center">Top 5% performance</p>
              </div>
              <div className="flex flex-col items-center p-4 border rounded-lg opacity-50">
                <Award className="w-8 h-8 text-gray-400 mb-2" />
                <h4 className="font-medium text-sm">Master Verifier</h4>
                <p className="text-xs text-gray-500 text-center">500+ projects</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Public Attestations */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Public Attestations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { project: "Amazon Reforestation Phase 3", credits: "12,500", date: "2024-03-20", status: "Approved" },
                { project: "Solar Farm Expansion", credits: "8,750", date: "2024-03-18", status: "Approved" },
                { project: "Wind Energy Project", credits: "15,200", date: "2024-03-15", status: "Rejected" },
                { project: "Mangrove Restoration", credits: "9,800", date: "2024-03-12", status: "Approved" },
              ].map((attestation, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {attestation.status === "Approved" ? (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <div>
                      <h4 className="font-medium">{attestation.project}</h4>
                      <p className="text-sm text-gray-500">
                        {attestation.credits} credits • {attestation.date}
                      </p>
                    </div>
                  </div>
                  <Badge variant={attestation.status === "Approved" ? "default" : "destructive"}>
                    {attestation.status}
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
