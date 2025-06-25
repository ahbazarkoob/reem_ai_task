"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  MessageSquare,
  MoreHorizontal,
  MoreVertical,
  Phone,
  Search,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface CampaignListProps {
  showFilters?: boolean;
  type?: string;
}

export function CampaignList({ showFilters = false, type }: CampaignListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const allCampaigns = [
    {
      id: "c1",
      name: "Q2 Customer Outreach",
      type: "email",
      status: "active",
      progress: 45,
      contacts: 1250,
      responses: 562,
      branch: "Headquarters",
      createdAt: "May 15, 2025",
      aiAgent: "Sales Assistant",
    },
    {
      id: "c2",
      name: "Appointment Reminders",
      type: "sms",
      status: "active",
      progress: 78,
      contacts: 320,
      responses: 298,
      branch: "All Branches",
      createdAt: "May 10, 2025",
      aiAgent: "Appointment Assistant",
    },
    {
      id: "c3",
      name: "Customer Feedback Survey",
      type: "call",
      status: "active",
      progress: 32,
      contacts: 500,
      responses: 160,
      branch: "West Region",
      createdAt: "May 12, 2025",
      aiAgent: "Feedback Assistant",
    },
    {
      id: "c4",
      name: "Product Launch Announcement",
      type: "email",
      status: "scheduled",
      progress: 0,
      contacts: 2500,
      responses: 0,
      branch: "All Branches",
      createdAt: "May 18, 2025",
      aiAgent: "Marketing Assistant",
    },
    {
      id: "c5",
      name: "Service Follow-up",
      type: "call",
      status: "paused",
      progress: 65,
      contacts: 180,
      responses: 117,
      branch: "East Region",
      createdAt: "May 5, 2025",
      aiAgent: "Support Assistant",
    },
    {
      id: "c6",
      name: "Renewal Reminders",
      type: "email",
      status: "completed",
      progress: 100,
      contacts: 450,
      responses: 320,
      branch: "Headquarters",
      createdAt: "April 20, 2025",
      aiAgent: "Sales Assistant",
    },
    {
      id: "c7",
      name: "Promotional Offer",
      type: "sms",
      status: "active",
      progress: 52,
      contacts: 1000,
      responses: 520,
      branch: "All Branches",
      createdAt: "May 8, 2025",
      aiAgent: "Marketing Assistant",
    },
    {
      id: "c8",
      name: "Technical Support Survey",
      type: "call",
      status: "completed",
      progress: 100,
      contacts: 300,
      responses: 245,
      branch: "Headquarters",
      createdAt: "April 25, 2025",
      aiAgent: "Support Assistant",
    },
  ];

  // Filter campaigns based on type, search query, and status
  const filteredCampaigns = allCampaigns.filter((campaign) => {
    const matchesType = type ? campaign.type === type : true;
    const matchesSearch = campaign.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || campaign.status === statusFilter;
    return matchesType && matchesSearch && matchesStatus;
  });

  // Sort campaigns
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortOrder === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortOrder === "name-asc") {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === "name-desc") {
      return b.name.localeCompare(a.name);
    } else if (sortOrder === "progress-high") {
      return b.progress - a.progress;
    } else if (sortOrder === "progress-low") {
      return a.progress - b.progress;
    }
    return 0;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "sms":
        return <MessageSquare className="h-4 w-4" />;
      case "call":
        return <Phone className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "scheduled":
        return "bg-blue-500";
      case "paused":
        return "bg-yellow-500";
      case "completed":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-4">
      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search campaigns..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {!type && (
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Campaign Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="call">Call</SelectItem>
              </SelectContent>
            </Select>
          )}
          <Select defaultValue={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
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
      )}

      <div className="space-y-2">
        {sortedCampaigns.map((campaign) => (
          <Card key={campaign.id} className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div
                    className={`rounded-full p-1.5 ${
                      campaign.type === "email"
                        ? "bg-blue-100"
                        : campaign.type === "sms"
                        ? "bg-green-100"
                        : "bg-purple-100"
                    }`}
                  >
                    {getTypeIcon(campaign.type)}
                  </div>
                  <h3 className="font-medium truncate">{campaign.name}</h3>
                  <Badge
                    variant={
                      campaign.status === "active"
                        ? "default"
                        : campaign.status === "paused"
                        ? "outline"
                        : "secondary"
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
                      <MoreVertical className="h-4 w-4" />
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
                    <DropdownMenuItem className="text-destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </Card>
        ))}

        {sortedCampaigns.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No campaigns found</p>
            <p className="text-sm mt-2">
              Try adjusting your filters or create a new campaign
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
