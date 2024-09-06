import { pool } from '@/utils/dbconfig';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    console.log(params.owner);
    const documents = await pool.query(
      'SELECT * FROM documents WHERE owner = $1',
      [params.owner]
    );

    const users = await pool.query('SELECT * FROM users WHERE id = $1', [
      params.owner,
    ]);

    documents.rows.forEach((document) => {
      const user = users.rows.find((user) => user.id === document.owner);
      document.owner = user.name;
    });
    return NextResponse.json(documents.rows);
  } catch (error) {
    console.error('Error al obtener los documents', error);
    return NextResponse.json('Error interno del servidor', { status: 500 });
  }
}
