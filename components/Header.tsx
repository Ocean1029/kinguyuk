"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Menu } from "lucide-react";
import type { Lang } from "@/lib/dictionary";
import { localePath } from "@/lib/nav";
import styles from "./Header.module.css";

export type HeaderItem = {
  id: "capabilities" | "products" | "odm" | "about" | "contact";
  href: string;
  label: string;
};

type Props = {
  lang: Lang;
  items: HeaderItem[];
  onHome: boolean;
};

export default function Header({ lang, items, onHome }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const enRef = useRef<HTMLAnchorElement>(null);
  const zhRef = useRef<HTMLAnchorElement>(null);
  const [pill, setPill] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  // header scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // position the sliding language pill over the active option
  useEffect(() => {
    function place() {
      const active = lang === "zh" ? zhRef.current : enRef.current;
      if (active) setPill({ left: active.offsetLeft - 3, width: active.offsetWidth });
    }
    place();
    window.addEventListener("resize", place);
    if (document.fonts?.ready) document.fonts.ready.then(place);
    return () => window.removeEventListener("resize", place);
  }, [lang]);

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("ky_theme", next);
    } catch {}
  }

  // build the equivalent path in the other locale, keeping the current page
  const rest = pathname.replace(/^\/(en|zh)/, "") || "";
  const enHref = `/en${rest}`;
  const zhHref = `/zh${rest}`;
  const brandHref = onHome ? "#top" : localePath(lang);

  return (
    <header className={`${styles.header}${scrolled ? ` ${styles.scrolled}` : ""}`}>
      <div className={`wrap ${styles.inner}`}>
        <Link className={styles.brand} href={brandHref} aria-label="KINGYUK home">
          <span className={styles.mark}>KINGYUK</span>
          <span className={styles.markCn}>璟昱</span>
        </Link>

        <nav
          className={`${styles.nav}${menuOpen ? ` ${styles.open}` : ""}`}
          aria-label="Primary"
        >
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={item.id === currentFromPath(pathname) ? styles.isCurrent : undefined}
              aria-current={item.id === currentFromPath(pathname) ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.controls}>
          <div className={styles.langToggle} role="group" aria-label="Language">
            <span
              className={styles.langPill}
              aria-hidden="true"
              style={{ transform: `translateX(${pill.left}px)`, width: pill.width }}
            />
            <Link ref={enRef} href={enHref} className={lang === "en" ? styles.active : undefined}>
              EN
            </Link>
            <Link ref={zhRef} href={zhHref} className={lang === "zh" ? styles.active : undefined}>
              中文
            </Link>
          </div>

          <button className={`${styles.iconBtn} ${styles.themeToggle}`} onClick={toggleTheme} aria-label="Toggle dark / light">
            <Sun className={styles.sun} size={18} strokeWidth={1.8} />
            <Moon className={styles.moon} size={18} strokeWidth={1.8} />
          </button>

          <button
            className={`${styles.iconBtn} ${styles.menuBtn}`}
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Menu size={18} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </header>
  );
}

/** Derive the active nav id from the pathname (so client nav highlights correctly). */
function currentFromPath(pathname: string): string | null {
  const rest = pathname.replace(/^\/(en|zh)/, "");
  if (rest.startsWith("/products")) return "products";
  if (rest.startsWith("/odm")) return "odm";
  if (rest.startsWith("/about")) return "about";
  if (rest.startsWith("/contact")) return "contact";
  return null;
}
