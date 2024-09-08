import { pool } from '@/utils/dbconfig';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const documents = await pool.query(
      'SELECT * FROM documents WHERE validated = true'
    );
    console.log(documents.rows);
    const users = await pool.query('SELECT * FROM users');

    documents.rows.forEach((document) => {
      const user = users.rows.find((user) => user.id === document.owner);
      document.owner = user.name;
    });

    // Crea la respuesta
    const response = NextResponse.json(documents.rows);

    // Configura las cabeceras para desactivar el caché
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate'
    );
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
  } catch (error) {
    console.error('Error al obtener los documentos', error);
    return NextResponse.json('Error interno del servidor', { status: 500 });
  }
}
