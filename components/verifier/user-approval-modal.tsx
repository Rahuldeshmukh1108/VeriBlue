"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Download,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Shield,
  Globe,
} from "lucide-react"

// TypeScript interfaces for user approval data
interface UserApplicationDetails {
  id: string
  userName: string
  email: string
  phone: string
  role: "developer" | "buyer"
  signupDate: string

  // Account Information
  accountInfo: {
    walletAddress: string
    preferredName: string
    jobTitle: string
    experience: string
  }

  // Organization Information
  organizationInfo: {
    name: string
    type: string
    address: string
    country: string
    website: string
    description: string
    registrationNumber: string
    taxId: string
  }

  // Document uploads
  documents: {
    id: string
    name: string
    type: string
    uploadDate: string
    size: string
    status: "verified" | "pending" | "rejected"
    ipfsHash: string
  }[]

  // Additional role-specific info
  roleSpecific: {
    // For developers
    projectTypes?: string[]
    certifications?: string[]
    previousProjects?: number

    // For buyers
    purchaseVolume?: string
    sustainabilityGoals?: string
    reportingRequirements?: string
  }
}

interface UserApprovalModalProps {
  isOpen: boolean
  onClose: () => void
  applicationId: string | null
}

// Mock detailed application data
const mockApplicationDetails: UserApplicationDetails = {
  id: "1",
  userName: "Marcus Thompson",
  email: "marcus@techcorp.com",
  phone: "+1 (555) 123-4567",
  role: "buyer",
  signupDate: "2024-01-10",

  accountInfo: {
    walletAddress: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    preferredName: "Marcus",
    jobTitle: "Sustainability Director",
    experience: "8 years in corporate sustainability and carbon management",
  },

  organizationInfo: {
    name: "TechCorp Inc.",
    type: "Technology Corporation",
    address: "123 Innovation Drive, San Francisco, CA 94105",
    country: "United States",
    website: "https://techcorp.com",
    description: "Leading technology company focused on sustainable innovation and carbon neutrality by 2030.",
    registrationNumber: "C1234567",
    taxId: "12-3456789",
  },

  documents: [
    {
      id: "1",
      name: "Corporate Registration Certificate",
      type: "Legal Document",
      uploadDate: "2024-01-10",
      size: "2.4 MB",
      status: "verified",
      ipfsHash: "QmX7Y8Z9...",
    },
    {
      id: "2",
      name: "Tax Identification Document",
      type: "Tax Document",
      uploadDate: "2024-01-10",
      size: "1.8 MB",
      status: "verified",
      ipfsHash: "QmA1B2C3...",
    },
    {
      id: "3",
      name: "Sustainability Policy Document",
      type: "Policy Document",
      uploadDate: "2024-01-10",
      size: "3.2 MB",
      status: "pending",
      ipfsHash: "QmD4E5F6...",
    },
    {
      id: "4",
      name: "Board Resolution for Carbon Credits",
      type: "Legal Document",
      uploadDate: "2024-01-10",
      size: "1.5 MB",
      status: "verified",
      ipfsHash: "QmG7H8I9...",
    },
  ],

  roleSpecific: {
    purchaseVolume: "10,000 - 50,000 credits annually",
    sustainabilityGoals: "Achieve carbon neutrality by 2030, reduce scope 1&2 emissions by 50%",
    reportingRequirements: "Annual sustainability report, quarterly board updates",
  },
}

export function UserApprovalModal({ isOpen, onClose, applicationId }: UserApprovalModalProps) {
  const [rejectionReason, setRejectionReason] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  // In a real app, fetch application details based on applicationId
  const application = mockApplicationDetails

  const handleApprove = async () => {
    setIsProcessing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    onClose()
    // Show success toast
  }

  const handleReject = async () => {
    if (!rejectionReason.trim()) return

    setIsProcessing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    onClose()
    // Show rejection toast
  }

  if (!applicationId) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            User Application Review
          </DialogTitle>
          <DialogDescription>
            Review all application details and supporting documents before making a decision
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6">
            {/* User Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-secondary" />
                  Applicant Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg">
                      {application.userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold">{application.userName}</h3>
                      <Badge variant={application.role === "developer" ? "default" : "secondary"}>
                        {application.role === "developer" ? "Project Developer" : "Corporate Buyer"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {application.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {application.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Applied: {new Date(application.signupDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        {application.accountInfo.jobTitle}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Wallet Address</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {application.accountInfo.walletAddress}
                      </code>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Preferred Name</Label>
                    <p className="text-sm mt-1">{application.accountInfo.preferredName}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Professional Experience</Label>
                  <p className="text-sm mt-1 text-muted-foreground">{application.accountInfo.experience}</p>
                </div>
              </CardContent>
            </Card>

            {/* Organization Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-accent-foreground" />
                  Organization Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Organization Name</Label>
                    <p className="text-sm mt-1 font-medium">{application.organizationInfo.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Organization Type</Label>
                    <p className="text-sm mt-1">{application.organizationInfo.type}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Registration Number</Label>
                    <p className="text-sm mt-1">{application.organizationInfo.registrationNumber}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Tax ID</Label>
                    <p className="text-sm mt-1">{application.organizationInfo.taxId}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Address</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{application.organizationInfo.address}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Website</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={application.organizationInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {application.organizationInfo.website}
                    </a>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Organization Description</Label>
                  <p className="text-sm mt-1 text-muted-foreground">{application.organizationInfo.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Role-Specific Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="secondary" className="h-5 px-2">
                    {application.role === "developer" ? "Developer" : "Buyer"}
                  </Badge>
                  Role-Specific Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {application.role === "buyer" && application.roleSpecific && (
                  <>
                    <div>
                      <Label className="text-sm font-medium">Expected Purchase Volume</Label>
                      <p className="text-sm mt-1">{application.roleSpecific.purchaseVolume}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Sustainability Goals</Label>
                      <p className="text-sm mt-1 text-muted-foreground">
                        {application.roleSpecific.sustainabilityGoals}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Reporting Requirements</Label>
                      <p className="text-sm mt-1 text-muted-foreground">
                        {application.roleSpecific.reportingRequirements}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Document Uploads */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-chart-4" />
                  Mandatory Document Uploads
                </CardTitle>
                <CardDescription>All required documents must be verified before approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {application.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {doc.type} • {doc.size} • Uploaded {new Date(doc.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            doc.status === "verified"
                              ? "default"
                              : doc.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {doc.status === "verified" && <CheckCircle className="h-3 w-3 mr-1" />}
                          {doc.status === "pending" && <AlertTriangle className="h-3 w-3 mr-1" />}
                          {doc.status === "rejected" && <XCircle className="h-3 w-3 mr-1" />}
                          {doc.status}
                        </Badge>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rejection Reason (if rejecting) */}
            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <XCircle className="h-5 w-5" />
                  Rejection Reason
                </CardTitle>
                <CardDescription>If rejecting this application, please provide a detailed reason</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Explain why this application is being rejected..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="min-h-20"
                />
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        <Separator />

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleReject} disabled={isProcessing || !rejectionReason.trim()}>
            {isProcessing ? (
              <>Processing...</>
            ) : (
              <>
                <XCircle className="h-4 w-4 mr-2" />
                Reject Account
              </>
            )}
          </Button>
          <Button onClick={handleApprove} disabled={isProcessing}>
            {isProcessing ? (
              <>Processing...</>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Account
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
