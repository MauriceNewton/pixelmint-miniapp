"use client";

import { useMemo } from "react";

import { formatEther } from "viem";
import { useAccount, useReadContract } from "wagmi";

import { pixelMintContract } from "@/lib/contracts";

export function useMintStats() {
  const { address, isConnected } = useAccount();

  const priceQuery = useReadContract({
    ...pixelMintContract,
    functionName: "PRICE",
    query: { staleTime: 15_000 },
  });

  const supplyQuery = useReadContract({
    ...pixelMintContract,
    functionName: "totalSupply",
    query: { staleTime: 10_000 },
  });

  const balanceQuery = useReadContract({
    ...pixelMintContract,
    functionName: "balanceOf",
    args: [address ?? "0x0000000000000000000000000000000000000000"],
    query: {
      enabled: Boolean(address),
      staleTime: 10_000,
    },
  });

  const price = (priceQuery.data ?? 0n) as bigint;
  const totalSupply = (supplyQuery.data ?? 0n) as bigint;
  const balance = (balanceQuery.data ?? 0n) as bigint;

  const refetchAll = async () => {
    await Promise.all([priceQuery.refetch(), supplyQuery.refetch(), balanceQuery.refetch()]);
  };

  return {
    isConnected,
    address,
    price,
    priceEth: formatEther(price),
    totalSupply,
    balance,
    loading: priceQuery.isLoading || supplyQuery.isLoading || balanceQuery.isLoading,
    refetchAll,
  };
}

