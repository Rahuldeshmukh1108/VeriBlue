import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, HelpCircle, Book, MessageCircle, Video, FileText, Leaf } from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Navigation */}
      <nav className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">VeriBlue</span>
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
          <Badge className="mb-6">❓ Help Center</Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            How Can We
            <span className="text-primary block">Help You?</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
            Find answers to common questions, learn how to use VeriBlue, and get the support you need to succeed.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input placeholder="Search for help articles, guides, and FAQs..." className="pl-12 h-14 text-lg" />
          </div>
        </div>
      </section>

      {/* Quick Help Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <Book className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Learn the basics of using VeriBlue and setting up your account.
                </p>
              </CardContent>
            </Card>
            <Card className="border-secondary/20 bg-secondary/5 hover:bg-secondary/10 transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <FileText className="h-12 w-12 text-secondary mx-auto mb-4" />
                <CardTitle>Project Management</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">How to create, submit, and manage your carbon credit projects.</p>
              </CardContent>
            </Card>
            <Card className="border-accent/20 bg-accent/5 hover:bg-accent/10 transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <Video className="h-12 w-12 text-accent-foreground mx-auto mb-4" />
                <CardTitle>Verification Process</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Understanding MRV, verification workflows, and quality standards.
                </p>
              </CardContent>
            </Card>
            <Card className="border-chart-4/20 bg-chart-4/5 hover:bg-chart-4/10 transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <MessageCircle className="h-12 w-12 text-chart-4 mx-auto mb-4" />
                <CardTitle>Marketplace</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">How to buy, sell, and trade carbon credits on our platform.</p>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1">
                <Card>
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-primary" />
                      <span className="text-left font-semibold">What is VeriBlue and how does it work?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-muted-foreground">
                      VeriBlue is a transparent carbon credit marketplace that connects project developers,
                      verifiers, and buyers. We use blockchain technology, IoT sensors, and AI to ensure the
                      authenticity and impact of carbon credits. Project developers submit their projects, verifiers
                      conduct independent assessments, and buyers can purchase verified credits with full transparency
                      into their environmental impact.
                    </p>
                  </AccordionContent>
                </Card>
              </AccordionItem>

              <AccordionItem value="item-2">
                <Card>
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-secondary" />
                      <span className="text-left font-semibold">How do I get started as a project developer?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-muted-foreground">
                      To get started as a project developer: 1) Sign up and select "Project Developer" as your role, 2)
                      Complete your profile with relevant credentials and experience, 3) Submit your first project with
                      detailed documentation, monitoring plans, and baseline data, 4) Set up IoT sensors or monitoring
                      systems for real-time data collection, 5) Work with our verification partners to validate your
                      project's impact.
                    </p>
                  </AccordionContent>
                </Card>
              </AccordionItem>

              <AccordionItem value="item-3">
                <Card>
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-accent-foreground" />
                      <span className="text-left font-semibold">What types of carbon projects are supported?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-muted-foreground">
                      We support a wide range of carbon project types including: Renewable Energy (solar, wind, hydro),
                      Forestry and Land Use (reforestation, avoided deforestation, sustainable agriculture), Waste
                      Management (methane capture, waste-to-energy), Industrial Efficiency (energy efficiency, fuel
                      switching), and Nature-based Solutions (wetland restoration, soil carbon sequestration). All
                      projects must meet international standards like VCS, Gold Standard, or equivalent.
                    </p>
                  </AccordionContent>
                </Card>
              </AccordionItem>

              <AccordionItem value="item-4">
                <Card>
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-chart-4" />
                      <span className="text-left font-semibold">How does the verification process work?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-muted-foreground">
                      Our verification process involves: 1) Initial project review and documentation assessment, 2)
                      Assignment of certified third-party verifiers, 3) On-site or remote verification using satellite
                      imagery and IoT data, 4) Verification report generation with detailed findings, 5) AI-powered
                      impact assessment and credit calculation, 6) Blockchain recording of verified credits. The entire
                      process typically takes 2-4 weeks, much faster than traditional methods.
                    </p>
                  </AccordionContent>
                </Card>
              </AccordionItem>

              <AccordionItem value="item-5">
                <Card>
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-chart-5" />
                      <span className="text-left font-semibold">How do I buy carbon credits on the marketplace?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-muted-foreground">
                      To buy carbon credits: 1) Sign up as a "Buyer" and complete your profile, 2) Browse the
                      marketplace to find projects that align with your sustainability goals, 3) Review project details,
                      verification reports, and real-time impact data, 4) Select the quantity of credits you want to
                      purchase, 5) Complete payment through our secure checkout process, 6) Receive your credits in your
                      digital wallet with blockchain certificates of ownership.
                    </p>
                  </AccordionContent>
                </Card>
              </AccordionItem>

              <AccordionItem value="item-6">
                <Card>
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 text-destructive" />
                      <span className="text-left font-semibold">What fees does VeriBlue charge?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-muted-foreground">
                      Our fee structure includes: Transaction fees (2-5% of credit value), Verification service fees
                      (varies by project complexity), Premium features for advanced analytics and reporting, and
                      Blockchain transaction costs (gas fees). We believe in transparent pricing with no hidden fees.
                      Detailed fee schedules are available in your account dashboard.
                    </p>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Still Need Help?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="text-lg px-8">
                <MessageCircle className="mr-2 h-5 w-5" />
                Contact Support
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              <Video className="mr-2 h-5 w-5" />
              Schedule a Demo
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
              <span className="text-lg font-semibold">VeriBlue</span>
            </div>
            <p className="text-muted-foreground">© 2024 VeriBlue. Building a sustainable future.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
