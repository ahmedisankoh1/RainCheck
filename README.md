# RainCheck — Weather Dashboard (React + TypeScript + Vite)

RainCheck is a modern weather dashboard featuring city search, current conditions, and a 5‑day forecast. It uses OpenWeather APIs, shadcn/ui, Tailwind CSS, and Supabase (placeholders implemented, ready for persistence).

## Setup and Run

1) Prerequisites
- Node 18+
- npm 9+

2) Install dependencies
```bash
npm install
```

3) Environment variables
Create a `.env.local` in the project root with:
```bash
VITE_WEATHER_API_KEY=your_openweather_api_key
VITE_WEATHER_API_URL=https://api.openweathermap.org/data/2.5
VITE_WEATHER_GEO_API_URL=https://api.openweathermap.org/geo/1.0
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4) Start the dev server
```bash
npm run dev
```

## Features Implemented
- SearchBox with live suggestions (OpenWeather Geo API) and fetch by lat/lon
- Current weather display with real OpenWeather icons, loading and error states
- 5‑day forecast chart (Recharts) that reacts to selected city
- Supabase client methods implemented (auth and basic tables) and ready for UI wiring
- Event-driven UI updates: `weather:current-updated`, `weather:error`, `weather:loading`, `weather:location-selected`

## Technologies Used
- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Recharts (forecast visualization)
- OpenWeather (Current + Forecast + Geo APIs)
- Supabase JS client (auth + persistence)

## Notes on AI Usage (tools and contexts)
- Code scaffolding, file creation, and edits were automated with an AI pair‑programmer in Cursor.
- Event flow and state management were iteratively refined with AI assistance.
- Docstrings and consistent TypeScript types were generated and validated with AI.
- Where external services were involved (OpenWeather, Supabase), the AI produced placeholders and production‑ready wiring with clear env requirements.