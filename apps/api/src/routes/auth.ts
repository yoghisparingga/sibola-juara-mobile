import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/db';
import { hashPassword, signToken, verifyPassword } from '../lib/auth';

export const authRouter = Router();

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

authRouter.post('/register', async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { name, email, phone, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ error: 'Email already registered' });

  const user = await prisma.user.create({
    data: { name, email, phone, passwordHash: await hashPassword(password) },
    select: { id: true, name: true, email: true, phone: true, avatarUrl: true, membership: true, points: true, createdAt: true },
  });

  const token = signToken({ userId: user.id, email: user.email });
  return res.status(201).json({ token, user });
});

authRouter.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const token = signToken({ userId: user.id, email: user.email });
  const { passwordHash: _ph, ...safeUser } = user;
  return res.json({ token, user: safeUser });
});
