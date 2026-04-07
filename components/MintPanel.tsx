import { ReactNode } from "react";

type MintPanelProps = {
  connected: boolean;
  loading: boolean;
  onMint: () => Promise<void>;
  actionText: string;
  helper?: ReactNode;
};

export function MintPanel({ connected, loading, onMint, actionText, helper }: MintPanelProps) {
  return (
    <section className="panel-card">
      <h3>Mint Console</h3>
      <p className="muted">Current contract supports fixed-price minting and manual transfer only.</p>
      <button className="pixel-button" disabled={!connected || loading} onClick={() => onMint()} type="button">
        {loading ? "Minting..." : "Mint NFT"}
      </button>
      {!connected ? <p className="muted">Connect wallet to mint.</p> : null}
      <p className="tiny-label">{actionText}</p>
      {helper}
    </section>
  );
}

