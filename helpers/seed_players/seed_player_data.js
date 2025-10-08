import {runSqlFile} from "../execute_sql.js";
import {writeFileSync} from "fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {generateValue} from "./generate_value.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let output = 'INSERT INTO player (uuid, first_name_uuid, last_name_uuid, position, rating, age, wage, value, mood) VALUES\n';

const wageOpts = {
    BASE_VALUE: 100,
    MIN_VALUE: 50,
    MAX_VALUE: 30_000_000,
    AGE_PEAK: 26,
    RATING_FACTOR: 0.005,
    LOWEST_RATING_BOOST_FACTOR: 7,
    AGE_FACTOR: 0,
    RANDOMNESS_FACTOR: 0.15
};

const countryQuery = 'SELECT uuid FROM countries;'
const countryQueryResult = await runSqlFile(countryQuery);

for (let countryObject of countryQueryResult) {
    /*console.log('Country uuid: ' + countryObject.uuid.toString())*/
    const countryUuid = countryObject.uuid.toString();

    const firstNameQuery = `SELECT uuid FROM names WHERE country_uuid='${countryUuid}' AND type='first_name';`
    const firstNameQueryResult = await runSqlFile(firstNameQuery);

    const lastNameQuery = `SELECT uuid FROM names WHERE country_uuid='${countryUuid}' AND type='last_name';`
    const lastNameQueryResult = await runSqlFile(lastNameQuery);

    // We can have 400 unique combinations of first and last names aka 400 max
    for (let i=0; i<5; i++) {
        const randomFirstName = Math.floor(Math.random() * firstNameQueryResult.length);
        const randomLastName = Math.floor(Math.random() * lastNameQueryResult.length);
        const position = ['GK', 'DF', 'MF', 'FW'][Math.floor(Math.random() * 4)]; // random position
        const rating = Math.floor(Math.random() * (100 - 1 + 1)) + 1 // random rating between 1 and 100
        const age = Math.floor(Math.random() * (37 - 16 + 1)) + 16; // random age between 16 and 37
        const wage = generateValue(rating, age, wageOpts);
        const value = generateValue(rating, age);
        const mood = ['Angry', 'Sad', 'Content', 'Happy', 'Excited'][Math.floor(Math.random() * 5)];


        output += `(gen_random_uuid(), '${firstNameQueryResult[randomFirstName].uuid.toString()}', '${lastNameQueryResult[randomLastName].uuid.toString()}', '${position}', ${rating}, ${age}, ${wage}, ${value}, '${mood}'),\n`;
    }
}

output = output.replace(/,\n$/, ';');
writeFileSync(path.join(__dirname, '../../scripts/05-seed-data-players.sql'), output, 'utf8')
console.log("All done!");