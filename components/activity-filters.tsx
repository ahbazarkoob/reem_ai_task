"use client"

import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, X } from "lucide-react"
import { format } from "date-fns"

export function ActivityFilters() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <div className="relative">
          <Input id="search" placeholder="Search activities..." className="pl-3 pr-10" />
          <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full w-10 px-0" onClick={() => {}}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Date Range */}
      <div className="space-y-2">
        <Label>Date Range</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      {/* Activity Type */}
      <div className="space-y-2">
        <Label>Activity Type</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="type-all" defaultChecked />
            <Label htmlFor="type-all" className="text-sm font-normal">
              All Activities
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="type-call" />
            <Label htmlFor="type-call" className="text-sm font-normal">
              Calls
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="type-email" />
            <Label htmlFor="type-email" className="text-sm font-normal">
              Emails
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="type-sms" />
            <Label htmlFor="type-sms" className="text-sm font-normal">
              SMS
            </Label>
          </div>
        </div>
      </div>

      {/* Campaign */}
      <div className="space-y-2">
        <Label htmlFor="campaign">Campaign</Label>
        <Select>
          <SelectTrigger id="campaign">
            <SelectValue placeholder="All Campaigns" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Campaigns</SelectItem>
            <SelectItem value="product-demo">Product Demo</SelectItem>
            <SelectItem value="newsletter">Monthly Newsletter</SelectItem>
            <SelectItem value="appointment">Appointment Reminders</SelectItem>
            <SelectItem value="support">Support Line</SelectItem>
            <SelectItem value="summer-sale">Summer Sale</SelectItem>
            <SelectItem value="onboarding">New Customer Onboarding</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select>
          <SelectTrigger id="status">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="opened">Opened</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="not-opened">Not Opened</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <Select>
          <SelectTrigger id="tags">
            <SelectValue placeholder="All Tags" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tags</SelectItem>
            <SelectItem value="follow-up">Follow-up</SelectItem>
            <SelectItem value="interested">Interested</SelectItem>
            <SelectItem value="newsletter">Newsletter</SelectItem>
            <SelectItem value="engaged">Engaged</SelectItem>
            <SelectItem value="appointment">Appointment</SelectItem>
            <SelectItem value="reminder">Reminder</SelectItem>
            <SelectItem value="support">Support</SelectItem>
            <SelectItem value="billing">Billing</SelectItem>
            <SelectItem value="resources">Resources</SelectItem>
            <SelectItem value="promotion">Promotion</SelectItem>
            <SelectItem value="sale">Sale</SelectItem>
            <SelectItem value="demo">Demo</SelectItem>
            <SelectItem value="pricing">Pricing</SelectItem>
            <SelectItem value="onboarding">Onboarding</SelectItem>
            <SelectItem value="welcome">Welcome</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <Button className="w-full">Apply Filters</Button>
        <Button variant="outline" className="w-full">
          Reset
        </Button>
      </div>
    </div>
  )
}
