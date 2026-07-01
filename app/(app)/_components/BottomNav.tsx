'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Archive, Tag, Settings } from 'lucide-react'

const navItems = [
  { href: '/notes',          icon: Home,    label: 'Home'     },
  { href: '/search',         icon: Search,  label: 'Search'   },
  { href: '/notes/archived', icon: Archive, label: 'Archived' },
  { href: '/notes/tags',     icon: Tag,     label: 'Tags'     },
  { href: '/settings',       icon: Settings, label: 'Settings' },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around items-center h-16 border-t bg-background md:hidden">
      {navItems.map(({ href, icon: Icon, label }) => {
        const isActive = pathname === href

        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 text-xs ${
              isActive ? 'text-primary' : 'text-muted-foreground'
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
