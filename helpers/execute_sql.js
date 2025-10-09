// execute_sql.js
import {Client} from "pg";

export async function runSqlFile(query, returnRowsOnly = true) {
    console.log("ENV Vars" + process.env.DB_USER);
    const client = new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
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