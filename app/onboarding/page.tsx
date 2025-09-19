"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Leaf, ArrowLeft, Upload, CheckCircle, FileText, AlertCircle } from "lucide-react"
import Link from "next/link"

const organizationTypes = ["NGO", "For-Profit", "Community-Led", "Research Institution", "Government-Backed"]

const projectTypes = [
  "Mangrove Restoration",
  "Seagrass Planting",
  "Afforestation/Reforestation",
  "Biochar Application",
  "Peatland Restoration",
  "Agroforestry",
  "Soil Carbon Sequestration",
  "Renewable Energy (Small-scale)",
  "Other",
]

const accreditingBodies = [
  "Verra",
  "Gold Standard",
  "ISO 14065",
  "CDM (Clean Development Mechanism)",
  "SCS Global Services",
  "Other",
]

const industries = [
  "Energy",
  "Manufacturing",
  "Technology",
  "Agriculture & Food",
  "Finance",
  "Transportation & Logistics",
  "Consumer Goods",
  "Services & Consulting",
  "Other",
]

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Australia",
  "Japan",
  "Brazil",
  "India",
  "Other",
]

export default function OnboardingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const role = searchParams.get("role")

  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<any>({})
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | null>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const getStepCount = () => {
    switch (role) {
      case "developer":
        return 4
      case "verifier":
        return 4
      case "buyer":
        return 3
      default:
        return 1
    }
  }

  const getProgressPercentage = () => {
    return (currentStep / getStepCount()) * 100
  }

  const handleFileUpload = (fieldName: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setUploadedFiles({ ...uploadedFiles, [fieldName]: file })
    updateFormData(fieldName, file?.name || "")
  }

  const validateCurrentStep = () => {
    const requiredFields = getRequiredFieldsForCurrentStep()
    const validationErrors = requiredFields.some((field) => {
      const value = formData[field]
      return !value || value.toString().trim() === ""
    })
    return validationErrors
  }

  const getRequiredFieldsForCurrentStep = () => {
    if (role === "developer") {
      switch (currentStep) {
        case 1:
          return ["legalName", "orgType", "regNumber", "address"]
        case 2:
          return ["projectName", "projectType", "country", "state", "latitude", "longitude"]
        case 3:
          return ["legalEntity", "projectRights", "pdd"]
        default:
          return []
      }
    } else if (role === "verifier") {
      switch (currentStep) {
        case 1:
          return ["firmName", "companyRegNumber", "headOfficeAddress"]
        case 2:
          return ["accreditingBody", "accreditationId", "accreditationDate", "expiryDate"]
        case 3:
          return ["accreditationCert", "businessReg", "portfolio", "impartiality"]
        default:
          return []
      }
    } else if (role === "buyer") {
      switch (currentStep) {
        case 1:
          return ["companyName", "businessRegNumber", "businessAddress", "industry"]
        case 2:
          return ["incorporation"]
        default:
          return []
      }
    }
    return []
  }

  const handleNext = () => {
    const validationErrors = validateCurrentStep()

    if (validationErrors) {
      setErrors({ general: "Please fill all mandatory fields to continue" })
      return
    }

    setErrors({}) // Clear errors if validation passes
    if (currentStep < getStepCount()) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to verification pending page
    router.push("/verification-pending")
  }

  const updateFormData = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  const renderDeveloperFlow = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-5">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Organization Details</h3>
            <div className="space-y-2">
              <Label htmlFor="legalName" className="text-sm font-medium text-gray-700">
                Legal Name of Organization *
              </Label>
              <Input
                id="legalName"
                value={formData.legalName || ""}
                onChange={(e) => updateFormData("legalName", e.target.value)}
                placeholder="Enter legal organization name"
                className="h-11 border-gray-200 focus:border-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="orgType" className="text-sm font-medium text-gray-700">
                Organization Type *
              </Label>
              <Select value={formData.orgType || ""} onValueChange={(value) => updateFormData("orgType", value)}>
                <SelectTrigger className="h-11 border-gray-200 focus:border-emerald-500">
                  <SelectValue placeholder="Select organization type" />
                </SelectTrigger>
                <SelectContent>
                  {organizationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="regNumber" className="text-sm font-medium text-gray-700">
                Company/NGO Registration Number *
              </Label>
              <Input
                id="regNumber"
                value={formData.regNumber || ""}
                onChange={(e) => updateFormData("regNumber", e.target.value)}
                placeholder="Registration number"
                className="h-11 border-gray-200 focus:border-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                Registered Physical Address *
              </Label>
              <Textarea
                id="address"
                value={formData.address || ""}
                onChange={(e) => updateFormData("address", e.target.value)}
                placeholder="Enter complete address"
                className="border-gray-200 focus:border-emerald-500 min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website" className="text-sm font-medium text-gray-700">
                Official Website (Optional)
              </Label>
              <Input
                id="website"
                type="url"
                value={formData.website || ""}
                onChange={(e) => updateFormData("website", e.target.value)}
                placeholder="https://yourorganization.com"
                className="h-11 border-gray-200 focus:border-emerald-500"
              />
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-5">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Project Details</h3>
            <div className="space-y-2">
              <Label htmlFor="projectName" className="text-sm font-medium text-gray-700">
                Project Name *
              </Label>
              <Input
                id="projectName"
                value={formData.projectName || ""}
                onChange={(e) => updateFormData("projectName", e.target.value)}
                placeholder="Enter project name"
                className="h-11 border-gray-200 focus:border-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectType" className="text-sm font-medium text-gray-700">
                Project Type *
              </Label>
              <Select
                value={formData.projectType || ""}
                onValueChange={(value) => updateFormData("projectType", value)}
              >
                <SelectTrigger className="h-11 border-gray-200 focus:border-emerald-500">
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
            {formData.projectType === "Other" && (
              <div className="space-y-2">
                <Label htmlFor="otherProjectType" className="text-sm font-medium text-gray-700">
                  Specify Other Project Type *
                </Label>
                <Input
                  id="otherProjectType"
                  value={formData.otherProjectType || ""}
                  onChange={(e) => updateFormData("otherProjectType", e.target.value)}
                  placeholder="Describe your project type"
                  className="h-11 border-gray-200 focus:border-emerald-500"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="country" className="text-sm font-medium text-gray-700">
                Country *
              </Label>
              <Select value={formData.country || ""} onValueChange={(value) => updateFormData("country", value)}>
                <SelectTrigger className="h-11 border-gray-200 focus:border-emerald-500">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                State/Province *
              </Label>
              <Input
                id="state"
                value={formData.state || ""}
                onChange={(e) => updateFormData("state", e.target.value)}
                placeholder="Enter state or province"
                className="h-11 border-gray-200 focus:border-emerald-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latitude" className="text-sm font-medium text-gray-700">
                  Latitude *
                </Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  value={formData.latitude || ""}
                  onChange={(e) => updateFormData("latitude", e.target.value)}
                  placeholder="e.g., 40.7128"
                  className="h-11 border-gray-200 focus:border-emerald-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude" className="text-sm font-medium text-gray-700">
                  Longitude *
                </Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  value={formData.longitude || ""}
                  onChange={(e) => updateFormData("longitude", e.target.value)}
                  placeholder="e.g., -74.0060"
                  className="h-11 border-gray-200 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-5">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Document Uploads</h3>
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">Proof of Legal Entity *</Label>
                <div className="border-2 border-dashed border-emerald-200 rounded-xl p-8 text-center bg-emerald-50/50 hover:bg-emerald-50 transition-colors">
                  <Upload className="h-10 w-10 mx-auto mb-3 text-emerald-600" />
                  <p className="text-sm text-gray-700 mb-2 font-medium">
                    Certificate of Incorporation/NGO Registration
                  </p>
                  <p className="text-xs text-gray-500 mb-4">PDF or Image format, max 10MB</p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("legalEntity", e)}
                    className="hidden"
                    id="legalEntity"
                  />
                  <Button
                    variant="outline"
                    className="bg-white hover:bg-emerald-50 border-emerald-200 text-emerald-700"
                    onClick={() => document.getElementById("legalEntity")?.click()}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                  {uploadedFiles.legalEntity && (
                    <p className="text-xs text-emerald-600 mt-2 font-medium">✓ {uploadedFiles.legalEntity.name}</p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">Proof of Project Rights *</Label>
                <div className="border-2 border-dashed border-emerald-200 rounded-xl p-8 text-center bg-emerald-50/50 hover:bg-emerald-50 transition-colors">
                  <Upload className="h-10 w-10 mx-auto mb-3 text-emerald-600" />
                  <p className="text-sm text-gray-700 mb-2 font-medium">Land title, concession agreement, or lease</p>
                  <p className="text-xs text-gray-500 mb-4">PDF or Image format, max 10MB</p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("projectRights", e)}
                    className="hidden"
                    id="projectRights"
                  />
                  <Button
                    variant="outline"
                    className="bg-white hover:bg-emerald-50 border-emerald-200 text-emerald-700"
                    onClick={() => document.getElementById("projectRights")?.click()}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                  {uploadedFiles.projectRights && (
                    <p className="text-xs text-emerald-600 mt-2 font-medium">✓ {uploadedFiles.projectRights.name}</p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">Project Design Document (PDD) *</Label>
                <div className="border-2 border-dashed border-emerald-200 rounded-xl p-8 text-center bg-emerald-50/50 hover:bg-emerald-50 transition-colors">
                  <Upload className="h-10 w-10 mx-auto mb-3 text-emerald-600" />
                  <p className="text-sm text-gray-700 mb-2 font-medium">Project Design Document</p>
                  <p className="text-xs text-gray-500 mb-4">PDF format, max 25MB</p>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleFileUpload("pdd", e)}
                    className="hidden"
                    id="pdd"
                  />
                  <Button
                    variant="outline"
                    className="bg-white hover:bg-emerald-50 border-emerald-200 text-emerald-700"
                    onClick={() => document.getElementById("pdd")?.click()}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                  {uploadedFiles.pdd && (
                    <p className="text-xs text-emerald-600 mt-2 font-medium">✓ {uploadedFiles.pdd.name}</p>
                  )}
                  <p className="text-xs text-emerald-600 mt-3">
                    <Link href="#" className="hover:underline font-medium">
                      📄 Download PDD Template
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6 text-center">
            <div className="p-4 bg-emerald-100 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Application Summary</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Please review your information carefully. Once submitted, your application will be reviewed by our
              verification team.
            </p>
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl text-left max-w-md mx-auto border border-emerald-200">
              <h4 className="font-semibold mb-4 text-gray-900 text-center">📋 Application Details</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Organization:</span>
                  <span className="font-medium text-gray-900">{formData.legalName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium text-gray-900">{formData.orgType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Project:</span>
                  <span className="font-medium text-gray-900">{formData.projectName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Project Type:</span>
                  <span className="font-medium text-gray-900">{formData.projectType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium text-gray-900">
                    {formData.state}, {formData.country}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Documents:</span>
                  <span className="font-medium text-emerald-600">✓ All uploaded</span>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Next Steps:</strong> After submission, our verification team will review your application within
                3-5 business days. You'll receive email updates on the progress.
              </p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const renderVerifierFlow = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-5">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Auditing Firm Details</h3>
            <div className="space-y-2">
              <Label htmlFor="firmName" className="text-sm font-medium text-gray-700">
                Legal Name of Firm *
              </Label>
              <Input
                id="firmName"
                value={formData.firmName || ""}
                onChange={(e) => updateFormData("firmName", e.target.value)}
                placeholder="Enter legal firm name"
                className="h-11 border-gray-200 focus:border-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyRegNumber" className="text-sm font-medium text-gray-700">
                Company Registration Number *
              </Label>
              <Input
                id="companyRegNumber"
                value={formData.companyRegNumber || ""}
                onChange={(e) => updateFormData("companyRegNumber", e.target.value)}
                placeholder="Registration number"
                className="h-11 border-gray-200 focus:border-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="headOfficeAddress" className="text-sm font-medium text-gray-700">
                Head Office Address *
              </Label>
              <Textarea
                id="headOfficeAddress"
                value={formData.headOfficeAddress || ""}
                onChange={(e) => updateFormData("headOfficeAddress", e.target.value)}
                placeholder="Enter complete address"
                className="border-gray-200 focus:border-emerald-500 min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firmWebsite" className="text-sm font-medium text-gray-700">
                Official Website (Optional)
              </Label>
              <Input
                id="firmWebsite"
                type="url"
                value={formData.firmWebsite || ""}
                onChange={(e) => updateFormData("firmWebsite", e.target.value)}
                placeholder="https://yourfirm.com"
                className="h-11 border-gray-200 focus:border-emerald-500"
              />
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Accreditation Details</h3>
            <div className="space-y-2">
              <Label htmlFor="accreditingBody">Accrediting Body *</Label>
              <Select
                value={formData.accreditingBody || ""}
                onValueChange={(value) => updateFormData("accreditingBody", value)}
              >
                <SelectTrigger className="h-11 border-gray-200 focus:border-emerald-500">
                  <SelectValue placeholder="Select accrediting body" />
                </SelectTrigger>
                <SelectContent>
                  {accreditingBodies.map((body) => (
                    <SelectItem key={body} value={body}>
                      {body}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {formData.accreditingBody === "Other" && (
              <div className="space-y-2">
                <Label htmlFor="otherAccreditingBody">Specify Other Accrediting Body *</Label>
                <Input
                  id="otherAccreditingBody"
                  value={formData.otherAccreditingBody || ""}
                  onChange={(e) => updateFormData("otherAccreditingBody", e.target.value)}
                  placeholder="Enter accrediting body name"
                  className="h-11 border-gray-200 focus:border-emerald-500"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="accreditationId">Accreditation ID / Number *</Label>
              <Input
                id="accreditationId"
                value={formData.accreditationId || ""}
                onChange={(e) => updateFormData("accreditationId", e.target.value)}
                placeholder="Enter accreditation ID"
                className="h-11 border-gray-200 focus:border-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accreditationDate">Date of Accreditation *</Label>
              <Input
                id="accreditationDate"
                type="date"
                value={formData.accreditationDate || ""}
                onChange={(e) => updateFormData("accreditationDate", e.target.value)}
                className="h-11 border-gray-200 focus:border-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Accreditation Expiry Date *</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate || ""}
                onChange={(e) => updateFormData("expiryDate", e.target.value)}
                className="h-11 border-gray-200 focus:border-emerald-500"
              />
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-5">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Document Uploads</h3>
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">Official Accreditation Certificate *</Label>
                <div className="border-2 border-dashed border-emerald-200 rounded-xl p-8 text-center bg-emerald-50/50 hover:bg-emerald-50 transition-colors">
                  <Upload className="h-10 w-10 mx-auto mb-3 text-emerald-600" />
                  <p className="text-sm text-gray-700 mb-2 font-medium">Accreditation Certificate</p>
                  <p className="text-xs text-gray-500 mb-4">PDF or Image format, max 10MB</p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("accreditationCert", e)}
                    className="hidden"
                    id="accreditationCert"
                  />
                  <Button
                    variant="outline"
                    className="bg-white hover:bg-emerald-50 border-emerald-200 text-emerald-700"
                    onClick={() => document.getElementById("accreditationCert")?.click()}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                  {uploadedFiles.accreditationCert && (
                    <p className="text-xs text-emerald-600 mt-2 font-medium">
                      ✓ {uploadedFiles.accreditationCert.name}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">Proof of Business Registration *</Label>
                <div className="border-2 border-dashed border-emerald-200 rounded-xl p-8 text-center bg-emerald-50/50 hover:bg-emerald-50 transition-colors">
                  <Upload className="h-10 w-10 mx-auto mb-3 text-emerald-600" />
                  <p className="text-sm text-gray-700 mb-2 font-medium">Business Registration Document</p>
                  <p className="text-xs text-gray-500 mb-4">PDF or Image format, max 10MB</p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("businessReg", e)}
                    className="hidden"
                    id="businessReg"
                  />
                  <Button
                    variant="outline"
                    className="bg-white hover:bg-emerald-50 border-emerald-200 text-emerald-700"
                    onClick={() => document.getElementById("businessReg")?.click()}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                  {uploadedFiles.businessReg && (
                    <p className="text-xs text-emerald-600 mt-2 font-medium">✓ {uploadedFiles.businessReg.name}</p>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">Portfolio of Experience *</Label>
                <div className="border-2 border-dashed border-emerald-200 rounded-xl p-8 text-center bg-emerald-50/50 hover:bg-emerald-50 transition-colors">
                  <Upload className="h-10 w-10 mx-auto mb-3 text-emerald-600" />
                  <p className="text-sm text-gray-700 mb-2 font-medium">List of past projects audited</p>
                  <p className="text-xs text-gray-500 mb-4">PDF or Doc format, max 10MB</p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload("portfolio", e)}
                    className="hidden"
                    id="portfolio"
                  />
                  <Button
                    variant="outline"
                    className="bg-white hover:bg-emerald-50 border-emerald-200 text-emerald-700"
                    onClick={() => document.getElementById("portfolio")?.click()}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                  {uploadedFiles.portfolio && (
                    <p className="text-xs text-emerald-600 mt-2 font-medium">✓ {uploadedFiles.portfolio.name}</p>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">Statement of Impartiality *</Label>
                <div className="border-2 border-dashed border-emerald-200 rounded-xl p-8 text-center bg-emerald-50/50 hover:bg-emerald-50 transition-colors">
                  <Upload className="h-10 w-10 mx-auto mb-3 text-emerald-600" />
                  <p className="text-sm text-gray-700 mb-2 font-medium">Signed Statement of Impartiality</p>
                  <p className="text-xs text-gray-500 mb-4">PDF or Image format, max 10MB</p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("impartiality", e)}
                    className="hidden"
                    id="impartiality"
                  />
                  <Button
                    variant="outline"
                    className="bg-white hover:bg-emerald-50 border-emerald-200 text-emerald-700"
                    onClick={() => document.getElementById("impartiality")?.click()}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                  {uploadedFiles.impartiality && (
                    <p className="text-xs text-emerald-600 mt-2 font-medium">✓ {uploadedFiles.impartiality.name}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6 text-center">
            <div className="p-4 bg-emerald-100 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Application Summary</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Your verifier application is ready for submission. Our admin team will review your credentials.
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl text-left max-w-md mx-auto border border-blue-200">
              <h4 className="font-semibold mb-4 text-gray-900 text-center">🛡️ Verifier Details</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Firm:</span>
                  <span className="font-medium text-gray-900">{formData.firmName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Accrediting Body:</span>
                  <span className="font-medium text-gray-900">{formData.accreditingBody}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Accreditation ID:</span>
                  <span className="font-medium text-gray-900">{formData.accreditationId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Documents:</span>
                  <span className="font-medium text-emerald-600">✓ All uploaded</span>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const renderBuyerFlow = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-5">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Corporate Details</h3>
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                Legal Company Name *
              </Label>
              <Input
                id="companyName"
                value={formData.companyName || ""}
                onChange={(e) => updateFormData("companyName", e.target.value)}
                placeholder="Enter legal company name"
                className="h-11 border-gray-200 focus:border-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessRegNumber" className="text-sm font-medium text-gray-700">
                Company Registration Number *
              </Label>
              <Input
                id="businessRegNumber"
                value={formData.businessRegNumber || ""}
                onChange={(e) => updateFormData("businessRegNumber", e.target.value)}
                placeholder="Registration number"
                className="h-11 border-gray-200 focus:border-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessAddress" className="text-sm font-medium text-gray-700">
                Registered Business Address *
              </Label>
              <Textarea
                id="businessAddress"
                value={formData.businessAddress || ""}
                onChange={(e) => updateFormData("businessAddress", e.target.value)}
                placeholder="Enter complete address"
                className="border-gray-200 focus:border-emerald-500 min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyWebsite" className="text-sm font-medium text-gray-700">
                Company Website (Optional)
              </Label>
              <Input
                id="companyWebsite"
                type="url"
                value={formData.companyWebsite || ""}
                onChange={(e) => updateFormData("companyWebsite", e.target.value)}
                placeholder="https://yourcompany.com"
                className="h-11 border-gray-200 focus:border-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-sm font-medium text-gray-700">
                Industry / Sector *
              </Label>
              <Select value={formData.industry || ""} onValueChange={(value) => updateFormData("industry", value)}>
                <SelectTrigger className="h-11 border-gray-200 focus:border-emerald-500">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {formData.industry === "Other" && (
              <div className="space-y-2">
                <Label htmlFor="otherIndustry" className="text-sm font-medium text-gray-700">
                  Specify Other Industry *
                </Label>
                <Input
                  id="otherIndustry"
                  value={formData.otherIndustry || ""}
                  onChange={(e) => updateFormData("otherIndustry", e.target.value)}
                  placeholder="Describe your industry"
                  className="h-11 border-gray-200 focus:border-emerald-500"
                />
              </div>
            )}
          </div>
        )
      case 2:
        return (
          <div className="space-y-5">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Document Uploads</h3>
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">Certificate of Incorporation *</Label>
                <div className="border-2 border-dashed border-emerald-200 rounded-xl p-8 text-center bg-emerald-50/50 hover:bg-emerald-50 transition-colors">
                  <Upload className="h-10 w-10 mx-auto mb-3 text-emerald-600" />
                  <p className="text-sm text-gray-700 mb-2 font-medium">Certificate of Incorporation</p>
                  <p className="text-xs text-gray-500 mb-4">PDF or Image format, max 10MB</p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("incorporation", e)}
                    className="hidden"
                    id="incorporation"
                  />
                  <Button
                    variant="outline"
                    className="bg-white hover:bg-emerald-50 border-emerald-200 text-emerald-700"
                    onClick={() => document.getElementById("incorporation")?.click()}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                  {uploadedFiles.incorporation && (
                    <p className="text-xs text-emerald-600 mt-2 font-medium">✓ {uploadedFiles.incorporation.name}</p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">Company Tax ID Document (Optional)</Label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-gray-50/50 hover:bg-gray-50 transition-colors">
                  <Upload className="h-10 w-10 mx-auto mb-3 text-gray-500" />
                  <p className="text-sm text-gray-700 mb-2 font-medium">Tax ID Document</p>
                  <p className="text-xs text-gray-500 mb-4">PDF or Image format, max 10MB (Optional)</p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("taxId", e)}
                    className="hidden"
                    id="taxId"
                  />
                  <Button
                    variant="outline"
                    className="bg-white hover:bg-gray-50 border-gray-200 text-gray-700"
                    onClick={() => document.getElementById("taxId")?.click()}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                  {uploadedFiles.taxId && (
                    <p className="text-xs text-emerald-600 mt-2 font-medium">✓ {uploadedFiles.taxId.name}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6 text-center">
            <div className="p-4 bg-emerald-100 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Application Summary</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Your corporate buyer application is complete. You'll be able to purchase carbon credits once verified.
            </p>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl text-left max-w-md mx-auto border border-purple-200">
              <h4 className="font-semibold mb-4 text-gray-900 text-center">🏢 Corporate Details</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Company:</span>
                  <span className="font-medium text-gray-900">{formData.companyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Industry:</span>
                  <span className="font-medium text-gray-900">{formData.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Registration:</span>
                  <span className="font-medium text-gray-900">{formData.businessRegNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Documents:</span>
                  <span className="font-medium text-emerald-600">✓ Uploaded</span>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const renderCurrentStep = () => {
    switch (role) {
      case "developer":
        return renderDeveloperFlow()
      case "verifier":
        return renderVerifierFlow()
      case "buyer":
        return renderBuyerFlow()
      default:
        return <div>Invalid role selected</div>
    }
  }

  const getRoleTitle = () => {
    switch (role) {
      case "developer":
        return "Project Developer Onboarding"
      case "verifier":
        return "Verifier / Auditor Onboarding"
      case "buyer":
        return "Buyer Onboarding"
      default:
        return "Onboarding"
    }
  }

  if (!role) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p>Invalid access. Please start from the signup page.</p>
            <Link href="/signup" className="text-primary hover:underline">
              Go to Signup
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="mb-8 text-center">
          <Link
            href="/signup"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to signup
          </Link>
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-2 bg-emerald-100 rounded-xl">
              <Leaf className="h-8 w-8 text-emerald-600" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Carbon Fiesta
            </span>
          </div>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">{getRoleTitle()}</CardTitle>
            <CardDescription className="text-gray-600">
              Complete your profile to get verified and start using the platform
            </CardDescription>
            <div className="space-y-3 mt-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span className="font-medium">
                  Step {currentStep} of {getStepCount()}
                </span>
                <span className="font-medium">{Math.round(getProgressPercentage())}% complete</span>
              </div>
              <Progress value={getProgressPercentage()} className="w-full h-2 bg-gray-200" />
            </div>
          </CardHeader>
          <CardContent>
            {renderCurrentStep()}

            {errors.general && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.general}</span>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
              >
                Back
              </Button>

              {currentStep === getStepCount() ? (
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="px-8 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Submitting..." : "Submit Application"}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="px-8 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium"
                >
                  Next Step
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
