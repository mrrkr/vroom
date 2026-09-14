"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./Icons";

const KEY = "vroom:recent-searches";

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const router = useRouter();

  function show() {
    try { setRecent(JSON.parse(localStorage.getItem(KEY) ?? "[]")); } catch {}
    setOpen(true);
  }

  function go(term: string) {
    const t = term.trim();
    if (!t) return;
    try {
      const next = [t, ...recent.filter((r) => r !== t)].slice(0, 8);
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(t)}`);
  }

  function forget(term: string) {
    const next = recent.filter((r) => r !== term);
    setRecent(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  }

  return (
    <>
      <button onClick={show} aria-label="Search" className="hover:text-pink flex items-center gap-1">
        <Icon name="i-search" /> <span className="hidden sm:inline">Search</span>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/95 overflow-auto" onClick={() => setOpen(false)}>
          <div className="max-w-[700px] mx-auto pt-4 px-3" onClick={(e) => e.stopPropagation()}>
            <div className="text-right">
              <button onClick={() => setOpen(false)} aria-label="Close" className="text-2xl text-muted hover:text-ink px-2">×</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); go(q); }} className="flex items-center bg-panel border border-line rounded-sm">
              <span className="px-3 text-muted"><Icon name="i-search" /></span>
              <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search your notes" maxLength={100}
                className="flex-1 bg-transparent py-3 text-[15px] placeholder:text-muted" />
              {q && <button type="button" onClick={() => setQ("")} className="px-3 text-muted"><Icon name="i-x" /></button>}
            </form>
            <div className="mt-2">
              {recent.map((r) => (
                <p key={r} className="flex items-center gap-2 py-2 px-2 border-b border-line text-[13px]">
                  <span className="text-muted"><Icon name="i-clock" /></span>
                  <button className="flex-1 text-left" onClick={() => go(r)}>{r}</button>
                  <button className="text-muted hover:text-pink" onClick={() => forget(r)} aria-label="Remove"><Icon name="i-x" /></button>
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
