const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const Stripe = require('stripe');
const multer = require('multer');
const upload = multer({ dest: 'proofs/' }); // Proof upload folder

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_PATH = path.join(__dirname, 'payments.json');
const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY || '';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';
const CLIENT_SUCCESS_URL = process.env.CLIENT_SUCCESS_URL || 'http://localhost:3000/success.html';
const CLIENT_CANCEL_URL = process.env.CLIENT_CANCEL_URL || 'http://localhost:3000/cancel.html';
const API_BASE = process.env.API_BASE || 'http://localhost:3001';

const stripe = STRIPE_SECRET ? new Stripe(STRIPE_SECRET) : null;

app.use(bodyParser.json());

// List all payments
app.get('/api/payment-requests', (req, res) => {
  const db = readDb();
  res.json({ payments: db.payments });
});

// Basic CORS for local development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

function readDb() {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  } catch (e) {
    return { payments: [] };
  }
}

function writeDb(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

function generateReference(idNumber) {
  const rand = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `REF-${idNumber}-${rand}`;
}

// Create payment request (pending admin approval)
app.post('/api/payment-requests', (req, res) => {
  const { firstName, lastName, email, phone, idNumber, amount, method } = req.body || {};
  if (!firstName || !lastName || !email || !phone || !idNumber || !amount || !method) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const db = readDb();
  const reference = generateReference(idNumber);
  const record = {
    reference,
    firstName,
    lastName,
    email,
    phone,
    idNumber,
    amount: Number(amount),
    method,
    status: 'pending_admin',
    createdAt: new Date().toISOString()
  };
  db.payments.push(record);
  writeDb(db);
  res.json({ reference, status: record.status });
});

// Get status by reference
app.get('/api/payment-requests/:reference', (req, res) => {
  const { reference } = req.params;
  const db = readDb();
  const record = db.payments.find(p => p.reference === reference);
  if (!record) return res.status(404).json({ error: 'Not found' });
  res.json({ reference: record.reference, status: record.status, amount: record.amount, method: record.method, idNumber: record.idNumber });
});

// Admin approve
app.post('/api/payment-requests/:reference/approve', (req, res) => {
  const { reference } = req.params;
  const db = readDb();
  const record = db.payments.find(p => p.reference === reference);
  if (!record) return res.status(404).json({ error: 'Not found' });
  record.status = 'approved';
  record.approvedAt = new Date().toISOString();
  writeDb(db);
  res.json({ reference: record.reference, status: record.status });
});

// Stripe placeholder: create checkout session (only when approved)
app.post('/api/payment-requests/:reference/checkout', async (req, res) => {
  const { reference } = req.params;
  const db = readDb();
  const record = db.payments.find(p => p.reference === reference);
  if (!record) return res.status(404).json({ error: 'Not found' });
  if (record.status !== 'approved') return res.status(409).json({ error: 'Not approved by admin' });
  if (!stripe) {
    return res.status(500).json({ error: 'Stripe not configured. Set STRIPE_SECRET_KEY env.' });
  }
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: record.email,
      metadata: {
        reference: record.reference,
        idNumber: record.idNumber
      },
      line_items: [
        {
          price_data: {
            currency: 'R',
            product_data: { name: `Logistics Service (${record.reference})` },
            unit_amount: Math.round(record.amount * 100)
          },
          quantity: 1
        }
      ],
      success_url: CLIENT_SUCCESS_URL + `?reference=${encodeURIComponent(reference)}`,
      cancel_url: CLIENT_CANCEL_URL + `?reference=${encodeURIComponent(reference)}`
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Stripe webhook to confirm payment
app.post('/api/payment-webhook', express.raw({ type: 'application/json' }), (req, res) => {
  if (!stripe || !STRIPE_WEBHOOK_SECRET) {
    return res.sendStatus(200);
  }
  let event;
  try {
    const sig = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const reference = session.metadata && session.metadata.reference;
    if (reference) {
      const db = readDb();
      const record = db.payments.find(p => p.reference === reference);
      if (record) {
        record.status = 'paid';
        record.paidAt = new Date().toISOString();
        writeDb(db);
      }
    }
  }
  res.sendStatus(200);
});

// Endpoint to upload proof of payment
app.post('/api/proof-upload', upload.single('proof'), (req, res) => {
  const reference = req.body.reference;
  if (!reference || !req.file) return res.status(400).json({ error: 'Reference and proof required' });

  // Attach proof file to payment record
  const db = readDb();
  const record = db.payments.find(p => p.reference === reference);
  if (!record) return res.status(404).json({ error: 'Payment not found' });

  // Save filename or file path
  record.proof = req.file.filename;
  writeDb(db);

  res.json({ success: true });
});

// Webhook endpoint for bank notifications (stub/example)
app.post('/api/bank-webhook', express.json(), (req, res) => {
  // Bank should send { reference: 'REF-...', amount: 100.00, ... }
  const { reference, amount } = req.body;
  if (!reference) return res.status(400).json({ error: 'Reference required' });

  const db = readDb();
  const record = db.payments.find(p => p.reference === reference);

  if (!record) return res.status(404).json({ error: 'Payment not found' });
  if (record.amount != amount) return res.status(400).json({ error: 'Amount mismatch' });

  record.status = 'paid';
  record.paidAt = new Date().toISOString();
  writeDb(db);

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});