"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Leaf,
  ArrowLeft,
  Recycle,
  ExternalLink,
  Calendar,
  MapPin,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
} from "lucide-react"
import Link from "next/link"

// TypeScript interfaces
interface OwnedCredit {
  id: string
  creditId: string
  projectName: string
  projectType: string
  location: string
  purchaseDate: string
  purchasePrice: number
  currentValue: number
  status: "active" | "retired" | "pending"
  vintage: string
  verificationStandard: string
  serialNumber: string
  blockchainTxHash: string
}

interface RetiredCredit {
  id: string
  creditId: string
  projectName: string
  projectType: string
  retirementDate: string
  retirementReason: string
  certificateUrl: string
  blockchainTxHash: string
  co2Amount: number
}

interface Transaction {
  id: string
  type: "purchase" | "retirement"
  creditId: string
  projectName: string
  amount: number
  date: string
  txHash: string
  status: "completed" | "pending" | "failed"
}

// Mock data
const ownedCredits: OwnedCredit[] = [
  {
    id: "1",
    creditId: "MNG-BD-2024-001",
    projectName: "Sundarbans Mangrove Restoration",
    projectType: "Blue Carbon",
    location: "Bangladesh",
    purchaseDate: "2024-01-15",
    purchasePrice: 25,
    currentValue: 27,
    status: "active",
    vintage: "2024",
    verificationStandard: "VCS",
    serialNumber: "VCS-2024-MNG-BD-001",
    blockchainTxHash: "0x1234567890abcdef",
  },
  {
    id: "2",
    creditId: "SOL-KE-2024-002",
    projectName: "Kenya Solar Farm Initiative",
    projectType: "Renewable Energy",
    location: "Kenya",
    purchaseDate: "2024-01-10",
    purchasePrice: 18,
    currentValue: 19,
    status: "active",
    vintage: "2024",
    verificationStandard: "Gold Standard",
    serialNumber: "GS-2024-SOL-KE-002",
    blockchainTxHash: "0x2345678901bcdef0",
  },
  {
    id: "3",
    creditId: "FOR-BR-2023-003",
    projectName: "Amazon Rainforest Conservation",
    projectType: "REDD+",
    location: "Brazil",
    purchaseDate: "2023-12-20",
    purchasePrice: 28,
    currentValue: 30,
    status: "active",
    vintage: "2023",
    verificationStandard: "VCS",
    serialNumber: "VCS-2023-FOR-BR-003",
    blockchainTxHash: "0x3456789012cdef01",
  },
]

const retiredCredits: RetiredCredit[] = [
  {
    id: "1",
    creditId: "WND-GB-2023-004",
    projectName: "North Sea Wind Farm",
    projectType: "Renewable Energy",
    retirementDate: "2024-01-12",
    retirementReason: "Corporate ESG Reporting - Q4 2023",
    certificateUrl: "/certificates/retirement-001.pdf",
    blockchainTxHash: "0x4567890123def012",
    co2Amount: 150,
  },
  {
    id: "2",
    creditId: "SEA-AU-2023-005",
    projectName: "Great Barrier Reef Seagrass Conservation",
    projectType: "Blue Carbon",
    retirementDate: "2023-12-15",
    retirementReason: "Annual Carbon Neutrality Goal",
    certificateUrl: "/certificates/retirement-002.pdf",
    blockchainTxHash: "0x567890123def0123",
    co2Amount: 250,
  },
]

const transactions: Transaction[] = [
  {
    id: "1",
    type: "purchase",
    creditId: "MNG-BD-2024-001",
    projectName: "Sundarbans Mangrove Restoration",
    amount: 500,
    date: "2024-01-15",
    txHash: "0x1234567890abcdef",
    status: "completed",
  },
  {
    id: "2",
    type: "retirement",
    creditId: "WND-GB-2023-004",
    projectName: "North Sea Wind Farm",
    amount: 150,
    date: "2024-01-12",
    txHash: "0x4567890123def012",
    status: "completed",
  },
  {
    id: "3",
    type: "purchase",
    creditId: "SOL-KE-2024-002",
    projectName: "Kenya Solar Farm Initiative",
    amount: 300,
    date: "2024-01-10",
    txHash: "0x2345678901bcdef0",
    status: "completed",
  },
]

