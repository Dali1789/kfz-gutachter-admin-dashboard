'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/ui/card'
import { Button } from '@/components/shared/ui/button'
import { Badge } from '@/components/shared/ui/badge'
import { getAllDocuments } from '@/lib/api-client'
import { formatDateTime } from '@/lib/formatters'
import type { Document, DocumentType } from '@/types/api'
import { Plus, Search, FileText, Download, Eye } from 'lucide-react'

export default function DokumentePage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<DocumentType | 'all'>('all')

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAllDocuments()
        setDocuments(data)
      } catch (error) {
        console.error('Error loading documents:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.description && doc.description.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesType = typeFilter === 'all' || doc.document_type === typeFilter

    return matchesSearch && matchesType
  })

  const getTypeBadge = (type: DocumentType) => {
    const variants: Record<DocumentType, 'default' | 'success' | 'warning' | 'secondary'> = {
      gutachten: 'success',
      rechnung: 'warning',
      foto: 'secondary',
      versicherung: 'default',
      sonstige: 'default',
    }
    const labels: Record<DocumentType, string> = {
      gutachten: 'Gutachten',
      rechnung: 'Rechnung',
      foto: 'Foto',
      versicherung: 'Versicherung',
      sonstige: 'Sonstige',
    }
    return <Badge variant={variants[type]}>{labels[type]}</Badge>
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
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
          <h1 className="text-3xl font-bold text-gray-900">Dokumente</h1>
          <p className="mt-2 text-gray-600">Verwalten Sie alle Dokumente</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Dokument hochladen
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
                placeholder="Suche nach Dateiname oder Beschreibung..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as DocumentType | 'all')}
              className="rounded-md border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="all">Alle Typen</option>
              <option value="gutachten">Gutachten</option>
              <option value="rechnung">Rechnung</option>
              <option value="foto">Foto</option>
              <option value="versicherung">Versicherung</option>
              <option value="sonstige">Sonstige</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Alle Dokumente ({filteredDocuments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredDocuments.length === 0 ? (
            <p className="py-8 text-center text-gray-500">
              {searchTerm || typeFilter !== 'all'
                ? 'Keine Dokumente gefunden'
                : 'Keine Dokumente vorhanden'}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm font-medium text-gray-600">
                    <th className="pb-3">Dateiname</th>
                    <th className="pb-3">Typ</th>
                    <th className="pb-3">Beschreibung</th>
                    <th className="pb-3">Größe</th>
                    <th className="pb-3">Hochgeladen am</th>
                    <th className="pb-3">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocuments.map((doc) => (
                    <tr key={doc.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-gray-900">{doc.filename}</span>
                        </div>
                      </td>
                      <td className="py-4">{getTypeBadge(doc.document_type)}</td>
                      <td className="py-4 text-gray-600">
                        {doc.description || <span className="italic text-gray-400">Keine Beschreibung</span>}
                      </td>
                      <td className="py-4 text-gray-600">{formatFileSize(doc.file_size)}</td>
                      <td className="py-4 text-gray-600">{formatDateTime(doc.uploaded_at)}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="mr-1 h-3 w-3" />
                            Ansehen
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="mr-1 h-3 w-3" />
                            Download
                          </Button>
                        </div>
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
