import { ContactList } from "@/components/contact-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContactStats } from "@/components/contact-stats";
import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";
import Link from "next/link";

export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
          <p className="text-muted-foreground">
            Manage your contacts and contact lists
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/contacts/import">
              <Upload className="mr-2 h-4 w-4" />
              Import Contacts
            </Link>
          </Button>
          <Button asChild>
            <Link href="/contacts/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Contact
            </Link>
          </Button>
        </div>
      </div>

      <ContactStats />

      <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger
              value="all"
              className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
            >
              All Contacts
            </TabsTrigger>
            <TabsTrigger
              value="recent"
              className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
            >
              Recently Added
            </TabsTrigger>
            <TabsTrigger
              value="lists"
              className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
            >
              Contact Lists
            </TabsTrigger>
            <TabsTrigger
              value="tags"
              className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
            >
              Tags
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all" className="mt-6">
          <ContactList />
        </TabsContent>
        <TabsContent value="recent" className="mt-6">
          <ContactList filter="recent" />
        </TabsContent>
        <TabsContent value="lists" className="mt-6">
          <ContactList filter="lists" />
        </TabsContent>
        <TabsContent value="tags" className="mt-6">
          <ContactList filter="tags" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
