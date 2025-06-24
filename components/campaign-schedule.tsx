"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { CalendarClock, Clock, Edit, Save, Plus } from "lucide-react"

export function CampaignSchedule() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Campaign Schedule</h3>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Timeline</CardTitle>
              <CardDescription>Schedule and manage campaign dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="text-sm font-medium mb-2">Campaign Calendar</div>
                  <Calendar
                    mode="range"
                    defaultMonth={new Date(2025, 4)}
                    selected={{
                      from: new Date(2025, 4, 15),
                      to: new Date(2025, 5, 15),
                    }}
                    className="rounded-md border"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-2">Date Range</div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="start-date">Start Date</Label>
                        <div className="flex items-center">
                          <CalendarClock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Input id="start-date" defaultValue="May 15, 2025" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="end-date">End Date</Label>
                        <div className="flex items-center">
                          <CalendarClock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Input id="end-date" defaultValue="June 15, 2025" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="frequency">Contact Frequency</Label>
                    <Select defaultValue="optimal">
                      <SelectTrigger id="frequency">
                        <SelectValue placeholder="Select contact frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="once">One time only</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="optimal">AI-optimized timing</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      AI-optimized timing uses machine learning to determine the best time to contact each recipient
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Days of Week</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                        <div key={day} className="flex items-center space-x-2">
                          <Switch id={`day-${day.toLowerCase()}`} defaultChecked={index < 5} />
                          <Label htmlFor={`day-${day.toLowerCase()}`}>{day}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Time Settings</CardTitle>
              <CardDescription>Configure time-based settings for your campaign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="call-start-time">Start Time</Label>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Select defaultValue="9">
                      <SelectTrigger id="call-start-time">
                        <SelectValue placeholder="Start time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }).map((_, i) => (
                          <SelectItem key={i} value={`${i + 8}`}>
                            {i + 8}:00 {i + 8 < 12 ? "AM" : "PM"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="call-end-time">End Time</Label>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Select defaultValue="17">
                      <SelectTrigger id="call-end-time">
                        <SelectValue placeholder="End time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }).map((_, i) => (
                          <SelectItem key={i} value={`${i + 8}`}>
                            {i + 8}:00 {i + 8 < 12 ? "AM" : "PM"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="throttling">Throttling (contacts per hour)</Label>
                  <span className="text-sm">100</span>
                </div>
                <Slider id="throttling" defaultValue={[100]} max={500} step={10} />
                <p className="text-xs text-muted-foreground">
                  Limit the number of contacts per hour to avoid overwhelming your team or systems
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="retry-attempts">Retry Attempts</Label>
                  <span className="text-sm">3</span>
                </div>
                <Slider id="retry-attempts" defaultValue={[3]} max={5} step={1} />
                <p className="text-xs text-muted-foreground">
                  Number of times to retry contacting a recipient if initial attempt fails
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="retry-interval">Retry Interval</Label>
                <Select defaultValue="1d">
                  <SelectTrigger id="retry-interval">
                    <SelectValue placeholder="Select retry interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1 hour</SelectItem>
                    <SelectItem value="4h">4 hours</SelectItem>
                    <SelectItem value="1d">1 day</SelectItem>
                    <SelectItem value="2d">2 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Automation Settings</CardTitle>
              <CardDescription>Configure AI-driven automation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-pause">Auto-Pause</Label>
                  <p className="text-xs text-muted-foreground">Automatically pause campaign if performance drops</p>
                </div>
                <Switch id="auto-pause" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-optimize">AI Optimization</Label>
                  <p className="text-xs text-muted-foreground">Continuously optimize messaging based on responses</p>
                </div>
                <Switch id="auto-optimize" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-reschedule">Smart Rescheduling</Label>
                  <p className="text-xs text-muted-foreground">Reschedule contacts based on optimal times</p>
                </div>
                <Switch id="auto-reschedule" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-follow-up">Auto Follow-up</Label>
                  <p className="text-xs text-muted-foreground">Automatically send follow-up messages</p>
                </div>
                <Switch id="auto-follow-up" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Campaign Events</CardTitle>
              <CardDescription>Upcoming scheduled events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border-l-2 border-green-500 pl-4 py-1">
                  <p className="text-sm font-medium">Performance Review</p>
                  <p className="text-xs text-muted-foreground">May 22, 2025 - Automatic</p>
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-3 w-3 mr-1" /> Edit
                    </Button>
                  </div>
                </div>
                <div className="border-l-2 border-blue-500 pl-4 py-1">
                  <p className="text-sm font-medium">Mid-campaign Optimization</p>
                  <p className="text-xs text-muted-foreground">May 30, 2025 - Automatic</p>
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-3 w-3 mr-1" /> Edit
                    </Button>
                  </div>
                </div>
                <div className="border-l-2 border-purple-500 pl-4 py-1">
                  <p className="text-sm font-medium">Final Follow-up Wave</p>
                  <p className="text-xs text-muted-foreground">June 10, 2025 - Scheduled</p>
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-3 w-3 mr-1" /> Edit
                    </Button>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Event
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
