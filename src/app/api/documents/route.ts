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
        document_id,
        case_id,
        document_type,
        file_path,
        file_name,
        file_size,
        mime_type,
        description,
        uploaded_at
      FROM case_documents
      ORDER BY uploaded_at DESC
    `)

    return NextResponse.json({
      success: true,
      documents: result.rows,
    })
  } catch (error) {
    console.error('Database Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: `Fehler beim Abrufen der Dokumente: ${error instanceof Error ? error.message : 'Unknown error'}`,
      },
      { status: 500 },
    )
  } finally {
    await client.end()
  }
}
