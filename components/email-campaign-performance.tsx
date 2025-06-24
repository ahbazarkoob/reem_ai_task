"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Chart } from "@/components/ui/chart"

export function EmailCampaignPerformance() {
  // Mock data for email campaign performance
  const engagementData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Open Rate",
        data: [35, 38, 42, 40, 43, 45],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.3,
      },
      {
        label: "Click Rate",
        data: [18, 20, 22, 25, 24, 28],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.3,
      },
    ],
  }

  const deliveryData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sent",
        data: [12500, 15000, 18000, 20000, 22500, 25000],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.3,
      },
      {
        label: "Delivered",
        data: [12000, 14500, 17500, 19500, 22000, 24500],
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.3,
      },
      {
        label: "Bounced",
        data: [500, 500, 500, 500, 500, 500],
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
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
        data: [250, 320, 380, 420, 480, 550],
        backgroundColor: "rgba(99, 102, 241, 0.7)",
      },
      {
        type: "line",
        label: "Conversion Rate (%)",
        data: [2.0, 2.1, 2.1, 2.1, 2.2, 2.2],
        borderColor: "rgb(249, 115, 22)",
        backgroundColor: "rgba(249, 115, 22, 0.1)",
        tension: 0.3,
        yAxisID: "y1",
      },
    ],
  }

  const deviceData = {
    labels: ["Desktop", "Mobile", "Tablet"],
    datasets: [
      {
        label: "Opens by Device",
        data: [45, 48, 7],
        backgroundColor: ["rgba(99, 102, 241, 0.7)", "rgba(34, 197, 94, 0.7)", "rgba(249, 115, 22, 0.7)"],
        borderColor: ["rgb(99, 102, 241)", "rgb(34, 197, 94)", "rgb(249, 115, 22)"],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Email Campaign Performance</h2>
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
            <CardTitle>Engagement Metrics</CardTitle>
            <CardDescription>Open and click rates over time</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart
              type="line"
              data={engagementData}
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
            <CardTitle>Delivery Metrics</CardTitle>
            <CardDescription>Sent, delivered, and bounced emails</CardDescription>
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
            <CardTitle>Device Breakdown</CardTitle>
            <CardDescription>Email opens by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <Chart
              type="pie"
              data={deviceData}
              options={{
                plugins: {
                  legend: {
                    position: "top",
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => context.label + ": " + context.parsed + "%",
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
