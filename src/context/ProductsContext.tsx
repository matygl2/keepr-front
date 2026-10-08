import React, { createContext, useContext, useMemo, useState } from 'react';
import { initialProducts } from '../data/mockData';
import { Product } from '../types';

interface ProductsContextValue {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, patch: Partial<Product>) => void;
}

const ProductsContext = createContext<ProductsContextValue | undefined>(undefined);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
  };

  const updateProduct = (id: string, patch: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  const value = useMemo(
    () => ({ products, addProduct, updateProduct }),
    [products]
  );

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return ctx;
}
