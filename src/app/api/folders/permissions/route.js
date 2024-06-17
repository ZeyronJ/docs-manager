import { pool } from '@/utils/dbconfig';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const permissions = await pool.query('SELECT * FROM folder_permissions');
    return NextResponse.json(permissions.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json('Error al obtener los permisos', { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { users_id, folder_id } = await req.json();
    if (!users_id || !folder_id)
      return NextResponse.json('Faltan datos', { status: 400 });
    users_id.forEach(async (user_id) => {
      await pool.query(
        'INSERT INTO folder_permissions (user_id, folder_id) VALUES ($1, $2)',
        [user_id, folder_id]
      );
    });
    return NextResponse.json({ message: 'permisos creados correctamente' });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Error al crear permisos', { status: 500 });
  }
}
