"use client";

import { useCallback } from "react";

import { useAccount, useWriteContract } from "wagmi";

import { APP_NAME, BASE_APP_ID, DATA_SUFFIX, pixelMintContract } from "@/lib/contracts";
import { trackTransaction } from "@/utils/track";

export function useTrackedTransfer() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const transferTracked = useCallback(
    async (to: `0x${string}`, tokenId: bigint): Promise<`0x${string}`> => {
      const txHash = await writeContractAsync({
        ...pixelMintContract,
        functionName: "transfer",
        args: [to, tokenId],
        dataSuffix: DATA_SUFFIX,
      });

      void trackTransaction(BASE_APP_ID, APP_NAME, address, txHash);
      return txHash;
    },
    [address, writeContractAsync],
  );

  return { transferTracked };
}

