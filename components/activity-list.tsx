import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Phone,
  Mail,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

// Sample activity data
const activities = [
  {
    id: "act-1",
    type: "call",
    title: "Outbound Call",
    contact: {
      name: "John Smith",
      email: "john@example.com",
      avatar: "/placeholder-user.png?height=40&width=40",
    },
    campaign: "Q2 Product Demo",
    timestamp: "2023-05-22T14:30:00",
    duration: "4m 12s",
    status: "completed",
    summary:
      "Discussed new product features, client showed interest in premium plan",
    tags: ["follow-up", "interested"],
  },
  {
    id: "act-2",
    type: "email",
    title: "Campaign Email",
    contact: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      avatar: "/placeholder-user.png?height=40&width=40",
    },
    campaign: "Monthly Newsletter",
    timestamp: "2023-05-22T10:15:00",
    status: "opened",
    summary: "Monthly newsletter opened, clicked on 3 links",
    tags: ["newsletter", "engaged"],
  },
  {
    id: "act-3",
    type: "sms",
    title: "Appointment Reminder",
    contact: {
      name: "Michael Brown",
      email: "michael@example.com",
      avatar: "/placeholder-user.png?height=40&width=40",
    },
    campaign: "Appointment Reminders",
    timestamp: "2023-05-22T09:45:00",
    status: "delivered",
    summary: "Reminder for tomorrow's appointment at 2:00 PM",
    tags: ["appointment", "reminder"],
  },
  {
    id: "act-4",
    type: "call",
    title: "Inbound Call",
    contact: {
      name: "Emily Davis",
      email: "emily@example.com",
      avatar: "/placeholder-user.png?height=40&width=40",
    },
    campaign: "Support Line",
    timestamp: "2023-05-21T16:20:00",
    duration: "8m 45s",
    status: "completed",
    summary: "Customer had questions about billing, issue resolved",
    tags: ["support", "billing"],
  },
  {
    id: "act-5",
    type: "email",
    title: "Follow-up Email",
    contact: {
      name: "Robert Wilson",
      email: "robert@example.com",
      avatar: "/placeholder-user.png?height=40&width=40",
    },
    campaign: "Demo Follow-up",
    timestamp: "2023-05-21T13:10:00",
    status: "not-opened",
    summary: "Follow-up after product demo with additional resources",
    tags: ["follow-up", "resources"],
  },
  {
    id: "act-6",
    type: "sms",
    title: "Promotional SMS",
    contact: {
      name: "Jennifer Lee",
      email: "jennifer@example.com",
      avatar: "/placeholder-user.png?height=40&width=40",
    },
    campaign: "Summer Sale",
    timestamp: "2023-05-21T11:30:00",
    status: "delivered",
    summary: "Promotional message about summer sale with 20% discount code",
    tags: ["promotion", "sale"],
  },
  {
    id: "act-7",
    type: "call",
    title: "Scheduled Call",
    contact: {
      name: "David Miller",
      email: "david@example.com",
      avatar: "/placeholder-user.png?height=40&width=40",
    },
    campaign: "Product Demo",
    timestamp: "2023-05-20T15:45:00",
    duration: "12m 33s",
    status: "completed",
    summary: "Comprehensive product demo, client requested pricing information",
    tags: ["demo", "pricing"],
  },
  {
    id: "act-8",
    type: "email",
    title: "Welcome Email",
    contact: {
      name: "Lisa Anderson",
      email: "lisa@example.com",
      avatar: "/placeholder-user.png?height=40&width=40",
    },
    campaign: "New Customer Onboarding",
    timestamp: "2023-05-20T09:20:00",
    status: "opened",
    summary: "Welcome email with getting started resources",
    tags: ["onboarding", "welcome"],
  },
];

// Helper function to filter activities by type
const filterActivities = (type: string) => {
  if (type === "all") return activities;
  return activities.filter((activity) => activity.type === type);
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
};

// Helper function to get icon by activity type
const getActivityIcon = (type: string) => {
  switch (type) {
    case "call":
      return <Phone className="h-5 w-5 text-blue-500" />;
    case "email":
      return <Mail className="h-5 w-5 text-purple-500" />;
    case "sms":
      return <MessageSquare className="h-5 w-5 text-green-500" />;
    default:
      return <Clock className="h-5 w-5 text-gray-500" />;
  }
};

// Helper function to get status icon
const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
    case "opened":
    case "delivered":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "failed":
      return <XCircle className="h-4 w-4 text-red-500" />;
    case "not-opened":
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    default:
      return <Clock className="h-4 w-4 text-gray-500" />;
  }
};

// Helper function to get status text
const getStatusText = (status: string) => {
  switch (status) {
    case "completed":
      return "Completed";
    case "opened":
      return "Opened";
    case "delivered":
      return "Delivered";
    case "failed":
      return "Failed";
    case "not-opened":
      return "Not Opened";
    default:
      return "Pending";
  }
};

// Helper function to get status color
const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
    case "opened":
    case "delivered":
      return "bg-green-100 text-green-800";
    case "failed":
      return "bg-red-100 text-red-800";
    case "not-opened":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

interface ActivityListProps {
  type: string;
}

export function ActivityList({ type }: ActivityListProps) {
  const filteredActivities = filterActivities(type);

  return (
    <div className="space-y-6">
      {filteredActivities.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No activities found</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {filteredActivities.map((activity) => (
              <Card key={activity.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-start p-6">
                    <div className="mr-4 flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-medium truncate">
                          {activity.title}
                        </h3>
                        <Badge
                          variant="outline"
                          className={getStatusColor(activity.status)}
                        >
                          <span className="flex items-center gap-1">
                            {getStatusIcon(activity.status)}
                            {getStatusText(activity.status)}
                          </span>
                        </Badge>
                      </div>
                      <div className="flex items-center mb-2">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage
                            src={
                              activity.contact.avatar || "/placeholder-user.png"
                            }
                            alt={activity.contact.name}
                          />
                          <AvatarFallback>
                            {activity.contact.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">
                          {activity.contact.name}
                        </span>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">
                          {activity.campaign}
                        </span>
                        <span className="mx-2 text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(activity.timestamp)}
                        </span>
                        {activity.duration && (
                          <>
                            <span className="mx-2 text-muted-foreground">
                              •
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {activity.duration}
                            </span>
                          </>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {activity.summary}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {activity.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/50 px-6 py-3">
                  <div className="flex justify-between items-center w-full">
                    <div className="text-sm text-muted-foreground">
                      Activity ID: {activity.id}
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1">
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
}
