"use client";
import { useActionState, useState } from "react";
import { unlock } from "@/app/pin";

// Same gate as the reference site: dark full-screen box, description, one pink button.
// Explore -> 4-digit PIN -> server verifies -> Explore page.
export default function Gate() {
  const [askPin, setAskPin] = useState(false);
  const [error, action, pending] = useActionState(unlock, null);

  return (
    <div id="disclaimer" className="fixed inset-0 z-[1002] bg-[#232323] overflow-hidden">
      <div className="absolute inset-0 opacity-60"
        style={{ background: "radial-gradient(60% 50% at 30% 20%, #eb639533 0%, transparent 70%), radial-gradient(50% 60% at 80% 80%, #eb639522 0%, transparent 70%)" }} />
      <div id="home-box" className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <div className="home-text-center max-w-[420px] text-[13px] leading-relaxed text-ink/90 mb-6">
          Track yourself. All your personal stuff lives here — notes, lists, reminders, answers. Everything you save is kept in the cloud and is waiting for you every time you open the app.
        </div>
        {!askPin ? (
          <button onClick={() => setAskPin(true)}
            className="w-[240px] leading-[38px] text-[12px] font-bold uppercase tracking-[0.5px] bg-pink hover:bg-pink-dark text-[#1b1b1b] hover:text-white rounded-[2px]">
            Explore
          </button>
        ) : (
          <form action={action} className="flex flex-col items-center gap-3">
            <input name="pin" type="password" inputMode="numeric" pattern="\d{4}" maxLength={4} autoFocus required autoComplete="off"
              placeholder="••••" aria-label="4-digit PIN"
              className="w-[240px] text-center text-[26px] tracking-[14px] bg-black/60 border border-line focus:border-pink rounded-[2px] py-2 placeholder:text-muted" />
            <button disabled={pending}
              className="w-[240px] leading-[38px] text-[12px] font-bold uppercase tracking-[0.5px] bg-pink hover:bg-pink-dark text-[#1b1b1b] hover:text-white rounded-[2px] disabled:opacity-60">
              {pending ? "Checking…" : "Enter"}
            </button>
            {error && <p className="text-pink text-[12px] font-bold">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
