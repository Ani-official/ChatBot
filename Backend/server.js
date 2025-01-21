const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

// Initialize Prisma Client
const prisma = new PrismaClient();

// Gemini API configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Add your Gemini API Key here

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Endpoint for Chatbot
app.post('/api/chat', async (req, res) => {
  const { message, use_ai } = req.body;

  try {
    if (use_ai) {
      // Get AI response from Gemini
      const aiResponse = await getGeminiResponse(message);
      return res.json({ reply: aiResponse });
    }

    // Otherwise, query the database for a case-insensitive match
    const query = await prisma.$queryRaw`
      SELECT * FROM "Query" WHERE LOWER(question) = LOWER(${message}) LIMIT 1;
    `;

    if (query.length > 0) {
      // Respond with the matching answer from the database
      res.json({ reply: query[0].answer });
    } else {
      // If no match found in the database, send a fallback response
      res.json({
        reply: "I'm not sure about that. Could you try asking something else?",
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Something went wrong on our end.' });
  }
});

// Function to get AI response using Gemini API
async function getGeminiResponse(userMessage) {
    try {
      const result = await model.generateContent({
        contents: [{ parts: [{ text: userMessage }] }],
        
      }, {
        
      });
  
      return result.response.text();
    } catch (error) {
      console.error('Error with Gemini API:', error.message);
      return "Sorry, I couldn't generate a response at the moment. Please try again later.";
    }
  }

// Start the Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Graceful Shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await prisma.$disconnect();
  process.exit(0);
});
