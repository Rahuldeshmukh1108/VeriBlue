"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Leaf, Clock, AlertCircle, Mail } from "lucide-react"
import Link from "next/link"

export default function VerificationPendingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Carbon Fiesta</span>
          </div>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-full w-fit">
              <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <CardTitle className="text-2xl">Verification Pending</CardTitle>
            <CardDescription className="text-base">
              Thank you for submitting your application. Your account is currently under review.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="font-semibold mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-blue-500" />
                What happens next?
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Document Review</p>
                    <p className="text-sm text-muted-foreground">
                      Our verification team will review all submitted documents
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Verification Process</p>
                    <p className="text-sm text-muted-foreground">
                      Your application will be verified according to your role requirements
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium">Account Activation</p>
                    <p className="text-sm text-muted-foreground">
                      Once approved, you'll receive access to your dashboard
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-900 dark:text-blue-100">Email Notifications</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    We'll send you email updates about your verification status. Please check your inbox regularly.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">Verification typically takes 3-5 business days</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" asChild>
                  <Link href="/">Return to Home</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
