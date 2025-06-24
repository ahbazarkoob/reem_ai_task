"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Chart } from "@/components/ui/chart"

export function SmsCampaignPerformance() {
  // Mock data for SMS campaign performance
  const deliveryData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sent",
        data: [5200, 7500, 6800, 8100, 9200, 10500],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.3,
      },
      {
        label: "Delivered",
        data: [4900, 7200, 6500, 7800, 8900, 10200],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.3,
      },
    ],
  }

  const responseData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Response Rate",
        data: [12, 15, 18, 22, 25, 28],
        borderColor: "rgb(249, 115, 22)",
        backgroundColor: "rgba(249, 115, 22, 0.1)",
        tension: 0.3,
      },
      {
        label: "Click Rate",
        data: [8, 10, 12, 15, 18, 20],
        borderColor: "rgb(234, 179, 8)",
        backgroundColor: "rgba(234, 179, 8, 0.1)",
        tension: 0.3,
      },
    ],
  }

  const conversionData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        type: "bar",
        label: "Conversions",
        data: [120, 180, 210, 250, 290, 350],
        backgroundColor: "rgba(99, 102, 241, 0.7)",
      },
      {
        type: "line",
        label: "Conversion Rate (%)",
        data: [2.3, 2.4, 3.1, 3.0, 3.2, 3.3],
        borderColor: "rgb(249, 115, 22)",
        backgroundColor: "rgba(249, 115, 22, 0.1)",
        tension: 0.3,
        yAxisID: "y1",
      },
    ],
  }

  const timeOfDayData = {
    labels: ["6am", "9am", "12pm", "3pm", "6pm", "9pm", "12am", "3am"],
    datasets: [
      {
        label: "Response Rate by Time of Day",
        data: [15, 22, 18, 20, 25, 28, 12, 8],
        backgroundColor: "rgba(99, 102, 241, 0.7)",
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">SMS Campaign Performance</h2>
        <Select defaultValue="30days">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="year">Last year</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Delivery Metrics</CardTitle>
            <CardDescription>SMS sent and delivered over time</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart
              type="line"
              data={deliveryData}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
                maintainAspectRatio: false,
              }}
              className="h-80"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Response Metrics</CardTitle>
            <CardDescription>Response and click rates over time</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart
              type="line"
              data={responseData}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => value + "%",
                    },
                  },
                },
                plugins: {
                  legend: {
                    position: "top",
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => context.dataset.label + ": " + context.parsed.y + "%",
                    },
                  },
                },
                maintainAspectRatio: false,
              }}
              className="h-80"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Performance</CardTitle>
            <CardDescription>Conversions and conversion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart
              type="bar"
              data={conversionData}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Conversions",
                    },
                  },
                  y1: {
                    beginAtZero: true,
                    position: "right",
                    title: {
                      display: true,
                      text: "Conversion Rate (%)",
                    },
                    grid: {
                      drawOnChartArea: false,
                    },
                    ticks: {
                      callback: (value) => value + "%",
                    },
                  },
                },
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
                maintainAspectRatio: false,
              }}
              className="h-80"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time of Day Analysis</CardTitle>
            <CardDescription>Response rates by time of day</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart
              type="bar"
              data={timeOfDayData}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => value + "%",
                    },
                  },
                },
                plugins: {
                  legend: {
                    position: "top",
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => context.dataset.label + ": " + context.parsed.y + "%",
                    },
                  },
                },
                maintainAspectRatio: false,
              }}
              className="h-80"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
