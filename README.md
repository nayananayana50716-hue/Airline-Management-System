# Airport App Fullstack Repository

This repository contains two projects:

- `airport-app` - React + Vite frontend
- `airport-app-backend` - Express + Socket.IO backend

## Startup instructions

### 1. Backend

```bash
cd airport-app-backend
npm install
npm run dev
```

The backend is configured to run on `http://localhost:5002` by default via `airport-app-backend/.env`.

### 2. Frontend

```bash
cd airport-app
npm install
npm run dev
```

The frontend uses `airport-app/.env` to set the API URL:

```env
VITE_API_URL=http://localhost:5002
```

## Build

### Frontend production build

```bash
cd airport-app
npm run build
```

## Useful notes

- The backend health check is available at `http://localhost:5002/`.
- The frontend may start on `http://localhost:5174/` if `5173` is in use.
- Make sure both frontend and backend are running before using the application.

## Run both services (dev)

From the repository root you can start both services together:

```bash
# install root dev deps (concurrently)
npm install

# start both backend and frontend
npm run dev
```

This runs `airport-app-backend` and `airport-app` concurrently using the root `dev` script.

### Windows helper scripts

You can use the provided PowerShell helpers to start and stop the dev environment on Windows:

Start the dev environment in a new window:

```powershell
.\start-dev.ps1
# or via npm
npm run start-dev-win
```

Stop processes listening on the typical dev ports (5002, 5173-5180):

```powershell
.\stop-dev.ps1
# or via npm
npm run stop-dev-win
```

