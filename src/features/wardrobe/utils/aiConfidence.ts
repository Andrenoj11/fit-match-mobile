export function getAiConfidenceLabel(confidence: number): {
  label: string;
  tone: "success" | "warning" | "neutral";
} {
  if (confidence >= 0.9) {
    return {
      label: "High confidence",
      tone: "success",
    };
  }

  if (confidence >= 0.75) {
    return {
      label: "Medium confidence",
      tone: "warning",
    };
  }

  return {
    label: "Low confidence",
    tone: "neutral",
  };
}
