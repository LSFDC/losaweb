# Losaweb

Modern full-stack application using Turborepo related to Lost Saga Game. <br>
This project maintained by [Bangbokir](https://github.com/bangbokirs)

> [!NOTE]  
> ### This project uses a monorepo structure, with all applications and packages in the same repository.
> ### Please keep all sensitive information in `.env` files (url, secet-key, api-key).

## Tech Stack

- **Frontend**: Next.js, Vite, React
- **UI Components**: shadcn/ui
- **Styling**: TailwindCSS
- **Backend**: Hono
- **Database**: MSSQL with Prisma ORM
- **Monorepo Tool**: Turborepo
- **Language**: TypeScript

## Project Structure

```
├── database/
│   └── LosaAdmin.sql           # Required database SQL
│   └── LosaGame.sql            # Required database SQL
│   └── LosaGame_Log.sql        # Required database SQL
│   └── LosaLogData.sql         # Required database SQL
├── apps/
│   └── api/                    # REST API with HonoJS
│   └── losapanel/              # User Panel & Admin Panel
│   └── losadb/                 # Database & Web Tools
│   ├── main-vite-react/        # Main Site with Vite + React + Typescript
├── packages/
│   └── eslint-config/          # Shared eslint configs
│   └── typescript-config/      # Shared TypeScript configs
│   └── ui/                     # Shared UI components
│   └── database/               # Shared database utilities & instances
│   └── tripay/                 # Shared Tripay SDK
```

## Prerequisites

- Node.js >= 18
- MSSQL Server
- npm (recommended)

## Setup

1. Clone and install dependencies:
```bash
git clone https://github.com/LSFDC/losaweb.git
cd losaweb
npm install
```

2. Configure environment variables:
   
```bash
 ###losapanel
 cd apps/losapanel
 cp env-example .env
 fill all the required fields in .env

 ###database packages
 cd packages/database
 cp env-example .env
 edit .env to match your database credentials
```
3. Initialize database:
```bash
#first step (required)
import all require .sql to your MSSQL database , can use navicat(recommended)

#losagame
cd packages/database
npm run losagame:push
npm run losagame:generate

#losalogdata
cd packages/database
npm run losalogdata:push
npm run losalogdata:generate

```

## Development

Start all applications:
```bash
npm run dev
```

Build all applications:
```bash
npm run build
```

## Project Commands

- `npm run dev` - Start development servers
- `npm run build` - Build all applications
- `npm run lint` - Lint all applications
- `npm run format` - Format all documents with prettier

## Project Documentation

- API is runs at `http://localhost:5000`
- Main site with Vite runs at `http://localhost:5173`
- losapanel runs at `http://localhost:3000`
- losadb runs at `http://localhost:3001`

