"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BsCashCoin } from "react-icons/bs";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

import { Indicators } from "@/interfaces/money";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FaChartLine } from "react-icons/fa";


export default function EconomicIndicators({ indicators }: { indicators: Indicators[] }) {

  return (
    <>
      <Accordion
        type="single"
        className="w-full mb-2"
        defaultValue="item-1"
        collapsible
      >
        <AccordionItem value="item-1" className="w-full">
          <AccordionTrigger className="flex">
            <div className="flex justify-center items-center gap-2">
              Indicadores económicos <FaChartLine size={20} />
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <TooltipProvider>
              <Card className="bg-card/50 backdrop-blur border mb-6">
                <CardContent className="p-2">
                  <div className="flex justify-between md:justify-around">
                    {indicators.map((indicator, index) => (
                      <div key={index} className="flex gap-2">
                        <IndicatorCard
                          title={indicator.cod}
                          icon={<BsCashCoin className="h-4 w-4" />}
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
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
    <div className="flex justify-center items-center gap-2">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-md md:text-xl font-bold tabular-nums">
          {format}
          {value.toLocaleString("es-CL")}
        </span>
      </div>
    </div>
  );
}
