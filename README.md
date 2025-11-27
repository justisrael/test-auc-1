# 🎯 Real-Time Auction Server

A complete NestJS + PostgreSQL auction system with Server-Sent Events (SSE) for real-time bid updates.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
Make sure PostgreSQL is running, then:
```bash
npm run prisma:generate
npm run prisma:migrate
```

This will create the database schema with `Auction` and `Bid` tables.

### 3. Start Server
```bash
npm run start:dev
```

Server will run on `http://localhost:3000`

## 📡 API Endpoints

### Create Auction
```bash
POST /auctions
Content-Type: application/json

{
  "title": "Vintage Watch",
  "startPrice": 100,
  "description": "A beautiful vintage timepiece"
}
```

### Get All Auctions
```bash
GET /auctions
```

### Get Single Auction
```bash
GET /auctions/:id
```

### Place Bid
```bash
POST /bids
Content-Type: application/json

{
  "auctionId": "uuid-here",
  "bidderId": "bidder-1",
  "amount": 150
}
```

### SSE Stream (Real-time Bids)
```bash
GET /bids/events
```

## 🧪 Testing with Client

Open `client-example.html` in your browser to:
- Connect to SSE stream
- Create auctions
- Place bids
- See real-time updates

## 🏗 Project Structure

```
src/
├── main.ts                          # Bootstrap
├── app.module.ts                    # Root module
├── prisma.service.ts                # Database client
└── auction/
    ├── auction.module.ts            # Auction module
    ├── auction.controller.ts        # REST endpoints
    ├── auction.service.ts           # Business logic
    └── bid-events.service.ts        # SSE event stream
```

## 🔧 Environment Variables

Edit `.env`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/auction_db"
PORT=3000
```

## 📦 Tech Stack

- **NestJS** - Progressive Node.js framework
- **Prisma** - Type-safe ORM
- **PostgreSQL** - Relational database
- **RxJS** - Reactive programming for SSE
- **TypeScript** - Type safety

## 🎯 Features

✅ Create and manage auctions  
✅ Place bids with validation  
✅ Real-time bid updates via SSE  
✅ Automatic highest bid tracking  
✅ Transaction-safe bid processing  
✅ CORS enabled for client apps  

## 📝 Example JavaScript Client

```javascript
// Connect to SSE
const sse = new EventSource('http://localhost:3000/bids/events');

sse.onmessage = (e) => {
  const bid = JSON.parse(e.data);
  console.log('New bid:', bid);
  // { auctionId, bidderId, amount, timestamp }
};

// Place a bid
await fetch('http://localhost:3000/bids', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    auctionId: 'your-auction-id',
    bidderId: 'user-123',
    amount: 200
  })
});
```

## 🛠 Development

```bash
# Watch mode
npm run start:dev

# Production build
npm run build
npm run start:prod

# Database migrations
npm run prisma:migrate
```

## 📄 License

MIT
