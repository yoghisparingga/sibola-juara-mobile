import { Router } from 'express';
import { prisma } from '../lib/db';
import { requireAuth } from '../middleware/auth';

export const analyticsRouter = Router();
analyticsRouter.use(requireAuth);

analyticsRouter.get('/summary', async (req, res) => {
  const userId = req.user!.userId;
  const bookings = await prisma.booking.findMany({ where: { userId } });

  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((acc, b) => acc + b.total, 0);
  const totalHours = bookings.reduce((acc, b) => acc + b.durationHours, 0);
  const utilization = Math.min(100, Math.round((totalHours / 80) * 100));

  const byDate: Record<string, number> = {};
  for (const b of bookings) {
    const key = b.date.toISOString().slice(0, 10);
    byDate[key] = (byDate[key] || 0) + 1;
  }
  const bookingsOverview = Object.entries(byDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, bookings: count }));

  res.json({
    totalBookings,
    totalRevenue,
    utilization,
    bookingsOverview,
    fieldOccupancy: [
      { label: 'Booked', value: utilization, color: '#1E5BF5' },
      { label: 'Available', value: Math.max(0, 100 - utilization - 8), color: '#A5B4FC' },
      { label: 'Blocked', value: 8, color: '#E5E7EB' },
    ],
  });
});
