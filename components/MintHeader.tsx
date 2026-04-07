import Link from "next/link";

export function MintHeader() {
  return (
    <header className="header-card">
      <p className="tiny-label">Retro Mint Arcade</p>
      <h1>PixelMint</h1>
      <p className="muted">Fixed-price onchain minting on Base.</p>
      <div className="header-links">
        <Link href="/about">Rules</Link>
        <Link href="/collection">Collection Studio</Link>
      </div>
    </header>
  );
}

