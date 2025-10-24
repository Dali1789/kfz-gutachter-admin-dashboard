/**
 * API Client für KFZ Booking API
 * Basis URL: https://gutachter-booking.up.railway.app
 */

import type {
  Appointment,
  SearchAppointmentsResponse,
  CreateAppointmentRequest,
  CreateAppointmentResponse,
  AvailabilityResponse,
  Customer,
  Case,
  Document,
} from '@/types/api'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://gutachter-booking.up.railway.app'

/**
 * Generischer API Request Handler
 */
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }))
      throw new Error(error.error || `HTTP ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error)
    throw error
  }
}

/**
 * Termine durchsuchen
 */
export async function searchAppointments(params?: {
  customerEmail?: string
  customerPhone?: string
  appointmentNumber?: string
  status?: string
  startDate?: string
  endDate?: string
}): Promise<SearchAppointmentsResponse> {
  const query = new URLSearchParams()

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) query.append(key, value)
    })
  }

  const endpoint = `/api/appointments/search${query.toString() ? `?${query}` : ''}`
  return apiRequest<SearchAppointmentsResponse>(endpoint)
}

/**
 * Verfügbarkeit prüfen
 */
export async function checkAvailability(
  startDate: string,
  endDate: string,
): Promise<AvailabilityResponse> {
  const query = new URLSearchParams({ startDate, endDate })
  return apiRequest<AvailabilityResponse>(`/api/availability/check?${query}`)
}

/**
 * Termin erstellen
 */
export async function createAppointment(
  data: CreateAppointmentRequest,
): Promise<CreateAppointmentResponse> {
  return apiRequest<CreateAppointmentResponse>('/api/appointments/create', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * Alle Termine abrufen (für Dashboard)
 */
export async function getAllAppointments(): Promise<Appointment[]> {
  const response = await searchAppointments()
  return response.appointments || []
}

/**
 * Heutige Termine
 */
export async function getTodayAppointments(): Promise<Appointment[]> {
  const today = new Date().toISOString().split('T')[0]
  const response = await searchAppointments({
    startDate: today,
    endDate: today,
  })
  return response.appointments || []
}

/**
 * API Health Check
 */
export async function checkApiHealth(): Promise<{ status: string; version: string }> {
  return apiRequest('/')
}

/**
 * Alle Kunden abrufen (über Server-Side API → PostgreSQL)
 */
export async function getAllCustomers(): Promise<Customer[]> {
  const response = await fetch('/api/customers')
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Fehler beim Laden der Kunden')
  }

  return data.customers || []
}

/**
 * Alle Fälle abrufen (über Server-Side API → PostgreSQL)
 */
export async function getAllCases(): Promise<Case[]> {
  const response = await fetch('/api/cases')
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Fehler beim Laden der Fälle')
  }

  return data.cases || []
}

/**
 * Alle Dokumente abrufen (über Server-Side API → PostgreSQL)
 */
export async function getAllDocuments(): Promise<Document[]> {
  const response = await fetch('/api/documents')
  const data = await response.json()

  if (!data.success) {
    throw new Error(data.error || 'Fehler beim Laden der Dokumente')
  }

  return data.documents || []
}
