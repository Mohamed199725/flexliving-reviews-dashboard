# Running & Local Setup Instructions

Project: flexliving-reviews-dashboard
Root folder contains: /backend and /frontend

Prerequisites:
- Node.js (v16+ recommended)
- npm (v8+ recommended)

## 1) Start backend (API + static frontend when built)
1. Open terminal
2. cd backend
3. npm install
4. npm run dev        # uses nodemon (for development)
   OR
   npm start          # runs node server.js (for production)

Default backend port: 3001
Test endpoint (backend running): http://localhost:4000/api/reviews/hostaway

## 2) Start frontend (development mode)
1. Open new terminal
2. cd frontend
3. npm install
4. npm start

Development frontend port: 3000
App URL: http://localhost:3000

Notes:
- The frontend fetches API endpoints at `/api/...`. When running both locally (backend on 3001, frontend on 3000)
- For a single production server: build frontend and let Express serve it 
- CORS is configured to allow requests from frontend on port 3000

## 3) Run single-server production mode (serve build via Express)
1. cd frontend
2. npm install
3. npm run build         # creates frontend/build
4. cd ../backend
5. npm install
6. npm start             # Express serves build + API

Now open: http://localhost:3001

## 4) Quick troubleshooting
- If `npm start` says "Missing script": ensure you're in the correct folder and that `package.json` includes a "start" script.
- To view server logs, run `npm run dev` in backend (requires nodemon).
- If ports are in use: change ports in backend/server.js and frontend configuration
- If frontend shows 0 reviews: check that backend is running on port 3001