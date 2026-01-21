console.log("Script Partito");
document.addEventListener("DOMContentLoaded", () => {

  const backendUrl = "https://gemini-assistant-backend.onrender.com/chat";
  console.log("Script linea 5");
  const input = document.getElementById("user-input");
  const sendBtn = document.getElementById("send");
  const messages = document.getElementById("messages");
  console.log("Script linea 9");
  function addMessage(type, text) {
    const div = document.createElement("div");
    div.className = `msg ${type}`;
    div.innerText = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage("user", text);
    input.value = "";

    try {
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });

      if (!res.ok) {
        addMessage("bot", "Errore backend: " + res.status);
        return;
      }

      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.[0]?.parts?[0].text || "Errore: nessuna risposta";
      addMessage("bot", reply);

    } catch (err) {
      console.error(err);
      addMessage("bot", "Errore di rete, riprova.");
    }
  }

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
  });

});
