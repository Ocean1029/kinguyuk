import Link from "next/link";
import { createTranslator, type DictKey, type Lang } from "@/lib/dictionary";
import styles from "./CtaBand.module.css";

type Props = {
  lang: Lang;
  eyebrowKey: DictKey;
  labelKey: DictKey;
  href: string;
  ariaLabel: string;
};

export default function CtaBand({ lang, eyebrowKey, labelKey, href, ariaLabel }: Props) {
  const t = createTranslator(lang);
  return (
    <section className={styles.band} id="contact">
      <div className={`wrap section ${styles.inner}`}>
        <div>
          <span className="eyebrow reveal">{t(eyebrowKey)}</span>
          <h2 className="reveal" data-d="1" style={{ marginTop: "1rem" }}>
            {t("band.h2")}
          </h2>
          <p className="lead reveal" data-d="2" style={{ marginTop: "1.2rem", maxWidth: "46ch" }}>
            {t("band.lead")}
          </p>
        </div>
      </div>
      <Link className={styles.arc} href={href} aria-label={ariaLabel}>
        <span className={styles.arcInner}>
          <span className={styles.arcArrow} aria-hidden="true">
            <svg viewBox="0 0 44 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12 H40 M30 4 L40 12 L30 20" />
            </svg>
          </span>
          <span className={styles.arcLabel}>{t(labelKey)}</span>
        </span>
      </Link>
    </section>
  );
}
