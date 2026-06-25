import type { Metadata } from "next";
import { createTranslator, getDictionary, isLang, type Lang } from "@/lib/dictionary";
import { localePath } from "@/lib/nav";
import { CASES, LABELS, tl } from "@/lib/content";
import CtaBand from "@/components/CtaBand";
import styles from "./odm.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang);
  return { title: `${d["nav.odm"]} — KINGYUK`, description: d["cs.lead"] };
}

export default async function OdmPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  const t = createTranslator(lang);

  const named = CASES.filter((c) => c.state === "named");
  const confidential = CASES.filter((c) => c.state === "confidential");

  return (
    <main id="top">
      <section className="section wrap" id="cases">
        <div className={styles.showcaseIntro}>
          <span className="eyebrow reveal">{t("cs.eyebrow")}</span>
          <h1 className="reveal" data-d="1">{t("cs.h2")}</h1>
          <p className="lead reveal" data-d="2">{t("cs.lead")}</p>
        </div>

        {/* named case studies — full blocks */}
        <div className={styles.list}>
          {named.map((cs, i) => {
            const idx = String(i + 1).padStart(2, "0");
            const metrics = tl(cs.result, lang)
              .split("·")
              .map((s) => s.trim())
              .filter(Boolean);
            return (
              <article key={cs.brand} className={`${styles.block} reveal`}>
                <div className={styles.media}>
                  <div className="ph">
                    <span className="ph-label">
                      <span>{cs.brand}</span>
                      <span className="dim">{cs.scope ? tl(cs.scope, lang) : ""}</span>
                    </span>
                  </div>
                </div>
                <div className={styles.content}>
                  <div className={styles.meta}>
                    <span className={styles.no}>{tl(LABELS.caseword, lang)} {idx}</span>
                    {cs.year && <span className={styles.year}>{cs.year}</span>}
                  </div>
                  <span className={`${styles.sector} eyebrow`}>{tl(cs.sector, lang)}</span>
                  <h2 className={styles.brand}>{cs.brand}</h2>
                  {cs.scope && <p className={styles.scope}>{tl(cs.scope, lang)}</p>}
                  <dl className={styles.grafs}>
                    <div className={styles.graf}>
                      <dt>{tl(LABELS.challenge, lang)}</dt>
                      <dd>{tl(cs.challenge, lang)}</dd>
                    </div>
                    <div className={styles.graf}>
                      <dt>{tl(LABELS.did, lang)}</dt>
                      <dd>{tl(cs.did, lang)}</dd>
                    </div>
                  </dl>
                  <div className={styles.resultRow}>
                    <span className={styles.resultLbl}>{tl(LABELS.result, lang)}</span>
                    <div className={styles.metrics}>
                      {metrics.map((m, mi) => (
                        <span key={mi} className={styles.metric}>{m}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* work under NDA */}
        <div className={styles.nda}>
          <div className={`${styles.ndaHead} reveal`}>
            <span className="eyebrow">{t("cs.eyebrow")}</span>
            <h2>{t("odm.ndaTitle")}</h2>
            <p>{t("odm.ndaLead")}</p>
          </div>
          <div className={styles.caseGrid}>
            {confidential.map((cs, i) => (
              <article key={i} className={`${styles.caseCard} reveal`} data-d={(i % 3) + 1}>
                <div className={styles.caseTop}>
                  <span className={styles.caseLogo}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="5" y="11" width="14" height="9" rx="2.2" />
                      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                      <circle cx="12" cy="15.4" r="0.4" />
                    </svg>
                  </span>
                  <div className={styles.caseId}>
                    <span className={styles.caseBrand}>{tl(LABELS.confidential, lang)}</span>
                    <span className={styles.caseSector}>{tl(cs.sector, lang)}</span>
                  </div>
                  <span className={styles.caseNda}>NDA</span>
                </div>
                <dl className={styles.caseLines}>
                  <div className={styles.caseLine}>
                    <dt>{tl(LABELS.challenge, lang)}</dt>
                    <dd>{tl(cs.challenge, lang)}</dd>
                  </div>
                  <div className={styles.caseLine}>
                    <dt>{tl(LABELS.did, lang)}</dt>
                    <dd>{tl(cs.did, lang)}</dd>
                  </div>
                </dl>
                <div className={styles.caseResult}>
                  <span className={styles.caseResultLbl}>{tl(LABELS.result, lang)}</span>
                  <span className={styles.caseResultVal}>{tl(cs.result, lang)}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        lang={lang}
        labelKey="cta.talk"
        href={localePath(lang, "/contact")}
        ariaLabel={t("cta.talk")}
        imageSrc="/uploads/phone-cases.png"
      />
    </main>
  );
}
