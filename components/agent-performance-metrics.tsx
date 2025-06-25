"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Sample data for charts
const callVolumeData = [
  { name: "Mon", sales: 32, support: 24, scheduling: 18 },
  { name: "Tue", sales: 40, support: 28, scheduling: 22 },
  { name: "Wed", sales: 35, support: 32, scheduling: 20 },
  { name: "Thu", sales: 42, support: 30, scheduling: 25 },
  { name: "Fri", sales: 38, support: 26, scheduling: 23 },
  { name: "Sat", sales: 25, support: 18, scheduling: 15 },
  { name: "Sun", sales: 20, support: 15, scheduling: 12 },
];

const responseTimeData = [
  { name: "Mon", sales: 1.2, support: 1.5, scheduling: 0.9 },
  { name: "Tue", sales: 1.3, support: 1.4, scheduling: 1.0 },
  { name: "Wed", sales: 1.1, support: 1.6, scheduling: 0.8 },
  { name: "Thu", sales: 1.4, support: 1.3, scheduling: 1.1 },
  { name: "Fri", sales: 1.2, support: 1.5, scheduling: 0.9 },
  { name: "Sat", sales: 1.5, support: 1.7, scheduling: 1.2 },
  { name: "Sun", sales: 1.3, support: 1.6, scheduling: 1.0 },
];

const satisfactionData = [
  { name: "Sales", value: 85 },
  { name: "Support", value: 92 },
  { name: "Scheduling", value: 78 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const transferRateData = [
  { name: "Mon", sales: 12, support: 8, scheduling: 5 },
  { name: "Tue", sales: 10, support: 7, scheduling: 6 },
  { name: "Wed", sales: 14, support: 9, scheduling: 4 },
  { name: "Thu", sales: 11, support: 6, scheduling: 7 },
  { name: "Fri", sales: 13, support: 8, scheduling: 5 },
  { name: "Sat", sales: 9, support: 5, scheduling: 3 },
  { name: "Sun", sales: 8, support: 4, scheduling: 2 },
];

export function AgentPerformanceMetrics() {
  const [timeRange, setTimeRange] = useState("7d");

  const chartConfig = {
    sales: { label: "Sales", color: "#0088FE" },
    support: { label: "Support", color: "#00C49F" },
    scheduling: { label: "Scheduling", color: "#FFBB28" },
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Performance Metrics</h3>
        <Select defaultValue={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="call-volume" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger
            value="call-volume"
            className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
          >
            Call Volume
          </TabsTrigger>
          <TabsTrigger
            value="response-time"
            className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
          >
            Response Time
          </TabsTrigger>
          <TabsTrigger
            value="satisfaction"
            className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
          >
            Satisfaction
          </TabsTrigger>
          <TabsTrigger
            value="transfer-rate"
            className="data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
          >
            Transfer Rate
          </TabsTrigger>
        </TabsList>

        <TabsContent value="call-volume">
          <Card>
            <CardHeader>
              <CardTitle>Call Volume by Agent Type</CardTitle>
              <CardDescription>
                Number of calls handled by each agent type over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer config={chartConfig}>
                  <BarChart data={callVolumeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="sales" fill="#0088FE" name="Sales" />
                    <Bar dataKey="support" fill="#00C49F" name="Support" />
                    <Bar
                      dataKey="scheduling"
                      fill="#FFBB28"
                      name="Scheduling"
                    />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="response-time">
          <Card>
            <CardHeader>
              <CardTitle>Average Response Time</CardTitle>
              <CardDescription>
                Average time (in seconds) for agents to respond to queries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer config={chartConfig}>
                  <LineChart data={responseTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#0088FE"
                      name="Sales"
                    />
                    <Line
                      type="monotone"
                      dataKey="support"
                      stroke="#00C49F"
                      name="Support"
                    />
                    <Line
                      type="monotone"
                      dataKey="scheduling"
                      stroke="#FFBB28"
                      name="Scheduling"
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="satisfaction">
          <Card>
            <CardHeader>
              <CardTitle>Customer Satisfaction Score</CardTitle>
              <CardDescription>
                Average satisfaction rating (0-100) by agent type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer config={chartConfig}>
                  <PieChart>
                    <Pie
                      data={satisfactionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {satisfactionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                  </PieChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transfer-rate">
          <Card>
            <CardHeader>
              <CardTitle>Human Transfer Rate</CardTitle>
              <CardDescription>
                Percentage of calls transferred to human agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ChartContainer config={chartConfig}>
                  <LineChart data={transferRateData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#0088FE"
                      name="Sales"
                    />
                    <Line
                      type="monotone"
                      dataKey="support"
                      stroke="#00C49F"
                      name="Support"
                    />
                    <Line
                      type="monotone"
                      dataKey="scheduling"
                      stroke="#FFBB28"
                      name="Scheduling"
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
