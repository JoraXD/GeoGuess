# GeoGuess Game

This repository contains a simple geography quiz game split into `frontend` and `backend` folders. The backend is a TypeScript HTTP server with two endpoints and a small haversine test. The frontend provides React components for the game screens.

## Backend

- `GET /questions?category=landmark` – returns a random question.
- `POST /check-answer` – checks the answer and returns distance and strike.

Run tests and build with:

```bash
cd backend
npm test
```

Build and start the server with:

```bash
cd backend
npm run build && npm start
```

## Frontend

The frontend React code lives in `frontend` and uses Vite for bundling.
For development run the dev server with:

```bash
cd frontend
npm run dev
```

Create a production bundle with:

```bash
cd frontend
npm run build
```

Preview the built files with:

```bash
npm run preview
```
Make sure the backend is running on `http://localhost:3000` before loading the
frontend. The application fetches questions from the backend and renders the map
using Leaflet.

