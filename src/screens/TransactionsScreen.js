import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { RARITY_COLORS, RARITY_LABELS } from '../data/mockData';

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function TransactionRow({ item: tx }) {
  const rarityColor = RARITY_COLORS[tx.item.rarity] || '#888';
  const rarityLabel = RARITY_LABELS[tx.item.rarity] || tx.item.rarity;

  return (
    <View style={styles.row}>
      <View style={[styles.iconWrap, { backgroundColor: rarityColor + '22' }]}>
        <Text style={styles.iconEmoji}>{tx.item.emoji}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.itemName}>{tx.item.name}</Text>
        <Text style={styles.meta}>
          {tx.boxTier.name} · {rarityLabel}
        </Text>
        <Text style={styles.date}>{formatDate(tx.timestamp)}</Text>
      </View>
      <Text style={styles.price}>-${tx.price}</Text>
    </View>
  );
}

export default function TransactionsScreen() {
  const { transactions } = useApp();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction history</Text>
      <Text style={styles.subtitle}>
        User, box tier, item revealed, price, timestamp
      </Text>
      {transactions.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>📋</Text>
          <Text style={styles.emptyText}>No transactions yet</Text>
          <Text style={styles.emptyHint}>Open a blind box to see entries</Text>
        </View>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(t) => t.id}
          renderItem={TransactionRow}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f14', padding: 20 },
  title: { color: '#fff', fontSize: 22, fontWeight: '700', marginBottom: 4 },
  subtitle: { color: '#666', fontSize: 13, marginBottom: 20 },
  list: { paddingBottom: 40 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a24',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2a2a38',
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconEmoji: { fontSize: 24 },
  body: { flex: 1 },
  itemName: { color: '#fff', fontSize: 16, fontWeight: '600' },
  meta: { color: '#888', fontSize: 13, marginTop: 2 },
  date: { color: '#555', fontSize: 11, marginTop: 2 },
  price: { color: '#ef4444', fontSize: 16, fontWeight: '700' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyText: { color: '#888', fontSize: 16 },
  emptyHint: { color: '#555', fontSize: 13, marginTop: 4 },
});
