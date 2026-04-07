import Link from "next/link";

import { RuleList } from "@/components/RuleList";

export default function AboutPage() {
  return (
    <div className="page-stack">
      <section className="header-card">
        <p className="tiny-label">About PixelMint</p>
        <h1>Contract Rules</h1>
        <p className="muted">Honest scope for the current lightweight mint demo contract.</p>
      </section>
      <RuleList />
      <Link className="pixel-button inline-link" href="/">
        Back to Mint Gallery
      </Link>
    </div>
  );
}

