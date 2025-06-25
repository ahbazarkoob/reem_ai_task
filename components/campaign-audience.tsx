"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Filter, Plus } from "lucide-react";
import { Chart, ChartContainer } from "@/components/ui/chart";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function CampaignAudience() {
  // Sample data for charts
  const demographicData = [
    { name: "18-24", value: 15, color: "#6366f1" },
    { name: "25-34", value: 30, color: "#8b5cf6" },
    { name: "35-44", value: 25, color: "#ec4899" },
    { name: "45-54", value: 20, color: "#f43f5e" },
    { name: "55+", value: 10, color: "#f59e0b" },
  ];

  const locationData = [
    { name: "West", value: 35, color: "#10b981" },
    { name: "East", value: 30, color: "#6366f1" },
    { name: "North", value: 20, color: "#f59e0b" },
    { name: "South", value: 15, color: "#ef4444" },
  ];

  const engagementData = [
    { segment: "High", value: 25 },
    { segment: "Medium", value: 45 },
    { segment: "Low", value: 30 },
  ];

  // Sample contacts data
  const contacts = [
    {
      id: "c1",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      segment: "Premium",
      lastContact: "2 days ago",
      status: "Contacted",
      avatar: "/placeholder-user.png?height=40&width=40",
    },
    {
      id: "c2",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1 (555) 234-5678",
      segment: "Standard",
      lastContact: "1 week ago",
      status: "Pending",
      avatar: "/placeholder-user.png?height=40&width=40",
    },
    {
      id: "c3",
      name: "Michael Brown",
      email: "m.brown@example.com",
      phone: "+1 (555) 345-6789",
      segment: "Premium",
      lastContact: "3 days ago",
      status: "Responded",
      avatar: "/placeholder-user.png?height=40&width=40",
    },
    {
      id: "c4",
      name: "Emily Davis",
      email: "emily.d@example.com",
      phone: "+1 (555) 456-7890",
      segment: "Standard",
      lastContact: "Just now",
      status: "Converted",
      avatar: "/placeholder-user.png?height=40&width=40",
    },
    {
      id: "c5",
      name: "Robert Wilson",
      email: "r.wilson@example.com",
      phone: "+1 (555) 567-8901",
      segment: "Premium",
      lastContact: "1 hour ago",
      status: "Contacted",
      avatar: "/placeholder-user.png?height=40&width=40",
    },
  ];

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Contacted":
        return "bg-blue-100 text-blue-800";
      case "Responded":
        return "bg-green-100 text-green-800";
      case "Converted":
        return "bg-purple-100 text-purple-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Campaign Audience</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Age Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <Chart>
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={demographicData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {demographicData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </Chart>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <Chart>
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={locationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {locationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </Chart>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <Chart>
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="segment" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#6366f1" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </Chart>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger
            value="all"
            className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
          >
            All Contacts
          </TabsTrigger>
          <TabsTrigger
            value="contacted"
            className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
          >
            Contacted
          </TabsTrigger>
          <TabsTrigger
            value="responded"
            className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
          >
            Responded
          </TabsTrigger>
          <TabsTrigger
            value="converted"
            className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
          >
            Converted
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Contact List</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search contacts..."
                      className="pl-8 w-[250px]"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Contacts
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center justify-between p-3 rounded-md hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={contact.avatar || "/placeholder-user.png"}
                          />
                          <AvatarFallback>
                            {contact.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{contact.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{contact.email}</span>
                            <span>•</span>
                            <span>{contact.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{contact.segment}</Badge>
                            <Badge
                              variant="outline"
                              className={getStatusColor(contact.status)}
                            >
                              {contact.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Last contacted: {contact.lastContact}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacted">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8 text-muted-foreground">
                <p>Showing contacts with "Contacted" status</p>
                <p className="text-sm mt-2">
                  Filter applied: Status = Contacted
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="responded">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8 text-muted-foreground">
                <p>Showing contacts with "Responded" status</p>
                <p className="text-sm mt-2">
                  Filter applied: Status = Responded
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="converted">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8 text-muted-foreground">
                <p>Showing contacts with "Converted" status</p>
                <p className="text-sm mt-2">
                  Filter applied: Status = Converted
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
