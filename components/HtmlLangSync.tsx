"use client";

import { useEffect } from "react";
import type { Lang } from "@/lib/dictionary";

/**
 * Keeps <html lang> in sync with the routed locale for accessibility and
 * persists the choice so the theme/lang pre-paint script and Header toggle
 * stay consistent across visits.
 */
export default function HtmlLangSync({ lang }: { lang: Lang }) {
  useEffect(() => {
    document.documentElement.setAttribute("lang", lang === "zh" ? "zh-Hans" : "en");
    try {
      localStorage.setItem("ky_lang", lang);
    } catch {}
  }, [lang]);

  return null;
}
