"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Badge } from "@/components/ui/badge"
import {
  Download,
  FileText,
  MoreHorizontal,
  Search,
  Filter,
  Eye,
  Copy,
  Trash,
  Calendar,
  BarChart,
  Mail,
  MessageSquare,
  Phone,
  Users,
  Bot,
  Plus,
} from "lucide-react"

interface Report {
  id: string
  name: string
  type: string
  category: string
  created: string
  status: "ready" | "scheduled" | "processing" | "error"
  format: "pdf" | "csv" | "excel"
}

// Sample reports data
const campaignReports: Report[] = [
  {
    id: "rep-1",
    name: "Email Campaign Performance Q2",
    type: "campaign",
    category: "email",
    created: "2023-06-30",
    status: "ready",
    format: "pdf",
  },
  {
    id: "rep-2",
    name: "SMS Campaign Engagement",
    type: "campaign",
    category: "sms",
    created: "2023-07-15",
    status: "ready",
    format: "excel",
  },
  {
    id: "rep-3",
    name: "Call Campaign Conversion Rates",
    type: "campaign",
    category: "call",
    created: "2023-08-01",
    status: "scheduled",
    format: "pdf",
  },
  {
    id: "rep-4",
    name: "Multi-channel Campaign Analysis",
    type: "campaign",
    category: "multi",
    created: "2023-08-10",
    status: "processing",
    format: "excel",
  },
]

const agentReports: Report[] = [
  {
    id: "rep-5",
    name: "Sales Agent Performance",
    type: "agent",
    category: "sales",
    created: "2023-07-20",
    status: "ready",
    format: "pdf",
  },
  {
    id: "rep-6",
    name: "Support Agent Response Times",
    type: "agent",
    category: "support",
    created: "2023-07-25",
    status: "ready",
    format: "csv",
  },
  {
    id: "rep-7",
    name: "Agent Transfer Rate Analysis",
    type: "agent",
    category: "all",
    created: "2023-08-05",
    status: "error",
    format: "excel",
  },
]

const contactReports: Report[] = [
  {
    id: "rep-8",
    name: "Contact Engagement Metrics",
    type: "contact",
    category: "engagement",
    created: "2023-07-10",
    status: "ready",
    format: "pdf",
  },
  {
    id: "rep-9",
    name: "Contact Growth Analysis",
    type: "contact",
    category: "growth",
    created: "2023-07-30",
    status: "ready",
    format: "excel",
  },
  {
    id: "rep-10",
    name: "Contact Segmentation Report",
    type: "contact",
    category: "segmentation",
    created: "2023-08-08",
    status: "scheduled",
    format: "csv",
  },
]

const customReports: Report[] = [
  {
    id: "rep-11",
    name: "Q2 Business Performance",
    type: "custom",
    category: "business",
    created: "2023-07-01",
    status: "ready",
    format: "pdf",
  },
  {
    id: "rep-12",
    name: "ROI Analysis by Channel",
    type: "custom",
    category: "roi",
    created: "2023-07-15",
    status: "ready",
    format: "excel",
  },
]

interface ReportsListProps {
  reportType: "campaigns" | "agents" | "contacts" | "custom"
}

export function ReportsList({ reportType }: ReportsListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Select the appropriate reports based on the type
  const getReports = () => {
    switch (reportType) {
      case "campaigns":
        return campaignReports
      case "agents":
        return agentReports
      case "contacts":
        return contactReports
      case "custom":
        return customReports
      default:
        return []
    }
  }

  const reports = getReports()

  // Filter reports based on search query
  const filteredReports = reports.filter(
    (report) =>
      report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status: Report["status"]) => {
    switch (status) {
      case "ready":
        return <Badge className="bg-green-500">Ready</Badge>
      case "scheduled":
        return <Badge variant="outline">Scheduled</Badge>
      case "processing":
        return <Badge variant="secondary">Processing</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
    }
  }

  const getReportIcon = (category: string) => {
    switch (category) {
      case "email":
        return <Mail className="h-4 w-4 text-blue-500" />
      case "sms":
        return <MessageSquare className="h-4 w-4 text-green-500" />
      case "call":
        return <Phone className="h-4 w-4 text-yellow-500" />
      case "sales":
      case "support":
        return <Bot className="h-4 w-4 text-purple-500" />
      case "engagement":
      case "growth":
      case "segmentation":
        return <Users className="h-4 w-4 text-indigo-500" />
      default:
        return <BarChart className="h-4 w-4 text-gray-500" />
    }
  }

  const getFormatIcon = (format: Report["format"]) => {
    switch (format) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />
      case "csv":
        return <FileText className="h-4 w-4 text-green-500" />
      case "excel":
        return <FileText className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Report
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {reportType === "campaigns" && "Campaign Reports"}
            {reportType === "agents" && "Agent Reports"}
            {reportType === "contacts" && "Contact Reports"}
            {reportType === "custom" && "Custom Reports"}
          </CardTitle>
          <CardDescription>
            {reportType === "campaigns" && "View and manage your campaign performance reports"}
            {reportType === "agents" && "View and manage your AI agent performance reports"}
            {reportType === "contacts" && "View and manage your contact analytics reports"}
            {reportType === "custom" && "View and manage your custom reports"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Report Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {getReportIcon(report.category)}
                        <span className="ml-2">{report.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">{report.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getFormatIcon(report.format)}
                        <span className="ml-2 uppercase">{report.format}</span>
                      </div>
                    </TableCell>
                    <TableCell>{report.created}</TableCell>
                    <TableCell>{getStatusBadge(report.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" /> View Report
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" /> Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" /> Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Trash className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No reports found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredReports.length} of {reports.length} reports
          </p>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export All
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
