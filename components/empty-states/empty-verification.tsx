"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Shield, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EmptyVerification() {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <Shield className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No projects to verify</h3>
        <p className="text-muted-foreground mb-6 max-w-md text-balance">
          Projects awaiting verification will appear here. Use advanced tools for satellite imagery analysis and digital
          attestations.
        </p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </CardContent>
    </Card>
  )
}
