"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format, addMinutes, parse } from "date-fns"
import { CalendarIcon, Check, ChevronsUpDown, Clock, Calendar } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Sample contacts data
const contacts = [
  {
    id: "c1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Inc",
  },
  {
    id: "c2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 987-6543",
    company: "Globex Corp",
  },
  {
    id: "c3",
    name: "Michael Chen",
    email: "m.chen@example.com",
    phone: "+1 (555) 456-7890",
    company: "Initech",
  },
  {
    id: "c4",
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "+1 (555) 234-5678",
    company: "Umbrella Corp",
  },
  {
    id: "c5",
    name: "Robert Wilson",
    email: "r.wilson@example.com",
    phone: "+1 (555) 876-5432",
    company: "Stark Industries",
  },
]

// Time slots
const timeSlots = [
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
]

// Duration options
const durationOptions = [
  { value: "15", label: "15 minutes" },
  { value: "30", label: "30 minutes" },
  { value: "45", label: "45 minutes" },
  { value: "60", label: "1 hour" },
  { value: "90", label: "1.5 hours" },
  { value: "120", label: "2 hours" },
]

// Appointment types
const appointmentTypes = [
  { value: "consultation", label: "Consultation" },
  { value: "follow-up", label: "Follow-up" },
  { value: "demo", label: "Product Demo" },
  { value: "review", label: "Review" },
  { value: "onboarding", label: "Onboarding" },
  { value: "support", label: "Support" },
  { value: "presentation", label: "Presentation" },
  { value: "kickoff", label: "Project Kickoff" },
  { value: "training", label: "Training" },
]

// Location types
const locationTypes = [
  { value: "video", label: "Video Call" },
  { value: "phone", label: "Phone Call" },
  { value: "office", label: "Office" },
  { value: "client", label: "Client Location" },
  { value: "other", label: "Other" },
]

// Form schema
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  contactId: z.string({
    required_error: "Please select a contact.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  startTime: z.string({
    required_error: "Please select a start time.",
  }),
  duration: z.string({
    required_error: "Please select a duration.",
  }),
  type: z.string({
    required_error: "Please select an appointment type.",
  }),
  locationType: z.string({
    required_error: "Please select a location type.",
  }),
  locationDetails: z.string().optional(),
  notes: z.string().optional(),
  sendReminder: z.boolean().default(true),
  reminderType: z.enum(["email", "sms", "both"]).default("email"),
})

// Sample existing appointments (for conflict checking)
const existingAppointments = [
  {
    id: 1,
    date: new Date(2025, 4, 22),
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    contactId: "c1",
  },
  {
    id: 2,
    date: new Date(2025, 4, 23),
    startTime: "2:00 PM",
    endTime: "3:00 PM",
    contactId: "c2",
  },
]

