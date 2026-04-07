type BalanceCardProps = {
  balance: string;
  address?: string;
};

function shortAddress(address?: string) {
  if (!address) return "Not connected";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function BalanceCard({ balance, address }: BalanceCardProps) {
  return (
    <article className="stat-card">
      <p className="tiny-label">Wallet</p>
      <p className="muted">{shortAddress(address)}</p>
      <p className="tiny-label">Your balance</p>
      <p className="stat-value">{balance}</p>
    </article>
  );
}

