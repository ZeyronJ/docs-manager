import { pool } from '@/utils/dbconfig';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const notifications = await pool.query(
      'SELECT * FROM notifications ORDER BY id DESC'
    );
    const users = await pool.query('SELECT * FROM users');

    notifications.rows.forEach((n) => {
      const owner = users.rows.find((user) => user.id === n.owner);
      const recipient = users.rows.find((user) => user.id === n.recipient);
      n.owner = owner.name;
      n.recipient = recipient.name;
    });

    return NextResponse.json(notifications.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json('Error al obtener las notificaciones', {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const { owner, recipient, message } = await req.json();
    if (!owner || !recipient || !message)
      return NextResponse.json('Faltan datos', { status: 400 });
    // Crear carpeta
    const newNotification = await pool.query(
      'INSERT INTO notifications (owner, recipient, message ) VALUES ($1, $2, $3) RETURNING *',
      [owner, recipient, message]
    );
    // Obtener usuario
    // const user = await pool.query('SELECT * FROM users WHERE id = $1', [owner]);
    // // Actualizar owner con el nombre del usuario
    // newFolder.rows[0].owner = user.rows[0].name;
    return NextResponse.json(
      {
        message: 'notificación creado correctamente',
        newNotification: newNotification.rows[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    // res.status(500).json({ message: 'Error al crear el folder' });
    return NextResponse.json('Error al crear la notificación', { status: 500 });
  }
}
