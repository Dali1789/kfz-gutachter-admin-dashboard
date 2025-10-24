'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Calendar, Users, Briefcase, FileText } from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Termine', href: '/termine', icon: Calendar },
  { name: 'Kunden', href: '/kunden', icon: Users },
  { name: 'Fälle', href: '/faelle', icon: Briefcase },
  { name: 'Dokumente', href: '/dokumente', icon: FileText },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900">
      {/* Logo/Header */}
      <div className="flex h-16 items-center justify-center border-b border-gray-800 px-6">
        <h1 className="text-xl font-bold text-white">KFZ-Gutachter</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white',
              )}
            >
              <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-800 p-4">
        <div className="text-xs text-gray-400">
          <p>Version 1.0.0</p>
          <p className="mt-1">© 2025 DS Sachverständigenbüro</p>
        </div>
      </div>
    </div>
  )
}
