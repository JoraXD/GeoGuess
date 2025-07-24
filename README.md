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

The frontend React code lives in `frontend`. Build the TypeScript with:

```bash
cd frontend
npm run build
```

Open `frontend/index.html` in a browser to play the game. It fetches questions
from the backend and renders the map using Leaflet.
