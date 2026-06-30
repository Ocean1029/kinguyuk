"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { Lang } from "@/lib/dictionary";
import {
  PRODUCTS,
  LABELS,
  tl,
  type ProductCategory,
  type ProductItem,
  type SpecKey,
} from "@/lib/content";
import styles from "./products.module.css";

const SPEC_ORDER: SpecKey[] = ["material", "construction", "weight", "cutout", "charging", "compat"];

const CAT_CLASS: Record<ProductCategory["key"], string> = {
  phone: styles.phone,
  ipad: styles.ipad,
  macbook: styles.macbook,
};

type OpenRef = { cat: ProductCategory; item: ProductItem } | null;

export default function ProductsShowcase({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState<OpenRef>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const gridRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [dots, setDots] = useState<Record<string, Set<number>>>({});

  const close = useCallback(() => {
    setOpen(null);
    lastFocus.current?.focus();
    lastFocus.current = null;
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const computeDots = useCallback((key: string) => {
    const el = gridRefs.current[key];
    if (!el) return;
    const { scrollLeft, clientWidth, scrollWidth } = el;
    if (scrollWidth <= clientWidth + 1 || el.children.length < 2) {
      setDots((prev) => {
        if (!(key in prev)) return prev;
        const next = { ...prev };
        delete next[key];
        return next;
      });
      return;
    }
    const total = el.children.length;
    const stride = (el.children[1] as HTMLElement).offsetLeft - (el.children[0] as HTMLElement).offsetLeft;
    const visibleCount = Math.min(Math.round(clientWidth / stride), total);
    const firstVisible = Math.min(Math.round(scrollLeft / stride), total - visibleCount);
    const visible = new Set<number>();
    for (let i = firstVisible; i < firstVisible + visibleCount; i++) visible.add(i);
    setDots((prev) => {
      const existing = prev[key];
      if (existing && existing.size === visible.size && [...visible].every((v) => existing.has(v)))
        return prev;
      return { ...prev, [key]: visible };
    });
  }, []);

  useEffect(() => {
    const cleanups: (() => void)[] = [];
    PRODUCTS.forEach((cat) => {
      const el = gridRefs.current[cat.key];
      if (!el) return;
      computeDots(cat.key);
      const onScroll = () => computeDots(cat.key);
      el.addEventListener("scroll", onScroll, { passive: true });
      cleanups.push(() => el.removeEventListener("scroll", onScroll));
    });
    const onResize = () => PRODUCTS.forEach((cat) => computeDots(cat.key));
    window.addEventListener("resize", onResize);
    cleanups.push(() => window.removeEventListener("resize", onResize));
    return () => cleanups.forEach((fn) => fn());
  }, [computeDots]);

  function openItem(cat: ProductCategory, item: ProductItem, trigger: HTMLElement) {
    lastFocus.current = trigger;
    setOpen({ cat, item });
  }

  return (
    <>
      <div className={styles.root}>
        {PRODUCTS.map((cat) => (
          <div key={cat.key} className={`${styles.tile} ${CAT_CLASS[cat.key]} reveal`}>
            <h2 className={styles.tileName}>{tl(cat.name, lang)}</h2>
            <div className={styles.shelf}>
            <div ref={(el) => { gridRefs.current[cat.key] = el; }} className={styles.pcardGrid}>
              {cat.items.map((item) => (
                <button
                  key={item.id}
                  className={styles.pcard}
                  onClick={(e) => openItem(cat, item, e.currentTarget)}
                >
                  <div className={styles.pcardPh} style={{ position: "relative" }}>
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 720px) 50vw, 25vw"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <span className="ph-label">
                        <span>{item.name}</span>
                        <span className="dim">{tl(item.tag, lang)}</span>
                      </span>
                    )}
                    <span className={styles.pcardView}>{tl(LABELS.view, lang)}</span>
                  </div>
                  <div className={styles.pcardMeta}>
                    <span className={styles.pcardName}>{item.name}</span>
                    <span className={styles.pcardTag}>{tl(item.tag, lang)}</span>
                  </div>
                </button>
              ))}
            </div>
            </div>
            {dots[cat.key] && (
              <div className={styles.dots}>
                {(() => {
                  const vis = dots[cat.key];
                  const segs: React.ReactNode[] = [];
                  let i = 0;
                  while (i < cat.items.length) {
                    if (vis.has(i)) {
                      let count = 0;
                      const start = i;
                      while (i < cat.items.length && vis.has(i)) { count++; i++; }
                      segs.push(<span key={start} className={styles.dotBar} style={{ width: count * 15 - 8 }} />);
                    } else {
                      segs.push(<span key={i} className={styles.dot} />);
                      i++;
                    }
                  }
                  return segs;
                })()}
              </div>
            )}
            <span className={styles.tileIdx}>{cat.idx}</span>
          </div>
        ))}
      </div>

      <div
        className={`${styles.modal}${open ? ` ${styles.modalOpen}` : ""}`}
        aria-hidden={!open}
      >
        <div className={styles.backdrop} onClick={close} />
        {open && (
          <div className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="craftName">
            <button ref={closeRef} className={styles.close} onClick={close} aria-label="Close">
              <X size={18} strokeWidth={1.9} />
            </button>
            <div className={styles.inner}>
              <div className={styles.media}>
                <div className="ph" style={{ position: "relative" }}>
                  {open.item.image ? (
                    <Image
                      src={open.item.image}
                      alt={open.item.name}
                      fill
                      sizes="(max-width: 760px) 100vw, 45vw"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <span className="ph-label">
                      <span>{open.item.name}</span>
                      <span className="dim">{tl(open.item.tag, lang)}</span>
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.body}>
                <span className={styles.cat}>{tl(open.cat.name, lang)} · {open.cat.idx}</span>
                <h3 className={styles.name} id="craftName">{open.item.name}</h3>
                <p className={styles.blurb}>{tl(open.item.blurb, lang)}</p>
                <dl className={styles.specList}>
                  {SPEC_ORDER.map((k) => {
                    const v = open.item.specs[k];
                    if (!v) return null;
                    return (
                      <div key={k} className={styles.specRow}>
                        <dt>{tl(LABELS[k], lang)}</dt>
                        <dd>{tl(v, lang)}</dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
