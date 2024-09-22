import {
  Image,
  StyleSheet,
  Platform,
  Text,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getBackgroundColorAsync } from "expo-system-ui";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Link } from "expo-router";

export default function HomeScreen() {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <SafeAreaView style={{ backgroundColor }}>
      <ThemedView style={{ height: "100%" }}>
        <ScrollView style={{ padding: 30 }}>
          <ThemedView>
            <ThemedText type="title">This is Header.</ThemedText>
            <Link href='/gallery'>
            <ThemedText>Let me show you my gallery!</ThemedText>
            </Link>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
