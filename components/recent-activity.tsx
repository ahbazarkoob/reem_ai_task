import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, MessageSquare, Phone } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      id: "a1",
      type: "email",
      action: "opened",
      contact: {
        name: "John Smith",
        email: "john.smith@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      campaign: "Q2 Customer Outreach",
      time: "10 minutes ago",
    },
    {
      id: "a2",
      type: "call",
      action: "completed",
      contact: {
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      campaign: "Customer Feedback Survey",
      time: "25 minutes ago",
    },
    {
      id: "a3",
      type: "sms",
      action: "replied",
      contact: {
        name: "Michael Brown",
        email: "m.brown@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      campaign: "Appointment Reminders",
      time: "1 hour ago",
    },
    {
      id: "a4",
      type: "email",
      action: "clicked",
      contact: {
        name: "Emily Davis",
        email: "emily.d@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      campaign: "Q2 Customer Outreach",
      time: "2 hours ago",
    },
    {
      id: "a5",
      type: "call",
      action: "scheduled",
      contact: {
        name: "Robert Wilson",
        email: "r.wilson@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      campaign: "Customer Feedback Survey",
      time: "3 hours ago",
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "sms":
        return <MessageSquare className="h-4 w-4" />
      case "call":
        return <Phone className="h-4 w-4" />
      default:
        return <Mail className="h-4 w-4" />
    }
  }

  const getActionText = (type: string, action: string) => {
    switch (type) {
      case "email":
        return action === "opened"
          ? "opened an email"
          : action === "clicked"
            ? "clicked a link in an email"
            : "received an email"
      case "sms":
        return action === "replied" ? "replied to an SMS" : "received an SMS"
      case "call":
        return action === "completed"
          ? "completed a call"
          : action === "scheduled"
            ? "scheduled a call"
            : "received a call"
      default:
        return "interacted"
    }
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.contact.avatar || "/placeholder.svg"} alt={activity.contact.name} />
            <AvatarFallback>{activity.contact.name.substring(0, 2)}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-1">
            <p className="text-sm">
              <span className="font-medium">{activity.contact.name}</span>{" "}
              {getActionText(activity.type, activity.action)} from{" "}
              <span className="font-medium">{activity.campaign}</span>
            </p>
            <div className="flex items-center gap-2">
              <div
                className={`rounded-full p-1 ${activity.type === "email" ? "bg-blue-100" : activity.type === "sms" ? "bg-green-100" : "bg-purple-100"}`}
              >
                {getTypeIcon(activity.type)}
              </div>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
