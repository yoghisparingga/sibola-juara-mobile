import 'dotenv/config';
import cors from 'cors';
import express, { type ErrorRequestHandler } from 'express';

import { authRouter } from './routes/auth';
import { fieldsRouter } from './routes/fields';
import { bookingsRouter } from './routes/bookings';
import { paymentsRouter } from './routes/payments';
import { analyticsRouter } from './routes/analytics';

const app = express();

const corsOrigins = (process.env.CORS_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);

app.use(
  cors({
    origin: corsOrigins.length ? corsOrigins : true,
    credentials: true,
  }),
);
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'sibola-juara-api', time: new Date().toISOString() });
});

app.use('/auth', authRouter);
app.use('/fields', fieldsRouter);
app.use('/bookings', bookingsRouter);
app.use('/payments', paymentsRouter);
app.use('/analytics', analyticsRouter);

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error('[sibola-juara-api] unhandled error:', err);
  if (res.headersSent) return;
  res.status(500).json({ error: 'Internal server error' });
};
app.use(errorHandler);

const port = Number(process.env.PORT || 4000);
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`[sibola-juara-api] listening on :${port}`);
  });
}

export { app };
