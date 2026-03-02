import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { BLIND_BOX_TIERS, RARITY_COLORS, RARITY_LABELS } from '../data/mockData';
import RevealModal from '../components/RevealModal';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;
const CARD_WIDTH = (width - CARD_MARGIN * 4) / 3;

export default function HomeScreen({ onViewTransactions, onViewInventory }) {
  const { user, purchaseBlindBox, canAfford } = useApp();
  const [selectedTier, setSelectedTier] = useState(null);
  const [revealedItem, setRevealedItem] = useState(null);
  const [isRevealing, setIsRevealing] = useState(false);

  const handlePurchase = (tier) => {
    if (!canAfford(tier.price)) return;
    setSelectedTier(tier);
    setIsRevealing(true);
    const item = purchaseBlindBox(tier);
    setRevealedItem(item);
  };

  const closeReveal = () => {
    setSelectedTier(null);
    setRevealedItem(null);
    setIsRevealing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Wallet card */}
      <View style={styles.walletCard}>
        <Text style={styles.walletLabel}>Your balance</Text>
        <Text style={styles.walletAmount}>${user.walletBalance}</Text>
      </View>

      {/* Quick links */}
      <View style={styles.quickLinks}>
        <TouchableOpacity style={styles.linkButton} onPress={onViewInventory}>
          <Text style={styles.linkEmoji}>📦</Text>
          <Text style={styles.linkText}>Inventory</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton} onPress={onViewTransactions}>
          <Text style={styles.linkEmoji}>📋</Text>
          <Text style={styles.linkText}>History</Text>
        </TouchableOpacity>
      </View>

      {/* Section title */}
      <Text style={styles.sectionTitle}>Choose a box</Text>
      <Text style={styles.sectionSubtitle}>
        Each tier has different odds for rarer items
      </Text>

      {/* Blind box tiers */}
      <View style={styles.tiersRow}>
        {BLIND_BOX_TIERS.map((tier) => {
          const affordable = canAfford(tier.price);
          return (
            <TouchableOpacity
              key={tier.id}
              style={[
                styles.tierCard,
                { borderColor: tier.color },
                !affordable && styles.tierCardDisabled,
              ]}
              onPress={() => handlePurchase(tier)}
              disabled={!affordable}
              activeOpacity={0.8}
            >
              <Text style={styles.tierEmoji}>{tier.emoji}</Text>
              <Text style={styles.tierName}>{tier.name}</Text>
              <Text style={[styles.tierPrice, { color: tier.color }]}>
                ${tier.price}
              </Text>
              {!affordable && (
                <Text style={styles.insufficientLabel}>Insufficient funds</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Probability hint */}
      <View style={styles.hintBox}>
        <Text style={styles.hintTitle}>Odds by tier</Text>
        <Text style={styles.hintText}>
          Bronze: more Common • Silver: balanced • Gold: better Epic/Legendary
        </Text>
      </View>

      <RevealModal
        visible={isRevealing}
        tier={selectedTier}
        item={revealedItem}
        onClose={closeReveal}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f14' },
  content: { padding: 20, paddingBottom: 40 },
  walletCard: {
    backgroundColor: '#1a1a24',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2a2a38',
  },
  walletLabel: { color: '#888', fontSize: 14, marginBottom: 4 },
  walletAmount: { color: '#fff', fontSize: 28, fontWeight: '700' },
  quickLinks: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },
  linkButton: {
    flex: 1,
    backgroundColor: '#1a1a24',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a38',
  },
  linkEmoji: { fontSize: 22, marginBottom: 4 },
  linkText: { color: '#e0e0e0', fontSize: 13, fontWeight: '600' },
  sectionTitle: { color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 4 },
  sectionSubtitle: { color: '#888', fontSize: 14, marginBottom: 20 },
  tiersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  tierCard: {
    width: CARD_WIDTH,
    backgroundColor: '#1a1a24',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
  },
  tierCardDisabled: { opacity: 0.5 },
  tierEmoji: { fontSize: 36, marginBottom: 8 },
  tierName: { color: '#fff', fontSize: 13, fontWeight: '600', marginBottom: 4 },
  tierPrice: { fontSize: 18, fontWeight: '800' },
  insufficientLabel: { color: '#ef4444', fontSize: 10, marginTop: 4 },
  hintBox: {
    backgroundColor: '#1a1a24',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#2a2a38',
  },
  hintTitle: { color: '#a0a0a0', fontSize: 12, fontWeight: '600', marginBottom: 4 },
  hintText: { color: '#666', fontSize: 12 },
});
