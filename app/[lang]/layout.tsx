import { notFound } from "next/navigation";
import { LANGS, isLang, createTranslator } from "@/lib/dictionary";
import { NAV, navHref } from "@/lib/nav";
import Header, { type HeaderItem } from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveals from "@/components/ScrollReveals";
import ScrollToTop from "@/components/ScrollToTop";
import HtmlLangSync from "@/components/HtmlLangSync";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const t = createTranslator(lang);
  // header hash links target the homepage on inner pages; the layout doesn't
  // know the exact page, so resolve hash links against the homepage anchor.
  const items: HeaderItem[] = NAV.map((item) => ({
    id: item.id,
    href: navHref(lang, item, false),
    label: t(item.label),
  }));

  return (
    <div data-lang={lang}>
      <HtmlLangSync lang={lang} />
      <Header lang={lang} items={items} onHome={false} />
      {children}
      <Footer lang={lang} />
      <ScrollToTop />
      <ScrollReveals />
    </div>
  );
}
