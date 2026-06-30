import type { Metadata } from "next";
import { createTranslator, getDictionary, isLang, type Lang } from "@/lib/dictionary";
import { localePath } from "@/lib/nav";
import CtaBand from "@/components/CtaBand";
import ProductsShowcase from "./ProductsShowcase";
import styles from "./products.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(lang);
  return { title: `${d["nav.products"]} — KINGYUK`, description: d["pp.lead"] };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  const t = createTranslator(lang);

  return (
    <main id="top">
      <section className="section wrap" id="products">
        <ProductsShowcase lang={lang} />
      </section>

      <CtaBand
        lang={lang}
        labelKey="nav.odm"
        href={localePath(lang, "/odm")}
        ariaLabel={t("nav.odm")}
        snap
      />
    </main>
  );
}
