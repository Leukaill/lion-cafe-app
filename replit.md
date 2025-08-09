# Overview

Lion's Café & Bakery is a full-stack Progressive Web Application (PWA) for an artisan café and bakery. The application provides customers with a premium digital experience featuring menu browsing, online ordering with Stripe payment processing, table reservations, and user authentication through Firebase. The application emphasizes elegant design with a dark theme, glassmorphism UI elements, and mobile-first responsive design principles.

# User Preferences

Preferred communication style: Simple, everyday language.
Design preferences: 
- White background with detached components
- iOS-style floating navigation with rounded corners (24px border-radius)
- Components should have proper spacing from screen edges
- Navigation should be detached from edges with 20px margins
- Floating navigation bar should not collide with content
- Dynamic Island-style header design with dark rounded pill shape (28px border-radius)
- Clean, modern UI with proper spacing and glassmorphism effects

# System Architecture

## Frontend Architecture

The frontend is built as a single-page application using React with TypeScript, leveraging several key architectural decisions:

- **React Router**: Uses Wouter for lightweight client-side routing with pages for Home, Menu, Reservations, Checkout, and Story
- **State Management**: Context-based state management with custom hooks for cart functionality and authentication
- **UI Framework**: Shadcn/ui components with Radix UI primitives for accessibility, styled with Tailwind CSS featuring custom brand colors and glassmorphism effects
- **PWA Features**: Service worker implementation with offline caching, installable app manifest, and push notification support
- **Progressive Enhancement**: Mobile-first responsive design with touch-friendly interfaces

## Backend Architecture

The backend follows a REST API pattern built on Express.js with TypeScript:

- **API Layer**: Express.js server with middleware for request logging, JSON parsing, and error handling
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development (designed to scale to database implementations)
- **Route Structure**: RESTful endpoints for users, menu items, orders, and reservations with proper HTTP status codes
- **Development Tools**: Vite integration for hot module replacement and development bundling

## Data Architecture

The application uses a PostgreSQL-compatible schema designed with Drizzle ORM:

- **User Management**: User profiles linked to Firebase authentication with Stripe customer integration
- **Menu System**: Categorized menu items with pricing, allergen information, and availability status
- **Order Processing**: Order management with item tracking, status updates, and payment integration
- **Reservation System**: Table booking with party size, special requests, and status management

## Authentication & Authorization

Authentication is handled through Firebase Authentication with database synchronization:

- **Firebase Integration**: Email/password and Google OAuth sign-in options
- **User Sync**: Automatic user creation in local database upon Firebase authentication
- **Session Management**: Firebase auth state persistence with React context providers
- **Protected Routes**: Client-side route protection based on authentication status

## Payment Processing

Stripe integration provides secure payment processing:

- **Stripe Elements**: Frontend payment form with PCI compliance
- **Payment Intents**: Server-side payment intent creation with order tracking
- **Customer Management**: Stripe customer creation linked to user accounts
- **Order Fulfillment**: Payment confirmation triggers order status updates

# External Dependencies

## Payment Services
- **Stripe**: Payment processing with React Stripe.js for frontend forms and server-side payment intent management

## Authentication
- **Firebase**: User authentication, session management, and potential push notifications through Firebase Cloud Messaging

## Database
- **PostgreSQL**: Primary database (via Neon for serverless deployment) with Drizzle ORM for type-safe database operations
- **Connection Pooling**: Neon Serverless driver for efficient database connections

## UI & Design
- **Tailwind CSS**: Utility-first styling with custom brand theme and responsive design
- **Radix UI**: Accessible component primitives for complex UI interactions
- **Lucide React**: Icon library for consistent iconography

## Development & Build Tools
- **Vite**: Frontend build tool with hot module replacement and optimized production builds
- **TypeScript**: Type safety across frontend, backend, and shared schemas
- **ESBuild**: Server-side bundling for production deployment

## Hosting & Deployment
- **Replit**: Development environment with integrated deployment capabilities
- **Service Worker**: Browser caching and offline functionality for improved performance