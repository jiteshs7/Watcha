import React, { FC, useEffect } from "react";
import { ScrollView, Text, View, StyleSheet, RefreshControl, ActivityIndicator } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring } from "react-native-reanimated";
import { StackScreenProps } from "@react-navigation/stack";

import Screen from "../Screen";
import MoviesRow from "./MoviesRow";
import HomeHeader from "./HomeHeader";
import { normalize } from "../../helper/FontSize";
import { useTheme } from "../../helper/Theme";

interface Props {
  navigation: StackScreenProps<any, any>;
  type: "tv" | "movie";
  data: any;
  onRefresh: () => void;
  subTitle: string[];
  loader: boolean;
}

const HomeComponent: FC<Props> = ({ type, navigation, data, onRefresh, subTitle, loader }) => {
  const { theme } = useTheme();

  const widthAnim = useSharedValue<number>(30);

  useEffect(() => {
    widthAnim.value = withDelay(
      300,
      withSpring(100, undefined, (isFinished) => {
        if (isFinished) widthAnim.value = withSpring(30);
      })
    );
  }, [data]);

  const animStyle = useAnimatedStyle(() => {
    return {
      width: widthAnim.value,
    };
  });

  const onSwipe = () => {
    onRefresh();
  };

  const renderHeader = () => {
    return <HomeHeader navigation={navigation} type={type} />;
  };

  const renderTitle = () => {
    const title = type === "tv" ? "TV Shows" : "Movies";
    return (
      <>
        <Text style={[Styles.screenTitle, { color: theme.textColor }]}>{title}</Text>
        <Animated.View style={[Styles.titleBar, { backgroundColor: theme.primary }, animStyle]} />
      </>
    );
  };

  const renderMovieRow = () => {
    if (loader)
      return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size={40} color={theme.primary} />
          <Text style={{ fontSize: 16, color: theme.textColor }}>Watchout!! daily dose of fun incoming 🤩 </Text>
        </View>
      );

    return subTitle.map((title, index) => (
      <MoviesRow key={index} data={{ ...data[index] }.results} title={title} type={type} />
    ));
  };

  const renderMoviesComponent = () => {
    return (
      <ScrollView
        refreshControl={<RefreshControl refreshing={false} onRefresh={onSwipe} />}
        showsVerticalScrollIndicator={false}
      >
        {renderTitle()}
        {renderMovieRow()}
      </ScrollView>
    );
  };

  return (
    <Screen>
      {renderHeader()}
      {renderMoviesComponent()}
    </Screen>
  );
};

export default HomeComponent;

const Styles = StyleSheet.create({
  screenTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: normalize(30),
    margin: 16,
    marginBottom: 0,
  },

  titleBar: {
    height: 5,
    marginTop: 2,
    marginBottom: 12,
    marginLeft: 16,
  },
});
