/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import SplashScreen from "react-native-splash-screen";

import MovieDetailScreen from "./src/screen/MovieDetailScreen";
import SearchScreen from "./src/screen/SearchScreen";
import HomeDrawerNavigator from "./src/routes/HomeDrawerNavigator";
import TVDetailScreen from "./src/screen/TVDetailScreen";
import WebViewScreen from "./src/screen/WebViewScreen";
import MovieListScreen from "./src/screen/MovieListScreen";

import OfflineNotice from "./src/components/OfflineNotice";
import MovieSeasonScreen from "./src/screen/MovieSeasonScreen";
import { navigationRef } from "./src/helper/Types";
import Theme from "./src/helper/Theme";

type STACKPROP = {
  Home: undefined;
  MovieDetail: undefined;
  TVDetail: undefined;
  Search: undefined;
  Webview: undefined;
  Movielist: undefined;
  Movieseason: undefined;
};

const Stack = createStackNavigator<STACKPROP>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeDrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
      <Stack.Screen name="TVDetail" component={TVDetailScreen} />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          gestureDirection: "vertical",
        }}
      />
      <Stack.Screen name="Webview" component={WebViewScreen} />
      <Stack.Screen name="Movielist" component={MovieListScreen} />
      <Stack.Screen name="Movieseason" component={MovieSeasonScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Theme>
      <NavigationContainer ref={navigationRef}>
        <AppNavigator />
        <OfflineNotice />
      </NavigationContainer>
    </Theme>
  );
};

export default App;
