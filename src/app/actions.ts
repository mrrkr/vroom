"use server";
import { db, schema } from "@/db";
import { eq, sql } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

function parseTags(raw: FormDataEntryValue | null) {
  return String(raw ?? "")
    .split(/[,\s#]+/)
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 20);
}

function fields(form: FormData) {
  const title = String(form.get("title") ?? "").trim().slice(0, 200) || "Untitled";
  const body = String(form.get("body") ?? "").slice(0, 50_000);
  const noteDate = String(form.get("noteDate") ?? "").trim() || null;
  const pinned = form.get("pinned") === "on";
  return { title, body, noteDate, pinned, tags: parseTags(form.get("tags")) };
}

export async function createNote(form: FormData) {
  const [row] = await db.insert(schema.notes).values(fields(form)).returning({ id: schema.notes.id });
  revalidatePath("/");
  redirect(`/n/${row.id}`);
}

export async function updateNote(id: number, form: FormData) {
  await db.update(schema.notes).set({ ...fields(form), updatedAt: new Date() }).where(eq(schema.notes.id, id));
  revalidatePath("/");
  revalidatePath(`/n/${id}`);
  redirect(`/n/${id}`);
}

export async function deleteNote(id: number) {
  await db.delete(schema.notes).where(eq(schema.notes.id, id));
  revalidatePath("/");
  redirect("/");
}

export async function bumpViews(id: number) {
  await db.update(schema.notes).set({ views: sql`${schema.notes.views} + 1` }).where(eq(schema.notes.id, id));
}
