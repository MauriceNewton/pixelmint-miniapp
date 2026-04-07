type SupplyCardProps = {
  label: string;
  value: string;
};

export function SupplyCard({ label, value }: SupplyCardProps) {
  return (
    <article className="stat-card">
      <p className="tiny-label">{label}</p>
      <p className="stat-value">{value}</p>
    </article>
  );
}

