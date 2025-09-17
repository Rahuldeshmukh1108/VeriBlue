"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Menu, Leaf } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface MobileNavProps {
  userType?: "developer" | "buyer" | "verifier"
}

export function MobileNav({ userType }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const getNavItems = () => {
    const baseItems = [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/how-it-works", label: "How It Works" },
    ]

    if (!userType) return baseItems

    const dashboardItems = {
      developer: [
        { href: "/dashboard/developer", label: "Dashboard" },
        { href: "/dashboard/developer/projects", label: "Projects" },
        { href: "/dashboard/developer/new-project", label: "New Project" },
        { href: "/dashboard/developer/wallet", label: "Wallet" },
        { href: "/dashboard/developer/notifications", label: "Notifications" },
      ],
      buyer: [
        { href: "/dashboard/buyer", label: "Dashboard" },
        { href: "/dashboard/buyer/marketplace", label: "Marketplace" },
        { href: "/dashboard/buyer/portfolio", label: "Portfolio" },
        { href: "/dashboard/buyer/rewards", label: "Rewards" },
        { href: "/dashboard/buyer/wallet", label: "Wallet" },
      ],
      verifier: [
        { href: "/dashboard/verifier", label: "Dashboard" },
        { href: "/dashboard/verifier/projects", label: "Projects to Verify" },
        { href: "/dashboard/verifier/completed", label: "Completed" },
        { href: "/dashboard/verifier/tools", label: "Verification Tools" },
      ],
    }

    return dashboardItems[userType] || baseItems
  }

  const navItems = getNavItems()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden" aria-label="Open navigation menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2 text-left">
            <Leaf className="h-6 w-6 text-primary" />
            <span>Carbon Fiesta</span>
            {userType && (
              <Badge variant="secondary" className="ml-2">
                {userType.charAt(0).toUpperCase() + userType.slice(1)}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <nav className="mt-8" role="navigation" aria-label="Mobile navigation">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    "hover:bg-muted focus:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {!userType && (
          <div className="mt-8 pt-8 border-t space-y-3">
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Login
              </Button>
            </Link>
            <Link href="/signup" onClick={() => setIsOpen(false)}>
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>
        )}

        {userType && (
          <div className="mt-8 pt-8 border-t space-y-3">
            <Button variant="ghost" className="w-full justify-start">
              Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Settings
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Logout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
