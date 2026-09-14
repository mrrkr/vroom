import { NextResponse, type NextRequest } from "next/server";
import { COOKIE, isValidSession } from "@/lib/session";

// Everything except the gate itself and static assets needs an unlocked session.
export async function proxy(req: NextRequest) {
  if (await isValidSession(req.cookies.get(COOKIE)?.value)) return NextResponse.next();
  return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|manifest.json|images.png|icon-192.png|icon-512.png|apple-touch-icon.png|$).*)"],
};
