import Link from "next/link";
import { createTranslator, type Lang } from "@/lib/dictionary";
import { localePath } from "@/lib/nav";
import styles from "./Footer.module.css";

/**
 * Hash links target homepage sections; on inner pages they jump back to the
 * homepage anchor, matching the original cross-page behaviour.
 */
export default function Footer({ lang }: { lang: Lang }) {
  const t = createTranslator(lang);
  const home = localePath(lang);

  return (
    <footer className={styles.footer} id="factory">
      <div className="wrap">
        <div className={styles.top}>
          <div className={styles.brandBlock}>
            <div className={styles.brand}>
              <span className={styles.mark}>KINGYUK</span> <span className={styles.markCn}>璟昱</span>
            </div>
            <p>{t("foot.tagline")}</p>
          </div>
          <div className={styles.cols}>
            <div className={styles.col}>
              <h4>{t("foot.col1")}</h4>
              <Link href={`${home}#capabilities`}>{t("nav.capabilities")}</Link>
              <Link href={localePath(lang, "/products")}>{t("nav.products")}</Link>
              <Link href={localePath(lang, "/odm")}>{t("nav.odm")}</Link>
            </div>
            <div className={styles.col}>
              <h4>{t("foot.col2")}</h4>
              <Link href={localePath(lang, "/about")}>{t("nav.about")}</Link>
              <Link href={`${home}#factory`}>{t("foot.quality")}</Link>
              <Link href={localePath(lang, "/contact")}>{t("foot.careers")}</Link>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>{t("foot.rights")}</span>
        </div>
      </div>
    </footer>
  );
}
