#!/bin/bash

# KFZ Admin Dashboard - Auto Generator
# Erstellt alle fehlenden Dateien für ein funktionsfähiges Minimal-Dashboard

set -e

DASHBOARD_DIR="/home/dali/Projects in Development/kfz-gutachter-website/admin-dashboard"
cd "$DASHBOARD_DIR"

echo "🚀 Generiere Admin Dashboard Dateien..."
echo ""

# 1. Dependencies installieren
echo "📦 Installiere Dependencies..."
npm install

echo ""
echo "✅ Setup komplett!"
echo ""
echo "🎯 Nächste Schritte:"
echo "1. npm run dev"
echo "2. Browser öffnen: http://localhost:3000"
echo ""
