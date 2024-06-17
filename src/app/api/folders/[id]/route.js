import { pool } from '@/utils/dbconfig';
import { NextResponse } from 'next/server';

// export async function GET() {
//   try {
//     const folders = await pool.query('SELECT * FROM folders ORDER BY id ASC');
//     const users = await pool.query('SELECT * FROM users');

//     folders.rows.forEach((folder) => {
//       const user = users.rows.find((user) => user.id === folder.owner);
//       folder.owner = user.name;
//     });

//     return NextResponse.json(folders.rows);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json('Error al obtener los folders', { status: 500 });
//   }
// }

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
  // const innerDocuments = await pool.query(
  //   'SELECT * FROM documents WHERE folder = $1',
  //   [folder_id]
  // );
  // if (innerDocuments.rows.length > 0) {
  //   for (const document of innerDocuments.rows) {
  //     await fs.remove(document.path);
  //     await pool.query('DELETE FROM documents WHERE id = $1', [document.id]);
  //   }
  // }
  await pool.query('DELETE FROM folder_permissions WHERE folder_id = $1', [
    folder_id,
  ]);
  await pool.query('DELETE FROM folders WHERE folder = $1', [folder_id]);
};
