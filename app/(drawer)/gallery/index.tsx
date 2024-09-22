import Gallery from "@/components/Galley";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { A } from "@expo/html-elements";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, TouchableOpacity, View } from "react-native";

export type PostPrototype = {
  title: string;
  content: string;
  create_dt: string;
  id: number;
  description: string;
  thumbnail_media: number;
};

export type Media = {
  id: number;
  name: string;
  files: { name: string; id: number }[];

}

const fetchPosts = async () => {
  const response = await fetch("https://blog-v2.kimwash.xyz/api/post?page=1");
  const body = (await response.json()) as PostPrototype[];
  return body;
};

const fetchMedias = async () => {
  const response = await fetch("http://192.168.1.146:3000/api/media");
  const body = (await response.json()) as Media[];
  return body;
};

export default function Page() {
  const [medias, setMedias] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const load = () => {
    setIsLoading(true);
    fetchMedias().then((posts) => {
      setMedias(posts);
      setIsLoading(false);
    });
  };
  useEffect(load, []);

  return (
    <SafeAreaView>
      <ThemedView style={{ height: "100%",  }}>
        <Gallery
          images={medias.map(
            (media, i) =>
              `https://blog-v2.kimwash.xyz/api/media/${media.id}/HIGH`
          )}
          columns={3}
          onRefresh={load}
          // onClickImage={(i) =>
            // router.push({ pathname: "/post/[id]", params: { id: posts[i].id } })
          // }
        />
      </ThemedView>
    </SafeAreaView>
  );
}
