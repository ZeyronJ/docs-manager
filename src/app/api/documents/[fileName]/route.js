import { pool } from '@/utils/dbconfig';
import { NextResponse } from 'next/server';
import { getFileFromS3, deleteFileFromS3 } from '@/utils/S3';

export async function GET(req, { params }) {
  try {
    const file = await pool.query('SELECT * FROM documents WHERE key = $1', [
      params.fileName,
    ]);
    const { stream, contentType } = await getFileFromS3(params.fileName);

    return new NextResponse(stream, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${file.rows[0].name}"`,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Error al obtener el archivo', { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await pool.query('DELETE FROM documents WHERE key = $1', [params.fileName]);
    await deleteFileFromS3(params.fileName);
    return NextResponse.json('documento eliminado correctamente', {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Error al eliminar el documento', { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { newFolder } = await req.json();
    // console.log(`newFolder: ${newFolder}, params.id: ${params.id}`);
    await pool.query('UPDATE documents SET folder = $1 WHERE key = $2', [
      newFolder,
      params.fileName,
    ]);
    return NextResponse.json('documento movido correctamente', { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Error al mover el documento', { status: 500 });
  }
}
