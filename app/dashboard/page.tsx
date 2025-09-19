"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Leaf,
  TrendingUp,
  Building2,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  Calendar,
  MapPin,
} from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

// TypeScript interfaces for data structures
interface KPIData {
  activeCredits: number
  totalCO2Offset: number
  projectsSupported: number
  totalSpent: number
}

interface PortfolioProject {
  id: string
  name: string
  type: string
  credits: number
  color: string
}

interface Transaction {
  id: string
  type: "purchase" | "retirement"
  project: string
  credits: number
  amount: number
  date: string
  status: "completed" | "pending" | "failed"
}

interface UserProfile {
  name: string
  company: string
  avatar?: string
}

// Mock data
const userProfile: UserProfile = {
  name: "Sarah Chen",
  company: "EcoTech Solutions",
  avatar: "/placeholder-user.jpg",
}

const kpiData: KPIData = {
  activeCredits: 2847,
  totalCO2Offset: 15420,
  projectsSupported: 12,
  totalSpent: 284750,
}

const portfolioData: PortfolioProject[] = [
  { id: "1", name: "Mangrove Restoration", type: "Blue Carbon", credits: 1200, color: "var(--chart-1)" },
  { id: "2", name: "Solar Farm", type: "Renewable Energy", credits: 850, color: "var(--chart-2)" },
  { id: "3", name: "Forest Conservation", type: "REDD+", credits: 650, color: "var(--chart-3)" },
  { id: "4", name: "Wind Energy", type: "Renewable Energy", credits: 147, color: "var(--chart-4)" },
]

const recentTransactions: Transaction[] = [
  {
    id: "1",
    type: "purchase",
    project: "Amazon Rainforest Conservation",
    credits: 500,
    amount: 12500,
    date: "2024-01-15",
    status: "completed",
  },
  {
    id: "2",
    type: "retirement",
    project: "Sundarbans Mangrove Restoration",
    credits: 250,
    amount: 6250,
    date: "2024-01-12",
    status: "completed",
  },
  {
    id: "3",
    type: "purchase",
    project: "Kenya Solar Farm",
    credits: 300,
    amount: 7800,
    date: "2024-01-10",
    status: "pending",
  },
  {
    id: "4",
    type: "retirement",
    project: "Brazilian Wind Farm",
    credits: 150,
    amount: 3900,
    date: "2024-01-08",
    status: "completed",
  },
  {
    id: "5",
    type: "purchase",
    project: "Indonesian Peatland Restoration",
    credits: 400,
    amount: 10400,
    date: "2024-01-05",
    status: "completed",
  },
]

export default function BuyerDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Navigation Header */}
      <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">Carbon Fiesta</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Globe className="h-4 w-4 mr-2" />
              Marketplace
            </Button>
            <Avatar>
              <AvatarImage src={userProfile.avatar || "/placeholder.svg"} alt={userProfile.name} />
              <AvatarFallback>
                {userProfile.name
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {userProfile.name}</h1>
          <p className="text-muted-foreground">
            Track your carbon offset journey and environmental impact with {userProfile.company}
          </p>
        </div>

        {/* KPI Widgets - 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Credits</CardTitle>
              <Leaf className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{kpiData.activeCredits.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 bg-secondary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total CO₂ Offset</CardTitle>
              <TrendingUp className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{kpiData.totalCO2Offset.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">tonnes CO₂ equivalent</p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-accent/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projects Supported</CardTitle>
              <Building2 className="h-4 w-4 text-accent-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent-foreground">{kpiData.projectsSupported}</div>
              <p className="text-xs text-muted-foreground">across 8 countries</p>
            </CardContent>
          </Card>

          <Card className="border-chart-4/20 bg-chart-4/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-chart-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-4">${kpiData.totalSpent.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">lifetime investment</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Portfolio Snapshot */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Portfolio Snapshot
              </CardTitle>
              <CardDescription>Credit breakdown by project type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={portfolioData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="credits"
                    >
                      {portfolioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`${value} credits`, "Credits"]}
                      labelFormatter={(label) => `${label}`}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {portfolioData.map((project) => (
                  <div key={project.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }} />
                      <span className="text-sm font-medium">{project.type}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{project.credits} credits</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Impact Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-secondary" />
                Impact Summary
              </CardTitle>
              <CardDescription>Your environmental contribution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Carbon Neutrality Goal</span>
                  <span>68%</span>
                </div>
                <Progress value={68} className="h-2" />
                <p className="text-xs text-muted-foreground">10,480 tonnes remaining to reach annual target</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">520</div>
                  <div className="text-xs text-muted-foreground">Cars off road equivalent</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-secondary">1.2M</div>
                  <div className="text-xs text-muted-foreground">Trees planted equivalent</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Recent Milestones</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full" />
                    <span>Achieved 50% carbon neutrality</span>
                    <span className="text-muted-foreground ml-auto">Dec 2024</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full" />
                    <span>Supported 10+ projects</span>
                    <span className="text-muted-foreground ml-auto">Nov 2024</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent-foreground" />
              Recent Transactions
            </CardTitle>
            <CardDescription>Your latest credit purchases and retirements</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {transaction.type === "purchase" ? (
                          <ArrowDownRight className="h-4 w-4 text-primary" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-secondary" />
                        )}
                        <span className="capitalize">{transaction.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{transaction.project}</span>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.credits.toLocaleString()}</TableCell>
                    <TableCell>${transaction.amount.toLocaleString()}</TableCell>
                    <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.status === "completed"
                            ? "default"
                            : transaction.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Access Navigation section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpRight className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
            <CardDescription>Navigate to your most common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
                <Globe className="h-6 w-6" />
                <span>Explore Marketplace</span>
              </Button>
              <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
                <Building2 className="h-6 w-6" />
                <span>View Full Portfolio</span>
              </Button>
              <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
                <TrendingUp className="h-6 w-6" />
                <span>Retire Credits</span>
              </Button>
              <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
                <Calendar className="h-6 w-6" />
                <span>Transaction History</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
