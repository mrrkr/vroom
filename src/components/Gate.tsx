"use client";
import { useState } from "react";
import Image from "next/image";

// Same gate as the reference site: full-screen overlay on top of Explore, removed on click.
// Shown once per app session (sessionStorage), so every fresh open of the app starts here.
const KEY = "vroom:entered";

export default function Gate() {
  const [open, setOpen] = useState(() => {
    if (typeof window === "undefined") return true;
    try { return sessionStorage.getItem(KEY) !== "1"; } catch { return true; }
  });
  if (!open) return null;

  function enter() {
    try { sessionStorage.setItem(KEY, "1"); } catch {}
    setOpen(false);
  }

  return (
    <div id="disclaimer" className="fixed inset-0 z-[1002] bg-[#232323] overflow-hidden">
      <div className="absolute inset-0 opacity-60"
        style={{ background: "radial-gradient(60% 50% at 30% 20%, #eb639533 0%, transparent 70%), radial-gradient(50% 60% at 80% 80%, #eb639522 0%, transparent 70%)" }} />
      <div id="home-box" className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <Image src="/images.png" alt="vroom" width={140} height={140} priority className="mb-2" />
        <div className="text-[30px] font-bold tracking-[3px] uppercase mb-6">vro<span className="text-pink">om</span></div>
        <div className="home-text-center max-w-[420px] text-[13px] leading-relaxed text-ink/90 mb-6">
          Track yourself. All your personal stuff lives here — notes, lists, reminders, answers. Everything you save is kept in the cloud and is waiting for you every time you open the app.
        </div>
        <button onClick={enter}
          className="w-[240px] leading-[38px] text-[12px] font-bold uppercase tracking-[0.5px] bg-pink hover:bg-pink-dark text-[#1b1b1b] hover:text-white rounded-[2px]">
          Explore
        </button>
      </div>
    </div>
  );
}
