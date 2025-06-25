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
import { SmsCampaignList } from "@/components/sms-campaign-list";
import { SmsCampaignPerformance } from "@/components/sms-campaign-performance";
import Link from "next/link";

export default function SmsCampaignsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">SMS Campaigns</h2>
          <p className="text-muted-foreground">
            Manage your SMS messaging campaigns
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <CalendarClock className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button size="sm" asChild>
            <Link href="/campaigns/create?type=sms">
              <Plus className="mr-2 h-4 w-4" />
              New SMS Campaign
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
            value="analytics"
            className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
          >
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active SMS Campaigns</CardTitle>
              <CardDescription>
                Currently running SMS messaging campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SmsCampaignList status="active" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed SMS Campaigns</CardTitle>
              <CardDescription>Historical SMS campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <SmsCampaignList status="completed" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled SMS Campaigns</CardTitle>
              <CardDescription>Upcoming SMS campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <SmsCampaignList status="scheduled" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SMS Campaign Analytics</CardTitle>
              <CardDescription>
                Performance metrics across all SMS campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SmsCampaignPerformance />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
