import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CategoryFilter from '../../components/CategoryFilter';
import ExpiringBanner from '../../components/ExpiringBanner';
import ProductCard from '../../components/ProductCard';
import StatsSummaryCard from '../../components/StatsSummaryCard';
import WarrantyAlertOverlay from '../../components/WarrantyAlertOverlay';
import { colors, fonts, spacing } from '../../constants/theme';
import { getExpiringSoonProducts, products } from '../../data/mockData';

export default function HomeScreen() {
  const [category, setCategory] = useState('All');
  const [alertVisible, setAlertVisible] = useState(false);
  const expiringSoon = useMemo(() => getExpiringSoonProducts(), []);

  useEffect(() => {
    if (expiringSoon.length > 0) {
      const timer = setTimeout(() => setAlertVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, [expiringSoon.length]);

  const filtered = useMemo(() => {
    if (category === 'All') return products;
    return products.filter((p) => p.category === category);
  }, [category]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <StatsSummaryCard />
            <ExpiringBanner count={expiringSoon.length} />
            <CategoryFilter selected={category} onSelect={setCategory} />
            <Text style={styles.sectionTitle}>Your belongings</Text>
          </View>
        }
      />

      <WarrantyAlertOverlay
        visible={alertVisible}
        product={expiringSoon[0] ?? null}
        onDismiss={() => setAlertVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  sectionTitle: {
    fontFamily: fonts.serif,
    fontSize: 22,
    color: colors.primary,
    marginBottom: spacing.md,
  },
});
