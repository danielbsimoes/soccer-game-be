export function generateValue(rating, age, options = {}) {
    const BASE_VALUE = options.BASE_VALUE ? options.BASE_VALUE : 1_000; // base player value
    const MIN_VALUE = options.MIN_VALUE ? options.MIN_VALUE : 500; // Minimum player value
    const MAX_VALUE = options.MAX_VALUE ? options.MAX_VALUE : 30_000_000; // Maximum player value
    const AGE_PEAK = options.AGE_PEAK ? options.AGE_PEAK : 26; // Age at which players reach their peak value
    const RATING_FACTOR = options.RATING_FACTOR ? options.RATING_FACTOR : 0.0275; // Factor to reduce linear and give more value to higher rating players
    const LOWEST_RATING_BOOST_FACTOR = options.LOWEST_RATING_BOOST_FACTOR ? options.LOWEST_RATING_BOOST_FACTOR : 10; // Factor to avoid "no-variation" value on lower rated players
    let AGE_FACTOR = options.AGE_FACTOR ? options.AGE_FACTOR : 0.015; // Factor to adjust age influence
    const RANDOMNESS_FACTOR = options.RANDOMNESS_FACTOR ? options.RANDOMNESS_FACTOR : 0.15; // Factor to adjust randomness influence

    // Rating is the most important factor, so we use a quadratic scale
    let ratingValue = BASE_VALUE * Math.pow(rating, 2);
    ratingValue *= RATING_FACTOR * rating
    ratingValue += (100 - rating) * LOWEST_RATING_BOOST_FACTOR; // Add a small value for lower rated players to avoid zero value


    // Make sure that the age influences slightly the value
    const ageGap = age - AGE_PEAK;
    if (ageGap > 0) { // Older than peak age, more influence
        AGE_FACTOR *= 2;
    }

    const ageInfluence = 1 + (Math.abs(ageGap) - 1) * AGE_FACTOR;
    const ratingAndAgeValue = ratingValue / ageInfluence;

    // Comment out after this point to see the pure rating and age based value
    // Add some randomness to the value - percentage between -25% and +25%
    const randomness = (Math.random() * 2 - 1) * RANDOMNESS_FACTOR; // Random value between -0.25 and +0.25
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
