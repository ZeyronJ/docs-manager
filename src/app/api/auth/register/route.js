import bcrypt from 'bcrypt';
import { pool } from '@/utils/dbconfig';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { name, email, password, rol } = await req.json();
    if (!name || !email || !password || !rol)
      return NextResponse.json('Faltan datos', { status: 400 });
    // Verificar si el email ya está registrado
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    if (existingUser.rows.length > 0)
      return NextResponse.json('El email ya está registrado', { status: 400 });

    // Insertar el nuevo usuario en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10); // Encriptar la password antes de almacenarla en la base de datos
    const result = await pool.query(
      'INSERT INTO users (name, email, password, rol) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, hashedPassword, rol]
    );
    const newUser = result.rows[0];

    // Crear el token para el nuevo usuario
    // const jwtToken = jwt.sign({ id: newUser.id }, process.env.TOKEN_SECRET, {
    //   expiresIn: '2m',
    // });
    // NextResponse.setHeader('Authorization', `Bearer ${jwtToken}`);
    // NextResponse.json(
    //   { message: 'Registro exitoso', user: newUser, jwtToken },
    //   { status: 201 }
    // );
    return NextResponse.json(
      { message: 'Registro exitoso', user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error al procesar la solicitud de registro:', error);
    return NextResponse.json('Error al procesar la solicitud de registro', {
      status: 500,
    });
  }
}
