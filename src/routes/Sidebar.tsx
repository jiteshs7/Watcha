import React, { FC, useState } from "react";
import { StyleSheet, View, SafeAreaView, Switch, Text } from "react-native";
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from "@react-navigation/drawer";
import { useTheme } from "../helper/Theme";

const Sidebar: FC<DrawerContentComponentProps> = (props) => {
  const { theme, updateTheme } = useTheme();

  const [switchVal, setSwitchVal] = useState<boolean>(theme.themeMode === "light" ? false : true);

  const handleChange = () => {
    setSwitchVal(!switchVal);
    if (updateTheme) {
      updateTheme();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.footer}>
        <Switch
          value={switchVal}
          thumbColor={switchVal ? theme.primary : theme.darkBlue}
          trackColor={{ true: theme.textColor, false: theme.textColor }}
          onChange={handleChange}
          style={{ transform: [{ scale: 1.5 }] }}
        />
        <Text style={[styles.text, { color: theme.textColor }]}>{switchVal ? "Dark Mode" : "Light Mode"}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    flex: 1,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Montserrat-Regular",
    marginTop: "5%",
  },
});

export default Sidebar;
