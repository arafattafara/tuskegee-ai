const API_URL = "https://chat-l4rexhru5q-uc.a.run.app";

function addMessage(role, text) {
  const conversation = document.getElementById("conversation");
  const message = document.createElement("div");
  message.className = "message " + role;

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = role === "user" ? "You" : "TU";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  message.appendChild(avatar);
  message.appendChild(bubble);
  conversation.appendChild(message);
  conversation.scrollTop = conversation.scrollHeight;
  return bubble;
}

function fillQuestion(question) {
  document.getElementById("q").value = question;
  ask();
}

async function ask() {
  const questionInput = document.getElementById("q");
  const question = questionInput.value.trim();

  if (!question) {
    addMessage("assistant", "Please type a question first.");
    return;
  }

  addMessage("user", question);
  questionInput.value = "";
  const thinkingBubble = addMessage("assistant", "Thinking...");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ question })
    });

    const text = await response.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch {
      data = { answer: text };
    }

    thinkingBubble.textContent = data.answer || data.error || "No response received.";
  } catch (error) {
    console.error(error);
    thinkingBubble.textContent = "Unable to connect to the AI backend. Please check the API URL and CORS settings.";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("q");
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      ask();
    }
  });
});
