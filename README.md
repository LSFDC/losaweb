

# Losaweb

Modern full-stack application using Turborepo, Next.js, Hono, and MSSQL related to Lost Saga Game. <br>
This project maintained by [LSFDC (Lost Saga For Developer Community)](https://github.com/LSFDC)


## Tech Stack

- **Frontend**: Next.js with TypeScript
- **UI Components**: shadcn/ui
- **Styling**: TailwindCSS
- **Backend**: Hono
- **Database**: MSSQL with Prisma ORM
- **Monorepo**: Turborepo

## Project Structure

```
├── database/
│   └── LosaGame.sql            # Required database SQL
│   └── LosaGame_Log.sql        # Required database SQL
│   └── LosaLogData.sql         # Required database SQL
├── apps/
│   └── backend-hono/           # Hono backend / REST API
│   └── losaadmin/              # Lost Saga Admin Panel
│   └── losadb/                 # Lost Saga Database & Web Tools
│   ├── web/                    # Main Site / lostsaga website
├── packages/
│   ├── database/               # Prisma schema and shared database models
│   └── eslint-config/          # Shared eslint configs
│   └── typescript-config/      # Shared TypeScript configs
│   └── ui/                     # Shared UI components
```

## Prerequisites

- Node.js >= 18
- MSSQL Server
- pnpm (recommended)

## Setup

1. Clone and install dependencies:
```bash
git clone https://github.com/LSFDC/losaweb.git
cd losaweb
pnpm install
```

2. Configure environment variables:
```bash
# apps/backend-hono/.env

# Core
CORS_ORIGIN=""       # Set to your frontend origin
API_KEY=""           # Set to your API key
AUTH_API_KEY=""      # Set to your auth API key

# Auth
AUTH_DOMAIN="localhost" # without http:// or https://
AUTH_SECRET=""       #random string
AUTH_KEY=""          #random string
AUTH_SALT=""         #random string

# cloudflare
CF_BASE_URL="https://challenges.cloudflare.com/turnstile/v0/siteverify"
CF_SECRET_KEY=""     # cloudflare secret key. get it from cloudflare dashboard

#tripay
TRIPAY_BASE_URL=""   # get from https://tripay.co.id/developer
TRIPAY_API_KEY=""    # get from https://tripay.co.id/developer
TRIPAY_API_SECRET="" # get from https://tripay.co.id/developer

XENDIT_BASE_URL=""   # get from https://xendit.co
XENDIT_API_KEY=""    # get from https://xendit.co
XENDIT_API_SECRET="" #get from https://xendit.co

PAYPAL_BASE_URL=""   # get from https://developer.paypal.com
PAYPAL_API_KEY=""    # get from https://developer.paypal.com
PAYPAL_API_SECRET="" # get from https://developer.paypal.com

# apps/web/.env
SESSION_SECRET=""               # Generate a secret key or just type randomly
API_URL="http://localhost:5000" # backend API URL
API_AUTH_KEY=""                 # get from backend-hono/.env

NEXT_PUBLIC_CF_SITE_KEY=""      # Cloudflare Site Key. get it from cloudflare dashboard

# packages/database/.env

# replace with your database configuration, please change the Uppercase text
LOSAGAME_URL="sqlserver://HOST:1433;database=LosaGame;user=sa;password=PASSWORD;trustServerCertificate=true" 
```
3. Initialize database:
```bash
import all require .sql to your database , can use navicat(recommended)
cd packages/database
pnpm run db:push
```

## Development

Start all applications:
```bash
pnpm dev
```

Build all applications:
```bash
pnpm build
```

## Project Commands

- `pnpm dev` - Start development servers
- `pnpm build` - Build all applications
- `pnpm lint` - Lint all applications
- `pnpm format` - Format all documents with prettier

## Project Documentation

- Backend API is available at `http://localhost:5000`
- Main site runs at `http://localhost:3000`
- losaadmin runs at `http://localhost:3001`
- losadb runs at `http://localhost:3002`

> [!NOTE]  
> # This project uses a monorepo structure, with all applications and packages in the same repository.
> # Please keep all sensitive information in `.env` files (url, secet-key, api-key).
