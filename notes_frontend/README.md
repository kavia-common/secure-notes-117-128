# SecureNotes: Lightweight React Notes App

A modern, responsive notes app featuring user authentication and CRUD operations. Clean design with a light theme, styled per KAVIA brand guide.

## Features

- **Sign Up / Log In** via email & password (JWT-auth)
- **Create, Edit, Delete Notes** (persistent, server-backed)
- **Protected Routes**: /notes (requires login)
- **Responsive UI**: Light theme, #3b82f6 and #06b6d4 accents, styled per modern UI guide.
- **In-memory & localStorage JWT**: Secure, persistent auth
- **Error & Loading States**: Good UX for slow networks
- **API base URL configurable via env**
- **No UI framework bloat**: Pure React, vanilla CSS

## Getting Started

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Configure environment:**

   Copy `.env.example` to `.env` and edit if desired.
   ```
   cp .env.example .env
   ```

   You should set `REACT_APP_API_BASE` to your backend’s base URL (`http://localhost:3001` by default).

3. **Start the app:**

   ```
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Create an account (/signup) or log in (/login)
- After login, access & edit notes at /notes

## Environment variables

See `.env.example` for reference. Main setting: `REACT_APP_API_BASE`

## Development

- `src/context/AuthContext.js` – JWT and Auth logic
- `src/pages/LoginPage.js`, `src/pages/SignupPage.js` – Auth forms
- `src/pages/NotesPage.js` – Notes main interface
- `src/components/*` – Header, note list, editor

## Style guide

- Primary: `#3b82f6`
- Accent: `#06b6d4`
- Background: `#f9fafb`
- Surface: `#fff`
- Text: `#111827`

Global CSS: `src/styles/global.css`

## License

MIT (c) SecureNotes
