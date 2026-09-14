import { db, schema } from "@/db";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import NoteForm from "@/components/NoteForm";
import { PageTitle } from "@/components/Tabs";
import { Icon } from "@/components/Icons";
import { updateNote, deleteNote, bumpViews } from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function NotePage(props: PageProps<"/n/[id]">) {
  const { id: raw } = await props.params;
  const { edit } = await props.searchParams;
  const id = Number(raw);
  if (!Number.isInteger(id)) notFound();
  const [note] = await db.select().from(schema.notes).where(eq(schema.notes.id, id));
  if (!note) notFound();
  if (!edit) await bumpViews(id);

  const update = updateNote.bind(null, id);
  const remove = deleteNote.bind(null, id);

  return (
    <>
      <PageTitle>
        {note.pinned && <Icon name="i-bookmark" className="text-pink" />}
        <span className="flex-1 min-w-0 break-words">{note.title}</span>
      </PageTitle>
      <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted mb-4">
        <span><Icon name="i-eye" /> {note.views + (edit ? 0 : 1)}</span>
        {note.tags.map((t) => <Link key={t} href={`/search?q=${encodeURIComponent(t)}`} className="hover:text-pink">#{t}</Link>)}
        <span>updated {note.updatedAt.toLocaleString()}</span>
        <span className="ml-auto flex gap-3">
          {edit ? <Link href={`/n/${id}`} className="hover:text-pink">Cancel</Link>
                : <Link href={`/n/${id}?edit=1`} className="hover:text-pink flex items-center gap-1"><Icon name="i-pen" /> Edit</Link>}
          <form action={remove}><button className="hover:text-pink flex items-center gap-1"><Icon name="i-trash" /> Delete</button></form>
        </span>
      </div>
      {edit ? (
        <NoteForm note={note} action={update} submitLabel="Update" />
      ) : (
        <article className="bg-panel border border-line rounded-sm p-4 whitespace-pre-wrap break-words leading-relaxed max-w-[800px] min-h-[200px]">
          {note.body || <span className="text-muted">Empty note.</span>}
        </article>
      )}
    </>
  );
}
