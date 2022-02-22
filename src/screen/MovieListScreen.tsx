import React, { FC, useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import MovieList from "../components/MovieList";
import Screen from "../components/Screen";
import { fetchFunctionListScreen } from "../helper/Types";
import BackIcon from "../components/Utils/BackIcon";
import { useTheme } from "../helper/Theme";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withDelay } from "react-native-reanimated";

interface Props {
  route: any;
}

const MovieListScreen: FC<Props> = ({ route }) => {
  const { theme } = useTheme();

  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<any>(route.params.data);

  const loader = useRef<boolean>(false);

  const widthAnim = useSharedValue<number>(40);

  const animStyle = useAnimatedStyle(() => {
    return {
      width: widthAnim.value,
    };
  });

  useEffect(() => {
    widthAnim.value = withDelay(
      300,
      withSpring(100, undefined, (isFinished) => {
        if (isFinished) widthAnim.value = withSpring(40);
      })
    );
  }, []);

  const onReachEnd = async () => {
    if (loader.current) return;
    loader.current = true;
    const newPage = page + 1;
    const { type, title } = route.params;

    const fetchUrl = fetchFunctionListScreen(type, title);

    if (fetchUrl) {
      const response = fetchUrl ? await fetchUrl(newPage) : null;

      if (response) {
        if (response.page === newPage) {
          setPage(newPage);
          setData([...data, ...response.results]);
        }
      }
      loader.current = false;
    }
  };

  const renderTitle = () => {
    const { title, type } = route.params;

    return (
      <View>
        <View style={{ flexDirection: "row", marginTop: "5%" }}>
          <BackIcon style={{ flex: 1, paddingLeft: "5%", alignSelf: "flex-start" }} />
          <Text style={[_styles.headerTitle, { color: theme.textColor }]}>{`${title} ${
            type === "tv" ? "TV Show" : "Movies"
          }`}</Text>
          <View style={{ flex: 1, paddingRight: 12 }} />
        </View>
        <Animated.View style={[_styles.titleBar, animStyle, { backgroundColor: theme.primary }]} />
      </View>
    );
  };

  const { type } = route.params;

  return (
    <Screen>
      {renderTitle()}
      <MovieList results={data} onReachEnd={onReachEnd} type={type} />
    </Screen>
  );
};

export default MovieListScreen;

const _styles = StyleSheet.create({
  headerTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
    flex: 8,
    textAlign: "center",
    alignSelf: "center",
  },

  titleBar: {
    height: 5,
    marginTop: "1%",
    alignSelf: "center",
  },
});
