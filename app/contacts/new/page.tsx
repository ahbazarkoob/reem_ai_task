import { DashboardLayout } from "@/components/dashboard-layout"
import { ContactForm } from "@/components/contact-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewContactPage() {
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
            <h1 className="text-3xl font-bold tracking-tight">Add New Contact</h1>
            <p className="text-muted-foreground">Create a new contact in your database</p>
          </div>
        </div>

        <ContactForm />
      </div>
    </DashboardLayout>
  )
}
