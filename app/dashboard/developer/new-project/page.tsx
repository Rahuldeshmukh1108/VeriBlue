"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Check, Upload, FileText, Leaf, DollarSign } from "lucide-react"
import Link from "next/link"

export default function NewProjectPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Project Info
    name: "",
    description: "",
    location: "",
    coordinates: { lat: "", lng: "" },
    area: "",
    startDate: "",
    duration: "",

    // Methodology
    methodology: "",
    projectType: "",
    estimatedCredits: "",
    baselineScenario: "",
    additionalityTest: "",

    // Documents
    documents: [] as string[],

    // Review
    termsAccepted: false,
    dataAccuracy: false,
  })

  const steps = [
    { id: 1, name: "Project Info", description: "Basic project details" },
    { id: 2, name: "Methodology", description: "Technical specifications" },
    { id: 3, name: "Upload Docs", description: "Required documentation" },
    { id: 4, name: "Review & Submit", description: "Final review" },
  ]

  const methodologies = [
    "VCS VM0009 - Afforestation/Reforestation",
    "VCS VM0033 - Tidal Wetland Restoration",
    "CDM AMS-I.D - Grid Connected Renewable",
    "VCS VM0007 - REDD+ Methodology",
    "CDM AM0001 - Incineration of HFC-23",
    "VCS VM0026 - Sustainable Grassland Management",
  ]

  const projectTypes = [
    "Forestry & Land Use",
    "Renewable Energy",
    "Energy Efficiency",
    "Waste Management",
    "Agriculture",
    "Transportation",
    "Industrial Processes",
  ]

  const requiredDocuments = [
    "Project Design Document (PDD)",
    "Environmental Impact Assessment",
    "Baseline Study Report",
    "Monitoring Plan",
    "Stakeholder Consultation Report",
    "Land Rights Documentation",
  ]

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = (currentStep / 4) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/developer" className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">VeriBlue</span>
            </Link>
            <Badge variant="secondary">Developer</Badge>
          </div>
          <Link href="/dashboard/developer">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Project</h1>
          <p className="text-muted-foreground">Submit your carbon credit project for verification</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-muted-foreground text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                {step.id < 4 && (
                  <div className={`w-24 h-0.5 mx-4 ${currentStep > step.id ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm">
            {steps.map((step) => (
              <div key={step.id} className="text-center">
                <p className={`font-medium ${currentStep >= step.id ? "text-foreground" : "text-muted-foreground"}`}>
                  {step.name}
                </p>
                <p className="text-muted-foreground text-xs">{step.description}</p>
              </div>
            ))}
          </div>
          <Progress value={progress} className="mt-4" />
        </div>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              {currentStep === 1 && <FileText className="h-5 w-5 mr-2 text-primary" />}
              {currentStep === 2 && <DollarSign className="h-5 w-5 mr-2 text-secondary" />}
              {currentStep === 3 && <Upload className="h-5 w-5 mr-2 text-accent-foreground" />}
              {currentStep === 4 && <Check className="h-5 w-5 mr-2 text-chart-4" />}
              {steps[currentStep - 1].name}
            </CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Step 1: Project Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Project Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Amazon Reforestation Initiative"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Acre, Brazil"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Project Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a detailed description of your project, including objectives, methodology, and expected impact..."
                    className="min-h-32"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="area">Project Area</Label>
                    <Input
                      id="area"
                      placeholder="e.g., 10,000 hectares"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (years)</Label>
                    <Input
                      id="duration"
                      placeholder="e.g., 10"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="lat">Latitude</Label>
                    <Input
                      id="lat"
                      placeholder="e.g., -9.0238"
                      value={formData.coordinates.lat}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          coordinates: { ...formData.coordinates, lat: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lng">Longitude</Label>
                    <Input
                      id="lng"
                      placeholder="e.g., -70.8120"
                      value={formData.coordinates.lng}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          coordinates: { ...formData.coordinates, lng: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Methodology */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="projectType">Project Type *</Label>
                    <Select
                      value={formData.projectType}
                      onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        {projectTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimatedCredits">Estimated Credits (tCO₂e)</Label>
                    <Input
                      id="estimatedCredits"
                      placeholder="e.g., 50000"
                      value={formData.estimatedCredits}
                      onChange={(e) => setFormData({ ...formData, estimatedCredits: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="methodology">Methodology *</Label>
                  <Select
                    value={formData.methodology}
                    onValueChange={(value) => setFormData({ ...formData, methodology: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select methodology" />
                    </SelectTrigger>
                    <SelectContent>
                      {methodologies.map((methodology) => (
                        <SelectItem key={methodology} value={methodology}>
                          {methodology}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="baselineScenario">Baseline Scenario *</Label>
                  <Textarea
                    id="baselineScenario"
                    placeholder="Describe the baseline scenario (what would happen without this project)..."
                    className="min-h-24"
                    value={formData.baselineScenario}
                    onChange={(e) => setFormData({ ...formData, baselineScenario: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalityTest">Additionality Test *</Label>
                  <Textarea
                    id="additionalityTest"
                    placeholder="Explain how this project demonstrates additionality (why it wouldn't happen without carbon finance)..."
                    className="min-h-24"
                    value={formData.additionalityTest}
                    onChange={(e) => setFormData({ ...formData, additionalityTest: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Upload Documents */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center p-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                  <Upload className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Upload Project Documents</h3>
                  <p className="text-muted-foreground mb-4">Drag and drop files here, or click to browse</p>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Files
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Required Documents</h4>
                  <div className="grid gap-3">
                    {requiredDocuments.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <span className="text-sm">{doc}</span>
                        </div>
                        <Badge variant="outline" className="text-destructive">
                          Required
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Uploaded Files</h4>
                  <div className="text-center p-6 text-muted-foreground">No files uploaded yet</div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Project Summary</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm text-muted-foreground">Project Name</Label>
                        <p className="font-medium">{formData.name || "Not specified"}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Location</Label>
                        <p className="font-medium">{formData.location || "Not specified"}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Project Type</Label>
                        <p className="font-medium">{formData.projectType || "Not specified"}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm text-muted-foreground">Methodology</Label>
                        <p className="font-medium">{formData.methodology || "Not specified"}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Estimated Credits</Label>
                        <p className="font-medium">
                          {formData.estimatedCredits ? `${formData.estimatedCredits} tCO₂e` : "Not specified"}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Start Date</Label>
                        <p className="font-medium">{formData.startDate || "Not specified"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Terms & Conditions</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.termsAccepted}
                        onCheckedChange={(checked) => setFormData({ ...formData, termsAccepted: checked as boolean })}
                      />
                      <Label htmlFor="terms" className="text-sm leading-relaxed">
                        I agree to the VeriBlue Terms of Service and Privacy Policy. I understand that my project
                        will undergo third-party verification.
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="accuracy"
                        checked={formData.dataAccuracy}
                        onCheckedChange={(checked) => setFormData({ ...formData, dataAccuracy: checked as boolean })}
                      />
                      <Label htmlFor="accuracy" className="text-sm leading-relaxed">
                        I certify that all information provided is accurate and complete to the best of my knowledge.
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Next Steps</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Your project will be reviewed by our technical team</li>
                    <li>• A qualified verifier will be assigned within 5 business days</li>
                    <li>• You'll receive updates via email and dashboard notifications</li>
                    <li>• Initial review typically takes 2-4 weeks</li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentStep < 4 ? (
            <Button onClick={nextStep}>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              className="bg-primary hover:bg-primary/90"
              disabled={!formData.termsAccepted || !formData.dataAccuracy}
            >
              <Check className="h-4 w-4 mr-2" />
              Submit Project
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
