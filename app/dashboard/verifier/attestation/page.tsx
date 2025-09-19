import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, CheckCircle, XCircle, FileText, Shield, Ligature as Signature, Leaf } from "lucide-react"
import Link from "next/link"

export default function AttestationPage() {
  const projectData = {
    id: "PRJ-001",
    name: "Amazon Reforestation Initiative",
    developer: "EcoTech Solutions",
    credits: 50000,
    verificationDate: "2024-01-15",
    verifier: "Dr. Sarah Johnson",
    verifierID: "VER-2024-001",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/verifier" className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">VeriBlue</span>
            </Link>
            <Badge variant="secondary">Verifier</Badge>
          </div>
          <Link href="/dashboard/verifier/audit">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Audit
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Digital Attestation</h1>
          <p className="text-muted-foreground">Provide your final verification decision and digital signature</p>
        </div>

        {/* Project Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Project Summary</CardTitle>
            <CardDescription>Final verification details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground">Project Name</label>
                  <p className="font-medium">{projectData.name}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Developer</label>
                  <p className="font-medium">{projectData.developer}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Expected Credits</label>
                  <p className="font-medium">{projectData.credits.toLocaleString()}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground">Verification Date</label>
                  <p className="font-medium">{projectData.verificationDate}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Verifier</label>
                  <p className="font-medium">{projectData.verifier}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Verifier ID</label>
                  <p className="font-medium">{projectData.verifierID}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Verification Decision */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                Verification Decision
              </CardTitle>
              <CardDescription>Select your final verification outcome</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="border rounded-lg p-4 hover:bg-primary/5 cursor-pointer transition-colors">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold text-primary">Approve Project</h3>
                      <p className="text-sm text-muted-foreground">
                        Project meets all verification standards and requirements
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 hover:bg-destructive/5 cursor-pointer transition-colors">
                  <div className="flex items-center space-x-3">
                    <XCircle className="h-6 w-6 text-destructive" />
                    <div>
                      <h3 className="font-semibold text-destructive">Reject Project</h3>
                      <p className="text-sm text-muted-foreground">Project does not meet verification standards</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 hover:bg-secondary/5 cursor-pointer transition-colors">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-6 w-6 text-secondary" />
                    <div>
                      <h3 className="font-semibold text-secondary">Request Additional Information</h3>
                      <p className="text-sm text-muted-foreground">More documentation or clarification needed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Verification Comments</label>
                <Textarea
                  placeholder="Provide detailed comments about your verification decision..."
                  className="min-h-32"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Recommended Credits (if approved)</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md bg-background"
                  placeholder="50000"
                  defaultValue={projectData.credits}
                />
                <p className="text-sm text-muted-foreground">Adjust if different from original estimate</p>
              </div>
            </CardContent>
          </Card>

          {/* Digital Signature */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Signature className="h-5 w-5 mr-2 text-secondary" />
                Digital Signature
              </CardTitle>
              <CardDescription>Authenticate your verification decision</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 border-2 border-dashed border-muted-foreground/25 rounded-lg text-center">
                <Signature className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Digital Signature Simulation</h3>
                <p className="text-muted-foreground mb-4">
                  In production, this would integrate with digital signature providers
                </p>
                <Button variant="outline">
                  <Signature className="h-4 w-4 mr-2" />
                  Sign with Certificate
                </Button>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Signature Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Signer:</span>
                    <span>{projectData.verifier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Certificate ID:</span>
                    <span>CERT-VER-2024-001</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timestamp:</span>
                    <span>{new Date().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hash Algorithm:</span>
                    <span>SHA-256</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-accent/10 rounded-lg">
                <h4 className="font-semibold mb-2">Legal Declaration</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  By signing this attestation, I certify that I have conducted a thorough verification of this carbon
                  credit project in accordance with applicable standards and methodologies. This digital signature
                  constitutes my professional opinion and recommendation.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <Button variant="outline">Save as Draft</Button>
          <div className="space-x-4">
            <Button variant="destructive">
              <XCircle className="h-4 w-4 mr-2" />
              Reject Project
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve & Sign
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
