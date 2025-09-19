"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MobileNav } from "./mobile-nav"
import { Leaf } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface DashboardNavProps {
  userType: "developer" | "buyer" | "verifier"
}

export function DashboardNav({ userType }: DashboardNavProps) {
  const pathname = usePathname()

  const getNavItems = () => {
    switch (userType) {
      case "developer":
        return [
          { href: "/dashboard/developer", label: "Dashboard" },
          { href: "/dashboard/developer/projects", label: "Projects" },
          { href: "/dashboard/developer/new-project", label: "New Project" },
          { href: "/dashboard/developer/wallet", label: "Wallet" },
          { href: "/dashboard/developer/notifications", label: "Notifications" },
        ]
      case "buyer":
        return [
          { href: "/dashboard/buyer", label: "Dashboard" },
          { href: "/dashboard/buyer/marketplace", label: "Marketplace" },
          { href: "/dashboard/buyer/portfolio", label: "Portfolio" },
          { href: "/dashboard/buyer/rewards", label: "Rewards" },
          { href: "/dashboard/buyer/wallet", label: "Wallet" },
        ]
      case "verifier":
        return [
          { href: "/dashboard/verifier", label: "Dashboard" },
          { href: "/dashboard/verifier/projects", label: "Projects to Verify" },
          { href: "/dashboard/verifier/completed", label: "Completed" },
          { href: "/dashboard/verifier/tools", label: "Verification Tools" },
        ]
      default:
        return []
    }
  }

  const navItems = getNavItems()

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">VeriBlue</span>
          </Link>
          <Badge variant="secondary">{userType.charAt(0).toUpperCase() + userType.slice(1)}</Badge>
        </div>

        <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors px-3 py-2 rounded-md",
                "hover:text-foreground focus:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                pathname === item.href ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-muted",
              )}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Profile
            </Button>
            <Button variant="ghost" size="sm">
              Settings
            </Button>
            <Button variant="outline" size="sm">
              Logout
            </Button>
          </div>
          <MobileNav userType={userType} />
        </div>
      </div>
    </header>
  )
}
