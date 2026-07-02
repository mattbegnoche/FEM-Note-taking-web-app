"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Lock, LogOut, Sun, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const sections = [
  { href: "/settings/color-theme", icon: Sun, label: "Color Theme" },
  { href: "/settings/font-theme", icon: Type, label: "Font Theme" },
  { href: "/settings/change-password", icon: Lock, label: "Change Password" },
];

function SettingsMenu() {
  const pathname = usePathname();

  return (
    <div className="col-span-3 flex flex-col gap-1 p-4 border-r">
      {sections.map(({ href, icon: Icon, label }) => {
        const isActive = pathname === href;
        return (
          <Button
            key={href}
            variant="ghost"
            asChild
            className={`h-auto w-full justify-between px-3 py-2 text-sm font-normal ${
              isActive
                ? "bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            <Link href={href}>
              <span className="flex items-center gap-3">
                <Icon className="size-4" />
                {label}
              </span>
              {isActive && <ChevronRight className="size-4" />}
            </Link>
          </Button>
        );
      })}

      <Separator className="my-2" />

      <Button
        variant="ghost"
        className="h-auto w-full justify-start px-3 py-2 text-sm font-normal text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      >
        <LogOut className="size-4" />
        Logout
      </Button>
    </div>
  );
}

export default SettingsMenu;
