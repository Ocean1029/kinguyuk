"use client";

import { useEffect, useState } from "react";
import { createTranslator, type Lang } from "@/lib/dictionary";
import styles from "./about.module.css";

const SECTIONS = [
  { id: "story", label: "ab.nav.story" },
  { id: "values", label: "ab.nav.values" },
  { id: "team", label: "ab.nav.team" },
  { id: "inside", label: "ab.nav.inside" },
  { id: "contact-info", label: "ab.nav.contact" },
] as const;

export default function AboutSubnav({ lang }: { lang: Lang }) {
  const t = createTranslator(lang);
  const [active, setActive] = useState<string>("story");

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const secs = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el != null,
    );
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    secs.forEach((s) => spy.observe(s));
    return () => spy.disconnect();
  }, []);

  return (
    <aside className={styles.subnav} aria-label="On this page">
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={active === s.id ? styles.isActive : undefined}
        >
          {t(s.label)}
        </a>
      ))}
    </aside>
  );
}
