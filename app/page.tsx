"use client";

import { useMemo, useState } from "react";

import { BaseError } from "viem";
import { useRouter } from "next/navigation";

import { MintHeader } from "@/components/MintHeader";
import { MintPanel } from "@/components/MintPanel";
import { PixelHero } from "@/components/PixelHero";
import { StatusChip } from "@/components/StatusChip";
import { SupplyCard } from "@/components/SupplyCard";
import { WalletButton } from "@/components/WalletButton";
import { useMintStats } from "@/hooks/useMintStats";
import { useTrackedMint } from "@/hooks/useTrackedMint";

export default function HomePage() {
  const router = useRouter();
  const { isConnected, price, priceEth, totalSupply, balance, refetchAll } = useMintStats();
  const { mintTracked } = useTrackedMint();

  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const shortHash = useMemo(() => {
    if (!txHash) return "";
    return `${txHash.slice(0, 10)}...${txHash.slice(-8)}`;
  }, [txHash]);

  const handleMint = async () => {
    setError("");
    setStatus("Submitting mint transaction...");
    setLoading(true);

    try {
      const result = await mintTracked(price);
      setTxHash(result.txHash);
      await refetchAll();

      if (result.tokenId !== undefined) {
        setStatus(`Minted token #${result.tokenId.toString()}`);
      } else {
        setStatus("Mint submitted successfully. Your collection has been updated.");
      }

      setTimeout(() => router.push("/collection"), 900);
    } catch (err) {
      const message = err instanceof BaseError ? err.shortMessage : "Mint failed.";
      setError(message);
      setStatus("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-stack">
      <MintHeader />
      <PixelHero />
      <section className="grid-two">
        <SupplyCard label="Mint Price (ETH)" value={priceEth} />
        <SupplyCard label="Total Supply" value={totalSupply.toString()} />
      </section>
      <section className="panel-card">
        <h3>Wallet Access</h3>
        <WalletButton />
        <p className="tiny-label">Your balance: {balance.toString()}</p>
      </section>
      <MintPanel
        actionText={txHash ? `Tx: ${shortHash}` : `Ready to mint at ${priceEth} ETH`}
        connected={isConnected}
        loading={loading}
        onMint={handleMint}
        helper={status ? <StatusChip text={status} tone="success" /> : null}
      />
      {error ? <StatusChip text={error} tone="error" /> : null}
    </div>
  );
}

