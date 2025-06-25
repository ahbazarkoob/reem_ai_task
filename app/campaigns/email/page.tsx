import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarClock, Plus } from "lucide-react";
import { EmailCampaignList } from "@/components/email-campaign-list";
import { EmailCampaignPerformance } from "@/components/email-campaign-performance";
import Link from "next/link";

export default function EmailCampaignsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Email Campaigns</h2>
          <p className="text-muted-foreground">
            Manage your email marketing campaigns
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <CalendarClock className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button size="sm" asChild>
            <Link href="/campaigns/create?type=email">
              <Plus className="mr-2 h-4 w-4" />
              New Email Campaign
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger
            value="active"
            className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
          >
            Active Campaigns
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
          >
            Completed Campaigns
          </TabsTrigger>
          <TabsTrigger
            value="scheduled"
            className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
          >
            Scheduled Campaigns
          </TabsTrigger>
          <TabsTrigger
            value="drafts"
            className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
          >
            Drafts
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
          >
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Email Campaigns</CardTitle>
              <CardDescription>
                Currently running email marketing campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EmailCampaignList status="active" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Email Campaigns</CardTitle>
              <CardDescription>Historical email campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <EmailCampaignList status="completed" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Email Campaigns</CardTitle>
              <CardDescription>Upcoming email campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <EmailCampaignList status="scheduled" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Draft Email Campaigns</CardTitle>
              <CardDescription>Email campaigns in preparation</CardDescription>
            </CardHeader>
            <CardContent>
              <EmailCampaignList status="draft" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Campaign Analytics</CardTitle>
              <CardDescription>
                Performance metrics across all email campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EmailCampaignPerformance />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
