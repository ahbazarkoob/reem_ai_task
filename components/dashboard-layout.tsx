"use client"

import type React from "react"

import { useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import {
  Activity,
  Building,
  CalendarClock,
  ChevronDown,
  Home,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  Settings,
  Users,
  Upload,
  CalendarPlus,
  ListTodo,
  PhoneCall,
  BarChart,
  UserCog,
  Bot,
  User,
  LogOut,
  HelpCircle,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [workspace, setWorkspace] = useState("Acme Inc")

  const workspaces = [
    { id: "acme", name: "Acme Inc" },
    { id: "globex", name: "Globex Corporation" },
    { id: "initech", name: "Initech" },
  ]

  const campaigns = [
    { id: "c1", name: "Q2 Outreach", type: "email" },
    { id: "c2", name: "Customer Feedback", type: "call" },
    { id: "c3", name: "Appointment Reminders", type: "sms" },
  ]

  const branches = [
    { id: "b1", name: "Headquarters" },
    { id: "b2", name: "West Region" },
    { id: "b3", name: "East Region" },
  ]

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <Sidebar variant="sidebar" collapsible="icon">
          <div className="flex items-center gap-2 px-4 py-3 border-b bg-primary text-primary-foreground">
            <Bot className="h-6 w-6" />
            <span className="font-bold text-lg">Reem AI</span>
          </div>

          <SidebarContent className="pt-4">
            {/* 1. Dashboard Overview */}
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Dashboard" asChild>
                    <a href="/">
                      <Home className="h-4 w-4" />
                      <span>Dashboard Overview</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            {/* 2. Campaigns */}
            <SidebarGroup>
              <SidebarGroupLabel>Campaigns</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Call Campaigns" asChild>
                      <a href="/campaigns/call">
                        <Phone className="h-4 w-4" />
                        <span>Call Campaigns</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="SMS Campaigns" asChild>
                      <a href="/campaigns/sms">
                        <MessageSquare className="h-4 w-4" />
                        <span>SMS Campaigns</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Email Campaigns" asChild>
                      <a href="/campaigns/email">
                        <Mail className="h-4 w-4" />
                        <span>Email Campaigns</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Create Campaign" asChild>
                      <a href="/campaigns/create">
                        <Plus className="h-4 w-4" />
                        <span>Create Campaign</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* 3. Appointments */}
            <SidebarGroup>
              <SidebarGroupLabel>Appointments</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Calendar View" asChild>
                      <a href="/appointments/calendar">
                        <CalendarClock className="h-4 w-4" />
                        <span>Calendar View</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Appointment List" asChild>
                      <a href="/appointments/list">
                        <ListTodo className="h-4 w-4" />
                        <span>Appointment List</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Schedule Appointment" asChild>
                      <a href="/appointments/schedule">
                        <CalendarPlus className="h-4 w-4" />
                        <span>Schedule Appointment</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* 4. Contacts */}
            <SidebarGroup>
              <SidebarGroupLabel>Contacts</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Contact Lists" asChild>
                      <a href="/contacts">
                        <Users className="h-4 w-4" />
                        <span>Contact Lists</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Import Contacts" asChild>
                      <a href="/contacts/import">
                        <Upload className="h-4 w-4" />
                        <span>Import Contacts</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* 5. Monitoring */}
            <SidebarGroup>
              <SidebarGroupLabel>Monitoring</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Agent Status" asChild>
                      <a href="/agents/status">
                        <Activity className="h-4 w-4" />
                        <span>AI Agent Status</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <Collapsible className="w-full">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip="Call Records">
                          <PhoneCall className="h-4 w-4" />
                          <span>Call Records</span>
                          <ChevronDown className="ml-auto h-4 w-4" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild>
                              <a href="/calls/inbound">Inbound Calls</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild>
                              <a href="/calls/outbound">Outbound Calls</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>

                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Analytics & Reports" asChild>
                      <a href="/analytics">
                        <BarChart className="h-4 w-4" />
                        <span>Analytics & Reports</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* 6. Settings */}
            <SidebarGroup>
              <SidebarGroupLabel>Settings</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Company Settings" asChild>
                      <a href="/settings/company">
                        <Building className="h-4 w-4" />
                        <span>Company Settings</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="User & Role Management" asChild>
                      <a href="/settings/users">
                        <UserCog className="h-4 w-4" />
                        <span>User & Role Management</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings" asChild>
                  <a href="/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="border-b h-14 flex items-center px-4">
            <SidebarTrigger className="mr-2" />
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Reem AI</h1>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>{workspace.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{workspace}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[240px]">
                  <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {workspaces.map((ws) => (
                    <DropdownMenuItem key={ws.id} onClick={() => setWorkspace(ws.name)} className="cursor-pointer">
                      <Avatar className="h-5 w-5 mr-2">
                        <AvatarFallback>{ws.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      {ws.name}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Workspace
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Workspace Settings
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="sm" asChild>
                <a href="/campaigns/create">
                  <Plus className="h-4 w-4 mr-1" />
                  New Campaign
                </a>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>RA</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Help
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
