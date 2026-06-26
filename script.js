const API_URL = "https://chat-l4rexhru5q-uc.a.run.app";

async function ask() {
  const q = document.getElementById("q").value;
  const out = document.getElementById("out");

  out.textContent = "Thinking...";

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question: q })
  });

  const data = await response.json();
  out.textContent = data.answer || data.error || "No answer returned.";
}
