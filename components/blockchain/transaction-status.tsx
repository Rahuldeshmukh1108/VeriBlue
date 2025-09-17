"use client"

import { useBlockchain } from "@/hooks/use-blockchain"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function TransactionStatus() {
  const { pendingTransactions } = useBlockchain()

  if (pendingTransactions.length === 0) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Loader2 className="w-4 h-4 animate-spin" />
          <Badge
            variant="secondary"
            className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
          >
            {pendingTransactions.length}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="p-2">
          <h4 className="font-medium text-sm mb-2">Pending Transactions</h4>
          {pendingTransactions.map((tx) => (
            <DropdownMenuItem key={tx} className="flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span className="font-mono text-xs">
                {tx.slice(0, 10)}...{tx.slice(-8)}
              </span>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
