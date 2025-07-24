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

## Frontend

The frontend React code is placed in the `frontend` folder. It uses Leaflet to display a world map and several components for the game flow.

Build scripts are placeholders and would normally require a bundler (like Vite) and dependencies which are not installed in this environment.
