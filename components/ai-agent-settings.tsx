"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Bot, Save } from "lucide-react"

export function AIAgentSettings() {
  const [activeAgent, setActiveAgent] = useState("sales")

  // Sample agent settings
  const agentSettings = {
    sales: {
      name: "Sales Assistant",
      description: "Handles product inquiries and sales-related calls",
      greeting: "Hello, I'm the AI Sales Assistant at Acme Inc. How can I help you with our products today?",
      voiceType: "friendly",
      voiceGender: "female",
      speakingRate: 1.0,
      maxCallDuration: 10,
      transferThreshold: 0.7,
      active: true,
      capabilities: ["product_info", "pricing", "promotions", "scheduling"],
    },
    support: {
      name: "Support Assistant",
      description: "Handles technical support and troubleshooting calls",
      greeting: "Hi, I'm the AI Support Assistant at Acme Inc. How can I assist you with technical issues today?",
      voiceType: "professional",
      voiceGender: "male",
      speakingRate: 0.9,
      maxCallDuration: 15,
      transferThreshold: 0.6,
      active: true,
      capabilities: ["troubleshooting", "account_help", "returns", "technical_specs"],
    },
    appointment: {
      name: "Appointment Assistant",
      description: "Handles scheduling and appointment management",
      greeting:
        "Hello, I'm the AI Appointment Assistant at Acme Inc. Would you like to schedule, modify, or check an appointment?",
      voiceType: "friendly",
      voiceGender: "female",
      speakingRate: 1.0,
      maxCallDuration: 8,
      transferThreshold: 0.7,
      active: true,
      capabilities: ["scheduling", "reminders", "cancellations", "modifications"],
    },
  }

  const currentAgent = agentSettings[activeAgent as keyof typeof agentSettings]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="sales" value={activeAgent} onValueChange={setActiveAgent} className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="sales" className="flex items-center gap-2 data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100">
            <Bot className="h-4 w-4" /> Sales
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2 data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100">
            <Bot className="h-4 w-4" /> Support
          </TabsTrigger>
          <TabsTrigger value="appointment" className="flex items-center gap-2 data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100">
            <Bot className="h-4 w-4" /> Appointment
          </TabsTrigger>
        </TabsList>

        {Object.keys(agentSettings).map((agentKey) => (
          <TabsContent key={agentKey} value={agentKey} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{agentSettings[agentKey as keyof typeof agentSettings].name} Configuration</CardTitle>
                <CardDescription>{agentSettings[agentKey as keyof typeof agentSettings].description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`${agentKey}-active`}>Active</Label>
                  <Switch
                    id={`${agentKey}-active`}
                    checked={agentSettings[agentKey as keyof typeof agentSettings].active}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${agentKey}-name`}>Agent Name</Label>
                  <Input
                    id={`${agentKey}-name`}
                    defaultValue={agentSettings[agentKey as keyof typeof agentSettings].name}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${agentKey}-greeting`}>Greeting Message</Label>
                  <Textarea
                    id={`${agentKey}-greeting`}
                    rows={3}
                    defaultValue={agentSettings[agentKey as keyof typeof agentSettings].greeting}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`${agentKey}-voice`}>Voice Type</Label>
                    <Select defaultValue={agentSettings[agentKey as keyof typeof agentSettings].voiceType}>
                      <SelectTrigger id={`${agentKey}-voice`}>
                        <SelectValue placeholder="Select voice type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`${agentKey}-gender`}>Voice Gender</Label>
                    <Select defaultValue={agentSettings[agentKey as keyof typeof agentSettings].voiceGender}>
                      <SelectTrigger id={`${agentKey}-gender`}>
                        <SelectValue placeholder="Select voice gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="neutral">Neutral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`${agentKey}-rate`}>Speaking Rate</Label>
                    <span className="text-sm text-muted-foreground">
                      {agentSettings[agentKey as keyof typeof agentSettings].speakingRate}x
                    </span>
                  </div>
                  <Slider
                    id={`${agentKey}-rate`}
                    defaultValue={[agentSettings[agentKey as keyof typeof agentSettings].speakingRate * 100]}
                    max={150}
                    min={50}
                    step={5}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Slower (0.5x)</span>
                    <span>Normal (1.0x)</span>
                    <span>Faster (1.5x)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${agentKey}-duration`}>Max Call Duration (minutes)</Label>
                  <Input
                    id={`${agentKey}-duration`}
                    type="number"
                    defaultValue={agentSettings[agentKey as keyof typeof agentSettings].maxCallDuration}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`${agentKey}-threshold`}>Human Transfer Threshold</Label>
                    <span className="text-sm text-muted-foreground">
                      {agentSettings[agentKey as keyof typeof agentSettings].transferThreshold * 100}%
                    </span>
                  </div>
                  <Slider
                    id={`${agentKey}-threshold`}
                    defaultValue={[agentSettings[agentKey as keyof typeof agentSettings].transferThreshold * 100]}
                    max={100}
                    step={5}
                  />
                  <p className="text-xs text-muted-foreground">
                    When AI confidence falls below this threshold, the call will be transferred to a human agent
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Agent Capabilities</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {agentSettings[agentKey as keyof typeof agentSettings].capabilities.map((capability) => (
                      <div key={capability} className="flex items-center space-x-2">
                        <Switch id={`${agentKey}-${capability}`} defaultChecked />
                        <Label htmlFor={`${agentKey}-${capability}`} className="capitalize">
                          {capability.replace("_", " ")}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Save className="mr-2 h-4 w-4" /> Save Configuration
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
