import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, UserCheck, Ban, Eye, Search, Plus, Mail, AlertTriangle } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function VerifiersPage() {
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
      location: "Singapore",
      certifications: ["ISO 14064", "VCS", "Gold Standard"],
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
      location: "Spain",
      certifications: ["CDM", "VCS", "ACR"],
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
      location: "Australia",
      certifications: ["VCS", "Plan Vivo"],
    },
    {
      id: "VER-004",
      name: "Dr. James Wilson",
      email: "j.wilson@carbontech.com",
      specialization: "Waste Management",
      verified: 22,
      rating: 4.6,
      status: "suspended",
      joinDate: "2023-08-12",
      location: "Canada",
      certifications: ["CDM", "Gold Standard"],
    },
  ]

  const pendingApplications = [
    {
      id: "APP-001",
      name: "Dr. Maria Santos",
      email: "maria.santos@ecoaudit.br",
      specialization: "Forestry & REDD+",
      location: "Brazil",
      experience: "8 years",
      appliedDate: "2024-01-15",
    },
    {
      id: "APP-002",
      name: "Prof. Ahmed Hassan",
      email: "a.hassan@greentech.eg",
      specialization: "Renewable Energy",
      location: "Egypt",
      experience: "12 years",
      appliedDate: "2024-01-18",
    },
  ]

  return (
    <DashboardLayout userRole="admin" userName="Admin User">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Verifier Management</h1>
              <p className="text-gray-600 mt-1">Manage verifier accounts, applications, and permissions</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-slate-600 hover:bg-slate-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Invite Verifier
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Invite New Verifier</DialogTitle>
                  <DialogDescription>Send an invitation to a qualified verifier to join the platform</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="verifier@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select specialization" />
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
                  <div className="space-y-2">
                    <Label htmlFor="message">Personal Message (Optional)</Label>
                    <Textarea id="message" placeholder="Add a personal message..." rows={3} />
                  </div>
                  <Button className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Invitation
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-emerald-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Active Verifiers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600">47</div>
                <p className="text-xs text-gray-500 mt-1">+3 this month</p>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Pending Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600">5</div>
                <p className="text-xs text-gray-500 mt-1">Awaiting review</p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Avg. Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">4.7</div>
                <p className="text-xs text-gray-500 mt-1">Platform average</p>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Suspended</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">2</div>
                <p className="text-xs text-gray-500 mt-1">Under review</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="active" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active">Active Verifiers</TabsTrigger>
              <TabsTrigger value="pending">Pending Applications</TabsTrigger>
              <TabsTrigger value="suspended">Suspended/Inactive</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-emerald-600" />
                        Active Verifiers
                      </CardTitle>
                      <CardDescription>Currently active verifiers on the platform</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Input placeholder="Search verifiers..." className="w-64" />
                      <Button variant="outline">
                        <Search className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Verifier</TableHead>
                        <TableHead>Specialization</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Verified</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {verifiers
                        .filter((v) => v.status === "active")
                        .map((verifier) => (
                          <TableRow key={verifier.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{verifier.name}</p>
                                <p className="text-sm text-gray-500">{verifier.email}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{verifier.specialization}</p>
                                <div className="flex gap-1 mt-1">
                                  {verifier.certifications.slice(0, 2).map((cert, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {cert}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{verifier.location}</TableCell>
                            <TableCell>{verifier.verified}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <span>{verifier.rating}</span>
                                <span className="text-yellow-400">★</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="default" className="bg-emerald-100 text-emerald-800">
                                Active
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Ban className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pending" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    Pending Applications
                  </CardTitle>
                  <CardDescription>Verifier applications awaiting review</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingApplications.map((application) => (
                    <div key={application.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{application.name}</h3>
                          <p className="text-sm text-gray-600">{application.email}</p>
                        </div>
                        <Badge variant="secondary">Pending Review</Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                        <div>
                          <span className="font-medium">Specialization:</span>
                          <p>{application.specialization}</p>
                        </div>
                        <div>
                          <span className="font-medium">Location:</span>
                          <p>{application.location}</p>
                        </div>
                        <div>
                          <span className="font-medium">Experience:</span>
                          <p>{application.experience}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Applied: {application.appliedDate}</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Review
                          </Button>
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                            <UserCheck className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button variant="outline" size="sm">
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="suspended" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ban className="w-5 h-5 text-red-600" />
                    Suspended Verifiers
                  </CardTitle>
                  <CardDescription>Verifiers who have been suspended or are inactive</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Verifier</TableHead>
                        <TableHead>Specialization</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {verifiers
                        .filter((v) => v.status === "suspended")
                        .map((verifier) => (
                          <TableRow key={verifier.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{verifier.name}</p>
                                <p className="text-sm text-gray-500">{verifier.email}</p>
                              </div>
                            </TableCell>
                            <TableCell>{verifier.specialization}</TableCell>
                            <TableCell>Dec 15, 2023</TableCell>
                            <TableCell>Quality concerns</TableCell>
                            <TableCell>
                              <Badge variant="destructive">Suspended</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                                  Reactivate
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
