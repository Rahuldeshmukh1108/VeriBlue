"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import {
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Upload,
  Eye,
  Coins,
  ArrowRight,
  User,
  Calendar,
  Hash,
} from "lucide-react"

interface WorkflowStep {
  id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed" | "rejected"
  assignee?: string
  completedAt?: string
  estimatedDuration: string
  icon: any
}

interface ReportWorkflow {
  id: string
  projectId: string
  projectName: string
  reportPeriod: string
  submittedAt: string
  currentStep: number
  totalSteps: number
  status: "submitted" | "under-review" | "verified" | "rejected" | "credits-minted"
  steps: WorkflowStep[]
  ipfsHash?: string
  transactionHash?: string
}

export function ReportWorkflowTracker({ projectId }: { projectId: string }) {
  const [workflows, setWorkflows] = useState<ReportWorkflow[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { success, error } = useToast()

  useEffect(() => {
    const loadWorkflows = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockWorkflows: ReportWorkflow[] = [
          {
            id: "wf_001",
            projectId,
            projectName: "Amazon Reforestation Initiative",
            reportPeriod: "Q1 2024",
            submittedAt: "2024-03-15T10:30:00Z",
            currentStep: 2,
            totalSteps: 5,
            status: "under-review",
            ipfsHash: "QmXXX...ABC123",
            steps: [
              {
                id: "submit",
                title: "Report Submission",
                description: "MRV report submitted to blockchain",
                status: "completed",
                completedAt: "2024-03-15T10:30:00Z",
                estimatedDuration: "Instant",
                icon: Upload,
              },
              {
                id: "initial-review",
                title: "Initial Review",
                description: "Automated validation and completeness check",
                status: "completed",
                completedAt: "2024-03-15T10:35:00Z",
                estimatedDuration: "5 minutes",
                icon: FileText,
              },
              {
                id: "verifier-assignment",
                title: "Verifier Assignment",
                description: "Report assigned to qualified verifier",
                status: "in-progress",
                assignee: "GreenTech Verification NGO",
                estimatedDuration: "1-2 hours",
                icon: User,
              },
              {
                id: "verification",
                title: "Verification Process",
                description: "Detailed review and field validation",
                status: "pending",
                estimatedDuration: "3-5 days",
                icon: Eye,
              },
              {
                id: "credit-calculation",
                title: "Credit Calculation",
                description: "AI-powered credit amount determination",
                status: "pending",
                estimatedDuration: "1 hour",
                icon: Coins,
              },
            ],
          },
          {
            id: "wf_002",
            projectId,
            projectName: "Solar Farm Development",
            reportPeriod: "Q4 2023",
            submittedAt: "2024-01-10T14:20:00Z",
            currentStep: 5,
            totalSteps: 5,
            status: "credits-minted",
            ipfsHash: "QmYYY...DEF456",
            transactionHash: "0x789...xyz",
            steps: [
              {
                id: "submit",
                title: "Report Submission",
                description: "MRV report submitted to blockchain",
                status: "completed",
                completedAt: "2024-01-10T14:20:00Z",
                estimatedDuration: "Instant",
                icon: Upload,
              },
              {
                id: "initial-review",
                title: "Initial Review",
                description: "Automated validation and completeness check",
                status: "completed",
                completedAt: "2024-01-10T14:25:00Z",
                estimatedDuration: "5 minutes",
                icon: FileText,
              },
              {
                id: "verifier-assignment",
                title: "Verifier Assignment",
                description: "Report assigned to qualified verifier",
                status: "completed",
                assignee: "Solar Verification Corp",
                completedAt: "2024-01-10T16:00:00Z",
                estimatedDuration: "1-2 hours",
                icon: User,
              },
              {
                id: "verification",
                title: "Verification Process",
                description: "Detailed review and field validation",
                status: "completed",
                completedAt: "2024-01-13T09:30:00Z",
                estimatedDuration: "3-5 days",
                icon: Eye,
              },
              {
                id: "credit-calculation",
                title: "Credit Calculation",
                description: "AI-powered credit amount determination",
                status: "completed",
                completedAt: "2024-01-13T10:30:00Z",
                estimatedDuration: "1 hour",
                icon: Coins,
              },
            ],
          },
        ]

        setWorkflows(mockWorkflows)
        setIsLoading(false)
      } catch (err) {
        error("Failed to load workflows", "Please try refreshing the page")
        setIsLoading(false)
      }
    }

    loadWorkflows()
  }, [projectId, error])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "under-review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "verified":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      case "credits-minted":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {workflows.map((workflow) => (
        <Card key={workflow.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  {workflow.projectName} - {workflow.reportPeriod}
                </CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  Submitted {new Date(workflow.submittedAt).toLocaleDateString()}
                  {workflow.ipfsHash && (
                    <>
                      <Hash className="h-4 w-4 ml-3 mr-1" />
                      <span className="font-mono text-xs">{workflow.ipfsHash}</span>
                    </>
                  )}
                </CardDescription>
              </div>
              <Badge className={getStatusColor(workflow.status)}>
                {workflow.status.replace("-", " ").toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Progress Overview */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>
                  {workflow.currentStep} of {workflow.totalSteps} steps completed
                </span>
              </div>
              <Progress value={(workflow.currentStep / workflow.totalSteps) * 100} className="h-2" />
            </div>

            {/* Workflow Steps */}
            <div className="space-y-4">
              {workflow.steps.map((step, index) => {
                const Icon = step.icon
                const isActive = index === workflow.currentStep - 1
                const isCompleted = step.status === "completed"
                const isInProgress = step.status === "in-progress"

                return (
                  <div
                    key={step.id}
                    className={`flex items-start space-x-4 p-4 rounded-lg border ${
                      isActive ? "border-primary bg-primary/5" : isCompleted ? "border-green-200 bg-green-50" : ""
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isCompleted ? "bg-green-100" : isInProgress ? "bg-yellow-100" : "bg-gray-100"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{step.title}</h4>
                        <div className="flex items-center space-x-2">
                          {getStepStatusIcon(step.status)}
                          <span className="text-sm text-muted-foreground">{step.estimatedDuration}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                      {step.assignee && <p className="text-sm text-blue-600 mt-1">Assigned to: {step.assignee}</p>}
                      {step.completedAt && (
                        <p className="text-sm text-green-600 mt-1">
                          Completed: {new Date(step.completedAt).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                {workflow.transactionHash && <span className="font-mono">Tx: {workflow.transactionHash}</span>}
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  View Report
                </Button>
                {workflow.status === "credits-minted" && (
                  <Button size="sm">
                    View Credits <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {workflows.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">No Reports Submitted</h3>
            <p className="text-muted-foreground mb-4">Submit your first MRV report to start the verification process</p>
            <Button>Submit Report</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
