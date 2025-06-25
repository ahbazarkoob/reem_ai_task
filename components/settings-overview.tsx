"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { Building, CreditCard, Users, Moon, Sun, Shield, Key, Smartphone, Trash2, Download, Upload } from "lucide-react"

export function SettingsOverview() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [emailDigest, setEmailDigest] = useState(true)
  const [smsAlerts, setSmsAlerts] = useState(false)
  const [autoSave, setAutoSave] = useState(true)
  const [compactView, setCompactView] = useState(false)
  const [language, setLanguage] = useState("en-US")
  const [timezone, setTimezone] = useState("America/New_York")
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY")
  const [timeFormat, setTimeFormat] = useState("12h")
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState("30")
  const [dataRetention, setDataRetention] = useState("90")

  const handleSaveGeneral = () => {
    toast({
      title: "Settings saved",
      description: "Your general settings have been updated successfully.",
    })
  }

  const handleSaveAppearance = () => {
    toast({
      title: "Appearance updated",
      description: "Your appearance settings have been updated successfully.",
    })
  }

  const handleSaveLocalization = () => {
    toast({
      title: "Localization updated",
      description: "Your localization settings have been updated successfully.",
    })
  }

  const handleSaveSecurity = () => {
    toast({
      title: "Security settings updated",
      description: "Your security settings have been updated successfully.",
    })
  }

  const handleSaveData = () => {
    toast({
      title: "Data settings updated",
      description: "Your data management settings have been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Company Settings Card */}
        <Link href="/settings/company" className="block">
          <Card className="h-full hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Company Settings</CardTitle>
              <Building className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage your company profile, branding, business hours, and notification preferences.
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* User Management Card */}
        <Link href="/settings/users" className="block">
          <Card className="h-full hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">User Management</CardTitle>
              <Users className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage users, roles, permissions, and team structures within your organization.
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Billing & Subscription Card */}
        <Link href="/settings/billing" className="block">
          <Card className="h-full hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Billing & Subscription</CardTitle>
              <CreditCard className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage your subscription plan, payment methods, invoices, and usage limits.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full max-w-4xl">
          <TabsTrigger value="general" className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100">General</TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100">Appearance</TabsTrigger>
          <TabsTrigger value="localization" className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100">Localization</TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100">Security</TabsTrigger>
          <TabsTrigger value="data" className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100">Data Management</TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your general application preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications">Notifications</Label>
                    <p className="text-sm text-muted-foreground">Enable in-app notifications</p>
                  </div>
                  <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-digest">Email Digest</Label>
                    <p className="text-sm text-muted-foreground">Receive daily email summaries</p>
                  </div>
                  <Switch id="email-digest" checked={emailDigest} onCheckedChange={setEmailDigest} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-alerts">SMS Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
                  </div>
                  <Switch id="sms-alerts" checked={smsAlerts} onCheckedChange={setSmsAlerts} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-save">Auto-Save</Label>
                    <p className="text-sm text-muted-foreground">Automatically save changes</p>
                  </div>
                  <Switch id="auto-save" checked={autoSave} onCheckedChange={setAutoSave} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="compact-view">Compact View</Label>
                    <p className="text-sm text-muted-foreground">Use compact layout for tables and lists</p>
                  </div>
                  <Switch id="compact-view" checked={compactView} onCheckedChange={setCompactView} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-page">Default Landing Page</Label>
                  <Select defaultValue="dashboard">
                    <SelectTrigger id="default-page">
                      <SelectValue placeholder="Select default page" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dashboard">Dashboard</SelectItem>
                      <SelectItem value="campaigns">Campaigns</SelectItem>
                      <SelectItem value="contacts">Contacts</SelectItem>
                      <SelectItem value="calls">Calls</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Choose which page to show after login</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneral}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Use dark color scheme</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4 text-muted-foreground" />
                    <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
                    <Moon className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme-color">Theme Color</Label>
                  <div className="grid grid-cols-5 gap-2">
                    <div className="flex flex-col items-center space-y-1.5">
                      <button
                        className="w-8 h-8 rounded-full bg-violet-500 ring-2 ring-offset-2 ring-violet-500 focus:outline-none"
                        aria-label="Violet theme"
                      />
                      <span className="text-xs">Violet</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1.5">
                      <button
                        className="w-8 h-8 rounded-full bg-emerald-500 focus:outline-none"
                        aria-label="Emerald theme"
                      />
                      <span className="text-xs">Emerald</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1.5">
                      <button className="w-8 h-8 rounded-full bg-rose-500 focus:outline-none" aria-label="Rose theme" />
                      <span className="text-xs">Rose</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1.5">
                      <button
                        className="w-8 h-8 rounded-full bg-amber-500 focus:outline-none"
                        aria-label="Amber theme"
                      />
                      <span className="text-xs">Amber</span>
                    </div>
                    <div className="flex flex-col items-center space-y-1.5">
                      <button
                        className="w-8 h-8 rounded-full bg-slate-700 focus:outline-none"
                        aria-label="Slate theme"
                      />
                      <span className="text-xs">Slate</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="font-size">Font Size</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="font-size">
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sidebar-position">Sidebar Position</Label>
                  <Select defaultValue="left">
                    <SelectTrigger id="sidebar-position">
                      <SelectValue placeholder="Select sidebar position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="animation">Animation Level</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="animation">
                      <SelectValue placeholder="Select animation level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Control the amount of animations in the interface</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveAppearance}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Localization Tab */}
        <TabsContent value="localization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Localization Settings</CardTitle>
              <CardDescription>Configure language, timezone, and format preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language" className="w-full">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="en-GB">English (UK)</SelectItem>
                      <SelectItem value="es-ES">Spanish</SelectItem>
                      <SelectItem value="fr-FR">French</SelectItem>
                      <SelectItem value="de-DE">German</SelectItem>
                      <SelectItem value="ja-JP">Japanese</SelectItem>
                      <SelectItem value="zh-CN">Chinese (Simplified)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger id="timezone" className="w-full">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (US & Canada)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (US & Canada)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (US & Canada)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (US & Canada)</SelectItem>
                      <SelectItem value="Europe/London">London</SelectItem>
                      <SelectItem value="Europe/Paris">Paris</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                      <SelectItem value="Australia/Sydney">Sydney</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select value={dateFormat} onValueChange={setDateFormat}>
                    <SelectTrigger id="date-format" className="w-full">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      <SelectItem value="MMM D, YYYY">MMM D, YYYY</SelectItem>
                      <SelectItem value="D MMM YYYY">D MMM YYYY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time-format">Time Format</Label>
                  <Select value={timeFormat} onValueChange={setTimeFormat}>
                    <SelectTrigger id="time-format" className="w-full">
                      <SelectValue placeholder="Select time format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12-hour (1:30 PM)</SelectItem>
                      <SelectItem value="24h">24-hour (13:30)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue="USD">
                    <SelectTrigger id="currency" className="w-full">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">US Dollar ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                      <SelectItem value="GBP">British Pound (£)</SelectItem>
                      <SelectItem value="JPY">Japanese Yen (¥)</SelectItem>
                      <SelectItem value="CAD">Canadian Dollar (C$)</SelectItem>
                      <SelectItem value="AUD">Australian Dollar (A$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="first-day">First Day of Week</Label>
                  <Select defaultValue="sunday">
                    <SelectTrigger id="first-day" className="w-full">
                      <SelectValue placeholder="Select first day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sunday">Sunday</SelectItem>
                      <SelectItem value="monday">Monday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveLocalization}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and authentication options.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require a verification code when logging in</p>
                  </div>
                  <Switch id="two-factor" checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
                </div>

                {twoFactorAuth && (
                  <div className="rounded-md bg-muted p-4">
                    <div className="flex">
                      <Shield className="h-5 w-5 text-muted-foreground mr-2" />
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Two-factor authentication is enabled</p>
                        <p className="text-sm text-muted-foreground">
                          You will be asked for a verification code when logging in from a new device or browser.
                        </p>
                        <div className="flex space-x-2 pt-1">
                          <Button variant="outline" size="sm">
                            <Smartphone className="h-4 w-4 mr-2" />
                            Setup App
                          </Button>
                          <Button variant="outline" size="sm">
                            <Key className="h-4 w-4 mr-2" />
                            Backup Codes
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout</Label>
                  <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                    <SelectTrigger id="session-timeout" className="w-full">
                      <SelectValue placeholder="Select timeout period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                      <SelectItem value="480">8 hours</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Automatically log out after period of inactivity</p>
                </div>

                <div className="space-y-2">
                  <Label>Login History</Label>
                  <div className="rounded-md border">
                    <div className="p-4 border-b">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Chrome on Windows</p>
                          <p className="text-sm text-muted-foreground">New York, USA (192.168.1.1)</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">Current session</p>
                          <p className="text-xs text-muted-foreground">May 22, 2025, 4:42 PM</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-b">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Safari on macOS</p>
                          <p className="text-sm text-muted-foreground">San Francisco, USA (192.168.1.2)</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">Active</p>
                          <p className="text-xs text-muted-foreground">May 21, 2025, 2:15 PM</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Firefox on Ubuntu</p>
                          <p className="text-sm text-muted-foreground">London, UK (192.168.1.3)</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">Expired</p>
                          <p className="text-xs text-muted-foreground">May 18, 2025, 9:30 AM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      View All Sessions
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Password</Label>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                    <Button variant="outline" size="sm">
                      Change Password
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSecurity}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Data Management Tab */}
        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Control your data storage, retention, and export options.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="data-retention">Data Retention Period</Label>
                  <Select value={dataRetention} onValueChange={setDataRetention}>
                    <SelectTrigger id="data-retention" className="w-full">
                      <SelectValue placeholder="Select retention period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">6 months</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                      <SelectItem value="730">2 years</SelectItem>
                      <SelectItem value="forever">Forever</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Automatically delete data older than the selected period
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Storage Usage</Label>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Call Recordings</span>
                      <span className="font-medium">2.4 GB / 10 GB</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full w-[24%]" />
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between text-sm">
                      <span>Contact Data</span>
                      <span className="font-medium">156 MB / 1 GB</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full w-[15%]" />
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between text-sm">
                      <span>Campaign Assets</span>
                      <span className="font-medium">3.2 GB / 5 GB</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full w-[64%]" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Data Export</Label>
                  <p className="text-sm text-muted-foreground">
                    Export your data in various formats for backup or analysis
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export Contacts
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export Campaigns
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export Call History
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export All Data
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Data Import</Label>
                  <p className="text-sm text-muted-foreground">Import data from external sources or backups</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Import Contacts
                    </Button>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Import Campaigns
                    </Button>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Restore from Backup
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className="text-destructive">Danger Zone</Label>
                  <div className="rounded-md border border-destructive/20 p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Clear All Data</h4>
                          <p className="text-sm text-muted-foreground">
                            Remove all your data from the system. This cannot be undone.
                          </p>
                        </div>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Clear Data
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Delete Account</h4>
                          <p className="text-sm text-muted-foreground">
                            Permanently delete your account and all associated data.
                          </p>
                        </div>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveData}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
