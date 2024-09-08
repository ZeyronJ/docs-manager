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

    // Aquí puedes agregar las cabeceras a la respuesta
    const response = NextResponse.json(documents.rows);
    response.headers.set('Cache-Control', 'no-store, max-age=0'); // Desactiva el caché
    return response;
  } catch (error) {
    console.error('Error al obtener los documents', error);
    return NextResponse.json('Error interno del servidor', { status: 500 });
  }
}
