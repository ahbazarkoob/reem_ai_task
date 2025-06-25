import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InboundCallRecords } from "@/components/inbound-call-records";
import { InboundCallQueue } from "@/components/inbound-call-queue";
import { AIAgentSettings } from "@/components/ai-agent-settings";

export default function InboundCallsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Inbound Calls</h2>
        <p className="text-muted-foreground">
          Manage and monitor AI-handled inbound calls.
        </p>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger
            value="active"
            className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
          >
            Active Calls
          </TabsTrigger>
          <TabsTrigger
            value="queue"
            className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
          >
            Call Queue
          </TabsTrigger>
          <TabsTrigger
            value="records"
            className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
          >
            Call Records
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
          >
            AI Agent Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Inbound Calls</CardTitle>
              <CardDescription>
                Currently active AI-handled inbound calls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>No active inbound calls at the moment</p>
                <p className="text-sm mt-2">
                  AI agents are ready to handle incoming calls
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="queue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inbound Call Queue</CardTitle>
              <CardDescription>
                Calls waiting to be handled by AI agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InboundCallQueue />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inbound Call Records</CardTitle>
              <CardDescription>
                History of AI-handled inbound calls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InboundCallRecords />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Agent Settings</CardTitle>
              <CardDescription>
                Configure AI agent behavior for inbound calls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AIAgentSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
