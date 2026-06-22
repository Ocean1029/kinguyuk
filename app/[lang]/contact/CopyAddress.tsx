"use client";

import { useState } from "react";
import { MapPin, Copy, Check } from "lucide-react";
import styles from "./contact.module.css";

type Props = {
  address: string;
  copyLabel: string;
  copiedLabel: string;
};

export default function CopyAddress({ address, copyLabel, copiedLabel }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable (insecure context) — silently ignore
    }
  }

  return (
    <p className={styles.mapAddr}>
      <MapPin size={18} strokeWidth={1.7} />
      <span className={styles.mapAddrText}>
        {address}
        <button
          type="button"
          className={`${styles.copyBtn}${copied ? ` ${styles.copied}` : ""}`}
          onClick={copy}
          aria-label={copied ? copiedLabel : copyLabel}
          title={copied ? copiedLabel : copyLabel}
        >
          {copied ? <Check size={16} strokeWidth={2.2} /> : <Copy size={16} strokeWidth={1.8} />}
        </button>
      </span>
    </p>
  );
}
