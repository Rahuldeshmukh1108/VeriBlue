import { Card, CardContent } from "@/components/ui/card"
import { Bell, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function EmptyNotifications() {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <Bell className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No notifications yet</h3>
        <p className="text-muted-foreground mb-6 max-w-md text-balance">
          You'll receive notifications about project updates, verification status, and credit transactions here.
        </p>
        <Link href="/dashboard/settings/notifications">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Notification Settings
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
