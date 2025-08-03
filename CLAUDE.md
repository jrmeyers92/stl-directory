# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` - Starts Next.js dev server on http://localhost:3000
- **Build**: `npm run build` - Creates production build
- **Production server**: `npm run start` - Runs production server (requires build first)
- **Linting**: `npm run lint` - Runs ESLint with Next.js config

## Project Architecture

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: Clerk for user management and auth
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwindcss 4 with ShadCN which is built on top of Radix UI components
- **Forms**: React Hook Form with Zod validation
- **Deployment**: Vercel (inferred from Next.js setup)

### Directory Structure

#### Core Application

- `src/app/` - Next.js App Router pages and layouts
  - Route groups: `(info)/` for static pages
  - Dynamic routes: `business/[id]`, `categories/[category]`, `leave-review/[businessId]`
  - Onboarding flow: `/onboarding/` with role-based routing

#### Authentication & Authorization

- Clerk integration in `src/app/layout.tsx` and `src/middleware.ts`
- Role-based access control with user onboarding flow
- Protected routes for favorites, business dashboard, and admin areas
- Middleware handles auth, redirects, and role-based access

#### Data Layer

- `src/actions/` - Server actions for database operations
- `src/utils/supabase/` - Database client configurations (server, client, admin)
- `src/schemas/` - Zod validation schemas
- Database tables: `stl_directory_businesses`, `stl_directory_favorites`

#### UI Components

- `src/components/ui/` - Reusable Radix UI components
- `src/components/` - Business-specific components
- Theme provider for dark/light mode with `next-themes`

### Authentication Flow

1. Users sign up/in via Clerk
2. New users redirected to role selection (`/onboarding/role-selection`)
3. Role-based onboarding: business owners vs regular users
4. Middleware enforces authentication and role-based access

### Data Models

- Businesses with categories, reviews, and ratings
- User favorites system with save/unsave functionality
- Role-based user metadata (user, businessOwner, admin)

### Key Features

- Wedding vendor directory for St. Louis area
- Business registration and management
- Review and rating system
- Favorites/saved businesses
- Category browsing
- SEO optimized with structured data

### Environment Variables Required

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Clerk authentication keys
- Google Analytics ID (G-KYSJVG96LE)

### Development Notes

- Uses server actions for database operations
- Form validation with Zod schemas
- Image optimization and resizing utilities
- Comprehensive SEO setup with Open Graph and JSON-LD
- Error handling patterns in server actions

### Security & Validation

- **Server-side validation**: All forms validate with Zod schemas on the server
- **Rate limiting**: In-memory rate limiting prevents abuse (contact: 3/hour, reviews: 5/day)
- **Input sanitization**: Text inputs are sanitized to prevent XSS
- **File validation**: Images validated for size (5MB max), type (jpeg/png/webp), and security
- **Spam detection**: Content checked for spam patterns and suspicious inputs
- **Authentication checks**: Protected actions require valid user sessions
- **Error standardization**: Consistent error responses across all server actions

### Validation Utilities

- `src/utils/validation.ts` - Common validation schemas and helpers
- `src/utils/rateLimit.ts` - Rate limiting implementation
- `src/utils/serverActionMiddleware.ts` - Middleware for server actions

### Security Best Practices

- Never expose sensitive data in client-side code
- All database operations use RLS (Row Level Security) in Supabase
- File uploads are validated and stored securely
- Rate limiting prevents abuse and spam
- Input sanitization prevents XSS attacks
