import Gallery from "@/components/Galley";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { A } from "@expo/html-elements";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, TouchableOpacity, View } from "react-native";
import { PostPrototype } from "../gallery";


const fetchPosts = async () => {
  const response = await fetch("https://blog-v2.kimwash.xyz/api/post?page=1");
  const body = (await response.json()) as PostPrototype[];
  return body;
};

export default function Page() {
  const [posts, setPosts] = useState<PostPrototype[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const params = useLocalSearchParams();
  console.log(params)

  const load = () => {
    setIsLoading(true);
    fetchPosts().then((posts) => {
      setPosts(posts);
      setIsLoading(false);
    });
  };
  useEffect(load, []);

  return (
    <SafeAreaView>
      <Stack.Screen name={params.category as string}/>
      <ThemedView style={{ height: "100%",  }}>
        <Gallery
          images={posts.map(
            (post, i) =>
              `https://blog-v2.kimwash.xyz/api/media/${post.thumbnail_media}/HIGH`
          )}
          columns={3}
          onRefresh={load}
          onClickImage={(i) =>
            router.push({ pathname: "/post/[id]", params: { id: posts[i].id } })
          }
        />
      </ThemedView>
    </SafeAreaView>
  );
}
