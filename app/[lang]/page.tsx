import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createTranslator, getDictionary, isLang, type Lang } from "@/lib/dictionary";
import CtaBand from "@/components/CtaBand";
import { localePath } from "@/lib/nav";
import styles from "./home.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang);
  return { title: d["meta.title"], description: d["meta.desc"] };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  const t = createTranslator(lang);

  return (
    <main id="top">
      {/* ===== HERO ===== */}
      <section className={`${styles.hero} wrap`}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <h1 className="reveal" data-d="1">
              <span className="line">{t("hero.h1a")}</span>
              <span className="line accent">{t("hero.h1b")}</span>
            </h1>
            <p className="lead reveal" data-d="2">{t("hero.lead")}</p>
          </div>

          <div className={`${styles.heroVisual} reveal`} data-d="2">
            <div className="ph">
              <span className="ph-label">
                <span>{t("hero.ph")}</span>
                <span className="dim">{t("hero.ph.dim")}</span>
              </span>
            </div>
          </div>
        </div>

        <h2 className={`${styles.statsTitle} reveal`}>{t("hero.statsTitle")}</h2>
        <div className={`${styles.stats} reveal`}>
          <div className={styles.stat}>
            <div className={styles.num}>
              <span>{t("hero.stat1.num")}</span>
              <span className={styles.unit}>{t("hero.stat1.unit")}</span>
            </div>
            <div className={styles.lbl}>{t("hero.stat1.lbl")}</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.num}>
              <span>{t("hero.stat2.num")}</span>
              <span className={styles.unit}>{t("hero.stat2.unit")}</span>
            </div>
            <div className={styles.lbl}>{t("hero.stat2.lbl")}</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.num}>
              <span>{t("hero.stat4.num")}</span>
              <span className={styles.unit}>{t("hero.stat4.unit")}</span>
            </div>
            <div className={styles.lbl}>{t("hero.stat4.lbl")}</div>
          </div>
        </div>
      </section>

      {/* ===== CAPABILITIES ===== */}
      <section className="section wrap" id="capabilities">
        <div className={styles.sectionHead}>
          <span className="eyebrow reveal">{t("cap.eyebrow")}</span>
          <h2 className="reveal" data-d="1">{t("cap.h2")}</h2>
          <p className="lead reveal" data-d="2">{t("cap.lead")}</p>
        </div>

        <div className={styles.capGrid}>
          {/* 01 ID design */}
          <article className={`${styles.cap} reveal`}>
            <span className={styles.capNum}>{t("cap1.num")}</span>
            <div className={styles.capViz}>
              <svg className="viz" viewBox="0 0 200 140" aria-hidden="true">
                <rect className="stroke-faint" x="58" y="20" width="84" height="100" rx="16" />
                <rect className="accent-stroke" x="50" y="14" width="84" height="100" rx="16" />
                <circle className="accent-fill" cx="50" cy="14" r="4" />
                <circle className="accent-fill" cx="134" cy="14" r="4" />
                <circle className="accent-fill" cx="50" cy="114" r="4" />
                <circle className="accent-fill" cx="134" cy="114" r="4" />
                <circle className="surface-fill accent-stroke" cx="110" cy="40" r="11" />
                <line className="stroke-faint" x1="50" y1="64" x2="20" y2="64" />
                <line className="stroke-faint" x1="134" y1="90" x2="164" y2="90" />
                <text className="mono" x="6" y="60">ID</text>
                <text className="mono" x="150" y="108">v.03</text>
              </svg>
            </div>
            <div className={styles.capBody}>
              <h3>{t("cap1.title")}</h3>
              <p>{t("cap1.body")}</p>
            </div>
          </article>

          {/* 02 unibody leather */}
          <article className={`${styles.cap} reveal`} data-d="1">
            <span className={styles.capNum}>{t("cap2.num")}</span>
            <div className={styles.capViz}>
              <svg className="viz" viewBox="0 0 200 140" aria-hidden="true">
                <path className="accent-fill" d="M20 44h140a20 20 0 0 1 20 20v0a8 8 0 0 1-8 8H20Z" opacity="0.9" />
                <rect className="surface-fill" x="20" y="72" width="152" height="13" />
                <rect className="dim-fill" x="20" y="85" width="152" height="9" opacity="0.5" />
                <path className="accent-stroke" d="M160 44a28 28 0 0 1 14 30" />
                <line className="stroke" x1="20" y1="44" x2="20" y2="94" />
                <text className="mono" x="20" y="118">full-grain</text>
                <text className="mono" x="20" y="132" opacity="0.7">core · lining</text>
                <text className="mono-accent" x="120" y="118">folded edge ↵</text>
              </svg>
            </div>
            <div className={styles.capBody}>
              <h3>{t("cap2.title")}</h3>
              <p>{t("cap2.body")}</p>
            </div>
          </article>

          {/* 03 lightweight — FEATURE w/ balance scale */}
          <article className={`${styles.cap} ${styles.feature} reveal`}>
            <span className={styles.capNum}>{t("cap3.num")}</span>
            <div className={styles.capViz}>
              <div className="scale-wrap">
                <svg className="scale-svg" viewBox="0 0 400 200" aria-hidden="true">
                  <path className="scale-stroke" d="M185 112 L200 62 L215 112 Z" fill="var(--surface-2)" />
                  <line className="scale-stroke" x1="150" y1="114" x2="250" y2="114" />
                  <g className="scale-beam">
                    <line className="scale-stroke" x1="92" y1="62" x2="308" y2="62" />
                    <circle className="scale-fill-dim" cx="200" cy="62" r="5" />
                    <g className="scale-pan scale-pan-l">
                      <line className="scale-stroke" x1="92" y1="62" x2="92" y2="118" />
                      <path className="scale-stroke" d="M64 118 a28 10 0 0 0 56 0" />
                      <circle className="scale-fill-accent" cx="92" cy="110" r="9" />
                      <text className="scale-label scale-w-ours" x="92" y="150" textAnchor="middle">
                        <tspan>{t("cap3.ours")}</tspan> · 200g
                      </text>
                    </g>
                    <g className="scale-pan scale-pan-r">
                      <line className="scale-stroke" x1="308" y1="62" x2="308" y2="118" />
                      <path className="scale-stroke" d="M280 118 a28 10 0 0 0 56 0" />
                      <rect className="scale-fill-dim" x="296" y="92" width="24" height="24" rx="4" />
                      <text className="scale-label scale-w-mkt" x="308" y="150" textAnchor="middle">
                        <tspan>{t("cap3.mkt")}</tspan> · 400g
                      </text>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            <div className={styles.capBody}>
              <h3>{t("cap3.title")}</h3>
              <p>{t("cap3.body")}</p>
            </div>
          </article>

          {/* 04 precision cutouts */}
          <article className={`${styles.cap} reveal`} data-d="1">
            <span className={styles.capNum}>{t("cap4.num")}</span>
            <div className={styles.capViz}>
              <svg className="viz" viewBox="0 0 200 140" aria-hidden="true">
                <path className="stroke" d="M40 20 h140 a0 0 0 0 1 0 0 v100 h-100 a40 40 0 0 1 -40 -40 Z" opacity="0" />
                <path className="stroke" d="M150 30 H60 a20 20 0 0 0 -20 20 v60" />
                <circle className="accent-stroke dash-spin" cx="78" cy="62" r="22" />
                <circle className="accent-fill" cx="78" cy="62" r="5" />
                <line className="stroke-faint" x1="78" y1="20" x2="78" y2="44" />
                <line className="stroke-faint" x1="78" y1="80" x2="78" y2="120" />
                <line className="stroke-faint" x1="36" y1="62" x2="56" y2="62" />
                <line className="stroke-faint" x1="100" y1="62" x2="150" y2="62" />
                <rect className="accent-stroke" x="120" y="92" width="46" height="16" rx="8" />
                <text className="mono-accent" x="120" y="128">±0.1mm</text>
              </svg>
            </div>
            <div className={styles.capBody}>
              <h3>{t("cap4.title")}</h3>
              <p>{t("cap4.body")}</p>
            </div>
          </article>

          {/* 05 100W pins */}
          <article className={`${styles.cap} reveal`}>
            <span className={styles.capNum}>{t("cap5.num")}</span>
            <div className={styles.capViz}>
              <svg className="viz" viewBox="0 0 200 140" aria-hidden="true">
                <rect className="stroke" x="30" y="46" width="140" height="48" rx="10" />
                <circle className="accent-fill" cx="58" cy="70" r="7" />
                <circle className="accent-fill" cx="84" cy="70" r="7" />
                <circle className="accent-fill" cx="110" cy="70" r="7" />
                <circle className="accent-fill" cx="136" cy="70" r="7" />
                <path className="accent-fill" d="M168 30 l-16 26 h11 l-9 24 22 -30 h-12 z" />
                <text className="mono-accent" x="100" y="118" textAnchor="middle">100W · gold-plated pins</text>
              </svg>
            </div>
            <div className={styles.capBody}>
              <h3>{t("cap5.title")}</h3>
              <p>{t("cap5.body")}</p>
            </div>
          </article>

          {/* 06 premium positioning */}
          <article className={`${styles.cap} reveal`} data-d="1">
            <span className={styles.capNum}>{t("cap6.num")}</span>
            <div className={styles.capViz}>
              <svg className="viz" viewBox="0 0 200 140" aria-hidden="true">
                <line className="stroke-faint" x1="20" y1="118" x2="180" y2="118" />
                <rect className="dim-fill grow-bar" x="48" y="68" width="34" height="50" />
                <rect className="accent-fill grow-bar" data-d="1" x="120" y="40" width="34" height="78" />
                <text className="mono" x="65" y="134" textAnchor="middle">{t("cap6.market")}</text>
                <text className="mono-accent" x="137" y="134" textAnchor="middle">{t("cap6.us")}</text>
                <text className="mono" x="65" y="60" textAnchor="middle">1.0×</text>
                <text className="mono-accent" x="137" y="32" textAnchor="middle">1.25×</text>
              </svg>
            </div>
            <div className={styles.capBody}>
              <h3>{t("cap6.title")}</h3>
              <p>{t("cap6.body")}</p>
            </div>
          </article>
        </div>
      </section>

      {/* ===== PRODUCTS ===== */}
      <section className="section wrap" id="products">
        <div className={styles.prodHead}>
          <div>
            <span className="eyebrow reveal">{t("prod.eyebrow")}</span>
            <h2 className="reveal" data-d="1">{t("prod.h2")}</h2>
          </div>
        </div>

        <div className={styles.tilesStack}>
          <Link className={`${styles.tile} ${styles.tilePhone} reveal`} href={localePath(lang, "/products")} aria-label={t("prod1.title")}>
            <div className={styles.tileImgWrap}>
              <Image
                className={styles.tileImg}
                src="/uploads/phone-cases.png"
                alt={t("prod1.title")}
                fill
                sizes="(max-width: 720px) 100vw, 60vw"
                priority
              />
            </div>
            <div className={styles.tileContent}>
              <h3 className={styles.tileName}>{t("prod1.title")}</h3>
              <span className={styles.tileIdx}>{t("prod1.idx")}</span>
              <span className={styles.tileArrow}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </div>
          </Link>

          <Link className={`${styles.tile} ${styles.tileIpad} reveal`} href={localePath(lang, "/products")} aria-label={t("prod2.title")}>
            <div className={styles.tilePhBlank}>
              <span className="ph-label"><span>{t("prod2.ph")}</span><span className="dim">4:5</span></span>
            </div>
            <div className={styles.tileContent}>
              <h3 className={styles.tileName}>{t("prod2.title")}</h3>
              <span className={styles.tileIdx}>{t("prod2.idx")}</span>
              <span className={styles.tileArrow}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </div>
          </Link>

          <Link className={`${styles.tile} ${styles.tileMacbook} reveal`} href={localePath(lang, "/products")} aria-label={t("prod3.title")}>
            <div className={styles.tilePhBlank}>
              <span className="ph-label"><span>{t("prod3.ph")}</span><span className="dim">4:5</span></span>
            </div>
            <div className={styles.tileContent}>
              <h3 className={styles.tileName}>{t("prod3.title")}</h3>
              <span className={styles.tileIdx}>{t("prod3.idx")}</span>
              <span className={styles.tileArrow}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </div>
          </Link>
        </div>

        <div className={`${styles.prodFoot} reveal`}>
          <Link className="btn btn-ghost" href={localePath(lang, "/products")}>{t("prod.link")}</Link>
        </div>
      </section>

      <CtaBand
        lang={lang}
        eyebrowKey="nav.contact"
        labelKey="cta.sample"
        href={localePath(lang, "/contact")}
        ariaLabel={t("cta.sample")}
      />
    </main>
  );
}
