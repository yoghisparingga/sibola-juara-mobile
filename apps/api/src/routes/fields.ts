import { Router } from 'express';
import { prisma } from '../lib/db';

export const fieldsRouter = Router();

fieldsRouter.get('/', async (_req, res) => {
  const fields = await prisma.field.findMany({ orderBy: { distanceKm: 'asc' } });
  res.json(
    fields.map((f) => ({
      ...f,
      facilities: f.facilities ? f.facilities.split(',').map((s) => s.trim()).filter(Boolean) : [],
    })),
  );
});

fieldsRouter.get('/:id', async (req, res) => {
  const field = await prisma.field.findUnique({ where: { id: req.params.id } });
  if (!field) return res.status(404).json({ error: 'Not found' });
  res.json({
    ...field,
    facilities: field.facilities ? field.facilities.split(',').map((s) => s.trim()).filter(Boolean) : [],
  });
});
