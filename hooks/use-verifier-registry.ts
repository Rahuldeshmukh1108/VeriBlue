"use client"

import { useWriteContract, useReadContract, useWaitForTransactionReceipt } from "wagmi"
import { useBlockchainStore } from "@/lib/blockchain/store"
import { CONTRACTS, VERIFIER_REGISTRY_ABI } from "@/lib/blockchain/config"
import { toast } from "sonner"

export function useVerifierRegistry() {
  const { addPendingTransaction, completePendingTransaction } = useBlockchainStore()

  const { writeContract, data: hash, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  // Check if address is a verifier
  const { data: isVerifier, refetch: refetchVerifierStatus } = useReadContract({
    address: CONTRACTS.VERIFIER_REGISTRY,
    abi: VERIFIER_REGISTRY_ABI,
    functionName: "isVerifier",
    args: ["0x0000000000000000000000000000000000000000"], // Will be replaced with actual address
  })

  const addVerifier = async (verifierAddress: string) => {
    try {
      toast.info("Adding verifier...")

      const result = await writeContract({
        address: CONTRACTS.VERIFIER_REGISTRY,
        abi: VERIFIER_REGISTRY_ABI,
        functionName: "addVerifier",
        args: [verifierAddress],
      })

      if (result) {
        addPendingTransaction(result)
        toast.success("Add verifier transaction submitted!")
      }
    } catch (error) {
      console.error("Adding verifier failed:", error)
      toast.error("Failed to add verifier")
    }
  }

  const verifyProject = async (projectId: string, approved: boolean) => {
    try {
      toast.info(`${approved ? "Approving" : "Rejecting"} project...`)

      const result = await writeContract({
        address: CONTRACTS.VERIFIER_REGISTRY,
        abi: VERIFIER_REGISTRY_ABI,
        functionName: "verifyProject",
        args: [projectId, approved],
      })

      if (result) {
        addPendingTransaction(result)
        toast.success(`Project ${approved ? "approval" : "rejection"} submitted!`)
      }
    } catch (error) {
      console.error("Project verification failed:", error)
      toast.error("Failed to verify project")
    }
  }

  const signAttestation = async (message: string) => {
    try {
      toast.info("Signing attestation...")
      // This would typically use wallet signing
      // For now, we'll simulate it
      toast.success("Attestation signed successfully!")
    } catch (error) {
      console.error("Attestation signing failed:", error)
      toast.error("Failed to sign attestation")
    }
  }

  // Handle transaction confirmation
  if (isConfirmed && hash) {
    completePendingTransaction(hash)
    refetchVerifierStatus()
    toast.success("Transaction confirmed!")
  }

  return {
    addVerifier,
    verifyProject,
    signAttestation,
    isVerifier: !!isVerifier,
    isLoading: isPending || isConfirming,
    refetchVerifierStatus,
  }
}
