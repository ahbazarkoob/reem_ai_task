"use client"

import { Textarea } from "@/components/ui/textarea"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  MoreHorizontal,
  Search,
  Filter,
  Download,
  Upload,
  UserPlus,
  Mail,
  Shield,
  Users,
  Eye,
  Edit,
  Trash,
  CheckCircle2,
  XCircle,
  Clock,
  Lock,
  Unlock,
  RotateCw,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const userFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  role: z.string().min(1, { message: "Please select a role." }),
  department: z.string().optional(),
  isActive: z.boolean().default(true),
  sendInvite: z.boolean().default(true),
})

const roleFormSchema = z.object({
  name: z.string().min(2, { message: "Role name must be at least 2 characters." }),
  description: z.string().optional(),
  permissions: z.record(z.boolean()).default({}),
})

const permissionGroups = [
  {
    name: "Dashboard",
    permissions: [
      { id: "dashboard.view", name: "View Dashboard" },
      { id: "dashboard.edit", name: "Edit Dashboard" },
    ],
  },
  {
    name: "Campaigns",
    permissions: [
      { id: "campaigns.view", name: "View Campaigns" },
      { id: "campaigns.create", name: "Create Campaigns" },
      { id: "campaigns.edit", name: "Edit Campaigns" },
      { id: "campaigns.delete", name: "Delete Campaigns" },
    ],
  },
  {
    name: "Contacts",
    permissions: [
      { id: "contacts.view", name: "View Contacts" },
      { id: "contacts.create", name: "Create Contacts" },
      { id: "contacts.edit", name: "Edit Contacts" },
      { id: "contacts.delete", name: "Delete Contacts" },
      { id: "contacts.import", name: "Import Contacts" },
      { id: "contacts.export", name: "Export Contacts" },
    ],
  },
  {
    name: "Appointments",
    permissions: [
      { id: "appointments.view", name: "View Appointments" },
      { id: "appointments.create", name: "Create Appointments" },
      { id: "appointments.edit", name: "Edit Appointments" },
      { id: "appointments.delete", name: "Delete Appointments" },
    ],
  },
  {
    name: "Reports",
    permissions: [
      { id: "reports.view", name: "View Reports" },
      { id: "reports.create", name: "Create Reports" },
      { id: "reports.export", name: "Export Reports" },
    ],
  },
  {
    name: "Settings",
    permissions: [
      { id: "settings.view", name: "View Settings" },
      { id: "settings.edit", name: "Edit Settings" },
      { id: "settings.users", name: "Manage Users" },
      { id: "settings.roles", name: "Manage Roles" },
      { id: "settings.billing", name: "Manage Billing" },
    ],
  },
]

const mockUsers = [
  {
    id: "u1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: "Administrator",
    department: "Management",
    status: "active",
    lastActive: "2023-05-15T10:30:00Z",
  },
  {
    id: "u2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    role: "Manager",
    department: "Sales",
    status: "active",
    lastActive: "2023-05-14T16:45:00Z",
  },
  {
    id: "u3",
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert.johnson@example.com",
    role: "Agent",
    department: "Support",
    status: "active",
    lastActive: "2023-05-15T09:15:00Z",
  },
  {
    id: "u4",
    firstName: "Emily",
    lastName: "Williams",
    email: "emily.williams@example.com",
    role: "Agent",
    department: "Marketing",
    status: "inactive",
    lastActive: "2023-05-10T14:20:00Z",
  },
  {
    id: "u5",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@example.com",
    role: "Viewer",
    department: "Finance",
    status: "pending",
    lastActive: null,
  },
  {
    id: "u6",
    firstName: "Sarah",
    lastName: "Davis",
    email: "sarah.davis@example.com",
    role: "Manager",
    department: "Operations",
    status: "active",
    lastActive: "2023-05-15T11:10:00Z",
  },
  {
    id: "u7",
    firstName: "David",
    lastName: "Miller",
    email: "david.miller@example.com",
    role: "Administrator",
    department: "IT",
    status: "active",
    lastActive: "2023-05-15T08:30:00Z",
  },
]

