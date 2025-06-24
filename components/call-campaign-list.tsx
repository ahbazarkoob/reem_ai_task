"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreHorizontal, Phone, Search } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface CallCampaignListProps {
  status?: string
}

export function CallCampaignList({ status }: CallCampaignListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("newest")

  // Sample call campaign data
  const allCallCampaigns = [
    {
      id: "c1",
      name: "Customer Feedback Survey",
      status: "active",
      progress: 32,
      contacts: 500,
      responses: 160,
      branch: "West Region",
      createdAt: "May 12, 2025",
      aiAgent: "Feedback Assistant",
      answerRate: "68%",
      avgDuration: "3:45",
    },
    {
      id: "c2",
      name: "Service Follow-up",
      status: "paused",
      progress: 65,
      contacts: 180,
      responses: 117,
      branch: "East Region",
      createdAt: "May 5, 2025",
      aiAgent: "Support Assistant",
      answerRate: "72%",
      avgDuration: "4:12",
    },
    {
      id: "c3",
      name: "Technical Support Survey",
      status: "completed",
      progress: 100,
      contacts: 300,
      responses: 245,
      branch: "Headquarters",
      createdAt: "April 25, 2025",
      aiAgent: "Support Assistant",
      answerRate: "82%",
      avgDuration: "5:30",
    },
    {
      id: "c4",
      name: "Product Demo Scheduling",
      status: "scheduled",
      progress: 0,
      contacts: 150,
      responses: 0,
      branch: "All Branches",
      createdAt: "May 20, 2025",
      aiAgent: "Sales Assistant",
      answerRate: "0%",
      avgDuration: "0:00",
    },
    {
      id: "c5",
      name: "Renewal Outreach",
      status: "active",
      progress: 45,
      contacts: 220,
      responses: 99,
      branch: "Headquarters",
      createdAt: "May 10, 2025",
      aiAgent: "Sales Assistant",
      answerRate: "70%",
      avgDuration: "3:20",
    },
    {
      id: "c6",
      name: "Customer Satisfaction Check",
      status: "completed",
      progress: 100,
      contacts: 400,
      responses: 320,
      branch: "All Branches",
      createdAt: "April 15, 2025",
      aiAgent: "Feedback Assistant",
      answerRate: "80%",
      avgDuration: "4:45",
    },
    {
      id: "c7",
      name: "New Feature Introduction",
      status: "scheduled",
      progress: 0,
      contacts: 350,
      responses: 0,
      branch: "West Region",
      createdAt: "May 25, 2025",
      aiAgent: "Product Assistant",
      answerRate: "0%",
      avgDuration: "0:00",
    },
  ]

  // Filter campaigns based on status and search query
  const filteredCampaigns = allCallCampaigns.filter((campaign) => {
    const matchesStatus = status ? campaign.status === status : true
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  // Sort campaigns
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortOrder === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    } else if (sortOrder === "name-asc") {
      return a.name.localeCompare(b.name)
    } else if (sortOrder === "name-desc") {
      return b.name.localeCompare(a.name)
    } else if (sortOrder === "progress-high") {
      return b.progress - a.progress
    } else if (sortOrder === "progress-low") {
      return a.progress - b.progress
    }
    return 0
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "scheduled":
        return "bg-blue-500"
      case "paused":
        return "bg-yellow-500"
      case "completed":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search call campaigns..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select defaultValue={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="name-asc">Name (A-Z)</SelectItem>
            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            <SelectItem value="progress-high">Progress (High-Low)</SelectItem>
            <SelectItem value="progress-low">Progress (Low-High)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {sortedCampaigns.map((campaign) => (
          <Card key={campaign.id} className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="rounded-full p-1.5 bg-purple-100">
                    <Phone className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium truncate">{campaign.name}</h3>
                  <Badge
                    variant={
                      campaign.status === "active" ? "default" : campaign.status === "paused" ? "outline" : "secondary"
                    }
                  >
                    {campaign.status}
                  </Badge>
                </div>

                <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
                  <span>{campaign.branch}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{campaign.contacts} contacts</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{campaign.responses} responses</span>
                  <span className="hidden sm:inline">•</span>
                  <span>AI: {campaign.aiAgent}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <div className="text-xs text-muted-foreground">Answer Rate</div>
                    <div className="font-medium">{campaign.answerRate}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Avg. Duration</div>
                    <div className="font-medium">{campaign.avgDuration}</div>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{campaign.progress}%</span>
                  </div>
                  <Progress value={campaign.progress} className="h-2" />
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/campaigns/${campaign.id}`}>View</Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem>Analytics</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {campaign.status === "active" ? (
                      <DropdownMenuItem>Pause</DropdownMenuItem>
                    ) : campaign.status === "paused" ? (
                      <DropdownMenuItem>Resume</DropdownMenuItem>
                    ) : null}
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </Card>
        ))}

        {sortedCampaigns.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No call campaigns found</p>
            <p className="text-sm mt-2">Try adjusting your filters or create a new call campaign</p>
          </div>
        )}
      </div>
    </div>
  )
}
