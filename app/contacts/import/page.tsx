import { DashboardLayout } from "@/components/dashboard-layout"
import { ContactImport } from "@/components/contact-import"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ImportContactsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/contacts">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Import Contacts</h1>
            <p className="text-muted-foreground">Import contacts from a CSV or Excel file</p>
          </div>
        </div>

        <ContactImport />
      </div>
    </DashboardLayout>
  )
}
