import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import { useTheme } from "../../helper/Theme";

interface RatingProps {
  rating: number;
  style?: object;
  textClr?: string;
}

const MovieRating: FC<RatingProps> = ({ rating, style, textClr = "" }) => {
  const { theme } = useTheme();

  const Rating = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <Star color={theme.backgroundColor || "#fff"} rating={10} />
        <Star color={theme.yellow || "yellow"} rating={rating} />
        <Text style={[_styles.ratingText, { color: textClr ? textClr : theme.textColor }]}>{(rating / 2).toFixed(1)}</Text>
      </View>
    );
  };

  interface StarProps {
    color: string;
    rating: number;
  }

  const Star: FC<StarProps> = ({ color = "", rating = 10 }) => {
    const { theme } = useTheme();

    const items = [];
    for (let i = 1; i <= 5; i++) {
      items.push(<Icon key={i} name="star" size={15} color={color ? color : theme.backgroundColor} />);
    }
    return <View style={[_styles.star, { width: 75 * (rating / 10) }]}>{items}</View>;
  };

  return <View style={{ flexDirection: "row", ...style }}>{rating !== 0 && <Rating />}</View>;
};

export default MovieRating;

const _styles = StyleSheet.create({
  star: {
    position: "absolute",
    flexDirection: "row",
    overflow: "hidden",
  },

  ratingText: {
    marginLeft: 75,
    fontFamily: "Montserrat-Medium",
  },
});
