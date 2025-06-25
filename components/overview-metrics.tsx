import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarClock,
  Mail,
  MessageSquare,
  Phone,
  TrendingUp,
  Users,
} from "lucide-react";

export function OverviewMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="hover:shadow-lg hover:shadow-accent/50 transition-all duration-200 hover:border-primary group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium group-hover:text-primary/90 text-muted-foreground">
            Total Contacts
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground group-hover:text-primary/90" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,853</div>
          <p className="text-xs text-green-500">
            <TrendingUp className="mr-1 h-3 w-3 inline " />
            +12% from last month
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg hover:shadow-accent/50 transition-all duration-200 hover:border-primary group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium group-hover:text-primary/90">
            Active Campaigns
          </CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground group-hover:text-primary/90" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">6</div>
          <div className="flex gap-2 text-xs text-muted-foreground">
            <span className="flex items-center text-[#3972be]">
              <Mail className="mr-1 h-3 w-3 " /> 3
            </span>
            <span className="flex items-center text-primary/70">
              <Phone className="mr-1 h-3 w-3" /> 2
            </span>
            <span className="flex items-center text-[#5cbd7e]">
              <MessageSquare className="mr-1 h-3 w-3" /> 1
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg hover:shadow-accent/50 transition-all duration-200 hover:border-primary group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
          <CardTitle className="text-sm font-medium group-hover:text-primary/90">
            Scheduled Appointments
          </CardTitle>
          <CalendarClock className="h-4 w-4 text-muted-foreground group-hover:text-primary/90" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">42</div>
          <p className="text-xs text-muted-foreground text-[#4DB8FF]">12 today, 30 upcoming</p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg hover:shadow-accent/50 transition-all duration-200 hover:border-primary group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium group-hover:text-primary/90">
            Response Rate
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground group-hover:text-primary/90" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24.3%</div>
          <p className="text-xs text-green-500">
            <TrendingUp className="mr-1 h-3 w-3 inline " />
            +2.1% from last week
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
