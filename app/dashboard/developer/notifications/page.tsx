"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Bell, CheckCircle, DollarSign, Shield, Settings, Trash2 } from "lucide-react"
import Link from "next/link"

export default function NotificationsPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")

  const notifications = [
    {
      id: "NOT-001",
      type: "verifier",
      title: "Project Verification Complete",
      message:
        "Your Amazon Reforestation Initiative has been successfully verified. 2,340 new credits have been added to your wallet.",
      project: "Amazon Reforestation Initiative",
      timestamp: "2024-01-15T14:30:00Z",
      read: false,
      priority: "high",
      action: "View Project",
    },
    {
      id: "NOT-002",
      type: "payment",
      title: "Payment Processed",
      message:
        "Your withdrawal of 1,500 credits ($10,755) has been processed and transferred to your Wells Fargo account.",
      project: null,
      timestamp: "2024-01-12T09:15:00Z",
      read: true,
      priority: "medium",
      action: "View Transaction",
    },
    {
      id: "NOT-003",
      type: "system",
      title: "New Methodology Available",
      message: "VCS VM0042 - Improved Agricultural Land Management is now available for project submissions.",
      project: null,
      timestamp: "2024-01-10T16:45:00Z",
      read: false,
      priority: "low",
      action: "Learn More",
    },
    {
      id: "NOT-004",
      type: "verifier",
      title: "Additional Documentation Required",
      message: "The verifier has requested additional satellite imagery for your Solar Farm Development project.",
      project: "Solar Farm Development",
      timestamp: "2024-01-08T11:20:00Z",
      read: false,
      priority: "high",
      action: "Upload Documents",
    },
    {
      id: "NOT-005",
      type: "payment",
      title: "Monthly Statement Available",
      message: "Your January 2024 financial statement is ready for download.",
      project: null,
      timestamp: "2024-01-05T08:00:00Z",
      read: true,
      priority: "low",
      action: "Download Statement",
    },
    {
      id: "NOT-006",
      type: "system",
      title: "Platform Maintenance Scheduled",
      message:
        "Scheduled maintenance on January 20th from 2:00 AM to 4:00 AM UTC. Services may be temporarily unavailable.",
      project: null,
      timestamp: "2024-01-03T12:00:00Z",
      read: true,
      priority: "medium",
      action: null,
    },
    {
      id: "NOT-007",
      type: "verifier",
      title: "Verification Started",
      message:
        "Green Verify Corp has been assigned to verify your Mangrove Restoration project. Expected completion: 2-3 weeks.",
      project: "Mangrove Restoration",
      timestamp: "2024-01-01T10:30:00Z",
      read: true,
      priority: "medium",
      action: "View Progress",
    },
    {
      id: "NOT-008",
      type: "payment",
      title: "Credit Price Update",
      message: "Carbon credit prices have increased to $7.17 per credit. Your portfolio value has increased by $1,240.",
      project: null,
      timestamp: "2023-12-28T15:45:00Z",
      read: true,
      priority: "low",
      action: "View Portfolio",
    },
  ]

  const filteredNotifications = notifications.filter((notification) => {
    if (selectedFilter === "all") return true
    if (selectedFilter === "unread") return !notification.read
    return notification.type === selectedFilter
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "verifier":
        return <Shield className="h-5 w-5 text-secondary" />
      case "payment":
        return <DollarSign className="h-5 w-5 text-primary" />
      case "system":
        return <Settings className="h-5 w-5 text-accent-foreground" />
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-destructive"
      case "medium":
        return "text-secondary"
      case "low":
        return "text-muted-foreground"
      default:
        return "text-muted-foreground"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return "Yesterday"
    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/developer" className="flex items-center space-x-2">
              <Bell className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">VeriBlue</span>
            </Link>
            <Badge variant="secondary">Developer</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/developer">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Notifications</h1>
              <p className="text-muted-foreground">Stay updated on your projects and account activity</p>
            </div>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-lg px-3 py-1">
                {unreadCount} unread
              </Badge>
            )}
          </div>
        </div>

        {/* Notification Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center text-primary">
                <Bell className="h-4 w-4 mr-2" />
                Total Notifications
              </CardDescription>
              <CardTitle className="text-2xl text-primary">{notifications.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 bg-secondary/5">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center text-secondary">
                <Shield className="h-4 w-4 mr-2" />
                Verifier Updates
              </CardDescription>
              <CardTitle className="text-2xl text-secondary">
                {notifications.filter((n) => n.type === "verifier").length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Project verifications</p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-accent/5">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center text-accent-foreground">
                <DollarSign className="h-4 w-4 mr-2" />
                Payment Alerts
              </CardDescription>
              <CardTitle className="text-2xl text-accent-foreground">
                {notifications.filter((n) => n.type === "payment").length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Financial updates</p>
            </CardContent>
          </Card>

          <Card className="border-chart-4/20 bg-chart-4/5">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center text-chart-4">
                <Settings className="h-4 w-4 mr-2" />
                System Notices
              </CardDescription>
              <CardTitle className="text-2xl text-chart-4">
                {notifications.filter((n) => n.type === "system").length}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Platform updates</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedFilter} onValueChange={setSelectedFilter} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="verifier">Verifier</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedFilter} className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                    <p className="text-muted-foreground">
                      {selectedFilter === "unread"
                        ? "You're all caught up! No unread notifications."
                        : `No ${selectedFilter === "all" ? "" : selectedFilter} notifications found.`}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`transition-colors hover:bg-muted/50 ${
                    !notification.read ? "border-primary/20 bg-primary/5" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <h3
                              className={`font-semibold ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                            >
                              {notification.title}
                            </h3>
                            {!notification.read && <div className="h-2 w-2 bg-primary rounded-full"></div>}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                              {notification.priority}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-3 leading-relaxed">{notification.message}</p>
                        {notification.project && (
                          <div className="mb-3">
                            <Badge variant="secondary" className="text-xs">
                              {notification.project}
                            </Badge>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {notification.action && (
                              <Button size="sm" variant="outline">
                                {notification.action}
                              </Button>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            {!notification.read && (
                              <Button size="sm" variant="ghost">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Mark Read
                              </Button>
                            )}
                            <Button size="sm" variant="ghost">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
