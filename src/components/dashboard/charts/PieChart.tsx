"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

const chartData = [
  { request: "tratoDirecto", create: 75, fill: "#ff0000" }, // Rojo
  { request: "compraAgil", create: 20, fill: "#00ff00" }, // Verde
  { request: "convenioMarco", create: 7, fill: "#0000ff" }, // Azul
  { request: "licitacionPublica", create: 17, fill: "#ffff00" }, // Amarillo
];

const chartConfig = {
  requests: {
    label: "Requests",
  },
  tratoDirecto: {
    label: "Trato directo",
    color: "hsl(var(--chart-1))",
  },
  compraAgil: {
    label: "Compra agil",
    color: "hsl(var(--chart-2))",
  },
  convenioMarco: {
    label: "Convenio marco",
    color: "hsl(var(--chart-3))",
  },
  licitacionPublica: {
    label: "licitación pública",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;


export function PieChartGrid() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.create, 0);
  }, []);

  console.log(totalVisitors);
  

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Solidictudes</CardTitle>
        <CardDescription>Octubre - Diciembre 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="create"
              nameKey="request"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Requests
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
