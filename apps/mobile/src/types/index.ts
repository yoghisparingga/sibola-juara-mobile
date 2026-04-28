export type BookingStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed';
export type PaymentStatus = 'paid' | 'pending' | 'failed' | 'refunded';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  membership: 'free' | 'pro' | 'premium';
  points: number;
  joinedAt: string;
}

export interface Field {
  id: string;
  name: string;
  address: string;
  distanceKm: number;
  rating: number;
  reviews: number;
  pricePerHour: number;
  imageUrl: string;
  facilities: string[];
  openHour: string;
  closeHour: string;
  isOpen: boolean;
  latitude: number;
  longitude: number;
}

export interface Team {
  id: string;
  name: string;
  logoUrl?: string;
  memberCount: number;
}

export interface Booking {
  id: string;
  fieldId: string;
  fieldName: string;
  date: string;
  startTime: string;
  endTime: string;
  durationHours: number;
  price: number;
  serviceFee: number;
  discount: number;
  total: number;
  status: BookingStatus;
  payment: PaymentStatus;
  paymentMethod?: string;
  homeTeam?: Team;
  awayTeam?: Team;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  unread: boolean;
  createdAt: string;
}

export interface AnalyticsSnapshot {
  totalBookings: number;
  totalRevenue: number;
  utilization: number;
  bookingsOverview: { date: string; bookings: number }[];
  fieldOccupancy: { label: string; value: number; color: string }[];
}
