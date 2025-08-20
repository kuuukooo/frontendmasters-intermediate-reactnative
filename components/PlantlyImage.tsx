import { theme } from "@/theme";
import { Image, useWindowDimensions, View } from "react-native";

type Props = {
  size?: number;
  imageUri?: string;
  fixedSize?: { width: number; height: number };
};

export function PlantlyImage({ size, imageUri, fixedSize }: Props) {
  const { width } = useWindowDimensions();

  let imageWidth: number;
  let imageHeight: number;

  if (fixedSize) {
    imageWidth = fixedSize.width;
    imageHeight = fixedSize.height;
  } else {
    const imageSize = size || Math.min(width / 1.5, 400);
    imageWidth = imageSize;
    imageHeight = imageSize;
  }

  const imageElement = (
    <Image
      source={imageUri ? { uri: imageUri } : require("@/assets/plantly.png")}
      style={{
        width: imageWidth,
        height: imageHeight,
        borderRadius: fixedSize ? 10 : 6,
        // Mantener aspect ratio y cubrir el área sin distorsión
        resizeMode: fixedSize ? "cover" : "contain",
      }}
    />
  );

  // Si tiene fixedSize y una imagen personalizada, agregamos un borde verde
  if (fixedSize && imageUri) {
    return (
      <View
        style={{
          borderWidth: 2,
          borderColor: theme.colorGreen,
          borderRadius: 10,
          alignSelf: "center",
        }}
      >
        {imageElement}
      </View>
    );
  }

  return imageElement;
}
