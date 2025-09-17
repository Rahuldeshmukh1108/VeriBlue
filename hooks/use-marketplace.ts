"use client"

import { useState, useEffect } from "react"
import { useBlockchainStore } from "@/lib/blockchain/store"
import { toast } from "sonner"

interface MarketplaceProject {
  id: string
  name: string
  description: string
  developer: string
  creditsAvailable: string
  pricePerCredit: string
  verified: boolean
  location: string
  projectType: string
  imageUrl?: string
  metadataUri?: string
}

export function useMarketplace() {
  const [projects, setProjects] = useState<MarketplaceProject[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { addLeasedCredit } = useBlockchainStore()

  // Mock marketplace data
  const mockProjects: MarketplaceProject[] = [
    {
      id: "proj_001",
      name: "Amazon Rainforest Conservation",
      description: "Protecting 10,000 hectares of Amazon rainforest",
      developer: "0x1234...5678",
      creditsAvailable: "50000",
      pricePerCredit: "0.01",
      verified: true,
      location: "Brazil",
      projectType: "Forest Conservation",
      imageUrl: "/wind-farm-renewable-energy.jpg",
    },
    {
      id: "proj_002",
      name: "Solar Farm Initiative",
      description: "1MW solar installation in rural communities",
      developer: "0x2345...6789",
      creditsAvailable: "25000",
      pricePerCredit: "0.015",
      verified: true,
      location: "Kenya",
      projectType: "Renewable Energy",
      imageUrl: "/wind-farm-renewable-energy.jpg",
    },
  ]

  const fetchProjects = async () => {
    setIsLoading(true)
    try {
      // Simulate API call to fetch projects from blockchain
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setProjects(mockProjects)
    } catch (error) {
      console.error("Failed to fetch projects:", error)
      toast.error("Failed to load marketplace projects")
    } finally {
      setIsLoading(false)
    }
  }

  const purchaseCredits = async (projectId: string, amount: string) => {
    try {
      toast.info("Processing credit purchase...")

      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Add to leased credits
      addLeasedCredit({
        projectId,
        amount,
        leaseDate: new Date().toISOString(),
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
      })

      toast.success("Credits purchased successfully!")
    } catch (error) {
      console.error("Purchase failed:", error)
      toast.error("Failed to purchase credits")
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return {
    projects,
    isLoading,
    fetchProjects,
    purchaseCredits,
  }
}
