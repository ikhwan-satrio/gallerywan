import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const session = await verifySession(
    request.cookies.get(SESSION_COOKIE)?.value
  );
  const { pathname, search } = request.nextUrl;

  if (pathname === "/login") {
    if (session) {
      return NextResponse.redirect(new URL("/upload", request.url));
    }

    return NextResponse.next();
  }

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", `${pathname}${search}`);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/upload", "/login"],
};
