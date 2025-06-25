import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarClock,
  Mail,
  MessageSquare,
  Phone,
  type TrendingUp,
} from "lucide-react";
import { CampaignList } from "@/components/campaign-list";
import { OverviewMetrics } from "@/components/overview-metrics";
import { RecentActivity } from "@/components/recent-activity";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <CalendarClock className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger
            value="overview"
            className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="campaigns"
            className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
          >
            Campaigns
          </TabsTrigger>
          <TabsTrigger
            value="appointments"
            className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
          >
            Appointments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <OverviewMetrics />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Active Campaigns</CardTitle>
                <CardDescription>
                  Your currently running communication campaigns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CampaignList />
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  View All Campaigns
                </Button>
              </CardFooter>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest interactions across all channels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity />
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-lg hover:shadow-accent/50 transition-all duration-200 hover:border-primary group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium group-hover:text-primary/90 text-muted-foreground">
                  Email Campaigns
                </CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground group-hover:text-primary/90" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  3 active, 9 completed
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg hover:shadow-accent/50 transition-all duration-200 hover:border-primary group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium group-hover:text-primary/90 text-muted-foreground">
                  Call Campaigns
                </CardTitle>
                <Phone className="h-4 w-4 text-muted-foreground group-hover:text-primary/90" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">
                  2 active, 6 completed
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg hover:shadow-accent/50 transition-all duration-200 hover:border-primary group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium group-hover:text-primary/90 text-muted-foreground">
                  SMS Campaigns
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground group-hover:text-primary/90" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">
                  1 active, 4 completed
                </p>
              </CardContent>
            </Card>
          </div>

          <CampaignList showFilters={true} />
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>
                Scheduled appointments across all branches
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Appointment calendar view will be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Plus({
  className,
  ...props
}: React.ComponentProps<typeof TrendingUp>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
