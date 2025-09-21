export function playerValue(rating, age, opts = {}) {
    const BASE_VALUE = 1_000; // Minimum player value
    const MIN_VALUE = 500; // Minimum player value
    const MAX_VALUE = 15_000_000; // Maximum player value
    const AGE_PEAK = 26; // Age at which players reach their peak value
    const ageFactor = 0.05; // Factor to adjust age influence
    const randomnessFactor = 0.25; // Factor to adjust randomness influence

    // Rating is the most important factor, so we use a quadratic scale
    const ratingValue = BASE_VALUE * Math.pow(rating, 2);

    // Make sure that the age influences slightly the value
    const ageGap = Math.abs(age - AGE_PEAK);
    const ageInfluence = 1 + (ageGap - 1) * ageFactor;
    const ratingAndAgeValue = ratingValue / ageInfluence;

    // Add some randomness to the value - percentage between -25% and +25%
    const randomness = (Math.random() * 2 - 1) * randomnessFactor; // Random value between -0.25 and +0.25
    const finalValue =  ratingAndAgeValue * (1 + randomness);

    // Make sure the final value is within the defined bounds
    if (finalValue < MIN_VALUE) {
        return stringifyValue(MIN_VALUE);
    }

    else if (finalValue > MAX_VALUE) {
        return stringifyValue(MAX_VALUE);
    }

    return stringifyValue(finalValue);
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
