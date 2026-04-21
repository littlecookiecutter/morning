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

// --- AI Summarization via OpenRouter (Detailed & Structured) ---
async function summarizeWithAI(text, title, type) {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey || !text) return null;

    try {
        const fetch = await getFetch();
        const prompt = `
You are a helpful mentor for a junior developer who gets easily overwhelmed.
Summarize the following ${type} article titled "${title}".

Rules:
1. Write a COMPREHENSIVE, detailed summary suitable for 10 minutes of reading (approx. 1000-1500 words). Do NOT be brief.
2. Focus on key ideas, practical takeaways, and the "why" it matters.
3. Remove noise, ads, and overly technical jargon. Explain complex terms simply.
4. Tone: Calm, supportive, insightful (like a senior explaining to a junior).
5. Do NOT be generic. Be specific to the content provided.
6. Structure with clear paragraphs and logical flow.
7. Output ONLY the summary text, no intro/outro fluff.

Article Content:
${text.substring(0, 8000)}
        `.trim();

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
                        content: 'You are a thoughtful editor. Provide clear, deep, but accessible summaries.'
                    },
                    {
                        role: 'user',
                        content: prompt
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
        const response = await fetch('https://dev.to/api/articles?tag=javascript&tag=beginners&per_page=10');
        if (!response.ok) throw new Error('Dev.to API error');
        
        const articles = await response.json();
        if (!articles.length) return null;

        const article = articles[Math.floor(Math.random() * articles.length)];
        // Combine description and body for better context if available
        const fullText = article.body ? `${article.description}\n\n${article.body}` : article.description;
        const summary = await summarizeWithAI(fullText, article.title, "Software Engineering");

        return {
            title: article.title,
            text: summary || article.description || 'Good models depend on good data. Data engineering is often more important than model choice.',
            image: article.cover_image || null,
            url: article.url // Original link
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
        const url = `https://newsapi.org/v2/top-headlines?category=health&language=en&apiKey=${apiKey}&pageSize=10`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('NewsAPI error');
        
        const data = await response.json();
        if (!data.articles || !data.articles.length) return null;

        const article = data.articles[Math.floor(Math.random() * data.articles.length)];
        const fullText = article.content || article.description;
        const summary = await summarizeWithAI(fullText, article.title, "Health & Psychology");

        return {
            title: article.title,
            text: summary || article.description || 'A small overlooked symptom helped a doctor catch a dangerous disease early.',
            image: article.urlToImage || null,
            url: article.url // Original link
        };
    } catch (err) {
        console.error('Health article fetch failed:', err.message);
        return null;
    }
}

// --- Fetch YouTube Video (Calm, Observational, No Motivation) ---
async function fetchYouTubeVideo() {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) return null;

    try {
        const fetch = await getFetch();
        
        // New queries: calm, real life, documentaries
        const queries = [
            "day in the life of a scientist",
            "mini documentary artist life",
            "slow living lifestyle documentary",
            "a day in the life creative person",
            "short documentary interesting people",
            "writer daily routine documentary",
            "ocean documentary slow",
            "pottery making process quiet"
        ];
        
        const randomQuery = queries[Math.floor(Math.random() * queries.length)];
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoDuration=medium&q=${encodeURIComponent(randomQuery)}&key=${apiKey}&maxResults=5`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('YouTube API error');
        
        const data = await response.json();
        if (!data.items || !data.items.length) return null;

        // Pick a random one from top 5 to vary results
        const video = data.items[Math.floor(Math.random() * data.items.length)];
        
        // Basic filter: skip if title contains "motivation", "success tips" etc.
        const titleLower = video.snippet.title.toLowerCase();
        if (titleLower.includes('motivation') || titleLower.includes('success tips') || titleLower.includes('get rich')) {
            console.log('Skipped generic video:', video.snippet.title);
            return null; // Trigger retry or fallback
        }

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
        text: 'Good models depend on good data. Data engineering is often more important than model choice. When you start, don\'t rush to fancy algorithms. Spend time understanding your data.',
        image: null,
        url: null
    };

    const health = healthData || {
        title: 'Medical Story',
        text: 'A small overlooked symptom helped a doctor catch a dangerous disease early. Details matter. In your own life, don\'t ignore small signs of stress. Listening to your body is a skill.',
        image: null,
        url: null
    };

    const video = videoData || { id: 'L_Guz73e6fw' }; // Default calm/observational video (e.g., slow TV)

    console.log(`📰 ML: ${mlData ? 'Real' : 'Demo'} | 🏥 Health: ${healthData ? 'Real' : 'Demo'} | 🎬 Video: ${videoData ? 'Real' : 'Demo'}`);

    res.json({
        quote,
        ml,
        health,
        video
    });
});

// --- Refresh Endpoint (Get new content without reloading page) ---
app.get('/refresh', async (req, res) => {
    console.log('🔄 Refreshing content...');
    
    const [mlData, healthData, videoData] = await Promise.all([
        fetchMLArticle(),
        fetchHealthArticle(),
        fetchYouTubeVideo()
    ]);

    const ml = mlData || {
        title: 'ML Insight',
        text: 'Good models depend on good data. Data engineering is often more important than model choice.',
        image: null,
        url: null
    };

    const health = healthData || {
        title: 'Medical Story',
        text: 'A small overlooked symptom helped a doctor catch a dangerous disease early.',
        image: null,
        url: null
    };

    const video = videoData || { id: 'L_Guz73e6fw' };

    res.json({ ml, health, video });
});

// Serve static frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📖 Open http://localhost:${PORT} in your browser.`);
});
