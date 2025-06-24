"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
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
  AreaChart,
  Area,
} from "recharts"
import { Download, RefreshCw, Calendar } from "lucide-react"

// Sample data for charts
const campaignPerformanceData = [
  { name: "Week 1", email: 65, sms: 45, call: 35 },
  { name: "Week 2", email: 75, sms: 55, call: 40 },
  { name: "Week 3", email: 85, sms: 60, call: 45 },
  { name: "Week 4", email: 90, sms: 65, call: 50 },
]

const conversionRateData = [
  { name: "Jan", rate: 2.5 },
  { name: "Feb", rate: 3.1 },
  { name: "Mar", rate: 3.8 },
  { name: "Apr", rate: 3.3 },
  { name: "May", rate: 4.2 },
  { name: "Jun", rate: 4.5 },
  { name: "Jul", rate: 4.1 },
  { name: "Aug", rate: 4.8 },
]

const channelDistributionData = [
  { name: "Email", value: 45 },
  { name: "SMS", value: 30 },
  { name: "Call", value: 25 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

const contactGrowthData = [
  { name: "Jan", contacts: 1200 },
  { name: "Feb", contacts: 1350 },
  { name: "Mar", contacts: 1500 },
  { name: "Apr", contacts: 1640 },
  { name: "May", contacts: 1800 },
  { name: "Jun", contacts: 2000 },
  { name: "Jul", contacts: 2200 },
  { name: "Aug", contacts: 2450 },
]

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("90d")

  const chartConfig = {
    email: { label: "Email", color: "#0088FE" },
    sms: { label: "SMS", color: "#00C49F" },
    call: { label: "Call", color: "#FFBB28" },
    rate: { label: "Conversion Rate", color: "#0088FE" },
    contacts: { label: "Contacts", color: "#0088FE" },
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Select defaultValue={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
            <SelectItem value="custom">Custom range</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>Response rates by campaign type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer config={chartConfig}>
                <BarChart data={campaignPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="email" fill="#0088FE" name="Email" />
                  <Bar dataKey="sms" fill="#00C49F" name="SMS" />
                  <Bar dataKey="call" fill="#FFBB28" name="Call" />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate</CardTitle>
            <CardDescription>Percentage of contacts that converted</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer config={chartConfig}>
                <LineChart data={conversionRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="rate" stroke="#0088FE" name="Conversion Rate" strokeWidth={2} />
                </LineChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Channel Distribution</CardTitle>
            <CardDescription>Distribution of campaigns by channel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer config={chartConfig}>
                <PieChart>
                  <Pie
                    data={channelDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {channelDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                </PieChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Growth</CardTitle>
            <CardDescription>Growth in contact database over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer config={chartConfig}>
                <AreaChart data={contactGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="contacts"
                    stroke="#0088FE"
                    fill="#0088FE"
                    fillOpacity={0.3}
                    name="Contacts"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
