import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/db';
import { requireAuth } from '../middleware/auth';
import { asyncHandler } from '../lib/asyncHandler';

export const bookingsRouter = Router();

bookingsRouter.use(requireAuth);

bookingsRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const userId = req.user!.userId;
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: { field: true, homeTeam: true, awayTeam: true },
      orderBy: { date: 'desc' },
    });
    res.json(bookings);
  }),
);

bookingsRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = String(req.params.id);
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { field: true, homeTeam: true, awayTeam: true },
    });
    if (!booking) return res.status(404).json({ error: 'Not found' });
    if (booking.userId !== req.user!.userId) return res.status(403).json({ error: 'Forbidden' });
    res.json(booking);
  }),
);

const createSchema = z.object({
  fieldId: z.string(),
  date: z.string().refine((v) => !Number.isNaN(new Date(v).getTime()), {
    message: 'Invalid date',
  }),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'startTime must be HH:MM'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'endTime must be HH:MM'),
  durationHours: z.number().int().positive(),
  paymentMethod: z.string().optional(),
  homeTeamId: z.string().optional(),
  awayTeamId: z.string().optional(),
  promoCode: z.string().optional(),
});

bookingsRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    if (parsed.data.startTime >= parsed.data.endTime) {
      return res.status(400).json({ error: 'startTime must be before endTime' });
    }

    const field = await prisma.field.findUnique({ where: { id: parsed.data.fieldId } });
    if (!field) return res.status(404).json({ error: 'Field not found' });

    const date = new Date(parsed.data.date);
    const conflict = await prisma.booking.findFirst({
      where: {
        fieldId: parsed.data.fieldId,
        date,
        status: { not: 'cancelled' },
        startTime: { lt: parsed.data.endTime },
        endTime: { gt: parsed.data.startTime },
      },
      select: { id: true, startTime: true, endTime: true },
    });
    if (conflict) {
      return res.status(409).json({
        error: 'Time slot is already booked for this field',
        conflict,
      });
    }

    const price = field.pricePerHour * parsed.data.durationHours;
    const serviceFee = Math.round(price * 0.0375);
    const discount = parsed.data.promoCode === 'WELCOME10' ? Math.round(price * 0.1) : 0;
    const total = price + serviceFee - discount;

    const booking = await prisma.booking.create({
      data: {
        userId: req.user!.userId,
        fieldId: parsed.data.fieldId,
        date,
        startTime: parsed.data.startTime,
        endTime: parsed.data.endTime,
        durationHours: parsed.data.durationHours,
        price,
        serviceFee,
        discount,
        total,
        paymentMethod: parsed.data.paymentMethod,
        homeTeamId: parsed.data.homeTeamId,
        awayTeamId: parsed.data.awayTeamId,
      },
    });

    res.status(201).json(booking);
  }),
);

bookingsRouter.patch(
  '/:id/cancel',
  asyncHandler(async (req, res) => {
    const id = String(req.params.id);
    const booking = await prisma.booking.findUnique({ where: { id } });
    if (!booking) return res.status(404).json({ error: 'Not found' });
    if (booking.userId !== req.user!.userId) return res.status(403).json({ error: 'Forbidden' });
    if (booking.status === 'completed' || booking.status === 'cancelled') {
      return res.status(400).json({ error: `Cannot cancel a ${booking.status} booking` });
    }
    const updated = await prisma.booking.update({
      where: { id: booking.id },
      data: { status: 'cancelled' },
    });
    res.json(updated);
  }),
);
