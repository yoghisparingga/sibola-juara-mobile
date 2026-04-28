import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/db';
import { requireAuth } from '../middleware/auth';

export const paymentsRouter = Router();
paymentsRouter.use(requireAuth);

const paySchema = z.object({
  bookingId: z.string(),
  method: z.string(),
});

paymentsRouter.post('/charge', async (req, res) => {
  const parsed = paySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const booking = await prisma.booking.findUnique({ where: { id: parsed.data.bookingId } });
  if (!booking) return res.status(404).json({ error: 'Booking not found' });
  if (booking.userId !== req.user!.userId) return res.status(403).json({ error: 'Forbidden' });

  const updated = await prisma.booking.update({
    where: { id: booking.id },
    data: { payment: 'paid', paymentMethod: parsed.data.method, status: 'confirmed' },
  });
  res.json({ success: true, booking: updated });
});
