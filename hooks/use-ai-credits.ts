"use client"

import { useState, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { useBlockchain } from "@/hooks/use-blockchain"

interface CreditCalculationResult {
  reportId: string
  grossCredits: number
  netCredits: number
  confidence: number
  reasoning: string[]
  methodology: string
  calculatedAt: string
}

export function useAICredits() {
  const [isCalculating, setIsCalculating] = useState(false)
  const [calculations, setCalculations] = useState<CreditCalculationResult[]>([])
  const { success, error } = useToast()
  const { isConnected } = useBlockchain()

  const calculateCredits = useCallback(
    async (reportData: any) => {
      if (!isConnected) {
        error("Blockchain Required", "Please ensure blockchain connection for credit calculation")
        return null
      }

      setIsCalculating(true)
      try {
        // Simulate AI calculation process
        await new Promise((resolve) => setTimeout(resolve, 3000))

        const result: CreditCalculationResult = {
          reportId: reportData.id,
          grossCredits: Math.round(Math.random() * 5000 + 1000),
          netCredits: Math.round(Math.random() * 4000 + 800),
          confidence: Math.round(Math.random() * 20 + 80), // 80-100%
          reasoning: [
            "Baseline analysis shows significant improvement over historical data",
            "Additionality assessment confirms project would not occur without carbon finance",
            "Permanence risk is low based on project design and monitoring plan",
            "Leakage potential is minimal due to project location and methodology",
          ],
          methodology: "IPCC 2019 Guidelines with AI Enhancement",
          calculatedAt: new Date().toISOString(),
        }

        setCalculations((prev) => [result, ...prev])
        success("Calculation Complete", `${result.netCredits} credits calculated with ${result.confidence}% confidence`)

        return result
      } catch (err) {
        error("Calculation Failed", "AI credit calculation encountered an error")
        return null
      } finally {
        setIsCalculating(false)
      }
    },
    [isConnected, success, error],
  )

  const getCalculationHistory = useCallback(() => {
    return calculations
  }, [calculations])

  const getCalculationById = useCallback(
    (reportId: string) => {
      return calculations.find((calc) => calc.reportId === reportId)
    },
    [calculations],
  )

  return {
    isCalculating,
    calculations,
    calculateCredits,
    getCalculationHistory,
    getCalculationById,
  }
}
