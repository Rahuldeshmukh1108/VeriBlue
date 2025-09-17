import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, TreePine } from "lucide-react"
import Link from "next/link"

interface EmptyProjectsProps {
  userType: "developer" | "buyer" | "verifier"
}

export function EmptyProjects({ userType }: EmptyProjectsProps) {
  const getContent = () => {
    switch (userType) {
      case "developer":
        return {
          title: "No projects yet",
          description:
            "Start your carbon credit journey by creating your first project. Upload documentation, track MRV data, and get verified.",
          actionText: "Create Project",
          actionHref: "/dashboard/developer/projects/new",
        }
      case "buyer":
        return {
          title: "No purchases yet",
          description:
            "Explore verified carbon credit projects and start building your sustainability portfolio with real environmental impact.",
          actionText: "Browse Projects",
          actionHref: "/dashboard/buyer/marketplace",
        }
      case "verifier":
        return {
          title: "No projects to verify",
          description:
            "Projects awaiting verification will appear here. Use advanced tools for satellite imagery analysis and digital attestations.",
          actionText: "Refresh",
          actionHref: "/dashboard/verifier",
        }
    }
  }

  const content = getContent()

  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <TreePine className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{content.title}</h3>
        <p className="text-muted-foreground mb-6 max-w-md text-balance">{content.description}</p>
        <Link href={content.actionHref}>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {content.actionText}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
