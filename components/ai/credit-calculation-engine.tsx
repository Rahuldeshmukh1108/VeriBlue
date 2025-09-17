"use client"

import { Calendar } from "@/components/ui/calendar"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  Brain,
  TrendingUp,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Calculator,
  Zap,
  TreePine,
  Droplets,
  Wind,
  Activity,
  Clock,
  Coins,
} from "lucide-react"

interface CreditCalculationData {
  reportId: string
  projectName: string
  projectType: string
  verificationStatus: "verified" | "pending"
  rawData: {
    carbonSequestration: number
    energyGeneration: number
    waterConservation: number
    biodiversityImpact: number
    soilHealth: number
    duration: number // months
  }
  aiAnalysis: {
    baselineComparison: number
    additionality: number
    permanence: number
    leakage: number
    uncertainty: number
    qualityScore: number
  }
  calculatedCredits: {
    gross: number
    adjustments: number
    net: number
    confidence: number
  }
  methodology: string
  reasoning: string[]
}

export function CreditCalculationEngine({ reportId }: { reportId: string }) {
  const [calculationData, setCalculationData] = useState<CreditCalculationData | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [calculationStep, setCalculationStep] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const { success, error } = useToast()

  const calculationSteps = [
    "Loading verified report data",
    "Analyzing baseline measurements",
    "Calculating additionality factors",
    "Assessing permanence risks",
    "Evaluating leakage potential",
    "Applying uncertainty adjustments",
    "Generating final credit amount",
  ]

  useEffect(() => {
    const loadReportData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockData: CreditCalculationData = {
          reportId,
          projectName: "Amazon Reforestation Initiative",
          projectType: "Forestry",
          verificationStatus: "verified",
          rawData: {
            carbonSequestration: 2.4, // tons CO2/day
            energyGeneration: 0,
            waterConservation: 850, // liters/day
            biodiversityImpact: 0.78,
            soilHealth: 0.85,
            duration: 3, // months
          },
          aiAnalysis: {
            baselineComparison: 0.92, // 92% above baseline
            additionality: 0.88, // 88% additional
            permanence: 0.95, // 95% permanent
            leakage: 0.05, // 5% leakage risk
            uncertainty: 0.12, // 12% uncertainty
            qualityScore: 0.89, // 89% quality score
          },
          calculatedCredits: {
            gross: 0,
            adjustments: 0,
            net: 0,
            confidence: 0,
          },
          methodology: "IPCC 2019 Guidelines for Forestry Projects",
          reasoning: [],
        }

        setCalculationData(mockData)
        setIsLoading(false)
      } catch (err) {
        error("Failed to load report", "Please try refreshing the page")
        setIsLoading(false)
      }
    }

    loadReportData()
  }, [reportId, error])

  const runAICalculation = async () => {
    if (!calculationData) return

    setIsCalculating(true)
    setCalculationStep(0)

    try {
      // Simulate AI calculation steps
      for (let i = 0; i < calculationSteps.length; i++) {
        setCalculationStep(i)
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }

      // Calculate credits based on AI analysis
      const grossCredits = Math.round(
        calculationData.rawData.carbonSequestration *
          calculationData.rawData.duration *
          30 * // days per month
          calculationData.aiAnalysis.baselineComparison *
          calculationData.aiAnalysis.additionality,
      )

      const adjustments = Math.round(
        grossCredits *
          (calculationData.aiAnalysis.leakage +
            calculationData.aiAnalysis.uncertainty +
            (1 - calculationData.aiAnalysis.permanence)),
      )

      const netCredits = grossCredits - adjustments
      const confidence = Math.round(calculationData.aiAnalysis.qualityScore * 100)

      const reasoning = [
        `Base carbon sequestration: ${calculationData.rawData.carbonSequestration} tons CO2/day over ${calculationData.rawData.duration} months`,
        `Baseline comparison shows ${Math.round(calculationData.aiAnalysis.baselineComparison * 100)}% improvement over historical data`,
        `Additionality assessment: ${Math.round(calculationData.aiAnalysis.additionality * 100)}% of impact is additional`,
        `Permanence risk adjustment: ${Math.round((1 - calculationData.aiAnalysis.permanence) * 100)}% risk factor applied`,
        `Leakage assessment: ${Math.round(calculationData.aiAnalysis.leakage * 100)}% potential leakage identified`,
        `Uncertainty buffer: ${Math.round(calculationData.aiAnalysis.uncertainty * 100)}% applied for measurement uncertainty`,
        `Quality score: ${Math.round(calculationData.aiAnalysis.qualityScore * 100)}% based on data completeness and methodology compliance`,
      ]

      setCalculationData((prev) => ({
        ...prev!,
        calculatedCredits: {
          gross: grossCredits,
          adjustments,
          net: netCredits,
          confidence,
        },
        reasoning,
      }))

      success("Calculation Complete", `${netCredits} carbon credits calculated with ${confidence}% confidence`)
    } catch (err) {
      error("Calculation Failed", "AI credit calculation encountered an error")
    } finally {
      setIsCalculating(false)
    }
  }

  if (isLoading || !calculationData) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                AI Credit Calculation Engine
              </CardTitle>
              <CardDescription>
                Advanced AI analysis for {calculationData.projectName} - {calculationData.projectType} Project
              </CardDescription>
            </div>
            <Badge
              className={
                calculationData.verificationStatus === "verified"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }
            >
              {calculationData.verificationStatus === "verified" ? (
                <CheckCircle className="h-3 w-3 mr-1" />
              ) : (
                <Clock className="h-3 w-3 mr-1" />
              )}
              {calculationData.verificationStatus}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Calculation Progress */}
      {isCalculating && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2 animate-pulse" />
              AI Calculation in Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>{calculationSteps[calculationStep]}</span>
                <span>{Math.round(((calculationStep + 1) / calculationSteps.length) * 100)}%</span>
              </div>
              <Progress value={((calculationStep + 1) / calculationSteps.length) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="data" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="data">Raw Data</TabsTrigger>
          <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
          <TabsTrigger value="calculation">Calculation</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="data" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center">
                  <TreePine className="h-4 w-4 mr-2" />
                  Carbon Sequestration
                </CardDescription>
                <CardTitle className="text-2xl text-green-600">
                  {calculationData.rawData.carbonSequestration} t/day
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Over {calculationData.rawData.duration} months</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center">
                  <Droplets className="h-4 w-4 mr-2" />
                  Water Conservation
                </CardDescription>
                <CardTitle className="text-2xl text-blue-600">
                  {calculationData.rawData.waterConservation} L/day
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Sustainable usage</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  Biodiversity Impact
                </CardDescription>
                <CardTitle className="text-2xl text-purple-600">{calculationData.rawData.biodiversityImpact}</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={calculationData.rawData.biodiversityImpact * 100} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center">
                  <Wind className="h-4 w-4 mr-2" />
                  Soil Health
                </CardDescription>
                <CardTitle className="text-2xl text-orange-600">{calculationData.rawData.soilHealth}</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={calculationData.rawData.soilHealth * 100} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Project Duration
                </CardDescription>
                <CardTitle className="text-2xl text-gray-600">{calculationData.rawData.duration} months</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Reporting period</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Methodology
                </CardDescription>
                <CardTitle className="text-sm">{calculationData.methodology}</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">IPCC Compliant</Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Analysis Factors</CardTitle>
                <CardDescription>Machine learning assessment of project impact</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Baseline Comparison</span>
                    <span className="text-sm">{Math.round(calculationData.aiAnalysis.baselineComparison * 100)}%</span>
                  </div>
                  <Progress value={calculationData.aiAnalysis.baselineComparison * 100} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Additionality</span>
                    <span className="text-sm">{Math.round(calculationData.aiAnalysis.additionality * 100)}%</span>
                  </div>
                  <Progress value={calculationData.aiAnalysis.additionality * 100} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Permanence</span>
                    <span className="text-sm">{Math.round(calculationData.aiAnalysis.permanence * 100)}%</span>
                  </div>
                  <Progress value={calculationData.aiAnalysis.permanence * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
                <CardDescription>AI-identified risks and uncertainties</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Leakage Risk</span>
                    <span className="text-sm text-red-600">
                      {Math.round(calculationData.aiAnalysis.leakage * 100)}%
                    </span>
                  </div>
                  <Progress value={calculationData.aiAnalysis.leakage * 100} className="h-2 bg-red-100" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Uncertainty</span>
                    <span className="text-sm text-yellow-600">
                      {Math.round(calculationData.aiAnalysis.uncertainty * 100)}%
                    </span>
                  </div>
                  <Progress value={calculationData.aiAnalysis.uncertainty * 100} className="h-2 bg-yellow-100" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Quality Score</span>
                    <span className="text-sm text-green-600">
                      {Math.round(calculationData.aiAnalysis.qualityScore * 100)}%
                    </span>
                  </div>
                  <Progress value={calculationData.aiAnalysis.qualityScore * 100} className="h-2 bg-green-100" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calculation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                Credit Calculation Process
              </CardTitle>
              <CardDescription>Step-by-step AI-powered credit calculation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <Button
                  onClick={runAICalculation}
                  disabled={isCalculating || calculationData.calculatedCredits.net > 0}
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                >
                  {isCalculating ? (
                    <>
                      <Zap className="h-4 w-4 mr-2 animate-pulse" />
                      Calculating...
                    </>
                  ) : calculationData.calculatedCredits.net > 0 ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Calculation Complete
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Run AI Calculation
                    </>
                  )}
                </Button>
              </div>

              {calculationData.reasoning.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium">AI Reasoning:</h4>
                  <div className="space-y-2">
                    {calculationData.reasoning.map((reason, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                          {index + 1}
                        </div>
                        <p className="text-sm">{reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {calculationData.calculatedCredits.net > 0 ? (
            <>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-green-200 bg-green-50">
                  <CardHeader className="pb-2">
                    <CardDescription className="flex items-center text-green-700">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Gross Credits
                    </CardDescription>
                    <CardTitle className="text-3xl text-green-600">
                      {calculationData.calculatedCredits.gross.toLocaleString()}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-green-700">Before adjustments</p>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50">
                  <CardHeader className="pb-2">
                    <CardDescription className="flex items-center text-red-700">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Adjustments
                    </CardDescription>
                    <CardTitle className="text-3xl text-red-600">
                      -{calculationData.calculatedCredits.adjustments.toLocaleString()}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-red-700">Risk & uncertainty</p>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader className="pb-2">
                    <CardDescription className="flex items-center text-primary">
                      <Coins className="h-4 w-4 mr-2" />
                      Net Credits
                    </CardDescription>
                    <CardTitle className="text-3xl text-primary">
                      {calculationData.calculatedCredits.net.toLocaleString()}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-primary">{calculationData.calculatedCredits.confidence}% confidence</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Minting Recommendation</CardTitle>
                  <CardDescription>AI recommendation for credit minting</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                    <div>
                      <h4 className="font-medium text-primary">Recommended for Minting</h4>
                      <p className="text-sm text-muted-foreground">
                        {calculationData.calculatedCredits.net.toLocaleString()} carbon credits with{" "}
                        {calculationData.calculatedCredits.confidence}% confidence
                      </p>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Coins className="h-4 w-4 mr-2" />
                      Proceed to Mint
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">No Calculation Results</h3>
                <p className="text-muted-foreground mb-4">Run the AI calculation to see credit recommendations</p>
                <Button onClick={runAICalculation} disabled={isCalculating}>
                  <Brain className="h-4 w-4 mr-2" />
                  Start Calculation
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
