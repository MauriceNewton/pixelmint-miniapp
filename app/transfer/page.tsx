"use client";

import Link from "next/link";
import { useState } from "react";

import { BaseError } from "viem";
import { useAccount, usePublicClient } from "wagmi";

import { BalanceCard } from "@/components/BalanceCard";
import { StatusChip } from "@/components/StatusChip";
import { TransferForm } from "@/components/TransferForm";
import { WalletButton } from "@/components/WalletButton";
import { useMintStats } from "@/hooks/useMintStats";
import { useTrackedTransfer } from "@/hooks/useTrackedTransfer";

export default function TransferPage() {
  const { address, isConnected, balance, refetchAll } = useMintStats();
  const { transferTracked } = useTrackedTransfer();
  const publicClient = usePublicClient();
  const account = useAccount();

  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");

  const submitTransfer = async (to: `0x${string}`, tokenId: bigint) => {
    setLoading(true);
    setError("");

    try {
      const hash = await transferTracked(to, tokenId);
      setTxHash(hash);

      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash });
      }

      await refetchAll();
    } catch (err) {
      const message = err instanceof BaseError ? err.shortMessage : "Transfer failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-stack">
      <section className="header-card">
        <p className="tiny-label">Transfer Desk</p>
        <h1>Send Token to Another Address</h1>
        <p className="muted">Manual transfer only. Verify token ID and recipient carefully.</p>
      </section>
      <section className="panel-card">
        <h3>Wallet Connection</h3>
        <WalletButton />
      </section>
      <BalanceCard address={address} balance={balance.toString()} />
      <TransferForm
        disabled={!isConnected || !account.address}
        error={error}
        loading={loading}
        onTransfer={submitTransfer}
        txHash={txHash}
      />
      {!isConnected ? <StatusChip text="Connect wallet to transfer." tone="neutral" /> : null}
      <Link className="pixel-button inline-link" href="/collection">
        Back to Collection
      </Link>
    </div>
  );
}

