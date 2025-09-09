# Hotel Guest Management (PocketBase + React + TypeScript + Tailwind)

## Setup & Run Instructions

### 1. Clone the repository
```
bash
git clone git@github.com:sassni/hotel-guest-management.git
cd hotel-guest-management
```

### 2. Install dependencies
```
npm install
```

### 3. Run PocketBase backend
```
Download PocketBase from https://pocketbase.io/docs/
Extract and run: ./pocketbase serve
   - download pocketbase binary and run `./pocketbase serve` inside `server/pocketbase`

PocketBase Admin UI will be available at: http://127.0.0.1:8090/_/
Use this login: Email: admin@hotel.local  | Password: Admin@12345 
   - open http://127.0.0.1:8090/_/ and create admin (admin@hotel.local / Admin@12345)
   - import `server/migrations/1700000000_init_guests.json` and optionally `server/seed/guests.csv`
```

### 4. Run frontend:
```
   bash
   cd client
   cp .env.example .env
   npm run dev
```

#### App will be available at - http://127.0.0.1:5173
