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
import { useCarbonCredits } from "@/hooks/use-carbon-credits"
import { useBlockchain } from "@/hooks/use-blockchain"
import { Coins, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface MintCreditsDialogProps {
  projectId: string
  projectName: string
}

export function MintCreditsDialog({ projectId, projectName }: MintCreditsDialogProps) {
  const [amount, setAmount] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const { mintCredits, isLoading } = useCarbonCredits()
  const { isConnected } = useBlockchain()

  const handleMint = async () => {
    if (!amount || !isConnected) return

    try {
      await mintCredits(amount, projectId)
      setIsOpen(false)
      setAmount("")
    } catch (error) {
      console.error("Minting failed:", error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" disabled={!isConnected}>
          <Coins className="h-4 w-4 mr-2" />
          Mint Credits
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mint Carbon Credits</DialogTitle>
          <DialogDescription>Mint verified carbon credits for {projectName} on the blockchain.</DialogDescription>
        </DialogHeader>

        {!isConnected && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Please connect your wallet to mint credits.</AlertDescription>
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
              placeholder="1000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="col-span-3"
              disabled={!isConnected}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-sm text-muted-foreground">Project ID</Label>
            <span className="col-span-3 text-sm font-mono">{projectId}</span>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleMint} disabled={!amount || !isConnected || isLoading}>
            {isLoading ? "Minting..." : "Mint Credits"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
