import { generateValue } from "../../utils/generate_value.js";

const rating = [1,2, 3,4, 5, 12, 24, 32, 45, 58, 64, 71, 72, 88, 96, 99, 100];
const age = [16, 19, 22, 25, 26, 28, 30, 31, 33, 35, 37];
const opts = {
    BASE_VALUE: 100,
    MIN_VALUE: 50,
    MAX_VALUE: 30_000_000,
    AGE_PEAK: 26,
    RATING_FACTOR: 0.005,
    LOWEST_RATING_BOOST_FACTOR: 7,
    RANDOMNESS_FACTOR: 0.15,
    ENABLE_AGE_INFLUENCE: false
};

for (let i=0; i<rating.length; i++) {
    console.log(`\n--- Rating: ${rating[i]} ---`);
    for (let j=0; j<age.length; j++) {
        const value = stringifyValue(generateValue(rating[i], age[j], opts));
        console.log(`Age: ${age[j]}, Rating: ${rating[i]} => Value: ${value}`);
    }
}

function stringifyValue(value) {
    if (value >= 1_000_000) {
        return (value / 1_000_000).toFixed(2).replace(/\.0$/, '') + 'M€/month';
    } else if (value >= 1_000) {
        return (value / 1_000).toFixed(2).replace(/\.0$/, '') + 'K€/month';
    } else {
        return value.toFixed(2) + '€/month';
    }
}
