"use client";

import { useState, useRef, useEffect } from "react";
import { FiSend, FiPaperclip } from "react-icons/fi";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ user: string; bot: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setChat([{ user: "", bot: "Hey! How can I help you today?" }]);
  }, []);

  const formatText = (text: string) => {
    return text.replace(/\*\*/g, "").replace(/\\n/g, "\n").trim();
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    if (!hasInteracted) setHasInteracted(true);

    setLoading(true);
    const newChat = [...chat, { user: message, bot: "..." }];
    setChat(newChat);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      setChat([
        ...newChat.slice(0, -1),
        { user: message, bot: formatText(data.reply) },
      ]);
    } catch (error) {
      setChat([
        ...newChat.slice(0, -1),
        { user: message, bot: "Error fetching response" },
      ]);
    }

    setLoading(false);
    setMessage("");
    inputRef.current?.focus();
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-teal-400 via-blue-600 to-indigo-800 text-white p-6">
      <div className="text-2xl font-bold mb-6">Cybersecurity Chatbot</div>

      <div
        className={`w-full max-w-2xl overflow-y-auto bg-white rounded-xl p-4 space-y-3 shadow-lg mb-6 transition-all duration-500 ${
          hasInteracted ? "h-[80vh]" : "h-[400px]"
        }`}
      >
        {chat.map((c, i) => (
          <div key={i} className="flex flex-col">
            {c.user && (
              <div className="self-end bg-blue-100 text-blue-900 p-3 rounded-lg max-w-lg shadow-md">
                {c.user}
              </div>
            )}
            <div
              className="self-start bg-gray-900 text-white p-3 rounded-lg max-w-lg shadow-md mt-2"
              style={{ whiteSpace: "pre-line" }}
            >
              {c.bot}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center w-full max-w-2xl bg-white p-3 rounded-lg shadow-lg">
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <FiPaperclip size={20} />
        </button>
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 p-2 mx-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          {loading ? "..." : <FiSend size={20} />}
        </button>
      </div>
    </div>
  );
}
