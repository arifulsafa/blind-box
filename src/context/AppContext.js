import React, { createContext, useContext, useReducer } from 'react';
import { openBlindBox } from '../data/mockData';

const initialState = {
  // Demo user with starting balance
  user: {
    id: 'user_demo_1',
    name: 'Demo User',
    walletBalance: 500, // Start with $500 for demo
  },
  inventory: [], // { id, item, tier, revealedAt }
  transactions: [], // { id, userId, boxTier, item, price, timestamp }
};

function appReducer(state, action) {
  switch (action.type) {
    case 'PURCHASE_AND_REVEAL': {
      const { tier, item } = action.payload;
      const price = tier.price;
      const newBalance = state.user.walletBalance - price;

      if (newBalance < 0) {
        return state; // Insufficient funds, no change
      }

      const transaction = {
        id: `tx_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        userId: state.user.id,
        boxTier: { id: tier.id, name: tier.name, price: tier.price },
        item: { ...item },
        price,
        timestamp: new Date().toISOString(),
      };

      const inventoryEntry = {
        id: `inv_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        item: { ...item },
        tier: { id: tier.id, name: tier.name },
        revealedAt: transaction.timestamp,
      };

      return {
        ...state,
        user: {
          ...state.user,
          walletBalance: newBalance,
        },
        inventory: [inventoryEntry, ...state.inventory],
        transactions: [transaction, ...state.transactions],
      };
    }

    default:
      return state;
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const purchaseBlindBox = (tier) => {
    const { item } = openBlindBox(tier);
    dispatch({ type: 'PURCHASE_AND_REVEAL', payload: { tier, item } });
    return item;
  };

  const canAfford = (price) => state.user.walletBalance >= price;

  return (
    <AppContext.Provider
      value={{
        user: state.user,
        inventory: state.inventory,
        transactions: state.transactions,
        purchaseBlindBox,
        canAfford,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
