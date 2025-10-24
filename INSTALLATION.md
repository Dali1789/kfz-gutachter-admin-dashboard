# KFZ-Gutachter Admin Dashboard - Installation & Setup

## Übersicht

Das Admin Dashboard ist ein Next.js 15 Frontend zur Verwaltung der KFZ-Gutachter Booking API. Es
zeigt alle Termine, Kunden, Fälle und Dokumente in einer übersichtlichen Oberfläche.

## Schnellstart (Lokal)

### 1. Dependencies installieren

```bash
cd "/home/dali/Projects in Development/kfz-gutachter-website/admin-dashboard"
npm install
```

### 2. Umgebungsvariablen konfigurieren

Die `.env.local` Datei ist bereits korrekt konfiguriert:

```env
NEXT_PUBLIC_API_URL=https://gutachter-booking.up.railway.app
```

### 3. Development Server starten

```bash
npm run dev
```

Dashboard ist verfügbar unter: **http://localhost:3000**

## Projekt-Struktur

```
admin-dashboard/
├── src/
│   ├── app/                          # Next.js 15 App Router
│   │   ├── (dashboard)/              # Dashboard Layout Group
│   │   │   ├── layout.tsx            # Dashboard Layout mit Sidebar
│   │   │   ├── page.tsx              # Dashboard Startseite (Statistiken)
│   │   │   ├── termine/page.tsx      # Termine-Liste
│   │   │   ├── kunden/page.tsx       # Kunden-Liste
│   │   │   ├── faelle/page.tsx       # Fälle-Liste
│   │   │   └── dokumente/page.tsx    # Dokumente-Liste
│   │   ├── layout.tsx                # Root Layout
│   │   └── globals.css               # Global Styles
│   ├── components/
│   │   ├── shared/ui/                # Radix UI Components
│   │   │   ├── button.tsx            # Button Component
│   │   │   ├── card.tsx              # Card Component
│   │   │   └── badge.tsx             # Badge Component
│   │   └── layout/
│   │       └── sidebar.tsx           # Sidebar Navigation
│   ├── lib/
│   │   ├── api-client.ts             # API Client Functions
│   │   ├── formatters.ts             # Date/Currency/Phone Formatters
│   │   └── utils.ts                  # Utility Functions (cn)
│   └── types/
│       └── api.ts                    # TypeScript Interfaces
├── public/                           # Static Assets
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript Config
├── next.config.ts                    # Next.js Config
├── tailwind.config.ts                # Tailwind Config
└── README.md                         # Projekt-Dokumentation
```

## Verfügbare Seiten

### 1. Dashboard (`/`)

- **Statistiken-Karten:**
  - Termine heute
  - Bevorstehende Termine
  - Abgeschlossene Termine
  - Kunden gesamt
- **Tabelle:** Letzte 5 Termine

### 2. Termine (`/termine`)

- **Funktionen:**
  - Alle Termine in Tabellenform
  - Suche nach Termin-Nr, Ort, Schadensart
  - Status-Badges (Geplant, Bestätigt, Abgeschlossen, etc.)
  - "Neuer Termin" Button
  - Details-Ansicht (geplant)

### 3. Kunden (`/kunden`)

- **Funktionen:**
  - Alle Kunden in Tabellenform
  - Suche nach Kunden-Nr, Name, E-Mail, Telefon
  - Klickbare E-Mail/Telefon-Links
  - "Neuer Kunde" Button
  - Details-Ansicht (geplant)

### 4. Fälle (`/faelle`)

- **Funktionen:**
  - Alle Fälle in Tabellenform
  - Suche nach Fall-Nr, Fahrzeug, Kennzeichen
  - Status-Filter (Offen, In Bearbeitung, Abgeschlossen, Storniert)
  - Schadenssummen-Anzeige
  - "Neuer Fall" Button
  - Details-Ansicht (geplant)

### 5. Dokumente (`/dokumente`)

- **Funktionen:**
  - Alle Dokumente in Tabellenform
  - Suche nach Dateiname/Beschreibung
  - Typ-Filter (Gutachten, Rechnung, Foto, Versicherung, Sonstige)
  - Dateigröße-Anzeige
  - Ansehen/Download-Buttons
  - "Dokument hochladen" Button (geplant)

## API Integration

Das Dashboard nutzt die KFZ Booking API unter: **https://gutachter-booking.up.railway.app**

### Verfügbare API Endpoints:

