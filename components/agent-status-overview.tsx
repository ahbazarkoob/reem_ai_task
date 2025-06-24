"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Phone, CheckCircle2, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function AgentStatusOverview() {
  // This would typically come from an API or state management
  const agentStats = {
    totalAgents: 12,
    activeAgents: 8,
    inactiveBots: 4,
    activeCalls: 5,
    queuedCalls: 3,
    avgResponseTime: 1.8, // seconds
    avgCallDuration: 3.2, // minutes
    systemHealth: 98, // percentage
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Agent Status</CardTitle>
          <Bot className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {agentStats.activeAgents} / {agentStats.totalAgents}
          </div>
          <div className="mt-2">
            <Progress value={(agentStats.activeAgents / agentStats.totalAgents) * 100} className="h-2" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {agentStats.activeAgents} active, {agentStats.inactiveBots} inactive
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Calls</CardTitle>
          <Phone className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{agentStats.activeCalls}</div>
          <p className="text-xs text-muted-foreground">{agentStats.queuedCalls} calls in queue</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Response Time</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{agentStats.avgResponseTime}s</div>
          <p className="text-xs text-muted-foreground">Avg. call duration: {agentStats.avgCallDuration} min</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">System Health</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{agentStats.systemHealth}%</div>
          <div className="mt-2">
            <Progress value={agentStats.systemHealth} className="h-2" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">All systems operational</p>
        </CardContent>
      </Card>
    </div>
  )
}
