// app.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.get('/data', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Allow CORS for frontend
    res.json({ message: 'Hello from backend - Test', value: 42 });
});

app.listen(3200, () => {
    console.log('Server running on http://localhost:3200');
});