const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const app = express();

// Load environment variables
dotenv.config();

const port = process.env.PORT || 3000;

// API Keys from environment
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const NEWSAPI_KEY = process.env.NEWSAPI_KEY || '';
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || '';

// Track if APIs are available
const apiStatus = {
  openrouter: !!OPENROUTER_API_KEY && !OPENROUTER_API_KEY.includes('sk-or-') && OPENROUTER_API_KEY.length > 10,
  newsapi: !!NEWSAPI_KEY && !NEWSAPI_KEY.includes('db6') && NEWSAPI_KEY.length > 5,
  youtube: !!YOUTUBE_API_KEY && YOUTUBE_API_KEY.length > 10
};

// Раздаем статические файлы (CSS, картинки и т.д.) из корня
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  // Pass API keys status to frontend
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Morning - Daily Inspiration & Planning</title>
  <link rel="stylesheet" href="style.css">
  <script>
    window.API_KEYS = {
      OPENROUTER: '${OPENROUTER_API_KEY}',
      NEWS: '${NEWSAPI_KEY}',
      YOUTUBE: '${YOUTUBE_API_KEY}'
    };
    window.API_STATUS = ${JSON.stringify(apiStatus)};
  </script>
</head>
<body>
`;
  
  // Read the rest of index.html and append
  const fs = require('fs');
  const indexPath = path.join(__dirname, 'index.html');
  let fullHtml = htmlContent;
  
  try {
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    // Remove the original <!DOCTYPE html><html>... head section from index.html
    const bodyStart = indexContent.indexOf('<body>');
    if (bodyStart !== -1) {
      fullHtml += indexContent.substring(bodyStart);
    } else {
      fullHtml += indexContent;
    }
  } catch (e) {
    console.error('Error reading index.html:', e);
  }
  
  res.send(fullHtml);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log('---');
  console.log('API Status:');
  console.log(`  OpenRouter: ${apiStatus.openrouter ? '✅ Connected' : '❌ Not configured (using fallback)'}`);
  console.log(`  NewsAPI: ${apiStatus.newsapi ? '✅ Connected' : '❌ Not configured (using fallback)'}`);
  console.log(`  YouTube: ${apiStatus.youtube ? '✅ Connected' : '❌ Not configured (using fallback)'}`);
  console.log('---');
});
