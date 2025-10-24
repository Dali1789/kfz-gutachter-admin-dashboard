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
        c.customer_number,
        c.email,
        c.phone,
        c.created_at,
        c.updated_at,
        COUNT(cs.id) as case_count
      FROM customers c
      LEFT JOIN cases cs ON c.id = cs.customer_id
      GROUP BY c.id, c.customer_number, c.email, c.phone, c.created_at, c.updated_at
      ORDER BY c.created_at DESC
    `)

    // Transform to include case count
    const customers = result.rows.map((row) => ({
      ...row,
      case_count: parseInt(row.case_count) || 0,
    }))

    return NextResponse.json({
      success: true,
      customers: customers,
    })
  } catch (error) {
    console.error('Database Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: `Fehler beim Abrufen der Kunden: ${error instanceof Error ? error.message : 'Unknown error'}`,
      },
      { status: 500 },
    )
  } finally {
    await client.end()
  }
}
