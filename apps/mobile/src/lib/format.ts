export function formatIDR(value: number): string {
  if (value >= 1_000_000) return `Rp ${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 2).replace(/\.00$/, '')}M`;
  if (value >= 1_000) return `Rp ${(value / 1_000).toFixed(value % 1_000 === 0 ? 0 : 1).replace(/\.0$/, '')}K`;
  return `Rp ${value.toLocaleString('id-ID')}`;
}

export function formatIDRFull(value: number): string {
  return `Rp ${value.toLocaleString('id-ID')}`;
}

export function formatDateLong(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatDateShort(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatTime(time: string): string {
  return time;
}
