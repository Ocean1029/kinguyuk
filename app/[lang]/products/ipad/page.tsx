import type { Metadata } from "next";
import Image from "next/image";
import { createTranslator, getDictionary, isLang, type Lang } from "@/lib/dictionary";
import { localePath } from "@/lib/nav";
import { PRODUCTS, tl } from "@/lib/content";
import CtaBand from "@/components/CtaBand";
import styles from "./ipad.module.css";

const IPAD = PRODUCTS.find((c) => c.key === "ipad")!;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang);
  return {
    title: `${tl(IPAD.name, lang as Lang)} — KINGYUK`,
    description: tl(IPAD.statement, lang as Lang),
  };
}

export default async function IpadPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  const t = createTranslator(lang);

  return (
    <main id="top">
      <section className={styles.hero}>
        <div className={styles.spotlight} aria-hidden="true" />
        <div className={styles.productWrap}>
          <Image
            className={styles.productImg}
            src="/assets/黑色平板保护壳.png"
            alt={tl(IPAD.name, lang)}
            width={1200}
            height={1200}
            sizes="clamp(280px, 70vw, 800px)"
            quality={100}
            unoptimized
            priority
          />
        </div>
      </section>

      <CtaBand
        lang={lang}
        labelKey="cta.sample"
        href={localePath(lang, "/contact")}
        ariaLabel={t("cta.sample")}
        snap
      />
    </main>
  );
}
