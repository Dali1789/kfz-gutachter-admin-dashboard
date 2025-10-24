# 🎯 Admin Dashboard - Nächste Schritte

## ✅ Was bereits fertig ist:

1. ✅ **Projekt-Setup** (package.json, tsconfig, tailwind)
2. ✅ **TypeScript Types** (`src/types/api.ts`)
3. ✅ **Utility Functions** (`src/lib/utils.ts`, `src/lib/formatters.ts`)
4. ✅ **API Client** (`src/lib/api-client.ts`)

---

## 📋 Was noch fehlt:

### 1. **Global Styles** (`src/app/globals.css`)

### 2. **Root Layout** (`src/app/layout.tsx`)

### 3. **UI Components** (`src/components/shared/ui/`)

- button.tsx
- card.tsx
- badge.tsx
- table.tsx

### 4. **Layout Components** (`src/components/layout/`)

- sidebar.tsx
- header.tsx

### 5. **Pages** (`src/app/`)

- page.tsx (Dashboard)
- termine/page.tsx
- kunden/page.tsx

---

## 🚀 Quick Start

### Option 1: Ich erstelle die fehlenden Dateien (empfohlen)

Sage mir Bescheid und ich erstelle in der nächsten Session:

- Alle UI-Komponenten
- Layout mit Sidebar
- Dashboard-Seite
- Termine-Seite
- Kunden-Seite

**Zeitaufwand:** ~30 Minuten

### Option 2: Du verwendest ein Template

Ich empfehle:

- **shadcn/ui** Components: https://ui.shadcn.com
- Bereits Radix UI + Tailwind (passt perfekt!)
- Kopiere Components die du brauchst

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add table
```

### Option 3: Minimalistisch selbst bauen

Nutze die bereits vorhandenen Files als Basis:

1. `src/lib/api-client.ts` - API Calls
2. `src/types/api.ts` - TypeScript Types
3. `src/lib/formatters.ts` - Datum/Währung Formatierung

---

## 📝 Beispiel: Simple Dashboard Page

```tsx
// src/app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { getAllAppointments } from '@/lib/api-client'
import type { Appointment } from '@/types/api'

export default function DashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAllAppointments()
        setAppointments(data)
      } catch (error) {
        console.error('Error loading appointments:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <div>Lädt...</div>

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Termine gesamt</h3>
          <p className="text-3xl font-bold">{appointments.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Heute</h3>
          <p className="text-3xl font-bold">
            {appointments.filter(a =>
              a.scheduled_at.startsWith(new Date().toISOString().split('T')[0])
            ).length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm text-gray-500">Abgeschlossen</h3>
          <p className="text-3xl font-bold">
            {appointments.filter(a => a.status === 'completed').length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Aktuelle Termine</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Termin-Nr</th>
              <th className="text-left py-2">Datum</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Ort</th>
            </tr>
          </thead>
          <tbody>
            {appointments.slice(0, 5).map(apt => (
              <tr key={apt.id} className="border-b">
                <td className="py-2">{apt.appointment_number}</td>
                <td className="py-2">
                  {new Date(apt.scheduled_at).toLocaleDateString('de-DE')}
                </td>
                <td className="py-2">{apt.status}</td>
                <td className="py-2">{apt.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

---

## 🎨 Styling Basis

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --border: 214.3 31.8% 91.4%;
    --radius: 0.5rem;
  }
}
```

---

## 💡 Was möchtest du?

1. **Ich erstelle weiter** (in neuer Session wegen Token-Limit)
2. **Du nutzt shadcn/ui** und baust selbst
3. **Wir machen Pause** und ich gebe dir Zugang zu allen Files später

Sage mir Bescheid!
