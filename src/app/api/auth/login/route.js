import bcrypt from 'bcrypt';
import { pool } from '@/utils/dbconfig';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password)
      return NextResponse.json('Faltan datos', { status: 400 });
    // Verificar si el usuario existe y si la password es correcta
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    console.log(result.rows[0]);
    const user = result.rows[0];
    const validPassword =
      user && (await bcrypt.compare(password, user.password));
    if (!validPassword)
      return NextResponse.json('Usuario o contraseña incorrectos', {
        status: 401,
      });

    // Crear el token para el nuevo usuario
    // const jwtToken = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
    //   expiresIn: '5m',
    // });
    // console.log('jwtToken:', jwtToken, 'user:', user);
    // res.setHeader('Authorization', `Bearer ${jwtToken}`);
    // res.status(201).json({
    //   id: user.id,
    //   nombre: user.name,
    //   rol: user.rol,
    //   email: user.email,
    // });
    return NextResponse.json(
      {
        id: user.id,
        name: user.name,
        rol: user.rol,
        email: user.email,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error al procesar la solicitud de inicio de sesión:', error);
    return NextResponse.error(error);
  }
}