export default function PortfolioPage() {
  const [selectedCredit, setSelectedCredit] = useState<OwnedCredit | null>(null)
  const [retireDialogOpen, setRetireDialogOpen] = useState(false)
  const [retirementReason, setRetirementReason] = useState("")
  const [retirementAmount, setRetirementAmount] = useState("")

  const handleRetireCredit = () => {
    // Handle retirement logic here
    console.log("Retiring credit:", selectedCredit?.id, "Amount:", retirementAmount, "Reason:", retirementReason)
    setRetireDialogOpen(false)
    setRetirementReason("")
    setRetirementAmount("")
    setSelectedCredit(null)
  }

  const totalActiveCredits = ownedCredits.length
  const totalRetiredCredits = retiredCredits.reduce((sum, credit) => sum + credit.co2Amount, 0)
  const portfolioValue = ownedCredits.reduce((sum, credit) => sum + credit.currentValue, 0)
  const totalGainLoss = ownedCredits.reduce((sum, credit) => sum + (credit.currentValue - credit.purchasePrice), 0)

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
          <h1 className="text-3xl font-bold text-foreground mb-2">My Portfolio</h1>
          <p className="text-muted-foreground">Manage your carbon credits and track your environmental impact</p>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Credits</CardTitle>
              <Leaf className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{totalActiveCredits}</div>
              <p className="text-xs text-muted-foreground">Available for retirement</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 bg-secondary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Retired Credits</CardTitle>
              <Recycle className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{totalRetiredCredits}</div>
              <p className="text-xs text-muted-foreground">tonnes CO₂ offset</p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-accent/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-accent-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent-foreground">${portfolioValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Current market value</p>
            </CardContent>
          </Card>

          <Card
            className={`border-chart-4/20 ${totalGainLoss >= 0 ? "bg-green-50 dark:bg-green-950" : "bg-red-50 dark:bg-red-950"}`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gain/Loss</CardTitle>
              <TrendingUp className={`h-4 w-4 ${totalGainLoss >= 0 ? "text-green-600" : "text-red-600"}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalGainLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                {totalGainLoss >= 0 ? "+" : ""}${totalGainLoss.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Since purchase</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active Credits</TabsTrigger>
            <TabsTrigger value="retired">Retired Credits</TabsTrigger>
            <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          </TabsList>

          {/* Active Credits Tab */}
          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  Owned Credits
                </CardTitle>
                <CardDescription>Detailed list of all active, un-retired credits with unique IDs</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Credit ID</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Purchase Price</TableHead>
                      <TableHead>Current Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ownedCredits.map((credit) => (
                      <TableRow key={credit.id}>
                        <TableCell className="font-mono text-sm">{credit.creditId}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{credit.projectName}</div>
                            <div className="text-sm text-muted-foreground">
                              {credit.verificationStandard} • Vintage {credit.vintage}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{credit.projectType}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            {credit.location}
                          </div>
                        </TableCell>
                        <TableCell>${credit.purchasePrice}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span>${credit.currentValue}</span>
                            <span
                              className={`text-sm ${credit.currentValue > credit.purchasePrice ? "text-green-600" : "text-red-600"}`}
                            >
                              ({credit.currentValue > credit.purchasePrice ? "+" : ""}
                              {(((credit.currentValue - credit.purchasePrice) / credit.purchasePrice) * 100).toFixed(1)}
                              %)
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={credit.status === "active" ? "default" : "secondary"}>{credit.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedCredit(credit)
                                setRetireDialogOpen(true)
                              }}
                            >
                              <Recycle className="h-4 w-4 mr-1" />
                              Retire
                            </Button>
                            <Button size="sm" variant="ghost" asChild>
                              <Link href={`https://etherscan.io/tx/${credit.blockchainTxHash}`} target="_blank">
                                <ExternalLink className="h-4 w-4" />
                              </Link>
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

          {/* Retired Credits Tab */}
          <TabsContent value="retired">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Recycle className="h-5 w-5 text-secondary" />
                  Retired Credits Log
                </CardTitle>
                <CardDescription>Permanent record of all retired credits for ESG reporting</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Credit ID</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>CO₂ Amount</TableHead>
                      <TableHead>Retirement Date</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Certificate</TableHead>
                      <TableHead>Blockchain</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {retiredCredits.map((credit) => (
                      <TableRow key={credit.id}>
                        <TableCell className="font-mono text-sm">{credit.creditId}</TableCell>
                        <TableCell>
                          <div className="font-medium">{credit.projectName}</div>
                          <Badge variant="outline" className="mt-1">
                            {credit.projectType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">{credit.co2Amount}</span>
                            <span className="text-sm text-muted-foreground">tonnes CO₂</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {new Date(credit.retirementDate).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <div className="text-sm text-muted-foreground truncate" title={credit.retirementReason}>
                            {credit.retirementReason}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={credit.certificateUrl} target="_blank">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Link>
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="ghost" asChild>
                            <Link href={`https://etherscan.io/tx/${credit.blockchainTxHash}`} target="_blank">
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transaction History Tab */}
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-accent-foreground" />
                  Transaction History
                </CardTitle>
                <CardDescription>Complete log of all past purchases and retirements</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Credit ID</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Blockchain</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          <Badge variant={transaction.type === "purchase" ? "default" : "secondary"}>
                            {transaction.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{transaction.creditId}</TableCell>
                        <TableCell className="font-medium">{transaction.projectName}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {new Date(transaction.date).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {transaction.status === "completed" ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : transaction.status === "pending" ? (
                              <Clock className="h-4 w-4 text-yellow-600" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-red-600" />
                            )}
                            <span className="capitalize">{transaction.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="ghost" asChild>
                            <Link href={`https://etherscan.io/tx/${transaction.txHash}`} target="_blank">
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Retire Credit Dialog */}
        <Dialog open={retireDialogOpen} onOpenChange={setRetireDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Retire Credit</DialogTitle>
              <DialogDescription>
                Permanently retire this carbon credit for offsetting. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            {selectedCredit && (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="font-medium">{selectedCredit.projectName}</div>
                  <div className="text-sm text-muted-foreground">Credit ID: {selectedCredit.creditId}</div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount to Retire</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={retirementAmount}
                    onChange={(e) => setRetirementAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason">Retirement Reason</Label>
                  <Textarea
                    id="reason"
                    placeholder="e.g., Corporate ESG Reporting - Q1 2024"
                    value={retirementReason}
                    onChange={(e) => setRetirementReason(e.target.value)}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setRetireDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleRetireCredit} disabled={!retirementAmount || !retirementReason}>
                <Recycle className="h-4 w-4 mr-2" />
                Retire Credit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
