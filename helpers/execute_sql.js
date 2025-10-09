// execute_sql.js
import {Client} from "pg";

export async function runSqlFile(query, returnRowsOnly = true) {
    //TODO: save these secrets in environment variables
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

        return returnRowsOnly ? result.rows : result;
    } catch (err) {
        console.error('Error executing SQL file:', err);
    } finally {
        await client.end();
    }
}