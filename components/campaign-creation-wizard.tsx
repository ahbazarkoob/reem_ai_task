"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Check, ChevronRight, Mail, MessageSquare, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Switch } from "@/components/ui/switch"

interface CampaignCreationWizardProps {
  campaignType: string
}

export function CampaignCreationWizard({ campaignType }: CampaignCreationWizardProps) {
  const [step, setStep] = useState(1)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = () => {
    // Here you would submit the campaign data
    console.log("Campaign created!")
    // Redirect to campaigns page or show success message
    window.location.href = "/campaigns"
  }

  // Get campaign type icon
  const getCampaignTypeIcon = () => {
    switch (campaignType) {
      case "call":
        return <Phone className="h-5 w-5" />
      case "sms":
        return <MessageSquare className="h-5 w-5" />
      case "email":
        return <Mail className="h-5 w-5" />
      default:
        return <Mail className="h-5 w-5" />
    }
  }

  // Get campaign type title
  const getCampaignTypeTitle = () => {
    switch (campaignType) {
      case "call":
        return "Call Campaign"
      case "sms":
        return "SMS Campaign"
      case "email":
        return "Email Campaign"
      default:
        return "Campaign"
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          {getCampaignTypeIcon()}
          <div>
            <CardTitle>{getCampaignTypeTitle()} Creation</CardTitle>
            <CardDescription>Set up your AI-driven {campaignType} campaign in a few steps</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Step indicator */}
        <div className="flex justify-between">
          <div className={`flex flex-col items-center ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"}`}
            >
              {step > 1 ? <Check className="h-4 w-4" /> : "1"}
            </div>
            <span className="text-xs mt-1">Basics</span>
          </div>
          <div className="flex-1 flex items-center">
            <div className={`h-0.5 w-full ${step > 1 ? "bg-primary" : "bg-muted"}`}></div>
          </div>
          <div className={`flex flex-col items-center ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"}`}
            >
              {step > 2 ? <Check className="h-4 w-4" /> : "2"}
            </div>
            <span className="text-xs mt-1">Audience</span>
          </div>
          <div className="flex-1 flex items-center">
            <div className={`h-0.5 w-full ${step > 2 ? "bg-primary" : "bg-muted"}`}></div>
          </div>
          <div className={`flex flex-col items-center ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"}`}
            >
              {step > 3 ? <Check className="h-4 w-4" /> : "3"}
            </div>
            <span className="text-xs mt-1">Content</span>
          </div>
          <div className="flex-1 flex items-center">
            <div className={`h-0.5 w-full ${step > 3 ? "bg-primary" : "bg-muted"}`}></div>
          </div>
          <div className={`flex flex-col items-center ${step >= 4 ? "text-primary" : "text-muted-foreground"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 4 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"}`}
            >
              {step > 4 ? <Check className="h-4 w-4" /> : "4"}
            </div>
            <span className="text-xs mt-1">Schedule</span>
          </div>
          <div className="flex-1 flex items-center">
            <div className={`h-0.5 w-full ${step > 4 ? "bg-primary" : "bg-muted"}`}></div>
          </div>
          <div className={`flex flex-col items-center ${step >= 5 ? "text-primary" : "text-muted-foreground"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 5 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"}`}
            >
              5
            </div>
            <span className="text-xs mt-1">Review</span>
          </div>
        </div>

        {/* Step 1: Campaign Basics */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="campaign-name">Campaign Name</Label>
              <Input id="campaign-name" placeholder="Enter campaign name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="campaign-description">Description</Label>
              <Textarea id="campaign-description" placeholder="Describe the purpose of this campaign" rows={3} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="branch">Branch</Label>
              <Select>
                <SelectTrigger id="branch">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  <SelectItem value="headquarters">Headquarters</SelectItem>
                  <SelectItem value="west">West Region</SelectItem>
                  <SelectItem value="east">East Region</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="campaign-tags">Tags</Label>
              <Input id="campaign-tags" placeholder="Enter tags separated by commas" />
              <p className="text-xs text-muted-foreground">Separate tags with commas (e.g., outreach, premium, q2)</p>
            </div>
          </div>
        )}

        {/* Step 2: Audience Selection */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="audience-source">Audience Source</Label>
              <Select defaultValue="existing">
                <SelectTrigger id="audience-source">
                  <SelectValue placeholder="Select audience source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="existing">Existing Contact List</SelectItem>
                  <SelectItem value="segment">Customer Segment</SelectItem>
                  <SelectItem value="import">Import New Contacts</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-list">Contact List</Label>
              <Select>
                <SelectTrigger id="contact-list">
                  <SelectValue placeholder="Select contact list" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-customers">All Customers</SelectItem>
                  <SelectItem value="premium">Premium Customers</SelectItem>
                  <SelectItem value="new-leads">New Leads (Last 30 Days)</SelectItem>
                  <SelectItem value="inactive">Inactive Customers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Filters</Label>
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="filter-location">Location</Label>
                      <Select>
                        <SelectTrigger id="filter-location">
                          <SelectValue placeholder="Any location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any location</SelectItem>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="europe">Europe</SelectItem>
                          <SelectItem value="asia">Asia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="filter-activity">Last Activity</Label>
                      <Select>
                        <SelectTrigger id="filter-activity">
                          <SelectValue placeholder="Any time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any time</SelectItem>
                          <SelectItem value="30d">Last 30 days</SelectItem>
                          <SelectItem value="90d">Last 90 days</SelectItem>
                          <SelectItem value="6m">Last 6 months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="filter-product">Product Interest</Label>
                      <Select>
                        <SelectTrigger id="filter-product">
                          <SelectValue placeholder="Any product" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any product</SelectItem>
                          <SelectItem value="basic">Basic Plan</SelectItem>
                          <SelectItem value="premium">Premium Plan</SelectItem>
                          <SelectItem value="enterprise">Enterprise Plan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="filter-status">Customer Status</Label>
                      <Select>
                        <SelectTrigger id="filter-status">
                          <SelectValue placeholder="Any status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any status</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="prospect">Prospect</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    + Add Filter
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="estimated-reach">Estimated Reach</Label>
                <span className="text-sm font-medium">1,250 contacts</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[45%]"></div>
              </div>
              <p className="text-xs text-muted-foreground">Based on your current filters and audience selection</p>
            </div>
          </div>
        )}

        {/* Step 3: Content Configuration */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="ai-agent">AI Agent</Label>
              <Select>
                <SelectTrigger id="ai-agent">
                  <SelectValue placeholder="Select AI agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales Assistant</SelectItem>
                  <SelectItem value="support">Support Assistant</SelectItem>
                  <SelectItem value="appointment">Appointment Assistant</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {campaignType === "call" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="call-script">Call Script</Label>
                  <Select>
                    <SelectTrigger id="call-script">
                      <SelectValue placeholder="Select call script" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product-upsell">Product Upsell</SelectItem>
                      <SelectItem value="appointment-reminder">Appointment Reminder</SelectItem>
                      <SelectItem value="feedback-survey">Feedback Survey</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="call-fallback">Voicemail Message</Label>
                  <Textarea
                    id="call-fallback"
                    placeholder="Message to leave if call goes to voicemail"
                    rows={3}
                    defaultValue="Hello, this is an AI assistant from Acme Inc. I'm calling about our premium features. Please call us back at your convenience or visit our website for more information."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="voice-type">Voice Type</Label>
                  <Select defaultValue="friendly-female">
                    <SelectTrigger id="voice-type">
                      <SelectValue placeholder="Select voice type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friendly-female">Friendly Female</SelectItem>
                      <SelectItem value="friendly-male">Friendly Male</SelectItem>
                      <SelectItem value="professional-female">Professional Female</SelectItem>
                      <SelectItem value="professional-male">Professional Male</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="call-transfer">Human Transfer Threshold</Label>
                    <span className="text-sm">70%</span>
                  </div>
                  <Input id="call-transfer" type="range" min="0" max="100" defaultValue="70" />
                  <p className="text-xs text-muted-foreground">
                    When AI confidence falls below this threshold, the call will be transferred to a human agent
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="call-recording" defaultChecked />
                  <Label htmlFor="call-recording">Enable Call Recording</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="call-transcription" defaultChecked />
                  <Label htmlFor="call-transcription">Enable Call Transcription</Label>
                </div>
              </div>
            )}

            {campaignType === "sms" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sms-template">SMS Template</Label>
                  <Select>
                    <SelectTrigger id="sms-template">
                      <SelectValue placeholder="Select SMS template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="promo">Promotional Offer</SelectItem>
                      <SelectItem value="reminder">Appointment Reminder</SelectItem>
                      <SelectItem value="follow-up">Follow-up Message</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sms-content">Message Content</Label>
                  <Textarea
                    id="sms-content"
                    placeholder="Enter SMS content (160 characters max)"
                    rows={3}
                    maxLength={160}
                    defaultValue="Hi {FirstName}, Acme Inc here! We're offering 20% off our premium plan just for you. Upgrade now at example.com/upgrade. Reply STOP to opt out."
                  />
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Use {"{FirstName}"} to personalize the message</span>
                    <span>123/160 characters</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="sms-opt-out" defaultChecked />
                  <Label htmlFor="sms-opt-out">Include opt-out information</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="sms-url-shortening" defaultChecked />
                  <Label htmlFor="sms-url-shortening">Enable URL shortening</Label>
                </div>
              </div>
            )}

            {campaignType === "email" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-template">Email Template</Label>
                  <Select>
                    <SelectTrigger id="email-template">
                      <SelectValue placeholder="Select email template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newsletter">Newsletter</SelectItem>
                      <SelectItem value="promo">Promotional</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-subject">Subject Line</Label>
                  <Input id="email-subject" defaultValue="Special offer just for you, {FirstName}" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-sender">Sender Information</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input id="email-sender-name" placeholder="Sender Name" defaultValue="Acme Inc" />
                    <Input id="email-sender-email" placeholder="Sender Email" defaultValue="marketing@acmeinc.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-content">Email Content</Label>
                  <Textarea
                    id="email-content"
                    placeholder="Enter email content or use the visual editor"
                    rows={6}
                    defaultValue="Dear {FirstName},

We hope you're enjoying your experience with Acme Inc. We wanted to let you know about some exciting new premium features that we think would be perfect for you based on your usage.

For a limited time, we're offering a 20% discount on our premium plan.

[Button: Upgrade Now]

Best regards,
The Acme Inc Team"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="email-tracking" defaultChecked />
                  <Label htmlFor="email-tracking">Enable email tracking</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="email-personalize" defaultChecked />
                  <Label htmlFor="email-personalize">Use AI to personalize content for each recipient</Label>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="ai-personalization">AI Personalization Level</Label>
              <Select defaultValue="medium">
                <SelectTrigger id="ai-personalization">
                  <SelectValue placeholder="Select personalization level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Basic (Name, Company)</SelectItem>
                  <SelectItem value="medium">Standard (+ Purchase History, Preferences)</SelectItem>
                  <SelectItem value="high">Advanced (+ Behavioral Analysis, Predictive)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Higher personalization may improve engagement but requires more processing time
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Schedule */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Select start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Select end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Contact Frequency</Label>
              <Select defaultValue="optimal">
                <SelectTrigger id="frequency">
                  <SelectValue placeholder="Select contact frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="once">One time only</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="optimal">AI-optimized timing</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                AI-optimized timing uses machine learning to determine the best time to contact each recipient
              </p>
            </div>

            {campaignType === "call" && (
              <div className="space-y-2">
                <Label htmlFor="call-hours">Call Hours</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="call-start-time" className="text-xs">
                      Start Time
                    </Label>
                    <Select defaultValue="9">
                      <SelectTrigger id="call-start-time">
                        <SelectValue placeholder="Start time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }).map((_, i) => (
                          <SelectItem key={i} value={`${i + 8}`}>
                            {i + 8}:00 {i + 8 < 12 ? "AM" : "PM"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="call-end-time" className="text-xs">
                      End Time
                    </Label>
                    <Select defaultValue="17">
                      <SelectTrigger id="call-end-time">
                        <SelectValue placeholder="End time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }).map((_, i) => (
                          <SelectItem key={i} value={`${i + 8}`}>
                            {i + 8}:00 {i + 8 < 12 ? "AM" : "PM"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Days of Week</Label>
              <div className="flex flex-wrap gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Switch id={`day-${day.toLowerCase()}`} defaultChecked={index < 5} />
                    <Label htmlFor={`day-${day.toLowerCase()}`}>{day}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="throttling">Throttling</Label>
                <span className="text-sm">100 contacts/hour</span>
              </div>
              <Input id="throttling" type="range" min="10" max="500" step="10" defaultValue="100" />
              <p className="text-xs text-muted-foreground">
                Limit the number of contacts per hour to avoid overwhelming your team or systems
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="auto-pause" defaultChecked />
              <Label htmlFor="auto-pause">Enable AI-driven auto-pause based on performance metrics</Label>
            </div>
          </div>
        )}

        {/* Step 5: Review */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">Campaign Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Name:</p>
                  <p className="font-medium">Q2 Customer Outreach</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Type:</p>
                  <p className="font-medium capitalize">{campaignType}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Branch:</p>
                  <p className="font-medium">Headquarters</p>
                </div>
                <div>
                  <p className="text-muted-foreground">AI Agent:</p>
                  <p className="font-medium">Sales Assistant</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Start Date:</p>
                  <p className="font-medium">{startDate ? format(startDate, "PPP") : "Not set"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">End Date:</p>
                  <p className="font-medium">{endDate ? format(endDate, "PPP") : "Not set"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Audience:</p>
                  <p className="font-medium">Premium Customers</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Estimated Reach:</p>
                  <p className="font-medium">1,250 contacts</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">Content Preview</h3>
              {campaignType === "call" && (
                <div className="text-sm space-y-2">
                  <p className="text-muted-foreground">Script:</p>
                  <p>Product Upsell</p>
                  <p className="text-muted-foreground mt-2">Introduction:</p>
                  <p className="text-sm">
                    "Hello, this is [AI_NAME] from Acme Inc. I hope you're enjoying our service. I'm calling to tell you
                    about some exciting premium features that could enhance your experience."
                  </p>
                </div>
              )}
              {campaignType === "sms" && (
                <div className="text-sm space-y-2">
                  <p className="text-muted-foreground">Template:</p>
                  <p>Promotional Offer</p>
                  <p className="text-muted-foreground mt-2">Message:</p>
                  <p className="text-sm">
                    "Hi {"{FirstName}"}, Acme Inc here! We're offering 20% off our premium plan just for you. Upgrade
                    now at example.com/upgrade. Reply STOP to opt out."
                  </p>
                </div>
              )}
              {campaignType === "email" && (
                <div className="text-sm space-y-2">
                  <p className="text-muted-foreground">Template:</p>
                  <p>Promotional</p>
                  <p className="text-muted-foreground mt-2">Subject:</p>
                  <p className="text-sm">Special offer just for you, {"{FirstName}"}</p>
                  <p className="text-muted-foreground mt-2">Preview:</p>
                  <div className="border rounded p-2 text-xs">
                    <p>Dear {"{FirstName}"},</p>
                    <p className="mt-2">
                      We hope you're enjoying your experience with Acme Inc. We wanted to let you know about some
                      exciting new premium features that we think would be perfect for you based on your usage.
                    </p>
                    <p className="mt-2">For a limited time, we're offering a 20% discount on our premium plan.</p>
                    <p className="mt-2">[Button: Upgrade Now]</p>
                    <p className="mt-2">
                      Best regards,
                      <br />
                      The Acme Inc Team
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">Schedule</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Frequency:</p>
                  <p className="font-medium">AI-optimized timing</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Days:</p>
                  <p className="font-medium">Mon, Tue, Wed, Thu, Fri</p>
                </div>
                {campaignType === "call" && (
                  <>
                    <div>
                      <p className="text-muted-foreground">Call Hours:</p>
                      <p className="font-medium">9:00 AM - 5:00 PM</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Throttling:</p>
                      <p className="font-medium">100 contacts/hour</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="activate-immediately" defaultChecked />
              <Label htmlFor="activate-immediately">Activate campaign immediately after creation</Label>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 ? (
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
        ) : (
          <div></div>
        )}
        {step < 5 ? (
          <Button onClick={handleNext}>
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit}>Create Campaign</Button>
        )}
      </CardFooter>
    </Card>
  )
}
