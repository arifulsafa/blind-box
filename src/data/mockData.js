/**
 * Mock data for Blind Box demo
 * Three tiers: $10, $50, $100 with tier-specific probability distributions
 */

export const RARITIES = {
  COMMON: 'common',
  UNCOMMON: 'uncommon',
  RARE: 'rare',
  EPIC: 'epic',
  LEGENDARY: 'legendary',
};

export const RARITY_COLORS = {
  [RARITIES.COMMON]: '#9ca3af',
  [RARITIES.UNCOMMON]: '#22c55e',
  [RARITIES.RARE]: '#3b82f6',
  [RARITIES.EPIC]: '#a855f7',
  [RARITIES.LEGENDARY]: '#f59e0b',
};

export const RARITY_LABELS = {
  [RARITIES.COMMON]: 'Common',
  [RARITIES.UNCOMMON]: 'Uncommon',
  [RARITIES.RARE]: 'Rare',
  [RARITIES.EPIC]: 'Epic',
  [RARITIES.LEGENDARY]: 'Legendary',
};

// Pool of possible items per rarity (for random selection)
const ITEM_POOL = {
  [RARITIES.COMMON]: [
    { id: 'c1', name: 'Dusty Coin', emoji: '🪙' },
    { id: 'c2', name: 'Plain Keychain', emoji: '🔑' },
    { id: 'c3', name: 'Basic Sticker', emoji: '🏷️' },
    { id: 'c4', name: 'Wooden Token', emoji: '🪵' },
    { id: 'c5', name: 'Simple Badge', emoji: '📌' },
  ],
  [RARITIES.UNCOMMON]: [
    { id: 'u1', name: 'Silver Medallion', emoji: '🥈' },
    { id: 'u2', name: 'Glow Bracelet', emoji: '📿' },
    { id: 'u3', name: 'Mystery Pin', emoji: '📎' },
    { id: 'u4', name: 'Crystal Shard', emoji: '💎' },
    { id: 'u5', name: 'Lucky Charm', emoji: '🍀' },
  ],
  [RARITIES.RARE]: [
    { id: 'r1', name: 'Golden Trophy', emoji: '🏆' },
    { id: 'r2', name: 'Phoenix Feather', emoji: '🪶' },
    { id: 'r3', name: 'Dragon Scale', emoji: '🐉' },
    { id: 'r4', name: 'Star Fragment', emoji: '⭐' },
    { id: 'r5', name: 'Moonstone', emoji: '🌙' },
  ],
  [RARITIES.EPIC]: [
    { id: 'e1', name: 'Crown of Light', emoji: '👑' },
    { id: 'e2', name: 'Eternal Flame', emoji: '🔥' },
    { id: 'e3', name: 'Void Crystal', emoji: '💠' },
    { id: 'e4', name: 'Celestial Orb', emoji: '🔮' },
  ],
  [RARITIES.LEGENDARY]: [
    { id: 'l1', name: 'Infinity Gem', emoji: '💎' },
    { id: 'l2', name: 'Cosmic Crown', emoji: '🌟' },
    { id: 'l3', name: 'Dragon Heart', emoji: '❤️‍🔥' },
  ],
};

/**
 * Blind box tiers with price and probability distribution per rarity.
 * Probabilities per tier sum to 1.
 */
export const BLIND_BOX_TIERS = [
  {
    id: 'tier_bronze',
    name: 'Bronze Box',
    price: 10,
    emoji: '🥉',
    color: '#cd7f32',
    // Higher chance for common/uncommon
    distribution: {
      [RARITIES.COMMON]: 0.50,
      [RARITIES.UNCOMMON]: 0.30,
      [RARITIES.RARE]: 0.15,
      [RARITIES.EPIC]: 0.04,
      [RARITIES.LEGENDARY]: 0.01,
    },
  },
  {
    id: 'tier_silver',
    name: 'Silver Box',
    price: 50,
    emoji: '🥈',
    color: '#c0c0c0',
    distribution: {
      [RARITIES.COMMON]: 0.35,
      [RARITIES.UNCOMMON]: 0.35,
      [RARITIES.RARE]: 0.20,
      [RARITIES.EPIC]: 0.08,
      [RARITIES.LEGENDARY]: 0.02,
    },
  },
  {
    id: 'tier_gold',
    name: 'Gold Box',
    price: 100,
    emoji: '🥇',
    color: '#ffd700',
    distribution: {
      [RARITIES.COMMON]: 0.20,
      [RARITIES.UNCOMMON]: 0.25,
      [RARITIES.RARE]: 0.30,
      [RARITIES.EPIC]: 0.18,
      [RARITIES.LEGENDARY]: 0.07,
    },
  },
];

/**
 * Pick a random item from the pool for the given rarity
 */
export function getRandomItemForRarity(rarity) {
  const pool = ITEM_POOL[rarity];
  const index = Math.floor(Math.random() * pool.length);
  return { ...pool[index], rarity };
}

/**
 * Roll for rarity based on tier's probability distribution
 */
export function rollRarityForTier(tier) {
  const rand = Math.random();
  let acc = 0;
  for (const [rarity, prob] of Object.entries(tier.distribution)) {
    acc += prob;
    if (rand <= acc) return rarity;
  }
  return RARITIES.COMMON;
}

/**
 * Open a blind box: determine rarity from distribution, then pick random item
 */
export function openBlindBox(tier) {
  const rarity = rollRarityForTier(tier);
  const item = getRandomItemForRarity(rarity);
  return { item, tier, rarity };
}
