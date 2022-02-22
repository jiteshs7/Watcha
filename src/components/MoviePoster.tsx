import React, { FC } from "react";
import { Dimensions, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";

import { getImageUrl } from "../api/url";
import { navigationRef } from "../helper/Types";
import { normalize } from "../helper/FontSize";
import { useTheme } from "../helper/Theme";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const POSTER_WIDTH = width / 3.4;
const POSTER_HEIGHT = height / 4;

interface Prop {
  item: any;
  type: "tv" | "movie";
  showTitle?: boolean;
}

const MoviePoster: FC<Prop> = ({ item, type, showTitle = true }) => {
  const { theme } = useTheme();

  const scaleAnim = useSharedValue(1);

  const scaleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleAnim.value }],
    };
  });

  const handlePress = () => {
    if (type === "tv") {
      navigationRef.current?.navigate("TVDetail", { id: item.id });
    } else {
      navigationRef.current?.navigate("MovieDetail", { id: item.id });
    }
  };

  const handlePressIn = () => {
    scaleAnim.value = withSpring(0.9);
  };
  const handlePressOut = () => {
    scaleAnim.value = withSpring(1);
  };

  return (
    <Animated.View style={scaleStyle}>
      <TouchableOpacity activeOpacity={0.8} onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={handlePress}>
        <View style={[styles.imageContainer, { backgroundColor: theme.gray }]}>
          <FastImage
            style={{ height: POSTER_HEIGHT, width: POSTER_WIDTH }}
            resizeMode="cover"
            source={getImageUrl(item.poster_path)}
          />
        </View>
        {showTitle && (
          <Text numberOfLines={2} style={[styles.text, { color: theme.textColor }]}>
            {item.title ? item.title : item.name ?? ""}
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default MoviePoster;

const styles = StyleSheet.create({
  imageContainer: {
    margin: 4,
    borderRadius: 12,
    overflow: "hidden",
  },
  text: {
    alignSelf: "center",
    fontFamily: "Montserrat-Medium",
    fontWeight: "600",
    textAlign: "center",
    fontSize: normalize(12),
    width: POSTER_WIDTH,
  },
});
