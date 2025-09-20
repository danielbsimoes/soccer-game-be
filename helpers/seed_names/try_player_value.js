import { playerValue } from "./player_value.js";

const rating = [1, 5, 12, 24, 32, 45, 58, 64, 72, 88, 96, 100];
const age = [16, 19, 22, 25, 28, 30, 31, 33, 35, 37];

for (let i=0; i<rating.length; i++) {
    console.log(`\n--- Rating: ${rating[i]} ---`);
    for (let j=0; j<age.length; j++) {
        console.log(`Age: ${age[j]}, Rating: ${rating[i]} => Value: ${playerValue(rating[i], age[j])}`);
    }
}
