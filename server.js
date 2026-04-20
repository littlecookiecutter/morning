const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Load curated quotes from local file
const quotesPath = path.join(__dirname, 'quotes.json');
let quotesDB = [];

try {
    const data = fs.readFileSync(quotesPath, 'utf8');
    quotesDB = JSON.parse(data);
    console.log(`✅ Loaded ${quotesDB.length} curated quotes.`);
} catch (err) {
    console.error('❌ Error loading quotes.json:', err.message);
    quotesDB = [
        { text: "Be on your own side today.", author: "Unknown" }
    ];
}

app.get('/morning', async (req, res) => {
    // Select quote based on day of year to avoid repetition
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    // Rotation logic: base index by day + small random window to vary within a week
    const baseIndex = dayOfYear % quotesDB.length;
    const windowSize = Math.min(7, quotesDB.length);
    const randomOffset = Math.floor(Math.random() * windowSize);
    const selectedIndex = (baseIndex + randomOffset) % quotesDB.length;
    
    const quote = quotesDB[selectedIndex];

    res.json({ quote });
});

// Serve static frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📖 Open http://localhost:${PORT} in your browser.`);
});
