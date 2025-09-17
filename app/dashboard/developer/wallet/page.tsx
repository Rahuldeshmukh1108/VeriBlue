import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Wallet,
  Download,
  Upload,
  TrendingUp,
  DollarSign,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Leaf,
  Calendar,
  Filter,
} from "lucide-react"
import Link from "next/link"

export default function WalletPage() {
  const walletBalance = {
    totalCredits: 12450,
    availableCredits: 8230,
    pendingCredits: 4220,
    totalValue: 89250,
    monthlyChange: 15680,
    creditPrice: 7.17,
  }

  const transactions = [
    {
      id: "TXN-001",
      date: "2024-01-15",
      type: "credit_issued",
      description: "Amazon Reforestation - Q4 Verification",
      credits: 2340,
      value: 16778,
      status: "completed",
      project: "Amazon Reforestation Initiative",
    },
    {
      id: "TXN-002",
      date: "2024-01-12",
      type: "withdrawal",
      description: "Bank Transfer - Wells Fargo",
      credits: -1500,
      value: -10755,
      status: "completed",
      project: null,
    },
    {
      id: "TXN-003",
      date: "2024-01-10",
      type: "credit_issued",
      description: "Solar Farm - Q3 Verification",
      credits: 1800,
      value: 12906,
      status: "completed",
      project: "Solar Farm Development",
    },
    {
      id: "TXN-004",
      date: "2024-01-08",
      type: "withdrawal",
      description: "PayPal Transfer",
      credits: -800,
      value: -5736,
      status: "pending",
      project: null,
    },
    {
      id: "TXN-005",
      date: "2024-01-05",
      type: "credit_issued",
      description: "Mangrove Restoration - Baseline",
      credits: 500,
      value: 3585,
      status: "completed",
      project: "Mangrove Restoration",
    },
    {
      id: "TXN-006",
      date: "2024-01-03",
      type: "fee",
      description: "Platform Fee - January",
      credits: 0,
      value: -125,
      status: "completed",
      project: null,
    },
  ]

  const monthlyEarnings = [
    { month: "Jan 2024", credits: 4640, value: 33268 },
    { month: "Dec 2023", credits: 3200, value: 22944 },
    { month: "Nov 2023", credits: 2800, value: 20076 },
    { month: "Oct 2023", credits: 1900, value: 13623 },
    { month: "Sep 2023", credits: 2100, value: 15057 },
    { month: "Aug 2023", credits: 1600, value: 11472 },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/developer" className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Carbon Fiesta</span>
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
              <Download className="h-4 w-4 mr-2" />
              Export Statement
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Wallet & Finance</h1>
          <p className="text-muted-foreground">Manage your carbon credits and track earnings</p>
        </div>

        {/* Wallet Balance Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center text-primary">
                <Wallet className="h-4 w-4 mr-2" />
                Total Credits
              </CardDescription>
              <CardTitle className="text-3xl text-primary">{walletBalance.totalCredits.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Carbon credits owned</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 bg-secondary/5">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center text-secondary">
                <CreditCard className="h-4 w-4 mr-2" />
                Available Credits
              </CardDescription>
              <CardTitle className="text-3xl text-secondary">
                {walletBalance.availableCredits.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Ready for withdrawal</p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-accent/5">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center text-accent-foreground">
                <DollarSign className="h-4 w-4 mr-2" />
                Total Value
              </CardDescription>
              <CardTitle className="text-3xl text-accent-foreground">
                ${walletBalance.totalValue.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">At ${walletBalance.creditPrice}/credit</p>
            </CardContent>
          </Card>

          <Card className="border-chart-4/20 bg-chart-4/5">
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center text-chart-4">
                <TrendingUp className="h-4 w-4 mr-2" />
                Monthly Change
              </CardDescription>
              <CardTitle className="text-3xl text-chart-4">+${walletBalance.monthlyChange.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">This month's earnings</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw Credits</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>All your credit transactions and withdrawals</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Credits</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            {new Date(transaction.date).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {transaction.type === "credit_issued" && (
                              <ArrowDownLeft className="h-4 w-4 mr-2 text-primary" />
                            )}
                            {transaction.type === "withdrawal" && (
                              <ArrowUpRight className="h-4 w-4 mr-2 text-secondary" />
                            )}
                            {transaction.type === "fee" && (
                              <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                            )}
                            <span className="capitalize">{transaction.type.replace("_", " ")}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            {transaction.project && (
                              <p className="text-sm text-muted-foreground">{transaction.project}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={`font-medium ${
                              transaction.credits > 0
                                ? "text-primary"
                                : transaction.credits < 0
                                  ? "text-secondary"
                                  : "text-muted-foreground"
                            }`}
                          >
                            {transaction.credits > 0 ? "+" : ""}
                            {transaction.credits.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={`font-medium ${
                              transaction.value > 0
                                ? "text-primary"
                                : transaction.value < 0
                                  ? "text-secondary"
                                  : "text-muted-foreground"
                            }`}
                          >
                            {transaction.value > 0 ? "+" : ""}${transaction.value.toLocaleString()}
                          </span>
                        </TableCell>
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
          </TabsContent>

          <TabsContent value="withdraw" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Withdraw Credits</CardTitle>
                  <CardDescription>Convert your carbon credits to cash</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Available for withdrawal</span>
                      <span className="font-semibold">{walletBalance.availableCredits.toLocaleString()} credits</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Estimated value</span>
                      <span className="font-semibold text-primary">
                        ${(walletBalance.availableCredits * walletBalance.creditPrice).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="credits">Credits to withdraw</Label>
                      <Input
                        id="credits"
                        placeholder="Enter number of credits"
                        type="number"
                        max={walletBalance.availableCredits}
                      />
                      <p className="text-sm text-muted-foreground">
                        Maximum: {walletBalance.availableCredits.toLocaleString()} credits
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="method">Withdrawal method</Label>
                      <select className="w-full p-2 border rounded-md bg-background">
                        <option value="bank">Bank Transfer (2-3 business days)</option>
                        <option value="paypal">PayPal (1-2 business days)</option>
                        <option value="crypto">Cryptocurrency (Instant)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="account">Account details</Label>
                      <Input id="account" placeholder="Account number or email" />
                    </div>

                    <div className="p-4 bg-accent/10 rounded-lg">
                      <h4 className="font-semibold mb-2">Withdrawal Summary</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Credits:</span>
                          <span>0</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rate:</span>
                          <span>${walletBalance.creditPrice}/credit</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Platform fee (2%):</span>
                          <span>$0.00</span>
                        </div>
                        <div className="flex justify-between font-semibold border-t pt-1">
                          <span>Total:</span>
                          <span>$0.00</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full" disabled>
                      <Upload className="h-4 w-4 mr-2" />
                      Withdraw Credits
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Withdrawal Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Processing Times</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Bank Transfer:</span>
                        <span>2-3 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>PayPal:</span>
                        <span>1-2 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cryptocurrency:</span>
                        <span>Instant</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Fees</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Platform fee:</span>
                        <span>2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Minimum withdrawal:</span>
                        <span>100 credits</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Current Rate</h4>
                    <div className="text-center p-3 bg-primary/10 rounded-lg">
                      <p className="text-2xl font-bold text-primary">${walletBalance.creditPrice}</p>
                      <p className="text-sm text-muted-foreground">per credit</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Earnings</CardTitle>
                  <CardDescription>Credits earned and their value over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyEarnings.map((month, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{month.month}</p>
                          <p className="text-sm text-muted-foreground">{month.credits.toLocaleString()} credits</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">${month.value.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">
                            ${(month.value / month.credits).toFixed(2)}/credit
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Your carbon credit portfolio performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Credits Generated (YTD)</span>
                        <span className="font-semibold">18,240</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "73%" }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">73% of annual target</p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Revenue Growth</span>
                        <span className="font-semibold text-primary">+24.5%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-secondary h-2 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Compared to last year</p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Project Success Rate</span>
                        <span className="font-semibold text-chart-4">94.2%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-chart-4 h-2 rounded-full" style={{ width: "94%" }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Verification success rate</p>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-semibold mb-3">Top Performing Projects</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Amazon Reforestation</span>
                          <span className="text-primary">5,200 credits</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Solar Farm Development</span>
                          <span className="text-primary">3,800 credits</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Mangrove Restoration</span>
                          <span className="text-primary">1,200 credits</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
