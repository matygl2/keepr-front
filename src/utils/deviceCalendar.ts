import * as Calendar from 'expo-calendar';
import { Platform } from 'react-native';
import { Product } from '../types';

const CALENDAR_TITLE = 'Keepr Warranties';

export async function requestCalendarPermission(): Promise<boolean> {
  const { status } = await Calendar.requestCalendarPermissions();
  return status === 'granted';
}

async function getDefaultSource() {
  if (Platform.OS === 'ios') {
    const defaultCalendar = Calendar.getDefaultCalendarSync();
    return defaultCalendar.source;
  }
  // Android has no single "default calendar" concept like iOS; fall back
  // to a local, phone-only account so we don't require the user to have
  // a Google account calendar already set up.
  return {
    isLocalAccount: true,
    name: CALENDAR_TITLE,
  };
}

async function getOrCreateKeeprCalendar(): Promise<Calendar.ExpoCalendar>{
  const calendars = await Calendar.getCalendars(Calendar.EntityTypes.EVENT);
  const existing = calendars.find((cal) => cal.title === CALENDAR_TITLE);
  if (existing) return existing;

  const source = await getDefaultSource();

  const newCalendar = await Calendar.createCalendar({
    title: CALENDAR_TITLE,
    color: '#7A1F28',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: Platform.OS === 'ios' ? (source as any).id : undefined,
    source: source as any,
    name: CALENDAR_TITLE,
    ownerAccount: Platform.OS === 'ios' ? (source as any).name : 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });

  return newCalendar;
}

/**
 * Creates an all-day reminder event on the product's warranty expiry date,
 * with a notification 1 day before. Returns the created event id, which
 * should be stored on the product (Product.calendarEventId) so it can be
 * removed later.
 */
export async function syncWarrantyToCalendar(product: Product): Promise<string> {
  const calendar = await getOrCreateKeeprCalendar();

  const startDate = new Date(`${product.warrantyExpiryDate}T09:00:00`);
  const endDate = new Date(`${product.warrantyExpiryDate}T10:00:00`);

  const event = await calendar.createEvent({
    title: `${product.name} warranty expires`,
    startDate,
    endDate,
    notes: `Your ${product.name} (bought at ${product.store}) warranty expires today. Purchased on ${product.purchaseDate}.`,
    alarms: [{ relativeOffset: -24 * 60 }], // 1 day before, in minutes
    timeZone: undefined,
  });

  return event.id;
}

export async function removeWarrantyFromCalendar(eventId: string): Promise<void> {
  try {
    const event = await Calendar.ExpoCalendarEvent.get(eventId);
    await event.delete();
  } catch {
    // Event may already have been removed by the user directly in their
    // calendar app — that's fine, we just clear our local reference.
  }
}
