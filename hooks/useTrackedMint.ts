"use client";

import { useCallback } from "react";

import { parseEventLogs } from "viem";
import { useAccount, usePublicClient, useWriteContract } from "wagmi";

import { pixelMintAbi } from "@/lib/abi/pixelMintAbi";
import { APP_NAME, BASE_APP_ID, DATA_SUFFIX, pixelMintContract } from "@/lib/contracts";
import { trackTransaction } from "@/utils/track";

type MintTrackedResult = {
  txHash: `0x${string}`;
  tokenId?: bigint;
};

export function useTrackedMint() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();

  const mintTracked = useCallback(
    async (price: bigint): Promise<MintTrackedResult> => {
      if (!publicClient) {
        throw new Error("Public client unavailable.");
      }

      const txHash = await writeContractAsync({
        ...pixelMintContract,
        functionName: "mint",
        args: [],
        value: price,
        dataSuffix: DATA_SUFFIX,
      });

      void trackTransaction(BASE_APP_ID, APP_NAME, address, txHash);

      const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
      let tokenId: bigint | undefined;

      try {
        const transferLogs = parseEventLogs({
          abi: pixelMintAbi,
          eventName: "Transfer",
          logs: receipt.logs,
        });

        const minted = transferLogs.find((log) => {
          const from = log.args.from?.toLowerCase();
          const to = log.args.to?.toLowerCase();
          return from === "0x0000000000000000000000000000000000000000" && to === address?.toLowerCase();
        });

        tokenId = minted?.args.tokenId;
      } catch {
        tokenId = undefined;
      }

      return { txHash, tokenId };
    },
    [address, publicClient, writeContractAsync],
  );

  return { mintTracked };
}

