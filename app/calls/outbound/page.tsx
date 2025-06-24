import { CallInterface } from "@/components/call-interface"
import { ContactSelector } from "@/components/contact-selector"
import { OutboundCallRecords } from "@/components/outbound-call-records"
import { AIScriptEditor } from "@/components/ai-script-editor"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function OutboundCallsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Outbound Calls</h2>
        <p className="text-muted-foreground">Manage AI-driven outbound calls to your contacts.</p>
      </div>

      <Tabs defaultValue="records" className="space-y-4">
        <TabsList>
          <TabsTrigger value="records">Call Records</TabsTrigger>
          <TabsTrigger value="dialer">Manual Dialer</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="scripts">AI Scripts</TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Outbound Call Records</CardTitle>
              <CardDescription>History of AI-driven outbound calls</CardDescription>
            </CardHeader>
            <CardContent>
              <OutboundCallRecords />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dialer" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Call Interface</CardTitle>
                <CardDescription>Make outbound calls to your contacts</CardDescription>
              </CardHeader>
              <CardContent>
                <CallInterface />
              </CardContent>
            </Card>

            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Recent Contacts</CardTitle>
                <CardDescription>Quickly call your recent contacts</CardDescription>
              </CardHeader>
              <CardContent>
                <ContactSelector variant="recent" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Contacts</CardTitle>
              <CardDescription>Select contacts to call</CardDescription>
            </CardHeader>
            <CardContent>
              <ContactSelector variant="all" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scripts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Call Scripts</CardTitle>
              <CardDescription>Configure scripts for AI-driven outbound calls</CardDescription>
            </CardHeader>
            <CardContent>
              <AIScriptEditor />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
