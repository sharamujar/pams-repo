# PAMS - Express.js Backend Project

## Overview
PAMS is an Express.js application built for modern web development.

## Project Structure
```
PAMS/
├── db/
│   ├── migrations/
│   ├── seeds/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── repositories/
│   ├── routes/
    └── views/

├── app.js
├── .env
├── .gitignore
├── package.json
└── README.md
```
## Data Flow Architecture

```
Client Request
    ↓
Express Router (routes/)
    ↓
Middleware (middleware/)
    ↓
Controller (controllers/)
    ↓
Repository Layer (repositories/)
    ↓
Database (database)
    ↓
Response back to Client
```

### Flow Description
- **Routes**: Define API endpoints
- **Middleware**: Handle authentication, validation, logging
- **Controllers**: Process requests and coordinate services
- **Repositories**: Handle data access and queries
- **Models**: Define database schemas
- **Database**: Persist and retrieve data

## Installation
```bash
npm install
```

## Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Configure `.env` file with required variables
4. Start the server: `npm start`

## Scripts
- `npm run dev` - Run in development mode
