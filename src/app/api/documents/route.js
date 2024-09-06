import { pool } from '@/utils/dbconfig';
import { NextResponse } from 'next/server';
import { uploadFileToS3 } from '@/utils/S3';

export async function GET() {
  try {
    const documents = await pool.query('SELECT * FROM documents');

    const users = await pool.query('SELECT * FROM users');

    documents.rows.forEach((document) => {
      const user = users.rows.find((user) => user.id === document.owner);
      document.owner = user.name;
    });
    // const documents = await pool.query(
    //   'SELECT documents.*, users.name AS owner_name FROM documents JOIN users ON documents.owner = users.id'
    // );
    return NextResponse.json(documents.rows);
  } catch (error) {
    console.error('Error al obtener los documents', error);
    return NextResponse.json('Error interno del servidor', { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.formData(); // Obteniendo los datos del formulario enviado (doc, nombre, etc)
    const owner = data.get('owner'); // Obteniendo el id del usuario
    const folder = data.get('folder'); // Obteniendo el id de la carpeta
    if (!owner || !folder)
      return res.status(400).send('Faltan datos obligatorios');
    const file = data.get('documento'); // Obteniendo el archivo enviado
    if (!file) return NextResponse.json('Falta la imagen', { status: 400 });
    // Crear documento
    const fileName = `${Date.now()}-${file.name}`;
    const newDocument = await pool.query(
      'INSERT INTO documents (key, owner, folder, name) VALUES ($1, $2, $3, $4) RETURNING *',
      [fileName, owner, folder, file.name]
    );
    // Cambiar nombre del owner por el nombre del usuario
    const ownerName = await pool.query('SELECT name FROM users WHERE id = $1', [
      owner,
    ]);
    newDocument.rows[0].owner = ownerName.rows[0].name;
    // console.log(file.name); // Nombre del archivo
    // Convertir el archivo a un buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    // Guardar archivo en el servidor
    // const filePath = join(process.cwd(), 'public', file.name);
    // await writeFile(filePath, buffer);
    // Guardar archivo en S3
    const fileN = await uploadFileToS3(buffer, fileName);
    if (!fileN)
      return NextResponse.json('Error al subir el archivo a S3', {
        status: 500,
      });
    return NextResponse.json(
      { document: newDocument.rows[0] },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error interno del servidor: POST documents',
        error,
      },
      { status: 500 }
    );
  }
}
