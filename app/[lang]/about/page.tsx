import type { Metadata } from "next";
import { createTranslator, getDictionary, isLang, type DictKey, type Lang } from "@/lib/dictionary";
import { localePath } from "@/lib/nav";
import { TEAM, CULTURE, tl } from "@/lib/content";
import CtaBand from "@/components/CtaBand";
import AboutSubnav from "./AboutSubnav";
import ScrollSnapPage from "@/components/ScrollSnapPage";
import styles from "./about.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang);
  return { title: `${d["nav.about"]} — KINGYUK`, description: d["ab.mission.lead"] };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  const t = createTranslator(lang);

  return (
    <main id="top">
      <ScrollSnapPage />
      {/* ===== MISSION ===== */}
      <section className={`section wrap ${styles.mission}`}>
        <span className="eyebrow reveal">{t("ab.eyebrow")}</span>
        <h1 className={`${styles.missionH} reveal`} data-d="1">
          <span>{t("ab.mission.pre")}</span>
          <span className="ann">
            <span>{t("ab.mission.mark")}</span>
            <svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
              <path pathLength="1" vectorEffect="non-scaling-stroke" d="M3 8 C 38 2.5, 70 11, 108 6.5 S 168 3.5, 197 9" />
            </svg>
          </span>
          <span>{t("ab.mission.post")}</span>
        </h1>
        <p className={`${styles.missionLead} reveal`} data-d="2">{t("ab.mission.lead")}</p>
        <div className={`${styles.missionVisual} reveal`} data-d="3">
          <div className="ph">
            <span className="ph-label">
              <span>{t("ab.mission.ph")}</span>
              <span className="dim">{t("ab.mission.ph.dim")}</span>
            </span>
          </div>
        </div>
      </section>

      {/* ===== SHELL ===== */}
      <div className={`wrap ${styles.shell}`}>
        <AboutSubnav lang={lang} />

        <div className={styles.main}>
          {/* STORY */}
          <section className={styles.sec} id="story">
            <div className={styles.secHead}>
              <span className="eyebrow reveal">{t("ab.story.eyebrow")}</span>
              <h2 className="reveal" data-d="1">{t("ab.story.h2")}</h2>
            </div>
            <div className={`${styles.storyCols} reveal`} data-d="1">
              <p>{t("ab.story.p1")}</p>
              <p>{t("ab.story.p2")}</p>
              <p>{t("ab.story.p3")}</p>
            </div>
            <p className={`${styles.storyPull} reveal`} data-d="2">{t("ab.story.pull")}</p>
          </section>

          {/* VALUES */}
          <section className={styles.sec} id="values">
            <div className={styles.secHead}>
              <span className="eyebrow reveal">{t("ab.values.eyebrow")}</span>
              <h2 className="reveal" data-d="1">
                <span>{t("ab.values.pre")}</span>
                <span className="ann">
                  <span>{t("ab.values.mark")}</span>
                  <svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                    <path pathLength="1" vectorEffect="non-scaling-stroke" d="M3 9 C 44 4, 76 11, 116 6 S 170 4, 197 8.5" />
                  </svg>
                </span>
                <span>{t("ab.values.post")}</span>
              </h2>
              <p className="reveal" data-d="2">{t("ab.values.lead")}</p>
            </div>
            <div className={styles.beliefGrid}>
              {([1, 2, 3, 4, 5, 6] as const).map((n, i) => (
                <div key={n} className={`${styles.belief} reveal`} data-d={i % 3 || undefined}>
                  <h3>{t(`ab.val${n}.title` as DictKey)}</h3>
                  <p>{t(`ab.val${n}.body` as DictKey)}</p>
                </div>
              ))}
            </div>
          </section>

          {/* TEAM */}
          <section className={styles.sec} id="team">
            <div className={styles.secHead}>
              <span className="eyebrow reveal">{t("ab.team.eyebrow")}</span>
              <h2 className="reveal" data-d="1">
                <span>{t("ab.team.pre")}</span>
                <span className="ann ann-circle">
                  <span>{t("ab.team.mark")}</span>
                  <svg viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden="true">
                    <path pathLength="1" vectorEffect="non-scaling-stroke" d="M52 9 C 14 13, 4 60, 78 70 C 168 79, 200 36, 150 13 C 116 1, 64 5, 26 20" />
                  </svg>
                </span>
                <span>{t("ab.team.post")}</span>
              </h2>
              <p className="reveal" data-d="2">{t("ab.team.lead")}</p>
            </div>
            <div>
              {TEAM.map((group, gi) => (
                <div
                  key={group.g.en}
                  className={`${styles.teamGroup} reveal`}
                  data-d={gi > 0 ? Math.min(gi, 2) : undefined}
                >
                  <div className={styles.teamGroupH}>
                    <span>{tl(group.g, lang)}</span>
                    <span className={styles.count}>{group.members.length}</span>
                  </div>
                  <div className={styles.teamGrid}>
                    {group.members.map((m, mi) => (
                      <div key={mi} className={styles.member}>
                        <div className={styles.avatar}>{m.mono}</div>
                        <div className={styles.mRole}>{tl(m.role, lang)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* INSIDE / CULTURE */}
          <section className={styles.sec} id="inside">
            <div className={styles.secHead}>
              <span className="eyebrow reveal">{t("ab.inside.eyebrow")}</span>
              <h2 className="reveal" data-d="1">
                <span>{t("ab.inside.pre")}</span>
                <span className="ann">
                  <span>{t("ab.inside.mark")}</span>
                  <svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                    <path pathLength="1" vectorEffect="non-scaling-stroke" d="M3 8 C 40 3, 72 11, 110 6 S 168 4, 197 9" />
                  </svg>
                </span>
                <span>{t("ab.inside.post")}</span>
              </h2>
              <p className="reveal" data-d="2">{t("ab.inside.lead")}</p>
            </div>
            <div>
              {CULTURE.map((item, i) => (
                <div key={i} className={`${styles.cultureItem} reveal`}>
                  <div className={styles.culturePhoto}>
                    <div className="ph">
                      <span className="ph-label">
                        <span>{tl(item.ph, lang)}</span>
                        <span className="dim">4:3</span>
                      </span>
                    </div>
                  </div>
                  <div className={styles.cultureCap} data-d="1">
                    <blockquote>{tl(item.quote, lang)}</blockquote>
                    <cite>{tl(item.cite, lang)}</cite>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CONTACT */}
          <section className={styles.sec} id="contact-info">
            <div className={styles.secHead}>
              <span className="eyebrow reveal">{t("ab.contact.eyebrow")}</span>
              <h2 className="reveal" data-d="1">
                <span>{t("ab.contact.pre")}</span>
                <span className="ann">
                  <span>{t("ab.contact.mark")}</span>
                  <svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                    <path pathLength="1" vectorEffect="non-scaling-stroke" d="M3 9 C 42 3.5, 74 11, 112 6 S 169 4, 197 8.5" />
                  </svg>
                </span>
                <span>{t("ab.contact.post")}</span>
              </h2>
              <p className="reveal" data-d="2">{t("ab.contact.lead")}</p>
            </div>
            <div className={styles.contactGrid}>
              <div className={`${styles.contactBlock} reveal`}>
                <h3>{t("ab.contact.b1.h")}</h3>
                <p>{t("ab.contact.b1.body")}</p>
                <a className={styles.contactLink} href="mailto:partners@kingyuk.com">{t("ab.contact.b1.link")}</a>
              </div>
              <div className={`${styles.contactBlock} reveal`} data-d="1">
                <h3>{t("ab.contact.b2.h")}</h3>
                <p>{t("ab.contact.b2.body")}</p>
                <a className={styles.contactLink} href="mailto:samples@kingyuk.com">{t("ab.contact.b2.link")}</a>
              </div>
              <div className={`${styles.contactBlock} reveal`}>
                <h3>{t("ab.contact.b3.h")}</h3>
                <p>{t("ab.contact.b3.body")}</p>
                <a className={styles.contactLink} href="mailto:press@kingyuk.com">{t("ab.contact.b3.link")}</a>
              </div>
              <div className={`${styles.contactBlock} reveal`} data-d="1">
                <h3>{t("ab.contact.b4.h")}</h3>
                <p>{t("ab.contact.b4.body")}</p>
                <span className={styles.contactLink}>{t("ab.contact.b4.link")}</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <CtaBand
        lang={lang}
        labelKey="cta.talk"
        href={localePath(lang, "/contact")}
        ariaLabel={t("cta.talk")}
        imageSrc="/uploads/phone-cases.png"
        snap
      />
    </main>
  );
}
