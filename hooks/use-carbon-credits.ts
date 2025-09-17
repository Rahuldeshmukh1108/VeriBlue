"use client"

import { useWriteContract, useReadContract, useWaitForTransactionReceipt } from "wagmi"
import { useBlockchainStore } from "@/lib/blockchain/store"
import { CONTRACTS, CARBON_CREDITS_ABI } from "@/lib/blockchain/config"
import { toast } from "sonner"
import { parseEther, formatEther } from "viem"

export function useCarbonCredits() {
  const { addPendingTransaction, completePendingTransaction, setCarbonBalance } = useBlockchainStore()

  const { writeContract, data: hash, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  // Read carbon balance
  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: CONTRACTS.CARBON_CREDITS,
    abi: CARBON_CREDITS_ABI,
    functionName: "balanceOf",
    args: ["0x0000000000000000000000000000000000000000"], // Will be replaced with actual address
  })

  const mintCredits = async (amount: string, projectId: string) => {
    try {
      toast.info("Initiating credit minting...")

      const result = await writeContract({
        address: CONTRACTS.CARBON_CREDITS,
        abi: CARBON_CREDITS_ABI,
        functionName: "mint",
        args: ["0x0000000000000000000000000000000000000000", parseEther(amount), projectId],
      })

      if (result) {
        addPendingTransaction(result)
        toast.success("Minting transaction submitted!")
      }
    } catch (error) {
      console.error("Minting failed:", error)
      toast.error("Failed to mint credits")
    }
  }

  const leaseCredits = async (to: string, amount: string) => {
    try {
      toast.info("Initiating credit lease...")

      const result = await writeContract({
        address: CONTRACTS.CARBON_CREDITS,
        abi: CARBON_CREDITS_ABI,
        functionName: "lease",
        args: ["0x0000000000000000000000000000000000000000", to, parseEther(amount)],
      })

      if (result) {
        addPendingTransaction(result)
        toast.success("Lease transaction submitted!")
      }
    } catch (error) {
      console.error("Leasing failed:", error)
      toast.error("Failed to lease credits")
    }
  }

  const burnCredits = async (amount: string) => {
    try {
      toast.info("Initiating credit burn...")

      const result = await writeContract({
        address: CONTRACTS.CARBON_CREDITS,
        abi: CARBON_CREDITS_ABI,
        functionName: "burn",
        args: [parseEther(amount)],
      })

      if (result) {
        addPendingTransaction(result)
        toast.success("Burn transaction submitted!")
      }
    } catch (error) {
      console.error("Burning failed:", error)
      toast.error("Failed to burn credits")
    }
  }

  // Handle transaction confirmation
  if (isConfirmed && hash) {
    completePendingTransaction(hash)
    refetchBalance()
    toast.success("Transaction confirmed!")
  }

  return {
    mintCredits,
    leaseCredits,
    burnCredits,
    balance: balance ? formatEther(balance) : "0",
    isLoading: isPending || isConfirming,
    refetchBalance,
  }
}
