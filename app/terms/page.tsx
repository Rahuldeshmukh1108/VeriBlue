import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Scale, FileText, AlertTriangle, Shield, Users } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Navigation */}
      <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">Carbon Fiesta</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost">About</Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6">📋 Terms of Service</Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Terms of
            <span className="text-primary block">Service</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            Please read these terms carefully before using Carbon Fiesta. By accessing our platform, you agree to be
            bound by these terms.
          </p>
          <p className="text-sm text-muted-foreground">Last updated: December 15, 2024</p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  1. Acceptance of Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  By accessing and using Carbon Fiesta ("the Platform"), you accept and agree to be bound by the terms
                  and provision of this agreement. If you do not agree to abide by the above, please do not use this
                  service.
                </p>
                <p className="text-muted-foreground">
                  These Terms of Service ("Terms") govern your use of our carbon credit marketplace platform operated by
                  Carbon Fiesta Inc. ("we," "us," or "our").
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-secondary" />
                  2. User Accounts and Eligibility
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Eligibility</h4>
                  <p className="text-muted-foreground mb-4">
                    You must be at least 18 years old and have the legal capacity to enter into contracts to use our
                    platform. Organizations must be legally established entities.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Account Registration</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>You must provide accurate, current, and complete information during registration</li>
                    <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                    <li>You must notify us immediately of any unauthorized use of your account</li>
                    <li>One person or entity may not maintain more than one account</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">User Types</h4>
                  <p className="text-muted-foreground mb-2">
                    Our platform supports four types of users, each with specific responsibilities:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>
                      <strong>Project Developers:</strong> Submit and manage carbon credit projects
                    </li>
                    <li>
                      <strong>Verifiers:</strong> Conduct independent verification of projects
                    </li>
                    <li>
                      <strong>Buyers:</strong> Purchase verified carbon credits
                    </li>
                    <li>
                      <strong>Administrators:</strong> Oversee platform operations and compliance
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-accent-foreground" />
                  3. Platform Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Carbon Credit Marketplace</h4>
                  <p className="text-muted-foreground mb-4">
                    Carbon Fiesta provides a platform for the transparent trading of verified carbon credits. We
                    facilitate connections between project developers, verifiers, and buyers but do not directly issue
                    or guarantee carbon credits.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Verification Services</h4>
                  <p className="text-muted-foreground mb-4">
                    Our platform includes tools for Monitoring, Reporting, and Verification (MRV) of carbon projects,
                    including:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>IoT sensor data collection and analysis</li>
                    <li>Satellite imagery and remote sensing</li>
                    <li>AI-powered impact assessment</li>
                    <li>Blockchain-based transaction recording</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Blockchain Integration</h4>
                  <p className="text-muted-foreground">
                    All carbon credit transactions are recorded on blockchain networks for transparency and
                    immutability. Users are responsible for understanding blockchain technology and associated risks.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  4. User Responsibilities and Prohibited Conduct
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">General Responsibilities</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Provide accurate and truthful information in all submissions</li>
                    <li>Comply with all applicable laws and regulations</li>
                    <li>Respect intellectual property rights</li>
                    <li>Maintain professional conduct in all interactions</li>
                    <li>Report any suspected fraudulent activity</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Prohibited Activities</h4>
                  <p className="text-muted-foreground mb-2">Users may not:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Submit false or misleading project information</li>
                    <li>Manipulate or falsify monitoring data</li>
                    <li>Engage in market manipulation or fraudulent trading</li>
                    <li>Attempt to circumvent verification processes</li>
                    <li>Use the platform for money laundering or illegal activities</li>
                    <li>Interfere with platform security or functionality</li>
                    <li>Create multiple accounts or impersonate others</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-chart-4" />
                  5. Disclaimers and Limitations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Platform Availability</h4>
                  <p className="text-muted-foreground mb-4">
                    While we strive for continuous availability, we do not guarantee uninterrupted access to the
                    platform. We may suspend or modify services for maintenance, updates, or other operational reasons.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Carbon Credit Quality</h4>
                  <p className="text-muted-foreground mb-4">
                    While we implement rigorous verification processes, we do not guarantee the environmental impact or
                    quality of carbon credits traded on our platform. Users should conduct their own due diligence.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Blockchain Risks</h4>
                  <p className="text-muted-foreground mb-4">
                    Blockchain transactions are irreversible. Users are responsible for understanding blockchain
                    technology, including risks related to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Transaction fees and network congestion</li>
                    <li>Smart contract vulnerabilities</li>
                    <li>Private key management and wallet security</li>
                    <li>Regulatory changes affecting blockchain technology</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Fees and Payments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Platform Fees</h4>
                  <p className="text-muted-foreground mb-4">
                    Carbon Fiesta charges fees for various services, including:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Transaction fees for carbon credit trades</li>
                    <li>Verification service fees</li>
                    <li>Premium features and advanced analytics</li>
                    <li>Blockchain transaction costs (gas fees)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Payment Terms</h4>
                  <p className="text-muted-foreground">
                    All fees are due immediately upon transaction completion. We accept various payment methods
                    including cryptocurrency and traditional payment systems. Refunds are subject to our refund policy.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  The Carbon Fiesta platform, including all software, content, trademarks, and intellectual property, is
                  owned by Carbon Fiesta Inc. or our licensors. Users retain ownership of their submitted content but
                  grant us necessary licenses to operate the platform.
                </p>
                <p className="text-muted-foreground">
                  Users may not copy, modify, distribute, or create derivative works of our platform without explicit
                  written permission.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Termination</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground mb-4">
                  Either party may terminate this agreement at any time. We reserve the right to suspend or terminate
                  accounts for violations of these terms, fraudulent activity, or other reasons at our discretion.
                </p>
                <p className="text-muted-foreground">
                  Upon termination, your access to the platform will cease, but blockchain-recorded transactions remain
                  permanent and immutable.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  For questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    <strong>Email:</strong> legal@carbonfiesta.com
                  </p>
                  <p>
                    <strong>Address:</strong> 123 Climate Street, San Francisco, CA 94105
                  </p>
                  <p>
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">Carbon Fiesta</span>
            </div>
            <p className="text-muted-foreground">© 2024 Carbon Fiesta. Building a sustainable future.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
