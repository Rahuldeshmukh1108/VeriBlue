"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  FileText,
  TrendingUp,
  Calendar,
  Eye,
  UserCheck,
  Settings,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

// TypeScript interfaces for verifier data structures
interface VerifierKPIData {
  itemsInQueue: number
  verificationsThisMonth: number
  averageTurnaroundTime: number
  approvalRate: number
}

interface PriorityItem {
  id: string
  type: "user_approval" | "project_audit"
  title: string
  submittedBy: string
  daysWaiting: number
  priority: "high" | "medium" | "low"
}

interface RecentActivity {
  id: string
  type: "user_approved" | "user_rejected" | "project_verified" | "project_rejected"
  title: string
  date: string
  credits?: number
}

interface VerifierProfile {
  name: string
  organization: string
  walletAddress: string
  avatar?: string
}

// Mock data for verifier dashboard
const verifierProfile: VerifierProfile = {
  name: "Dr. Elena Rodriguez",
  organization: "Global Carbon Verification Institute",
  walletAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
  avatar: "/placeholder-user.jpg",
}

const kpiData: VerifierKPIData = {
  itemsInQueue: 23,
  verificationsThisMonth: 47,
  averageTurnaroundTime: 3.2,
  approvalRate: 94.5,
}

const priorityQueue: PriorityItem[] = [
  {
    id: "1",
    type: "project_audit",
    title: "Amazon Rainforest Conservation - Q4 Report",
    submittedBy: "EcoForest Solutions",
    daysWaiting: 8,
    priority: "high",
  },
  {
    id: "2",
    type: "user_approval",
    title: "Corporate Buyer Application - TechCorp Inc.",
    submittedBy: "TechCorp Inc.",
    daysWaiting: 5,
    priority: "medium",
  },
  {
    id: "3",
    type: "project_audit",
    title: "Mangrove Restoration - MRV Report #12",
    submittedBy: "Blue Carbon Initiative",
    daysWaiting: 3,
    priority: "medium",
  },
]

const recentActivity: RecentActivity[] = [
  {
    id: "1",
    type: "project_verified",
    title: "Kenya Solar Farm - 2,500 credits verified",
    date: "2024-01-15",
    credits: 2500,
  },
  {
    id: "2",
    type: "user_approved",
    title: "GreenTech Solutions - Corporate Buyer approved",
    date: "2024-01-14",
  },
  {
    id: "3",
    type: "project_verified",
    title: "Indonesian Peatland Restoration - 1,800 credits verified",
    date: "2024-01-12",
    credits: 1800,
  },
  {
    id: "4",
    type: "user_rejected",
    title: "Incomplete documentation - Developer application rejected",
    date: "2024-01-10",
  },
  {
    id: "5",
    type: "project_verified",
    title: "Brazilian Wind Farm - 3,200 credits verified",
    date: "2024-01-08",
    credits: 3200,
  },
]

