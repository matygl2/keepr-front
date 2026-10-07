import { useState } from 'react';
import { Alert } from 'react-native';
import { useProducts } from '../context/ProductsContext';
import { Product } from '../types';
import {
  removeWarrantyFromCalendar,
  requestCalendarPermission,
  syncWarrantyToCalendar,
} from '../utils/deviceCalendar';

export function useCalendarSync(product: Product) {
  const { updateProduct } = useProducts();
  const [loading, setLoading] = useState(false);
  const synced = !!product.calendarEventId;

  const toggle = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (synced && product.calendarEventId) {
        await removeWarrantyFromCalendar(product.calendarEventId);
        updateProduct(product.id, { calendarEventId: undefined });
      } else {
        const granted = await requestCalendarPermission();
        if (!granted) { 
          Alert.alert(
            'Calendar no disponible',
            'Los recordatorios de garantía requieren una development build de Keepr. Esta función no está disponible en Expo Go.'
          );
          return;
        }
        const eventId = await syncWarrantyToCalendar(product);
        updateProduct(product.id, { calendarEventId: eventId });
        Alert.alert(
          'Added to Calendar',
          `A reminder for ${product.name}'s warranty was added to your device calendar, 1 day before it expires.`
        );
      }
    } catch (error) {
      Alert.alert(
        'Calendar no disponible',
        'Los recordatorios de garantía requieren una development build de Keepr. Esta función no está disponible en Expo Go.'
      );
    } finally {
      setLoading(false);
    }
  };

  return { synced, loading, toggle };
}
