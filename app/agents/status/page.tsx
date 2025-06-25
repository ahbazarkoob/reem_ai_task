import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AgentStatusOverview } from "@/components/agent-status-overview"
import { AgentStatusList } from "@/components/agent-status-list"
import { AgentPerformanceMetrics } from "@/components/agent-performance-metrics"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"

export const metadata: Metadata = {
  title: "AI Agent Status | AI Campaign Dashboard",
  description: "Monitor and manage your AI agents in real-time",
}

export default function AgentStatusPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1">
        <Breadcrumb className="mb-4">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/agents">Agents</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/agents/status">Status</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <h2 className="text-3xl font-bold tracking-tight">AI Agent Status</h2>
        <p className="text-muted-foreground">Monitor your AI agents in real-time and view their performance metrics</p>
      </div>

      <AgentStatusOverview />

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active" className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100">Active Agents</TabsTrigger>
          <TabsTrigger value="all" className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100">All Agents</TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100">Performance</TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100">History</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <AgentStatusList filterStatus="active" />
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <AgentStatusList filterStatus="all" />
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <AgentPerformanceMetrics />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <AgentStatusList filterStatus="history" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
