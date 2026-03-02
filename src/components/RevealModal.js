import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { RARITY_COLORS, RARITY_LABELS } from '../data/mockData';

const { width } = Dimensions.get('window');

export default function RevealModal({ visible, tier, item, onClose }) {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const itemScale = useRef(new Animated.Value(0.3)).current;
  const itemOpacity = useRef(new Animated.Value(0)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const emojiRotate = useRef(new Animated.Value(0)).current;
  const emojiTranslateX = useRef(new Animated.Value(0)).current;
  const emojiTranslateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible || !item) return;

    scale.setValue(0);
    opacity.setValue(0);
    itemScale.setValue(0.3);
    itemOpacity.setValue(0);
    glowOpacity.setValue(0);
    emojiRotate.setValue(0);
    emojiTranslateX.setValue(0);
    emojiTranslateY.setValue(0);

    Animated.sequence([
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          tension: 60,
          friction: 8,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(400),
      Animated.parallel([
        Animated.spring(itemScale, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 6,
        }),
        Animated.timing(itemOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(glowOpacity, {
          toValue: 0.6,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(emojiRotate, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.loop(
            Animated.sequence([
              Animated.parallel([
                Animated.timing(emojiTranslateX, {
                  toValue: 1,
                  duration: 500,
                  useNativeDriver: true,
                }),
                Animated.timing(emojiTranslateY, {
                  toValue: 1,
                  duration: 500,
                  useNativeDriver: true,
                }),
              ]),
              Animated.parallel([
                Animated.timing(emojiTranslateX, {
                  toValue: 0,
                  duration: 500,
                  useNativeDriver: true,
                }),
                Animated.timing(emojiTranslateY, {
                  toValue: 0,
                  duration: 500,
                  useNativeDriver: true,
                }),
              ]),
            ])
          ),
        ]),
      ]),
    ]).start();
  }, [visible, item]);

  if (!item || !tier) return null;

  const rarityColor = RARITY_COLORS[item.rarity] || '#888';
  const rarityLabel = RARITY_LABELS[item.rarity] || item.rarity;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View style={[styles.backdrop, { opacity }]} />

        <Animated.View
          style={[
            styles.card,
            {
              transform: [{ scale }],
              borderColor: rarityColor,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.glow,
              {
                backgroundColor: rarityColor,
                opacity: glowOpacity,
              },
            ]}
          />
          <Text style={styles.cardTitle}>You got...</Text>
          <Animated.View
            style={[
              styles.itemContainer,
              {
                transform: [{ scale: itemScale }],
                opacity: itemOpacity,
              },
            ]}
          >
            <View style={[styles.itemCircle, { borderColor: rarityColor }]}>
              <Animated.Text
                style={[
                  styles.itemEmoji,
                  {
                    transform: [
                      {
                        rotate: emojiRotate.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0deg', '360deg'],
                        }),
                      },
                      {
                        translateX: emojiTranslateX.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 6],
                        }),
                      },
                      {
                        translateY: emojiTranslateY.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -8],
                        }),
                      },
                    ],
                  },
                ]}
              >
                {item.emoji}
              </Animated.Text>
            </View>
            <Text style={[styles.itemName, { color: rarityColor }]}>
              {item.name}
            </Text>
            <View style={[styles.rarityBadge, { backgroundColor: rarityColor }]}>
              <Text style={styles.rarityText}>{rarityLabel}</Text>
            </View>
          </Animated.View>
          <Text style={styles.tierInfo}>
            from {tier.name} · ${tier.price}
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Awesome!</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  card: {
    width: width * 0.85,
    backgroundColor: '#1a1a24',
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    borderWidth: 2,
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    top: -80,
    opacity: 0.3,
  },
  cardTitle: {
    color: '#888',
    fontSize: 16,
    marginBottom: 16,
  },
  itemContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  itemCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#0f0f14',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemEmoji: {
    fontSize: 48,
  },
  itemName: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  rarityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  rarityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  tierInfo: {
    color: '#666',
    fontSize: 13,
    marginBottom: 24,
  },
  closeButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
