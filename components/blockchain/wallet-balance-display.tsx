"use client"

import { useBlockchain } from "@/hooks/use-blockchain"
import { Card, CardContent } from "@/components/ui/card"
import { Coins, Leaf } from "lucide-react"

export function WalletBalanceDisplay() {
  const { isConnected, balance, carbonBalance } = useBlockchain()

  if (!isConnected) {
    return null
  }

  return (
    <div className="flex items-center gap-3">
      <Card className="px-3 py-2">
        <CardContent className="p-0 flex items-center gap-2">
          <Coins className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium">{Number.parseFloat(balance).toFixed(4)} ETH</span>
        </CardContent>
      </Card>
      <Card className="px-3 py-2">
        <CardContent className="p-0 flex items-center gap-2">
          <Leaf className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-medium">{carbonBalance} Credits</span>
        </CardContent>
      </Card>
    </div>
  )
}
