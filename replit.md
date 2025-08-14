# Overview

This is a full-stack construction company website for Advanced Design & Contracting Co. (ADCC). The application features a modern website with sections for services, projects, company information, blog, and contact form. Originally built with React 18 + Vite + Express.js, it's currently being migrated to Next.js 15 with React 19 for improved performance, SEO, and modern development features.

## Migration Status (COMPLETED - August 14, 2025)
- **Previous State**: React 18 + Vite + Express.js backend 
- **Current State**: Next.js 15 + React 19 (App Router) ✅
- **Completed**: Full migration to Next.js App Router structure, removed Express/Vite setup, created Next.js API routes
- **Server**: Running on localhost:5000 with Next.js dev server
- **Notes**: Cleaned up project structure, created contact API route, fixed all import issues
- **Arabic Font**: Fixed Arabic font (Almarai) support using Next.js Google Fonts with proper RTL styling
- **Hero Background**: Updated with construction timelapse GIF without text overlay

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: Next.js 15 with React 19 and TypeScript for modern development with App Router
- **Routing**: Next.js App Router for file-based routing and server components
- **Styling**: Tailwind CSS with custom design system variables and shadcn/ui component library for consistent, professional UI components
- **State Management**: TanStack Query (React Query) for server state management and API calls
- **Form Handling**: React Hook Form with Zod validation for type-safe form validation and submission
- **Build Tool**: Next.js with Turbopack for optimized development and production builds

## Backend Architecture
- **Framework**: Next.js API Routes with TypeScript for server-side functionality
- **Storage**: In-memory storage implementation for contact data (demo purposes)
- **API Structure**: Next.js API routes for contact form submissions and retrieval (/api/contacts)
- **Development**: Next.js dev server with hot module replacement

## Data Storage
- **Current Implementation**: Memory-based storage using a custom storage interface
- **Database Ready**: PostgreSQL schema defined with Drizzle ORM, ready for database connection
- **Schema**: Contact table with fields for personal information, service type, and inquiry details
- **Migration Support**: Drizzle migrations configured for database schema management

## Authentication and Authorization
- **Current State**: No authentication system implemented
- **Design**: Contact form submissions are open and do not require authentication
- **Future Considerations**: Admin interface could be added later for viewing submitted contacts

## Design System
- **Component Library**: shadcn/ui with Radix UI primitives for accessible, customizable components
- **Theme**: Custom CSS variables for consistent color scheme and typography
- **Typography**: Inter font family with custom font loading
- **Responsive Design**: Mobile-first approach with Tailwind's responsive utilities
- **Animations**: CSS transitions and Intersection Observer API for scroll-triggered animations

# External Dependencies

## UI and Styling
- **shadcn/ui**: Complete UI component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Radix UI**: Headless UI components for accessibility and functionality
- **Lucide React**: Icon library for consistent iconography

## Development Tools
- **Vite**: Build tool and development server with HMR support
- **TypeScript**: Type safety across the entire application
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind integration

## Database and ORM
- **Drizzle ORM**: Type-safe SQL toolkit for database operations
- **Neon Database**: Serverless PostgreSQL database service (configured)
- **Database Migrations**: Drizzle Kit for schema management and migrations

## Form and Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: Runtime type validation for form inputs and API data
- **Hookform Resolvers**: Integration between React Hook Form and Zod validation

## Server and Networking
- **TanStack Query**: Server state management and caching for API calls
- **Express.js**: Web framework for the REST API server
- **CORS**: Cross-origin resource sharing for API access

## Fonts and Assets
- **Google Fonts**: Inter, DM Sans, Fira Code, Geist Mono, and Architects Daughter
- **Unsplash**: Stock photography for hero sections and project showcases