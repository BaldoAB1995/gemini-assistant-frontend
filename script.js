document.addEventListener("DOMContentLoaded", () => {

  const backendUrl = "https://gemini-assistant-backend.onrender.com/chat";

  const input = document.getElementById("user-input");
  const sendBtn = document.getElementById("send");
  const messages = document.getElementById("messages");

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
      console.log("Invio al backend:", text);
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });

      console.log("Status fetch:", res.status);

      if (!res.ok) {
        addMessage("bot", "Errore backend: " + res.status);
        return;
      }

      const data = await res.json();
      console.log("Risposta dal backend:", data);

      // lettura robusta della risposta
      let reply = "Errore: nessuna risposta";

      if (data.candidates && data.candidates.length > 0) {
        const content = data.candidates[0].content;
        addMessage("bot", "IN 1");
        if (content && content.length > 0 && content[0].parts && content[0].parts.length >0 && content[0],parts[0].text) {
          addMessage("bot", "IN 2");
          reply = data.candidates[0].content[0].parts[0].text;
        }
      } else if (data.responseText) {
        reply = data.responseText;
      } else if (data.output_text) {
        reply = data.output_text;
      }

      addMessage("bot", reply);

    } catch (err) {
      console.error("Errore fetch:", err);
      addMessage("bot", "Errore di rete, riprova.");
    }
  }

  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
  });

});
