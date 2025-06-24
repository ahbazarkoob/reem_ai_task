import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { ReportsList } from "@/components/reports-list"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"

export const metadata: Metadata = {
  title: "Analytics & Reports | AI Campaign Dashboard",
  description: "View analytics and generate reports for your AI campaigns",
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1">
        <Breadcrumb className="mb-4">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/analytics">Analytics & Reports</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <h2 className="text-3xl font-bold tracking-tight">Analytics & Reports</h2>
        <p className="text-muted-foreground">View detailed analytics and generate reports for your AI campaigns</p>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="campaigns">Campaign Reports</TabsTrigger>
          <TabsTrigger value="agents">Agent Reports</TabsTrigger>
          <TabsTrigger value="contacts">Contact Reports</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <ReportsList reportType="campaigns" />
        </TabsContent>

        <TabsContent value="agents" className="space-y-4">
          <ReportsList reportType="agents" />
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <ReportsList reportType="contacts" />
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <ReportsList reportType="custom" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
