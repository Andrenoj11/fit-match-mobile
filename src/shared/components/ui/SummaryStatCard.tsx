import { AppCard } from "@/shared/components/ui/AppCard";
import { AppText } from "@/shared/components/ui/AppText";

type SummaryStatCardProps = {
  label: string;
  value: number;
};

export function SummaryStatCard({ label, value }: SummaryStatCardProps) {
  return (
    <AppCard style={{ flex: 1 }}>
      <AppText variant="caption">{label}</AppText>
      <AppText variant="title">{value}</AppText>
    </AppCard>
  );
}
