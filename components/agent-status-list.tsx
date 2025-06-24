"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bot, MoreHorizontal, Search, RefreshCw, Play, Pause, Settings, BarChart, AlertCircle } from "lucide-react"

type AgentStatus = "online" | "offline" | "busy" | "error" | "maintenance"

interface Agent {
  id: string
  name: string
  type: string
  status: AgentStatus
  activeCalls: number
  completedCalls: number
  avgCallDuration: string
  lastActive: string
}

const mockAgents: Agent[] = [
  {
    id: "agent-1",
    name: "Sales Assistant",
    type: "Sales",
    status: "online",
    activeCalls: 2,
    completedCalls: 145,
    avgCallDuration: "3m 12s",
    lastActive: "Now",
  },
  {
    id: "agent-2",
    name: "Support Agent",
    type: "Support",
    status: "busy",
    activeCalls: 1,
    completedCalls: 98,
    avgCallDuration: "4m 45s",
    lastActive: "Now",
  },
  {
    id: "agent-3",
    name: "Appointment Scheduler",
    type: "Scheduling",
    status: "online",
    activeCalls: 1,
    completedCalls: 67,
    avgCallDuration: "2m 30s",
    lastActive: "Now",
  },
  {
    id: "agent-4",
    name: "Lead Qualifier",
    type: "Sales",
    status: "offline",
    activeCalls: 0,
    completedCalls: 203,
    avgCallDuration: "2m 15s",
    lastActive: "2h ago",
  },
  {
    id: "agent-5",
    name: "Customer Feedback",
    type: "Support",
    status: "offline",
    activeCalls: 0,
    completedCalls: 78,
    avgCallDuration: "3m 50s",
    lastActive: "1h ago",
  },
  {
    id: "agent-6",
    name: "Product Specialist",
    type: "Sales",
    status: "error",
    activeCalls: 0,
    completedCalls: 112,
    avgCallDuration: "4m 10s",
    lastActive: "10m ago",
  },
  {
    id: "agent-7",
    name: "Onboarding Guide",
    type: "Support",
    status: "maintenance",
    activeCalls: 0,
    completedCalls: 56,
    avgCallDuration: "5m 20s",
    lastActive: "3h ago",
  },
  {
    id: "agent-8",
    name: "Billing Assistant",
    type: "Support",
    status: "online",
    activeCalls: 1,
    completedCalls: 89,
    avgCallDuration: "2m 40s",
    lastActive: "Now",
  },
]

interface AgentStatusListProps {
  filterStatus: "active" | "all" | "history"
}

export function AgentStatusList({ filterStatus }: AgentStatusListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter agents based on the selected tab
  const filteredAgents = mockAgents.filter((agent) => {
    if (filterStatus === "active") {
      return agent.status === "online" || agent.status === "busy"
    }
    return true
  })

  // Filter agents based on search query
  const searchedAgents = filteredAgents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status: AgentStatus) => {
    switch (status) {
      case "online":
        return <Badge className="bg-green-500">Online</Badge>
      case "offline":
        return <Badge variant="outline">Offline</Badge>
      case "busy":
        return <Badge className="bg-yellow-500">Busy</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      case "maintenance":
        return <Badge variant="secondary">Maintenance</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agents..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Agent</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Active Calls</TableHead>
              <TableHead className="text-center">Completed</TableHead>
              <TableHead className="text-center">Avg. Duration</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {searchedAgents.length > 0 ? (
              searchedAgents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Bot className="mr-2 h-4 w-4 text-muted-foreground" />
                      {agent.name}
                    </div>
                  </TableCell>
                  <TableCell>{agent.type}</TableCell>
                  <TableCell>{getStatusBadge(agent.status)}</TableCell>
                  <TableCell className="text-center">{agent.activeCalls}</TableCell>
                  <TableCell className="text-center">{agent.completedCalls}</TableCell>
                  <TableCell className="text-center">{agent.avgCallDuration}</TableCell>
                  <TableCell>{agent.lastActive}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {agent.status === "online" || agent.status === "busy" ? (
                          <DropdownMenuItem>
                            <Pause className="mr-2 h-4 w-4" /> Pause Agent
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem>
                            <Play className="mr-2 h-4 w-4" /> Start Agent
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" /> Configure
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <BarChart className="mr-2 h-4 w-4" /> View Analytics
                        </DropdownMenuItem>
                        {agent.status === "error" && (
                          <DropdownMenuItem>
                            <AlertCircle className="mr-2 h-4 w-4" /> View Error Logs
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No agents found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
