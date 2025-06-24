"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Building,
  Calendar,
  Edit,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Plus,
  Trash2,
  User,
} from "lucide-react"
import Link from "next/link"

interface ContactDetailProps {
  id: string
}

export function ContactDetail({ id }: ContactDetailProps) {
  // Sample contact data - in a real app, this would be fetched based on the ID
  const contact = {
    id,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    mobile: "+1 (555) 987-6543",
    company: "Acme Inc",
    title: "Marketing Director",
    website: "https://example.com",
    address: {
      street: "123 Main St",
      street2: "Suite 100",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "United States",
    },
    tags: ["customer", "priority"],
    status: "active",
    source: "Website",
    industry: "Technology",
    notes: "Met at the annual tech conference. Interested in our enterprise solution.",
    preferences: {
      emailOptIn: true,
      smsOptIn: false,
      callOptIn: true,
      preferredContact: "email",
      preferredLanguage: "English",
      contactFrequency: "Monthly",
    },
    lastContacted: "2 days ago",
    addedDate: "Oct 15, 2023",
    avatar: "/placeholder.svg?height=128&width=128",
  }

  // Sample activity data
  const activities = [
    {
      id: "a1",
      type: "call",
      date: "May 15, 2024",
      time: "2:30 PM",
      duration: "15 minutes",
      notes: "Discussed upcoming product launch and their interest in our enterprise plan.",
      outcome: "Positive",
    },
    {
      id: "a2",
      type: "email",
      date: "May 10, 2024",
      time: "11:15 AM",
      subject: "Follow-up on Demo",
      notes: "Sent follow-up email with pricing information and case studies.",
      opened: true,
    },
    {
      id: "a3",
      type: "meeting",
      date: "April 28, 2024",
      time: "10:00 AM",
      duration: "45 minutes",
      notes: "Product demo with their team. They showed interest in the analytics features.",
      outcome: "Positive",
    },
    {
      id: "a4",
      type: "sms",
      date: "April 20, 2024",
      time: "3:45 PM",
      notes: "Sent reminder about upcoming webinar.",
      delivered: true,
    },
    {
      id: "a5",
      type: "email",
      date: "April 15, 2024",
      time: "9:30 AM",
      subject: "Introduction and Product Information",
      notes: "Initial outreach email with product information.",
      opened: true,
    },
  ]

  // Sample deals data
  const deals = [
    {
      id: "d1",
      name: "Enterprise Subscription",
      value: "$12,000",
      stage: "Proposal",
      probability: "60%",
      expectedCloseDate: "June 30, 2024",
    },
    {
      id: "d2",
      name: "Training Services",
      value: "$3,500",
      stage: "Negotiation",
      probability: "75%",
      expectedCloseDate: "May 31, 2024",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Contact Info Card */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
              <AvatarFallback>{contact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle>{contact.name}</CardTitle>
              <CardDescription>
                {contact.title} at {contact.company}
              </CardDescription>
              <div className="flex flex-wrap gap-1 pt-1">
                {contact.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="capitalize">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${contact.phone}`} className="hover:underline">
                  {contact.phone}
                </a>
              </div>
              {contact.mobile && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${contact.mobile}`} className="hover:underline">
                    {contact.mobile} (Mobile)
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span>{contact.company}</span>
              </div>
              {contact.website && (
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    {contact.website.replace(/^https?:\/\//, "")}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Address</h4>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p>{contact.address.street}</p>
                  {contact.address.street2 && <p>{contact.address.street2}</p>}
                  <p>
                    {contact.address.city}, {contact.address.state} {contact.address.zip}
                  </p>
                  <p>{contact.address.country}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Details</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Status</div>
                <div className="capitalize">{contact.status}</div>
                <div className="text-muted-foreground">Source</div>
                <div>{contact.source}</div>
                <div className="text-muted-foreground">Industry</div>
                <div>{contact.industry}</div>
                <div className="text-muted-foreground">Added</div>
                <div>{contact.addedDate}</div>
                <div className="text-muted-foreground">Last Contacted</div>
                <div>{contact.lastContacted}</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href={`/contacts/${id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </CardFooter>
        </Card>

        {/* Tabs Section */}
        <div className="md:col-span-2">
          <Tabs defaultValue="activity">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="deals">Deals</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Recent Activity</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule
                  </Button>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Activity
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {activities.map((activity) => (
                  <Card key={activity.id}>
                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {activity.type === "call" && <Phone className="h-4 w-4 text-blue-500" />}
                          {activity.type === "email" && <Mail className="h-4 w-4 text-green-500" />}
                          {activity.type === "meeting" && <User className="h-4 w-4 text-purple-500" />}
                          {activity.type === "sms" && <MessageSquare className="h-4 w-4 text-orange-500" />}
                          <CardTitle className="text-base capitalize">{activity.type}</CardTitle>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {activity.date} at {activity.time}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      {activity.subject && <p className="font-medium mb-1">Subject: {activity.subject}</p>}
                      {activity.duration && (
                        <p className="text-sm text-muted-foreground mb-1">Duration: {activity.duration}</p>
                      )}
                      <p className="text-sm">{activity.notes}</p>
                      {activity.outcome && (
                        <Badge className="mt-2" variant={activity.outcome === "Positive" ? "default" : "outline"}>
                          {activity.outcome}
                        </Badge>
                      )}
                      {activity.opened !== undefined && (
                        <Badge className="mt-2" variant={activity.opened ? "default" : "outline"}>
                          {activity.opened ? "Opened" : "Not Opened"}
                        </Badge>
                      )}
                      {activity.delivered !== undefined && (
                        <Badge className="mt-2" variant={activity.delivered ? "default" : "outline"}>
                          {activity.delivered ? "Delivered" : "Not Delivered"}
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-center">
                <Button variant="outline">View All Activity</Button>
              </div>
            </TabsContent>

            {/* Deals Tab */}
            <TabsContent value="deals" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Deals</h3>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Deal
                </Button>
              </div>

              {deals.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Deal Name</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Stage</TableHead>
                        <TableHead>Probability</TableHead>
                        <TableHead>Expected Close</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {deals.map((deal) => (
                        <TableRow key={deal.id}>
                          <TableCell className="font-medium">{deal.name}</TableCell>
                          <TableCell>{deal.value}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{deal.stage}</Badge>
                          </TableCell>
                          <TableCell>{deal.probability}</TableCell>
                          <TableCell>{deal.expectedCloseDate}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="text-center space-y-2">
                      <p>No deals found for this contact.</p>
                      <Button>Create First Deal</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Notes Tab */}
            <TabsContent value="notes" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Notes</h3>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Note
                </Button>
              </div>

              <Card>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">Contact Notes</CardTitle>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm">{contact.notes}</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Communication Preferences</h3>
                <Button size="sm" variant="outline" asChild>
                  <Link href={`/contacts/${id}/edit?tab=preferences`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Preferences
                  </Link>
                </Button>
              </div>

              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Email Marketing</p>
                        <Badge variant={contact.preferences.emailOptIn ? "default" : "secondary"}>
                          {contact.preferences.emailOptIn ? "Opted In" : "Opted Out"}
                        </Badge>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm font-medium">SMS Notifications</p>
                        <Badge variant={contact.preferences.smsOptIn ? "default" : "secondary"}>
                          {contact.preferences.smsOptIn ? "Opted In" : "Opted Out"}
                        </Badge>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm font-medium">Phone Calls</p>
                        <Badge variant={contact.preferences.callOptIn ? "default" : "secondary"}>
                          {contact.preferences.callOptIn ? "Opted In" : "Opted Out"}
                        </Badge>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm font-medium">Preferred Contact Method</p>
                        <p className="text-sm capitalize">{contact.preferences.preferredContact}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm font-medium">Preferred Language</p>
                        <p className="text-sm">{contact.preferences.preferredLanguage}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-sm font-medium">Contact Frequency</p>
                        <p className="text-sm">{contact.preferences.contactFrequency}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
