'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/ui/card'
import { Button } from '@/components/shared/ui/button'
import { Badge } from '@/components/shared/ui/badge'
import { getAllCustomers } from '@/lib/api-client'
import { formatDateTime, formatPhoneNumber } from '@/lib/formatters'
import type { Customer } from '@/types/api'
import { Plus, Search, Mail, Phone } from 'lucide-react'

export default function KundenPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAllCustomers()
        setCustomers(data)
      } catch (error) {
        console.error('Error loading customers:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.customer_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
          <h1 className="text-3xl font-bold text-gray-900">Kunden</h1>
          <p className="mt-2 text-gray-600">Verwalten Sie alle Kunden</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Neuer Kunde
        </Button>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Suche nach Kunden-Nummer, Name, E-Mail oder Telefon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Alle Kunden ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredCustomers.length === 0 ? (
            <p className="py-8 text-center text-gray-500">
              {searchTerm ? 'Keine Kunden gefunden' : 'Keine Kunden vorhanden'}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm font-medium text-gray-600">
                    <th className="pb-3">Kunden-Nr</th>
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Kontakt</th>
                    <th className="pb-3">Erstellt am</th>
                    <th className="pb-3">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-4 font-medium">{customer.customer_number}</td>
                      <td className="py-4 text-gray-900">{customer.name}</td>
                      <td className="py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="h-3 w-3" />
                            <a
                              href={`mailto:${customer.email}`}
                              className="hover:text-primary hover:underline"
                            >
                              {customer.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="h-3 w-3" />
                            <a
                              href={`tel:${customer.phone}`}
                              className="hover:text-primary hover:underline"
                            >
                              {formatPhoneNumber(customer.phone)}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-gray-600">{formatDateTime(customer.created_at)}</td>
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
