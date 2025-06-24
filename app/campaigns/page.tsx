import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, MessageSquare, Phone, Plus } from "lucide-react"
import { CampaignList } from "@/components/campaign-list"
import { CampaignOverview } from "@/components/campaign-overview"
import Link from "next/link"

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Campaigns</h2>
          <p className="text-muted-foreground">Manage your AI-driven communication campaigns</p>
        </div>
        <Button asChild>
          <Link href="/campaigns/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
          </Link>
        </Button>
      </div>

      <CampaignOverview />

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Campaigns</TabsTrigger>
          <TabsTrigger value="call" className="flex items-center gap-1">
            <Phone className="h-4 w-4" /> Call
          </TabsTrigger>
          <TabsTrigger value="sms" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" /> SMS
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-1">
            <Mail className="h-4 w-4" /> Email
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <CampaignList showFilters={true} />
        </TabsContent>

        <TabsContent value="call" className="space-y-4">
          <CampaignList showFilters={true} type="call" />
        </TabsContent>

        <TabsContent value="sms" className="space-y-4">
          <CampaignList showFilters={true} type="sms" />
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <CampaignList showFilters={true} type="email" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
