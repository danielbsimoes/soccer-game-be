import {runSqlFile} from "../../execute_sql.js";

for (let i=1; i<=100; i++) {
    const result = await runSqlFile(`select COUNT(*) from player where rating = ${i}`);
    console.log(`Rating ${i}:`, result);
}