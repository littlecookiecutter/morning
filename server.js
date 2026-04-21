const express = require('express');
const path = require('path');
require('dotenv').config();

// --- Load curated quotes from local module ---
const { getDailyQuote } = require('./quotes.js');

const app = express();
const PORT = process.env.PORT || 3000;

console.log(`✅ Loaded curated quotes library.`);

// --- Helper: Dynamic import for node-fetch ---
const getFetch = async () => {
    const { default: fetch } = await import('node-fetch');
    return fetch;
};

// --- AI Summarization via OpenRouter ---
async function summarizeWithAI(text, title) {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) return null;

    try {
        const fetch = await getFetch();
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': 'http://localhost:3000',
                'X-Title': 'Morning App'
            },
            body: JSON.stringify({
                model: 'qwen/qwen-2.5-72b-instruct',
                messages: [
                    {
                        role: 'system',
                        content: 'Summarize this article for a junior-level developer. Keep it clear, structured, and not too simple. Focus on key ideas, remove noise. Max length: ~5 minutes reading. Return ONLY the summary text, no intro/outro.'
                    },
                    {
                        role: 'user',
                        content: `Title: ${title}\n\nContent: ${text.substring(0, 4000)}`
                    }
                ]
            })
        });

        if (!response.ok) throw new Error(`OpenRouter error: ${response.status}`);
        const data = await response.json();
        return data.choices?.[0]?.message?.content || null;
    } catch (err) {
        console.error('AI summarization failed:', err.message);
        return null;
    }
}

// --- Fetch ML Article (Dev.to) ---
async function fetchMLArticle() {
    try {
        const fetch = await getFetch();
        const response = await fetch('https://dev.to/api/articles?tag=javascript&per_page=5');
        if (!response.ok) throw new Error('Dev.to API error');
        
        const articles = await response.json();
        if (!articles.length) return null;

        const article = articles[Math.floor(Math.random() * articles.length)];
        const summary = await summarizeWithAI(article.description || article.title, article.title);

        return {
            title: article.title,
            text: summary || article.description || 'Good models depend on good data. Data engineering is often more important than model choice.',
            image: article.cover_image || null
        };
    } catch (err) {
        console.error('ML article fetch failed:', err.message);
        return null;
    }
}

// --- Fetch Health Article (NewsAPI) ---
async function fetchHealthArticle() {
    const apiKey = process.env.NEWSAPI_KEY;
    if (!apiKey) return null;

    try {
        const fetch = await getFetch();
        const url = `https://newsapi.org/v2/top-headlines?category=health&language=en&apiKey=${apiKey}&pageSize=5`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('NewsAPI error');
        
        const data = await response.json();
        if (!data.articles || !data.articles.length) return null;

        const article = data.articles[Math.floor(Math.random() * data.articles.length)];
        const summary = await summarizeWithAI(article.description || article.content, article.title);

        return {
            title: article.title,
            text: summary || article.description || 'A small overlooked symptom helped a doctor catch a dangerous disease early.',
            image: article.urlToImage || null
        };
    } catch (err) {
        console.error('Health article fetch failed:', err.message);
        return null;
    }
}

// --- Fetch YouTube Video ---
async function fetchYouTubeVideo() {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) return null;

    try {
        const fetch = await getFetch();
        const topics = ['mindset', 'productivity', 'calm', 'self-development'];
        const topic = topics[Math.floor(Math.random() * topics.length)];
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&duration=medium&q=${topic}&key=${apiKey}&maxResults=5`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('YouTube API error');
        
        const data = await response.json();
        if (!data.items || !data.items.length) return null;

        const video = data.items[Math.floor(Math.random() * data.items.length)];
        return { id: video.id.videoId };
    } catch (err) {
        console.error('YouTube fetch failed:', err.message);
        return null;
    }
}

// --- Main Endpoint ---
app.get('/morning', async (req, res) => {
    console.log('⏳ Generating morning content...');

    // Quote is always local
    const quote = getDailyQuote();

    // Fetch content in parallel
    const [mlData, healthData, videoData] = await Promise.all([
        fetchMLArticle(),
        fetchHealthArticle(),
        fetchYouTubeVideo()
    ]);

    // Fallback to demo if APIs fail
    const ml = mlData || {
        title: 'ML Insight',
        text: 'Good models depend on good data. Data engineering is often more important than model choice.',
        image: null
    };

    const health = healthData || {
        title: 'Medical Story',
        text: 'A small overlooked symptom helped a doctor catch a dangerous disease early.',
        image: null
    };

    const video = videoData || { id: 'ZXsQAXx_ao0' }; // Default motivational video

    console.log(`📰 ML: ${mlData ? 'Real' : 'Demo'} | 🏥 Health: ${healthData ? 'Real' : 'Demo'} | 🎬 Video: ${videoData ? 'Real' : 'Demo'}`);

    res.json({
        quote,
        ml,
        health,
        video
    });
});

// Serve static frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📖 Open http://localhost:${PORT} in your browser.`);
});
