"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MoreHorizontal, Edit, Trash, Calendar, Phone, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Sample appointment data
const appointmentsData = [
  {
    id: 1,
    title: "Initial Consultation",
    date: "May 22, 2025",
    time: "10:00 AM - 11:00 AM",
    contactName: "John Smith",
    contactEmail: "john.smith@example.com",
    contactPhone: "+1 (555) 123-4567",
    type: "consultation",
    status: "confirmed",
    notes: "Discuss new product offerings and potential partnership",
    location: "Video Call",
  },
  {
    id: 2,
    title: "Follow-up Meeting",
    date: "May 23, 2025",
    time: "2:00 PM - 3:00 PM",
    contactName: "Sarah Johnson",
    contactEmail: "sarah.j@example.com",
    contactPhone: "+1 (555) 987-6543",
    type: "follow-up",
    status: "confirmed",
    notes: "Review proposal and address any questions",
    location: "Office - Room 305",
  },
  {
    id: 3,
    title: "Product Demo",
    date: "May 24, 2025",
    time: "11:00 AM - 12:30 PM",
    contactName: "Michael Chen",
    contactEmail: "m.chen@example.com",
    contactPhone: "+1 (555) 456-7890",
    type: "demo",
    status: "confirmed",
    notes: "Demonstrate new AI features",
    location: "Client Office",
  },
  {
    id: 4,
    title: "Contract Review",
    date: "May 22, 2025",
    time: "3:00 PM - 4:00 PM",
    contactName: "Emily Davis",
    contactEmail: "emily.d@example.com",
    contactPhone: "+1 (555) 234-5678",
    type: "review",
    status: "tentative",
    notes: "Go through contract terms and conditions",
    location: "Phone Call",
  },
  {
    id: 5,
    title: "Onboarding Session",
    date: "May 25, 2025",
    time: "9:00 AM - 11:00 AM",
    contactName: "Robert Wilson",
    contactEmail: "r.wilson@example.com",
    contactPhone: "+1 (555) 876-5432",
    type: "onboarding",
    status: "confirmed",
    notes: "Initial system setup and training",
    location: "Video Call",
  },
  {
    id: 6,
    title: "Quarterly Review",
    date: "May 26, 2025",
    time: "1:00 PM - 2:30 PM",
    contactName: "Jennifer Lee",
    contactEmail: "j.lee@example.com",
    contactPhone: "+1 (555) 345-6789",
    type: "review",
    status: "confirmed",
    notes: "Review Q2 performance and plan for Q3",
    location: "Conference Room A",
  },
  {
    id: 7,
    title: "Technical Support",
    date: "May 27, 2025",
    time: "10:30 AM - 11:30 AM",
    contactName: "David Brown",
    contactEmail: "d.brown@example.com",
    contactPhone: "+1 (555) 567-8901",
    type: "support",
    status: "confirmed",
    notes: "Troubleshoot integration issues",
    location: "Phone Call",
  },
  {
    id: 8,
    title: "Sales Presentation",
    date: "May 28, 2025",
    time: "2:00 PM - 3:30 PM",
    contactName: "Lisa Garcia",
    contactEmail: "l.garcia@example.com",
    contactPhone: "+1 (555) 678-9012",
    type: "presentation",
    status: "tentative",
    notes: "Present new service offerings",
    location: "Client Office",
  },
  {
    id: 9,
    title: "Project Kickoff",
    date: "May 29, 2025",
    time: "9:00 AM - 10:30 AM",
    contactName: "Thomas Wright",
    contactEmail: "t.wright@example.com",
    contactPhone: "+1 (555) 789-0123",
    type: "kickoff",
    status: "confirmed",
    notes: "Initial project planning and team introductions",
    location: "Video Call",
  },
  {
    id: 10,
    title: "Training Session",
    date: "May 30, 2025",
    time: "11:00 AM - 1:00 PM",
    contactName: "Amanda Martinez",
    contactEmail: "a.martinez@example.com",
    contactPhone: "+1 (555) 890-1234",
    type: "training",
    status: "confirmed",
    notes: "Platform training for new team members",
    location: "Training Room B",
  },
]

