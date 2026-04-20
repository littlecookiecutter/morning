# Morning App

A simple morning routine app with breathing animation and inspirational quotes.

## Features

- 🌅 Breathing animation (inhale, hold, exhale)
- 💬 Daily inspirational quotes filtered by keywords (self, growth, fear, mind, calm, focus, progress, strength)
- 📚 Content blocks with ML insights, medical stories, and inspiration
- 🎨 Clean, minimal UI

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Run the server

```bash
npm start
```

### 3. Open the app

Open `index.html` in your browser or navigate to `http://localhost:3000` if serving the frontend.

## Project Structure

- `server.js` - Node.js + Express backend with `/morning` endpoint
- `index.html` - Frontend with breathing animation and quote display
- `package.json` - Dependencies and scripts

## API

### GET /morning

Returns a random quote filtered by motivational keywords.

**Response:**
```json
{
  "quote": {
    "text": "Be on your own side today.",
    "author": "Unknown"
  }
}
```

## Requirements

- Node.js 18+
- npm
