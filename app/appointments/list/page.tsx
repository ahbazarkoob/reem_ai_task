import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppointmentList } from "@/components/appointment-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function AppointmentsListPage() {
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
              <BreadcrumbPage>Appointments</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
          <h2 className="text-3xl font-bold tracking-tight mt-2">
            Appointments
          </h2>
        </div>
        <Button asChild>
          <Link href="/appointments/schedule">
            <Plus className="mr-2 h-4 w-4" /> Schedule Appointment
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger
            value="upcoming"
            className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="past"
            className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
          >
            Past
          </TabsTrigger>
          <TabsTrigger
            value="canceled"
            className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
          >
            Canceled
          </TabsTrigger>
          <TabsTrigger
            value="all"
            className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
          >
            All
          </TabsTrigger>
        </TabsList>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Appointment List</CardTitle>
            <CardDescription>
              View and manage your scheduled appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TabsContent value="upcoming" className="mt-0">
              <AppointmentList filter="upcoming" />
            </TabsContent>
            <TabsContent value="past" className="mt-0">
              <AppointmentList filter="past" />
            </TabsContent>
            <TabsContent value="canceled" className="mt-0">
              <AppointmentList filter="canceled" />
            </TabsContent>
            <TabsContent value="all" className="mt-0">
              <AppointmentList filter="all" />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
