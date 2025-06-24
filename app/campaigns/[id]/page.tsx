import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  BarChart,
  Calendar,
  Edit,
  Mail,
  MessageSquare,
  Pause,
  Phone,
  Play,
  Settings,
  Users,
} from "lucide-react"
import { CampaignPerformance } from "@/components/campaign-performance"
import { CampaignAudience } from "@/components/campaign-audience"
import { CampaignSettings } from "@/components/campaign-settings"
import { CampaignSchedule } from "@/components/campaign-schedule"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  // This would normally fetch campaign data based on the ID
  const campaignId = params.id

  // Mock campaign data
  const campaign = {
    id: campaignId,
    name: "Q2 Customer Outreach",
    type: "email",
    status: "active",
    progress: 45,
    contacts: 1250,
    responses: 562,
    branch: "Headquarters",
    startDate: "May 15, 2025",
    endDate: "June 15, 2025",
    description: "Quarterly outreach to existing customers to introduce new premium features and gather feedback.",
    aiAgent: "Sales Assistant",
    script: "Product Upsell",
  }

  // Get icon based on campaign type
  const getCampaignIcon = () => {
    switch (campaign.type) {
      case "email":
        return <Mail className="h-5 w-5" />
      case "sms":
        return <MessageSquare className="h-5 w-5" />
      case "call":
        return <Phone className="h-5 w-5" />
      default:
        return <Mail className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/campaigns">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">{campaign.name}</h2>
        <Badge variant={campaign.status === "active" ? "default" : "outline"} className="ml-2">
          {campaign.status}
        </Badge>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Campaign Overview</CardTitle>
                  <CardDescription>Key metrics and performance indicators</CardDescription>
                </div>
                <div className="flex gap-2">
                  {campaign.status === "active" ? (
                    <Button variant="outline" size="sm">
                      <Pause className="mr-2 h-4 w-4" />
                      Pause
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      <Play className="mr-2 h-4 w-4" />
                      Resume
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Type</p>
                  <div className="flex items-center gap-1 font-medium">
                    {getCampaignIcon()}
                    <span className="capitalize">{campaign.type}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">AI Agent</p>
                  <p className="font-medium">{campaign.aiAgent}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Script</p>
                  <p className="font-medium">{campaign.script}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Branch</p>
                  <p className="font-medium">{campaign.branch}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-medium">{campaign.startDate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">End Date</p>
                  <p className="font-medium">{campaign.endDate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Contacts</p>
                  <p className="font-medium">{campaign.contacts.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Responses</p>
                  <p className="font-medium">{campaign.responses.toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="mt-1">{campaign.description}</p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="performance" className="space-y-4">
            <TabsList>
              <TabsTrigger value="performance" className="flex items-center gap-1">
                <BarChart className="h-4 w-4" /> Performance
              </TabsTrigger>
              <TabsTrigger value="audience" className="flex items-center gap-1">
                <Users className="h-4 w-4" /> Audience
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> Schedule
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-1">
                <Settings className="h-4 w-4" /> Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="performance">
              <CampaignPerformance campaignType={campaign.type} />
            </TabsContent>

            <TabsContent value="audience">
              <CampaignAudience />
            </TabsContent>

            <TabsContent value="schedule">
              <CampaignSchedule />
            </TabsContent>

            <TabsContent value="settings">
              <CampaignSettings campaignType={campaign.type} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:w-1/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest campaign events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border-l-2 border-green-500 pl-4 py-1">
                  <p className="text-sm font-medium">Campaign milestone reached</p>
                  <p className="text-xs text-muted-foreground">500 contacts reached</p>
                  <p className="text-xs text-muted-foreground">10 minutes ago</p>
                </div>
                <div className="border-l-2 border-blue-500 pl-4 py-1">
                  <p className="text-sm font-medium">AI agent updated</p>
                  <p className="text-xs text-muted-foreground">Script optimization applied</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <div className="border-l-2 border-purple-500 pl-4 py-1">
                  <p className="text-sm font-medium">Response rate increased</p>
                  <p className="text-xs text-muted-foreground">+5.2% from yesterday</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
                <div className="border-l-2 border-gray-500 pl-4 py-1">
                  <p className="text-sm font-medium">Campaign started</p>
                  <p className="text-xs text-muted-foreground">Initial contacts processed</p>
                  <p className="text-xs text-muted-foreground">May 15, 2025</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <BarChart className="mr-2 h-4 w-4" />
                View Detailed Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Modify Target Audience
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Edit className="mr-2 h-4 w-4" />
                Edit AI Script
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Adjust Schedule
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
