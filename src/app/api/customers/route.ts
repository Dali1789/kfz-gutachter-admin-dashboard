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
        id,
        customer_number,
        email,
        phone,
        created_at,
        updated_at
      FROM customers
      ORDER BY created_at DESC
    `)

    return NextResponse.json({
      success: true,
      customers: result.rows,
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
