"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DashboardSkeleton } from "@/components/loading/dashboard-skeleton"
import { EmptyProjects } from "@/components/empty-states/empty-projects"
import { BreadcrumbNav } from "@/components/navigation/breadcrumb-nav"
import { DashboardNav } from "@/components/navigation/dashboard-nav"
import { SkipLink } from "@/components/accessibility/skip-link"
import { KeyboardNavigation } from "@/components/accessibility/keyboard-navigation"
import { useToast } from "@/hooks/use-toast"
import { useBlockchain } from "@/hooks/use-blockchain"
import { useCarbonCredits } from "@/hooks/use-carbon-credits"
import { useIPFS } from "@/hooks/use-ipfs"
import {
  Plus,
  TrendingUp,
  FileText,
  MapPin,
  Calendar,
  DollarSign,
  Bell,
  CreditCard,
  Upload,
  Leaf,
  Target,
  FolderOpen,
  User,
  BarChart3,
  Eye,
  Edit,
} from "lucide-react"
import Link from "next/link"

export default function DeveloperDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [projects, setProjects] = useState<any[]>([])
  const { success, error } = useToast()

  const { isConnected, address, carbonBalance } = useBlockchain()
  const { mintCredits, balance, isLoading: isMinting } = useCarbonCredits()
  const { uploadToIPFS, isUploading } = useIPFS()

  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        const mockProjects = [
          {
            id: 1,
            name: "Sundarbans Mangrove Restoration",
            status: "Verified",
            location: "West Bengal, India",
            startDate: "Jan 2024",
            progress: 85,
            credits: 5200,
            carbonAbsorbed: 12500, // tons of CO2
            image: "/wind-farm-renewable-energy.jpg",
            onChain: true,
            contractAddress: "0x1234...5678",
            metadataUri: "ipfs://QmXXX...XXX",
            lastUpdated: "2025-01-15",
          },
          {
            id: 2,
            name: "Madagascar Coastal Protection",
            status: "Verified",
            location: "Toliara, Madagascar",
            startDate: "Mar 2024",
            progress: 92,
            credits: 0,
            carbonAbsorbed: 15200,
            image: "/mangrove-restoration-blue-carbon.jpg",
            onChain: false,
            contractAddress: null,
            metadataUri: null,
            lastUpdated: "2025-01-10",
          },
          {
            id: 3,
            name: "Seychelles Blue Carbon Initiative",
            status: "Pending Verification",
            location: "Mahé, Seychelles",
            startDate: "May 2024",
            progress: 65,
            credits: 0,
            carbonAbsorbed: 8900,
            image: "/biogas-plant-waste-management.jpg",
            onChain: false,
            contractAddress: null,
            metadataUri: null,
            lastUpdated: "2025-01-12",
          },
        ]

        setProjects(mockProjects)
        setIsLoading(false)

        // Show welcome toast
        success("Welcome back!", "Your dashboard has been updated with the latest data.")
      } catch (err) {
        error("Failed to load dashboard", "Please try refreshing the page.")
        setIsLoading(false)
      }
    }

    loadData()
  }, [success, error])

  const handleUploadMetadata = async (projectData: any) => {
    if (!projectData) {
      error("No project selected", "Please select a project to upload.")
      return
    }
    try {
      const metadataUri = await uploadToIPFS({
        name: projectData.name,
        description: projectData.description,
        attributes: [
          { trait_type: "Location", value: projectData.location },
          { trait_type: "Project Type", value: "Carbon Credit" },
          { trait_type: "Status", value: projectData.status },
        ],
      })
      success("Metadata uploaded", `IPFS URI: ${metadataUri}`)
    } catch (err) {
      error("Upload failed", "Failed to upload project metadata to IPFS.")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <SkipLink />
        <KeyboardNavigation />
        <DashboardNav userType="developer" />
        <div className="container mx-auto px-4 py-8">
          <BreadcrumbNav />
          <DashboardSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <SkipLink />
      <KeyboardNavigation />
      <DashboardNav userType="developer" />

      <main id="main-content" tabIndex={-1} className="container mx-auto px-4 py-8">
        <BreadcrumbNav />

        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-2 text-white">Developer Dashboard</h1>
          <p className="text-slate-300 text-lg">
            Manage your carbon credit projects and track your environmental impact
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-700 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center text-blue-400">
                <BarChart3 className="w-6 h-6 text-blue-400 mr-2" />
                {isConnected ? "On-Chain Credits" : "Total Credits"}
              </CardDescription>
              <CardTitle className="text-2xl text-white">{isConnected ? carbonBalance : "12,450"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-400">{isConnected ? "Verified on blockchain" : "+2,340 this month"}</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-700 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center text-emerald-400">
                <DollarSign className="w-6 h-6 text-emerald-400 mr-2" />
                Revenue
              </CardDescription>
              <CardTitle className="text-2xl text-white">$89,250</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-400">+$15,680 this month</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-700 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center text-amber-400">
                <FolderOpen className="w-6 h-6 text-amber-400 mr-2" />
                My Projects
              </CardDescription>
              <CardTitle className="text-2xl text-white">{projects.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-400">1 pending verification</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-700 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center text-purple-400">
                <Target className="w-6 h-6 text-purple-400 mr-2" />
                Impact Score
              </CardDescription>
              <CardTitle className="text-2xl text-white">94.2</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-400">Excellent rating</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 bg-slate-800/80 backdrop-blur-sm border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Leaf className="h-5 w-5 text-emerald-400" />
                  My Project Portfolio
                </CardTitle>
                <CardDescription className="text-slate-300">
                  Your active carbon credit projects with impact data
                </CardDescription>
              </div>
              <Link href="/dashboard/developer/projects">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  View All Projects
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {projects.length === 0 ? (
              <EmptyProjects userType="developer" />
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-slate-700/50 rounded-lg overflow-hidden border border-slate-600 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Project Image */}
                    <div className="relative h-48">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={`${project.name} project`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge
                          className={
                            project.status === "Verified"
                              ? "bg-emerald-500 text-white"
                              : project.status === "Pending Verification"
                                ? "bg-amber-500 text-white"
                                : "bg-slate-500 text-white"
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-4 space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg text-white mb-2">{project.name}</h3>
                        <div className="flex items-center text-sm text-slate-400 mb-3">
                          <MapPin className="h-4 w-4 mr-1" />
                          {project.location}
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-slate-300">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2 bg-slate-600" />
                      </div>

                      {/* Carbon Data */}
                      <div className="flex items-center gap-2 text-emerald-400">
                        <TrendingUp className="h-4 w-4" />
                        <span className="font-semibold">{project.carbonAbsorbed?.toLocaleString?.() ?? "—"} tons CO₂</span>
                      </div>

                      {/* Last Updated */}
                      <div className="flex items-center text-sm text-slate-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        Updated {project.lastUpdated}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Link href={`/dashboard/developer/projects/${project.id}`} className="flex-1">
                          <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-8 bg-slate-800/80 backdrop-blur-sm border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Target className="h-5 w-5 text-blue-400" />
              Quick Actions
            </CardTitle>
            <CardDescription className="text-slate-300">Essential project management tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/dashboard/developer/new-project">
                <Button
                  className="w-full justify-start bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300"
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Project
                </Button>
              </Link>
              <Link href="/dashboard/developer/projects/1/mrv">
                <Button
                  className="w-full justify-start bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300"
                  variant="outline"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Access MRV System
                </Button>
              </Link>
              <Button
                className="w-full justify-start bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/30 text-amber-300"
                variant="outline"
                onClick={() => handleUploadMetadata(projects[0])}
                disabled={isUploading}
              >
                <Upload className="h-4 w-4 mr-2" />
                {isUploading ? "Uploading..." : "Upload to IPFS"}
              </Button>
              <Link href="/dashboard/developer/wallet">
                <Button
                  className="w-full justify-start bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300"
                  variant="outline"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  View Wallet
                </Button>
              </Link>
              <Link href="/dashboard/developer/notifications">
                <Button
                  className="w-full justify-start bg-teal-600/20 hover:bg-teal-600/30 border border-teal-500/30 text-teal-300"
                  variant="outline"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  View Notifications
                </Button>
              </Link>
              <Link href="/dashboard/developer/profile">
                <Button
                  className="w-full justify-start bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300"
                  variant="outline"
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile Settings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/80 backdrop-blur-sm border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-slate-300">
              Latest updates on your projects and environmental impact
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 border border-slate-600 rounded-lg bg-gradient-to-r from-blue-900/30 to-slate-800/30">
                <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-white">Project verification completed</p>
                  <p className="text-sm text-slate-400">
                    Sundarbans Mangrove Restoration verified - 12,500 tons CO₂ absorption confirmed
                  </p>
                </div>
                <span className="text-sm text-slate-500">1 hour ago</span>
              </div>
              <div className="flex items-center space-x-4 p-4 border border-slate-600 rounded-lg bg-gradient-to-r from-emerald-900/30 to-slate-800/30">
                <div className="h-3 w-3 bg-emerald-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-white">Environmental impact updated</p>
                  <p className="text-sm text-slate-400">
                    Madagascar Coastal Protection - 15,200 tons CO₂ reduction confirmed
                  </p>
                </div>
                <span className="text-sm text-slate-500">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-4 p-4 border border-slate-600 rounded-lg bg-gradient-to-r from-amber-900/30 to-slate-800/30">
                <div className="h-3 w-3 bg-amber-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-white">Metadata uploaded to IPFS</p>
                  <p className="text-sm text-slate-400">Project metadata stored on decentralized network</p>
                </div>
                <span className="text-sm text-slate-500">1 day ago</span>
              </div>
              <div className="flex items-center space-x-4 p-4 border border-slate-600 rounded-lg bg-gradient-to-r from-purple-900/30 to-slate-800/30">
                <div className="h-3 w-3 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-white">MRV report submitted</p>
                  <p className="text-sm text-slate-400">
                    Seychelles Blue Carbon Initiative - Q1 2024 impact assessment
                  </p>
                </div>
                <span className="text-sm text-slate-500">2 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}