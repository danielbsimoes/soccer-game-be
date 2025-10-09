import {runSqlFile} from "../../../execute_sql.js";

const positions = ['Coach', 'Scout', 'Public Relations']

for (let i=1; i<=100; i++) {
    for (let position of positions) {
        const result = await runSqlFile(`select COUNT(*) from staff where rating = ${i} and position = '${position}'`);
        console.log(`Rating ${i}, position ${position}:`, result);
    }
}