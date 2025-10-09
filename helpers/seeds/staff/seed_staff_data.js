import {runSqlFile} from "../../execute_sql.js";
import {writeFileSync} from "fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {generateValue} from "../utils/generate_value.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let output = 'INSERT INTO staff (uuid, first_name_uuid, last_name_uuid, position, rating, age, wage, mood) VALUES\n';

const wageOpts = {
    BASE_VALUE: 100,
    MIN_VALUE: 50,
    MAX_VALUE: 30_000_000,
    RATING_FACTOR: 0.0025,
    LOWEST_RATING_BOOST_FACTOR: 7,
    RANDOMNESS_FACTOR: 0.30,
    ENABLE_AGE_INFLUENCE: false
};

const countryQuery = 'SELECT uuid FROM countries;'
const countryQueryResult = await runSqlFile(countryQuery);

for (let countryObject of countryQueryResult) {
    const countryUuid = countryObject.uuid.toString();

    const firstNameQuery = `SELECT uuid FROM names WHERE country_uuid='${countryUuid}' AND type='first_name';`
    const firstNameQueryResult = await runSqlFile(firstNameQuery);

    const lastNameQuery = `SELECT uuid FROM names WHERE country_uuid='${countryUuid}' AND type='last_name';`
    const lastNameQueryResult = await runSqlFile(lastNameQuery);

    // We can have 400 unique combinations of first and last names (20 unique first names * 20 unique last names, per country) aka 400 max
    for (let i=0; i<150; i++) {
        const randomFirstName = Math.floor(Math.random() * firstNameQueryResult.length);
        const randomLastName = Math.floor(Math.random() * lastNameQueryResult.length);
        const position = ['Coach', 'Scout', 'Public Relations'][Math.floor(Math.random() * 3)]; // random position
        const rating = Math.floor(Math.random() * (100 - 1 + 1)) + 1 // random rating between 1 and 100
        const age = Math.floor(Math.random() * (65 - 30 + 1)) + 30; // random age between 30 and 65
        const wage = generateValue(rating, age, wageOpts);
        const mood = ['Angry', 'Sad', 'Content', 'Happy', 'Excited'][Math.floor(Math.random() * 5)];


        output += `(gen_random_uuid(), '${firstNameQueryResult[randomFirstName].uuid.toString()}', '${lastNameQueryResult[randomLastName].uuid.toString()}', '${position}', ${rating}, ${age}, ${wage}, '${mood}'),\n`;
    }
}

output = output.replace(/,\n$/, ';');
writeFileSync(path.join(__dirname, '../../../scripts/06-seed-data-staff.sql'), output, 'utf8')
console.log("All done!");