import type { Note } from "@/db/schema";

export default function NoteForm({ note, action, submitLabel }: { note?: Note; action: (form: FormData) => Promise<void>; submitLabel: string }) {
  const input = "w-full bg-panel border border-line rounded-sm px-3 py-2 text-[13px] focus:border-pink";
  return (
    <form action={action} className="flex flex-col gap-3 max-w-[800px]">
      <input name="title" defaultValue={note?.title} placeholder="Title" required maxLength={200} className={`${input} text-[16px] font-semibold`} />
      <textarea name="body" defaultValue={note?.body} placeholder="Write anything…" rows={14} className={`${input} font-mono leading-relaxed`} />
      <div className="grid sm:grid-cols-2 gap-3">
        <input name="tags" defaultValue={note?.tags.join(" ")} placeholder="tags: health money ideas" className={input} />
        <label className="flex items-center gap-2 text-[12px] uppercase font-bold tracking-wider text-muted">
          <input name="pinned" type="checkbox" defaultChecked={note?.pinned} className="accent-pink w-4 h-4" /> Pin to HOT
        </label>
      </div>
      <div>
        <button className="bg-pink hover:bg-pink-dark text-black font-bold uppercase text-[12px] tracking-wider px-5 py-2 rounded-sm">{submitLabel}</button>
      </div>
    </form>
  );
}
