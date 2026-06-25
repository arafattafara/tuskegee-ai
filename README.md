# Tuskegee AI Assistant Website

This is a GitHub Pages-ready static website for a Tuskegee-focused AI assistant.

## Files

- `index.html` — Main website page
- `style.css` — Website design
- `script.js` — Loads Tuskegee data and sends prompts to an LLM backend
- `tuskegee-data.json` — Local Tuskegee knowledge base
- `firebase-function-example.js` — Example secure backend function

## Important Security Note

Do not put an OpenAI, Anthropic, Gemini, or other LLM API key directly inside `script.js`.
GitHub Pages is public, so anyone can see the code.

Use a backend such as:

- Firebase Cloud Functions
- Vercel Serverless Functions
- Netlify Functions
- University-hosted API server

Then replace this line in `script.js`:

```js
const API_ENDPOINT = 'https://YOUR-BACKEND-ENDPOINT.example.com/api/chat';
```

with your real backend URL.

## How to publish on GitHub Pages

1. Create a new GitHub repository.
2. Upload all files from this folder.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/root` folder.
6. Save. GitHub will generate your public website link.

## How to customize the Tuskegee data

Edit `tuskegee-data.json`. Add official Tuskegee information, policies, program descriptions, course details, office information, or workshop schedules.

Use only information that is approved for public use.
