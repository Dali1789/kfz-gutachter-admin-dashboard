# KFZ-Gutachter Admin Dashboard

Modernes Admin-Dashboard für die Verwaltung von Terminen, Kunden und Schadensfällen.

## 🚀 Features

✅ **Dashboard-Übersicht**

- Aktuelle Termine heute
- Statistiken (Kunden, Fälle, Termine)
- Schnellzugriff auf wichtige Funktionen

✅ **Termin-Verwaltung**

- Alle Termine anzeigen, filtern, suchen
- Termine erstellen, bearbeiten, stornieren
- Kalender-Ansicht mit verfügbaren Slots
- Google Calendar Integration Status

✅ **Kunden-Verwaltung**

- Kundenliste mit Suche
- Kundenprofil mit Termin-Historie
- Kontaktdaten verwalten

✅ **Fälle-Verwaltung**

- Schadensfälle übersichtlich
- Status-Tracking
- Dokumente pro Fall

✅ **Moderne UI**

- Responsive Design (Mobile, Tablet, Desktop)
- Dark/Light Mode
- Radix UI Components + TailwindCSS
- Framer Motion Animationen

---

## 📋 Installation

### 1. Dependencies installieren

```bash
cd "/home/dali/Projects in Development/kfz-gutachter-website/admin-dashboard"
npm install
```

### 2. Environment Variables

Erstelle `.env.local` (bereits vorhanden):

```env
NEXT_PUBLIC_API_URL=https://gutachter-booking.up.railway.app
```

### 3. Development Server starten

```bash
npm run dev
```

Dashboard läuft auf: http://localhost:3000

---

## 🏗️ Projekt-Struktur

```
admin-dashboard/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── (dashboard)/       # Dashboard Layout Group
│   │   │   ├── page.tsx       # Dashboard Hauptseite
│   │   │   ├── termine/       # Termine-Verwaltung
│   │   │   ├── kunden/        # Kunden-Verwaltung
│   │   │   └── faelle/        # Fälle-Verwaltung
│   │   ├── layout.tsx         # Root Layout
│   │   └── globals.css        # Global Styles
│   │
│   ├── components/
│   │   ├── shared/ui/         # Wiederverwendbare UI-Komponenten
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── table.tsx
│   │   │   └── ...
│   │   ├── layout/            # Layout-Komponenten
│   │   │   ├── sidebar.tsx
│   │   │   ├── header.tsx
│   │   │   └── ...
│   │   ├── dashboard/         # Dashboard-spezifische Komponenten
│   │   ├── appointments/      # Termin-Komponenten
│   │   ├── customers/         # Kunden-Komponenten
│   │   └── cases/             # Fälle-Komponenten
│   │
│   ├── lib/
│   │   ├── api-client.ts      # API Client für Booking API
│   │   ├── utils.ts           # Utility-Funktionen (cn, etc.)
│   │   └── formatters.ts      # Datum/Währung Formatierung
│   │
│   ├── types/
│   │   └── api.ts             # TypeScript API Types
│   │
│   └── config/
│       └── constants.ts       # App-Konstanten
│
├── public/                     # Static Assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

---

## 🎨 Tech Stack

- **Framework:** Next.js 15.3.2 (App Router)
- **React:** 19.1.0
- **TypeScript:** 5.7.3
- **Styling:** TailwindCSS 3.4.16
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **Animation:** Framer Motion
- **Date Handling:** date-fns

---

## 📱 Seiten-Übersicht

### Dashboard (`/`)

- Übersicht heute
- Statistiken (Karten)
- Schnellaktionen

### Termine (`/termine`)

- Terminliste (Tabelle)
- Filter: Status, Datum, Kunde
- Kalender-Ansicht
- Termin erstellen/bearbeiten

### Kunden (`/kunden`)

- Kundenliste
- Suchfunktion
- Kundenprofil
- Termin-Historie

### Fälle (`/faelle`)

- Schadensfälle-Liste
- Status-Filter
- Fall-Details
- Dokumente verwalten

---

## 🚀 Deployment (Railway)

### 1. GitHub Repository erstellen

```bash
git init
git add .
git commit -m "Initial commit: KFZ Gutachter Admin Dashboard"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Railway Service erstellen

1. Gehe zu Railway Dashboard
2. "New Project" → "Deploy from GitHub repo"
3. Wähle Repository: `admin-dashboard`
4. Railway erkennt automatisch Next.js
5. Environment Variables setzen:
   - `NEXT_PUBLIC_API_URL=https://gutachter-booking.up.railway.app`

### 3. Domain konfigurieren

Railway generiert automatisch eine Domain:

- `kfz-gutachter-admin.up.railway.app`

Oder custom Domain:

- `admin.kfz-gutachter-bi.de`

---

## 📝 Development

### Scripts

```bash
npm run dev          # Development Server (Port 3000)
npm run build        # Production Build
npm run start        # Production Server
npm run lint         # ESLint
npm run format       # Prettier
npm run type-check   # TypeScript Check
```

### Code Quality

- **ESLint:** Automatisches Linting
- **Prettier:** Code Formatting
- **TypeScript:** Type Safety
- **Git Hooks:** Pre-commit Checks (optional mit Husky)

---

## 🔐 API Endpoints

Alle Requests gehen an: `https://gutachter-booking.up.railway.app`

### Termine

- `GET /api/appointments/search` - Termine suchen
- `POST /api/appointments/create` - Termin erstellen
- `GET /api/availability/check` - Verfügbarkeit prüfen

### Kunden

- Werden automatisch bei Termin-Erstellung angelegt

### Fälle

- `POST /api/cases/create` - Fall erstellen
- `GET /api/cases/status` - Fall-Status abrufen

### Dokumente

- `POST /api/documents/upload` - Dokument hochladen

---

## 🎯 Nächste Schritte

### Must-Have Features (bereits geplant):

1. ✅ Dashboard Übersicht
2. ✅ Termin-Verwaltung
3. ✅ Kunden-Verwaltung
4. ✅ Fälle-Verwaltung
5. ✅ Kalender-Ansicht

### Nice-to-Have (später):

- [ ] Dokumenten-Upload UI
- [ ] PDF Gutachten Generator
- [ ] E-Mail Benachrichtigungen
- [ ] Push Notifications
- [ ] Export zu Excel/PDF
- [ ] Statistiken/Charts
- [ ] Multi-User Support (Login)

---

## 👨‍💻 Entwickler

Erstellt für: **DS Sachverständigenbüro Bielefeld** API: https://gutachter-booking.up.railway.app
Version: 1.0.0 Datum: 2025-10-24

---

## 📄 Lizenz

Private - Nur für DS Sachverständigenbüro
