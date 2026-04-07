"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

function shortAddress(address?: string) {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <button className="pixel-button" onClick={() => disconnect()} type="button">
        {shortAddress(address)} · Disconnect
      </button>
    );
  }

  return (
    <div className="wallet-row">
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          className="pixel-button"
          disabled={isPending}
          onClick={() => connect({ connector })}
          type="button"
        >
          Connect {connector.name}
        </button>
      ))}
    </div>
  );
}

