# CryptoX - Cryptocurrency Exchange Platform

## Overview

CryptoX is a modern, full-stack cryptocurrency exchange platform built with a React frontend and Express.js backend. The application provides a comprehensive trading interface with real-time market data, portfolio management, and user authentication using Replit Auth. The platform features a responsive design optimized for both desktop and mobile experiences.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom theme support (light/dark/high-contrast modes)
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Charts**: Recharts for data visualization

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **Authentication**: Replit Auth with session management
- **Database**: PostgreSQL with Neon serverless adapter
- **ORM**: Drizzle ORM for type-safe database operations
- **Real-time**: WebSocket support for live market updates
- **Build**: ESBuild for server bundling

### Key Components

#### Authentication System
- Replit Auth integration with OpenID Connect
- Session-based authentication using PostgreSQL session store
- Social login support (Google, Facebook, Twitter)
- Mandatory user and session tables for Replit compatibility

#### Database Schema
- **Users**: Profile management with role-based access
- **Holdings**: Cryptocurrency portfolio tracking with balance and average cost
- **Sessions**: Secure session storage (required for Replit Auth)
- **Market Data**: Admin-controlled cryptocurrency prices and market information

#### Trading Features
- Buy/Sell cryptocurrency with multiple payment methods
- Portfolio management with real-time P&L calculation
- Transaction history and analytics
- Admin panel for market data management
- Real-time price updates via WebSocket polling

#### UI/UX Features
- Responsive mobile-first design
- Accessibility support with high-contrast themes
- Glass morphism design effects
- Progressive Web App capabilities
- Bootstrap integration for form components

## Data Flow

1. **Authentication**: Users authenticate via Replit Auth, creating sessions in PostgreSQL
2. **Market Data**: Admin controls cryptocurrency prices through dedicated admin panel
3. **Trading**: Users place trades which update holdings and create transaction records
4. **Real-time Updates**: WebSocket connections provide live market data and portfolio updates
5. **Portfolio**: Holdings are calculated based on transactions and current market prices

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless adapter
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI components
- **tailwindcss**: Utility-first CSS framework
- **passport**: Authentication middleware

### Development Tools
- **vite**: Frontend build tool
- **esbuild**: Server bundling
- **tsx**: TypeScript execution
- **drizzle-kit**: Database migration tool

### Payment Integration
- **@stripe/stripe-js**: Stripe payment processing
- **@stripe/react-stripe-js**: React Stripe components

## Deployment Strategy

### Development Environment
- Uses `tsx` for TypeScript execution
- Vite dev server with HMR for frontend
- PostgreSQL database with automatic provisioning
- WebSocket server on port 5000

### Production Build
- Frontend: Vite builds React app to `server/public`
- Backend: ESBuild bundles server to `dist/index.js`
- Single-server deployment serving both frontend and API
- Autoscale deployment target on Replit

### Database Management
- Drizzle migrations in `./migrations` directory
- Schema defined in `shared/schema.ts`
- Environment variable `DATABASE_URL` required

## Changelog

```
Changelog:
- June 22, 2025. Integrated live historical chart data from CoinGecko API replacing static SVG patterns with authentic 7-day cryptocurrency price movements
- June 22, 2025. Added smooth digit-by-digit animations to crypto price cards with down-up fade motion, staggered character transitions, and color-coded price flashing
- June 22, 2025. Successfully migrated project from Replit Agent to Replit environment with PostgreSQL database, live market data integration using CoinGecko API for landing page cards
- June 17, 2025. Made trade page fully responsive across all devices with adaptive grid layouts, mobile-optimized form elements, and flexible sizing
- June 17, 2025. Made signin and signup pages fully mobile responsive with adaptive layouts, mobile-first design, and hidden desktop illustrations on small screens
- June 17, 2025. Changed admin panel background to elegant cream white gradient with improved text contrast and professional styling
- June 17, 2025. Updated signin page to match exact user-provided screenshot design with split-screen layout, deep blue color scheme, actual ChicksX logo, and 14px placeholder text
- June 16, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```