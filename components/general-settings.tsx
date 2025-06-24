"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { Bell, Mail, Phone, Settings, Eye, Save, Clock } from "lucide-react"

const generalFormSchema = z.object({
  notifications: z.boolean().default(true),
  emailDigest: z.boolean().default(true),
  smsAlerts: z.boolean().default(false),
  autoSave: z.boolean().default(true),
  compactView: z.boolean().default(false),
  defaultPage: z.string().default("dashboard"),
  callTimeout: z.string().default("60"),
  emailSignature: z.string().optional(),
  phoneNumber: z.string().optional(),
})

export function GeneralSettings() {
  const form = useForm<z.infer<typeof generalFormSchema>>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      notifications: true,
      emailDigest: true,
      smsAlerts: false,
      autoSave: true,
      compactView: false,
      defaultPage: "dashboard",
      callTimeout: "60",
      emailSignature: "Sent from AI Campaign Dashboard",
      phoneNumber: "+1 (555) 123-4567",
    },
  })

  function onSubmit(values: z.infer<typeof generalFormSchema>) {
    toast({
      title: "Settings updated",
      description: "Your general settings have been updated successfully.",
    })
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Configure how and when you receive notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="notifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Bell className="mr-2 h-4 w-4 text-muted-foreground" />
                      <FormLabel className="text-base">In-App Notifications</FormLabel>
                    </div>
                    <FormDescription>Receive notifications within the application</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emailDigest"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      <FormLabel className="text-base">Email Digest</FormLabel>
                    </div>
                    <FormDescription>Receive daily email summaries of activities</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="smsAlerts"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      <FormLabel className="text-base">SMS Alerts</FormLabel>
                    </div>
                    <FormDescription>Receive critical alerts via SMS</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interface Preferences</CardTitle>
            <CardDescription>Customize how the application interface behaves.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="autoSave"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Save className="mr-2 h-4 w-4 text-muted-foreground" />
                      <FormLabel className="text-base">Auto-Save</FormLabel>
                    </div>
                    <FormDescription>Automatically save changes as you make them</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="compactView"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Eye className="mr-2 h-4 w-4 text-muted-foreground" />
                      <FormLabel className="text-base">Compact View</FormLabel>
                    </div>
                    <FormDescription>Use compact layout for tables and lists</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="defaultPage"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                    <FormLabel>Default Landing Page</FormLabel>
                  </div>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select default page" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="dashboard">Dashboard</SelectItem>
                      <SelectItem value="campaigns">Campaigns</SelectItem>
                      <SelectItem value="contacts">Contacts</SelectItem>
                      <SelectItem value="calls">Calls</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Choose which page to show after login</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <FormField
              control={form.control}
              name="callTimeout"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <FormLabel>Call Timeout (seconds)</FormLabel>
                  </div>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeout duration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">60 seconds</SelectItem>
                      <SelectItem value="90">90 seconds</SelectItem>
                      <SelectItem value="120">120 seconds</SelectItem>
                      <SelectItem value="180">180 seconds</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Maximum time to wait for call connection</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Communication Settings</CardTitle>
            <CardDescription>Configure your communication preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="emailSignature"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                    <FormLabel>Email Signature</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="Enter your email signature" {...field} />
                  </FormControl>
                  <FormDescription>This will be appended to all outgoing emails</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                    <FormLabel>Default Phone Number</FormLabel>
                  </div>
                  <FormControl>
                    <Input placeholder="Enter your default phone number" {...field} />
                  </FormControl>
                  <FormDescription>Used for outgoing calls and SMS</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
