"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE, sessionToken } from "@/lib/session";

export async function unlock(_prev: string | null, form: FormData): Promise<string | null> {
  const pin = String(form.get("pin") ?? "").trim();
  const expected = process.env.VROOM_PIN;
  if (!expected) return "PIN is not configured on the server.";
  if (pin !== expected) return "Wrong PIN.";
  const jar = await cookies();
  // Session cookie (no maxAge): closing the browser/app locks it again.
  jar.set(COOKIE, await sessionToken(), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/" });
  redirect("/explore");
}
