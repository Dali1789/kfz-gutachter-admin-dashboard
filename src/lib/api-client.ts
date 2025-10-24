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
 * Alle Kunden abrufen
 */
export async function getAllCustomers(): Promise<Customer[]> {
  return apiRequest<Customer[]>('/api/customers')
}

/**
 * Alle Fälle abrufen
 */
export async function getAllCases(): Promise<Case[]> {
  return apiRequest<Case[]>('/api/cases')
}

/**
 * Alle Dokumente abrufen
 */
export async function getAllDocuments(): Promise<Document[]> {
  return apiRequest<Document[]>('/api/documents')
}
