const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = 3000;

const keywords = ["self", "growth", "fear", "mind", "calm", "focus", "progress", "strength"];

app.get('/morning', async (req, res) => {
    let quote;
    let attempts = 0;
    const maxAttempts = 50;

    while (!quote && attempts < maxAttempts) {
        attempts++;
        try {
            const response = await fetch('https://api.quotable.io/random');
            const data = await response.json();

            const textLower = data.content.toLowerCase();
            const hasKeyword = keywords.some(kw => textLower.includes(kw));

            if (hasKeyword) {
                quote = {
                    text: data.content,
                    author: data.author
                };
            }
        } catch (err) {
            console.error('Fetch error:', err.message);
        }
    }

    if (!quote) {
        quote = {
            text: "Be on your own side today.",
            author: "Unknown"
        };
    }

    res.json({ quote });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
