"use client"

import { useEffect } from "react"
import { useBlockchainStore } from "@/lib/blockchain/store"
import { toast } from "sonner"

export function TransactionMonitor() {
  const { pendingTransactions, completePendingTransaction } = useBlockchainStore()

  useEffect(() => {
    const checkTransactionStatus = async () => {
      // In a real implementation, this would poll the blockchain or use event listeners
      // For now, we'll simulate transaction completion after a delay
      pendingTransactions.forEach((txHash) => {
        setTimeout(
          () => {
            // Simulate random transaction completion
            if (Math.random() > 0.7) {
              completePendingTransaction(txHash)
              toast.success(`Transaction confirmed: ${txHash.slice(0, 10)}...`)
            }
          },
          Math.random() * 10000 + 5000,
        ) // Random delay between 5-15 seconds
      })
    }

    if (pendingTransactions.length > 0) {
      checkTransactionStatus()
    }
  }, [pendingTransactions, completePendingTransaction])

  return null // This component doesn't render anything
}
