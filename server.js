const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const app = express();

// Load environment variables
dotenv.config();

const port = process.env.PORT || 3000;

// Раздаем статические файлы (CSS, картинки и т.д.) из корня
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
