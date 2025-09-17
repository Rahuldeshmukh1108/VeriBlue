import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Database } from "lucide-react"

interface EmptyDataProps {
  title?: string
  description?: string
  icon?: "chart" | "database"
}

export function EmptyData({
  title = "No data available",
  description = "Data will appear here once it becomes available.",
  icon = "database",
}: EmptyDataProps) {
  const IconComponent = icon === "chart" ? BarChart3 : Database

  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-3 mb-3">
          <IconComponent className="h-6 w-6 text-muted-foreground" />
        </div>
        <h4 className="font-medium mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground text-balance">{description}</p>
      </CardContent>
    </Card>
  )
}
