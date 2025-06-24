import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MessageSquare, Phone, TrendingUp, Users } from "lucide-react"

export function CampaignOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">25</div>
          <div className="flex gap-2 text-xs text-muted-foreground">
            <span className="flex items-center">
              <Mail className="mr-1 h-3 w-3" /> 12
            </span>
            <span className="flex items-center">
              <Phone className="mr-1 h-3 w-3" /> 8
            </span>
            <span className="flex items-center">
              <MessageSquare className="mr-1 h-3 w-3" /> 5
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">6</div>
          <div className="flex gap-2 text-xs text-muted-foreground">
            <span className="flex items-center">
              <Mail className="mr-1 h-3 w-3" /> 3
            </span>
            <span className="flex items-center">
              <Phone className="mr-1 h-3 w-3" /> 2
            </span>
            <span className="flex items-center">
              <MessageSquare className="mr-1 h-3 w-3" /> 1
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Audience Reach</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12,543</div>
          <p className="text-xs text-muted-foreground">
            <TrendingUp className="mr-1 h-3 w-3 inline" />
            +8.2% from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24.3%</div>
          <p className="text-xs text-muted-foreground">
            <TrendingUp className="mr-1 h-3 w-3 inline" />
            +2.1% from last week
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
