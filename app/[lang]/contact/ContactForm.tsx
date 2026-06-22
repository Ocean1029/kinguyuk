"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { createTranslator, type Lang } from "@/lib/dictionary";
import styles from "./contact.module.css";

const EMAIL_RE = /.+@.+\..+/;

export default function ContactForm({ lang }: { lang: Lang }) {
  const t = createTranslator(lang);
  const [sent, setSent] = useState(false);
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const next: Record<string, boolean> = {};
    let ok = true;
    (["name", "company", "email"] as const).forEach((name) => {
      const el = form.elements.namedItem(name) as HTMLInputElement | null;
      const value = el?.value.trim() ?? "";
      const valid = value !== "" && (name !== "email" || EMAIL_RE.test(value));
      next[name] = !valid;
      if (!valid) ok = false;
    });
    setInvalid(next);
    if (ok) setSent(true);
  }

  function reset(e: React.MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.closest("form");
    form?.reset();
    setSent(false);
    setInvalid({});
  }

  return (
    <form className={`${styles.form} reveal${sent ? ` ${styles.sent}` : ""}`} data-d="1" onSubmit={onSubmit} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="ctName">{t("ct.f.name")}</label>
          <input
            className={`${styles.input}${invalid.name ? ` ${styles.invalid}` : ""}`}
            id="ctName" name="name" type="text" required autoComplete="name"
            placeholder={t("ct.f.name.ph")}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="ctCompany">{t("ct.f.company")}</label>
          <input
            className={`${styles.input}${invalid.company ? ` ${styles.invalid}` : ""}`}
            id="ctCompany" name="company" type="text" required autoComplete="organization"
            placeholder={t("ct.f.company.ph")}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="ctEmail">{t("ct.f.email")}</label>
        <input
          className={`${styles.input}${invalid.email ? ` ${styles.invalid}` : ""}`}
          id="ctEmail" name="email" type="email" required autoComplete="email"
          placeholder={t("ct.f.email.ph")}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="ctMsg">{t("ct.f.msg")}</label>
        <textarea
          className={styles.textarea}
          id="ctMsg" name="message"
          placeholder={t("ct.f.msg.ph")}
        />
      </div>

      <div className={styles.foot}>
        <button className="btn btn-cta" type="submit">
          <span>{t("ct.f.submit")}</span>
          <span className="arrow" aria-hidden="true"><ArrowRight size={18} strokeWidth={2} /></span>
        </button>
      </div>

      <div className={styles.success}>
        <span className={styles.successIco}><Check size={28} strokeWidth={2.4} /></span>
        <h3>{t("ct.ok.title")}</h3>
        <p>{t("ct.ok.body")}</p>
        <button className="btn btn-ghost" type="button" onClick={reset}>{t("ct.ok.again")}</button>
      </div>
    </form>
  );
}
