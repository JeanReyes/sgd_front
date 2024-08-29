"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

interface CustomProps extends React.ComponentProps<typeof Sonner> {
  styles?: string;
}

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: CustomProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as CustomProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster }
