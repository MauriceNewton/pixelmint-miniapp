export function RuleList() {
  return (
    <section className="panel-card">
      <h2>About This Version</h2>
      <ul className="rule-list">
        <li>Mint uses a fixed price set by contract PRICE().</li>
        <li>Users can mint repeatedly through mint().</li>
        <li>Ownership and supply are recorded onchain.</li>
        <li>Transfers are manual via transfer(to, tokenId).</li>
        <li>This version does not include metadata, rarity, marketplace, or advanced NFT features.</li>
        <li>More advanced collectible features can be added in a future upgrade.</li>
      </ul>
    </section>
  );
}

