import {
  Dimensions,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { Image } from "expo-image";
import { useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";

function calcImageRatio(width: number, height: number) {
  const maxWidth = 300;
  const maxHeight = 400;
  const widthRatio = maxWidth / width;
  const heightRatio = maxHeight / height;
  return Math.min(widthRatio, heightRatio); // ratio
}

export type ImageModalType = {
  modalImage?: string;
  setModalImage: (image?: string) => void;
};
export default function ImageModal({
  modalImage,
  setModalImage,
}: ImageModalType) {
  const [imageSize, setImageSize] = useState({ width: 300, height: 400 });
  const [expanded, setExpanded] = useState(false)

  const animatedStyle = useAnimatedStyle(() => ({
    width: expanded ? '100%' : imageSize.width,
    height: expanded ? '100%' : imageSize.height,
    backgroundColor: 'red'
  }), [expanded]);
  return (
    <Modal
      animationType="fade"
      visible={modalImage ? true : false}
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={() => setModalImage(undefined)}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              position: "absolute",
              left: "10%",
              right: "10%",
              bottom: "20%",
              top: "20%",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <TouchableOpacity onPress={() => setExpanded((prev) => !prev)}>
                <Image
                  onLoad={({ source: { width, height } }) => {
                    const ratio = calcImageRatio(width, height);
                    setImageSize({
                      width: width * ratio,
                      height: height * ratio,
                    });
                  }}
                  style={{ width: "100%", height: imageSize.height }}
                  // is there another way to be elegant?
                  contentFit="contain"
                  source={modalImage}
                ></Image>
            </TouchableOpacity>
            <ThemedView
              style={{
                backgroundColor: "black",
                borderRadius: 20,
                padding: 10,
              }}
            >
              <ThemedText type="subtitle">Some Image Title</ThemedText>
              <ThemedText>Some Image descriptions</ThemedText>
            </ThemedView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
