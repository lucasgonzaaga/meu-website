import pg from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';

// Specify path to server/.env relative to CWD
dotenv.config({ path: 'server/.env' });

const { Pool } = pg;

const resetAdmin = async () => {
    // Debug: Check if variables are loaded
    if (!process.env.DB_HOST) {
        console.error('❌ Erro: Variáveis de ambiente não encontradas em server/.env');
        process.exit(1);
    }

    const pool = new Pool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        // Removed ssl temporarily to test connection, as decided in previous steps
    });

    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        console.log('🔄 Atualizando senha do admin...');

        // Update existing admin or insert if not exists
        const result = await pool.query(`
            INSERT INTO admin_users (username, password_hash)
            VALUES ($1, $2)
            ON CONFLICT (username) 
            DO UPDATE SET password_hash = $2
            RETURNING id, username;
        `, ['admin', hashedPassword]);

        console.log('✅ Senha atualizada com sucesso!');
        console.log(`👤 Usuário: ${result.rows[0].username}`);
        console.log(`🔑 Nova Senha: ${password}`);

        await pool.end();
    } catch (error) {
        console.error('❌ Erro ao atualizar senha:', error);
        await pool.end();
        process.exit(1);
    }
};

resetAdmin();
