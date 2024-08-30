import { pool } from '@/utils/dbconfig';
import { NextResponse } from 'next/server';
import { deleteFileFromS3 } from '@/utils/S3';

export async function DELETE(req, { params }) {
  try {
    const id = params.id;
    await deleteInnerFolders(id);
    await pool.query('DELETE FROM folders WHERE id = $1', [id]);
    return NextResponse.json('folder eliminado correctamente', { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Error al eliminar el folder', { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const { newFolder } = await req.json();
    // console.log(`newFolder: ${newFolder}, params.id: ${params.id}`);
    await pool.query('UPDATE folders SET folder = $1 WHERE id = $2', [
      newFolder,
      params.id,
    ]);
    return NextResponse.json('folder movido correctamente', { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json('Error al mover el folder', { status: 500 });
  }
}

const deleteInnerFolders = async (folder_id) => {
  const innerFolders = await pool.query(
    'SELECT * FROM folders WHERE folder = $1',
    [folder_id]
  );
  if (innerFolders.rows.length > 0) {
    for (const folder of innerFolders.rows) {
      await deleteInnerFolders(folder.id);
    }
  }
  const innerDocuments = await pool.query(
    'SELECT * FROM documents WHERE folder = $1',
    [folder_id]
  );
  if (innerDocuments.rows.length > 0) {
    for (const document of innerDocuments.rows) {
      await deleteFileFromS3(document.key);
      // await pool.query('DELETE FROM documents WHERE id = $1', [document.id]);
    }
    await pool.query('DELETE FROM documents WHERE folder = $1', [folder_id]);
  }
  await pool.query('DELETE FROM folder_permissions WHERE folder_id = $1', [
    folder_id,
  ]);
  await pool.query('DELETE FROM folders WHERE folder = $1', [folder_id]);
};
