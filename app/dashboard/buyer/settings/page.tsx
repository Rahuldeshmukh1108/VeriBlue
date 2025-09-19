"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Leaf,
  ArrowLeft,
  Shield,
  Wallet,
  Bell,
  Trash2,
  AlertTriangle,
  Key,
  Eye,
  EyeOff,
  Plus,
  ExternalLink,
  Copy,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

// TypeScript interfaces
interface SecuritySettings {
  twoFactorEnabled: boolean
  lastPasswordChange: string
  loginSessions: Array<{
    id: string
    device: string
    location: string
    lastActive: string
    isCurrent: boolean
  }>
}

interface WalletSettings {
  connectedWallets: Array<{
    address: string
    network: string
    isDefault: boolean
    nickname: string
  }>
  autoConnect: boolean
  transactionConfirmations: number
}

interface NotificationSettings {
  email: {
    newsletter: boolean
    marketingEmails: boolean
    projectUpdates: boolean
    transactionNotifications: boolean
    securityAlerts: boolean
  }
  push: {
    enabled: boolean
    transactionUpdates: boolean
    priceAlerts: boolean
    projectMilestones: boolean
  }
}

// Mock data
const securitySettings: SecuritySettings = {
  twoFactorEnabled: true,
  lastPasswordChange: "2024-01-15",
  loginSessions: [
    {
      id: "1",
      device: "Chrome on MacBook Pro",
      location: "San Francisco, CA",
      lastActive: "2024-01-20T10:30:00Z",
      isCurrent: true,
    },
    {
      id: "2",
      device: "Safari on iPhone",
      location: "San Francisco, CA",
      lastActive: "2024-01-19T15:45:00Z",
      isCurrent: false,
    },
  ],
}

const walletSettings: WalletSettings = {
  connectedWallets: [
    {
      address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5b8e",
      network: "Ethereum",
      isDefault: true,
      nickname: "Main Wallet",
    },
    {
      address: "0x8ba1f109551bD432803012645Hac136c22C501e5",
      network: "Polygon",
      isDefault: false,
      nickname: "Secondary Wallet",
    },
  ],
  autoConnect: true,
  transactionConfirmations: 3,
}

const notificationSettings: NotificationSettings = {
  email: {
    newsletter: true,
    marketingEmails: false,
    projectUpdates: true,
    transactionNotifications: true,
    securityAlerts: true,
  },
  push: {
    enabled: true,
    transactionUpdates: true,
    priceAlerts: false,
    projectMilestones: true,
  },
}

