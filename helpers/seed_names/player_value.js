export function playerValue(rating, age, opts = {}) {
    const V_MIN = 2000;             // realistic floor for worst players
    const V_MAX = 15_000_000;       // soft cap

    // Tunable parameters
    const ratingScale = opts.ratingScale ?? 20; // steeper = bigger gap between bad & good
    const ratingShift = opts.ratingShift ?? 50; // center point for logistic
    const agePeak = opts.agePeak ?? 23;         // peak age
    const ageSigmaYoung = opts.ageSigmaYoung ?? 6;
    const ageSigmaOld = opts.ageSigmaOld ?? 6; // soften drop for 30+
    const ageMinFactor = opts.ageMinFactor ?? 0.65; // floor multiplier by age
    const sigma = opts.sigma ?? 0.05;           // randomness
    const maxDev = opts.maxDev ?? 0.15;

    // --- Rating effect (logistic) ---
    const r = Math.max(1, Math.min(100, rating));
    const rEff = 1 / (1 + Math.exp(-(r - ratingShift) / ratingScale));
    // r=1 ~0.006, r=50 ~0.5, r=100 ~0.99

    // --- Age effect (asymmetric Gaussian) ---
    const a = Math.max(16, Math.min(37, age));
    let gauss;
    if (a <= agePeak) {
        gauss = Math.exp(-0.5 * Math.pow((a - agePeak) / ageSigmaYoung, 2));
    } else {
        gauss = Math.exp(-0.5 * Math.pow((a - agePeak) / ageSigmaOld, 2));
    }
    const ageFactor = ageMinFactor + (1 - ageMinFactor) * gauss;

    // --- Combine ---
    const combined = rEff * ageFactor;

    // --- Scale ---
    const softMax = V_MAX * 0.97; // ~14.55M top
    const baseValue = V_MIN + (softMax - V_MIN) * combined;
    console.log('softMax (before noise): ' + softMax);
    console.log('Base value (before noise): ' + baseValue);

    // --- Random noise ---
    function randn() {
        let u = 0, v = 0;
        while (u === 0) u = Math.random();
        while (v === 0) v = Math.random();
        return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    }
    let delta = randn() * sigma;
    delta = Math.max(-maxDev, Math.min(maxDev, delta));
    let value = baseValue * (1 + delta);

    // Clamp
    value = Math.max(V_MIN, Math.min(V_MAX, value));
    return stringifyValue(Math.round(value));
}


function stringifyValue(value) {
    if (value >= 1_000_000) {
        return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (value >= 1_000) {
        return (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else {
        return value.toString();
    }
}
