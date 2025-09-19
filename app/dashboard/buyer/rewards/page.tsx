"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge as UIBadge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Leaf,
  ArrowLeft,
  Award,
  Trophy,
  Star,
  Share2,
  Download,
  Lock,
  CheckCircle,
  Target,
  TrendingUp,
  Users,
  Globe,
  Calendar,
} from "lucide-react"
import Link from "next/link"

// TypeScript interfaces
interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: "milestone" | "impact" | "engagement" | "special"
  rarity: "common" | "rare" | "epic" | "legendary"
  unlockedAt?: string
  requirements: string
  progress?: {
    current: number
    target: number
  }
  isUnlocked: boolean
  shareableImage: string
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: string
  points: number
  category: string
}

interface Milestone {
  id: string
  title: string
  description: string
  target: number
  current: number
  unit: string
  reward: string
  isCompleted: boolean
  completedAt?: string
}

// Mock data
const badges: Badge[] = [
  {
    id: "1",
    name: "Carbon Pioneer",
    description: "First carbon credit purchase",
    icon: "🌱",
    category: "milestone",
    rarity: "common",
    unlockedAt: "2024-01-15",
    requirements: "Purchase your first carbon credit",
    isUnlocked: true,
    shareableImage: "/badges/carbon-pioneer.png",
  },
  {
    id: "2",
    name: "Ocean Guardian",
    description: "Support 5 blue carbon projects",
    icon: "🌊",
    category: "impact",
    rarity: "rare",
    unlockedAt: "2024-01-20",
    requirements: "Support 5 blue carbon projects (mangrove, seagrass)",
    progress: { current: 5, target: 5 },
    isUnlocked: true,
    shareableImage: "/badges/ocean-guardian.png",
  },
  {
    id: "3",
    name: "Forest Protector",
    description: "Offset 1,000 tonnes of CO₂",
    icon: "🌳",
    category: "impact",
    rarity: "epic",
    unlockedAt: "2024-02-01",
    requirements: "Offset 1,000 tonnes of CO₂ through forest projects",
    progress: { current: 1250, target: 1000 },
    isUnlocked: true,
    shareableImage: "/badges/forest-protector.png",
  },
  {
    id: "4",
    name: "Renewable Champion",
    description: "Support 10 renewable energy projects",
    icon: "⚡",
    category: "impact",
    rarity: "rare",
    requirements: "Support 10 renewable energy projects",
    progress: { current: 7, target: 10 },
    isUnlocked: false,
    shareableImage: "/badges/renewable-champion.png",
  },
  {
    id: "5",
    name: "Climate Hero",
    description: "Offset 10,000 tonnes of CO₂",
    icon: "🦸",
    category: "impact",
    rarity: "legendary",
    requirements: "Offset 10,000 tonnes of CO₂ equivalent",
    progress: { current: 3420, target: 10000 },
    isUnlocked: false,
    shareableImage: "/badges/climate-hero.png",
  },
  {
    id: "6",
    name: "Community Builder",
    description: "Refer 5 new users",
    icon: "👥",
    category: "engagement",
    rarity: "rare",
    requirements: "Refer 5 new users to the platform",
    progress: { current: 2, target: 5 },
    isUnlocked: false,
    shareableImage: "/badges/community-builder.png",
  },
]

const achievements: Achievement[] = [
  {
    id: "1",
    title: "First Purchase",
    description: "Made your first carbon credit purchase",
    icon: "🎯",
    unlockedAt: "2024-01-15",
    points: 100,
    category: "Milestone",
  },
  {
    id: "2",
    title: "Diversified Portfolio",
    description: "Purchased credits from 5 different project types",
    icon: "📊",
    unlockedAt: "2024-01-25",
    points: 250,
    category: "Strategy",
  },
  {
    id: "3",
    title: "Impact Tracker",
    description: "Retired your first carbon credits",
    icon: "♻️",
    unlockedAt: "2024-02-01",
    points: 200,
    category: "Impact",
  },
]