export function AppointmentScheduler() {
  const [step, setStep] = useState(1)
  const [selectedContact, setSelectedContact] = useState(null)
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [appointmentDetails, setAppointmentDetails] = useState(null)
  const [conflictDialog, setConflictDialog] = useState(false)
  const [conflictDetails, setConflictDetails] = useState(null)

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      date: undefined,
      startTime: "",
      duration: "30",
      type: "consultation",
      locationType: "video",
      locationDetails: "",
      notes: "",
      sendReminder: true,
      reminderType: "email",
    },
  })

  // Watch form values
  const watchedDate = form.watch("date")
  const watchedLocationType = form.watch("locationType")
  const watchedSendReminder = form.watch("sendReminder")
  const watchedStartTime = form.watch("startTime")
  const watchedDuration = form.watch("duration")

  // Calculate end time based on start time and duration
  const calculateEndTime = (startTime: string, durationMinutes: number) => {
    if (!startTime) return ""

    try {
      const parsedTime = parse(startTime, "h:mm a", new Date())
      const endTime = addMinutes(parsedTime, durationMinutes)
      return format(endTime, "h:mm a")
    } catch (error) {
      console.error("Error calculating end time:", error)
      return ""
    }
  }

  // Check for appointment conflicts
  const checkForConflicts = (date: Date, startTime: string, duration: string) => {
    if (!date || !startTime || !duration) return false

    const durationMinutes = Number.parseInt(duration)
    const endTime = calculateEndTime(startTime, durationMinutes)

    // Format date for comparison
    const formattedDate = format(date, "yyyy-MM-dd")

    // Check against existing appointments
    const conflicts = existingAppointments.filter((appointment) => {
      // Check if same date
      const appointmentDate = format(appointment.date, "yyyy-MM-dd")
      if (appointmentDate !== formattedDate) return false

      // Check time overlap
      const newStart = parse(startTime, "h:mm a", new Date())
      const newEnd = parse(endTime, "h:mm a", new Date())
      const existingStart = parse(appointment.startTime, "h:mm a", new Date())
      const existingEnd = parse(appointment.endTime, "h:mm a", new Date())

      // Check if times overlap
      return newStart <= existingEnd && newEnd >= existingStart
    })

    if (conflicts.length > 0) {
      const conflict = conflicts[0]
      const conflictContact = contacts.find((c) => c.id === conflict.contactId)

      setConflictDetails({
        date: format(conflict.date, "MMMM d, yyyy"),
        time: `${conflict.startTime} - ${conflict.endTime}`,
        contact: conflictContact?.name || "Unknown Contact",
      })

      return true
    }

    return false
  }

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Check for conflicts
    const hasConflict = checkForConflicts(values.date, values.startTime, values.duration)

    if (hasConflict) {
      setIsSubmitting(false)
      setConflictDialog(true)
      return
    }

    // Simulate API call
    setTimeout(() => {
      // Calculate end time
      const durationMinutes = Number.parseInt(values.duration)
      const endTime = calculateEndTime(values.startTime, durationMinutes)

      // Get contact details
      const contact = contacts.find((c) => c.id === values.contactId)

      // Prepare appointment details for confirmation
      setAppointmentDetails({
        ...values,
        contactName: contact?.name,
        contactEmail: contact?.email,
        contactPhone: contact?.phone,
        formattedDate: format(values.date, "EEEE, MMMM d, yyyy"),
        endTime: endTime,
        typeName: appointmentTypes.find((t) => t.value === values.type)?.label,
        locationTypeName: locationTypes.find((l) => l.value === values.locationType)?.label,
      })

      setIsSubmitting(false)
      setShowConfirmation(true)
    }, 1500)
  }

  // Handle contact selection
  const handleSelectContact = (contactId: string) => {
    form.setValue("contactId", contactId)
    const contact = contacts.find((c) => c.id === contactId)
    setSelectedContact(contact)
    setOpen(false)
  }

  // Get contact by ID
  const getContactById = (id: string) => {
    return contacts.find((contact) => contact.id === id)
  }

  // Handle final confirmation
  const handleConfirmAppointment = () => {
    // In a real app, you would save the appointment here
    console.log("Appointment confirmed:", appointmentDetails)

    // Show success message
    toast({
      title: "Appointment scheduled",
      description: "The appointment has been successfully scheduled.",
    })

    // Reset form and go back to step 1
    form.reset()
    setSelectedContact(null)
    setAppointmentDetails(null)
    setShowConfirmation(false)
    setStep(1)
  }

  // Handle conflict resolution
  const handleResolveConflict = () => {
    setConflictDialog(false)
    // You could navigate to a specific date/time selection step here
    setStep(2)
  }

  // Render step 1: Select contact and basic details
  const renderStep1 = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="contactId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Contact</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn("justify-between", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? getContactById(field.value)?.name : "Select contact..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search contacts..." />
                      <CommandList>
                        <CommandEmpty>No contact found.</CommandEmpty>
                        <CommandGroup>
                          {contacts.map((contact) => (
                            <CommandItem
                              key={contact.id}
                              value={contact.id}
                              onSelect={() => handleSelectContact(contact.id)}
                            >
                              <div className="flex items-center">
                                <Avatar className="h-6 w-6 mr-2">
                                  <AvatarFallback>
                                    {contact.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-medium">{contact.name}</p>
                                  <p className="text-xs text-muted-foreground">{contact.company}</p>
                                </div>
                              </div>
                              <Check
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  field.value === contact.id ? "opacity-100" : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {selectedContact && (
            <div className="rounded-md border p-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>
                    {selectedContact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedContact.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedContact.email}</p>
                  <p className="text-sm text-muted-foreground">{selectedContact.phone}</p>
                  <p className="text-sm text-muted-foreground">{selectedContact.company}</p>
                </div>
              </div>
            </div>
          )}

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Appointment Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter appointment title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Appointment Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select appointment type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {appointmentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            onClick={() => {
              const result = form.trigger(["contactId", "title", "type"])
              if (result) {
                setStep(2)
              }
            }}
          >
            Next: Date & Time
          </Button>
        </div>
      </div>
    )
  }

  // Render step 2: Date and time selection
  const renderStep2 = () => {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select start time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {durationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {watchedDate && watchedStartTime && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Selected Date & Time</h3>
                  <p className="text-sm text-muted-foreground">
                    {watchedDate ? format(watchedDate, "EEEE, MMMM d, yyyy") : "No date selected"}
                    {watchedStartTime && ` at ${watchedStartTime}`}
                    {watchedDuration &&
                      watchedStartTime &&
                      ` - ${calculateEndTime(watchedStartTime, Number.parseInt(watchedDuration))}`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {watchedDuration && `Duration: ${durationOptions.find((d) => d.value === watchedDuration)?.label}`}
                  </p>
                </div>
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => setStep(1)}>
            Back
          </Button>
          <Button
            type="button"
            onClick={() => {
              const result = form.trigger(["date", "startTime", "duration"])
              if (result) {
                // Check for conflicts before proceeding
                const hasConflict = checkForConflicts(
                  form.getValues("date"),
                  form.getValues("startTime"),
                  form.getValues("duration"),
                )

                if (hasConflict) {
                  setConflictDialog(true)
                  return
                }

                setStep(3)
              }
            }}
          >
            Next: Location & Details
          </Button>
        </div>
      </div>
    )
  }

  // Render step 3: Location and additional details
  const renderStep3 = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="locationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {locationTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchedLocationType && (
            <FormField
              control={form.control}
              name="locationDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location Details</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        watchedLocationType === "video"
                          ? "Video call link or meeting ID"
                          : watchedLocationType === "phone"
                            ? "Phone number to call"
                            : watchedLocationType === "office"
                              ? "Office address or room number"
                              : watchedLocationType === "client"
                                ? "Client address"
                                : "Location details"
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {watchedLocationType === "video" && "Enter the video call link or meeting ID"}
                    {watchedLocationType === "phone" && "Enter the phone number to call"}
                    {watchedLocationType === "office" && "Enter the office address or room number"}
                    {watchedLocationType === "client" && "Enter the client's address"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add any additional notes or agenda items"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="sendReminder"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Send Reminder</FormLabel>
                  <FormDescription>Send a reminder to the contact before the appointment</FormDescription>
                </div>
              </FormItem>
            )}
          />

          {watchedSendReminder && (
            <FormField
              control={form.control}
              name="reminderType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reminder Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reminder type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="both">Both Email & SMS</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Choose how you want to send the reminder</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => setStep(2)}>
            Back
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
          </Button>
        </div>
      </div>
    )
  }

  // Render confirmation dialog
  const renderConfirmationDialog = () => {
    if (!appointmentDetails) return null

    return (
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Confirm Appointment</DialogTitle>
            <DialogDescription>Please review the appointment details before confirming.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-1">
              <h4 className="font-medium text-lg">{appointmentDetails.title}</h4>
              <p className="text-sm text-muted-foreground">{appointmentDetails.typeName}</p>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <p>{appointmentDetails.formattedDate}</p>
            </div>

            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <p>
                {appointmentDetails.startTime} - {appointmentDetails.endTime}
              </p>
            </div>

            <div className="rounded-md border p-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>
                    {appointmentDetails.contactName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{appointmentDetails.contactName}</p>
                  <p className="text-sm text-muted-foreground">{appointmentDetails.contactEmail}</p>
                  <p className="text-sm text-muted-foreground">{appointmentDetails.contactPhone}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-medium">Location</p>
              <p className="text-sm">{appointmentDetails.locationTypeName}</p>
              {appointmentDetails.locationDetails && (
                <p className="text-sm text-muted-foreground">{appointmentDetails.locationDetails}</p>
              )}
            </div>

            {appointmentDetails.notes && (
              <div>
                <p className="font-medium">Notes</p>
                <p className="text-sm">{appointmentDetails.notes}</p>
              </div>
            )}

            <div>
              <p className="font-medium">Reminder</p>
              <p className="text-sm">
                {appointmentDetails.sendReminder
                  ? `Will send ${appointmentDetails.reminderType} reminder`
                  : "No reminder will be sent"}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Edit
            </Button>
            <Button onClick={handleConfirmAppointment}>Confirm Appointment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  // Render conflict dialog
  const renderConflictDialog = () => {
    if (!conflictDetails) return null

    return (
      <Dialog open={conflictDialog} onOpenChange={setConflictDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Scheduling Conflict</DialogTitle>
            <DialogDescription>There is a scheduling conflict with an existing appointment.</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Alert variant="destructive">
              <AlertTitle>Conflict Detected</AlertTitle>
              <AlertDescription>
                <p>
                  There is already an appointment scheduled with {conflictDetails.contact} on {conflictDetails.date} at{" "}
                  {conflictDetails.time}.
                </p>
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setConflictDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleResolveConflict}>Choose Another Time</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Tabs value={`step-${step}`} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100" value="step-1" onClick={() => setStep(1)} disabled={step < 1}>
                  Contact & Details
                </TabsTrigger>
                <TabsTrigger className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100" value="step-2" onClick={() => setStep(2)} disabled={step < 2}>
                  Date & Time
                </TabsTrigger>
                <TabsTrigger className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100" value="step-3" onClick={() => setStep(3)} disabled={step < 3}>
                  Location & Notes
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="mt-6">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </div>
        </div>
      </form>

      {renderConfirmationDialog()}
      {renderConflictDialog()}
    </Form>
  )
}
