"use client"

import { useAccount, useBalance, useChainId, useDisconnect } from "wagmi"
import { useEffect } from "react"
import { useBlockchainStore } from "@/lib/blockchain/store"
import { formatEther } from "viem"

export function useBlockchain() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { disconnect } = useDisconnect()
  const { data: balance } = useBalance({ address })

  const { setWalletState, carbonBalance, ownedProjects, leasedCredits, pendingTransactions, reset } =
    useBlockchainStore()

  // Update store when wallet state changes
  useEffect(() => {
    setWalletState({
      isConnected,
      address: address || null,
      balance: balance ? formatEther(balance.value) : "0",
      chainId: chainId || null,
    })
  }, [isConnected, address, balance, chainId, setWalletState])

  // Reset store on disconnect
  useEffect(() => {
    if (!isConnected) {
      reset()
    }
  }, [isConnected, reset])

  return {
    // Wallet state
    isConnected,
    address,
    balance: balance ? formatEther(balance.value) : "0",
    chainId,

    // Carbon credits state
    carbonBalance,
    ownedProjects,
    leasedCredits,
    pendingTransactions,

    // Actions
    disconnect,
  }
}
