"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  Leaf,
  ArrowLeft,
  Wallet,
  CreditCard,
  Shield,
  CheckCircle,
  AlertCircle,
  Clock,
  ExternalLink,
  Copy,
  DollarSign,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

// TypeScript interfaces
interface CheckoutProject {
  id: string
  name: string
  type: string
  pricePerCredit: number
  image: string
  developer: string
  verificationStandard: string
}

interface OrderSummary {
  projectId: string
  credits: number
  pricePerCredit: number
  subtotal: number
  platformFee: number
  total: number
}

interface WalletConnection {
  isConnected: boolean
  address: string
  balance: number
  network: string
}

interface TransactionStatus {
  status: "idle" | "connecting" | "confirming" | "pending" | "success" | "failed"
  txHash?: string
  error?: string
}

// Mock data
const projects: Record<string, CheckoutProject> = {
  "1": {
    id: "1",
    name: "Sundarbans Mangrove Restoration",
    type: "Blue Carbon",
    pricePerCredit: 25,
    image: "/mangrove-forest-restoration.jpg",
    developer: "Bangladesh Forest Department",
    verificationStandard: "VCS",
  },
  "2": {
    id: "2",
    name: "Kenya Solar Farm Initiative",
    type: "Renewable Energy",
    pricePerCredit: 18,
    image: "/solar-farm-panels-africa.jpg",
    developer: "Kenya Renewable Energy",
    verificationStandard: "Gold Standard",
  },
}

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const projectId = searchParams.get("project") || "1"
  const amount = Number.parseInt(searchParams.get("amount") || "100")

  const project = projects[projectId] || projects["1"]
  const [orderSummary, setOrderSummary] = useState<OrderSummary>({
    projectId,
    credits: amount,
    pricePerCredit: project.pricePerCredit,
    subtotal: amount * project.pricePerCredit,
    platformFee: amount * project.pricePerCredit * 0.02,
    total: amount * project.pricePerCredit * 1.02,
  })

  const [wallet, setWallet] = useState<WalletConnection>({
    isConnected: false,
    address: "",
    balance: 0,
    network: "",
  })

  const [transaction, setTransaction] = useState<TransactionStatus>({
    status: "idle",
  })

  const [email, setEmail] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  // Mock wallet connection
  const connectWallet = async () => {
    setTransaction({ status: "connecting" })

    // Simulate wallet connection
    setTimeout(() => {
      setWallet({
        isConnected: true,
        address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5b8e",
        balance: 2.5,
        network: "Ethereum Mainnet",
      })
      setTransaction({ status: "idle" })
    }, 2000)
  }

  const disconnectWallet = () => {
    setWallet({
      isConnected: false,
      address: "",
      balance: 0,
      network: "",
    })
    setTransaction({ status: "idle" })
  }

  const processPurchase = async () => {
    if (!wallet.isConnected || !agreedToTerms) return

    setTransaction({ status: "confirming" })

    // Simulate transaction confirmation
    setTimeout(() => {
      setTransaction({ status: "pending", txHash: "0x1234567890abcdef1234567890abcdef12345678" })

      // Simulate transaction completion
      setTimeout(() => {
        setTransaction({
          status: "success",
          txHash: "0x1234567890abcdef1234567890abcdef12345678",
        })
      }, 5000)
    }, 3000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const updateCredits = (newAmount: number) => {
    const credits = Math.max(1, newAmount)
    setOrderSummary({
      projectId,
      credits,
      pricePerCredit: project.pricePerCredit,
      subtotal: credits * project.pricePerCredit,
      platformFee: credits * project.pricePerCredit * 0.02,
      total: credits * project.pricePerCredit * 1.02,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Navigation Header */}
      <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={`/dashboard/buyer/projects/${projectId}`} className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Project</span>
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Checkout</h1>
          <p className="text-muted-foreground">Complete your carbon credit purchase</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Order Summary
                </CardTitle>
                <CardDescription>Review your carbon credit purchase details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4 mb-6">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{project.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{project.type}</Badge>
                      <Badge variant="secondary">{project.verificationStandard}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">by {project.developer}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">${project.pricePerCredit}</div>
                    <div className="text-sm text-muted-foreground">per credit</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Label htmlFor="credits" className="min-w-0">
                      Number of Credits:
                    </Label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateCredits(orderSummary.credits - 10)}
                        disabled={transaction.status !== "idle"}
                      >
                        -10
                      </Button>
                      <Input
                        id="credits"
                        type="number"
                        value={orderSummary.credits}
                        onChange={(e) => updateCredits(Number.parseInt(e.target.value) || 1)}
                        className="w-24 text-center"
                        min="1"
                        disabled={transaction.status !== "idle"}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateCredits(orderSummary.credits + 10)}
                        disabled={transaction.status !== "idle"}
                      >
                        +10
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal ({orderSummary.credits} credits):</span>
                      <span>${orderSummary.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Platform fee (2%):</span>
                      <span>${orderSummary.platformFee.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>${orderSummary.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>We'll send your purchase confirmation and certificate here</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={transaction.status !== "idle"}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Wallet Connection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-secondary" />
                  Wallet Connection
                </CardTitle>
                <CardDescription>Connect your wallet to complete the purchase</CardDescription>
              </CardHeader>
              <CardContent>
                {!wallet.isConnected ? (
                  <div className="space-y-4">
                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertDescription>
                        Your wallet will be used to pay for the carbon credits and receive the NFT certificates.
                      </AlertDescription>
                    </Alert>
                    <Button
                      onClick={connectWallet}
                      disabled={transaction.status === "connecting"}
                      className="w-full"
                      size="lg"
                    >
                      {transaction.status === "connecting" ? (
                        <>
                          <Clock className="h-4 w-4 mr-2 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Wallet className="h-4 w-4 mr-2" />
                          Connect Wallet
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-medium">Wallet Connected</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(wallet.address)}
                              className="h-auto p-1"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={disconnectWallet}>
                        Disconnect
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Network</div>
                        <div className="font-medium">{wallet.network}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Balance</div>
                        <div className="font-medium">{wallet.balance} ETH</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Terms and Conditions */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1"
                    disabled={transaction.status !== "idle"}
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                    . I understand that carbon credits are digital assets and purchases are final.
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Button */}
            <Card className="sticky top-24">
              <CardContent className="pt-6">
                <Button
                  onClick={processPurchase}
                  disabled={!wallet.isConnected || !agreedToTerms || !email || transaction.status !== "idle"}
                  className="w-full"
                  size="lg"
                >
                  {transaction.status === "confirming" ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Confirming...
                    </>
                  ) : transaction.status === "pending" ? (
                    <>
                      <Clock className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Purchase Credits
                    </>
                  )}
                </Button>

                {wallet.isConnected && wallet.balance < orderSummary.total / 1000 && (
                  <Alert className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Insufficient balance. You need at least {(orderSummary.total / 1000).toFixed(4)} ETH.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Transaction Status */}
            {transaction.status !== "idle" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-accent-foreground" />
                    Transaction Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transaction.status === "connecting" && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 animate-spin" />
                        <span>Connecting to wallet...</span>
                      </div>
                    )}

                    {transaction.status === "confirming" && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 animate-spin" />
                          <span>Confirm transaction in your wallet</span>
                        </div>
                        <Progress value={33} className="h-2" />
                      </div>
                    )}

                    {transaction.status === "pending" && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 animate-spin" />
                          <span>Transaction pending...</span>
                        </div>
                        <Progress value={66} className="h-2" />
                        {transaction.txHash && (
                          <div className="text-sm">
                            <span className="text-muted-foreground">Tx Hash: </span>
                            <Link
                              href={`https://etherscan.io/tx/${transaction.txHash}`}
                              target="_blank"
                              className="text-primary hover:underline font-mono"
                            >
                              {transaction.txHash.slice(0, 10)}...
                              <ExternalLink className="h-3 w-3 inline ml-1" />
                            </Link>
                          </div>
                        )}
                      </div>
                    )}

                    {transaction.status === "success" && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span>Transaction successful!</span>
                        </div>
                        <Progress value={100} className="h-2" />
                        <Alert className="border-green-200 bg-green-50 dark:bg-green-950">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <AlertDescription>
                            Your carbon credits have been purchased and will be delivered to your wallet shortly.
                          </AlertDescription>
                        </Alert>
                        {transaction.txHash && (
                          <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
                            <Link href={`https://etherscan.io/tx/${transaction.txHash}`} target="_blank">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View on Etherscan
                            </Link>
                          </Button>
                        )}
                      </div>
                    )}

                    {transaction.status === "failed" && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-red-600">
                          <AlertCircle className="h-4 w-4" />
                          <span>Transaction failed</span>
                        </div>
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            {transaction.error || "Something went wrong. Please try again."}
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security Notice */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-green-600" />
                  Secure Purchase
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span>Blockchain verified certificates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span>Immutable ownership records</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span>Instant delivery to wallet</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
