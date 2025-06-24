"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { TimePickerDemo } from "@/components/time-picker-demo"
import { toast } from "@/components/ui/use-toast"
import { Building, CreditCard, Globe, Mail, MapPin, Phone, Upload, Clock, Palette, Bell } from "lucide-react"

const companyFormSchema = z.object({
  name: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(5, { message: "Please enter a valid phone number." }),
  address: z.string().min(5, { message: "Please enter a valid address." }),
  city: z.string().min(2, { message: "Please enter a valid city." }),
  state: z.string().min(2, { message: "Please enter a valid state/province." }),
  postalCode: z.string().min(2, { message: "Please enter a valid postal code." }),
  country: z.string().min(2, { message: "Please enter a valid country." }),
  taxId: z.string().optional(),
  description: z.string().optional(),
})

const brandingFormSchema = z.object({
  primaryColor: z.string(),
  secondaryColor: z.string(),
  accentColor: z.string(),
  logoOnDark: z.boolean(),
  customCss: z.string().optional(),
  customFonts: z.boolean(),
  emailTemplate: z.string(),
})

const businessHoursSchema = z.object({
  timezone: z.string(),
  mondayEnabled: z.boolean(),
  tuesdayEnabled: z.boolean(),
  wednesdayEnabled: z.boolean(),
  thursdayEnabled: z.boolean(),
  fridayEnabled: z.boolean(),
  saturdayEnabled: z.boolean(),
  sundayEnabled: z.boolean(),
})

const notificationSchema = z.object({
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  appNotifications: z.boolean(),
  dailyDigest: z.boolean(),
  weeklyReport: z.boolean(),
  criticalAlerts: z.boolean(),
})

