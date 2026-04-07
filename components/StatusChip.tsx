type StatusChipProps = {
  tone?: "neutral" | "success" | "error";
  text: string;
};

export function StatusChip({ tone = "neutral", text }: StatusChipProps) {
  return <p className={`status-chip status-${tone}`}>{text}</p>;
}

