import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/db';
import { requireAuth } from '../middleware/auth';
import { asyncHandler } from '../lib/asyncHandler';

export const paymentsRouter = Router();
paymentsRouter.use(requireAuth);

const paySchema = z.object({
  bookingId: z.string(),
  method: z.string(),
});

paymentsRouter.post(
  '/charge',
  asyncHandler(async (req, res) => {
    const parsed = paySchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

    const booking = await prisma.booking.findUnique({ where: { id: parsed.data.bookingId } });
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    if (booking.userId !== req.user!.userId) return res.status(403).json({ error: 'Forbidden' });
    if (booking.status === 'cancelled') {
      return res.status(400).json({ error: 'Cannot pay for a cancelled booking' });
    }
    if (booking.payment === 'paid') {
      return res.status(400).json({ error: 'Booking is already paid' });
    }

    const updated = await prisma.booking.update({
      where: { id: booking.id },
      data: { payment: 'paid', paymentMethod: parsed.data.method, status: 'confirmed' },
    });
    res.json({ success: true, booking: updated });
  }),
);
