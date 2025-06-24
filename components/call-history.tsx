"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowDownLeft, ArrowUpRight, Calendar, Clock, Info, Phone, Search, User } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function CallHistory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")

  // Sample call history data
  const callHistory = [
    {
      id: "call1",
      contactName: "John Smith",
      contactNumber: "+1 (555) 123-4567",
      contactAvatar: "/placeholder.svg?height=40&width=40",
      direction: "outbound",
      status: "completed",
      duration: "5:23",
      date: "Today",
      time: "10:30 AM",
      notes: "Discussed upcoming renewal, customer interested in premium plan",
      campaign: "Q2 Customer Outreach",
    },
    {
      id: "call2",
      contactName: "Sarah Johnson",
      contactNumber: "+1 (555) 234-5678",
      contactAvatar: "/placeholder.svg?height=40&width=40",
      direction: "inbound",
      status: "completed",
      duration: "3:45",
      date: "Today",
      time: "9:15 AM",
      notes: "Customer had questions about billing",
      campaign: null,
    },
    {
      id: "call3",
      contactName: "Michael Brown",
      contactNumber: "+1 (555) 345-6789",
      contactAvatar: "/placeholder.svg?height=40&width=40",
      direction: "outbound",
      status: "missed",
      duration: "0:00",
      date: "Yesterday",
      time: "4:20 PM",
      notes: "No answer, left voicemail",
      campaign: "Customer Feedback Survey",
    },
    {
      id: "call4",
      contactName: "Emily Davis",
      contactNumber: "+1 (555) 456-7890",
      contactAvatar: "/placeholder.svg?height=40&width=40",
      direction: "outbound",
      status: "completed",
      duration: "8:12",
      date: "Yesterday",
      time: "2:45 PM",
      notes: "Detailed product demo, customer will decide by next week",
      campaign: "Q2 Customer Outreach",
    },
    {
      id: "call5",
      contactName: "Robert Wilson",
      contactNumber: "+1 (555) 567-8901",
      contactAvatar: "/placeholder.svg?height=40&width=40",
      direction: "inbound",
      status: "completed",
      duration: "1:30",
      date: "May 20, 2025",
      time: "11:10 AM",
      notes: "Quick question about service hours",
      campaign: null,
    },
    {
      id: "call6",
      contactName: "Jennifer Taylor",
      contactNumber: "+1 (555) 678-9012",
      contactAvatar: "/placeholder.svg?height=40&width=40",
      direction: "outbound",
      status: "missed",
      duration: "0:00",
      date: "May 19, 2025",
      time: "3:30 PM",
      notes: "No answer, scheduled callback",
      campaign: "Customer Feedback Survey",
    },
    {
      id: "call7",
      contactName: "David Martinez",
      contactNumber: "+1 (555) 789-0123",
      contactAvatar: "/placeholder.svg?height=40&width=40",
      direction: "outbound",
      status: "completed",
      duration: "4:15",
      date: "May 18, 2025",
      time: "10:00 AM",
      notes: "Successful upsell to premium plan",
      campaign: "Q2 Customer Outreach",
    },
  ]

  // Filter calls based on search query and filter type
  const filteredCalls = callHistory.filter((call) => {
    const matchesSearch =
      call.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.contactNumber.includes(searchQuery) ||
      (call.notes && call.notes.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (call.campaign && call.campaign.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesFilter =
      filterType === "all" ||
      (filterType === "outbound" && call.direction === "outbound") ||
      (filterType === "inbound" && call.direction === "inbound") ||
      (filterType === "missed" && call.status === "missed") ||
      (filterType === "completed" && call.status === "completed")

    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search call history..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select defaultValue="all" value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Calls</SelectItem>
            <SelectItem value="outbound">Outbound</SelectItem>
            <SelectItem value="inbound">Inbound</SelectItem>
            <SelectItem value="missed">Missed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="h-[400px]">
        <div className="space-y-2">
          {filteredCalls.map((call) => (
            <div key={call.id} className="flex items-center justify-between p-3 rounded-md hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={call.contactAvatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{call.contactName}</h4>
                    {call.direction === "outbound" ? (
                      <ArrowUpRight className="h-3 w-3 text-blue-500" />
                    ) : (
                      <ArrowDownLeft className="h-3 w-3 text-green-500" />
                    )}
                    {call.status === "missed" && <span className="text-xs text-red-500">Missed</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{call.contactNumber}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" /> {call.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> {call.time}
                    </span>
                    {call.status === "completed" && <span>{call.duration}</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Dialog>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Info className="h-4 w-4" />
                            <span className="sr-only">Call Details</span>
                          </Button>
                        </DialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Details</p>
                      </TooltipContent>
                    </Tooltip>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Call Details</DialogTitle>
                        <DialogDescription>Details for call with {call.contactName}</DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4 py-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={call.contactAvatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              <User className="h-6 w-6" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-lg">{call.contactName}</h3>
                            <p className="text-muted-foreground">{call.contactNumber}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium">Date & Time</h4>
                            <p className="text-sm text-muted-foreground">
                              {call.date} at {call.time}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Duration</h4>
                            <p className="text-sm text-muted-foreground">
                              {call.status === "completed" ? call.duration : "N/A"}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Type</h4>
                            <p className="text-sm text-muted-foreground capitalize">
                              {call.direction} {call.status === "missed" && "(Missed)"}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Campaign</h4>
                            <p className="text-sm text-muted-foreground">{call.campaign || "N/A"}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium">Notes</h4>
                          <p className="text-sm text-muted-foreground mt-1">{call.notes || "No notes available"}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TooltipProvider>

                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                >
                  <Phone className="h-4 w-4" />
                  <span className="sr-only">Call {call.contactName}</span>
                </Button>
              </div>
            </div>
          ))}

          {filteredCalls.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              <p>No call history found</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