const mockRoles = [
  {
    id: "r1",
    name: "Administrator",
    description: "Full access to all features and settings",
    userCount: 2,
    isDefault: false,
    isSystem: true,
  },
  {
    id: "r2",
    name: "Manager",
    description: "Can manage campaigns, contacts, and view reports",
    userCount: 5,
    isDefault: false,
    isSystem: true,
  },
  {
    id: "r3",
    name: "Agent",
    description: "Can handle calls and manage assigned contacts",
    userCount: 12,
    isDefault: true,
    isSystem: true,
  },
  {
    id: "r4",
    name: "Viewer",
    description: "Read-only access to campaigns and reports",
    userCount: 3,
    isDefault: false,
    isSystem: true,
  },
  {
    id: "r5",
    name: "Marketing",
    description: "Focused on campaign creation and analytics",
    userCount: 4,
    isDefault: false,
    isSystem: false,
  },
  {
    id: "r6",
    name: "Support",
    description: "Handles customer support and follow-ups",
    userCount: 7,
    isDefault: false,
    isSystem: false,
  },
]

export function UserManagement() {
  const [activeTab, setActiveTab] = useState("users")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [showAddUserDialog, setShowAddUserDialog] = useState(false)
  const [showAddRoleDialog, setShowAddRoleDialog] = useState(false)
  const [users, setUsers] = useState(mockUsers)
  const [roles, setRoles] = useState(mockRoles)

  const userForm = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      department: "",
      isActive: true,
      sendInvite: true,
    },
  })

  const roleForm = useForm<z.infer<typeof roleFormSchema>>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      name: "",
      description: "",
      permissions: {},
    },
  })

  function onUserSubmit(values: z.infer<typeof userFormSchema>) {
    // In a real app, this would send the data to your API
    const newUser = {
      id: `u${users.length + 1}`,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      role: values.role,
      department: values.department || "Unassigned",
      status: values.isActive ? "active" : "inactive",
      lastActive: null,
    }

    setUsers([...users, newUser])
    setShowAddUserDialog(false)
    userForm.reset()

    toast({
      title: "User added successfully",
      description: values.sendInvite
        ? `An invitation email has been sent to ${values.email}`
        : `${values.firstName} ${values.lastName} has been added`,
    })
  }

  function onRoleSubmit(values: z.infer<typeof roleFormSchema>) {
    // In a real app, this would send the data to your API
    const newRole = {
      id: `r${roles.length + 1}`,
      name: values.name,
      description: values.description || "",
      userCount: 0,
      isDefault: false,
      isSystem: false,
    }

    setRoles([...roles, newRole])
    setShowAddRoleDialog(false)
    roleForm.reset()

    toast({
      title: "Role created successfully",
      description: `The role "${values.name}" has been created`,
    })
  }

  function handleDeleteUser(userId: string) {
    setUsers(users.filter((user) => user.id !== userId))
    toast({
      title: "User deleted",
      description: "The user has been removed from the system",
    })
  }

  function handleToggleUserStatus(userId: string) {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          const newStatus = user.status === "active" ? "inactive" : "active"
          return { ...user, status: newStatus }
        }
        return user
      }),
    )

    toast({
      title: "User status updated",
      description: "The user's status has been updated",
    })
  }

  function handleDeleteRole(roleId: string) {
    setRoles(roles.filter((role) => role.id !== roleId))
    toast({
      title: "Role deleted",
      description: "The role has been removed from the system",
    })
  }

  function handleSetDefaultRole(roleId: string) {
    setRoles(
      roles.map((role) => ({
        ...role,
        isDefault: role.id === roleId,
      })),
    )

    toast({
      title: "Default role updated",
      description: "The default role for new users has been updated",
    })
  }

  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesDepartment = departmentFilter === "all" || user.department === departmentFilter

    return matchesSearch && matchesStatus && matchesRole && matchesDepartment
  })

  // Get unique departments for filter
  const departments = Array.from(new Set(users.map((user) => user.department)))

  // Get unique roles for filter
  const uniqueRoles = Array.from(new Set(users.map((user) => user.role)))

  return (
    <Tabs defaultValue="users" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="grid grid-cols-2 w-full max-w-md">
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
      </TabsList>

      {/* Users Tab */}
      <TabsContent value="users" className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Users</CardTitle>
                <CardDescription>Manage users and their access to the system.</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={() => setShowAddUserDialog(true)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Upload className="h-4 w-4 mr-2" />
                      Import Users
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-2" />
                      Export Users
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Bulk Email
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search users..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[130px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[130px]">
                      <Shield className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      {uniqueRoles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="w-[150px]">
                      <Users className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                          No users found. Try adjusting your filters.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={`/placeholder.svg?height=32&width=32&text=${user.firstName.charAt(0)}${user.lastName.charAt(0)}`}
                                />
                                <AvatarFallback>
                                  {user.firstName.charAt(0)}
                                  {user.lastName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">
                                  {user.firstName} {user.lastName}
                                </div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-normal">
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.department}</TableCell>
                          <TableCell>
                            {user.status === "active" && (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                                Active
                              </Badge>
                            )}
                            {user.status === "inactive" && (
                              <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                                <XCircle className="h-3.5 w-3.5 mr-1" />
                                Inactive
                              </Badge>
                            )}
                            {user.status === "pending" && (
                              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                Pending
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {user.lastActive ? (
                              new Date(user.lastActive).toLocaleString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                              })
                            ) : (
                              <span className="text-muted-foreground">Never</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit User
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleToggleUserStatus(user.id)}>
                                  {user.status === "active" ? (
                                    <>
                                      <Lock className="h-4 w-4 mr-2" />
                                      Deactivate
                                    </>
                                  ) : (
                                    <>
                                      <Unlock className="h-4 w-4 mr-2" />
                                      Activate
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <RotateCw className="h-4 w-4 mr-2" />
                                  Reset Password
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteUser(user.id)}>
                                  <Trash className="h-4 w-4 mr-2" />
                                  Delete User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>{filteredUsers.length}</strong> of <strong>{users.length}</strong> users
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add User Dialog */}
        <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account and set their permissions.</DialogDescription>
            </DialogHeader>
            <Form {...userForm}>
              <form onSubmit={userForm.handleSubmit(onUserSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={userForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={userForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={userForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={userForm.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {roles.map((role) => (
                              <SelectItem key={role.id} value={role.name}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={userForm.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
                              </SelectItem>
                            ))}
                            <SelectItem value="Unassigned">Unassigned</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={userForm.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Active Status</FormLabel>
                        <FormDescription>User will be able to log in immediately if active</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={userForm.control}
                  name="sendInvite"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Send Invitation Email</FormLabel>
                        <FormDescription>Send an email invitation to set up their account</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setShowAddUserDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add User</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </TabsContent>

      {/* Roles Tab */}
      <TabsContent value="roles" className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Roles & Permissions</CardTitle>
                <CardDescription>Manage roles and their associated permissions.</CardDescription>
              </div>
              <Button onClick={() => setShowAddRoleDialog(true)}>
                <Shield className="h-4 w-4 mr-2" />
                Add Role
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell>
                          <div className="font-medium flex items-center">
                            {role.name}
                            {role.isDefault && (
                              <Badge variant="outline" className="ml-2">
                                Default
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{role.description}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{role.userCount} users</Badge>
                        </TableCell>
                        <TableCell>
                          {role.isSystem ? (
                            <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                              System
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                              Custom
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Role
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Permissions
                              </DropdownMenuItem>
                              {!role.isDefault && (
                                <DropdownMenuItem onClick={() => handleSetDefaultRole(role.id)}>
                                  <CheckCircle2 className="h-4 w-4 mr-2" />
                                  Set as Default
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              {!role.isSystem && (
                                <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteRole(role.id)}>
                                  <Trash className="h-4 w-4 mr-2" />
                                  Delete Role
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Role Dialog */}
        <Dialog open={showAddRoleDialog} onOpenChange={setShowAddRoleDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
              <DialogDescription>Define a new role and set its permissions.</DialogDescription>
            </DialogHeader>
            <Form {...roleForm}>
              <form onSubmit={roleForm.handleSubmit(onRoleSubmit)} className="space-y-4">
                <FormField
                  control={roleForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Marketing Manager" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={roleForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief description of this role's responsibilities"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Permissions</h3>
                  <div className="space-y-6">
                    {permissionGroups.map((group) => (
                      <div key={group.name} className="space-y-2">
                        <h4 className="font-medium text-sm">{group.name}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {group.permissions.map((permission) => (
                            <FormField
                              key={permission.id}
                              control={roleForm.control}
                              name={`permissions.${permission.id}`}
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel className="text-sm font-medium">{permission.name}</FormLabel>
                                  </div>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setShowAddRoleDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Role</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </TabsContent>
    </Tabs>
  )
}