export default function SettingsPage() {
  const [security, setSecurity] = useState(securitySettings)
  const [wallets, setWallets] = useState(walletSettings)
  const [notifications, setNotifications] = useState(notificationSettings)
  const [showPassword, setShowPassword] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const revokeSession = (sessionId: string) => {
    setSecurity((prev) => ({
      ...prev,
      loginSessions: prev.loginSessions.filter((session) => session.id !== sessionId),
    }))
  }

  const setDefaultWallet = (address: string) => {
    setWallets((prev) => ({
      ...prev,
      connectedWallets: prev.connectedWallets.map((wallet) => ({
        ...wallet,
        isDefault: wallet.address === address,
      })),
    }))
  }

  const removeWallet = (address: string) => {
    setWallets((prev) => ({
      ...prev,
      connectedWallets: prev.connectedWallets.filter((wallet) => wallet.address !== address),
    }))
  }

  const updateEmailNotification = (key: string, value: boolean) => {
    setNotifications((prev) => ({
      ...prev,
      email: {
        ...prev.email,
        [key]: value,
      },
    }))
  }

  const updatePushNotification = (key: string, value: boolean) => {
    setNotifications((prev) => ({
      ...prev,
      push: {
        ...prev.push,
        [key]: value,
      },
    }))
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Account Settings</h1>
          <p className="text-muted-foreground">
            Manage your security, wallet connections, and notification preferences
          </p>
        </div>

        <Tabs defaultValue="security" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="wallets">Wallet Management</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              {/* Password Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-primary" />
                    Password & Authentication
                  </CardTitle>
                  <CardDescription>Manage your password and two-factor authentication settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="Enter current password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>

                    <Button>Update Password</Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Two-Factor Authentication</div>
                      <div className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {security.twoFactorEnabled ? (
                        <Badge
                          variant="default"
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Enabled
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Disabled</Badge>
                      )}
                      <Button variant="outline" size="sm">
                        {security.twoFactorEnabled ? "Disable" : "Enable"}
                      </Button>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Last password change: {new Date(security.lastPasswordChange).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>

              {/* Active Sessions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-secondary" />
                    Active Sessions
                  </CardTitle>
                  <CardDescription>Manage your active login sessions across devices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {security.loginSessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {session.device}
                            {session.isCurrent && (
                              <Badge variant="secondary" className="text-xs">
                                Current
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {session.location} • Last active {new Date(session.lastActive).toLocaleDateString()}
                          </div>
                        </div>
                        {!session.isCurrent && (
                          <Button variant="outline" size="sm" onClick={() => revokeSession(session.id)}>
                            Revoke
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-red-200 dark:border-red-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-5 w-5" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription>Irreversible actions that will permanently affect your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Deleting your account will permanently remove all your data, including purchased credits and
                        transaction history. This action cannot be undone.
                      </AlertDescription>
                    </Alert>

                    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Account
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Account</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove all
                            associated data.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                              You will lose access to all your carbon credits and transaction history.
                            </AlertDescription>
                          </Alert>
                          <div className="space-y-2">
                            <Label>Type "DELETE" to confirm</Label>
                            <Input placeholder="DELETE" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button variant="destructive">Delete Account</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Wallet Management Tab */}
          <TabsContent value="wallets">
            <div className="space-y-6">
              {/* Connected Wallets */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-primary" />
                    Connected Wallets
                  </CardTitle>
                  <CardDescription>Manage your connected cryptocurrency wallets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {wallets.connectedWallets.map((wallet, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="font-medium">{wallet.nickname}</div>
                            {wallet.isDefault && (
                              <Badge variant="default" className="text-xs">
                                Default
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {wallet.network} • {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => copyToClipboard(wallet.address)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`https://etherscan.io/address/${wallet.address}`} target="_blank">
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                          {!wallet.isDefault && (
                            <Button variant="outline" size="sm" onClick={() => setDefaultWallet(wallet.address)}>
                              Set Default
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeWallet(wallet.address)}
                            disabled={wallet.isDefault}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}

                    <Button variant="outline" className="w-full bg-transparent">
                      <Plus className="h-4 w-4 mr-2" />
                      Connect New Wallet
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Wallet Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Wallet Preferences</CardTitle>
                  <CardDescription>Configure your wallet connection and transaction settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Auto-connect wallet</div>
                      <div className="text-sm text-muted-foreground">
                        Automatically connect your default wallet when you visit the site
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={wallets.autoConnect}
                      onChange={(e) => setWallets((prev) => ({ ...prev, autoConnect: e.target.checked }))}
                      className="h-4 w-4"
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Transaction Confirmations</Label>
                    <Select
                      value={wallets.transactionConfirmations.toString()}
                      onValueChange={(value) =>
                        setWallets((prev) => ({ ...prev, transactionConfirmations: Number.parseInt(value) }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 confirmation (faster)</SelectItem>
                        <SelectItem value="3">3 confirmations (recommended)</SelectItem>
                        <SelectItem value="6">6 confirmations (more secure)</SelectItem>
                        <SelectItem value="12">12 confirmations (most secure)</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="text-sm text-muted-foreground">
                      Number of block confirmations required before considering a transaction final
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <div className="space-y-6">
              {/* Email Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Email Notifications
                  </CardTitle>
                  <CardDescription>Choose which emails you'd like to receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Newsletter</div>
                        <div className="text-sm text-muted-foreground">
                          Monthly updates about platform features and climate insights
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.email.newsletter}
                        onChange={(e) => updateEmailNotification("newsletter", e.target.checked)}
                        className="h-4 w-4"
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Marketing Emails</div>
                        <div className="text-sm text-muted-foreground">
                          Promotional content about new features and special offers
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.email.marketingEmails}
                        onChange={(e) => updateEmailNotification("marketingEmails", e.target.checked)}
                        className="h-4 w-4"
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Project Updates</div>
                        <div className="text-sm text-muted-foreground">Updates from projects you've supported</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.email.projectUpdates}
                        onChange={(e) => updateEmailNotification("projectUpdates", e.target.checked)}
                        className="h-4 w-4"
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Transaction Notifications</div>
                        <div className="text-sm text-muted-foreground">
                          Confirmations for purchases, retirements, and transfers
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.email.transactionNotifications}
                        onChange={(e) => updateEmailNotification("transactionNotifications", e.target.checked)}
                        className="h-4 w-4"
                      />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Security Alerts</div>
                        <div className="text-sm text-muted-foreground">
                          Important security notifications and login alerts
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.email.securityAlerts}
                        onChange={(e) => updateEmailNotification("securityAlerts", e.target.checked)}
                        className="h-4 w-4"
                        disabled
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Security alerts cannot be disabled for account safety
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Push Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-secondary" />
                    Push Notifications
                  </CardTitle>
                  <CardDescription>Manage browser and mobile push notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Enable Push Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Allow the website to send you push notifications
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.push.enabled}
                      onChange={(e) => updatePushNotification("enabled", e.target.checked)}
                      className="h-4 w-4"
                    />
                  </div>

                  {notifications.push.enabled && (
                    <>
                      <Separator />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Transaction Updates</div>
                            <div className="text-sm text-muted-foreground">Real-time updates on transaction status</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={notifications.push.transactionUpdates}
                            onChange={(e) => updatePushNotification("transactionUpdates", e.target.checked)}
                            className="h-4 w-4"
                          />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Price Alerts</div>
                            <div className="text-sm text-muted-foreground">
                              Notifications when credit prices change significantly
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={notifications.push.priceAlerts}
                            onChange={(e) => updatePushNotification("priceAlerts", e.target.checked)}
                            className="h-4 w-4"
                          />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Project Milestones</div>
                            <div className="text-sm text-muted-foreground">
                              Updates when projects reach important milestones
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={notifications.push.projectMilestones}
                            onChange={(e) => updatePushNotification("projectMilestones", e.target.checked)}
                            className="h-4 w-4"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
