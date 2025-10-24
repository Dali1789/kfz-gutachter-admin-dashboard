'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/ui/card'
import { Button } from '@/components/shared/ui/button'
import { Badge } from '@/components/shared/ui/badge'
import { getAllCases } from '@/lib/api-client'
import { formatDateTime, formatCurrency } from '@/lib/formatters'
import type { Case, CaseStatus } from '@/types/api'
import { Plus, Search } from 'lucide-react'

export default function FaellePage() {
  const [cases, setCases] = useState<Case[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<CaseStatus | 'all'>('all')

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAllCases()
        setCases(data)
      } catch (error) {
        console.error('Error loading cases:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.case_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.vehicle_make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.vehicle_model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.license_plate.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || c.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: CaseStatus) => {
    const variants: Record<CaseStatus, 'default' | 'success' | 'warning' | 'destructive'> = {
      open: 'warning',
      in_progress: 'default',
      completed: 'success',
      cancelled: 'destructive',
    }
    const labels: Record<CaseStatus, string> = {
      open: 'Offen',
      in_progress: 'In Bearbeitung',
      completed: 'Abgeschlossen',
      cancelled: 'Storniert',
    }
    return <Badge variant={variants[status]}>{labels[status]}</Badge>
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
          <h1 className="text-3xl font-bold text-gray-900">Fälle</h1>
          <p className="mt-2 text-gray-600">Verwalten Sie alle Schadensfälle</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Neuer Fall
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
                placeholder="Suche nach Fall-Nummer, Fahrzeug oder Kennzeichen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as CaseStatus | 'all')}
              className="rounded-md border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">Alle Status</option>
              <option value="open">Offen</option>
              <option value="in_progress">In Bearbeitung</option>
              <option value="completed">Abgeschlossen</option>
              <option value="cancelled">Storniert</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Cases Table */}
      <Card>
        <CardHeader>
          <CardTitle>Alle Fälle ({filteredCases.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredCases.length === 0 ? (
            <p className="py-8 text-center text-gray-500">
              {searchTerm || statusFilter !== 'all' ? 'Keine Fälle gefunden' : 'Keine Fälle vorhanden'}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm font-medium text-gray-600">
                    <th className="pb-3">Fall-Nr</th>
                    <th className="pb-3">Kunde</th>
                    <th className="pb-3">Fahrzeug</th>
                    <th className="pb-3">Kennzeichen</th>
                    <th className="pb-3">Schadensart</th>
                    <th className="pb-3">Schadenssumme</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Erstellt am</th>
                    <th className="pb-3">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCases.map((c) => (
                    <tr key={c.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-4 font-medium">{c.case_number}</td>
                      <td className="py-4">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">{c.customer_number || 'N/A'}</div>
                          {c.customer_email && (
                            <div className="text-gray-500">{c.customer_email}</div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 text-gray-900">
                        {c.vehicle_make} {c.vehicle_model}
                      </td>
                      <td className="py-4 font-mono text-sm text-gray-600">{c.license_plate}</td>
                      <td className="py-4 text-gray-600">{c.damage_type}</td>
                      <td className="py-4 text-gray-900">
                        {c.estimated_damage_cost ? formatCurrency(c.estimated_damage_cost) : '-'}
                      </td>
                      <td className="py-4">{getStatusBadge(c.status)}</td>
                      <td className="py-4 text-gray-600">{formatDateTime(c.created_at)}</td>
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
