"use client";

import type React from "react";

import { useState } from "react";
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
  SidebarHeader,
} from "@/components/ui/sidebar";
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
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { usePathname } from "next/navigation";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [workspace, setWorkspace] = useState("Acme Inc");
  const pathName = usePathname();

  const workspaces = [
    { id: "acme", name: "Acme Inc" },
    { id: "globex", name: "Globex Corporation" },
    { id: "initech", name: "Initech" },
  ];

  // const campaigns = [
  //   { id: "c1", name: "Q2 Outreach", type: "email" },
  //   { id: "c2", name: "Customer Feedback", type: "call" },
  //   { id: "c3", name: "Appointment Reminders", type: "sms" },
  // ];

  // const branches = [
  //   { id: "b1", name: "Headquarters" },
  //   { id: "b2", name: "West Region" },
  //   { id: "b3", name: "East Region" },
  // ];

  const campaigns = [
    {
      id: "call_campaign",
      tooltip: "Call Campaigns",
      href: "/campaigns/call",
      label: "Call Campaigns",
      icon: <Phone className="h-4 w-4" />,
    },
    {
      id: "sms_campaign",
      tooltip: "SMS Campaigns",
      href: "/campaigns/sms",
      label: "SMS Campaigns",
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      id: "email_campaign",
      tooltip: "Email Campaigns",
      href: "/campaigns/email",
      label: "Email Campaigns",
      icon: <Mail className="h-4 w-4" />,
    },
    {
      id: "create_campaign",
      tooltip: "Create Campaigns",
      href: "/campaigns/create",
      label: "Create Campaigns",
      icon: <Plus className="h-4 w-4" />,
    },
  ];

  const appointments = [
    {
      id: "calendar_view",
      tooltip: "Calendar View",
      href: "/appointments/calendar",
      label: "Calendar View",
      icon: <CalendarClock className="h-4 w-4" />,
    },
    {
      id: "appointment_list",
      tooltip: "Appointment List",
      href: "/appointments/list",
      label: "Appointment List",
      icon: <ListTodo className="h-4 w-4" />,
    },
    {
      id: "schedule_ppointment",
      tooltip: "Schedule Appointment",
      href: "/appointments/schedule",
      label: "Schedule Appointment",
      icon: <CalendarPlus className="h-4 w-4" />,
    },
  ];

  const contacts = [
    {
      id: "contact_lists",
      tooltip: "Contact Lists",
      href: "/contacts",
      label: "Contact Lists",
      icon: <Users className="h-4 w-4" />,
    },
    {
      id: "import_contacts",
      tooltip: "Import Contacts",
      href: "/contacts/import",
      label: "Import Contacts",
      icon: <Upload className="h-4 w-4" />,
    },
  ];

  const settings = [
    {
      id: "company_settings",
      tooltip: "Company Settings",
      href: "/settings/company",
      label: "Company Settings",
      icon: <Building className="h-4 w-4" />,
    },
    {
      id: "user_management",
      tooltip: "User & Role Management",
      href: "/settings/users",
      label: "User & Role Management",
      icon: <UserCog className="h-4 w-4" />,
    },
  ];

  const getMenuItemClass = (path: string) =>
    pathName === path ? "bg-accent text-foreground" : "";

  const renderMenuItem = (
    href: string,
    icon: React.ReactNode,
    label: string,
    tooltip: string,
    id: string
  ) => (
    <SidebarMenuItem key={id}>
      <SidebarMenuButton
        tooltip={tooltip}
        className={getMenuItemClass(href)}
        asChild
      >
        <a href={href}>
          {icon}
          <span>{label}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <Sidebar variant="sidebar" collapsible="icon">
          <SidebarHeader className="border-b bg-primary text-primary-foreground px-2 py-3">
            <SidebarMenu>
              <SidebarMenuButton
                className="flex items-center gap-2 flex-row hover:bg-primary hover:text-primary-foreground"
                asChild
              >
                <a href="/">
                  <Bot className="h-6 w-6" />
                  <span className="font-bold text-lg">Reem AI</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenu>
          </SidebarHeader>
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
                  {campaigns.map((campaign) =>
                    renderMenuItem(
                      campaign.href,
                      campaign.icon,
                      campaign.label,
                      campaign.tooltip,
                      campaign.id
                    )
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* 3. Appointments */}
            <SidebarGroup>
              <SidebarGroupLabel>Appointments</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {appointments.map((appointment) =>
                    renderMenuItem(
                      appointment.href,
                      appointment.icon,
                      appointment.label,
                      appointment.tooltip,
                      appointment.id
                    )
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* 4. Contacts */}
            <SidebarGroup>
              <SidebarGroupLabel>Contacts</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {contacts.map((contact) =>
                    renderMenuItem(
                      contact.href,
                      contact.icon,
                      contact.label,
                      contact.tooltip,
                      contact.id
                    )
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* 5. Monitoring */}
            <SidebarGroup>
              <SidebarGroupLabel>Monitoring</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {renderMenuItem(
                    "/agents/status",
                    <Activity className="h-4 w-4" />,
                    "AI Agent Status",
                    "Agent Status",
                    "agent_status"

                  )}

                  <Collapsible className="w-full">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip="Call Records"
                          className={`${
                            pathName === "/calls/inbound" ||
                            pathName === "/calls/outbound"
                              ? "bg-accent text-foreground"
                              : ""
                          }`}
                        >
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
                    <SidebarMenuButton
                      tooltip="Analytics & Reports"
                      className={`${
                        pathName === "analytics"
                          ? "bg-accent text-foreground"
                          : ""
                      }`}
                      asChild
                    >
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
                  {settings.map((setting) =>
                    renderMenuItem(
                      setting.href,
                      setting.icon,
                      setting.label,
                      setting.tooltip,
                      setting.id
                    )
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t">
            <SidebarMenu>
              {renderMenuItem(
                "/settings",
                <Settings className="h-4 w-4" />,
                "Settings",
                "Settings",
                "settings"
              )}
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="border-b h-14 flex items-center px-4">
            <SidebarTrigger className="mr-2 text-primary" />
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-primary">Reem AI</h1>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Avatar className="h-5 w-5">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>
                        {workspace ? workspace.substring(0, 2) : "NA"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{workspace}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[240px]">
                  <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {workspaces.map((ws) => (
                    <DropdownMenuItem
                      key={ws.id}
                      onClick={() => setWorkspace(ws.name)}
                      className="cursor-pointer"
                    >
                      <Avatar className="h-5 w-5 mr-2">
                        <AvatarFallback>
                          {ws.name.substring(0, 2)}
                        </AvatarFallback>
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
  );
}
