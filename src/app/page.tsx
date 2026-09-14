import { db, schema } from "@/db";
import { desc } from "drizzle-orm";
import { TileGrid } from "@/components/NoteTile";
import { Tabs, PageTitle } from "@/components/Tabs";
import { Icon } from "@/components/Icons";

export const dynamic = "force-dynamic";

export default async function Explore(props: PageProps<"/">) {
  const { o } = await props.searchParams;
  const isNew = o === "new";
  const rows = await db.select().from(schema.notes)
    .orderBy(...(isNew ? [desc(schema.notes.createdAt)] : [desc(schema.notes.pinned), desc(schema.notes.views), desc(schema.notes.updatedAt)]))
    .limit(120);
  return (
    <>
      <PageTitle><Icon name="i-fire" className="text-pink" /> Explore</PageTitle>
      <Tabs items={[{ href: "/", label: "Hot", active: !isNew }, { href: "/?o=new", label: "New", active: isNew }]} />
      <TileGrid notes={rows} empty="Nothing here yet. Hit New to add your first note." />
    </>
  );
}
