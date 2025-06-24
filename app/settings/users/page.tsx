import { DashboardLayout } from "@/components/dashboard-layout"
import { UserManagement } from "@/components/user-management"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"

export default function UserManagementPage() {
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
              <BreadcrumbLink>Users & Roles</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <h1 className="text-3xl font-bold tracking-tight mt-2">User & Role Management</h1>
          <p className="text-muted-foreground mt-1">Manage users, roles, and permissions for your organization.</p>
        </div>
        <UserManagement />
      </div>
    </DashboardLayout>
  )
}
