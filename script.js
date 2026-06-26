// Your Firebase Function URL
const API_URL = "https://chat-l4rexhru5q-uc.a.run.app";

async function ask() {
    const questionBox = document.getElementById("q");
    const output = document.getElementById("out");

    const question = questionBox.value.trim();

    if (!question) {
        output.textContent = "Please enter a question.";
        return;
    }

    output.textContent = "Thinking...";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question
            })
        });

        if (!response.ok) {
            throw new Error(`Server returned ${response.status}`);
        }

        const data = await response.json();

        if (data.answer) {
            output.textContent = data.answer;
        } else if (data.error) {
            output.textContent = "Error: " + data.error;
        } else {
            output.textContent = "No response received.";
        }

    } catch (err) {
        console.error(err);
        output.textContent =
            "Unable to connect to the AI service.\n\n" + err.message;
    }
}

// Allow pressing Enter to submit
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("q");
    if (input) {
        input.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                ask();
            }
        });
    }
});
