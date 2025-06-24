import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActivityList } from "@/components/activity-list"
import { ActivityFilters } from "@/components/activity-filters"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw } from "lucide-react"

export const metadata: Metadata = {
  title: "Activity | Reem AI",
  description: "View all system activity",
}

export default function ActivityPage() {
  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activity</h1>
          <p className="text-muted-foreground">View and manage all system activity</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Narrow down activities</CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityFilters />
          </CardContent>
        </Card>

        <div className="space-y-6 md:col-span-3">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Activity</TabsTrigger>
              <TabsTrigger value="calls">Calls</TabsTrigger>
              <TabsTrigger value="emails">Emails</TabsTrigger>
              <TabsTrigger value="sms">SMS</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <ActivityList type="all" />
            </TabsContent>
            <TabsContent value="calls" className="mt-6">
              <ActivityList type="call" />
            </TabsContent>
            <TabsContent value="emails" className="mt-6">
              <ActivityList type="email" />
            </TabsContent>
            <TabsContent value="sms" className="mt-6">
              <ActivityList type="sms" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
