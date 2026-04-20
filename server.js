const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Load curated quotes from local file
const quotesPath = path.join(__dirname, 'quotes.json');
let quotesDB = [];
try {
    const data = fs.readFileSync(quotesPath, 'utf8');
    quotesDB = JSON.parse(data);
} catch (err) {
    console.error('Error loading quotes.json:', err.message);
    quotesDB = [{ text: "Be on your own side today.", author: "Unknown" }];
}

const keywords = ["self", "growth", "fear", "mind", "calm", "focus", "progress", "strength"];

app.get('/morning', async (req, res) => {
    // Select quote based on day of year to avoid repetition
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    // Simple rotation + randomization within a small window to keep it fresh but non-repeating for a week
    const baseIndex = dayOfYear % quotesDB.length;
    const windowSize = Math.min(7, quotesDB.length);
    const randomOffset = Math.floor(Math.random() * windowSize);
    const selectedIndex = (baseIndex + randomOffset) % quotesDB.length;
    
    const quote = quotesDB[selectedIndex];

    res.json({ quote });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
