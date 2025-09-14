// execute_sql.js
import {Client} from "pg";

export async function runSqlFile(query) {
    const client = new Client({
        user: 'admin',
        host: 'localhost',
        database: 'soccer_game',
        password: 'admin',
        port: 55000,
    });

    try {
        await client.connect();
        const result = await client.query(query);
        /*console.log('SQL file executed successfully.');*/
        return result.rows;
    } catch (err) {
        console.error('Error executing SQL file:', err);
    } finally {
        await client.end();
    }
}