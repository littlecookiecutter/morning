# Morning App

A mindful morning routine app with breathing exercises, curated philosophical quotes, and AI-summarized insights for junior developers.

## Features

- 🌅 **Breathing Exercise**: 4-stage breathing animation (inhale, hold, exhale, hold) for 10 cycles
- 💬 **Curated Quotes**: 60+ deep, philosophical quotes from Jung, Frankl, Yalom, Stoics — no generic motivation
- 📚 **AI-Summarized Content**: ML insights & health stories simplified for junior level (via OpenRouter)
- 🎥 **Smart Video Picks**: YouTube videos on mindset & productivity (5–12 min)
- 🎨 **Clean UI**: Minimal, calming design with smooth animations

---

## Quick Start

### 1. Install Node.js (if not installed)

Download from [nodejs.org](https://nodejs.org/) (LTS version recommended).

Verify installation:
```bash
node -v
npm -v
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure API Keys (Optional)

Create a `.env` file in the project root:

```bash
OPENROUTER_API_KEY=your_openrouter_key
NEWSAPI_KEY=your_newsapi_key
YOUTUBE_API_KEY=your_youtube_key
PORT=3000
```

**How to get keys:**

| Service | Link | Notes |
|---------|------|-------|
| **OpenRouter** | [openrouter.ai/keys](https://openrouter.ai/keys) | Required for AI summaries. Model: `qwen/qwen3.6-plus-preview:free` |
| **NewsAPI** | [newsapi.org/register](https://newsapi.org/register) | For health/tech articles (free tier available) |
| **YouTube Data API** | [console.cloud.google.com](https://console.cloud.google.com/) | Enable "YouTube Data API v3" for video search |

> ⚠️ **No keys?** The app works in **Demo Mode** with pre-loaded sample content.

### 4. Run the server

```bash
npm start
```

### 5. Open the app

Navigate to: **http://localhost:3000**

---

## Project Structure

```
morning/
├── server.js          # Express backend: quotes, AI summaries, video search
├── index.html         # Frontend: UI, animations, content display
├── quotes.json        # Curated library of 60 philosophical quotes
├── .env               # API keys (create manually)
├── package.json       # Dependencies & scripts
└── README.md          # This file
```

---

## API Endpoints

### GET /morning

Returns a curated quote based on day-of-year rotation (no external API).

**Response:**
```json
{
  "quote": {
    "text": "The only way out is through.",
    "author": "Robert Frost"
  }
}
```

### GET / (Root)

Serves the frontend `index.html`.

---

## Quote Philosophy

Quotes are carefully selected to be:
- ✅ Grounded & realistic
- ✅ Emotionally supportive without being cheesy
- ✅ From respected thinkers (Jung, Frankl, Yalom, Stoics, etc.)
- ❌ NO generic "Believe in yourself!" content

Each quote includes tags like: `self-compassion`, `anxiety`, `growth`, `inner-strength`.

---

## Content Logic (Backend)

When API keys are provided:

1. **Articles**: Fetched from Dev.to & NewsAPI → Summarized by AI (Qwen model) for junior-level clarity
2. **Videos**: Searched via YouTube API (5–12 min, mindset/productivity topics)
3. **Fallback**: If APIs fail or keys missing → Demo content shown

All content is filtered to avoid negativity/anxiety-inducing topics.

---

## Requirements

- Node.js 18+
- npm
- Modern browser (Chrome, Firefox, Edge)

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `npm: command not found` | Install Node.js from nodejs.org, restart terminal |
| `Cannot GET /` | Open http://localhost:3000 (not just the file) |
| `EAI_AGAIN api.quotable.io` | Removed! Quotes now local (no external API needed) |
| PowerShell script blocked | Run: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` |
| No content showing | Check console for errors; ensure server is running |

---

## License

MIT
