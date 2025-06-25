"use client"

import { useState } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Import the required CSS for react-big-calendar
import "react-big-calendar/lib/css/react-big-calendar.css"

// Setup the localizer
const localizer = momentLocalizer(moment)

// Sample appointment data
const appointments = [
  {
    id: 1,
    title: "Initial Consultation",
    start: new Date(2025, 4, 22, 10, 0),
    end: new Date(2025, 4, 22, 11, 0),
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
    start: new Date(2025, 4, 23, 14, 0),
    end: new Date(2025, 4, 23, 15, 0),
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
    start: new Date(2025, 4, 24, 11, 0),
    end: new Date(2025, 4, 24, 12, 30),
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
    start: new Date(2025, 4, 22, 15, 0),
    end: new Date(2025, 4, 22, 16, 0),
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
    start: new Date(2025, 4, 25, 9, 0),
    end: new Date(2025, 4, 25, 11, 0),
    contactName: "Robert Wilson",
    contactEmail: "r.wilson@example.com",
    contactPhone: "+1 (555) 876-5432",
    type: "onboarding",
    status: "confirmed",
    notes: "Initial system setup and training",
    location: "Video Call",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "text-[#40BF40] border-[#40BF40]"; // Green
    case "tentative":
      return "text-[#66FFB2] border-[#66FFB2]"; // Mint Green
    case "consultation":
      return "text-[#4DB8FF] border-[#4DB8FF]"; // Blue
    case "no show":
      return "text-[#FF3333] border-[#FF3333]"; // Red
    case "scheduled":
      return "text-[#9933FF] border-[#9933FF]"; // Purple
    case "review":
      return "text-[#F59E0B] border-[#F59E0B]"; // Amber/Orange
    default:
      return "text-[#6B7280] border-[#6B7280]"; // Gray
  }
};

const getEventColor = (status: string) => {
  switch (status) {
    case "consultation":
      return "text-[#3b82f6] border-[#3b82f6]"; // Blue
    case "follow-up":
      return "text-[#10b981] border-[#10b981]"; // Green
    case "demo":
      return "text-[#8b5cf6] border-[#8b5cf6]"; // Purple
    case "review":
      return "text-[#9933FF] border-[#9933FF]"; // Amber
    case "onboarding":
      return "text-[#ec4899] border-[#ec4899]"; // Pink
    default:
      return "text-[#6B7280] border-[#6B7280]"; // Gray
  }
};

// Event styling based on appointment type
const eventStyleGetter = (event) => {
  let backgroundColor = "#3b82f6" // Default blue

  switch (event.type) {
    case "consultation":
      backgroundColor = "#3b82f6" // Blue
      break
    case "follow-up":
      backgroundColor = "#10b981" // Green
      break
    case "demo":
      backgroundColor = "#8b5cf6" // Purple
      break
    case "review":
      backgroundColor = "#f59e0b" // Amber
      break
    case "onboarding":
      backgroundColor = "#ec4899" // Pink
      break
    default:
      backgroundColor = "#3b82f6" // Default blue
  }

  const style = {
    backgroundColor,
    borderRadius: "4px",
    opacity: event.status === "tentative" ? 0.7 : 1,
    color: "white",
    border: "0px",
    display: "block",
    padding: "2px 5px",
  }

  return { style }
}

export function AppointmentCalendar({ view = "month" }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  // Handle navigation
  const handleNavigate = (action) => {
    const newDate = new Date(currentDate)

    if (action === "PREV") {
      if (view === "day") {
        newDate.setDate(newDate.getDate() - 1)
      } else if (view === "week") {
        newDate.setDate(newDate.getDate() - 7)
      } else if (view === "month") {
        newDate.setMonth(newDate.getMonth() - 1)
      }
    } else if (action === "NEXT") {
      if (view === "day") {
        newDate.setDate(newDate.getDate() + 1)
      } else if (view === "week") {
        newDate.setDate(newDate.getDate() + 7)
      } else if (view === "month") {
        newDate.setMonth(newDate.getMonth() + 1)
      }
    } else if (action === "TODAY") {
      return setCurrentDate(new Date())
    }

    setCurrentDate(newDate)
  }

  // Handle event selection
  const handleSelectEvent = (event) => {
    setSelectedAppointment(event)
    setDialogOpen(true)
  }

  // Format the date for the toolbar
  const formatToolbarDate = () => {
    if (view === "day") {
      return moment(currentDate).format("MMMM D, YYYY")
    } else if (view === "week") {
      const start = moment(currentDate).startOf("week").format("MMM D")
      const end = moment(currentDate).endOf("week").format("MMM D, YYYY")
      return `${start} - ${end}`
    } else {
      return moment(currentDate).format("MMMM YYYY")
    }
  }

  // Custom toolbar component
  const CustomToolbar = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => handleNavigate("TODAY")}>
            Today
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleNavigate("PREV")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleNavigate("NEXT")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h3 className="text-lg font-medium">{formatToolbarDate()}</h3>
        </div>
      </div>
    )
  }

  // Get the appropriate view component
  const getView = () => {
    if (view === "agenda") {
      return (
        <div className="space-y-4">
          {appointments
            .filter((appt) => moment(appt.start).isAfter(moment().startOf("day")))
            .sort((a, b) => a.start - b.start)
            .map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                onClick={() => handleSelectEvent(appointment)}
              >
                <div className="mr-4 text-center">
                  <div className="text-sm font-medium">{moment(appointment.start).format("ddd")}</div>
                  <div className="text-2xl font-bold">{moment(appointment.start).format("D")}</div>
                  <div className="text-xs text-muted-foreground">{moment(appointment.start).format("MMM")}</div>
                </div>
                <div className="flex-1">
                  <div className="font-medium">{appointment.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {moment(appointment.start).format("h:mm A")} - {moment(appointment.end).format("h:mm A")}
                  </div>
                  <div className="text-sm">{appointment.contactName}</div>
                </div>
                <div>
                  <Badge className={`bg-white ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </Badge>
                </div>
              </div>
            ))}
        </div>
      )
    }

    return (
      <Calendar
        localizer={localizer}
        events={appointments}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        view={view}
        views={["month", "week", "day"]}
        date={currentDate}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={eventStyleGetter}
        components={{
          toolbar: CustomToolbar,
        }}
      />
    )
  }

  return (
    <div>
      {getView()}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedAppointment && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedAppointment.title}</DialogTitle>
                <DialogDescription>
                  {moment(selectedAppointment.start).format("MMMM D, YYYY")} •{" "}
                  {moment(selectedAppointment.start).format("h:mm A")} -{" "}
                  {moment(selectedAppointment.end).format("h:mm A")}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="flex items-center">
                  <Badge className={`bg-white ${getStatusColor(selectedAppointment.status)}`}>
                    {selectedAppointment.status}
                  </Badge>
                  <Badge className={`bg-white ${getStatusColor(selectedAppointment.type)}`}>{selectedAppointment.type}</Badge>
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
                <Button variant="destructive">Cancel Appointment</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
