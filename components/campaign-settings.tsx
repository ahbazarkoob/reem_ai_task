"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, MessageSquare, Phone, Save, Trash } from "lucide-react"

interface CampaignSettingsProps {
  campaignType: string
}

export function CampaignSettings({ campaignType }: CampaignSettingsProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Campaign Settings</h3>
        <div className="flex gap-2">
          <Button variant="outline">
            <Trash className="mr-2 h-4 w-4" />
            Delete Campaign
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="ai">AI Configuration</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic campaign configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input id="campaign-name" defaultValue="Q2 Customer Outreach" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="campaign-description">Description</Label>
                <Textarea
                  id="campaign-description"
                  rows={3}
                  defaultValue="Quarterly outreach to existing customers to introduce new premium features and gather feedback."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="campaign-type">Campaign Type</Label>
                  <Select defaultValue={campaignType}>
                    <SelectTrigger id="campaign-type">
                      <SelectValue placeholder="Select campaign type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="call" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" /> Call
                      </SelectItem>
                      <SelectItem value="sms" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" /> SMS
                      </SelectItem>
                      <SelectItem value="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" /> Email
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Select defaultValue="headquarters">
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="campaign-tags">Tags</Label>
                <Input id="campaign-tags" defaultValue="outreach, premium, q2" />
                <p className="text-xs text-muted-foreground">Separate tags with commas</p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="campaign-active" defaultChecked />
                <Label htmlFor="campaign-active">Campaign Active</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Channel-Specific Settings</CardTitle>
              <CardDescription>Configure settings specific to this campaign type</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {campaignType === "call" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="call-script">Call Script</Label>
                    <Select defaultValue="product-upsell">
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

                  <div className="flex items-center space-x-2">
                    <Switch id="call-recording" defaultChecked />
                    <Label htmlFor="call-recording">Enable Call Recording</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="call-transcription" defaultChecked />
                    <Label htmlFor="call-transcription">Enable Call Transcription</Label>
                  </div>
                </>
              )}

              {campaignType === "sms" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="sms-template">SMS Template</Label>
                    <Select defaultValue="promo">
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
                </>
              )}

              {campaignType === "email" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email-template">Email Template</Label>
                    <Select defaultValue="promo">
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

                  <div className="flex items-center space-x-2">
                    <Switch id="email-tracking" defaultChecked />
                    <Label htmlFor="email-tracking">Enable email tracking</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="email-personalize" defaultChecked />
                    <Label htmlFor="email-personalize">Use AI to personalize content for each recipient</Label>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Agent Configuration</CardTitle>
              <CardDescription>Configure the AI agent for this campaign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ai-agent">AI Agent</Label>
                <Select defaultValue="sales">
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

              {campaignType === "call" && (
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
              )}

              <div className="space-y-2">
                <Label htmlFor="ai-response-handling">Response Handling</Label>
                <Select defaultValue="adaptive">
                  <SelectTrigger id="ai-response-handling">
                    <SelectValue placeholder="Select response handling" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scripted">Strictly Scripted</SelectItem>
                    <SelectItem value="guided">Script-Guided</SelectItem>
                    <SelectItem value="adaptive">Fully Adaptive</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Determines how closely the AI follows the script vs. adapting to responses
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ai-learning">AI Learning Mode</Label>
                <Select defaultValue="active">
                  <SelectTrigger id="ai-learning">
                    <SelectValue placeholder="Select learning mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="disabled">Disabled</SelectItem>
                    <SelectItem value="passive">Passive Learning</SelectItem>
                    <SelectItem value="active">Active Learning</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Controls how the AI learns and improves from interactions
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="ai-sentiment-analysis" defaultChecked />
                <Label htmlFor="ai-sentiment-analysis">Enable sentiment analysis</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="ai-intent-detection" defaultChecked />
                <Label htmlFor="ai-intent-detection">Enable intent detection</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Human Handoff Settings</CardTitle>
              <CardDescription>Configure when and how to transfer to human agents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="human-transfer-threshold">Human Transfer Threshold</Label>
                  <span className="text-sm">70%</span>
                </div>
                <Input id="human-transfer-threshold" type="range" min="0" max="100" defaultValue="70" />
                <p className="text-xs text-muted-foreground">
                  When AI confidence falls below this threshold, the interaction will be transferred to a human agent
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transfer-conditions">Transfer Conditions</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="transfer-negative-sentiment" defaultChecked />
                    <Label htmlFor="transfer-negative-sentiment">Negative sentiment detected</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="transfer-complex-query" defaultChecked />
                    <Label htmlFor="transfer-complex-query">Complex query detected</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="transfer-explicit-request" defaultChecked />
                    <Label htmlFor="transfer-explicit-request">Explicit request for human</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="transfer-high-value" defaultChecked />
                    <Label htmlFor="transfer-high-value">High-value customer</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transfer-message">Transfer Message</Label>
                <Textarea
                  id="transfer-message"
                  rows={3}
                  defaultValue="I'll connect you with a human agent who can better assist you with this. Please hold for just a moment."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure notifications for this campaign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Campaign Status Notifications</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-start" defaultChecked />
                    <Label htmlFor="notify-start">Campaign start</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-end" defaultChecked />
                    <Label htmlFor="notify-end">Campaign end</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-pause" defaultChecked />
                    <Label htmlFor="notify-pause">Campaign pause/resume</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Performance Notifications</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-milestone" defaultChecked />
                    <Label htmlFor="notify-milestone">Milestone reached</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-performance-drop" defaultChecked />
                    <Label htmlFor="notify-performance-drop">Performance drop</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-daily-summary" defaultChecked />
                    <Label htmlFor="notify-daily-summary">Daily summary</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Notification Recipients</Label>
                <Textarea
                  placeholder="Enter email addresses, separated by commas"
                  rows={2}
                  defaultValue="marketing@acmeinc.com, john.smith@acmeinc.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-channel">Notification Channel</Label>
                <Select defaultValue="email">
                  <SelectTrigger id="notification-channel">
                    <SelectValue placeholder="Select notification channel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="slack">Slack</SelectItem>
                    <SelectItem value="all">All Channels</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>Configure third-party integrations for this campaign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>CRM Integration</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="crm-sync" defaultChecked />
                    <Label htmlFor="crm-sync">Sync campaign data with CRM</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="crm-contacts" defaultChecked />
                    <Label htmlFor="crm-contacts">Update contact records in CRM</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="crm-activities" defaultChecked />
                    <Label htmlFor="crm-activities">Log activities in CRM</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Analytics Integration</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="analytics-tracking" defaultChecked />
                    <Label htmlFor="analytics-tracking">Enable analytics tracking</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="analytics-utm" defaultChecked />
                    <Label htmlFor="analytics-utm">Add UTM parameters to links</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Calendar Integration</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="calendar-sync" defaultChecked />
                    <Label htmlFor="calendar-sync">Sync appointments with calendar</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="calendar-availability" defaultChecked />
                    <Label htmlFor="calendar-availability">Check availability before scheduling</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input
                  id="webhook-url"
                  placeholder="Enter webhook URL for custom integrations"
                  defaultValue="https://api.acmeinc.com/webhooks/campaigns"
                />
                <p className="text-xs text-muted-foreground">Campaign events will be sent to this URL in real-time</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
