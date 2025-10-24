/**
 * TypeScript Types für KFZ Booking API
 */

// Customer Types
export interface Customer {
  id: number
  customer_number: string
  name: string
  email: string
  phone: string
  case_count: number
  created_at: string
  updated_at: string
}

// Vehicle Types
export interface Vehicle {
  id: number
  customer_id: number
  make_model: string
  license_plate: string
  year: number
  mileage: number
  vin: string
  created_at: string
}

// Case Types
export type CaseType =
  | 'Unfallgutachten (Haftpflicht)'
  | 'Unfallgutachten (Kasko)'
  | 'Wertgutachten'
  | 'Leasingrückgabe'
  | 'Beweissicherung'
  | 'Sonstiges'

export type CaseStatus =
  | 'offen'
  | 'in_bearbeitung'
  | 'gutachten_erstellt'
  | 'versendet'
  | 'abgeschlossen'
  | 'storniert'

export interface Case {
  id: number
  case_number: string
  customer_id: number
  vehicle_id: number
  vehicle_make: string
  vehicle_model: string
  license_plate: string
  accident_date: string
  accident_location: string
  case_type: CaseType
  damage_type: string
  damage_description: string
  insurance_company?: string
  insurance_number?: string
  estimated_cost?: number
  estimated_damage_cost?: number
  status: CaseStatus
  customer_number?: string
  customer_email?: string
  customer_phone?: string
  created_at: string
  updated_at: string
}

// Appointment Types
export type AppointmentStatus =
  | 'scheduled'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'no_show'

export type DamageType =
  | 'Unfallschaden'
  | 'Leasingrückgabe'
  | 'Fahrzeugbewertung'
  | 'Beweissicherung'
  | 'Sonstiges'

export interface Appointment {
  id: number
  appointment_number: string
  customer_id: number
  case_id: number
  scheduled_at: string
  end_at: string
  location: string
  location_type: 'vor_ort' | 'werkstatt' | 'buero'
  status: AppointmentStatus
  damage_type: DamageType
  notes?: string
  google_calendar_event_id?: string
  created_at: string
  updated_at: string
}

// Document Types
export type DocumentType =
  | 'schadenfotos'
  | 'fahrzeugschein'
  | 'unfallbericht'
  | 'gutachten'
  | 'kostenvoranschlag'
  | 'sonstiges'

export interface Document {
  id: number
  document_id: string
  case_id: number
  document_type: DocumentType
  file_name: string
  file_path: string
  file_size: number
  mime_type: string
  description?: string
  uploaded_at: string
}

// Availability Types
export interface TimeSlot {
  start: string
  end: string
  available: boolean
}

export interface DayAvailability {
  date: string
  slots: TimeSlot[]
}

export interface AvailabilityResponse {
  success: boolean
  period: {
    startDate: string
    endDate: string
  }
  availableSlots: DayAvailability[]
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface SearchAppointmentsResponse {
  success: boolean
  count: number
  appointments: Appointment[]
}

export interface CreateAppointmentRequest {
  customerName: string
  customerEmail: string
  customerPhone: string
  scheduledAt: string
  endAt: string
  location: string
  damageType: string
}

export interface CreateAppointmentResponse {
  success: boolean
  appointment?: Appointment
  appointmentNumber?: string
  googleCalendarEventId?: string
}

// Statistics Types
export interface DashboardStats {
  totalAppointments: number
  todayAppointments: number
  upcomingAppointments: number
  completedAppointments: number
  totalCustomers: number
  openCases: number
  averageResponseTime?: string
}
