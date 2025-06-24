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

interface EmailCampaignListProps {
  status?: "active" | "completed" | "scheduled" | "draft" | "all"
}

export function EmailCampaignList({ status = "all" }: EmailCampaignListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date")

  // Mock data for email campaigns
  const campaigns = [
    {
      id: "email-1",
      name: "Monthly Newsletter - June",
      status: "active",
      sentCount: 5250,
      openCount: 2100,
      clickCount: 850,
      date: "2023-06-01",
      subject: "June Updates & Special Offers",
      audience: "All Subscribers",
    },
    {
      id: "email-2",
      name: "Product Launch Announcement",
      status: "scheduled",
      sentCount: 0,
      openCount: 0,
      clickCount: 0,
      date: "2023-06-15",
      subject: "Introducing Our New Product Line",
      audience: "All Customers",
    },
    {
      id: "email-3",
      name: "Customer Feedback Survey",
      status: "completed",
      sentCount: 3500,
      openCount: 1800,
      clickCount: 950,
      date: "2023-05-20",
      subject: "We Value Your Feedback",
      audience: "Recent Customers",
    },
    {
      id: "email-4",
      name: "Summer Sale Promotion",
      status: "draft",
      sentCount: 0,
      openCount: 0,
      clickCount: 0,
      date: "2023-06-10",
      subject: "Summer Sale - Up to 50% Off",
      audience: "All Subscribers",
    },
    {
      id: "email-5",
      name: "Webinar Invitation",
      status: "scheduled",
      sentCount: 0,
      openCount: 0,
      clickCount: 0,
      date: "2023-06-25",
      subject: "Join Our Exclusive Webinar",
      audience: "Premium Subscribers",
    },
    {
      id: "email-6",
      name: "Welcome Series - Email 1",
      status: "active",
      sentCount: 1200,
      openCount: 800,
      clickCount: 450,
      date: "2023-06-02",
      subject: "Welcome to Our Community",
      audience: "New Subscribers",
    },
  ]

  // Filter campaigns based on status and search query
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesStatus = status === "all" || campaign.status === status
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.subject.toLowerCase().includes(searchQuery.toLowerCase())
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
    } else if (sortBy === "opens") {
      return b.openCount - a.openCount
    } else if (sortBy === "clicks") {
      return b.clickCount - a.clickCount
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
                <SelectItem value="opens">Opens (highest first)</SelectItem>
                <SelectItem value="clicks">Clicks (highest first)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Audience</TableHead>
                <TableHead className="text-right">Sent</TableHead>
                <TableHead className="text-right">Opens</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCampaigns.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                    No email campaigns found
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
                    <TableCell>{campaign.subject}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          campaign.status === "active"
                            ? "default"
                            : campaign.status === "scheduled"
                              ? "outline"
                              : campaign.status === "draft"
                                ? "secondary"
                                : "secondary"
                        }
                      >
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{campaign.audience}</TableCell>
                    <TableCell className="text-right">{campaign.sentCount.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{campaign.openCount.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{campaign.clickCount.toLocaleString()}</TableCell>
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
                          {campaign.status === "draft" && <DropdownMenuItem>Send test email</DropdownMenuItem>}
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
