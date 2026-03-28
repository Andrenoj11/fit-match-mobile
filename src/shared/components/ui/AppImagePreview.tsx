import { Image } from "react-native";

import { ImagePlaceholder } from "@/shared/components/ui/ImagePlaceholder";

type AppImagePreviewProps = {
  uri?: string;
  label?: string;
  height?: number;
};

export function AppImagePreview({
  uri,
  label = "Image Preview",
  height = 140,
}: AppImagePreviewProps) {
  if (!uri) {
    return <ImagePlaceholder label={label} height={height} />;
  }

  return (
    <Image
      source={{ uri }}
      style={{
        width: "100%",
        height,
        borderRadius: 16,
      }}
      resizeMode="cover"
    />
  );
}
