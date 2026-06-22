import type { Metadata } from "next";
import { Mail, Phone, MessageCircle, Navigation } from "lucide-react";
import { createTranslator, getDictionary, isLang, type Lang } from "@/lib/dictionary";
import ContactForm from "./ContactForm";
import CopyAddress from "./CopyAddress";
import styles from "./contact.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang);
  return { title: `${d["nav.contact"]} — KINGYUK`, description: d["ct.lead"] };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  const t = createTranslator(lang);

  // Amap (高德地图) works inside and outside mainland China, unlike Google Maps
  // which is blocked there. Keyword search avoids needing exact coordinates;
  // swap in a marker URL with real lat/lng once the factory address is final.
  const mapQuery = lang === "zh" ? "广东东莞长安镇安路" : "Chang'an, Dongguan, Guangdong, China";
  const directionsHref = `https://www.amap.com/search?query=${encodeURIComponent(mapQuery)}`;

  return (
    <main id="top">
      {/* ===== INTRO ===== */}
      <section className={`${styles.hero} wrap`}>
        <span className="eyebrow reveal">{t("ct.eyebrow")}</span>
        <h1 className="reveal" data-d="1">{t("ct.h1")}</h1>
        <p className="lead reveal" data-d="2">{t("ct.lead")}</p>
      </section>

      {/* ===== REACH ===== */}
      <section className={`${styles.reach} wrap`}>
        <div className={styles.reachHead}>
          <div>
            <span className="eyebrow reveal">{t("ct.reach.eyebrow")}</span>
            <h2 className="reveal" data-d="1" style={{ marginTop: "0.9rem" }}>{t("ct.reach.h2")}</h2>
          </div>
        </div>

        <div className={styles.methods}>
          <a className={`${styles.method} reveal`} href="mailto:hello@kingyuk.com">
            <span className={styles.methodIco}><Mail size={19} strokeWidth={1.7} /></span>
            <span className={styles.methodK}>{t("ct.m1.k")}</span>
            <span className={styles.methodV}>{t("ct.m1.v")}</span>
            <span className={styles.methodS}>{t("ct.m1.s")}</span>
          </a>

          <a className={`${styles.method} reveal`} data-d="1" href="tel:+8676983286600">
            <span className={styles.methodIco}><Phone size={19} strokeWidth={1.7} /></span>
            <span className={styles.methodK}>{t("ct.m2.k")}</span>
            <span className={styles.methodV}>{t("ct.m2.v")}</span>
            <span className={styles.methodS}>{t("ct.m2.s")}</span>
          </a>

          <div className={`${styles.method} reveal`} data-d="2">
            <span className={styles.methodIco}><MessageCircle size={19} strokeWidth={1.7} /></span>
            <span className={styles.methodK}>{t("ct.m3.k")}</span>
            <span className={styles.methodV}>{t("ct.m3.v")}</span>
            <span className={styles.methodS}>{t("ct.m3.s")}</span>
          </div>
        </div>
      </section>

      {/* ===== FIND US (address) ===== */}
      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div className={`${styles.findUs} reveal`}>
          <span className="eyebrow">{t("ct.map.eyebrow")}</span>
          <h2>{t("ct.map.title")}</h2>
          <CopyAddress
            address={t("ct.map.addr")}
            copyLabel={t("ct.map.copy")}
            copiedLabel={t("ct.map.copied")}
          />
          <div className={styles.mapBtnRow}>
            <a className="btn btn-ghost" href={directionsHref} target="_blank" rel="noopener">
              <span>{t("ct.map.dir")}</span>
              <span className="arrow" aria-hidden="true"><Navigation size={18} strokeWidth={2} /></span>
            </a>
          </div>
        </div>
      </section>

      {/* ===== FORM ===== */}
      <section className="section wrap" style={{ paddingTop: 0 }}>
        <div className={styles.formWrap}>
          <div className={styles.formIntro}>
            <span className="eyebrow reveal">{t("ct.form.eyebrow")}</span>
            <h2 className="reveal" data-d="1">{t("ct.form.title")}</h2>
          </div>
          <ContactForm lang={lang} />
        </div>
      </section>
    </main>
  );
}
