import Image from "next/image";
import Link from "next/link";
import { createTranslator, type DictKey, type Lang } from "@/lib/dictionary";
import styles from "./CtaBand.module.css";

type Props = {
  lang: Lang;
  labelKey: DictKey;
  href: string;
  ariaLabel: string;
  imageSrc?: string;
  snap?: boolean;
};

export default function CtaBand({ lang, labelKey, href, ariaLabel, imageSrc, snap }: Props) {
  const t = createTranslator(lang);
  return (
    <section className={`${styles.band}${snap ? ` ${styles.bandSnap}` : ""}`}>
      {imageSrc && (
        <>
          <Image src={imageSrc} alt="" fill className={styles.bg} sizes="100vw" />
          <div className={styles.overlay} aria-hidden="true" />
        </>
      )}
      <Link className={styles.pill} href={href} aria-label={ariaLabel}>
        <span className={styles.pillLabel}>{t(labelKey)}</span>
        <span className={styles.pillArrow} aria-hidden="true">
          <svg viewBox="0 0 44 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12 H40 M30 4 L40 12 L30 20" />
          </svg>
        </span>
      </Link>
    </section>
  );
}
