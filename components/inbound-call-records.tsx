"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowDownLeft,
  Bot,
  Calendar,
  Clock,
  Download,
  Info,
  Play,
  Search,
  User,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function InboundCallRecords() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Sample inbound call records data
  const callRecords = [
    {
      id: "in1",
      contactName: "John Smith",
      contactNumber: "+1 (555) 123-4567",
      contactAvatar: "/placeholder-user.png?height=40&width=40",
      status: "completed",
      duration: "4:12",
      date: "Today",
      time: "10:30 AM",
      notes: "Customer inquired about premium subscription options",
      aiAgent: "Sales Assistant",
      intent: "Product Inquiry",
      sentiment: "positive",
      outcome: "Scheduled demo",
      recordingAvailable: true,
      transcriptAvailable: true,
    },
    {
      id: "in2",
      contactName: "Sarah Johnson",
      contactNumber: "+1 (555) 234-5678",
      contactAvatar: "/placeholder-user.png?height=40&width=40",
      status: "completed",
      duration: "2:45",
      date: "Today",
      time: "9:15 AM",
      notes: "Customer requested appointment rescheduling",
      aiAgent: "Appointment Assistant",
      intent: "Reschedule",
      sentiment: "neutral",
      outcome: "Appointment rescheduled",
      recordingAvailable: true,
      transcriptAvailable: true,
    },
    {
      id: "in3",
      contactName: "Unknown Caller",
      contactNumber: "+1 (555) 345-6789",
      contactAvatar: "/placeholder-user.png?height=40&width=40",
      status: "missed",
      duration: "0:00",
      date: "Yesterday",
      time: "4:20 PM",
      notes: "Call disconnected before AI agent could engage",
      aiAgent: "General Assistant",
      intent: "Unknown",
      sentiment: "unknown",
      outcome: "Call disconnected",
      recordingAvailable: false,
      transcriptAvailable: false,
    },
    {
      id: "in4",
      contactName: "Emily Davis",
      contactNumber: "+1 (555) 456-7890",
      contactAvatar: "/placeholder-user.png?height=40&width=40",
      status: "completed",
      duration: "6:32",
      date: "Yesterday",
      time: "2:45 PM",
      notes: "Customer had detailed questions about product features",
      aiAgent: "Product Specialist",
      intent: "Technical Support",
      sentiment: "mixed",
      outcome: "Questions answered, follow-up email sent",
      recordingAvailable: true,
      transcriptAvailable: true,
    },
    {
      id: "in5",
      contactName: "Robert Wilson",
      contactNumber: "+1 (555) 567-8901",
      contactAvatar: "/placeholder-user.png?height=40&width=40",
      status: "transferred",
      duration: "1:15",
      date: "May 20, 2025",
      time: "11:10 AM",
      notes: "Complex inquiry transferred to human agent",
      aiAgent: "General Assistant",
      intent: "Complaint",
      sentiment: "negative",
      outcome: "Transferred to human agent",
      recordingAvailable: true,
      transcriptAvailable: true,
    },
    {
      id: "in6",
      contactName: "Jennifer Taylor",
      contactNumber: "+1 (555) 678-9012",
      contactAvatar: "/placeholder-user.png?height=40&width=40",
      status: "voicemail",
      duration: "0:42",
      date: "May 19, 2025",
      time: "3:30 PM",
      notes: "Customer left voicemail, AI transcribed and categorized",
      aiAgent: "Voicemail Assistant",
      intent: "Feedback",
      sentiment: "positive",
      outcome: "Voicemail processed, follow-up scheduled",
      recordingAvailable: true,
      transcriptAvailable: true,
    },
    {
      id: "in7",
      contactName: "David Martinez",
      contactNumber: "+1 (555) 789-0123",
      contactAvatar: "/placeholder-user.png?height=40&width=40",
      status: "completed",
      duration: "3:50",
      date: "May 18, 2025",
      time: "10:00 AM",
      notes: "Customer requested product information, AI provided details",
      aiAgent: "Sales Assistant",
      intent: "Product Information",
      sentiment: "positive",
      outcome: "Information provided, added to newsletter",
      recordingAvailable: true,
      transcriptAvailable: true,
    },
  ];

  // Filter calls based on search query and filter type
  const filteredCalls = callRecords.filter((call) => {
    const matchesSearch =
      (call.contactName &&
        call.contactName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      call.contactNumber.includes(searchQuery) ||
      (call.notes &&
        call.notes.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (call.aiAgent &&
        call.aiAgent.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (call.intent &&
        call.intent.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilter =
      filterType === "all" ||
      (filterType === "completed" && call.status === "completed") ||
      (filterType === "missed" && call.status === "missed") ||
      (filterType === "transferred" && call.status === "transferred") ||
      (filterType === "voicemail" && call.status === "voicemail");

    return matchesSearch && matchesFilter;
  });

  // Get sentiment color
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800";
      case "negative":
        return "bg-red-100 text-red-800";
      case "mixed":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "missed":
        return "destructive";
      case "transferred":
        return "outline";
      case "voicemail":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search call records..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          defaultValue="all"
          value={filterType}
          onValueChange={setFilterType}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Calls</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="missed">Missed</SelectItem>
            <SelectItem value="transferred">Transferred</SelectItem>
            <SelectItem value="voicemail">Voicemail</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="h-[500px]">
        <div className="space-y-2">
          {filteredCalls.map((call) => (
            <div
              key={call.id}
              className="flex items-center justify-between p-3 rounded-md hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={call.contactAvatar || "/placeholder-user.png"}
                  />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{call.contactName}</h4>
                    <ArrowDownLeft className="h-3 w-3 text-green-500" />
                    <Badge variant={getStatusVariant(call.status)}>
                      {call.status.charAt(0).toUpperCase() +
                        call.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {call.contactNumber}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" /> {call.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> {call.time}
                    </span>
                    {call.status === "completed" && (
                      <span>{call.duration}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Bot className="h-3 w-3" /> {call.aiAgent}
                    </Badge>
                    {call.intent && (
                      <Badge variant="outline" className="text-xs">
                        {call.intent}
                      </Badge>
                    )}
                    {call.sentiment && call.sentiment !== "unknown" && (
                      <Badge
                        variant="outline"
                        className={`text-xs ${getSentimentColor(
                          call.sentiment
                        )}`}
                      >
                        {call.sentiment}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {call.recordingAvailable && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Play className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Play Recording</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}

                {call.transcriptAvailable && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Download Transcript</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}

                <TooltipProvider>
                  <Dialog>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Info className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Details</p>
                      </TooltipContent>
                    </Tooltip>

                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Inbound Call Details</DialogTitle>
                        <DialogDescription>
                          AI-handled call with {call.contactName}
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-6 py-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={
                                call.contactAvatar || "/placeholder-user.png"
                              }
                            />
                            <AvatarFallback>
                              <User className="h-6 w-6" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-lg">
                              {call.contactName}
                            </h3>
                            <p className="text-muted-foreground">
                              {call.contactNumber}
                            </p>
                          </div>
                          <Badge
                            variant={getStatusVariant(call.status)}
                            className="ml-auto"
                          >
                            {call.status.charAt(0).toUpperCase() +
                              call.status.slice(1)}
                          </Badge>
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
                              {call.status === "completed" ||
                              call.status === "transferred"
                                ? call.duration
                                : "N/A"}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">AI Agent</h4>
                            <p className="text-sm text-muted-foreground">
                              {call.aiAgent}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">
                              Detected Intent
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {call.intent || "Unknown"}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium">
                            Sentiment Analysis
                          </h4>
                          <div className="mt-2 space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Positive</span>
                              <span>
                                {call.sentiment === "positive"
                                  ? "75%"
                                  : call.sentiment === "mixed"
                                  ? "40%"
                                  : "10%"}
                              </span>
                            </div>
                            <Progress
                              value={
                                call.sentiment === "positive"
                                  ? 75
                                  : call.sentiment === "mixed"
                                  ? 40
                                  : 10
                              }
                              className="h-2 bg-gray-100"
                            />

                            <div className="flex justify-between text-xs">
                              <span>Neutral</span>
                              <span>
                                {call.sentiment === "neutral"
                                  ? "80%"
                                  : call.sentiment === "mixed"
                                  ? "30%"
                                  : "15%"}
                              </span>
                            </div>
                            <Progress
                              value={
                                call.sentiment === "neutral"
                                  ? 80
                                  : call.sentiment === "mixed"
                                  ? 30
                                  : 15
                              }
                              className="h-2 bg-gray-100"
                            />

                            <div className="flex justify-between text-xs">
                              <span>Negative</span>
                              <span>
                                {call.sentiment === "negative"
                                  ? "70%"
                                  : call.sentiment === "mixed"
                                  ? "30%"
                                  : "5%"}
                              </span>
                            </div>
                            <Progress
                              value={
                                call.sentiment === "negative"
                                  ? 70
                                  : call.sentiment === "mixed"
                                  ? 30
                                  : 5
                              }
                              className="h-2 bg-gray-100"
                            />
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium">Call Notes</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {call.notes || "No notes available"}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium">Outcome</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {call.outcome}
                          </p>
                        </div>

                        <div className="flex justify-between">
                          {call.recordingAvailable && (
                            <Button
                              variant="outline"
                              className="flex items-center gap-2"
                            >
                              <Play className="h-4 w-4" /> Play Recording
                            </Button>
                          )}
                          {call.transcriptAvailable && (
                            <Button
                              variant="outline"
                              className="flex items-center gap-2"
                            >
                              <Download className="h-4 w-4" /> Download
                              Transcript
                            </Button>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TooltipProvider>
              </div>
            </div>
          ))}

          {filteredCalls.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              <p>No call records found</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
