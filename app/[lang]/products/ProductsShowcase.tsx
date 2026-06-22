"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
            <div className={styles.pcardGrid}>
              {cat.items.map((item) => (
                <button
                  key={item.id}
                  className={styles.pcard}
                  onClick={(e) => openItem(cat, item, e.currentTarget)}
                >
                  <div className={`ph ${styles.pcardPh}`} style={{ position: "relative" }}>
                    <span className="ph-label">
                      <span>{item.name}</span>
                      <span className="dim">{tl(item.tag, lang)}</span>
                    </span>
                    <span className={styles.pcardView}>{tl(LABELS.view, lang)}</span>
                  </div>
                  <div className={styles.pcardMeta}>
                    <span className={styles.pcardName}>{item.name}</span>
                    <span className={styles.pcardTag}>{tl(item.tag, lang)}</span>
                  </div>
                </button>
              ))}
            </div>
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
                <div className="ph">
                  <span className="ph-label">
                    <span>{open.item.name}</span>
                    <span className="dim">{tl(open.item.tag, lang)}</span>
                  </span>
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
