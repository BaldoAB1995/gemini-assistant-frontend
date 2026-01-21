const backendUrl = "https://TUO-BACKEND.onrender.com/chat";

const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send");
const messages = document.getElementById("messages");

sendBtn.onclick = async () => {
  const text = input.value.trim();
  if (!text) return;

  addMessage("user", text);
  input.value = "";

  const res = await fetch(backendUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  const data = await res.json();
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Errore";

  addMessage("bot", reply);
};

function addMessage(type, text) {
  const div = document.createElement("div");
  div.className = msg ${type};
  div.innerText = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}
