"use client";

import { useCallback, useState } from "react";

import { usePublicClient } from "wagmi";

import { pixelMintContract } from "@/lib/contracts";

export function useOwnerLookup() {
  const publicClient = usePublicClient();
  const [owner, setOwner] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const lookupOwner = useCallback(
    async (tokenIdInput: string) => {
      setError("");
      setOwner("");

      if (!publicClient) {
        setError("Network client unavailable.");
        return;
      }

      if (!/^\d+$/.test(tokenIdInput)) {
        setError("Token ID must be a non-negative integer.");
        return;
      }

      try {
        setLoading(true);
        const tokenId = BigInt(tokenIdInput);
        const result = await publicClient.readContract({
          ...pixelMintContract,
          functionName: "ownerOf",
          args: [tokenId],
        });
        setOwner(result);
      } catch {
        setError("Token not found or owner lookup failed.");
      } finally {
        setLoading(false);
      }
    },
    [publicClient],
  );

  return {
    owner,
    error,
    loading,
    lookupOwner,
  };
}

