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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MoreHorizontal, Search, Tag } from "lucide-react"
import Link from "next/link"

interface ContactListProps {
  filter?: "all" | "recent" | "lists" | "tags"
}

export function ContactList({ filter = "all" }: ContactListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("name")

  // Mock data for contacts
  const contacts = [
    {
      id: "c1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      company: "Acme Inc",
      status: "active",
      tags: ["customer", "premium"],
      lastContact: "2023-05-15",
      addedDate: "2022-10-05",
    },
    {
      id: "c2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 987-6543",
      company: "Globex Corp",
      status: "active",
      tags: ["lead", "interested"],
      lastContact: "2023-05-20",
      addedDate: "2023-01-15",
    },
    {
      id: "c3",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      phone: "+1 (555) 456-7890",
      company: "Initech",
      status: "inactive",
      tags: ["customer"],
      lastContact: "2023-04-10",
      addedDate: "2022-08-22",
    },
    {
      id: "c4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "+1 (555) 789-0123",
      company: "Umbrella Corp",
      status: "active",
      tags: ["customer", "premium", "enterprise"],
      lastContact: "2023-05-18",
      addedDate: "2022-11-30",
    },
    {
      id: "c5",
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      phone: "+1 (555) 321-6547",
      company: "Stark Industries",
      status: "active",
      tags: ["lead"],
      lastContact: "2023-05-22",
      addedDate: "2023-05-01",
    },
    {
      id: "c6",
      name: "Sarah Brown",
      email: "sarah.brown@example.com",
      phone: "+1 (555) 654-9870",
      company: "Wayne Enterprises",
      status: "inactive",
      tags: ["customer", "churned"],
      lastContact: "2023-03-15",
      addedDate: "2022-07-12",
    },
    {
      id: "c7",
      name: "David Miller",
      email: "david.miller@example.com",
      phone: "+1 (555) 987-1234",
      company: "Cyberdyne Systems",
      status: "active",
      tags: ["customer", "premium"],
      lastContact: "2023-05-10",
      addedDate: "2023-02-18",
    },
    {
      id: "c8",
      name: "Jennifer Taylor",
      email: "jennifer.taylor@example.com",
      phone: "+1 (555) 234-5678",
      company: "Oscorp",
      status: "active",
      tags: ["lead", "interested"],
      lastContact: "2023-05-05",
      addedDate: "2023-04-20",
    },
  ]

  // Filter contacts based on filter type and search query
  const filteredContacts = contacts.filter((contact) => {
    // Apply filter based on filter type
    if (filter === "recent") {
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      const contactDate = new Date(contact.addedDate)
      if (contactDate < thirtyDaysAgo) {
        return false
      }
    } else if (filter === "lists") {
      // For demo purposes, we'll just show all contacts in the lists view
    } else if (filter === "tags") {
      // For demo purposes, we'll just show all contacts in the tags view
    }

    // Apply search filter
    const searchLower = searchQuery.toLowerCase()
    return (
      contact.name.toLowerCase().includes(searchLower) ||
      contact.email.toLowerCase().includes(searchLower) ||
      contact.phone.includes(searchQuery) ||
      contact.company.toLowerCase().includes(searchLower)
    )
  })

  // Sort contacts based on selected sort option
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name)
    } else if (sortBy === "company") {
      return a.company.localeCompare(b.company)
    } else if (sortBy === "lastContact") {
      return new Date(b.lastContact).getTime() - new Date(a.lastContact).getTime()
    } else if (sortBy === "addedDate") {
      return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
    }
    return 0
  })

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="company">Company (A-Z)</SelectItem>
                <SelectItem value="lastContact">Last Contact (newest first)</SelectItem>
                <SelectItem value="addedDate">Date Added (newest first)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-right">Last Contact</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedContacts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                    No contacts found
                  </TableCell>
                </TableRow>
              ) : (
                sortedContacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">
                      <Link href={`/contacts/${contact.id}`} className="hover:underline">
                        {contact.name}
                      </Link>
                    </TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell>{contact.company}</TableCell>
                    <TableCell>
                      <Badge variant={contact.status === "active" ? "default" : "secondary"}>{contact.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {contact.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{new Date(contact.lastContact).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Edit contact</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Add to campaign</DropdownMenuItem>
                          <DropdownMenuItem>Add to list</DropdownMenuItem>
                          <DropdownMenuItem>Manage tags</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete contact</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
