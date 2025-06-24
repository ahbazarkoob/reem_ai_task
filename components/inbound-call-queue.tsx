"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Bot, Clock, PhoneForwarded, User } from "lucide-react"

export function InboundCallQueue() {
  // Sample queue data
  const queueItems = [
    {
      id: "q1",
      contactNumber: "+1 (555) 123-4567",
      waitTime: "0:42",
      estimatedWaitTime: "< 1 min",
      position: 1,
      aiAgent: "Sales Assistant",
      predictedIntent: "Product Inquiry",
    },
    {
      id: "q2",
      contactNumber: "+1 (555) 987-6543",
      waitTime: "0:28",
      estimatedWaitTime: "< 1 min",
      position: 2,
      aiAgent: "General Assistant",
      predictedIntent: "Unknown",
    },
    {
      id: "q3",
      contactNumber: "+1 (555) 456-7890",
      waitTime: "0:15",
      estimatedWaitTime: "~2 min",
      position: 3,
      aiAgent: "Appointment Assistant",
      predictedIntent: "Scheduling",
    },
  ]

  // Queue stats
  const queueStats = {
    totalInQueue: queueItems.length,
    averageWaitTime: "1:05",
    activeAgents: 5,
    maxQueueSize: 10,
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm font-medium text-muted-foreground">In Queue</div>
          <div className="text-2xl font-bold mt-1">{queueStats.totalInQueue}</div>
          <Progress value={(queueStats.totalInQueue / queueStats.maxQueueSize) * 100} className="h-1 mt-2" />
        </Card>

        <Card className="p-4">
          <div className="text-sm font-medium text-muted-foreground">Avg. Wait Time</div>
          <div className="text-2xl font-bold mt-1">{queueStats.averageWaitTime}</div>
        </Card>

        <Card className="p-4">
          <div className="text-sm font-medium text-muted-foreground">Active AI Agents</div>
          <div className="text-2xl font-bold mt-1">{queueStats.activeAgents}</div>
        </Card>

        <Card className="p-4">
          <div className="text-sm font-medium text-muted-foreground">Queue Capacity</div>
          <div className="text-2xl font-bold mt-1">
            {queueStats.totalInQueue}/{queueStats.maxQueueSize}
          </div>
        </Card>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-medium">Current Queue</h3>

        {queueItems.length > 0 ? (
          queueItems.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{item.contactNumber}</h4>
                      <Badge variant="outline">Position {item.position}</Badge>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" /> Wait time: {item.waitTime}
                      </span>
                      <span>•</span>
                      <span>Est: {item.estimatedWaitTime}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Bot className="h-3 w-3" /> {item.aiAgent}
                      </Badge>
                      {item.predictedIntent && (
                        <Badge variant="secondary" className="text-xs">
                          Predicted: {item.predictedIntent}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <PhoneForwarded className="h-3 w-3" /> Prioritize
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            <p>No calls currently in queue</p>
            <p className="text-sm mt-2">AI agents are ready to handle incoming calls</p>
          </div>
        )}
      </div>
    </div>
  )
}
