import { DashboardLayout } from "@/components/dashboard-layout"
import { SettingsOverview } from "@/components/settings-overview"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className="h-4 w-4" />
              </BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink>Settings</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <h1 className="text-3xl font-bold tracking-tight mt-2">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your application settings and preferences.</p>
        </div>
        <SettingsOverview />
      </div>
    </DashboardLayout>
  )
}
