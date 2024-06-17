import { pool } from './dbconfig.js';
import bcrypt from 'bcrypt';

async function seed() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        rol VARCHAR(50) NOT NULL
      );
    `);
    console.log('Tabla users creada.');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS folders (
        id SERIAL PRIMARY KEY,
        owner INTEGER REFERENCES users(id),
        folder INTEGER REFERENCES folders(id),
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255),
        created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Tabla folders creada.');

    await pool.query(`
      CREATE SEQUENCE IF NOT EXISTS document_id_seq START 10000;
    `);
    console.log('Secuencia document_id_seq creada.');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS documents (
        id INTEGER PRIMARY KEY DEFAULT nextval('document_id_seq'),
        owner INTEGER REFERENCES users(id),
        folder INTEGER REFERENCES folders(id),
        name VARCHAR(255) NOT NULL,
        path VARCHAR(255) NOT NULL,
        description VARCHAR(255),
        created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Tabla documents creada.');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS folder_permissions (
        user_id INTEGER REFERENCES users(id),
        folder_id INTEGER REFERENCES folders(id),
        PRIMARY KEY (user_id, folder_id)
      );
    `);
    console.log('Tabla folder_permissions creada.');

    const hashedPassword1 = await bcrypt.hash('contraseña1', 10);
    const hashedPassword2 = await bcrypt.hash('contraseña2', 10);
    const hashedPassword3 = await bcrypt.hash('contraseña3', 10);
    const hashedPassword4 = await bcrypt.hash('contraseña4', 10);
    const hashedPassword5 = await bcrypt.hash('contraseña5', 10);
    await pool.query(`
    INSERT INTO users (name, email, password, rol) VALUES
        ('decana1', 'usuario1@example.com', '${hashedPassword1}', 'decana'),
        ('director1', 'usuario2@example.com', '${hashedPassword2}', 'director'),
        ('secretaria1', 'usuario3@example.com', '${hashedPassword3}', 'secretaria'),
        ('academico1', 'usuario4@example.com', '${hashedPassword4}', 'academico'),
        ('funcionario1', 'usuario5@example.com', '${hashedPassword5}', 'funcionario');
    `);
    console.log('Datos de usuarios insertados correctamente.');

    await pool.query(`
      INSERT INTO folders (owner, name) VALUES (1, 'Raíz');
    `);
    console.log('Carpeta raíz insertada correctamente.');
    return;
  } catch (error) {
    console.error('Error al realizar el proceso de seed:', error);
  }
}

seed();
