import { CampaignCreationWizard } from "@/components/campaign-creation-wizard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, MessageSquare, Phone } from "lucide-react"

export default function CreateCampaignPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Create Campaign</h2>
        <p className="text-muted-foreground">Set up a new AI-driven communication campaign</p>
      </div>

      <Tabs defaultValue="call" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="call" className="flex items-center gap-2">
            <Phone className="h-4 w-4" /> Call Campaign
          </TabsTrigger>
          <TabsTrigger value="sms" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> SMS Campaign
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" /> Email Campaign
          </TabsTrigger>
        </TabsList>

        <TabsContent value="call">
          <CampaignCreationWizard campaignType="call" />
        </TabsContent>

        <TabsContent value="sms">
          <CampaignCreationWizard campaignType="sms" />
        </TabsContent>

        <TabsContent value="email">
          <CampaignCreationWizard campaignType="email" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
