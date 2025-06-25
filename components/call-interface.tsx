"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  User,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function CallInterface() {
  const [callStatus, setCallStatus] = useState<
    "idle" | "calling" | "connected" | "ended"
  >("idle");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [activeContact, setActiveContact] = useState<{
    name: string;
    number: string;
    avatar?: string;
  } | null>(null);

  // Simulate making a call
  const handleMakeCall = () => {
    if (!phoneNumber && !activeContact) return;

    setCallStatus("calling");

    // If we have an active contact, use their info
    if (!activeContact && phoneNumber) {
      setActiveContact({
        name: "Unknown",
        number: phoneNumber,
      });
    }

    // Simulate call connecting after 2 seconds
    setTimeout(() => {
      setCallStatus("connected");
      startCallTimer();
    }, 2000);
  };

  // Simulate ending a call
  const handleEndCall = () => {
    setCallStatus("ended");
    clearCallTimer();

    // Reset after 2 seconds
    setTimeout(() => {
      setCallStatus("idle");
      setCallDuration(0);
      if (!activeContact) {
        setPhoneNumber("");
      }
    }, 2000);
  };

  // Call timer functionality
  let timerInterval: NodeJS.Timeout;
  const startCallTimer = () => {
    timerInterval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
  };

  const clearCallTimer = () => {
    clearInterval(timerInterval);
  };

  // Format seconds to mm:ss
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle dialer input
  const handleDialerInput = (value: string) => {
    setPhoneNumber((prev) => prev + value);
  };

  // Dialer buttons
  const dialerButtons = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "*",
    "0",
    "#",
  ];

  return (
    <div className="flex flex-col space-y-4">
      {/* Contact/Number Display */}
      <div className="flex flex-col items-center justify-center space-y-2 p-4 rounded-lg bg-slate-50">
        {activeContact ? (
          <>
            <Avatar className="h-16 w-16 mb-2">
              <AvatarImage
                src={
                  activeContact.avatar ||
                  "/placeholder-user.png?height=64&width=64"
                }
              />
              <AvatarFallback>
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-medium">{activeContact.name}</h3>
            <p className="text-sm text-muted-foreground">
              {activeContact.number}
            </p>
          </>
        ) : (
          <Input
            type="tel"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="text-center text-lg"
            disabled={callStatus !== "idle"}
          />
        )}

        {callStatus !== "idle" && (
          <Badge
            variant={
              callStatus === "connected"
                ? "default"
                : callStatus === "calling"
                ? "outline"
                : "destructive"
            }
            className="mt-2"
          >
            {callStatus === "connected"
              ? `Connected (${formatDuration(callDuration)})`
              : callStatus === "calling"
              ? "Calling..."
              : "Call Ended"}
          </Badge>
        )}
      </div>

      <Tabs defaultValue="dialer" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dialer">Dialer</TabsTrigger>
          <TabsTrigger value="controls">Controls</TabsTrigger>
        </TabsList>

        <TabsContent value="dialer">
          {/* Dialer Pad */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            {dialerButtons.map((btn) => (
              <Button
                key={btn}
                variant="outline"
                className="h-12 text-lg"
                onClick={() => handleDialerInput(btn)}
                disabled={callStatus !== "idle"}
              >
                {btn}
              </Button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="controls">
          {/* Call Controls */}
          <div className="flex flex-col space-y-4 mt-4">
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                className={`h-12 w-12 rounded-full ${
                  isMuted ? "bg-red-100" : ""
                }`}
                onClick={() => setIsMuted(!isMuted)}
                disabled={callStatus !== "connected"}
              >
                {isMuted ? (
                  <MicOff className="h-5 w-5" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="outline"
                size="icon"
                className={`h-12 w-12 rounded-full ${
                  isSpeakerOn ? "bg-blue-100" : ""
                }`}
                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                disabled={callStatus !== "connected"}
              >
                {isSpeakerOn ? (
                  <Volume2 className="h-5 w-5" />
                ) : (
                  <VolumeX className="h-5 w-5" />
                )}
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              {callStatus === "connected" && (
                <p>Call in progress - {formatDuration(callDuration)}</p>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Separator />

      {/* Call Action Button */}
      <div className="flex justify-center pt-2">
        {callStatus === "idle" || callStatus === "ended" ? (
          <Button
            className="h-16 w-16 rounded-full bg-green-500 hover:bg-green-600"
            onClick={handleMakeCall}
            disabled={!phoneNumber && !activeContact}
          >
            <Phone className="h-6 w-6" />
          </Button>
        ) : (
          <Button
            variant="destructive"
            className="h-16 w-16 rounded-full"
            onClick={handleEndCall}
          >
            <PhoneOff className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  );
}
