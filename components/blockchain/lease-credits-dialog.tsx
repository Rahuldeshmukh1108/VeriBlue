"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMarketplace } from "@/hooks/use-marketplace"
import { useBlockchain } from "@/hooks/use-blockchain"
import { ShoppingCart, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface LeaseCreditsDialogProps {
  projectId: string
  projectName: string
  pricePerCredit: string
}

export function LeaseCreditsDialog({ projectId, projectName, pricePerCredit }: LeaseCreditsDialogProps) {
  const [amount, setAmount] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const { purchaseCredits } = useMarketplace()
  const { isConnected } = useBlockchain()

  const totalCost = amount ? (Number.parseFloat(amount) * Number.parseFloat(pricePerCredit)).toFixed(4) : "0"

  const handlePurchase = async () => {
    if (!amount || !isConnected) return

    try {
      await purchaseCredits(projectId, amount)
      setIsOpen(false)
      setAmount("")
    } catch (error) {
      console.error("Purchase failed:", error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" disabled={!isConnected}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Lease Credits
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Lease Carbon Credits</DialogTitle>
          <DialogDescription>Lease carbon credits from {projectName}.</DialogDescription>
        </DialogHeader>

        {!isConnected && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Please connect your wallet to lease credits.</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="col-span-3"
              disabled={!isConnected}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-sm text-muted-foreground">Price per credit</Label>
            <span className="col-span-3 text-sm">{pricePerCredit} ETH</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-sm font-medium">Total cost</Label>
            <span className="col-span-3 text-sm font-medium">{totalCost} ETH</span>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handlePurchase} disabled={!amount || !isConnected}>
            Lease Credits
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
