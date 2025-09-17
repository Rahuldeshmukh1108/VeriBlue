import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Globe, Shield, TrendingUp, Users, Leaf, Zap, Target } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
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
          <Badge className="mb-6">🌍 Climate Tech Platform</Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Transparent Carbon
            <span className="text-primary block">Credit Marketplace</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Connect developers, verifiers, and buyers in a transparent ecosystem for verified carbon credits with
            real-time impact tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8">
                Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              <Globe className="mr-2 h-5 w-5" />
              Explore Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Carbon Market Challenge</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Traditional carbon markets lack transparency, verification is slow, and impact tracking is fragmented.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-destructive">Lack of Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Buyers can't verify the authenticity and impact of carbon credits, leading to greenwashing concerns.
                </p>
              </CardContent>
            </Card>
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-destructive">Slow Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Manual verification processes take months, delaying project funding and impact delivery.
                </p>
              </CardContent>
            </Card>
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-destructive">Fragmented Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No unified system to track real-world impact, making it difficult to measure actual carbon reduction.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Solution</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A transparent, blockchain-powered platform that connects all stakeholders in the carbon credit ecosystem.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>For Developers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Submit projects, track MRV data, and get verified credits faster with our streamlined process.
                </p>
              </CardContent>
            </Card>
            <Card className="border-secondary/20 bg-secondary/5 hover:bg-secondary/10 transition-colors">
              <CardHeader>
                <Shield className="h-12 w-12 text-secondary mb-4" />
                <CardTitle>For Verifiers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access advanced tools for satellite imagery analysis, audit trails, and digital attestations.
                </p>
              </CardContent>
            </Card>
            <Card className="border-accent/20 bg-accent/5 hover:bg-accent/10 transition-colors">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-accent-foreground mb-4" />
                <CardTitle>For Buyers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Browse verified projects, track real-world impact, and build your sustainability portfolio.
                </p>
              </CardContent>
            </Card>
            <Card className="border-chart-4/20 bg-chart-4/5 hover:bg-chart-4/10 transition-colors">
              <CardHeader>
                <Target className="h-12 w-12 text-chart-4 mb-4" />
                <CardTitle>For Admins</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Oversee platform operations, manage verifiers, and ensure ecosystem integrity.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Dashboard Preview */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Real-Time Impact Tracking</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              See the actual environmental impact of your carbon credit investments with live data and satellite
              verification.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total CO₂ Offset</CardDescription>
                <CardTitle className="text-3xl text-primary">2.4M</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">tonnes this year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Active Projects</CardDescription>
                <CardTitle className="text-3xl text-secondary">847</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">across 45 countries</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Verified Credits</CardDescription>
                <CardTitle className="text-3xl text-accent-foreground">1.8M</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">ready for purchase</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Impact Equivalent</CardDescription>
                <CardTitle className="text-3xl text-chart-4">520K</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">cars off the road</p>
              </CardContent>
            </Card>
          </div>
          <div className="bg-card rounded-lg p-8 border">
            <div className="flex items-center justify-center h-64 bg-muted/50 rounded-lg">
              <div className="text-center">
                <Globe className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-lg font-semibold">Interactive 3D Globe</p>
                <p className="text-muted-foreground">Real-time project locations and impact visualization</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make an Impact?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of developers, verifiers, and buyers creating a transparent carbon credit ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8">
                <Zap className="mr-2 h-5 w-5" />
                Start Building Impact
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              Learn More
            </Button>
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
