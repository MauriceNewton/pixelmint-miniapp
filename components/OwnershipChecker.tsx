"use client";

import { FormEvent, useState } from "react";

import { StatusChip } from "@/components/StatusChip";

type OwnershipCheckerProps = {
  loading: boolean;
  owner: string;
  error: string;
  onLookup: (tokenId: string) => Promise<void>;
};

export function OwnershipChecker({ loading, owner, error, onLookup }: OwnershipCheckerProps) {
  const [tokenId, setTokenId] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onLookup(tokenId.trim());
  };

  return (
    <section className="panel-card">
      <h3>Token ownership checker</h3>
      <form onSubmit={submit}>
        <input
          className="pixel-input"
          inputMode="numeric"
          min={0}
          onChange={(event) => setTokenId(event.target.value)}
          placeholder="Enter token ID"
          value={tokenId}
        />
        <button className="pixel-button" disabled={loading || tokenId.trim().length === 0} type="submit">
          {loading ? "Checking..." : "Check Owner"}
        </button>
      </form>
      {owner ? <StatusChip text={`Owner: ${owner}`} tone="success" /> : null}
      {error ? <StatusChip text={error} tone="error" /> : null}
    </section>
  );
}

