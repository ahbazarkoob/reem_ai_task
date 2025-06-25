"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Chart, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts"

interface CampaignPerformanceProps {
  campaignType: string
}

export function CampaignPerformance({ campaignType }: CampaignPerformanceProps) {
  // Sample data for charts
  const dailyData = [
    { date: "May 15", contacts: 120, responses: 45, conversions: 12 },
    { date: "May 16", contacts: 150, responses: 60, conversions: 18 },
    { date: "May 17", contacts: 180, responses: 75, conversions: 22 },
    { date: "May 18", contacts: 210, responses: 90, conversions: 28 },
    { date: "May 19", contacts: 240, responses: 105, conversions: 32 },
    { date: "May 20", contacts: 270, responses: 120, conversions: 38 },
    { date: "May 21", contacts: 300, responses: 135, conversions: 42 },
  ]

  const responseData = [
    { name: "Positive", value: 65, color: "#10b981" },
    { name: "Neutral", value: 25, color: "#6b7280" },
    { name: "Negative", value: 10, color: "#ef4444" },
  ]

  const timeData = [
    { hour: "9 AM", contacts: 45, responses: 18 },
    { hour: "10 AM", contacts: 60, responses: 25 },
    { hour: "11 AM", contacts: 75, responses: 32 },
    { hour: "12 PM", contacts: 50, responses: 20 },
    { hour: "1 PM", contacts: 40, responses: 15 },
    { hour: "2 PM", contacts: 65, responses: 28 },
    { hour: "3 PM", contacts: 80, responses: 35 },
    { hour: "4 PM", contacts: 70, responses: 30 },
  ]

  // Metrics specific to campaign type
  const getTypeSpecificMetrics = () => {
    switch (campaignType) {
      case "call":
        return [
          { name: "Answer Rate", value: "68%", change: "+5.2%" },
          { name: "Avg. Call Duration", value: "3:45", change: "+0:22" },
          { name: "Transfer Rate", value: "12%", change: "-2.1%" },
          { name: "Conversion Rate", value: "18%", change: "+3.5%" },
        ]
      case "sms":
        return [
          { name: "Delivery Rate", value: "98%", change: "+0.5%" },
          { name: "Open Rate", value: "92%", change: "+2.3%" },
          { name: "Response Rate", value: "24%", change: "+4.1%" },
          { name: "Conversion Rate", value: "15%", change: "+2.8%" },
        ]
      case "email":
        return [
          { name: "Delivery Rate", value: "99%", change: "+0.2%" },
          { name: "Open Rate", value: "42%", change: "+3.7%" },
          { name: "Click Rate", value: "18%", change: "+2.5%" },
          { name: "Conversion Rate", value: "8%", change: "+1.2%" },
        ]
      default:
        return [
          { name: "Response Rate", value: "45%", change: "+3.2%" },
          { name: "Engagement", value: "38%", change: "+2.7%" },
          { name: "Conversion Rate", value: "12%", change: "+1.5%" },
          { name: "ROI", value: "320%", change: "+15%" },
        ]
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Campaign Performance</h3>
        <Select defaultValue="7d">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="14d">Last 14 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {getTypeSpecificMetrics().map((metric) => (
          <Card key={metric.name}>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs ${metric.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                {metric.change} from previous period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100">Overview</TabsTrigger>
          <TabsTrigger value="responses" className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100">Responses</TabsTrigger>
          <TabsTrigger value="timing" className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100">Timing</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Daily Performance</CardTitle>
              <CardDescription>Contacts, responses, and conversions over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <Chart>
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={dailyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorContacts" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorResponses" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="contacts"
                          stroke="#6366f1"
                          fillOpacity={1}
                          fill="url(#colorContacts)"
                        />
                        <Area
                          type="monotone"
                          dataKey="responses"
                          stroke="#10b981"
                          fillOpacity={1}
                          fill="url(#colorResponses)"
                        />
                        <Area
                          type="monotone"
                          dataKey="conversions"
                          stroke="#f59e0b"
                          fillOpacity={1}
                          fill="url(#colorConversions)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </Chart>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="responses">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Response Sentiment</CardTitle>
                <CardDescription>Distribution of response sentiment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Chart>
                    <ChartContainer>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={responseData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {responseData.map((entry, index) => (
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
                <CardTitle>Response Metrics</CardTitle>
                <CardDescription>Key response metrics by segment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Chart>
                    <ChartContainer>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { segment: "New Customers", positive: 58, neutral: 32, negative: 10 },
                            { segment: "Existing", positive: 72, neutral: 20, negative: 8 },
                            { segment: "Premium", positive: 85, neutral: 12, negative: 3 },
                            { segment: "Inactive", positive: 45, neutral: 35, negative: 20 },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="segment" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="positive" stackId="a" fill="#10b981" />
                          <Bar dataKey="neutral" stackId="a" fill="#6b7280" />
                          <Bar dataKey="negative" stackId="a" fill="#ef4444" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </Chart>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timing">
          <Card>
            <CardHeader>
              <CardTitle>Performance by Time of Day</CardTitle>
              <CardDescription>Contact and response rates by hour</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <Chart>
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={timeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="contacts" stroke="#6366f1" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="responses" stroke="#10b981" />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </Chart>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
