import { pool } from '@/utils/dbconfig';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    const documents = await pool.query('SELECT * FROM documents');

    const users = await pool.query('SELECT * FROM users');

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

export async function POST(req) {
  const data = await req.formData(); // Obteniendo los datos del formulario enviado (doc, nombre, etc)
  const file = data.get('documento'); // Obteniendo el archivo enviado
  if (!file) return NextResponse.json('Falta la imagen', { status: 400 });
  // Convertir el archivo a un buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  // Guardar archivo en el servidor
  // const filePath = join(process.cwd(), 'public', file.name);
  // await writeFile(filePath, buffer);
  // Guardar archivo en S3

  return NextResponse.json('imagen recibida');
}
