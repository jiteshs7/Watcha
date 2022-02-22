import React, { FC } from "react";
import { createDrawerNavigator, DrawerContentComponentProps } from "@react-navigation/drawer";
import { Text } from "react-native";

import TVShowScreen from "../screen/TVShowScreen";
import MovieScreen from "../screen/MovieScreen";
import Sidebar from "./Sidebar";
import { useTheme } from "../helper/Theme";

type RootStack = {
  Movie: undefined;
  TvShow: undefined;
};

const Drawer = createDrawerNavigator<RootStack>();

const CustomDrawerStyle = (color: string, focused: boolean, title: string) => {
  return (
    <Text
      style={{
        fontSize: focused ? 20 : 16,
        color: color,
        fontFamily: focused ? "Montserrat-Bold" : "Montserrat-Light",
      }}
    >
      {title}
    </Text>
  );
};

const HomeDrawerNavigator: FC = () => {
  const { theme } = useTheme();
  return (
    <Drawer.Navigator
      initialRouteName="Movie"
      drawerType="slide"
      drawerStyle={{ width: "50%", backgroundColor: theme.textColor }}
      drawerContentOptions={{
        activeBackgroundColor: "transparent",
        activeTintColor: theme.primary,
        inactiveTintColor: theme.textColor,
      }}
      drawerContent={(props) => <Sidebar {...props} />}
    >
      <Drawer.Screen
        name="Movie"
        component={MovieScreen}
        options={{
          drawerLabel: ({ color, focused }) => CustomDrawerStyle(color, focused, "Movies"),
        }}
      />
      <Drawer.Screen
        name="TvShow"
        component={TVShowScreen}
        options={{
          drawerLabel: ({ color, focused }) => CustomDrawerStyle(color, focused, "TV Shows"),
        }}
      />
    </Drawer.Navigator>
  );
};

export default HomeDrawerNavigator;
