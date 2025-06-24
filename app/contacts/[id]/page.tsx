import { DashboardLayout } from "@/components/dashboard-layout"
import { ContactDetail } from "@/components/contact-detail"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ContactDetailPage({ params }: { params: { id: string } }) {
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
            <h1 className="text-3xl font-bold tracking-tight">Contact Details</h1>
            <p className="text-muted-foreground">View and manage contact information</p>
          </div>
        </div>

        <ContactDetail id={params.id} />
      </div>
    </DashboardLayout>
  )
}
