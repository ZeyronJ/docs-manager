import { pool } from '@/utils/dbconfig';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const folders = await pool.query('SELECT * FROM folders ORDER BY id ASC');
    const users = await pool.query('SELECT * FROM users');

    folders.rows.forEach((folder) => {
      const user = users.rows.find((user) => user.id === folder.owner);
      folder.owner = user.name;
    });
    // const folders = await pool.query(
    //   'SELECT folders.*, users.name AS owner_name FROM folders JOIN users ON folders.owner = users.id'
    // );

    return NextResponse.json(folders.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json('Error al obtener los folders', { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { owner, folder, name, description } = await req.json();
    if (!name || !owner)
      return NextResponse.json('Faltan datos', { status: 400 });
    // Crear carpeta
    const newFolder = await pool.query(
      'INSERT INTO folders (owner, folder, name, description ) VALUES ($1, $2, $3, $4) RETURNING *',
      [owner, folder, name, description]
    );
    // Obtener usuario
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [owner]);
    // Actualizar owner con el nombre del usuario
    newFolder.rows[0].owner = user.rows[0].name;
    return NextResponse.json(
      { message: 'folder creado correctamente', folder: newFolder.rows[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    // res.status(500).json({ message: 'Error al crear el folder' });
    return NextResponse.json('Error al crear el folder', { status: 500 });
  }
}
