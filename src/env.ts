const itemsPerSecondParsed = process.env.ITEMS_PER_SECOND ? Number.parseInt(process.env.ITEMS_PER_SECOND) : 100000;
const crashAfterItems = process.env.CRASH_AFTER_ITEMS ? Number.parseInt(process.env.CRASH_AFTER_ITEMS) : 100000;
const crashChanceProbability = process.env.CRASH_CHANCE ? Number.parseFloat(process.env.CRASH_CHANCE) : 0.1;

export const itemsPerSecond = () => (itemsPerSecondParsed > 0 ? itemsPerSecondParsed : Number.POSITIVE_INFINITY);

export const crashAfter = () => (crashAfterItems > 0 ? crashAfterItems : Number.POSITIVE_INFINITY);

export const crashChance = () => (crashChanceProbability > 0 ? crashChanceProbability : 0);
