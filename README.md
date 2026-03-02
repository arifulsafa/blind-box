# Blind Box Demo (Expo)

A demo of the **blind box purchase flow** for the client: probability-based item reveal, wallet deduction, and transaction logging.

## What’s included

1. **Three blind box tiers** (Bronze $10, Silver $50, Gold $100), each with its own probability distribution for item rarities (Common → Legendary).
2. **Purchase flow**: tap a tier → amount is deducted from the wallet → an item is revealed according to that tier’s odds.
3. **Transaction log**: each purchase is stored with user, box tier, item revealed, price, and timestamp.
4. **Inventory**: list of all unboxed items.
5. **UI**: dark theme, simple animations on reveal, and basic gamification (rarity colors, badges).

## Run the app

```bash
cd blind-box-demo
npm start
```

Then press `i` for iOS simulator or `a` for Android emulator, or scan the QR code with Expo Go.

## Tech

- **Expo** (blank template), **React Native** only — no extra native modules.
- **Mock data**: `src/data/mockData.js` (tiers, item pools, probabilities).
- **State**: React context + reducer in `src/context/AppContext.js` (wallet, inventory, transactions).
- **Screens**: Home (wallet + box selection), Inventory, Transaction history.

## Demo user

- Starting **wallet balance: $500** (mock).
- Use the three tier cards to open boxes; balance decreases and items are added to Inventory and History.
