import Image from "next/image";

export function PixelHero() {
  return (
    <section className="hero-card" aria-label="Pixel collectible hero">
      <div>
        <p className="tiny-label">Digital Collectible Display</p>
        <h2>Mint a collectible token from the arcade cabinet.</h2>
        <p className="muted">Each mint is a real onchain transaction. No metadata or rarity simulation.</p>
      </div>
      <Image alt="PixelMint scene" height={180} priority src="/scene-pixelmint.svg" width={240} />
    </section>
  );
}

