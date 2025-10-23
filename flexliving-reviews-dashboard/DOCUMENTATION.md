# FlexLiving Reviews Dashboard - Technical Documentation

## 📋 Project Overview
A full-stack web application for managing property reviews, allowing managers to approve reviews for public display and providing a clean public-facing interface for guests.

## 🏗️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Material-UI (MUI)** - Professional UI components and styling
- **React Router** - Client-side routing for navigation
- **Fetch API** - Native HTTP client for API communication
- **Create React App** for toolchain and building

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **CORS** - Cross-origin resource sharing middleware

## 📁 Project Structure 
Built with **Create React App** frontend and **Express.js** backend:
- `frontend/public/` - Static assets and HTML template
- `frontend/src/pages/` - Dashboard (manager) and PropertyPage (public)
- `frontend/src/components/` - Reusable ReviewCard component
- `frontend/src/api/` - API service layer with fetch calls
- `backend/` - Express server with review management API

## 🎯 Key Design & Logic Decisions

### 1. API Architecture Design
- **Centralized API Layer**: All API calls through `api.js` for maintainability
- **Fetch API Choice**: Used native browser `fetch()` instead of external libraries like axios
- **Error Handling**: Simple try-catch with fallback empty arrays for robustness

### 2. Component Reusability Strategy  
- **Single ReviewCard Component**: Used across both Dashboard and PropertyPage
- **Props-based Customization**: Same component handles both approved states via props
- **Separation of Concerns**: Display logic in components, data logic in API layer

### 3. State Management Approach
- **Local Component State**: Used React hooks (useState/useEffect) for UI state
- **Backend Persistence**: Approved review IDs stored in backend memory
- **URL-as-State**: Property pages use React Router URL parameters

### 4. Data Normalization Logic
- **Consistent Data Structure**: Transformed Hostaway API format to uniform frontend format
- **Rating Calculations**: Automated rating calculations for missing values
- **Metadata Enrichment**: Added channel and approval status to raw data

### 5. Data Flow Architecture
- **Unidirectional Flow**: Clear data flow from backend to frontend components
- **Real-time Updates**: Approval toggles immediately reflect in UI
- **Public Filtering**: Property pages automatically show only approved reviews

### 6. Backend Design Decisions
- **RESTful Endpoints**: Clean API structure matching frontend needs
- **CORS Configuration**: Properly configured for local development
- **Mock Data Ready**: Structured to easily switch from mock data to real API

### 7. Routing & Access Control
- URL-based Separation: `/` for managers, `/property/:name` for public
- Automatic Filtering: Public routes only show approved content
- Shareable Links: Direct URLs to specific property review pages

## Core Features Implemented

### Manager Dashboard (/)
- View all reviews with filtering (rating, property, channel)
- Approval toggle system with persistent state
- Property statistics and overview
- Clean, intuitive management interface

### Public Property Pages (/property/:listingName)
- Display only manager-approved reviews
- Clean, guest-focused design
- Direct shareable URLs
- No management controls - read only

## UI/UX Design Approach
- **Clean & Professional**: Material-UI components for consistent, modern interface
- **User-Friendly**: Intuitive filtering, clear approval toggles, easy navigation
- **Responsive Design**: Works well on different screen sizes
- **Visual Hierarchy**: Clear separation between manager dashboard and public pages

## Development Approach
- **Component-Driven Development**: Built reusable components before page assembly
- **API-First Design**: Backend endpoints developed and tested before frontend integration
- **Progressive Enhancement**: Core functionality first, then additional features

## API Behaviors

### GET /api/reviews/hostaway
- Response: `{ status: 'success', result: Array }`
- Data Source: Mock data following Hostaway API structure
- Normalization: Automatically calculates missing ratings, adds metadata
- Ready for Production: Structure prepared for real Hostaway API integration

### GET /api/reviews/approved
- Response: `{ status: 'success', approved: Array }`
- Data: Returns array of approved review IDs
- Persistence: Uses in-memory Set (upgradable to database)
- Usage: Frontend filters reviews based on returned IDs

### POST /api/reviews/approve
- Payload: `{ reviewId: number, approved: boolean }`
- Action: Toggles review approval status in backend memory
- Response: `{ status: 'success', approved: Array }` (updated list)
- Real-time: Frontend immediately reflects state changes

### Error Handling
- Consistent Format: All endpoints return `{ status: 'success'|'error', ... }`
- Graceful Fallbacks: Empty arrays returned on errors
- CORS Configured: Properly handles cross-origin requests from frontend

## Google Reviews Integration Findings

### Challenges Identified
- Place ID Mapping: Each property needs Google Place ID
- API Costs: $0.032 per request with daily quotas
- Data Structure: Different schema than Hostaway API
- Authentication: API key security and management

### Recommendation
Implement as Phase 2 project after core system validation. Estimated 2-3 weeks for proper integration with caching and error handling.

## Production Readiness
- Environment variables prepared for real API credentials
- Error handling implemented throughout
- Ready to switch from mock data to real Hostaway API
- Scalable architecture for additional review channels

## Test Requirements Met
- Hostaway API integration (mocked with proper normalization)
- Manager dashboard with filtering and approval
- Public property pages showing only approved reviews
- Clean, modern and professional UI using Material-UI
- Google Reviews exploration documented
- Code clarity and proper structure

---

*This is the Documentation for FlexLiving Developer Assessment Submission*
