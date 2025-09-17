import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Shield, Calendar, MapPin, Award, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export default function AdminProfile() {
  return (
    <DashboardLayout userRole="admin" userName="James Wilson">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src="/diverse-user-avatars.png" />
                  <AvatarFallback>JW</AvatarFallback>
                </Avatar>
                <Badge className="bg-slate-100 text-slate-800 mb-2">Super Admin</Badge>
                <Button variant="outline" size="sm">
                  Edit Profile
                </Button>
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">James Wilson</h1>
                <p className="text-gray-600 mb-4">james.wilson@carbonfiesta.com</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Admin ID: ADM-2024-001</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Admin since January 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Platform Administrator</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="font-medium mb-2">Role Permissions</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-emerald-600">✓ User Management</span>
                    <span className="text-emerald-600">✓ Verifier Oversight</span>
                    <span className="text-emerald-600">✓ Dispute Resolution</span>
                    <span className="text-emerald-600">✓ System Analytics</span>
                    <span className="text-emerald-600">✓ Platform Settings</span>
                    <span className="text-emerald-600">✓ Security Controls</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Verifiers Managed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-600">47</div>
              <p className="text-xs text-gray-500 mt-1">+3 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Disputes Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">23</div>
              <p className="text-xs text-gray-500 mt-1">95% resolution rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Projects Suspended</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">5</div>
              <p className="text-xs text-gray-500 mt-1">Policy violations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">System Uptime</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">99.9%</div>
              <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Admin Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Admin Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "Approved verifier application",
                  user: "Dr. Sarah Kim",
                  time: "2 hours ago",
                  type: "approval",
                },
                {
                  action: "Resolved dispute for project",
                  project: "Amazon Reforestation Phase 3",
                  time: "5 hours ago",
                  type: "dispute",
                },
                {
                  action: "Suspended project for policy violation",
                  project: "Questionable Wind Farm",
                  time: "1 day ago",
                  type: "suspension",
                },
                { action: "Updated platform security settings", time: "2 days ago", type: "system" },
                { action: "Approved new verifier", user: "Dr. Michael Chen", time: "3 days ago", type: "approval" },
              ].map((action, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                  {action.type === "approval" && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                  {action.type === "dispute" && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                  {action.type === "suspension" && <AlertTriangle className="w-5 h-5 text-red-500" />}
                  {action.type === "system" && <Shield className="w-5 h-5 text-blue-500" />}

                  <div className="flex-1">
                    <h4 className="font-medium">{action.action}</h4>
                    <p className="text-sm text-gray-500">
                      {action.user && `User: ${action.user} • `}
                      {action.project && `Project: ${action.project} • `}
                      {action.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Access Control Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Access Control Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">User Roles Distribution</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Developers</span>
                    <span className="text-sm font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Buyers</span>
                    <span className="text-sm font-medium">892</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Verifiers</span>
                    <span className="text-sm font-medium">47</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Admins</span>
                    <span className="text-sm font-medium">3</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Security Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm">Two-factor authentication enabled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm">SSL certificates valid</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm">Database backups current</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Security audit due in 30 days</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
