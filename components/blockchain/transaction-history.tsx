"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useBlockchainStore } from "@/lib/blockchain/store"
import { CheckCircle, Clock, ExternalLink, Copy } from "lucide-react"
import { toast } from "sonner"

export function TransactionHistory() {
  const { pendingTransactions, completedTransactions } = useBlockchainStore()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Transaction hash copied to clipboard")
  }

  const openEtherscan = (txHash: string) => {
    // In production, this would use the correct network explorer
    window.open(`https://etherscan.io/tx/${txHash}`, "_blank")
  }

  const allTransactions = [
    ...pendingTransactions.map((tx) => ({ hash: tx, status: "pending" as const })),
    ...completedTransactions.slice(-10).map((tx) => ({ hash: tx, status: "completed" as const })),
  ]

  if (allTransactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Your recent blockchain transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No transactions yet</p>
            <p className="text-sm">Your blockchain transactions will appear here</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>Your recent blockchain transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {allTransactions.map((tx) => (
            <div key={tx.hash} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {tx.status === "pending" ? (
                  <Clock className="h-4 w-4 text-yellow-500 animate-pulse" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
                <div>
                  <p className="font-mono text-sm">
                    {tx.hash.slice(0, 10)}...{tx.hash.slice(-8)}
                  </p>
                  <Badge variant={tx.status === "pending" ? "secondary" : "default"} className="text-xs">
                    {tx.status === "pending" ? "Pending" : "Confirmed"}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(tx.hash)}>
                  <Copy className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => openEtherscan(tx.hash)}>
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
