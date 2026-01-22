import pool from './db.js';

export default async function handler(req, res) {
    try {
        const result = await pool.query('SELECT NOW()');
        res.status(200).json({
            status: 'ok',
            message: 'Database connection successful!',
            time: result.rows[0],
            env_host: process.env.DB_HOST ? 'Set' : 'Missing'
        });
    } catch (error) {
        console.error('DB Debug Error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Database connection failed',
            error: error.message,
            details: error.toString()
        });
    }
}
