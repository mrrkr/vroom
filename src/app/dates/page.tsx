import { db, schema } from "@/db";
import { asc, desc, eq, isNotNull } from "drizzle-orm";
import Link from "next/link";
import { TileGrid } from "@/components/NoteTile";
import { PageTitle } from "@/components/Tabs";
import { Icon } from "@/components/Icons";

export const dynamic = "force-dynamic";
export const metadata = { title: "Dates" };

export default async function Dates(props: PageProps<"/dates">) {
  const { d } = await props.searchParams;
  const day = typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : null;
  const rows = await db.select().from(schema.notes)
    .where(day ? eq(schema.notes.noteDate, day) : isNotNull(schema.notes.noteDate))
    .orderBy(desc(schema.notes.noteDate), asc(schema.notes.title));

  const today = new Date().toISOString().slice(0, 10);
  const groups = new Map<string, typeof rows>();
  for (const n of rows) groups.set(n.noteDate!, [...(groups.get(n.noteDate!) ?? []), n]);

  const chip = (active: boolean) => `px-3 py-1.5 rounded-sm border ${active ? "bg-pink text-black border-pink" : "bg-panel border-line hover:border-pink"}`;
  return (
    <>
      <PageTitle><Icon name="i-clock" className="text-pink" /> Dates {day && <span className="text-pink">{day}</span>}</PageTitle>
      <div className="mb-5 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-wider">
        <Link href="/dates" className={chip(!day)}>All</Link>
        <Link href={`/dates?d=${today}`} className={chip(day === today)}>Today</Link>
        <form className="flex items-center gap-2">
          <input type="date" name="d" defaultValue={day ?? ""} className="bg-panel border border-line rounded-sm px-2 py-1 text-[12px]" />
          <button className={chip(false)}>Go</button>
        </form>
      </div>
      {!groups.size && <p className="text-muted py-10 text-center">No dated notes{day ? ` on ${day}` : ""}. Give a note a date when you save it.</p>}
      {[...groups].map(([date, notes]) => (
        <section key={date} className="mb-8">
          <h2 className="text-[13px] font-bold mb-3 flex items-center gap-2">
            <Link href={`/dates?d=${date}`} className={`px-2 py-0.5 rounded-sm ${date === today ? "bg-pink text-black" : "bg-panel-2"}`}>{date}</Link>
            {date === today && <span className="text-pink text-[11px] uppercase">today</span>}
            <span className="text-muted font-normal">{notes.length}</span>
          </h2>
          <TileGrid notes={notes} empty="" />
        </section>
      ))}
    </>
  );
}
