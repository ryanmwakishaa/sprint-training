# Sprint Tracker

A personal sprint training tracker built for coaching an athlete through a structured 18-week program, from foundational movement work through to top-end speed. Runs as a single-page web app, deployed on Netlify.

**Live app:** [sprinter-training.netlify.app](https://sprinter-training.netlify.app)

## Features

- **Sessions** — Day-by-day breakdown of the full 18-week program, organized into four phases (Movement → Strength → Power → Speed), with deload weeks built in. Log completed sessions and how they felt.
- **Progress** — Track completion and feel ratings across weeks to see how training is going over time.
- **Program** — Full program overview, including strength progression targets across all 18 weeks.
- **Coach AI** — An AI training assistant (powered by Groq) that knows the full program and athlete profile, and can answer questions about sessions, exercises, technique, or how training is progressing.
- **Training playlist** — Embed a Spotify playlist to play music during sessions. Paste a playlist link once and use Spotify's built-in shuffle button in the widget for a different track each time — no need to swap links between sessions.
- Installable as a **Progressive Web App (PWA)** for quick access from a home screen.

## Tech stack

- **Frontend:** Single `index.html` file — vanilla HTML/CSS/JS, no build step or framework. State (sessions, logs, feel ratings, playlist link) is persisted to the browser's `localStorage`.
- **Backend:** [Netlify Functions](https://docs.netlify.com/functions/overview/) (serverless) for the Coach AI chat, which calls the [Groq API](https://groq.com/) for fast LLM inference.
- **Hosting:** [Netlify](https://www.netlify.com/), auto-deploying from this repository.
- **Service worker** (`sw.js`) for offline/PWA support.

## Project structure

```
.
├── index.html              # The entire app — UI, styling, and logic
├── manifest.json           # PWA manifest (icons, name, theme)
├── sw.js                   # Service worker for offline support
├── netlify.toml             # Netlify build/redirect/header config
├── netlify/functions/
│   └── chat.js             # Serverless function powering Coach AI (Groq API)
└── icons/                  # PWA icons in various sizes
```

## Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/ryanmwakishaa/sprint-training.git
   ```
2. Deploy to Netlify (or connect this repo to an existing Netlify site) — it auto-detects `netlify.toml`.
3. In your Netlify site's **Environment Variables**, set:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```
   This is required for the Coach AI tab to work. Get a free key at [console.groq.com](https://console.groq.com/).
4. Push to the connected branch — Netlify redeploys automatically.

No other setup is required. There's no database — all training data lives in the browser's local storage on each device.

## Notes

- Data is stored per-device (via `localStorage`), so progress logged on one phone/browser won't automatically appear on another.
- The Coach AI tab needs an internet connection and a valid `GROQ_API_KEY` to respond.
- The training playlist requires a Spotify account; full playback (rather than 30-second previews) requires Spotify Premium.
