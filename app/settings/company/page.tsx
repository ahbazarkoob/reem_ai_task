import { DashboardLayout } from "@/components/dashboard-layout"
import { CompanySettings } from "@/components/company-settings"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"

export default function CompanySettingsPage() {
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
              <BreadcrumbLink href="/settings">Settings</BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink>Company</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <h1 className="text-3xl font-bold tracking-tight mt-2">Company Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your company profile, branding, and system preferences.</p>
        </div>
        <CompanySettings />
      </div>
    </DashboardLayout>
  )
}
