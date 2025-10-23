# FlexLiving Reviews Dashboard - Backend

Express.js API server for the FlexLiving Reviews Dashboard application.

## Overview
This backend serves as the API layer for managing property reviews, handling review approval states, and serving the React frontend in production.

## API Endpoints

### Reviews Management
- `GET /api/reviews/hostaway` - Fetch all normalized reviews
- `GET /api/reviews/approved` - Get list of approved review IDs
- `POST /api/reviews/approve` - Toggle approval status for a review

### Static File Serving
- Serves the React frontend build in production mode

## Features

- **Data Normalization**: Transforms Hostaway API data structure for frontend consumption
- **Approval System**: In-memory storage for approved review states
- **CORS Enabled**: Configured for cross-origin requests during development
- **Error Handling**: Consistent error responses across all endpoints

## Data Structure

### Review Object
```javascript
{
  id: number,
  listingName: string,
  type: string,
  channel: string,
  status: string,
  rating: number,
  text: string,
  categories: Array,
  submittedAt: string,
  guestName: string
}