import { NextRequest, NextResponse } from "next/server";
import { LANGS, DEFAULT_LANG } from "@/lib/dictionary";

/**
 * Locale routing: every page lives under /en or /zh. Requests without a locale
 * prefix are redirected to the default locale, preserving the rest of the path.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LANGS.some(
    (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`),
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LANG}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // skip Next internals and any file with an extension (static assets)
  matcher: ["/((?!_next|.*\\..*).*)"],
};
