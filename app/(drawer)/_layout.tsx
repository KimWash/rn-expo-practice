import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";

export type MenuItem = {
  id: string;
  name: string;
  type: string;
  url: string;
  children: MenuItem[];
};

const fetchMenus = async () => {
  const response = await fetch("https://blog-v2.kimwash.xyz/api/menu");
  const body = (await response.json()) as MenuItem[];

  return body;
};

export default function DrawerLayout() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  useEffect(() => {
    fetchMenus().then((menus) => setMenus(menus));
  }, []);

  return (
    <Drawer
      drawerContent={(props) => {
        return (
          <ThemedView style={{ height: "100%" }}>
            <SafeAreaView>
              <DrawerItemList {...props}></DrawerItemList>
              {menus.map((menu) => (
                <DrawerItem
                  key={menu.id}
                  label={menu.name}
                  onPress={function (): void {
                    router.push({
                      pathname: "/(drawer)/posts/[category]",
                      params: { category: menu.id },
                    });
                  }}
                ></DrawerItem>
              ))}
            </SafeAreaView>
          </ThemedView>
        );
      }}
    >
      <Drawer.Screen
        name="index"
        options={{ title: "", drawerLabel: "Home" }}
      />
      <Drawer.Screen
        name="gallery/index"
        options={{ title: "Gallery" }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="posts/[category]"
        options={{ drawerItemStyle: { display: "none" }, }}
      />
    </Drawer>
  );
}
