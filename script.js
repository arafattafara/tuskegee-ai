let tuskegeeData = null;

const askBtn = document.getElementById('askBtn');
const questionBox = document.getElementById('question');
const statusBox = document.getElementById('status');
const answerBox = document.getElementById('answer');
const dataPreview = document.getElementById('dataPreview');

async function loadTuskegeeData() {
  try {
    const response = await fetch('tuskegee-data.json');
    tuskegeeData = await response.json();
    dataPreview.textContent = JSON.stringify(tuskegeeData, null, 2);
  } catch (error) {
    dataPreview.textContent = 'Could not load tuskegee-data.json.';
    console.error(error);
  }
}

function buildPrompt(question) {
  return `You are a Tuskegee University AI assistant. Use only the Tuskegee data below unless clearly stated otherwise. If the data does not include the answer, say so clearly.\n\nTuskegee data:\n${JSON.stringify(tuskegeeData, null, 2)}\n\nUser question:\n${question}`;
}

async function askAI() {
  const question = questionBox.value.trim();
  if (!question) {
    answerBox.textContent = 'Please type a question first.';
    return;
  }

  if (!tuskegeeData) {
    answerBox.textContent = 'Tuskegee data is still loading. Please try again.';
    return;
  }

  askBtn.disabled = true;
  statusBox.textContent = 'Sending question to AI...';
  answerBox.textContent = '';

  try {
    // IMPORTANT: GitHub Pages cannot safely store an API key.
    // Replace this URL with your secure backend endpoint, for example:
    // Firebase Cloud Function, Vercel Serverless Function, Netlify Function, or your university server.
    const API_ENDPOINT = 'https://YOUR-BACKEND-ENDPOINT.example.com/api/chat';

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: buildPrompt(question),
        question,
        tuskegeeData
      })
    });

    if (!response.ok) {
      throw new Error('API request failed. Check your backend endpoint.');
    }

    const data = await response.json();
    answerBox.textContent = data.answer || data.message || 'No answer returned.';
  } catch (error) {
    answerBox.textContent =
      'The website loaded correctly, but the LLM backend is not connected yet. Update API_ENDPOINT in script.js and deploy a backend that calls your LLM provider securely.';
    console.error(error);
  } finally {
    statusBox.textContent = '';
    askBtn.disabled = false;
  }
}

askBtn.addEventListener('click', askAI);
loadTuskegeeData();
