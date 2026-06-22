import type { DictKey, Lang } from "./dictionary";

/** Build a locale-prefixed path: localePath("en", "/products") -> "/en/products". */
export function localePath(lang: Lang, path = ""): string {
  return `/${lang}${path}`;
}

export type NavItem = {
  /** i18n key for the label */
  label: DictKey;
  /** path relative to the locale root, e.g. "/products" or "#capabilities" */
  to: string;
  /** route id used to mark the current page */
  id: "capabilities" | "products" | "odm" | "about" | "contact";
};

/** Primary header navigation (shared across all pages). */
export const NAV: NavItem[] = [
  { label: "nav.capabilities", to: "#capabilities", id: "capabilities" },
  { label: "nav.products", to: "/products", id: "products" },
  { label: "nav.odm", to: "/odm", id: "odm" },
  { label: "nav.about", to: "/about", id: "about" },
  { label: "nav.contact", to: "/contact", id: "contact" },
];

/**
 * Resolve a nav target to a full href. Hash links point at the homepage
 * section on inner pages, and at the current page on the homepage.
 */
export function navHref(lang: Lang, item: NavItem, onHome: boolean): string {
  if (item.to.startsWith("#")) {
    return onHome ? item.to : `${localePath(lang)}${item.to}`;
  }
  return localePath(lang, item.to);
}
