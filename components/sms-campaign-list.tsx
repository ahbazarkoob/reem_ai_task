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
import { MoreHorizontal, Search } from "lucide-react"
import Link from "next/link"

interface SmsCampaignListProps {
  status?: "active" | "completed" | "scheduled" | "all"
}

export function SmsCampaignList({ status = "all" }: SmsCampaignListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date")

  // Mock data for SMS campaigns
  const campaigns = [
    {
      id: "sms-1",
      name: "Product Launch Announcement",
      status: "active",
      sentCount: 1250,
      deliveredCount: 1200,
      clickCount: 350,
      responseCount: 120,
      date: "2023-05-15",
      audience: "All Customers",
    },
    {
      id: "sms-2",
      name: "Flash Sale Notification",
      status: "active",
      sentCount: 5000,
      deliveredCount: 4850,
      clickCount: 1200,
      responseCount: 450,
      date: "2023-05-10",
      audience: "Previous Buyers",
    },
    {
      id: "sms-3",
      name: "Appointment Reminders",
      status: "scheduled",
      sentCount: 0,
      deliveredCount: 0,
      clickCount: 0,
      responseCount: 0,
      date: "2023-06-01",
      audience: "Service Clients",
    },
    {
      id: "sms-4",
      name: "Customer Feedback Request",
      status: "completed",
      sentCount: 3000,
      deliveredCount: 2950,
      clickCount: 800,
      responseCount: 350,
      date: "2023-04-20",
      audience: "Recent Customers",
    },
    {
      id: "sms-5",
      name: "Event Registration Reminder",
      status: "scheduled",
      sentCount: 0,
      deliveredCount: 0,
      clickCount: 0,
      responseCount: 0,
      date: "2023-06-15",
      audience: "Event Registrants",
    },
  ]

  // Filter campaigns based on status and search query
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesStatus = status === "all" || campaign.status === status
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  // Sort campaigns based on selected sort option
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name)
    } else if (sortBy === "date") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortBy === "sent") {
      return b.sentCount - a.sentCount
    } else if (sortBy === "responses") {
      return b.responseCount - a.responseCount
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
              placeholder="Search campaigns..."
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
                <SelectItem value="date">Date (newest first)</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="sent">Sent (highest first)</SelectItem>
                <SelectItem value="responses">Responses (highest first)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Audience</TableHead>
                <TableHead className="text-right">Sent</TableHead>
                <TableHead className="text-right">Delivered</TableHead>
                <TableHead className="text-right">Responses</TableHead>
                <TableHead className="text-right">Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCampaigns.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                    No SMS campaigns found
                  </TableCell>
                </TableRow>
              ) : (
                sortedCampaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">
                      <Link href={`/campaigns/${campaign.id}`} className="hover:underline">
                        {campaign.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          campaign.status === "active"
                            ? "default"
                            : campaign.status === "scheduled"
                              ? "outline"
                              : "secondary"
                        }
                      >
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{campaign.audience}</TableCell>
                    <TableCell className="text-right">{campaign.sentCount.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{campaign.deliveredCount.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{campaign.responseCount.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{new Date(campaign.date).toLocaleDateString()}</TableCell>
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
                          <DropdownMenuItem>Edit campaign</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          {campaign.status === "scheduled" && <DropdownMenuItem>Cancel schedule</DropdownMenuItem>}
                          {campaign.status === "active" && <DropdownMenuItem>Pause campaign</DropdownMenuItem>}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete campaign</DropdownMenuItem>
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
