import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, CreditCard, ArrowRight } from "lucide-react"
import Link from "next/link"

interface EmptyWalletProps {
  userType: "developer" | "buyer"
}

export function EmptyWallet({ userType }: EmptyWalletProps) {
  const getContent = () => {
    if (userType === "developer") {
      return {
        title: "No credits earned yet",
        description:
          "Start creating and verifying carbon credit projects to earn your first credits and build your portfolio.",
        actionText: "Create Project",
        actionHref: "/dashboard/developer/new-project",
        secondaryText: "Learn More",
        secondaryHref: "/docs/getting-started",
      }
    } else {
      return {
        title: "No credits purchased yet",
        description:
          "Browse verified carbon credit projects and start building your sustainability portfolio with real environmental impact.",
        actionText: "Browse Marketplace",
        actionHref: "/dashboard/buyer/marketplace",
        secondaryText: "How It Works",
        secondaryHref: "/docs/buying-credits",
      }
    }
  }

  const content = getContent()

  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <Wallet className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{content.title}</h3>
        <p className="text-muted-foreground mb-6 max-w-md text-balance">{content.description}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href={content.actionHref}>
            <Button>
              <CreditCard className="h-4 w-4 mr-2" />
              {content.actionText}
            </Button>
          </Link>
          <Link href={content.secondaryHref}>
            <Button variant="outline">
              {content.secondaryText}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