const milestones: Milestone[] = [
  {
    id: "1",
    title: "Carbon Neutral Goal",
    description: "Offset your annual carbon footprint",
    target: 25000,
    current: 15420,
    unit: "tonnes CO₂",
    reward: "Climate Champion Badge",
    isCompleted: false,
  },
  {
    id: "2",
    title: "Project Supporter",
    description: "Support projects across all continents",
    target: 7,
    current: 4,
    unit: "continents",
    reward: "Global Impact Badge",
    isCompleted: false,
  },
  {
    id: "3",
    title: "Portfolio Builder",
    description: "Build a diverse credit portfolio",
    target: 10,
    current: 12,
    unit: "project types",
    reward: "Diversification Master Badge",
    isCompleted: true,
    completedAt: "2024-01-30",
  },
]

const rarityColors = {
  common: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  rare: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  epic: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  legendary: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
}

export default function RewardsPage() {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)

  const unlockedBadges = badges.filter((badge) => badge.isUnlocked)
  const lockedBadges = badges.filter((badge) => !badge.isUnlocked)
  const totalPoints = achievements.reduce((sum, achievement) => sum + achievement.points, 0)

  const shareBadge = (badge: Badge) => {
    setSelectedBadge(badge)
    setShareDialogOpen(true)
  }

  const downloadBadge = (badge: Badge) => {
    // Mock download functionality
    console.log("Downloading badge:", badge.name)
  }

  const shareToSocial = (platform: string, badge: Badge) => {
    const text = `I just earned the "${badge.name}" badge on Carbon Fiesta! 🌱 #CarbonOffset #ClimateAction`
    const url = window.location.origin

    let shareUrl = ""
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Navigation Header */}
      <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/buyer" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">Carbon Fiesta</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Rewards & Achievements</h1>
          <p className="text-muted-foreground">Track your progress and unlock badges for your environmental impact</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
              <Award className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{unlockedBadges.length}</div>
              <p className="text-xs text-muted-foreground">of {badges.length} total</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 bg-secondary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievement Points</CardTitle>
              <Star className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{totalPoints.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">lifetime points</p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-accent/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Milestones</CardTitle>
              <Target className="h-4 w-4 text-accent-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent-foreground">
                {milestones.filter((m) => m.isCompleted).length}
              </div>
              <p className="text-xs text-muted-foreground">of {milestones.length} completed</p>
            </CardContent>
          </Card>

          <Card className="border-chart-4/20 bg-chart-4/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rank</CardTitle>
              <Trophy className="h-4 w-4 text-chart-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-4">Climate Champion</div>
              <p className="text-xs text-muted-foreground">top 5% of users</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="badges" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="badges">Badge Showcase</TabsTrigger>
            <TabsTrigger value="progress">Progress Trackers</TabsTrigger>
            <TabsTrigger value="achievements">Recent Achievements</TabsTrigger>
          </TabsList>

          {/* Badge Showcase Tab */}
          <TabsContent value="badges">
            <div className="space-y-6">
              {/* Unlocked Badges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Earned Badges ({unlockedBadges.length})
                  </CardTitle>
                  <CardDescription>
                    Badges you've earned for your environmental impact and platform engagement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {unlockedBadges.map((badge) => (
                      <Card key={badge.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                        <CardContent className="p-6 text-center">
                          <div className="text-4xl mb-3">{badge.icon}</div>
                          <h3 className="font-medium text-lg mb-2">{badge.name}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{badge.description}</p>

                          <div className="flex items-center justify-center gap-2 mb-4">
                            <UIBadge className={rarityColors[badge.rarity]}>{badge.rarity}</UIBadge>
                            <UIBadge variant="outline">{badge.category}</UIBadge>
                          </div>

                          {badge.unlockedAt && (
                            <div className="text-xs text-muted-foreground mb-4">
                              Earned on {new Date(badge.unlockedAt).toLocaleDateString()}
                            </div>
                          )}

                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => shareBadge(badge)} className="flex-1">
                              <Share2 className="h-3 w-3 mr-1" />
                              Share
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => downloadBadge(badge)} className="flex-1">
                              <Download className="h-3 w-3 mr-1" />
                              Save
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Locked Badges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    Locked Badges ({lockedBadges.length})
                  </CardTitle>
                  <CardDescription>Badges you can unlock by continuing your environmental journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lockedBadges.map((badge) => (
                      <Card key={badge.id} className="relative overflow-hidden opacity-75">
                        <CardContent className="p-6 text-center">
                          <div className="text-4xl mb-3 grayscale">{badge.icon}</div>
                          <h3 className="font-medium text-lg mb-2">{badge.name}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{badge.description}</p>

                          <div className="flex items-center justify-center gap-2 mb-4">
                            <UIBadge className={rarityColors[badge.rarity]}>{badge.rarity}</UIBadge>
                            <UIBadge variant="outline">{badge.category}</UIBadge>
                          </div>

                          {badge.progress && (
                            <div className="space-y-2 mb-4">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>
                                  {badge.progress.current}/{badge.progress.target}
                                </span>
                              </div>
                              <Progress
                                value={(badge.progress.current / badge.progress.target) * 100}
                                className="h-2"
                              />
                            </div>
                          )}

                          <div className="text-xs text-muted-foreground">{badge.requirements}</div>
                        </CardContent>
                        <div className="absolute top-2 right-2">
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Progress Trackers Tab */}
          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-accent-foreground" />
                  Progress Trackers
                </CardTitle>
                <CardDescription>Track your progress toward unlocking the next reward or milestone</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {milestones.map((milestone) => (
                    <div key={milestone.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{milestone.title}</h3>
                          <p className="text-sm text-muted-foreground">{milestone.description}</p>
                        </div>
                        <div className="text-right">
                          {milestone.isCompleted ? (
                            <div className="flex items-center gap-2 text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-sm font-medium">Completed</span>
                            </div>
                          ) : (
                            <div className="text-sm text-muted-foreground">
                              {milestone.current}/{milestone.target} {milestone.unit}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Progress value={Math.min((milestone.current / milestone.target) * 100, 100)} className="h-3" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Reward: {milestone.reward}</span>
                          {milestone.completedAt && (
                            <span>Completed on {new Date(milestone.completedAt).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recent Achievements Tab */}
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                  Recent Achievements
                </CardTitle>
                <CardDescription>Your latest accomplishments and milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium">{achievement.title}</h3>
                          <div className="flex items-center gap-2">
                            <UIBadge variant="secondary">+{achievement.points} pts</UIBadge>
                            <UIBadge variant="outline">{achievement.category}</UIBadge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {new Date(achievement.unlockedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Share Badge Dialog */}
        <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Share Your Achievement</DialogTitle>
              <DialogDescription>Share your {selectedBadge?.name} badge on social media</DialogDescription>
            </DialogHeader>
            {selectedBadge && (
              <div className="space-y-4">
                <div className="text-center p-6 bg-muted rounded-lg">
                  <div className="text-6xl mb-3">{selectedBadge.icon}</div>
                  <h3 className="font-medium text-xl mb-2">{selectedBadge.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedBadge.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => shareToSocial("twitter", selectedBadge)}
                    className="flex flex-col gap-2 h-auto py-4"
                  >
                    <Globe className="h-5 w-5" />
                    <span className="text-xs">Twitter</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => shareToSocial("linkedin", selectedBadge)}
                    className="flex flex-col gap-2 h-auto py-4"
                  >
                    <Users className="h-5 w-5" />
                    <span className="text-xs">LinkedIn</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => shareToSocial("facebook", selectedBadge)}
                    className="flex flex-col gap-2 h-auto py-4"
                  >
                    <Share2 className="h-5 w-5" />
                    <span className="text-xs">Facebook</span>
                  </Button>
                </div>

                <Button onClick={() => downloadBadge(selectedBadge)} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Badge Image
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
