import { generateValue } from "../generate_value.js";

const rating = [1,2, 3,4, 5, 12, 24, 32, 45, 58, 64, 71, 72, 88, 96, 99, 100];
const age = [16, 19, 22, 25, 26, 28, 30, 31, 33, 35, 37];

for (let i=0; i<rating.length; i++) {
    console.log(`\n--- Rating: ${rating[i]} ---`);
    for (let j=0; j<age.length; j++) {
        const value = stringifyValue(generateValue(rating[i], age[j]));
        console.log(`Age: ${age[j]}, Rating: ${rating[i]} => Value: ${value}`);
    }
}


function stringifyValue(value) {
    if (value >= 1_000_000) {
        return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (value >= 1_000) {
        return (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else {
        return value.toFixed(1);
    }
}