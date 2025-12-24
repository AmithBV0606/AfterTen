"use client";

import { use, useState } from "react";

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
    </main>
  );
}
