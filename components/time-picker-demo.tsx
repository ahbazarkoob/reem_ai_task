"use client"

import * as React from "react"
import { Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface TimePickerDemoProps {
  disabled?: boolean
  defaultValue?: string
}

export function TimePickerDemo({ disabled = false, defaultValue = "12:00" }: TimePickerDemoProps) {
  const [time, setTime] = React.useState<string>(defaultValue)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value)
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="grid gap-1.5">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          <Input
            type="time"
            value={time}
            onChange={handleChange}
            className={cn("w-[120px]", disabled && "opacity-50 cursor-not-allowed")}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  )
}
