"use client"

import { BreadcrumbNav } from "@/components/navigation/breadcrumb-nav"
import { DashboardNav } from "@/components/navigation/dashboard-nav"
import { SkipLink } from "@/components/accessibility/skip-link"
import { KeyboardNavigation } from "@/components/accessibility/keyboard-navigation"
import { ReportReviewInterface } from "@/components/verification/report-review-interface"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useParams } from "next/navigation"
import Link from "next/link"

export default function ReportReviewPage() {
  const params = useParams()
  const reportId = params.id as string

  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <KeyboardNavigation />
      <DashboardNav userType="verifier" />

      <main id="main-content" tabIndex={-1} className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/dashboard/verifier">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <BreadcrumbNav />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Report Review</h1>
          <p className="text-muted-foreground">Comprehensive verification and validation of MRV report</p>
        </div>

        <ReportReviewInterface reportId={reportId} />
      </main>
    </div>
  )
}
