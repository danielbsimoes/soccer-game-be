import fs, {writeFileSync} from "fs";
import {runSqlFile} from "../../execute_sql.js";
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonFileName = path.join(__dirname, 'names_grouped_by_country.json');
const obj = JSON.parse(fs.readFileSync(jsonFileName, 'utf8'));
let output = "INSERT INTO names (uuid, name, type, country_uuid) VALUES\n";

for (let array of obj) {
    /*console.log("Country: " + array.country)*/

    const result = await runSqlFile(`SELECT uuid
                                     from countries
                                     where full_name = '${array.country}';`)
    const uuid = result[0].uuid.toString();

    /*console.log("UUID: " + uuid)*/

    for (let firstNameArray of array.firstName) {
        /*console.log("First name: " + firstNameArray)*/
        output += "(gen_random_uuid(), "
        output += addAsString(firstNameArray);
        output += addAsString("first_name");
        output += addAsString(uuid, true);
    }

    for (let lastNameArray of array.lastName) {
        /*console.log("Last name: " + lastNameArray)*/
        output += "(gen_random_uuid(), "
        output += addAsString(lastNameArray);
        output += addAsString("last_name");
        output += addAsString(uuid, true);
    }
}

// Replace the last comma with a semicolon
output = output.replace(/,\n$/, ';');

/*console.log("----------Final output:----------");
console.log(output);*/

writeFileSync(path.join(__dirname, '../../../scripts/04-seed-data-names.sql'), output, 'utf8')

console.log("All done!");

function addAsString(str, lastArgument = false) {
    str = str.replace("'", "''"); // escape single quotes in SQL
    return lastArgument ? "'" + str + "'),\n" : "'" + str + "', ";
}