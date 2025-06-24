import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { AppointmentCalendar } from "@/components/appointment-calendar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function AppointmentsCalendarPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>Appointments Calendar</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
          <h2 className="text-3xl font-bold tracking-tight mt-2">Appointments Calendar</h2>
        </div>
        <Button asChild>
          <Link href="/appointments/schedule">
            <Plus className="mr-2 h-4 w-4" /> Schedule Appointment
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="month">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="agenda">Agenda</TabsTrigger>
          </TabsList>
        </div>

        <Card className="mt-4">
          <CardContent className="pt-6">
            <TabsContent value="month" className="mt-0">
              <AppointmentCalendar view="month" />
            </TabsContent>
            <TabsContent value="week" className="mt-0">
              <AppointmentCalendar view="week" />
            </TabsContent>
            <TabsContent value="day" className="mt-0">
              <AppointmentCalendar view="day" />
            </TabsContent>
            <TabsContent value="agenda" className="mt-0">
              <AppointmentCalendar view="agenda" />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  )
}
