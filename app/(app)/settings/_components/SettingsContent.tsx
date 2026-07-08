"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function SettingsContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isIndex = pathname === "/settings";

  return (
    <div
      className={cn(
        "min-h-0 overflow-y-auto p-4 md:col-span-6 md:p-8",
        isIndex ? "hidden md:block" : "block",
      )}
    >
      <Link
        href="/settings"
        className="mb-4 flex items-center gap-1 text-sm text-muted-foreground md:hidden"
      >
        <ChevronLeft className="size-4" />
        Settings
      </Link>
      {children}
    </div>
  );
}
