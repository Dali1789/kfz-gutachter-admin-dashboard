import { format, formatDistance, parseISO } from 'date-fns'
import { de } from 'date-fns/locale'

/**
 * Formatiert ISO-Datum zu lesbarem Format
 */
export function formatDate(dateString: string, formatStr: string = 'dd.MM.yyyy'): string {
  try {
    return format(parseISO(dateString), formatStr, { locale: de })
  } catch {
    return dateString
  }
}

/**
 * Formatiert ISO-Datum + Zeit
 */
export function formatDateTime(dateString: string): string {
  try {
    return format(parseISO(dateString), 'dd.MM.yyyy HH:mm', { locale: de }) + ' Uhr'
  } catch {
    return dateString
  }
}

/**
 * Relative Zeit (vor 2 Stunden, vor 3 Tagen)
 */
export function formatRelativeTime(dateString: string): string {
  try {
    return formatDistance(parseISO(dateString), new Date(), {
      addSuffix: true,
      locale: de,
    })
  } catch {
    return dateString
  }
}

/**
 * Formatiert Währung (Euro)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

/**
 * Formatiert Telefonnummer
 */
export function formatPhone(phone: string): string {
  // Entferne alle nicht-numerischen Zeichen
  const cleaned = phone.replace(/\D/g, '')

  // Deutsche Mobilnummern: +49 123 456789
  if (cleaned.startsWith('49') && cleaned.length >= 11) {
    return `+49 ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`
  }

  // Lokale Nummern: 0521 123456
  if (cleaned.startsWith('0') && cleaned.length >= 7) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`
  }

  return phone
}

/**
 * Alias für formatPhone
 */
export function formatPhoneNumber(phone: string): string {
  return formatPhone(phone)
}

/**
 * Formatiert Kundennummer (z.B. K-2025-001)
 */
export function formatCustomerNumber(number: string): string {
  return number.toUpperCase()
}

/**
 * Formatiert Termin-Nummer (z.B. T-2025-001)
 */
export function formatAppointmentNumber(number: string): string {
  return number.toUpperCase()
}
