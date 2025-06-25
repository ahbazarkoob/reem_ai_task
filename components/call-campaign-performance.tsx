"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Chart,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
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
} from "recharts";

export function CallCampaignPerformance() {
  // Sample data for charts
  const dailyData = [
    { date: "May 15", calls: 120, answered: 82, conversions: 24 },
    { date: "May 16", calls: 150, answered: 105, conversions: 32 },
    { date: "May 17", calls: 180, answered: 126, conversions: 38 },
    { date: "May 18", calls: 210, answered: 147, conversions: 45 },
    { date: "May 19", calls: 240, answered: 168, conversions: 51 },
    { date: "May 20", calls: 270, answered: 189, conversions: 57 },
    { date: "May 21", calls: 300, answered: 210, conversions: 63 },
  ];

  const responseData = [
    { name: "Positive", value: 65, color: "#10b981" },
    { name: "Neutral", value: 25, color: "#6b7280" },
    { name: "Negative", value: 10, color: "#ef4444" },
  ];

  const timeData = [
    { hour: "9 AM", calls: 45, answered: 31 },
    { hour: "10 AM", calls: 60, answered: 42 },
    { hour: "11 AM", calls: 75, answered: 53 },
    { hour: "12 PM", calls: 50, answered: 35 },
    { hour: "1 PM", calls: 40, answered: 28 },
    { hour: "2 PM", calls: 65, answered: 46 },
    { hour: "3 PM", calls: 80, answered: 56 },
    { hour: "4 PM", calls: 70, answered: 49 },
  ];

  const durationData = [
    { duration: "< 1 min", calls: 50 },
    { duration: "1-2 min", calls: 120 },
    { duration: "2-3 min", calls: 180 },
    { duration: "3-5 min", calls: 150 },
    { duration: "5-10 min", calls: 80 },
    { duration: "> 10 min", calls: 20 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Call Campaign Performance</h3>
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
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">
              Total Calls
            </div>
            <div className="text-2xl font-bold">1,270</div>
            <p className="text-xs text-green-500">+8.2% from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">
              Answer Rate
            </div>
            <div className="text-2xl font-bold">72%</div>
            <p className="text-xs text-green-500">+3.5% from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">
              Avg. Call Duration
            </div>
            <div className="text-2xl font-bold">4:12</div>
            <p className="text-xs text-green-500">+0:22 from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">
              Conversion Rate
            </div>
            <div className="text-2xl font-bold">18%</div>
            <p className="text-xs text-green-500">+2.3% from last period</p>
          </CardContent>
        </Card>
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
            value="responses"
            className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
          >
            Responses
          </TabsTrigger>
          <TabsTrigger
            value="timing"
            className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
          >
            Timing
          </TabsTrigger>
          <TabsTrigger
            value="duration"
            className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
          >
            Duration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardContent className="pt-6">
              <div className="h-[300px]">
                <Chart>
                  <ChartContainer config={{}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={dailyData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="colorCalls"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#6366f1"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#6366f1"
                              stopOpacity={0}
                            />
                          </linearGradient>
                          <linearGradient
                            id="colorAnswered"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#10b981"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#10b981"
                              stopOpacity={0}
                            />
                          </linearGradient>
                          <linearGradient
                            id="colorConversions"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#f59e0b"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#f59e0b"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="calls"
                          stroke="#6366f1"
                          fillOpacity={1}
                          fill="url(#colorCalls)"
                        />
                        <Area
                          type="monotone"
                          dataKey="answered"
                          stroke="#10b981"
                          fillOpacity={1}
                          fill="url(#colorAnswered)"
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
              <CardContent className="pt-6">
                <div className="h-[300px]">
                  <Chart>
                    <ChartContainer config={{}}>
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
                            label={({ name, percent }) =>
                              `${name}: ${(percent * 100).toFixed(0)}%`
                            }
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
              <CardContent className="pt-6">
                <div className="h-[300px]">
                  <Chart>
                    <ChartContainer config={{}}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            {
                              segment: "New Customers",
                              positive: 58,
                              neutral: 32,
                              negative: 10,
                            },
                            {
                              segment: "Existing",
                              positive: 72,
                              neutral: 20,
                              negative: 8,
                            },
                            {
                              segment: "Premium",
                              positive: 85,
                              neutral: 12,
                              negative: 3,
                            },
                            {
                              segment: "Inactive",
                              positive: 45,
                              neutral: 35,
                              negative: 20,
                            },
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
            <CardContent className="pt-6">
              <div className="h-[300px]">
                <Chart>
                  <ChartContainer config={{}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={timeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="calls"
                          stroke="#6366f1"
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="answered"
                          stroke="#10b981"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </Chart>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="duration">
          <Card>
            <CardContent className="pt-6">
              <div className="h-[300px]">
                <Chart>
                  <ChartContainer config={{}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={durationData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="duration" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="calls" fill="#6366f1" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </Chart>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
