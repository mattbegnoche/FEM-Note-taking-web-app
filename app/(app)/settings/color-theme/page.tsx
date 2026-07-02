"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const options = [
  {
    value: "light",
    icon: Sun,
    title: "Light Mode",
    description: "Pick a clean and classic light theme",
  },
  {
    value: "dark",
    icon: Moon,
    title: "Dark Mode",
    description: "Select a sleek and modern dark theme",
  },
  {
    value: "system",
    icon: Monitor,
    title: "System",
    description: "Adapts to your device's theme",
  },
];

export default function ColorThemePage() {
  const { theme, setTheme } = useTheme();
  const [selected, setSelected] = useState(theme ?? "system");

  return (
    <div className="col-span-9 flex flex-col p-6">
      <h1 className="text-xl font-bold text-foreground">Color Theme</h1>
      <p className="mb-4 text-sm text-muted-foreground">
        Choose your color theme:
      </p>

      <RadioGroup value={selected} onValueChange={setSelected}>
        {options.map(({ value, icon: Icon, title, description }) => (
          <Label
            key={value}
            htmlFor={value}
            className="flex cursor-pointer items-center gap-4 rounded-lg border p-4 has-data-[state=checked]:border-ring has-data-[state=checked]:bg-muted"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Icon className="size-5 text-foreground" />
            </span>
            <span className="flex flex-1 flex-col gap-0.5">
              <span className="text-sm font-medium text-foreground">
                {title}
              </span>
              <span className="text-sm font-normal text-muted-foreground">
                {description}
              </span>
            </span>
            <RadioGroupItem value={value} id={value} />
          </Label>
        ))}
      </RadioGroup>

      <Button
        className="mt-6 w-fit self-end"
        onClick={() => setTheme(selected)}
      >
        Apply Changes
      </Button>
    </div>
  );
}

/*"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const options = [
  {
    value: "light",
    icon: Sun,
    title: "Light Mode",
    description: "Pick a clean and classic light theme",
  },
  {
    value: "dark",
    icon: Moon,
    title: "Dark Mode",
    description: "Select a sleek and modern dark theme",
  },
  {
    value: "system",
    icon: Monitor,
    title: "System",
    description: "Adapts to your device's theme",
  },
];

export default function ColorThemePage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState("system");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) setSelected(theme ?? "system");
  }, [mounted, theme]);

  if (!mounted) {
    return <div className="col-span-9 p-6" />;
  }

  return (
    <div className="col-span-9 flex flex-col p-6">
      <h1 className="text-xl font-bold text-foreground">Color Theme</h1>
      <p className="mb-4 text-sm text-muted-foreground">
        Choose your color theme:
      </p>

      <RadioGroup value={selected} onValueChange={setSelected}>
        {options.map(({ value, icon: Icon, title, description }) => (
          <Label
            key={value}
            htmlFor={value}
            className="flex cursor-pointer items-center gap-4 rounded-lg border p-4 has-data-[state=checked]:border-ring has-data-[state=checked]:bg-muted"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Icon className="size-5 text-foreground" />
            </span>
            <span className="flex flex-1 flex-col gap-0.5">
              <span className="text-sm font-medium text-foreground">
                {title}
              </span>
              <span className="text-sm font-normal text-muted-foreground">
                {description}
              </span>
            </span>
            <RadioGroupItem value={value} id={value} />
          </Label>
        ))}
      </RadioGroup>

      <Button
        className="mt-6 w-fit self-end"
        onClick={() => setTheme(selected)}
      >
        Apply Changes
      </Button>
    </div>
  );
} */
