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
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

function InventoryCard({ item: entry }) {
  const { item, tier } = entry;
  const rarityColor = RARITY_COLORS[item.rarity] || '#888';
  const rarityLabel = RARITY_LABELS[item.rarity] || item.rarity;

  return (
    <View style={[styles.card, { borderLeftColor: rarityColor }]}>
      <View style={[styles.emojiWrap, { backgroundColor: rarityColor + '22' }]}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={[styles.rarityBadge, { backgroundColor: rarityColor }]}>
          <Text style={styles.rarityText}>{rarityLabel}</Text>
        </View>
        <Text style={styles.tier}>From {tier.name}</Text>
        <Text style={styles.date}>{formatDate(entry.revealedAt)}</Text>
      </View>
    </View>
  );
}

export default function InventoryScreen() {
  const { inventory } = useApp();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your inventory</Text>
      <Text style={styles.subtitle}>Unboxed items from blind boxes</Text>
      {inventory.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>📦</Text>
          <Text style={styles.emptyText}>No items yet</Text>
          <Text style={styles.emptyHint}>Open a blind box to collect items</Text>
        </View>
      ) : (
        <FlatList
          data={inventory}
          keyExtractor={(e) => e.id}
          renderItem={InventoryCard}
          contentContainerStyle={styles.list}
          numColumns={2}
          columnWrapperStyle={styles.row}
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
  row: { justifyContent: 'space-between', marginBottom: 12 },
  card: {
    width: '48%',
    backgroundColor: '#1a1a24',
    borderRadius: 12,
    padding: 12,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: '#2a2a38',
  },
  emojiWrap: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 8,
  },
  emoji: { fontSize: 28 },
  body: { alignItems: 'center' },
  name: { color: '#fff', fontSize: 14, fontWeight: '600', textAlign: 'center' },
  rarityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 6,
  },
  rarityText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  tier: { color: '#888', fontSize: 11, marginTop: 4 },
  date: { color: '#555', fontSize: 10, marginTop: 2 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyText: { color: '#888', fontSize: 16 },
  emptyHint: { color: '#555', fontSize: 13, marginTop: 4 },
});
