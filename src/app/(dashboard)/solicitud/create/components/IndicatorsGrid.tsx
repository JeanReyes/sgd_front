"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  DollarSign,
  Timer,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Indicators } from "@/interfaces/money";


export default function EconomicIndicators({ indicators }: { indicators: Indicators[] }) {

  return (
    <TooltipProvider>
      <Card className="bg-card/50 backdrop-blur border-none mb-6">
        <CardContent className="p-4">
          <div className="flex justify-between md:justify-around">
            {indicators.map((indicator, index) => (
              <div key={index} className="flex gap-2">
                <IndicatorCard
                  title={indicator.cod}
                  icon={<Timer className="h-4 w-4" />}
                  value={Number(indicator.value)}
                  // trend={indicators.utm.trend}
                  // change={indicators.utm.change}
                  format="$"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}

function IndicatorCard({
  title,
  icon,
  value,
  trend,
  change,
  format,
}: {
  title: string;
  icon: React.ReactNode;
  value: number;
  trend?: "up" | "down" | "neutral";
  change?: number;
  format: string;
}) {
  const trendIcon = {
    up: <TrendingUp className="h-3 w-3 text-green-500" />,
    down: <TrendingDown className="h-3 w-3 text-red-500" />,
    neutral: <Minus className="h-3 w-3 text-muted-foreground" />,
  };

  const trendColor = {
    up: "bg-green-500/10 text-green-500",
    down: "bg-red-500/10 text-red-500",
    neutral: "bg-muted text-muted-foreground",
  };

  return (
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-md md:text-2xl font-bold tabular-nums">
          {format}
          {value.toLocaleString("es-CL")}
        </span>
        {/* <Tooltip>
          <TooltipTrigger>
            <Badge
              variant="secondary"
              className={cn("ml-2", trendColor[trend])}
            >
              <span className="flex items-center gap-1">
                {trendIcon[trend]}
                {change}%
              </span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Variación últimas 24 horas</p>
          </TooltipContent>
        </Tooltip> */}
      </div>
    </div>
  );
}
