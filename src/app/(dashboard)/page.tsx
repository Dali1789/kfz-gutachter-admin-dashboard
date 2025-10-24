'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/ui/card'
import { Badge } from '@/components/shared/ui/badge'
import { getAllAppointments } from '@/lib/api-client'
import { formatDateTime } from '@/lib/formatters'
import type { Appointment } from '@/types/api'
import { Calendar, Users, CheckCircle, Clock } from 'lucide-react'

export default function DashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAllAppointments()
        setAppointments(data)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg text-gray-500">Lädt...</div>
      </div>
    )
  }

  const today = new Date().toISOString().split('T')[0]
  const todayAppointments = appointments.filter((a) => a.scheduled_at.startsWith(today))
  const completedAppointments = appointments.filter((a) => a.status === 'completed')
  const upcomingAppointments = appointments.filter(
    (a) => a.status === 'scheduled' || a.status === 'confirmed',
  )

  const stats = [
    {
      title: 'Termine heute',
      value: todayAppointments.length,
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Bevorstehend',
      value: upcomingAppointments.length,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Abgeschlossen',
      value: completedAppointments.length,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Kunden gesamt',
      value: new Set(appointments.map((a) => a.customer_id)).size,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ]

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'success' | 'warning' | 'destructive'> = {
      scheduled: 'default',
      confirmed: 'success',
      completed: 'success',
      cancelled: 'destructive',
      in_progress: 'warning',
    }
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Übersicht Ihrer Termine und Kunden</p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`rounded-full p-3 ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Aktuelle Termine</CardTitle>
        </CardHeader>
        <CardContent>
          {appointments.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Keine Termine vorhanden</p>
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
                  </tr>
                </thead>
                <tbody>
                  {appointments.slice(0, 5).map((apt) => (
                    <tr key={apt.id} className="border-b last:border-0">
                      <td className="py-4 font-medium">{apt.appointment_number}</td>
                      <td className="py-4 text-gray-600">{formatDateTime(apt.scheduled_at)}</td>
                      <td className="py-4 text-gray-600">{apt.location}</td>
                      <td className="py-4 text-gray-600">{apt.damage_type}</td>
                      <td className="py-4">{getStatusBadge(apt.status)}</td>
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
