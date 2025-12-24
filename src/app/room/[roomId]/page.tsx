"use client";

import { Send } from "lucide-react";
import { use, useRef, useState } from "react";

const formatTimeRemaining = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const [copied, setCopied] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(129);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { roomId } = use(params);

  const copyLink = () => {
    // Get the current url :
    const url = window.location.href;

    // Copy the url to clipboard :
    navigator.clipboard.writeText(url);

    setCopied(true);

    // Reset the copy status after 5 seconds :
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  return (
    <main className="flex flex-col h-screen max-h-screen overflow-hidden">
      <header className="border-b border-zinc-800 p-4 flex items-center justify-between bg-zinc-900/30">
        <div className="flex items-center gap-4">
          {/* RoomID with copy button : */}
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500 uppercase">Room ID</span>

            <div className="flex items-center gap-2">
              {/* RoomID : */}
              <span className="font-bold text-green-500 text-xs md:text-sm">
                {roomId}
              </span>

              {/* Copy button : */}
              <button
                className="text-[10px] bg-zinc-800 hover:bg-zinc-700 px-2 py-0.5 rounded text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                onClick={() => copyLink()}
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          <div className="h-8 w-px bg-zinc-800" />

          {/* Countdown Timer : */}
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500 uppercase">
              Self-Destruct
            </span>

            {/* Timer : */}
            <span
              className={`text-sm font-bold flex items-center gap-2 ${
                timeRemaining !== null && timeRemaining < 60
                  ? "text-red-500"
                  : "text-amber-500"
              }`}
            >
              {timeRemaining !== null
                ? formatTimeRemaining(timeRemaining)
                : "--:--"}
            </span>
          </div>

          <div className="h-8 w-px bg-zinc-800" />
        </div>

        <button className="text-xs bg-zinc-800 hover:bg-red-500 px-3 py-1.5 rounded text-zinc-400 hover:text-white font-bold transition-all group flex items-center gap-2 disabled:opacity-50 cursor-pointer">
          <span className="group-hover:animate-pulse">💣</span>
          <span className="hidden md:block">DESTROY NOW</span>
        </button>
      </header>

      {/* Message display area : */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin"></div>

      {/* Input : */}
      <div className="p-4 border-t border-zinc-800 bg-zinc-900/30">
        <div className="flex gap-4">
          {/* Input box :*/}
          <div className="flex-1 relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500 animate-pulse">
              {">"}
            </span>

            <input
              autoFocus
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim()) {
                  // TODO: SEND MESSAGE

                  // Once the "Enter" is hit, the focus should still stay on the input:
                  inputRef.current?.focus();
                }
              }}
              placeholder="Type message..."
              className="w-full bg-black border border-zinc-800 focus:border-zinc-700 focus:outline-none transition-colors text-zinc-100 placeholder:text-zinc-700 py-3 pl-8 pr-4 text-sm"
            />
          </div>

          {/* Send button : */}
          <button className="bg-zinc-800 text-zinc-400 px-4 md:px-6 text-sm font-bold hover:text-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
            <span className="hidden md:block">SEND</span>
            <Send className="block md:hidden" />
          </button>
        </div>
      </div>
    </main>
  );
}
