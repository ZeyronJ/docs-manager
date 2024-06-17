import { pool } from '@/utils/dbconfig';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM users');
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.error(error);
  }
}
