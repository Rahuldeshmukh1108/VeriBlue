import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Eye, Ban, UserCheck, Filter, Shield, TrendingUp } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function UsersPage() {
  const users = [
    {
      id: "USR-001",
      name: "Sarah Johnson",
      email: "sarah.j@ecotech.com",
      role: "developer",
      status: "active",
      joinDate: "2023-03-15",
      lastActive: "2024-01-20",
      projects: 12,
      credits: 450000,
      location: "California, USA",
    },
    {
      id: "USR-002",
      name: "Michael Chen",
      email: "m.chen@greenbuy.com",
      role: "buyer",
      status: "active",
      joinDate: "2023-06-20",
      lastActive: "2024-01-19",
      projects: 0,
      credits: 125000,
      location: "Singapore",
    },
    {
      id: "USR-003",
      name: "Dr. Emma Wilson",
      email: "emma.wilson@climateverify.org",
      role: "verifier",
      status: "active",
      joinDate: "2023-01-10",
      lastActive: "2024-01-20",
      projects: 28,
      credits: 0,
      location: "London, UK",
    },
    {
      id: "USR-004",
      name: "Alex Rodriguez",
      email: "alex.r@carbonsolutions.com",
      role: "developer",
      status: "suspended",
      joinDate: "2023-09-12",
      lastActive: "2024-01-15",
      projects: 3,
      credits: 75000,
      location: "Mexico City, Mexico",
    },
    {
      id: "USR-005",
      name: "Lisa Park",
      email: "lisa.park@ecoinvest.com",
      role: "buyer",
      status: "inactive",
      joinDate: "2023-11-05",
      lastActive: "2023-12-20",
      projects: 0,
      credits: 25000,
      location: "Seoul, South Korea",
    },
  ]

  const getRoleColor = (role: string) => {
    switch (role) {
      case "developer":
        return "bg-emerald-100 text-emerald-800"
      case "buyer":
        return "bg-blue-100 text-blue-800"
      case "verifier":
        return "bg-purple-100 text-purple-800"
      case "admin":
        return "bg-slate-100 text-slate-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800"
      case "inactive":
        return "bg-amber-100 text-amber-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600 mt-1">Manage platform users and their permissions</p>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Search users..." className="w-64" />
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-emerald-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600">{users.length}</div>
                <p className="text-xs text-gray-500 mt-1">+12 this month</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {users.filter((u) => u.status === "active").length}
                </div>
                <p className="text-xs text-gray-500 mt-1">85% of total</p>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Inactive Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600">
                  {users.filter((u) => u.status === "inactive").length}
                </div>
                <p className="text-xs text-gray-500 mt-1">Need attention</p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Suspended</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {users.filter((u) => u.status === "suspended").length}
                </div>
                <p className="text-xs text-gray-500 mt-1">Policy violations</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All Users</TabsTrigger>
              <TabsTrigger value="developers">Developers</TabsTrigger>
              <TabsTrigger value="buyers">Buyers</TabsTrigger>
              <TabsTrigger value="verifiers">Verifiers</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    All Platform Users
                  </CardTitle>
                  <CardDescription>Complete overview of all registered users</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Activity</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src="/diverse-user-avatars.png" />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p>Last: {user.lastActive}</p>
                              <p className="text-gray-500">Joined: {user.joinDate}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">{user.location}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              {user.status === "suspended" ? (
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
            </TabsContent>

            <TabsContent value="developers" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-emerald-600" />
                    Developer Accounts
                  </CardTitle>
                  <CardDescription>Carbon credit project developers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users
                      .filter((u) => u.role === "developer")
                      .map((user) => (
                        <div key={user.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src="/diverse-user-avatars.png" />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                                <p className="text-sm text-gray-600">{user.email}</p>
                              </div>
                            </div>
                            <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                            <div>
                              <span className="font-medium">Projects:</span>
                              <p>{user.projects}</p>
                            </div>
                            <div>
                              <span className="font-medium">Credits Generated:</span>
                              <p>{user.credits.toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="font-medium">Location:</span>
                              <p>{user.location}</p>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Last active: {user.lastActive}</span>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-1" />
                                View Profile
                              </Button>
                              <Button variant="outline" size="sm">
                                View Projects
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="buyers" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    Buyer Accounts
                  </CardTitle>
                  <CardDescription>Carbon credit purchasers and lessees</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users
                      .filter((u) => u.role === "buyer")
                      .map((user) => (
                        <div key={user.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src="/diverse-user-avatars.png" />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                                <p className="text-sm text-gray-600">{user.email}</p>
                              </div>
                            </div>
                            <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                            <div>
                              <span className="font-medium">Credits Purchased:</span>
                              <p>{user.credits.toLocaleString()}</p>
                            </div>
                            <div>
                              <span className="font-medium">Active Leases:</span>
                              <p>5</p>
                            </div>
                            <div>
                              <span className="font-medium">Location:</span>
                              <p>{user.location}</p>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Last active: {user.lastActive}</span>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-1" />
                                View Profile
                              </Button>
                              <Button variant="outline" size="sm">
                                View Purchases
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="verifiers" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-purple-600" />
                    Verifier Accounts
                  </CardTitle>
                  <CardDescription>Independent project verifiers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {users
                      .filter((u) => u.role === "verifier")
                      .map((user) => (
                        <div key={user.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src="/diverse-user-avatars.png" />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                                <p className="text-sm text-gray-600">{user.email}</p>
                              </div>
                            </div>
                            <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                          </div>

                          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                            <div>
                              <span className="font-medium">Projects Verified:</span>
                              <p>{user.projects}</p>
                            </div>
                            <div>
                              <span className="font-medium">Rating:</span>
                              <p>4.8 ⭐</p>
                            </div>
                            <div>
                              <span className="font-medium">Location:</span>
                              <p>{user.location}</p>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Last active: {user.lastActive}</span>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-1" />
                                View Profile
                              </Button>
                              <Button variant="outline" size="sm">
                                View Verifications
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>User Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Developers</span>
                        <span className="text-sm font-medium">
                          {users.filter((u) => u.role === "developer").length} (40%)
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Buyers</span>
                        <span className="text-sm font-medium">
                          {users.filter((u) => u.role === "buyer").length} (40%)
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Verifiers</span>
                        <span className="text-sm font-medium">
                          {users.filter((u) => u.role === "verifier").length} (20%)
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>User Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Daily Active Users</span>
                        <span className="text-sm font-medium">1,247</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Weekly Active Users</span>
                        <span className="text-sm font-medium">2,156</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Monthly Active Users</span>
                        <span className="text-sm font-medium">2,847</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">User Retention (30d)</span>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
