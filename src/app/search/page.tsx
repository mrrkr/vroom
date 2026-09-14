import { db, schema } from "@/db";
import { desc, ilike, or, sql } from "drizzle-orm";
import Link from "next/link";
import { TileGrid } from "@/components/NoteTile";
import { Tabs, PageTitle } from "@/components/Tabs";
import { Icon } from "@/components/Icons";

export const dynamic = "force-dynamic";

export default async function Search(props: PageProps<"/search">) {
  const sp = await props.searchParams;
  const q = String(sp.q ?? "").trim();
  const isNew = sp.o === "new";
  const like = `%${q}%`;
  const rows = q
    ? await db.select().from(schema.notes)
        .where(or(ilike(schema.notes.title, like), ilike(schema.notes.body, like), sql`${q.toLowerCase()} = ANY(${schema.notes.tags})`))
        .orderBy(isNew ? desc(schema.notes.createdAt) : desc(schema.notes.views))
        .limit(120)
    : [];

  // Tag cloud stands in for "related searches"
  const tagRows = await db.execute<{ tag: string; n: number }>(
    sql`select t as tag, count(*)::int as n from ${schema.notes}, unnest(tags) t group by t order by n desc limit 30`
  );

  const enc = encodeURIComponent(q);
  return (
    <>
      <PageTitle>
        <Icon name="i-search" className="text-pink" />
        {q ? <>Search: <span className="text-pink">&quot;{q}&quot;</span></> : "Tags"}
      </PageTitle>
      {q && (
        <>
          <Tabs items={[{ href: `/search?q=${enc}`, label: "Hot", active: !isNew }, { href: `/search?q=${enc}&o=new`, label: "New", active: isNew }]} />
          <TileGrid notes={rows} empty={`No notes match "${q}".`} />
        </>
      )}
      <h2 className="text-[15px] font-bold mt-8 mb-3 flex items-center gap-2"><Icon name="i-hash" className="text-pink" /> {q ? "Related tags" : "All tags"}</h2>
      <div className="flex flex-wrap gap-2">
        {tagRows.rows.length ? tagRows.rows.map((t) => (
          <Link key={t.tag} href={`/search?q=${encodeURIComponent(t.tag)}`} className="bg-panel border border-line hover:border-pink px-3 py-1.5 rounded-sm text-[12px]">
            {t.tag} <span className="text-muted">{t.n}</span>
          </Link>
        )) : <span className="text-muted">No tags yet.</span>}
      </div>
    </>
  );
}
