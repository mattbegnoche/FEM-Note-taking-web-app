"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Archive, Tag } from "lucide-react";
import SidebarItem from "./SidebarItem";

const navItems = [
  { href: "/notes", icon: Home, label: "All Notes" },
  { href: "/notes/archived", icon: Archive, label: "Archived Notes" },
];

const tags = [
  "Cooking",
  "Dev",
  "Fitness",
  "Health",
  "Personal",
  "React",
  "Recipes",
  "Shopping",
  "Travel",
  "TypeScript",
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 h-svh border-r bg-background p-4 gap-4">
      <Link
        href="/notes"
        className="flex items-center gap-2 font-semibold text-lg"
      >
        Notes
      </Link>
      <nav className="flex flex-col gap-1">
        {navItems.map(({ href, icon, label }) => (
          <SidebarItem
            key={href}
            href={href}
            icon={icon}
            label={label}
            pathname={pathname}
          />
        ))}
      </nav>

      <hr />

      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase text-muted-foreground px-3 mb-1">
          Tags
        </p>
        {tags.map((tag) => {
          const href = `/notes/tags/${tag.toLowerCase()}`;
          return (
            <SidebarItem
              key={href}
              href={href}
              icon={Tag}
              label={tag}
              pathname={pathname}
            />
          );
        })}
      </div>
    </aside>
  );
}
