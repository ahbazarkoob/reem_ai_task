"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Copy, Plus, Save, Trash } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export function AIScriptEditor() {
  const [activeScript, setActiveScript] = useState("product_upsell");

  // Sample script data
  const scripts = {
    product_upsell: {
      name: "Product Upsell",
      description:
        "Script for upselling premium features to existing customers",
      active: true,
      introduction:
        "Hello, this is [AI_NAME] from Acme Inc. I hope you're enjoying our service. I'm calling to tell you about some exciting premium features that could enhance your experience.",
      questions: [
        "How satisfied are you with our current service?",
        "Have you considered upgrading to our premium plan?",
        "Would you like to hear about our special offer this month?",
        "What specific features would be most valuable to your business?",
      ],
      responses: {
        positive:
          "That's great to hear! Based on your needs, I think our [PREMIUM_PLAN] would be perfect for you. It includes [FEATURES] at just [PRICE] per month.",
        negative:
          "I understand. Perhaps we could schedule a follow-up call when it's more convenient, or I can send you some information via email for you to review at your leisure.",
        neutral:
          "I appreciate your feedback. Would you like me to explain how our premium features could specifically address your needs?",
      },
      closing:
        "Thank you for your time today. [IF_INTERESTED: I'll process your upgrade right away and send a confirmation email.] [IF_NOT_INTERESTED: I'll make a note of your preferences for future reference.] Have a great day!",
      variables: ["AI_NAME", "PREMIUM_PLAN", "FEATURES", "PRICE"],
      targetAudience: "Existing customers",
      successMetric: "Upgrade rate",
    },
    appointment_reminder: {
      name: "Appointment Reminder",
      description: "Script for reminding customers of upcoming appointments",
      active: true,
      introduction:
        "Hello, this is [AI_NAME] from Acme Inc. I'm calling to remind you about your upcoming appointment scheduled for [APPOINTMENT_DATE] at [APPOINTMENT_TIME].",
      questions: [
        "Will you be able to make this appointment?",
        "Would you like to confirm or reschedule?",
        "Do you need any additional information before your appointment?",
      ],
      responses: {
        positive:
          "Excellent! We look forward to seeing you on [APPOINTMENT_DATE] at [APPOINTMENT_TIME]. Please remember to bring [REQUIRED_ITEMS].",
        negative:
          "I understand. Let's find a new time that works better for you. We have openings on [ALTERNATIVE_DATES].",
        neutral:
          "No problem. I can send you a reminder email with all the details, including the address and what to expect.",
      },
      closing:
        "Thank you for your time. [IF_CONFIRMED: We'll see you on [APPOINTMENT_DATE].] [IF_RESCHEDULED: Your appointment is now confirmed for [NEW_DATE].] Have a great day!",
      variables: [
        "AI_NAME",
        "APPOINTMENT_DATE",
        "APPOINTMENT_TIME",
        "REQUIRED_ITEMS",
        "ALTERNATIVE_DATES",
        "NEW_DATE",
      ],
      targetAudience: "Customers with scheduled appointments",
      successMetric: "Appointment show rate",
    },
    feedback_survey: {
      name: "Feedback Survey",
      description: "Script for collecting customer feedback",
      active: false,
      introduction:
        "Hello, this is [AI_NAME] from Acme Inc. We value your opinion and would appreciate a few minutes of your time to gather feedback about your recent experience with our [PRODUCT_SERVICE].",
      questions: [
        "On a scale of 1-10, how would you rate your overall satisfaction?",
        "What did you like most about our [PRODUCT_SERVICE]?",
        "Is there anything we could improve?",
        "Would you recommend us to friends or colleagues?",
      ],
      responses: {
        positive:
          "Thank you for your positive feedback! We're delighted to hear you had a good experience. Your comments will help us maintain our high standards.",
        negative:
          "I appreciate your honest feedback. I'm sorry to hear about your experience. Your comments will help us improve our service. Would you like a manager to follow up with you?",
        neutral:
          "Thank you for sharing your thoughts. We're constantly working to improve, and your feedback is valuable to that process.",
      },
      closing:
        "Thank you for taking the time to provide feedback. [IF_FOLLOW_UP_REQUESTED: Someone from our team will contact you within 24 hours.] Your input helps us serve you better. Have a wonderful day!",
      variables: ["AI_NAME", "PRODUCT_SERVICE"],
      targetAudience: "Recent customers",
      successMetric: "Survey completion rate",
    },
  };

  const currentScript = scripts[activeScript as keyof typeof scripts];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs
          defaultValue="product_upsell"
          value={activeScript}
          onValueChange={setActiveScript}
          className="w-full"
        >
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              {Object.keys(scripts).map((scriptKey) => (
                <TabsTrigger
                  key={scriptKey}
                  value={scriptKey}
                  className="flex items-center gap-2 data-[state=active]:text-primary/80 text-gray-500 data-[state=active]:bg-gray-100"
                >
                  <Bot className="h-4 w-4" />
                  {scripts[scriptKey as keyof typeof scripts].name}
                </TabsTrigger>
              ))}
            </TabsList>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" /> New Script
            </Button>
          </div>

          {Object.keys(scripts).map((scriptKey) => (
            <TabsContent
              key={scriptKey}
              value={scriptKey}
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">
                    {scripts[scriptKey as keyof typeof scripts].name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {scripts[scriptKey as keyof typeof scripts].description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Switch
                      id={`${scriptKey}-active`}
                      checked={
                        scripts[scriptKey as keyof typeof scripts].active
                      }
                    />
                    <Label htmlFor={`${scriptKey}-active`}>Active</Label>
                  </div>
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`${scriptKey}-name`}>Script Name</Label>
                    <Input
                      id={`${scriptKey}-name`}
                      defaultValue={
                        scripts[scriptKey as keyof typeof scripts].name
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`${scriptKey}-description`}>
                      Description
                    </Label>
                    <Textarea
                      id={`${scriptKey}-description`}
                      rows={2}
                      defaultValue={
                        scripts[scriptKey as keyof typeof scripts].description
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`${scriptKey}-audience`}>
                        Target Audience
                      </Label>
                      <Input
                        id={`${scriptKey}-audience`}
                        defaultValue={
                          scripts[scriptKey as keyof typeof scripts]
                            .targetAudience
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${scriptKey}-metric`}>
                        Success Metric
                      </Label>
                      <Input
                        id={`${scriptKey}-metric`}
                        defaultValue={
                          scripts[scriptKey as keyof typeof scripts]
                            .successMetric
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Variables</Label>
                    <div className="flex flex-wrap gap-2">
                      {scripts[scriptKey as keyof typeof scripts].variables.map(
                        (variable) => (
                          <Badge
                            key={variable}
                            variant="outline"
                            className="px-2 py-1"
                          >
                            {variable}
                          </Badge>
                        )
                      )}
                      <Button variant="ghost" size="sm" className="h-7">
                        <Plus className="h-3 w-3 mr-1" /> Add
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`${scriptKey}-introduction`}>
                      Introduction
                    </Label>
                    <Textarea
                      id={`${scriptKey}-introduction`}
                      rows={3}
                      defaultValue={
                        scripts[scriptKey as keyof typeof scripts].introduction
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Questions</Label>
                      <Button variant="ghost" size="sm">
                        <Plus className="h-3 w-3 mr-1" /> Add
                      </Button>
                    </div>
                    <ScrollArea className="h-[150px] border rounded-md p-2">
                      {scripts[scriptKey as keyof typeof scripts].questions.map(
                        (question, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between py-2 border-b last:border-0"
                          >
                            <p className="text-sm">{question}</p>
                            <Button variant="ghost" size="sm">
                              <Trash className="h-3 w-3" />
                            </Button>
                          </div>
                        )
                      )}
                    </ScrollArea>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Response Templates</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4 space-y-2 border-green-200">
                    <Label
                      htmlFor={`${scriptKey}-positive`}
                      className="text-green-600"
                    >
                      Positive Response
                    </Label>
                    <Textarea
                      id={`${scriptKey}-positive`}
                      rows={4}
                      defaultValue={
                        scripts[scriptKey as keyof typeof scripts].responses
                          .positive
                      }
                    />
                  </Card>

                  <Card className="p-4 space-y-2 border-gray-200">
                    <Label
                      htmlFor={`${scriptKey}-neutral`}
                      className="text-gray-600"
                    >
                      Neutral Response
                    </Label>
                    <Textarea
                      id={`${scriptKey}-neutral`}
                      rows={4}
                      defaultValue={
                        scripts[scriptKey as keyof typeof scripts].responses
                          .neutral
                      }
                    />
                  </Card>

                  <Card className="p-4 space-y-2 border-red-200">
                    <Label
                      htmlFor={`${scriptKey}-negative`}
                      className="text-red-600"
                    >
                      Negative Response
                    </Label>
                    <Textarea
                      id={`${scriptKey}-negative`}
                      rows={4}
                      defaultValue={
                        scripts[scriptKey as keyof typeof scripts].responses
                          .negative
                      }
                    />
                  </Card>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`${scriptKey}-closing`}>Closing</Label>
                <Textarea
                  id={`${scriptKey}-closing`}
                  rows={3}
                  defaultValue={
                    scripts[scriptKey as keyof typeof scripts].closing
                  }
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button className="flex items-center gap-2">
                  <Save className="h-4 w-4" /> Save Script
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
