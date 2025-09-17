import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Award, Star, Target, Zap, Crown, Medal, Gift, TrendingUp, Users, Leaf, Calendar } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function RewardsPage() {
  const userStats = {
    level: 8,
    xp: 2450,
    xpToNext: 550,
    totalCredits: 125000,
    impactScore: 95,
    rank: 47,
    totalUsers: 2847,
  }

  const achievements = [
    {
      id: "first-lease",
      name: "First Steps",
      description: "Complete your first carbon credit lease",
      icon: Target,
      earned: true,
      earnedDate: "2024-01-15",
      xp: 100,
      rarity: "Common",
    },
    {
      id: "climate-champion",
      name: "Climate Champion",
      description: "Offset 100 tons of CO₂",
      icon: Trophy,
      earned: true,
      earnedDate: "2024-02-20",
      xp: 500,
      rarity: "Rare",
    },
    {
      id: "forest-guardian",
      name: "Forest Guardian",
      description: "Support 3 forestry projects",
      icon: Leaf,
      earned: true,
      earnedDate: "2024-03-10",
      xp: 300,
      rarity: "Uncommon",
    },
    {
      id: "renewable-advocate",
      name: "Renewable Advocate",
      description: "Lease credits from 5 renewable energy projects",
      icon: Zap,
      earned: false,
      progress: 3,
      target: 5,
      xp: 400,
      rarity: "Uncommon",
    },
    {
      id: "impact-master",
      name: "Impact Master",
      description: "Achieve 1000 tons CO₂ offset",
      icon: Crown,
      earned: false,
      progress: 125,
      target: 1000,
      xp: 1000,
      rarity: "Legendary",
    },
    {
      id: "community-leader",
      name: "Community Leader",
      description: "Refer 10 new buyers",
      icon: Users,
      earned: false,
      progress: 2,
      target: 10,
      xp: 750,
      rarity: "Epic",
    },
  ]

  const leaderboard = [
    { rank: 1, name: "Sarah Chen", level: 15, credits: 500000, badge: "Eco Legend" },
    { rank: 2, name: "Miguel Santos", level: 14, credits: 450000, badge: "Carbon Hero" },
    { rank: 3, name: "Emma Wilson", level: 13, credits: 420000, badge: "Green Pioneer" },
    { rank: 4, name: "David Kim", level: 12, credits: 380000, badge: "Climate Warrior" },
    { rank: 5, name: "Lisa Rodriguez", level: 11, credits: 350000, badge: "Impact Leader" },
    { rank: 47, name: "Alex Johnson (You)", level: 8, credits: 125000, badge: "Climate Champion" },
  ]

  const rewards = [
    {
      id: "discount-10",
      name: "10% Lease Discount",
      description: "Get 10% off your next carbon credit lease",
      cost: 500,
      type: "Discount",
      available: true,
    },
    {
      id: "priority-access",
      name: "Priority Project Access",
      description: "Early access to new high-impact projects",
      cost: 1000,
      type: "Access",
      available: true,
    },
    {
      id: "custom-report",
      name: "Custom Impact Report",
      description: "Personalized environmental impact analysis",
      cost: 750,
      type: "Report",
      available: true,
    },
    {
      id: "exclusive-webinar",
      name: "Exclusive Webinar Access",
      description: "Join private sessions with climate experts",
      cost: 300,
      type: "Education",
      available: false,
    },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "text-gray-600 bg-gray-100"
      case "Uncommon":
        return "text-green-600 bg-green-100"
      case "Rare":
        return "text-blue-600 bg-blue-100"
      case "Epic":
        return "text-purple-600 bg-purple-100"
      case "Legendary":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <DashboardLayout userRole="buyer" userName="Alex Johnson">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Rewards & Achievements</h1>
              <p className="text-gray-600 mt-1">Track your progress and earn rewards for your environmental impact</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-amber-600">{userStats.xp} XP</div>
              <p className="text-sm text-gray-600">Level {userStats.level}</p>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-amber-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Current Level</p>
                    <p className="text-3xl font-bold text-amber-600">{userStats.level}</p>
                  </div>
                  <Medal className="w-8 h-8 text-amber-600" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Progress to Level {userStats.level + 1}</span>
                    <span>
                      {userStats.xp}/{userStats.xp + userStats.xpToNext}
                    </span>
                  </div>
                  <Progress value={(userStats.xp / (userStats.xp + userStats.xpToNext)) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Global Rank</p>
                    <p className="text-3xl font-bold text-blue-600">#{userStats.rank}</p>
                    <p className="text-xs text-gray-500">of {userStats.totalUsers.toLocaleString()}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-emerald-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Impact Score</p>
                    <p className="text-3xl font-bold text-emerald-600">{userStats.impactScore}</p>
                    <p className="text-xs text-gray-500">Environmental rating</p>
                  </div>
                  <Leaf className="w-8 h-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Credits</p>
                    <p className="text-3xl font-bold text-purple-600">{userStats.totalCredits.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Leased to date</p>
                  </div>
                  <Trophy className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="achievements" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              <TabsTrigger value="rewards">Reward Store</TabsTrigger>
            </TabsList>

            <TabsContent value="achievements" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <Card
                    key={achievement.id}
                    className={`bg-white/80 backdrop-blur-sm ${achievement.earned ? "border-emerald-200" : "border-gray-200"}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg ${achievement.earned ? "bg-emerald-100" : "bg-gray-100"}`}>
                          <achievement.icon
                            className={`w-6 h-6 ${achievement.earned ? "text-emerald-600" : "text-gray-400"}`}
                          />
                        </div>
                        <Badge className={getRarityColor(achievement.rarity)}>{achievement.rarity}</Badge>
                      </div>

                      <h3 className={`font-semibold mb-2 ${achievement.earned ? "text-gray-900" : "text-gray-500"}`}>
                        {achievement.name}
                      </h3>
                      <p className={`text-sm mb-4 ${achievement.earned ? "text-gray-600" : "text-gray-400"}`}>
                        {achievement.description}
                      </p>

                      {achievement.earned ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-amber-500" />
                            <span className="text-sm font-medium text-amber-600">+{achievement.xp} XP</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            {achievement.earnedDate}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {achievement.progress !== undefined && (
                            <>
                              <div className="flex justify-between text-xs">
                                <span>Progress</span>
                                <span>
                                  {achievement.progress}/{achievement.target}
                                </span>
                              </div>
                              <Progress value={(achievement.progress! / achievement.target!) * 100} className="h-2" />
                            </>
                          )}
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-500">+{achievement.xp} XP</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="leaderboard" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-600" />
                    Global Leaderboard
                  </CardTitle>
                  <p className="text-sm text-gray-600">Top carbon credit buyers by total environmental impact</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaderboard.map((user) => (
                      <div
                        key={user.rank}
                        className={`flex items-center gap-4 p-4 rounded-lg ${
                          user.name.includes("You") ? "bg-blue-50 border border-blue-200" : "bg-gray-50"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            user.rank === 1
                              ? "bg-yellow-100 text-yellow-800"
                              : user.rank === 2
                                ? "bg-gray-100 text-gray-800"
                                : user.rank === 3
                                  ? "bg-amber-100 text-amber-800"
                                  : user.name.includes("You")
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {user.rank <= 3 ? (
                            user.rank === 1 ? (
                              <Crown className="w-4 h-4" />
                            ) : user.rank === 2 ? (
                              <Medal className="w-4 h-4" />
                            ) : (
                              <Award className="w-4 h-4" />
                            )
                          ) : (
                            user.rank
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`font-semibold ${user.name.includes("You") ? "text-blue-900" : "text-gray-900"}`}
                            >
                              {user.name}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              Level {user.level}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{user.credits.toLocaleString()} credits</span>
                            <Badge className="bg-emerald-100 text-emerald-800 text-xs">{user.badge}</Badge>
                          </div>
                        </div>

                        {user.rank <= 3 && (
                          <div className="text-right">
                            <div
                              className={`text-lg font-bold ${
                                user.rank === 1
                                  ? "text-yellow-600"
                                  : user.rank === 2
                                    ? "text-gray-600"
                                    : "text-amber-600"
                              }`}
                            >
                              {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : "🥉"}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rewards" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rewards.map((reward) => (
                  <Card
                    key={reward.id}
                    className={`bg-white/80 backdrop-blur-sm ${
                      reward.available ? "border-blue-200" : "border-gray-200 opacity-60"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg ${reward.available ? "bg-blue-100" : "bg-gray-100"}`}>
                          <Gift className={`w-6 h-6 ${reward.available ? "text-blue-600" : "text-gray-400"}`} />
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {reward.type}
                        </Badge>
                      </div>

                      <h3 className={`font-semibold mb-2 ${reward.available ? "text-gray-900" : "text-gray-500"}`}>
                        {reward.name}
                      </h3>
                      <p className={`text-sm mb-4 ${reward.available ? "text-gray-600" : "text-gray-400"}`}>
                        {reward.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Star className={`w-4 h-4 ${reward.available ? "text-amber-500" : "text-gray-400"}`} />
                          <span className={`font-medium ${reward.available ? "text-amber-600" : "text-gray-500"}`}>
                            {reward.cost} XP
                          </span>
                        </div>
                        <Button
                          size="sm"
                          disabled={!reward.available || userStats.xp < reward.cost}
                          className={
                            reward.available && userStats.xp >= reward.cost ? "bg-blue-600 hover:bg-blue-700" : ""
                          }
                        >
                          {reward.available ? "Redeem" : "Coming Soon"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Gift className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">More Rewards Coming Soon!</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    We're constantly adding new rewards and benefits for our top performers.
                  </p>
                  <Button variant="outline">Suggest a Reward</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