// Past appointments (for demo purposes)
const pastAppointments = [
  {
    id: 11,
    title: "Initial Meeting",
    date: "May 15, 2025",
    time: "10:00 AM - 11:00 AM",
    contactName: "Kevin Taylor",
    contactEmail: "k.taylor@example.com",
    contactPhone: "+1 (555) 901-2345",
    type: "consultation",
    status: "completed",
    notes: "Discussed requirements and next steps",
    location: "Office",
  },
  {
    id: 12,
    title: "Product Overview",
    date: "May 16, 2025",
    time: "2:00 PM - 3:00 PM",
    contactName: "Olivia Nelson",
    contactEmail: "o.nelson@example.com",
    contactPhone: "+1 (555) 012-3456",
    type: "demo",
    status: "completed",
    notes: "Demonstrated core features",
    location: "Client Office",
  },
]

// Canceled appointments (for demo purposes)
const canceledAppointments = [
  {
    id: 13,
    title: "Strategy Session",
    date: "May 20, 2025",
    time: "1:00 PM - 2:00 PM",
    contactName: "Brian Miller",
    contactEmail: "b.miller@example.com",
    contactPhone: "+1 (555) 123-4567",
    type: "strategy",
    status: "canceled",
    notes: "Client requested to reschedule",
    location: "Video Call",
  },
]

export function AppointmentList({ filter = "all" }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  // Filter appointments based on the selected filter
  const getFilteredAppointments = () => {
    let filteredData = []

    switch (filter) {
      case "upcoming":
        filteredData = appointmentsData
        break
      case "past":
        filteredData = pastAppointments
        break
      case "canceled":
        filteredData = canceledAppointments
        break
      case "all":
      default:
        filteredData = [...appointmentsData, ...pastAppointments, ...canceledAppointments]
        break
    }

    // Apply search filter
    if (searchQuery) {
      filteredData = filteredData.filter(
        (appointment) =>
          appointment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          appointment.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          appointment.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply type filter
    if (typeFilter !== "all") {
      filteredData = filteredData.filter((appointment) => appointment.type === typeFilter)
    }

    return filteredData
  }

  const filteredAppointments = getFilteredAppointments()

  // Get badge variant based on status
  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "confirmed":
        return "default"
      case "tentative":
        return "secondary"
      case "completed":
        return "success"
      case "canceled":
        return "destructive"
      default:
        return "outline"
    }
  }

  // Get badge variant based on appointment type
  const getTypeBadgeVariant = (type) => {
    return "outline"
  }

  // Handle view appointment details
  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Search appointments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="consultation">Consultation</SelectItem>
            <SelectItem value="follow-up">Follow-up</SelectItem>
            <SelectItem value="demo">Demo</SelectItem>
            <SelectItem value="review">Review</SelectItem>
            <SelectItem value="onboarding">Onboarding</SelectItem>
            <SelectItem value="support">Support</SelectItem>
            <SelectItem value="presentation">Presentation</SelectItem>
            <SelectItem value="kickoff">Kickoff</SelectItem>
            <SelectItem value="training">Training</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Appointment</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No appointments found
                </TableCell>
              </TableRow>
            ) : (
              filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">{appointment.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {appointment.contactName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{appointment.contactName}</p>
                        <p className="text-xs text-muted-foreground">{appointment.contactEmail}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm">{appointment.date}</span>
                      <span className="text-xs text-muted-foreground">{appointment.time}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getTypeBadgeVariant(appointment.type)}>{appointment.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(appointment.status)}>{appointment.status}</Badge>
                  </TableCell>
                  <TableCell>{appointment.location}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewDetails(appointment)}>
                          <Calendar className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Phone className="mr-2 h-4 w-4" />
                          Call Contact
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Email Contact
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Appointment
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" />
                          Reschedule
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Cancel Appointment
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedAppointment && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedAppointment.title}</DialogTitle>
                <DialogDescription>
                  {selectedAppointment.date} • {selectedAppointment.time}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="flex items-center">
                  <Badge className="mr-2" variant={getStatusBadgeVariant(selectedAppointment.status)}>
                    {selectedAppointment.status}
                  </Badge>
                  <Badge variant="outline">{selectedAppointment.type}</Badge>
                </div>

                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>
                      {selectedAppointment.contactName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedAppointment.contactName}</p>
                    <p className="text-sm text-muted-foreground">{selectedAppointment.contactEmail}</p>
                    <p className="text-sm text-muted-foreground">{selectedAppointment.contactPhone}</p>
                  </div>
                </div>

                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm">{selectedAppointment.location}</p>
                </div>

                {selectedAppointment.notes && (
                  <div>
                    <p className="font-medium">Notes</p>
                    <p className="text-sm">{selectedAppointment.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <Button variant="outline">Edit</Button>
                {selectedAppointment.status !== "canceled" && <Button variant="destructive">Cancel Appointment</Button>}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
