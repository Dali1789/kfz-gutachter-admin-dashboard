'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/ui/card'
import { Button } from '@/components/shared/ui/button'
import { Badge } from '@/components/shared/ui/badge'
import { getAllAppointments } from '@/lib/api-client'
import { formatDateTime, formatAppointmentNumber } from '@/lib/formatters'
import type { Appointment } from '@/types/api'
import { Plus, Search } from 'lucide-react'

export default function TerminePage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

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

  const filteredAppointments = appointments.filter(
    (apt) =>
      apt.appointment_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.damage_type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'success' | 'warning' | 'destructive'> = {
      scheduled: 'default',
      confirmed: 'success',
      completed: 'success',
      cancelled: 'destructive',
      in_progress: 'warning',
      no_show: 'destructive',
    }
    const labels: Record<string, string> = {
      scheduled: 'Geplant',
      confirmed: 'Bestätigt',
      completed: 'Abgeschlossen',
      cancelled: 'Storniert',
      in_progress: 'In Bearbeitung',
      no_show: 'Nicht erschienen',
    }
    return <Badge variant={variants[status] || 'default'}>{labels[status] || status}</Badge>
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg text-gray-500">Lädt...</div>
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Termine</h1>
          <p className="mt-2 text-gray-600">Verwalten Sie alle Termine</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Neuer Termin
        </Button>
      </div>

      {/* Search & Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Suche nach Termin-Nummer, Ort oder Schadensart..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Alle Termine ({filteredAppointments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredAppointments.length === 0 ? (
            <p className="py-8 text-center text-gray-500">
              {searchTerm ? 'Keine Termine gefunden' : 'Keine Termine vorhanden'}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm font-medium text-gray-600">
                    <th className="pb-3">Termin-Nr</th>
                    <th className="pb-3">Datum & Zeit</th>
                    <th className="pb-3">Ort</th>
                    <th className="pb-3">Schadensart</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((apt) => (
                    <tr key={apt.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-4 font-medium">
                        {formatAppointmentNumber(apt.appointment_number)}
                      </td>
                      <td className="py-4 text-gray-600">{formatDateTime(apt.scheduled_at)}</td>
                      <td className="py-4 text-gray-600">{apt.location}</td>
                      <td className="py-4 text-gray-600">{apt.damage_type}</td>
                      <td className="py-4">{getStatusBadge(apt.status)}</td>
                      <td className="py-4">
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
