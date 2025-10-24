import { NextResponse } from 'next/server'
import { Client } from 'pg'

const DB_URL =
  'postgresql://postgres:eB16gFb6Eg5fDc1A4gG2fc2c214fBb64@yamanote.proxy.rlwy.net:57044/flowise'

export async function GET() {
  const client = new Client({ connectionString: DB_URL })

  try {
    await client.connect()

    const result = await client.query(`
      SELECT
        c.id,
        c.case_number,
        c.customer_id,
        c.vehicle_id,
        c.accident_date,
        c.accident_location,
        c.case_type,
        c.damage_description,
        c.insurance_company,
        c.insurance_number,
        c.estimated_cost,
        c.status,
        c.created_at,
        c.updated_at,
        v.make_model,
        v.license_plate
      FROM cases c
      LEFT JOIN vehicles v ON c.vehicle_id = v.id
      ORDER BY c.created_at DESC
    `)

    // Transform to match frontend expectations
    const cases = result.rows.map((row) => ({
      id: row.id,
      case_number: row.case_number,
      customer_id: row.customer_id,
      vehicle_id: row.vehicle_id,
      vehicle_make: row.make_model?.split(' ')[0] || 'Unbekannt',
      vehicle_model: row.make_model?.split(' ').slice(1).join(' ') || '',
      license_plate: row.license_plate || 'N/A',
      accident_date: row.accident_date,
      accident_location: row.accident_location,
      damage_type: row.damage_description || row.case_type || 'Nicht angegeben',
      estimated_damage_cost: row.estimated_cost,
      status: row.status,
      insurance_company: row.insurance_company,
      created_at: row.created_at,
      updated_at: row.updated_at,
    }))

    return NextResponse.json({
      success: true,
      cases: cases,
    })
  } catch (error) {
    console.error('Database Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: `Fehler beim Abrufen der Fälle: ${error instanceof Error ? error.message : 'Unknown error'}`,
      },
      { status: 500 },
    )
  } finally {
    await client.end()
  }
}
