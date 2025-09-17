"use client"

import { useEffect } from "react"
import { useBlockchainStore } from "@/lib/blockchain/store"
import { toast } from "sonner"
import { CheckCircle, Loader2 } from "lucide-react"

export function TransactionToast() {
  const { pendingTransactions, completedTransactions } = useBlockchainStore()

  useEffect(() => {
    // Show toast for new pending transactions
    pendingTransactions.forEach((tx) => {
      toast.loading(`Transaction pending: ${tx.slice(0, 10)}...`, {
        id: tx,
        icon: <Loader2 className="w-4 h-4 animate-spin" />,
        duration: Number.POSITIVE_INFINITY,
      })
    })
  }, [pendingTransactions])

  useEffect(() => {
    // Update toast for completed transactions
    completedTransactions.forEach((tx) => {
      toast.success(`Transaction confirmed: ${tx.slice(0, 10)}...`, {
        id: tx,
        icon: <CheckCircle className="w-4 h-4" />,
        duration: 5000,
      })
    })
  }, [completedTransactions])

  return null
}
