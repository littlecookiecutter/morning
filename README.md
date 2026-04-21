# Morning App 🌅

A calm, mindful morning routine app with AI-curated content for junior developers.

## Features

- **Breathing Exercise**: Guided breathing animation to start the day calmly
- **Curated Quotes**: 60+ deep, philosophical quotes from thinkers like Jung, Frankl, Nietzsche, and Stoic philosophers
- **AI-Summarized Articles**: 
  - ML/Software Engineering insights from Dev.to
  - Health & Wellness stories from NewsAPI
  - Content is summarized by AI into long-form (10 min read), easy-to-understand articles
- **Thoughtful Videos**: Calm documentaries and "day in the life" videos (no generic motivation)
- **Headspace-style UI**: Clean, minimal design with refresh buttons for each content block

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Create `.env` File

Create a file named `.env` in the project root with your API keys:

```env
OPENROUTER_API_KEY=your_openrouter_key_here
NEWSAPI_KEY=your_newsapi_key_here
YOUTUBE_API_KEY=your_youtube_api_key_here
PORT=3000
```

#### How to Get API Keys:

1. **OpenRouter** (for AI summarization):
   - Go to [openrouter.ai](https://openrouter.ai/)
   - Sign up and create an API key in the "Keys" section
   - Uses model: `qwen/qwen-2.5-72b-instruct`

2. **NewsAPI** (for health articles):
   - Go to [newsapi.org](https://newsapi.org/)
   - Get a free Developer API key

3. **YouTube Data API** (for videos):
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable "YouTube Data API v3"
   - Create credentials → API Key

### 3. Run the Server

```bash
npm start
```

### 4. Open in Browser

Navigate to: **http://localhost:3000**

## Without API Keys

The app will work in **Demo Mode**:
- ✅ Quotes: Always work (local library of 60 quotes)
- ⚠️ Articles: Show pre-written fallback content (still long-form and valuable)
- ⚠️ Videos: Show a default calming video

## Project Structure

```
morning/
├── server.js          # Express backend with AI integration
├── index.html         # Frontend (HTML/CSS/JS)
├── quotes.js          # Library of 60 curated quotes
├── package.json       # Dependencies
├── .env               # API keys (create this)
└── README.md          # This file
```

## API Endpoints

- `GET /` - Serves the main HTML page
- `GET /morning` - Returns all content (quote + 2 articles + video)
- `GET /refresh/:type` - Refreshes individual content block (`ml`, `health`, or `video`)

## Content Philosophy

### Quotes
- No generic motivational quotes ("Believe in yourself!")
- Deep, grounding quotes from philosophers and psychologists
- Topics: self-compassion, anxiety, growth, inner strength

### Articles
- Written for junior developers who get easily overwhelmed
- Long-form (10 min read) for deep understanding
- Clear structure with headings and bullet points
- Links to original sources

### Videos
- Calm, observational content
- "Day in the life", mini-documentaries, slow living
- NO motivational speeches or productivity hacks

## Tech Stack

- **Backend**: Node.js, Express
- **AI**: OpenRouter API (Qwen 2.5 72B)
- **Data Sources**: Dev.to API, NewsAPI, YouTube Data API
- **Frontend**: Vanilla HTML/CSS/JS (no frameworks)

## License

MIT