export default function VerifierDashboard() {
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
            <Link href="/dashboard/verifier/queue">
              <Button variant="outline" size="sm" className="hover:bg-primary/10 transition-colors bg-transparent">
                <Eye className="h-4 w-4 mr-2" />
                Verification Queue
              </Button>
            </Link>
            <Link href="/dashboard/verifier/profile">
              <Button variant="ghost" size="sm" className="hover:bg-muted transition-colors">
                <Settings className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </Link>
            <Avatar>
              <AvatarImage src={verifierProfile.avatar || "/placeholder.svg"} alt={verifierProfile.name} />
              <AvatarFallback>
                {verifierProfile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {verifierProfile.name}</h1>
          <p className="text-muted-foreground">
            Maintain platform integrity through rigorous verification at {verifierProfile.organization}
          </p>
        </div>

        {/* KPI Widgets - 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Items in Queue</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{kpiData.itemsInQueue}</div>
              <p className="text-xs text-muted-foreground">awaiting review</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verifications This Month</CardTitle>
              <CheckCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{kpiData.verificationsThisMonth}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 bg-secondary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Turnaround</CardTitle>
              <Clock className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{kpiData.averageTurnaroundTime}</div>
              <p className="text-xs text-muted-foreground">days per verification</p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-accent/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-accent-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent-foreground">{kpiData.approvalRate}%</div>
              <p className="text-xs text-muted-foreground">last 30 days</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Priority Queue Snapshot */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Priority Queue
              </CardTitle>
              <CardDescription>Oldest and highest-priority items awaiting review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {priorityQueue.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {item.type === "user_approval" ? (
                        <UserCheck className="h-4 w-4 text-secondary" />
                      ) : (
                        <FileText className="h-4 w-4 text-primary" />
                      )}
                      <div>
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground">by {item.submittedBy}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          item.priority === "high"
                            ? "destructive"
                            : item.priority === "medium"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {item.priority}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{item.daysWaiting}d</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/dashboard/verifier/queue">
                <Button className="w-full mt-4 bg-transparent" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  View Full Queue
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest verification actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      {activity.type === "project_verified" && <CheckCircle className="h-4 w-4 text-primary" />}
                      {activity.type === "user_approved" && <UserCheck className="h-4 w-4 text-secondary" />}
                      {(activity.type === "project_rejected" || activity.type === "user_rejected") && (
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{new Date(activity.date).toLocaleDateString()}</p>
                    </div>
                    {activity.credits && (
                      <Badge variant="outline" className="text-xs">
                        {activity.credits.toLocaleString()} credits
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Verification Performance */}
        <Card className="mb-8 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-secondary" />
              Verification Performance
            </CardTitle>
            <CardDescription>Your verification metrics and efficiency</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Monthly Target Progress</span>
                  <span>78%</span>
                </div>
                <Progress value={78} className="h-2" />
                <p className="text-xs text-muted-foreground">11 verifications remaining this month</p>
              </div>

              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">156</div>
                <div className="text-xs text-muted-foreground">Total verifications completed</div>
              </div>

              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-secondary">2.8M</div>
                <div className="text-xs text-muted-foreground">Credits verified (lifetime)</div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Recent Achievements</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full" />
                  <span>Maintained 95%+ approval rate for 6 months</span>
                  <span className="text-muted-foreground ml-auto">Jan 2024</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full" />
                  <span>Verified 100+ projects milestone</span>
                  <span className="text-muted-foreground ml-auto">Dec 2024</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
            <CardDescription>Navigate to your most common verification tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/dashboard/verifier/queue?tab=users">
                <Button
                  className="h-20 flex-col gap-2 w-full hover:bg-primary/10 hover:scale-105 transition-all bg-transparent"
                  variant="outline"
                >
                  <Users className="h-6 w-6" />
                  <span className="text-center">Review User Applications</span>
                </Button>
              </Link>
              <Link href="/dashboard/verifier/queue?tab=projects">
                <Button
                  className="h-20 flex-col gap-2 w-full hover:bg-primary/10 hover:scale-105 transition-all bg-transparent"
                  variant="outline"
                >
                  <FileText className="h-6 w-6" />
                  <span className="text-center">Audit Project Reports</span>
                </Button>
              </Link>
              <Link href="/dashboard/verifier/profile">
                <Button
                  className="h-20 flex-col gap-2 w-full hover:bg-primary/10 hover:scale-105 transition-all bg-transparent"
                  variant="outline"
                >
                  <Eye className="h-6 w-6" />
                  <span className="text-center">View Public Profile</span>
                </Button>
              </Link>
              <Link href="/dashboard/verifier/analytics">
                <Button
                  className="h-20 flex-col gap-2 w-full hover:bg-primary/10 hover:scale-105 transition-all bg-transparent"
                  variant="outline"
                >
                  <BarChart3 className="h-6 w-6" />
                  <span className="text-center">Performance Analytics</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
