import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AppointmentScheduler } from "@/components/appointment-scheduler"

export default function ScheduleAppointmentPage() {
  return (
    <div className="space-y-6">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/appointments/list">Appointments</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbPage>Schedule</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>
        <h2 className="text-3xl font-bold tracking-tight mt-2">Schedule Appointment</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Appointment</CardTitle>
          <CardDescription>Schedule a new appointment with a contact</CardDescription>
        </CardHeader>
        <CardContent>
          <AppointmentScheduler />
        </CardContent>
      </Card>
    </div>
  )
}
