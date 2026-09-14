import Link from "next/link";
import type { Note } from "@/db/schema";
import { Icon } from "./Icons";

// Deterministic grey/pink tint per note so the grid has some texture, like thumbnails did.
const tints = ["#2a2a2a", "#303030", "#262626", "#2e2529", "#232323", "#2c2c2c"];

export default function NoteTile({ note }: { note: Note }) {
  const tint = tints[note.id % tints.length];
  const preview = note.body.replace(/\s+/g, " ").slice(0, 140);
  return (
    <div className="album">
      <Link href={`/n/${note.id}`} className="block relative aspect-square overflow-hidden rounded-sm border border-line hover:border-pink" style={{ background: tint }}>
        <div className={`p-2 ${note.pinned ? "pt-6" : ""} text-[11px] text-muted leading-snug h-full overflow-hidden whitespace-pre-wrap break-words`}>{preview || "(empty)"}</div>
        {note.pinned && <span className="absolute top-1 left-1 text-pink"><Icon name="i-bookmark" /></span>}
        <span className="absolute bottom-1 right-1 bg-black/70 text-[10px] px-1.5 py-0.5 rounded-sm flex items-center gap-1">
          <Icon name="i-eye" />{note.views}
        </span>
      </Link>
      <div className="mt-1.5 flex items-start gap-2">
        <div className="w-7 h-7 rounded-full bg-pink text-black font-bold flex items-center justify-center text-[12px] shrink-0 uppercase">
          {note.title.trim()[0] ?? "?"}
        </div>
        <div className="min-w-0">
          <Link href={`/n/${note.id}`} className="block text-[12px] font-semibold leading-tight line-clamp-2 hover:text-pink">{note.title}</Link>
          <span className="text-muted text-[11px]">{note.tags.length ? note.tags.map((t) => `#${t}`).join(" ") : "no tags"}</span>
        </div>
      </div>
    </div>
  );
}

export function TileGrid({ notes, empty }: { notes: Note[]; empty: string }) {
  if (!notes.length) return <p className="text-muted py-10 text-center">{empty}</p>;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
      {notes.map((n) => <NoteTile key={n.id} note={n} />)}
    </div>
  );
}
