"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Check, FileSpreadsheet, Upload, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function ContactImport() {
  const [currentStep, setCurrentStep] = useState(1)
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [importComplete, setImportComplete] = useState(false)
  const [importResults, setImportResults] = useState({
    total: 0,
    success: 0,
    skipped: 0,
    errors: 0,
  })

  // Mock field mapping data
  const fieldMappings = [
    { csvField: "First Name", contactField: "firstName", required: true },
    { csvField: "Last Name", contactField: "lastName", required: true },
    { csvField: "Email", contactField: "email", required: true },
    { csvField: "Phone", contactField: "phone", required: false },
    { csvField: "Company", contactField: "company", required: false },
    { csvField: "Job Title", contactField: "jobTitle", required: false },
    { csvField: "Address", contactField: "address", required: false },
    { csvField: "City", contactField: "city", required: false },
    { csvField: "State", contactField: "state", required: false },
    { csvField: "Zip", contactField: "zip", required: false },
    { csvField: "Country", contactField: "country", required: false },
    { csvField: "Tags", contactField: "tags", required: false },
  ]

  // Mock preview data
  const previewData = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      company: "Acme Inc",
      jobTitle: "Marketing Manager",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 987-6543",
      company: "Globex Corp",
      jobTitle: "Sales Director",
    },
    {
      firstName: "Robert",
      lastName: "Johnson",
      email: "robert.johnson@example.com",
      phone: "+1 (555) 456-7890",
      company: "Initech",
      jobTitle: "Product Manager",
    },
    {
      firstName: "Emily",
      lastName: "Davis",
      email: "emily.davis@example.com",
      phone: "+1 (555) 789-0123",
      company: "Umbrella Corp",
      jobTitle: "CEO",
    },
    {
      firstName: "Michael",
      lastName: "Wilson",
      email: "michael.wilson@example.com",
      phone: "+1 (555) 321-6547",
      company: "Stark Industries",
      jobTitle: "Software Engineer",
    },
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }

    // Simulate import process
    if (currentStep === 3) {
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(timer)
            setImportComplete(true)
            setImportResults({
              total: 250,
              success: 235,
              skipped: 10,
              errors: 5,
            })
            return 100
          }
          return prevProgress + 5
        })
      }, 200)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Tabs value={`step-${currentStep}`} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="step-1" disabled>
              1. Upload File
            </TabsTrigger>
            <TabsTrigger value="step-2" disabled>
              2. Map Fields
            </TabsTrigger>
            <TabsTrigger value="step-3" disabled>
              3. Preview
            </TabsTrigger>
            <TabsTrigger value="step-4" disabled>
              4. Import
            </TabsTrigger>
          </TabsList>

          <TabsContent value="step-1" className="mt-6 space-y-4">
            <div
              className="border-2 border-dashed rounded-lg p-10 text-center cursor-pointer hover:bg-muted/50 transition-colors"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <FileSpreadsheet className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Upload your CSV or Excel file</h3>
              <p className="text-sm text-muted-foreground mb-4">Drag and drop your file here, or click to browse</p>
              <Input
                id="file-upload"
                type="file"
                accept=".csv,.xlsx,.xls"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  document.getElementById("file-upload")?.click()
                }}
              >
                <Upload className="mr-2 h-4 w-4" />
                Select File
              </Button>
            </div>

            {file && (
              <div className="bg-muted/50 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                  <FileSpreadsheet className="h-8 w-8 mr-2 text-primary" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                Your CSV file should include headers in the first row. Required fields include first name, last name,
                and email address.
              </AlertDescription>
            </Alert>

            <div className="flex justify-end space-x-2 mt-6">
              <Button onClick={handleNextStep} disabled={!file}>
                Next Step
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="step-2" className="mt-6 space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Map CSV Fields to Contact Fields</h3>
              <p className="text-sm text-muted-foreground">
                Match the columns from your CSV file to the appropriate contact fields
              </p>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>CSV Column</TableHead>
                      <TableHead>Contact Field</TableHead>
                      <TableHead className="w-[100px]">Required</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fieldMappings.map((mapping, index) => (
                      <TableRow key={index}>
                        <TableCell>{mapping.csvField}</TableCell>
                        <TableCell>
                          <Select defaultValue={mapping.contactField}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select field" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="firstName">First Name</SelectItem>
                              <SelectItem value="lastName">Last Name</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="phone">Phone</SelectItem>
                              <SelectItem value="company">Company</SelectItem>
                              <SelectItem value="jobTitle">Job Title</SelectItem>
                              <SelectItem value="address">Address</SelectItem>
                              <SelectItem value="city">City</SelectItem>
                              <SelectItem value="state">State</SelectItem>
                              <SelectItem value="zip">Zip</SelectItem>
                              <SelectItem value="country">Country</SelectItem>
                              <SelectItem value="tags">Tags</SelectItem>
                              <SelectItem value="skip">Skip this column</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          {mapping.required ? (
                            <Badge>Required</Badge>
                          ) : (
                            <span className="text-muted-foreground">Optional</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handlePreviousStep}>
                Previous Step
              </Button>
              <Button onClick={handleNextStep}>Next Step</Button>
            </div>
          </TabsContent>

          <TabsContent value="step-3" className="mt-6 space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Preview Import Data</h3>
              <p className="text-sm text-muted-foreground">Review the first 5 rows of data before importing</p>

              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>First Name</TableHead>
                      <TableHead>Last Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Job Title</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {previewData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.firstName}</TableCell>
                        <TableCell>{row.lastName}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.phone}</TableCell>
                        <TableCell>{row.company}</TableCell>
                        <TableCell>{row.jobTitle}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="update-existing" />
                  <Label htmlFor="update-existing">Update existing contacts if email matches</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="add-tag" />
                  <Label htmlFor="add-tag">Add tag to imported contacts</Label>
                </div>
                <div className="pl-6">
                  <Input placeholder="Enter tag name (e.g., 'June Import')" disabled={true} />
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handlePreviousStep}>
                Previous Step
              </Button>
              <Button onClick={handleNextStep}>Start Import</Button>
            </div>
          </TabsContent>

          <TabsContent value="step-4" className="mt-6 space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">{importComplete ? "Import Complete" : "Importing Contacts..."}</h3>
              <p className="text-sm text-muted-foreground">
                {importComplete
                  ? "Your contacts have been successfully imported"
                  : "Please wait while we import your contacts"}
              </p>

              {!importComplete ? (
                <div className="space-y-2">
                  <Progress value={progress} className="h-2 w-full" />
                  <p className="text-sm text-right text-muted-foreground">{progress}% complete</p>
                </div>
              ) : (
                <div className="rounded-md border p-6 bg-muted/50">
                  <div className="flex items-center justify-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-medium mb-2">Import Successful</h4>
                    <p className="text-muted-foreground">Your contacts have been imported into your database</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-4 rounded-md bg-background">
                      <p className="text-sm text-muted-foreground">Total Processed</p>
                      <p className="text-2xl font-bold">{importResults.total}</p>
                    </div>
                    <div className="p-4 rounded-md bg-background">
                      <p className="text-sm text-muted-foreground">Successfully Added</p>
                      <p className="text-2xl font-bold text-green-600">{importResults.success}</p>
                    </div>
                    <div className="p-4 rounded-md bg-background">
                      <p className="text-sm text-muted-foreground">Skipped</p>
                      <p className="text-2xl font-bold text-amber-600">{importResults.skipped}</p>
                    </div>
                    <div className="p-4 rounded-md bg-background">
                      <p className="text-sm text-muted-foreground">Errors</p>
                      <p className="text-2xl font-bold text-red-600">{importResults.errors}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-6">
              {importComplete ? (
                <>
                  <Button variant="outline" asChild>
                    <a href="/contacts">Back to Contacts</a>
                  </Button>
                  <Button asChild>
                    <a href="/contacts/import">Import More Contacts</a>
                  </Button>
                </>
              ) : (
                <Button variant="outline" disabled>
                  Cancel Import
                </Button>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
