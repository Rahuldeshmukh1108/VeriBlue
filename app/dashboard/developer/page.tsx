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
  Wallet,
  Plus,
  TrendingUp,
  FileText,
  MapPin,
  Calendar,
  DollarSign,
  ArrowRight,
  Bell,
  CreditCard,
  Coins,
  Upload,
  LinkIcon,
} from "lucide-react"
import Link from "next/link"

export default function DeveloperDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [projects, setProjects] = useState([])
  const { success, error } = useToast()

  const { isConnected, address, carbonBalance } = useBlockchain()
  const { mintCredits, balance, isLoading: isMinting } = useCarbonCredits()
  const { uploadToIPFS, isUploading } = useIPFS()

  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock data - in real app this would come from API
        const mockProjects = [
          {
            id: 1,
            name: "Amazon Reforestation Initiative",
            status: "Verified",
            location: "Brazil",
            startDate: "Jan 2024",
            progress: 75,
            credits: 5200,
            onChain: true,
            contractAddress: "0x1234...5678",
            metadataUri: "ipfs://QmXXX...XXX",
          },
          {
            id: 2,
            name: "Solar Farm Development",
            status: "In Review",
            location: "Kenya",
            startDate: "Mar 2024",
            progress: 45,
            credits: 0,
            onChain: false,
            contractAddress: null,
            metadataUri: null,
          },
          {
            id: 3,
            name: "Mangrove Restoration",
            status: "Planning",
            location: "Philippines",
            startDate: "May 2024",
            progress: 15,
            credits: 0,
            onChain: false,
            contractAddress: null,
            metadataUri: null,
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

  const handleMintCredits = async (projectId: string, amount: string) => {
    if (!isConnected) {
      error("Wallet not connected", "Please connect your wallet to mint credits.")
      return
    }

    try {
      await mintCredits(amount, projectId)
    } catch (err) {
      error("Minting failed", "Failed to mint carbon credits.")
    }
  }

  const handleUploadMetadata = async (projectData: any) => {
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
      <div className="min-h-screen bg-background">
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
    <div className="min-h-screen bg-background">
      <SkipLink />
      <KeyboardNavigation />
      <DashboardNav userType="developer" />

      <main id="main-content" tabIndex={-1} className="container mx-auto px-4 py-8">
        <BreadcrumbNav />

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Developer Dashboard</h1>
          <p className="text-muted-foreground">Manage your carbon credit projects and track your impact</p>
          {!isConnected && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800">Connect your wallet to access blockchain features and mint credits.</p>
            </div>
          )}
        </div>

        {/* Wallet Summary */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center">
                <Wallet className="h-4 w-4 mr-2" />
                {isConnected ? "On-Chain Credits" : "Total Credits"}
              </CardDescription>
              <CardTitle className="text-2xl text-primary">{isConnected ? carbonBalance : "12,450"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {isConnected ? "Verified on blockchain" : "+2,340 this month"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                Revenue
              </CardDescription>
              <CardTitle className="text-2xl text-secondary">$89,250</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">+$15,680 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Active Projects
              </CardDescription>
              <CardTitle className="text-2xl text-accent-foreground">{projects.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">3 pending verification</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Impact Score
              </CardDescription>
              <CardTitle className="text-2xl text-chart-4">94.2</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Excellent rating</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/dashboard/developer/new-project">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Project
                </Button>
              </Link>
              <Link href="/dashboard/developer/projects/1/mrv">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Access MRV System
                </Button>
              </Link>
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
                onClick={() => handleMintCredits("proj_001", "100")}
                disabled={!isConnected || isMinting}
              >
                <Coins className="h-4 w-4 mr-2" />
                {isMinting ? "Minting..." : "Mint Credits"}
              </Button>
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
                onClick={() => handleUploadMetadata(projects[0])}
                disabled={isUploading}
              >
                <Upload className="h-4 w-4 mr-2" />
                {isUploading ? "Uploading..." : "Upload to IPFS"}
              </Button>
              <Link href="/dashboard/developer/wallet">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <CreditCard className="h-4 w-4 mr-2" />
                  View Wallet
                </Button>
              </Link>
              <Link href="/dashboard/developer/notifications">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Bell className="h-4 w-4 mr-2" />
                  View Notifications
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Project Overview */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Project Portfolio</CardTitle>
                  <CardDescription>Your active carbon credit projects</CardDescription>
                </div>
                <Link href="/dashboard/developer/projects">
                  <Button variant="outline" size="sm">
                    View All Projects
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {projects.length === 0 ? (
                <EmptyProjects userType="developer" />
              ) : (
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{project.name}</h3>
                        <div className="flex items-center gap-2">
                          {project.onChain && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              <LinkIcon className="h-3 w-3 mr-1" />
                              On-Chain
                            </Badge>
                          )}
                          <Badge
                            className={
                              project.status === "Verified"
                                ? "bg-primary/10 text-primary"
                                : project.status === "In Review"
                                  ? "bg-secondary/10 text-secondary"
                                  : "bg-muted text-muted-foreground"
                            }
                          >
                            {project.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        {project.location} •
                        <Calendar className="h-4 w-4 ml-2 mr-1" />
                        Started {project.startDate}
                        {project.onChain && (
                          <>
                            • <span className="font-mono text-xs">{project.contractAddress}</span>
                          </>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-sm text-muted-foreground">
                          {project.credits > 0
                            ? `${project.credits.toLocaleString()} credits generated`
                            : "Pending verification"}
                        </span>
                        <Link href={`/dashboard/developer/projects/${project.id}`}>
                          <Button size="sm" variant="ghost">
                            View Details <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates on your projects and credits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium">Credits minted on blockchain</p>
                  <p className="text-sm text-muted-foreground">
                    2,340 credits minted for Amazon Reforestation Initiative
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">1 hour ago</span>
              </div>
              <div className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="h-2 w-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium">Amazon Reforestation Initiative verified</p>
                  <p className="text-sm text-muted-foreground">Project approved by verifier and ready for minting</p>
                </div>
                <span className="text-sm text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium">Metadata uploaded to IPFS</p>
                  <p className="text-sm text-muted-foreground">Project metadata stored on decentralized network</p>
                </div>
                <span className="text-sm text-muted-foreground">1 day ago</span>
              </div>
              <div className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="h-2 w-2 bg-secondary rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium">MRV report submitted</p>
                  <p className="text-sm text-muted-foreground">Solar Farm Development - Q1 2024 report</p>
                </div>
                <span className="text-sm text-muted-foreground">2 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
