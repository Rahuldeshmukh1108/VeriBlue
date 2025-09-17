import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Globe, Shield, Users, Leaf, Target, Award, Heart, Lightbulb } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
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
          <Badge className="mb-6">🌍 Our Mission</Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Building a<span className="text-primary block">Transparent Future</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            Carbon Fiesta is revolutionizing the carbon credit marketplace by bringing transparency, verification, and
            real-time impact tracking to climate action initiatives worldwide.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Founded in 2024, Carbon Fiesta emerged from a simple observation: the carbon credit market lacked
                transparency and trust. Traditional systems were slow, opaque, and difficult to verify.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                We set out to change that by building a platform that connects project developers, verifiers, and buyers
                in a transparent ecosystem powered by blockchain technology and real-time monitoring.
              </p>
              <p className="text-lg text-muted-foreground">
                Today, we're proud to facilitate millions of tonnes of verified carbon offsets, supporting climate
                projects across 45+ countries.
              </p>
            </div>
            <div className="bg-card rounded-lg p-8 border">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">2.4M</div>
                  <div className="text-sm text-muted-foreground">Tonnes CO₂ Offset</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">847</div>
                  <div className="text-sm text-muted-foreground">Active Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-foreground mb-2">45+</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-chart-4 mb-2">1.8M</div>
                  <div className="text-sm text-muted-foreground">Verified Credits</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do at Carbon Fiesta.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every transaction, verification, and impact measurement is visible and auditable on the blockchain.
                </p>
              </CardContent>
            </Card>
            <Card className="border-secondary/20 bg-secondary/5">
              <CardHeader>
                <Award className="h-12 w-12 text-secondary mb-4" />
                <CardTitle>Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Rigorous verification processes ensure only high-quality, additional carbon credits enter our
                  marketplace.
                </p>
              </CardContent>
            </Card>
            <Card className="border-accent/20 bg-accent/5">
              <CardHeader>
                <Lightbulb className="h-12 w-12 text-accent-foreground mb-4" />
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We leverage cutting-edge technology including IoT sensors, AI, and satellite imagery for accurate
                  monitoring.
                </p>
              </CardContent>
            </Card>
            <Card className="border-chart-4/20 bg-chart-4/5">
              <CardHeader>
                <Globe className="h-12 w-12 text-chart-4 mb-4" />
                <CardTitle>Global Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Supporting climate projects worldwide to create meaningful environmental and social impact.
                </p>
              </CardContent>
            </Card>
            <Card className="border-chart-5/20 bg-chart-5/5">
              <CardHeader>
                <Users className="h-12 w-12 text-chart-5 mb-4" />
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Building a collaborative ecosystem where developers, verifiers, and buyers work together.
                </p>
              </CardContent>
            </Card>
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <Heart className="h-12 w-12 text-destructive mb-4" />
                <CardTitle>Integrity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Maintaining the highest ethical standards in all our operations and partnerships.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Meet the passionate individuals working to make carbon markets more transparent and effective.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <CardTitle>Sarah Chen</CardTitle>
                <CardDescription>CEO & Co-Founder</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Former climate policy advisor with 10+ years in carbon markets and sustainable finance.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-secondary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Target className="h-12 w-12 text-secondary" />
                </div>
                <CardTitle>Marcus Rodriguez</CardTitle>
                <CardDescription>CTO & Co-Founder</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Blockchain architect and former lead engineer at major fintech companies.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-accent/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Leaf className="h-12 w-12 text-accent-foreground" />
                </div>
                <CardTitle>Dr. Amara Okafor</CardTitle>
                <CardDescription>Head of Verification</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Environmental scientist specializing in carbon measurement and verification methodologies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you're a project developer, verifier, or looking to offset your carbon footprint, there's a place
            for you in our ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8">
                Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                Contact Us
              </Button>
            </Link>
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
