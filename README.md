# Hotel Guest Management (PocketBase + React + TypeScript + Tailwind)

This archive contains a complete mini-project you can run locally.

## Quick start

1. Start PocketBase
   - download pocketbase binary and run `./pocketbase serve` inside `server/pocketbase`
   - open http://127.0.0.1:8090/_/ and create admin (admin@hotel.local / Admin@12345 suggested)
   - import `server/migrations/1700000000_init_guests.json` and optionally `server/seed/guests.csv`

2. Frontend
   ```bash
   cd client
   cp .env.example .env
   npm install
   npm run dev
   ```

Open http://127.0.0.1:5173
