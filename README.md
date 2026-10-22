# lucky win — demo starter

A mobile-first dark-luxury casino lobby **prototype** built with React/Vite and a small Express API scaffold.

## Important before production
- This starter is a UI/demo, not a production real-money gambling platform.
- Deposit/withdraw requests are simulated and do not move money.
- The displayed wallet number `01321685066` is user-supplied and **not verified as an official agent/merchant number**. Confirm authorization and ownership before displaying it publicly.
- No real game-provider APIs are connected. Provider names are lobby labels only.
- Do not accept real deposits or offer real-money betting until you have confirmed applicable licensing, age/identity checks, AML/KYC, privacy, payment-provider approval, responsible-gambling safeguards, and local legal requirements.
- Demo auth is intentionally not production-grade. Never store plain-text passwords. For production, use a vetted identity solution or Argon2/bcrypt, secure HttpOnly cookies, CSRF protection, rate limits, validation, audit logs, and server-side authorization.

## Run locally

### API
```bash
cd server
npm install
npm run dev
```
API runs on `http://localhost:4000`.

### Frontend
```bash
cd client
npm install
npm run dev
```
Open the Vite URL printed in the terminal. The UI uses local demo state and works without the API.

## Included
- Responsive lobby with requested categories and provider labels
- Sign in / registration modal (demo only)
- Deposit form: Send Money, bKash/Nagad/Rocket, TxnID, amount, sender number
- Withdrawal request form
- Demo wallet balance and transaction history
- Admin blueprint page showing sample pending requests
- Express health and mock transaction endpoints

## Production next steps
1. Select a lawful, licensed operating model and verify jurisdictional requirements.
2. Replace demo auth and in-memory data with a secure database-backed service.
3. Integrate only authorized game and payment-provider APIs, using their official documentation.
4. Add server-side ledger accounting with idempotency and reconciliation; never credit balances from a client-submitted TxnID alone.
5. Add automated tests, monitoring, backups, secrets management, and a security review.
