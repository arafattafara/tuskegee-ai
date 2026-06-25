// Example Firebase Cloud Function backend for OpenAI-compatible chat.
// Do NOT upload your API key to GitHub.
// Set it with Firebase config, environment variables, or Secret Manager.

const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });

exports.chat = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const { prompt } = req.body;
      const apiKey = process.env.OPENAI_API_KEY;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4.1-mini',
          messages: [
            { role: 'system', content: 'You are a helpful Tuskegee University assistant.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.2
        })
      });

      const data = await response.json();
      const answer = data.choices?.[0]?.message?.content || 'No answer returned.';
      res.json({ answer });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});
