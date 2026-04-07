"use client";

import Link from "next/link";

import { BalanceCard } from "@/components/BalanceCard";
import { OwnershipChecker } from "@/components/OwnershipChecker";
import { SupplyCard } from "@/components/SupplyCard";
import { WalletButton } from "@/components/WalletButton";
import { useMintStats } from "@/hooks/useMintStats";
import { useOwnerLookup } from "@/hooks/useOwnerLookup";

export default function CollectionPage() {
  const { address, balance, totalSupply } = useMintStats();
  const { owner, error, loading, lookupOwner } = useOwnerLookup();

  return (
    <div className="page-stack">
      <section className="header-card">
        <p className="tiny-label">Collection Studio</p>
        <h1>Your Onchain Console</h1>
        <p className="muted">Track holdings and verify ownership directly on Base.</p>
      </section>
      <section className="panel-card">
        <h3>Wallet Connection</h3>
        <WalletButton />
      </section>
      <section className="grid-two">
        <BalanceCard address={address} balance={balance.toString()} />
        <SupplyCard label="Total Supply" value={totalSupply.toString()} />
      </section>
      <OwnershipChecker error={error} loading={loading} onLookup={lookupOwner} owner={owner} />
      <Link className="pixel-button inline-link" href="/">
        Back to Mint
      </Link>
    </div>
  );
}