```typescript
// Appointments
GET /api/appointments              // Alle Termine
GET /api/appointments/:id          // Einzelner Termin
POST /api/appointments             // Termin erstellen
PUT /api/appointments/:id          // Termin aktualisieren
DELETE /api/appointments/:id       // Termin löschen
GET /api/appointments/search       // Termine suchen

// Customers
GET /api/customers                 // Alle Kunden
GET /api/customers/:id             // Einzelner Kunde
POST /api/customers                // Kunde erstellen
PUT /api/customers/:id             // Kunde aktualisieren

// Cases
GET /api/cases                     // Alle Fälle
GET /api/cases/:id                 // Einzelner Fall
POST /api/cases                    // Fall erstellen
PUT /api/cases/:id                 // Fall aktualisieren

// Documents
GET /api/documents                 // Alle Dokumente
GET /api/documents/:id             // Einzelnes Dokument
POST /api/documents                // Dokument hochladen
DELETE /api/documents/:id          // Dokument löschen

// Availability
GET /api/availability/check        // Verfügbare Zeitslots
```

## Tech Stack

- **Framework:** Next.js 15.3.2 (App Router)
- **React:** 19.1.0
- **TypeScript:** 5.7.3
- **UI Components:** Radix UI
- **Styling:** TailwindCSS 3.4.16
- **Icons:** Lucide React
- **Utilities:**
  - date-fns 4.1.0 (Datums-Formatierung)
  - class-variance-authority (Component Variants)
  - tailwind-merge + clsx (Conditional Classes)

## Deployment auf Railway

### Option A: Neues Railway Projekt

```bash
# Railway CLI installieren (falls noch nicht vorhanden)
npm install -g railway

# In Railway einloggen
railway login

# Neues Projekt erstellen und linken
railway init
railway link

# Umgebungsvariable setzen
railway variables set NEXT_PUBLIC_API_URL=https://gutachter-booking.up.railway.app

# Deployen
railway up
```

### Option B: Zu bestehendem Projekt hinzufügen

1. Railway Dashboard öffnen
2. Projekt "KFZ Gutachter Booking" öffnen
3. "New Service" klicken
4. "GitHub Repo" auswählen
5. Repository verbinden
6. Root Directory setzen: `admin-dashboard`
7. Umgebungsvariable hinzufügen:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://gutachter-booking.up.railway.app`
8. Deploy starten

### Wichtig für Railway Deployment:

Die `next.config.ts` ist bereits für Railway konfiguriert:

```typescript
const nextConfig: NextConfig = {
  output: 'standalone',  // Für Railway optimiert
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://gutachter-booking.up.railway.app',
  },
}
```

## Development

### Scripts

```bash
npm run dev          # Development Server (Port 3000)
npm run build        # Production Build
npm run start        # Production Server
npm run lint         # ESLint Check
```

### Code-Qualität

- **TypeScript:** Strict Mode aktiviert
- **ESLint:** Next.js Konfiguration
- **Prettier:** Formatierung (falls konfiguriert)

### Komponenten-Entwicklung

Alle UI Components folgen dem Radix UI + Tailwind Pattern:

```typescript
// Button Beispiel
<Button variant="default" size="lg">
  <Plus className="mr-2 h-4 w-4" />
  Neuer Termin
</Button>

// Badge Beispiel
<Badge variant="success">Bestätigt</Badge>

// Card Beispiel
<Card>
  <CardHeader>
    <CardTitle>Titel</CardTitle>
  </CardHeader>
  <CardContent>
    Inhalt
  </CardContent>
</Card>
```

## Fehlerbehebung

### Port bereits in Verwendung

```bash
# Prozess auf Port 3000 beenden
lsof -ti:3000 | xargs kill -9

# Oder anderen Port verwenden
PORT=3001 npm run dev
```

### API Connection Failed

1. Prüfen ob Booking API läuft: https://gutachter-booking.up.railway.app/api/appointments
2. `.env.local` auf korrekte URL prüfen
3. CORS-Einstellungen der API überprüfen

### TypeScript Errors

```bash
# Type-Check ohne Build
npx tsc --noEmit

# Cache löschen
rm -rf .next
npm run dev
```

## Nächste Schritte

### Geplante Features:

1. **Detail-Ansichten:**
   - Termin-Details mit Bearbeitung
   - Kunden-Details mit Historie
   - Fall-Details mit Dokumenten

2. **Formulare:**
   - Neuer Termin erstellen
   - Neuer Kunde erstellen
   - Neuer Fall erstellen
   - Dokument hochladen

3. **Erweiterte Funktionen:**
   - Kalender-Ansicht für Termine
   - PDF-Vorschau für Dokumente
   - Export-Funktionen (CSV, PDF)
   - Benachrichtigungen

4. **Authentifizierung:**
   - Login-System
   - Rollen-Verwaltung
   - Session-Management

## Support

Bei Fragen oder Problemen:

- **Dokumentation:** Siehe README.md
- **API Docs:** https://gutachter-booking.up.railway.app/api-docs (falls verfügbar)
- **Railway Projekt:** DS Sachverständigenbüro
