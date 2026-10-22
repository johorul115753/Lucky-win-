import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = process.env.PORT || 4000;

// Safe demo API defaults. Configure CORS allowlists and real authentication before production.
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '20kb' }));
app.use(rateLimit({ windowMs: 60_000, limit: 100 }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'lucky-win-demo-api', mode: 'demo' });
});

// Intentionally in-memory and non-financial. This endpoint only validates the shape
// of a request; it does not verify payments, credit balances, or transfer money.
app.post('/api/demo/transactions', (req, res) => {
  const { type, method, amount, reference } = req.body ?? {};
  if (!['deposit', 'withdraw'].includes(type)) {
    return res.status(400).json({ error: 'type must be deposit or withdraw' });
  }
  if (!['bKash', 'Nagad', 'Rocket'].includes(method)) {
    return res.status(400).json({ error: 'unsupported demo payment method' });
  }
  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount) || numericAmount <= 0 || numericAmount > 1000000) {
    return res.status(400).json({ error: 'amount is outside demo limits' });
  }
  if (typeof reference !== 'string' || reference.trim().length < 3 || reference.length > 120) {
    return res.status(400).json({ error: 'reference is required' });
  }
  return res.status(202).json({
    accepted: true,
    mode: 'demo',
    status: 'pending_review',
    message: 'Demo request recorded by API. No money was transferred.',
    request: { type, method, amount: numericAmount, reference: reference.trim() }
  });
});

app.listen(PORT, () => console.log(`lucky win demo API listening on http://localhost:${PORT}`));
