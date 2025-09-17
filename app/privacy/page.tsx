import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Shield, Eye, Lock, Database, Users } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
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
          <Badge className="mb-6">🔒 Privacy Policy</Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Your Privacy
            <span className="text-primary block">Matters</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            We're committed to protecting your personal information and being transparent about how we collect, use, and
            share your data.
          </p>
          <p className="text-sm text-muted-foreground">Last updated: December 15, 2024</p>
        </div>
      </section>

      {/* Privacy Overview */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Data Protection</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  We use industry-standard encryption and security measures to protect your data.
                </p>
              </CardContent>
            </Card>
            <Card className="border-secondary/20 bg-secondary/5">
              <CardHeader className="text-center">
                <Eye className="h-12 w-12 text-secondary mx-auto mb-4" />
                <CardTitle>Transparency</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">Clear information about what data we collect and how we use it.</p>
              </CardContent>
            </Card>
            <Card className="border-accent/20 bg-accent/5">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-accent-foreground mx-auto mb-4" />
                <CardTitle>Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  You have control over your personal data and can request changes anytime.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Privacy Policy Content */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Personal Information</h4>
                  <p className="text-muted-foreground mb-4">
                    When you create an account or use our services, we may collect:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Name, email address, and contact information</li>
                    <li>Company or organization details</li>
                    <li>Professional credentials and certifications</li>
                    <li>Payment and billing information</li>
                    <li>Profile information and preferences</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Project Data</h4>
                  <p className="text-muted-foreground mb-4">For carbon credit projects, we collect:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Project documentation and reports</li>
                    <li>Monitoring, Reporting, and Verification (MRV) data</li>
                    <li>IoT sensor data and satellite imagery</li>
                    <li>Verification records and attestations</li>
                    <li>Transaction history and credit ownership</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Technical Information</h4>
                  <p className="text-muted-foreground mb-4">We automatically collect certain technical information:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>IP address and device information</li>
                    <li>Browser type and version</li>
                    <li>Usage patterns and analytics data</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-secondary" />
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">We use the information we collect for the following purposes:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>
                    <strong>Platform Operations:</strong> To provide, maintain, and improve our carbon credit
                    marketplace
                  </li>
                  <li>
                    <strong>Verification:</strong> To verify project data, conduct due diligence, and ensure credit
                    quality
                  </li>
                  <li>
                    <strong>Communication:</strong> To send important updates, notifications, and support messages
                  </li>
                  <li>
                    <strong>Compliance:</strong> To meet legal and regulatory requirements
                  </li>
                  <li>
                    <strong>Analytics:</strong> To understand usage patterns and improve user experience
                  </li>
                  <li>
                    <strong>Security:</strong> To protect against fraud, abuse, and security threats
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent-foreground" />
                  Information Sharing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground mb-4">
                  We may share your information in the following circumstances:
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Public Blockchain Data</h4>
                    <p className="text-muted-foreground">
                      Carbon credit transactions and project data are recorded on public blockchains for transparency
                      and verification purposes.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Verification Partners</h4>
                    <p className="text-muted-foreground">
                      We share project data with certified verifiers and auditors as part of the verification process.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Service Providers</h4>
                    <p className="text-muted-foreground">
                      We work with trusted third-party service providers for hosting, analytics, payment processing, and
                      other business functions.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Legal Requirements</h4>
                    <p className="text-muted-foreground">
                      We may disclose information when required by law, regulation, or legal process.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-chart-4" />
                  Data Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground mb-4">
                  We implement comprehensive security measures to protect your information:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>End-to-end encryption for sensitive data transmission</li>
                  <li>Secure data storage with regular backups</li>
                  <li>Multi-factor authentication and access controls</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Employee training on data protection best practices</li>
                  <li>Incident response procedures for security breaches</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Rights and Choices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                  <li>
                    <strong>Access:</strong> Request a copy of the personal information we hold about you
                  </li>
                  <li>
                    <strong>Correction:</strong> Request correction of inaccurate or incomplete information
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request deletion of your personal information (subject to legal
                    requirements)
                  </li>
                  <li>
                    <strong>Portability:</strong> Request transfer of your data to another service provider
                  </li>
                  <li>
                    <strong>Opt-out:</strong> Unsubscribe from marketing communications
                  </li>
                  <li>
                    <strong>Restrict Processing:</strong> Request limitation of how we process your data
                  </li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  To exercise these rights, please contact us at privacy@carbonfiesta.com.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you have questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    <strong>Email:</strong> privacy@carbonfiesta.com
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
