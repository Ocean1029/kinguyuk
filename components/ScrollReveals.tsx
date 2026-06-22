"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Reveals `.reveal` elements as they scroll into view by adding `.in`.
 * Re-initialises on route change so freshly mounted pages animate too.
 * Mirrors the original IntersectionObserver + scroll-fallback behaviour.
 */
export default function ScrollReveals() {
  const pathname = usePathname();

  useEffect(() => {
    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal:not(.in)"),
    );
    if (!reveals.length) return;

    function revealInView() {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      for (let i = reveals.length - 1; i >= 0; i--) {
        const el = reveals[i];
        if (el.getBoundingClientRect().top < vh * 0.92) {
          el.classList.add("in");
          reveals.splice(i, 1);
        }
      }
      if (!reveals.length) {
        window.removeEventListener("scroll", revealInView);
        window.removeEventListener("resize", revealInView);
      }
    }

    let io: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              const idx = reveals.indexOf(e.target as HTMLElement);
              if (idx > -1) reveals.splice(idx, 1);
              io!.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );
      reveals.forEach((el) => io!.observe(el));
    }

    const t = window.setTimeout(revealInView, 250);
    window.addEventListener("scroll", revealInView, { passive: true });
    window.addEventListener("resize", revealInView, { passive: true });

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", revealInView);
      window.removeEventListener("resize", revealInView);
      io?.disconnect();
    };
  }, [pathname]);

  return null;
}
