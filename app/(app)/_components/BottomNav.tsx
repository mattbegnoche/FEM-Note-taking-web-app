'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Archive, Tag, Settings } from 'lucide-react'

const navItems = [
  { href: '/notes',          icon: Home,    label: 'Home'     },
  { href: '/notes/search',   icon: Search,  label: 'Search'   },
  { href: '/notes/archived', icon: Archive, label: 'Archived' },
  { href: '/notes/tags',     icon: Tag,     label: 'Tags'     },
  { href: '/settings',       icon: Settings, label: 'Settings' },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around items-center h-16 border-t bg-background md:hidden">
      {navItems.map(({ href, icon: Icon, label }) => {
        // "/notes" is a prefix of every other route, so it only matches
        // exactly; the rest highlight on their whole subtree.
        const isActive =
          href === '/notes' ? pathname === '/notes' : pathname.startsWith(href)

        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 rounded-xl px-6 py-2.5 text-xs transition-colors ${
              isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="hidden sm:block">{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
