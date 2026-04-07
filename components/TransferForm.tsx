"use client";

import { FormEvent, useMemo, useState } from "react";

import { isAddress } from "viem";

import { StatusChip } from "@/components/StatusChip";

type TransferFormProps = {
  onTransfer: (to: `0x${string}`, tokenId: bigint) => Promise<void>;
  loading: boolean;
  disabled: boolean;
  txHash: string;
  error: string;
};

export function TransferForm({ onTransfer, loading, disabled, txHash, error }: TransferFormProps) {
  const [to, setTo] = useState("");
  const [tokenId, setTokenId] = useState("");

  const validTokenId = /^\d+$/.test(tokenId.trim());
  const validAddress = isAddress(to.trim());
  const canSubmit = !disabled && validTokenId && validAddress && !loading;

  const shortHash = useMemo(() => {
    if (!txHash) return "";
    return `${txHash.slice(0, 10)}...${txHash.slice(-8)}`;
  }, [txHash]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;
    await onTransfer(to.trim() as `0x${string}`, BigInt(tokenId));
  };

  return (
    <section className="panel-card">
      <h3>Transfer Desk</h3>
      <p className="muted">Only owner can transfer.</p>
      <form onSubmit={submit}>
        <input
          className="pixel-input"
          inputMode="numeric"
          onChange={(event) => setTokenId(event.target.value)}
          placeholder="Token ID"
          value={tokenId}
        />
        <input
          className="pixel-input"
          onChange={(event) => setTo(event.target.value)}
          placeholder="Recipient address"
          value={to}
        />
        <button className="pixel-button" disabled={!canSubmit} type="submit">
          {loading ? "Transferring..." : "Transfer NFT"}
        </button>
      </form>
      {txHash ? <StatusChip text={`Transfer sent: ${shortHash}`} tone="success" /> : null}
      {error ? <StatusChip text={error} tone="error" /> : null}
    </section>
  );
}

