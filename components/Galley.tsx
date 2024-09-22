import {
  FlatList,
  View,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  Linking,
  RefreshControl,
} from "react-native";
import { Image } from "expo-image";
import { Image as ImageUtil } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useEffect, useState } from "react";
import ImageModal from "./ImageModal";
import { Navigator, router } from "expo-router";
import { WebViewRenderProcessGoneDetail } from "react-native-webview/lib/WebViewTypes";

export type GalleryProps = {
  images: string[];
  columns?: number;
  onRefresh: () => void;
  isLoading?: boolean;
  isRefreshing?: boolean;
  onClickImage?: (index: number) => void;
};

export default function Gallery({
  images,
  columns = 3,
  isLoading = false,
  isRefreshing = false,
  onRefresh: onRefreshGallery,
  onClickImage,
}: GalleryProps) {
  const [modalImage, setModalImage] = useState<string>();
  const onRefresh = () => {
    // actual refresh
    onRefreshGallery();
  };

  return (
    <>
      <ImageModal modalImage={modalImage} setModalImage={setModalImage} />

      <FlatList
        data={images}
        refreshing={isRefreshing}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        renderItem={(data) => (
          <View style={{ flex: 1 / columns, aspectRatio: 1 }}>
            <TouchableOpacity
              onPress={() => {
                console.log(data)
                if (onClickImage) onClickImage(data.index);
                else setModalImage(data.item);
              }}
            >
              <Image
                // is there another way to be elegant?
                style={{ width: "100%", height: "100%" }}
                contentFit="cover"
                source={data.item}
              ></Image>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(data) => data.toString()}
        numColumns={columns}
      ></FlatList>
    </>
  );
}
