const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Google Gemini API
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'LUMINA Backend Running', timestamp: new Date() });
});

// Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message required' });

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(message);
    const response = result.response.text();

    res.json({ success: true, message: response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Code Generation Endpoint
app.post('/api/generate-code', async (req, res) => {
  try {
    const { language, description } = req.body;
    const prompt = `Generate ${language} code for: ${description}`;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const code = result.response.text();

    res.json({ success: true, code });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Business Ideas Endpoint
app.post('/api/business-ideas', async (req, res) => {
  try {
    const { market, budget } = req.body;
    const prompt = `Generate 5 profitable business ideas for ${market} market with ${budget} budget`;

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const ideas = result.response.text();

    res.json({ success: true, ideas });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 LUMINA Backend running on http://localhost:${PORT}`);
});