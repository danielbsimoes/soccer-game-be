import fs from "fs";
import {runSqlFile} from "./execute_sql.js";

const args = process.argv.slice(2);

if (args.length === 0) {
    console.error(`No arguments provided. Command -> ${process.argv}`);
    process.exit(1);
}

for (const filePath of args) {
    const query = fs.readFileSync(filePath, 'utf8');
    const result = await runSqlFile(query, false);
    console.log(`Output for ${filePath}:`);
    console.log(result);
}