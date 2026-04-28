import { Router } from 'express';
import { prisma } from '../lib/db';
import { asyncHandler } from '../lib/asyncHandler';

export const fieldsRouter = Router();

fieldsRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const fields = await prisma.field.findMany({ orderBy: { distanceKm: 'asc' } });
    res.json(
      fields.map((f) => ({
        ...f,
        facilities: f.facilities ? f.facilities.split(',').map((s) => s.trim()).filter(Boolean) : [],
      })),
    );
  }),
);

fieldsRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = String(req.params.id);
    const field = await prisma.field.findUnique({ where: { id } });
    if (!field) return res.status(404).json({ error: 'Not found' });
    res.json({
      ...field,
      facilities: field.facilities ? field.facilities.split(',').map((s) => s.trim()).filter(Boolean) : [],
    });
  }),
);
