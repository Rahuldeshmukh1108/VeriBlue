import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, User, Settings, LogOut, Bell } from "lucide-react"
import Link from "next/link"
import { WalletConnectButton } from "@/components/blockchain/wallet-connect-button"
import { WalletBalanceDisplay } from "@/components/blockchain/wallet-balance-display"
import { TransactionStatus } from "@/components/blockchain/transaction-status"

interface DashboardLayoutProps {
  children: ReactNode
  userRole: "developer" | "verifier" | "buyer" | "admin"
  userName?: string
}

export default function DashboardLayout({ children, userRole, userName = "User" }: DashboardLayoutProps) {
  const getRoleColor = (role: string) => {
    switch (role) {
      case "developer":
        return "bg-emerald-600"
      case "verifier":
        return "bg-blue-600"
      case "buyer":
        return "bg-purple-600"
      case "admin":
        return "bg-slate-600"
      default:
        return "bg-gray-600"
    }
  }

  const getRoleLabel = (role: string) => {
    return role.charAt(0).toUpperCase() + role.slice(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo and Navigation */}
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CF</span>
                </div>
                <span className="font-bold text-xl text-gray-900">Carbon Fiesta</span>
              </Link>

              <nav className="hidden md:flex items-center gap-6">
                <Link
                  href={`/dashboard/${userRole}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <Home className="w-4 h-4" />
                  Dashboard
                </Link>
                {userRole === "buyer" && (
                  <Link href="/dashboard/buyer/marketplace" className="text-gray-600 hover:text-gray-900">
                    Marketplace
                  </Link>
                )}
                {userRole === "developer" && (
                  <Link href="/dashboard/developer/projects" className="text-gray-600 hover:text-gray-900">
                    Projects
                  </Link>
                )}
                {userRole === "admin" && (
                  <Link href="/dashboard/admin/verifiers" className="text-gray-600 hover:text-gray-900">
                    Verifiers
                  </Link>
                )}
              </nav>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <WalletBalanceDisplay />

              <TransactionStatus />

              <WalletConnectButton />

              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-3 px-3 py-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/diverse-user-avatars.png" />
                      <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-left hidden md:block">
                      <p className="text-sm font-medium">{userName}</p>
                      <p className={`text-xs px-2 py-1 rounded-full text-white ${getRoleColor(userRole)}`}>
                        {getRoleLabel(userRole)}
                      </p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/${userRole}/profile`}>
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/${userRole}/settings`}>
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  )
}
