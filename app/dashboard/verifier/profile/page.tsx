"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Shield,
  Search,
  ExternalLink,
  Calendar,
  CheckCircle,
  Building2,
  Globe,
  Award,
  TrendingUp,
  FileText,
  Eye,
  Copy,
  Mail,
  Phone,
} from "lucide-react"

// TypeScript interfaces for verifier profile data
interface VerifierCredentials {
  organization: string
  walletAddress: string
  accreditation: string
  licenseNumber: string
  validUntil: string
  specializations: string[]
  yearsExperience: number
}

interface VerificationRecord {
  id: string
  projectName: string
  developer: string
  creditsVerified: number
  verificationDate: string
  transactionHash: string
  projectType: string
  methodology: string
  status: "verified" | "rejected"
}

interface VerifierStats {
  totalVerifications: number
  totalCreditsVerified: number
  approvalRate: number
  averageTurnaround: number
  activeProjects: number
}

// Mock data for verifier profile
const verifierCredentials: VerifierCredentials = {
  organization: "Global Carbon Verification Institute",
  walletAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
  accreditation: "ISO 14065:2020 Accredited",
  licenseNumber: "GCVI-2024-001",
  validUntil: "2025-12-31",
  specializations: ["REDD+", "Blue Carbon", "Renewable Energy", "Afforestation"],
  yearsExperience: 12,
}

const verifierStats: VerifierStats = {
  totalVerifications: 156,
  totalCreditsVerified: 2847000,
  approvalRate: 94.5,
  averageTurnaround: 3.2,
  activeProjects: 8,
}

const verificationHistory: VerificationRecord[] = [
  {
    id: "1",
    projectName: "Amazon Rainforest Conservation",
    developer: "EcoForest Solutions",
    creditsVerified: 2500,
    verificationDate: "2024-01-15",
    transactionHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z",
    projectType: "REDD+",
    methodology: "VM0015",
    status: "verified",
  },
  {
    id: "2",
    projectName: "Mangrove Restoration Project",
    developer: "Blue Carbon Initiative",
    creditsVerified: 1800,
    verificationDate: "2024-01-12",
    transactionHash: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a",
    projectType: "Blue Carbon",
    methodology: "VM0033",
    status: "verified",
  },
  {
    id: "3",
    projectName: "Kenya Solar Farm Phase 2",
    developer: "Solar Energy Co.",
    creditsVerified: 3200,
    verificationDate: "2024-01-10",
    transactionHash: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b",
    projectType: "Renewable Energy",
    methodology: "ACM0002",
    status: "verified",
  },
  {
    id: "4",
    projectName: "Indonesian Peatland Restoration",
    developer: "Peatland Conservation Trust",
    creditsVerified: 0,
    verificationDate: "2024-01-08",
    transactionHash: "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c",
    projectType: "Wetland Restoration",
    methodology: "VM0024",
    status: "rejected",
  },
  {
    id: "5",
    projectName: "Brazilian Wind Farm",
    developer: "Wind Energy Brasil",
    creditsVerified: 2800,
    verificationDate: "2024-01-05",
    transactionHash: "0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d",
    projectType: "Renewable Energy",
    methodology: "ACM0002",
    status: "verified",
  },
]

export default function VerifierProfile() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [projectTypeFilter, setProjectTypeFilter] = useState("all")

  const filteredHistory = verificationHistory.filter((record) => {
    const matchesSearch =
      record.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.developer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || record.status === statusFilter
    const matchesType = projectTypeFilter === "all" || record.projectType === projectTypeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Show toast notification
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Navigation Header */}
      <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">VeriBlue</span>
            <Badge variant="secondary" className="ml-2">
              Public Profile
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Dr. Elena Rodriguez" />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Public Verifier Profile</h1>
          <p className="text-muted-foreground">
            Transparent verification history and credentials for platform trust and accountability
          </p>
        </div>

        {/* Verifier Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Credentials Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Verifier Credentials
              </CardTitle>
              <CardDescription>Official accreditation and professional qualifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg" alt="Dr. Elena Rodriguez" />
                  <AvatarFallback className="text-lg">ER</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="text-xl font-semibold">Dr. Elena Rodriguez</h3>
                    <p className="text-muted-foreground">{verifierCredentials.organization}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      <span>elena@gcvi.org</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Wallet Address</label>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-xs bg-muted px-2 py-1 rounded flex-1 truncate">
                        {verifierCredentials.walletAddress}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={() => copyToClipboard(verifierCredentials.walletAddress)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Accreditation</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="default" className="bg-primary/10 text-primary border-primary/20">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {verifierCredentials.accreditation}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">License Number</label>
                    <p className="text-sm mt-1 font-mono">{verifierCredentials.licenseNumber}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Valid Until</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{new Date(verifierCredentials.validUntil).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Specializations</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {verifierCredentials.specializations.map((spec) => (
                    <Badge key={spec} variant="secondary">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span>{verifierCredentials.yearsExperience} years experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-secondary" />
                  <span>Global verification authority</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-secondary" />
                Verification Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="text-2xl font-bold text-primary">{verifierStats.totalVerifications}</div>
                <div className="text-xs text-muted-foreground">Total Verifications</div>
              </div>

              <div className="text-center p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                <div className="text-2xl font-bold text-secondary">
                  {(verifierStats.totalCreditsVerified / 1000000).toFixed(1)}M
                </div>
                <div className="text-xs text-muted-foreground">Credits Verified</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-bold text-accent-foreground">{verifierStats.approvalRate}%</div>
                  <div className="text-xs text-muted-foreground">Approval Rate</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-bold text-chart-4">{verifierStats.averageTurnaround}d</div>
                  <div className="text-xs text-muted-foreground">Avg. Turnaround</div>
                </div>
              </div>

              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-lg font-bold text-destructive">{verifierStats.activeProjects}</div>
                <div className="text-xs text-muted-foreground">Active Projects</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Verification History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-chart-4" />
              Public Verification History
            </CardTitle>
            <CardDescription>Complete record of all verification activities with on-chain attestations</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects or developers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={projectTypeFilter} onValueChange={setProjectTypeFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Project Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="REDD+">REDD+</SelectItem>
                  <SelectItem value="Blue Carbon">Blue Carbon</SelectItem>
                  <SelectItem value="Renewable Energy">Renewable Energy</SelectItem>
                  <SelectItem value="Wetland Restoration">Wetland Restoration</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* History Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Developer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Methodology</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Transaction</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="font-medium">{record.projectName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span>{record.developer}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{record.projectType}</Badge>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-2 py-1 rounded">{record.methodology}</code>
                    </TableCell>
                    <TableCell>
                      <div className="text-right">
                        {record.status === "verified" ? (
                          <>
                            <div className="font-medium text-primary">{record.creditsVerified.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">credits</div>
                          </>
                        ) : (
                          <Badge variant="destructive" className="text-xs">
                            Rejected
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(record.verificationDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={record.status === "verified" ? "default" : "destructive"}>
                        {record.status === "verified" ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </>
                        ) : (
                          <>
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Rejected
                          </>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-muted px-2 py-1 rounded max-w-24 truncate">
                          {record.transactionHash.slice(0, 10)}...
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0"
                          onClick={() => copyToClipboard(record.transactionHash)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Platform Trust Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">9.4/10</div>
              <p className="text-xs text-muted-foreground">Based on verification accuracy and timeliness</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Community Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">4.8★</div>
              <p className="text-xs text-muted-foreground">From 47 developer reviews</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Blockchain Attestations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent-foreground">{verifierStats.totalVerifications}</div>
              <p className="text-xs text-muted-foreground">Immutable on-chain records</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
