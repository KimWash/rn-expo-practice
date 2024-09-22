import { router } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import WebView from "react-native-webview";

export default function BlogPostView({id}: {id: number}) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {isLoading && (
        <View
          style={{
            width: '100%',
            height: "100%",
            position: "absolute",
            zIndex: 999,
            justifyContent: "center"
          }}
        >
          <ActivityIndicator />
        </View>
      )}
      <WebView
        source={{ uri: `https://blog-v2.kimwash.xyz/magazine/post/${id}` }}
        scalesPageToFit={false}
        onLoadEnd={() => setIsLoading(false)}
        pullToRefreshEnabled
        applicationNameForUserAgent="magangzine"
      ></WebView>
    </>
  );
}
