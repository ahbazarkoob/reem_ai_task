"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Search, User } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ContactSelectorProps {
  variant: "recent" | "all"
  onSelectContact?: (contact: any) => void
}

export function ContactSelector({ variant, onSelectContact }: ContactSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Sample contact data
  const allContacts = [
    {
      id: "c1",
      name: "John Smith",
      number: "+1 (555) 123-4567",
      email: "john.smith@example.com",
      company: "Acme Inc",
      lastContacted: "2 days ago",
      tags: ["customer", "priority"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "c2",
      name: "Sarah Johnson",
      number: "+1 (555) 234-5678",
      email: "sarah.j@example.com",
      company: "Globex Corp",
      lastContacted: "1 week ago",
      tags: ["prospect"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "c3",
      name: "Michael Brown",
      number: "+1 (555) 345-6789",
      email: "m.brown@example.com",
      company: "Acme Inc",
      lastContacted: "3 days ago",
      tags: ["customer"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "c4",
      name: "Emily Davis",
      number: "+1 (555) 456-7890",
      email: "emily.d@example.com",
      company: "Initech",
      lastContacted: "Just now",
      tags: ["customer", "priority"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "c5",
      name: "Robert Wilson",
      number: "+1 (555) 567-8901",
      email: "r.wilson@example.com",
      company: "Globex Corp",
      lastContacted: "1 hour ago",
      tags: ["prospect"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "c6",
      name: "Jennifer Taylor",
      number: "+1 (555) 678-9012",
      email: "j.taylor@example.com",
      company: "Initech",
      lastContacted: "2 weeks ago",
      tags: ["customer"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "c7",
      name: "David Martinez",
      number: "+1 (555) 789-0123",
      email: "d.martinez@example.com",
      company: "Acme Inc",
      lastContacted: "1 month ago",
      tags: ["customer"],
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Recent contacts (first 5)
  const recentContacts = allContacts.slice(0, 5)

  // Filter contacts based on search query
  const filteredContacts = allContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.number.includes(searchQuery) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Contacts to display based on variant
  const displayContacts = variant === "recent" ? recentContacts : filteredContacts

  // Handle calling a contact
  const handleCallContact = (contact: any) => {
    if (onSelectContact) {
      onSelectContact(contact)
    } else {
      // Navigate to dialer with contact info
      window.location.href = `/calls/outbound?contact=${encodeURIComponent(JSON.stringify(contact))}`
    }
  }

  return (
    <div className="space-y-4">
      {variant === "all" && (
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search contacts..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Contacts</SelectItem>
              <SelectItem value="customer">Customers</SelectItem>
              <SelectItem value="prospect">Prospects</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <ScrollArea className={variant === "all" ? "h-[400px]" : "h-[300px]"}>
        <div className="space-y-2">
          {displayContacts.map((contact) => (
            <div key={contact.id} className="flex items-center justify-between p-3 rounded-md hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{contact.name}</h4>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">{contact.number}</p>
                    {variant === "recent" && (
                      <span className="text-xs text-muted-foreground">• {contact.lastContacted}</span>
                    )}
                  </div>
                  {variant === "all" && (
                    <div className="flex items-center gap-1 mt-1">
                      <p className="text-xs text-muted-foreground">{contact.company}</p>
                      {contact.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs py-0 h-5">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                onClick={() => handleCallContact(contact)}
              >
                <Phone className="h-4 w-4" />
                <span className="sr-only">Call {contact.name}</span>
              </Button>
            </div>
          ))}

          {displayContacts.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              <p>No contacts found</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