export function CompanySettings() {
  const [activeTab, setActiveTab] = useState("profile")

  const companyForm = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: "Acme Inc",
      website: "https://acme.example.com",
      email: "contact@acme.example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Business Ave",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      country: "United States",
      taxId: "12-3456789",
      description: "Leading provider of AI communication solutions",
    },
  })

  const brandingForm = useForm<z.infer<typeof brandingFormSchema>>({
    resolver: zodResolver(brandingFormSchema),
    defaultValues: {
      primaryColor: "#4f46e5",
      secondaryColor: "#1e293b",
      accentColor: "#f97316",
      logoOnDark: true,
      customCss: "",
      customFonts: false,
      emailTemplate: "standard",
    },
  })

  const businessHoursForm = useForm<z.infer<typeof businessHoursSchema>>({
    resolver: zodResolver(businessHoursSchema),
    defaultValues: {
      timezone: "America/Los_Angeles",
      mondayEnabled: true,
      tuesdayEnabled: true,
      wednesdayEnabled: true,
      thursdayEnabled: true,
      fridayEnabled: true,
      saturdayEnabled: false,
      sundayEnabled: false,
    },
  })

  const notificationForm = useForm<z.infer<typeof notificationSchema>>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      emailNotifications: true,
      smsNotifications: false,
      appNotifications: true,
      dailyDigest: false,
      weeklyReport: true,
      criticalAlerts: true,
    },
  })

  function onCompanySubmit(values: z.infer<typeof companyFormSchema>) {
    toast({
      title: "Company profile updated",
      description: "Your company profile has been successfully updated.",
    })
    console.log(values)
  }

  function onBrandingSubmit(values: z.infer<typeof brandingFormSchema>) {
    toast({
      title: "Branding settings updated",
      description: "Your branding settings have been successfully updated.",
    })
    console.log(values)
  }

  function onBusinessHoursSubmit(values: z.infer<typeof businessHoursSchema>) {
    toast({
      title: "Business hours updated",
      description: "Your business hours have been successfully updated.",
    })
    console.log(values)
  }

  function onNotificationSubmit(values: z.infer<typeof notificationSchema>) {
    toast({
      title: "Notification settings updated",
      description: "Your notification settings have been successfully updated.",
    })
    console.log(values)
  }

  return (
    <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="grid grid-cols-4 w-full max-w-3xl">
        <TabsTrigger value="profile">Company Profile</TabsTrigger>
        <TabsTrigger value="branding">Branding</TabsTrigger>
        <TabsTrigger value="hours">Business Hours</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>

      {/* Company Profile Tab */}
      <TabsContent value="profile" className="space-y-6">
        <Form {...companyForm}>
          <form onSubmit={companyForm.handleSubmit(onCompanySubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Update your company details and contact information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 rounded-md border flex items-center justify-center bg-muted">
                      <Building className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Logo
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        Recommended size: 512x512px. Max file size: 2MB.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={companyForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Acme Inc" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={companyForm.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <Globe className="h-4 w-4 mr-2 mt-3 text-muted-foreground" />
                            <Input placeholder="https://example.com" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={companyForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <Mail className="h-4 w-4 mr-2 mt-3 text-muted-foreground" />
                            <Input placeholder="contact@example.com" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={companyForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <Phone className="h-4 w-4 mr-2 mt-3 text-muted-foreground" />
                            <Input placeholder="+1 (555) 123-4567" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Address</h3>

                  <FormField
                    control={companyForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <MapPin className="h-4 w-4 mr-2 mt-3 text-muted-foreground" />
                            <Input placeholder="123 Business Ave" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={companyForm.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="San Francisco" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={companyForm.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State/Province</FormLabel>
                          <FormControl>
                            <Input placeholder="CA" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={companyForm.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="94107" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={companyForm.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="United States">United States</SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                            <SelectItem value="Australia">Australia</SelectItem>
                            <SelectItem value="Germany">Germany</SelectItem>
                            <SelectItem value="France">France</SelectItem>
                            <SelectItem value="Japan">Japan</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Additional Information</h3>

                  <FormField
                    control={companyForm.control}
                    name="taxId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax ID / VAT Number</FormLabel>
                        <FormControl>
                          <div className="flex">
                            <CreditCard className="h-4 w-4 mr-2 mt-3 text-muted-foreground" />
                            <Input placeholder="12-3456789" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={companyForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Brief description of your company"
                            className="resize-none"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This description may be used in customer-facing communications.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </TabsContent>

      {/* Branding Tab */}
      <TabsContent value="branding" className="space-y-6">
        <Form {...brandingForm}>
          <form onSubmit={brandingForm.handleSubmit(onBrandingSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Branding Settings</CardTitle>
                <CardDescription>Customize your brand colors, logo, and appearance.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Brand Colors</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={brandingForm.control}
                      name="primaryColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Color</FormLabel>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-md border" style={{ backgroundColor: field.value }} />
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </div>
                          <FormDescription>Main brand color for buttons and accents</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={brandingForm.control}
                      name="secondaryColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Secondary Color</FormLabel>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-md border" style={{ backgroundColor: field.value }} />
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </div>
                          <FormDescription>Used for backgrounds and secondary elements</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={brandingForm.control}
                      name="accentColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Accent Color</FormLabel>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-md border" style={{ backgroundColor: field.value }} />
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </div>
                          <FormDescription>Used for highlights and call-to-actions</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Logo Settings</h3>
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-24 h-24 rounded-md border flex items-center justify-center bg-white">
                        <Palette className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <div>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Light Logo
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">Logo for light backgrounds</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-24 h-24 rounded-md border flex items-center justify-center bg-slate-800">
                        <Palette className="h-10 w-10 text-white" />
                      </div>
                      <div>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Dark Logo
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">Logo for dark backgrounds</p>
                      </div>
                    </div>

                    <FormField
                      control={brandingForm.control}
                      name="logoOnDark"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Use light logo on dark backgrounds</FormLabel>
                            <FormDescription>
                              Automatically switch to light logo when on dark backgrounds
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Advanced Customization</h3>

                  <FormField
                    control={brandingForm.control}
                    name="customCss"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom CSS</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add custom CSS rules here"
                            className="font-mono text-sm"
                            rows={6}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Advanced: Add custom CSS to override default styles</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={brandingForm.control}
                    name="customFonts"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Use custom fonts</FormLabel>
                          <FormDescription>Enable custom font usage across the platform</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={brandingForm.control}
                    name="emailTemplate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Template</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select email template" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="minimal">Minimal</SelectItem>
                            <SelectItem value="modern">Modern</SelectItem>
                            <SelectItem value="corporate">Corporate</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Choose the template style for all system emails</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button">
                  Reset to Defaults
                </Button>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </TabsContent>

      {/* Business Hours Tab */}
      <TabsContent value="hours" className="space-y-6">
        <Form {...businessHoursForm}>
          <form onSubmit={businessHoursForm.handleSubmit(onBusinessHoursSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Hours</CardTitle>
                <CardDescription>Set your company's operating hours and availability.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={businessHoursForm.control}
                    name="timezone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timezone</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="America/Los_Angeles">Pacific Time (US & Canada)</SelectItem>
                            <SelectItem value="America/Denver">Mountain Time (US & Canada)</SelectItem>
                            <SelectItem value="America/Chicago">Central Time (US & Canada)</SelectItem>
                            <SelectItem value="America/New_York">Eastern Time (US & Canada)</SelectItem>
                            <SelectItem value="Europe/London">London</SelectItem>
                            <SelectItem value="Europe/Paris">Paris</SelectItem>
                            <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                            <SelectItem value="Australia/Sydney">Sydney</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>All times will be displayed in this timezone</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                      <h3 className="text-lg font-medium">Operating Hours</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-[120px_1fr_1fr] gap-4 items-center">
                        <div className="font-medium">Day</div>
                        <div className="font-medium">Open</div>
                        <div className="font-medium">Close</div>
                      </div>

                      <div className="grid grid-cols-[120px_1fr_1fr] gap-4 items-center">
                        <div className="flex items-center gap-2">
                          <FormField
                            control={businessHoursForm.control}
                            name="mondayEnabled"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormLabel className="!mt-0">Monday</FormLabel>
                              </FormItem>
                            )}
                          />
                        </div>
                        <TimePickerDemo disabled={!businessHoursForm.watch("mondayEnabled")} defaultValue="09:00" />
                        <TimePickerDemo disabled={!businessHoursForm.watch("mondayEnabled")} defaultValue="17:00" />
                      </div>

                      <div className="grid grid-cols-[120px_1fr_1fr] gap-4 items-center">
                        <div className="flex items-center gap-2">
                          <FormField
                            control={businessHoursForm.control}
                            name="tuesdayEnabled"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormLabel className="!mt-0">Tuesday</FormLabel>
                              </FormItem>
                            )}
                          />
                        </div>
                        <TimePickerDemo disabled={!businessHoursForm.watch("tuesdayEnabled")} defaultValue="09:00" />
                        <TimePickerDemo disabled={!businessHoursForm.watch("tuesdayEnabled")} defaultValue="17:00" />
                      </div>

                      <div className="grid grid-cols-[120px_1fr_1fr] gap-4 items-center">
                        <div className="flex items-center gap-2">
                          <FormField
                            control={businessHoursForm.control}
                            name="wednesdayEnabled"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormLabel className="!mt-0">Wednesday</FormLabel>
                              </FormItem>
                            )}
                          />
                        </div>
                        <TimePickerDemo disabled={!businessHoursForm.watch("wednesdayEnabled")} defaultValue="09:00" />
                        <TimePickerDemo disabled={!businessHoursForm.watch("wednesdayEnabled")} defaultValue="17:00" />
                      </div>

                      <div className="grid grid-cols-[120px_1fr_1fr] gap-4 items-center">
                        <div className="flex items-center gap-2">
                          <FormField
                            control={businessHoursForm.control}
                            name="thursdayEnabled"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormLabel className="!mt-0">Thursday</FormLabel>
                              </FormItem>
                            )}
                          />
                        </div>
                        <TimePickerDemo disabled={!businessHoursForm.watch("thursdayEnabled")} defaultValue="09:00" />
                        <TimePickerDemo disabled={!businessHoursForm.watch("thursdayEnabled")} defaultValue="17:00" />
                      </div>

                      <div className="grid grid-cols-[120px_1fr_1fr] gap-4 items-center">
                        <div className="flex items-center gap-2">
                          <FormField
                            control={businessHoursForm.control}
                            name="fridayEnabled"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormLabel className="!mt-0">Friday</FormLabel>
                              </FormItem>
                            )}
                          />
                        </div>
                        <TimePickerDemo disabled={!businessHoursForm.watch("fridayEnabled")} defaultValue="09:00" />
                        <TimePickerDemo disabled={!businessHoursForm.watch("fridayEnabled")} defaultValue="17:00" />
                      </div>

                      <div className="grid grid-cols-[120px_1fr_1fr] gap-4 items-center">
                        <div className="flex items-center gap-2">
                          <FormField
                            control={businessHoursForm.control}
                            name="saturdayEnabled"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormLabel className="!mt-0">Saturday</FormLabel>
                              </FormItem>
                            )}
                          />
                        </div>
                        <TimePickerDemo disabled={!businessHoursForm.watch("saturdayEnabled")} defaultValue="10:00" />
                        <TimePickerDemo disabled={!businessHoursForm.watch("saturdayEnabled")} defaultValue="15:00" />
                      </div>

                      <div className="grid grid-cols-[120px_1fr_1fr] gap-4 items-center">
                        <div className="flex items-center gap-2">
                          <FormField
                            control={businessHoursForm.control}
                            name="sundayEnabled"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormLabel className="!mt-0">Sunday</FormLabel>
                              </FormItem>
                            )}
                          />
                        </div>
                        <TimePickerDemo disabled={!businessHoursForm.watch("sundayEnabled")} defaultValue="10:00" />
                        <TimePickerDemo disabled={!businessHoursForm.watch("sundayEnabled")} defaultValue="15:00" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </TabsContent>

      {/* Notifications Tab */}
      <TabsContent value="notifications" className="space-y-6">
        <Form {...notificationForm}>
          <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure how and when you receive system notifications.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-muted-foreground" />
                    <h3 className="text-lg font-medium">Notification Channels</h3>
                  </div>

                  <FormField
                    control={notificationForm.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Email Notifications</FormLabel>
                          <FormDescription>Receive notifications via email</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={notificationForm.control}
                    name="smsNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">SMS Notifications</FormLabel>
                          <FormDescription>Receive notifications via SMS</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={notificationForm.control}
                    name="appNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">In-App Notifications</FormLabel>
                          <FormDescription>Receive notifications within the application</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Types</h3>

                  <FormField
                    control={notificationForm.control}
                    name="dailyDigest"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Daily Digest</FormLabel>
                          <FormDescription>Receive a daily summary of activities</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={notificationForm.control}
                    name="weeklyReport"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Weekly Report</FormLabel>
                          <FormDescription>Receive a weekly performance report</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={notificationForm.control}
                    name="criticalAlerts"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Critical Alerts</FormLabel>
                          <FormDescription>Receive notifications for critical system events</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button">
                  Reset to Defaults
                </Button>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  )
}
