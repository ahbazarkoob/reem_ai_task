import { DashboardLayout } from "@/components/dashboard-layout"
import { BillingManagement } from "@/components/billing-management"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"

export default function BillingPage() {
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
              <BreadcrumbLink>Billing & Subscription</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <h1 className="text-3xl font-bold tracking-tight mt-2">Billing & Subscription</h1>
          <p className="text-muted-foreground mt-1">Manage your subscription, payment methods, and billing history.</p>
        </div>
        <BillingManagement />
      </div>
    </DashboardLayout>
  )
}
