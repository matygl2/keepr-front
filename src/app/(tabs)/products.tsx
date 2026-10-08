import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryFilter from '../../components/CategoryFilter';
import ProductCard from '../../components/ProductCard';
import { colors, fonts, spacing } from '../../constants/theme';
import { useProducts } from '../../context/ProductsContext';

export default function ProductsScreen() {
  const { products } = useProducts();
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    if (category === 'All') return products;
    return products.filter((p) => p.category === category);
  }, [category, products]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Products</Text>
            <CategoryFilter selected={category} onSelect={setCategory} />
          </View>
        }
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
  title: {
    fontFamily: fonts.serif,
    fontSize: 28,
    color: colors.primary,
    marginBottom: spacing.md,
  },
});
