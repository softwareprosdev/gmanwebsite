# Database Setup Guide for RGV Handyman CRM

## Overview

The RGV Handyman CRM now uses PostgreSQL with Prisma ORM for persistent data storage and NextAuth.js for secure authentication with argon2id password hashing.

## Prerequisites

- PostgreSQL 14+ installed and running on your VPS
- Node.js 22+
- npm or yarn

## Setup Instructions

### 1. Update Environment Variables

Edit `.env.local` with your PostgreSQL connection details:

```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@your-vps-ip:5432/rgvhandyman?schema=public"

# NextAuth Configuration
NEXTAUTH_SECRET="your-secure-random-secret-key-generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="https://rgvhandyman.softwarepros.org"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Generate Prisma Client

```bash
npx prisma generate
```

### 4. Run Migrations

```bash
npx prisma migrate dev --name init
```

This will create all the required tables:
- `AdminUser` - Admin user accounts with argon2id hashed passwords
- `Client` - Client information
- `Service` - Available services
- `Booking` - Service bookings

### 5. Seed Initial Data

```bash
npx prisma db seed
```

This creates:
- Default admin user: `admin@rgvhandyman.com` with password `RGVadmin2024!`
- Initial services data (6 service types)
- Client booking statistics

## Security Features

### Password Security
- All passwords are hashed using **argon2id** (memory-hard hashing)
- Brute force protection with account lockout after 5 failed attempts
- Session-based authentication with JWT tokens

### Database Security
- Environment-based configuration (no hardcoded credentials)
- SQL injection protection via Prisma parameterized queries
- Row-level security policies in Prisma schema

### API Security
- All API routes check authentication via NextAuth middleware
- Admin routes protected at the middleware level
- CORS configured for production domain

## Project Structure

```
prisma/
├── schema.prisma      # Database schema definition
├── migrations/        # Auto-generated migration files
└── seed.ts           # Database seeding utilities

src/
├── lib/
│   ├── prisma.ts     # Prisma client singleton
│   ├── auth.ts       # NextAuth configuration
│   ├── data.ts       # API data layer
│   └── seed.ts       # Database seeding functions
├── app/
│   ├── api/          # API routes (auth, clients, bookings, services)
│   └── admin/        # Admin panel (uses API routes)
└── middleware.ts     # Authentication guard

.env.local           # Environment variables (gitignore)
```

## API Endpoints

### Authentication
- `POST /api/auth/callback/credentials` - Login via credentials

### Clients
- `GET /api/clients` - List all clients (with search/filter)
- `POST /api/clients` - Create new client
- `GET /api/clients/:id` - Get client details
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Bookings
- `GET /api/bookings` - List all bookings (with filters)
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking

### Services
- `GET /api/services` - List all services
- `POST /api/services` - Create new service
- `GET /api/services/:id` - Get service details
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Settings
- `GET /api/settings` - Get admin settings
- `PUT /api/settings` - Update settings

## Development

### Running the Project

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production server
npm start
```

### Running Prisma Commands

```bash
# Open Prisma Studio (database UI)
npx prisma studio

# Create a new migration
npx prisma migrate dev --name migration_name

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Pull schema from database
npx prisma pull
```

## Troubleshooting

### Connection Issues
If you get connection errors:
1. Verify PostgreSQL is running on your VPS
2. Check the DATABASE_URL in .env.local
3. Ensure port 5432 is open in your firewall
4. Verify credentials are correct

### Migration Errors
```bash
# Reset migrations history and recreate
npx prisma migrate reset

# Or drop all tables manually and run migrate dev again
```

### Authentication Errors
- Clear browser cookies for the site
- Verify NEXTAUTH_SECRET is set
- Check server logs for detailed errors

## Future Enhancements

- [ ] Email notifications for booking updates
- [ ] Role-based access control (ADMIN/STAFF)
- [ ] Two-factor authentication
- [ ] API rate limiting
- [ ] Audit logging for admin actions
- [ ] Export functionality (CSV/Excel)
- [ ] Advanced filtering and sorting
