import { create } from 'zustand';

interface BookingDraft {
  fieldId?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  durationHours?: number;
  paymentMethod?: string;
  promoCode?: string;
  step: number;
}

interface BookingState extends BookingDraft {
  setField: (id: string) => void;
  setDateTime: (d: { date: string; startTime: string; endTime: string; durationHours: number }) => void;
  setPaymentMethod: (m: string) => void;
  setPromoCode: (c: string) => void;
  next: () => void;
  prev: () => void;
  goTo: (step: number) => void;
  reset: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  step: 1,
  setField: (fieldId) => set({ fieldId }),
  setDateTime: (d) => set(d),
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
  setPromoCode: (promoCode) => set({ promoCode }),
  next: () => set((s) => ({ step: Math.min(4, s.step + 1) })),
  prev: () => set((s) => ({ step: Math.max(1, s.step - 1) })),
  goTo: (step) => set({ step }),
  reset: () => set({ step: 1, fieldId: undefined, date: undefined, startTime: undefined, endTime: undefined, durationHours: undefined, paymentMethod: undefined, promoCode: undefined }),
}));
