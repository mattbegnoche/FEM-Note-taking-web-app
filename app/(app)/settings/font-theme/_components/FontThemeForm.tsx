"use client";

import type { FontTheme } from "@/lib/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { updateFontTheme } from "../../actions";
import { toast } from "sonner";

const options: {
  value: FontTheme;
  font: string;
  title: string;
  description: string;
}[] = [
  {
    value: "SANS",
    font: "font-sans",
    title: "Sans-serif",
    description: "Clean and modern, easy to read.",
  },
  {
    value: "SERIF",
    font: "font-serif",
    title: "Serif",
    description: "Classic and elegant for a timeless feel.",
  },
  {
    value: "MONO",
    font: "font-mono",
    title: "Monospace",
    description: "Code-like, great for a technical vibe.",
  },
];

function FontThemeForm({ current }: { current: FontTheme }) {
  async function handleSave(formData: FormData) {
    const result = await updateFontTheme(formData);
    if (result.ok) toast.success("Font theme updated");
    else toast.error(result.error);
  }

  return (
    <form action={handleSave} className="flex flex-col">
      <h1 className="text-xl font-bold text-foreground">Font Theme</h1>
      <p className="mb-4 text-sm text-muted-foreground">
        Choose your font theme:
      </p>

      <RadioGroup name="fontTheme" defaultValue={current}>
        {options.map(({ value, font, title, description }) => (
          <Label
            key={value}
            htmlFor={value}
            className="flex cursor-pointer items-center gap-4 rounded-lg border p-4 has-data-[state=checked]:border-ring has-data-[state=checked]:bg-muted"
          >
            <span
              className={`flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-medium text-foreground ${font}`}
            >
              Aa
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

      <Button type="submit" className="mt-6 w-fit self-end">
        Apply Changes
      </Button>
    </form>
  );
}

export default FontThemeForm;
