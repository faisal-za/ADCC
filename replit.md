# Overview

This is a full-stack construction company website for Advanced Design & Contracting Co. (ADCC). The application features a modern, single-page website with sections for services, projects, company information, and a contact form. It's built as a React frontend with an Express.js backend, designed to showcase the company's construction and design services while capturing customer inquiries through a contact form.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design system variables and shadcn/ui component library for consistent, professional UI components
- **State Management**: TanStack Query (React Query) for server state management and API calls
- **Form Handling**: React Hook Form with Zod validation for type-safe form validation and submission
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Framework**: Express.js with TypeScript for the REST API server
- **Storage**: In-memory storage implementation using a Map-based storage class for contact data
- **Database Schema**: Drizzle ORM with PostgreSQL schema definitions (configured but not yet implemented)
- **API Structure**: RESTful endpoints for contact form submissions and retrieval
- **Development**: Hot module replacement via Vite integration for seamless development experience

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