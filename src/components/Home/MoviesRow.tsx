import React, { FC } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import MoviePoster from "../MoviePoster";
import { normalize } from "../../helper/FontSize";
import { navigationRef } from "../../helper/Types";
import { useTheme } from "../../helper/Theme";

interface Props {
  data: any;
  title: string;
  type: "tv" | "movie";
}

const MoviesRow: FC<Props> = ({ data = [], title, type }) => {
  const { theme } = useTheme();

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={[Styles.text, { color: theme.textColor }]}>{title}</Text>

        <Text
          onPress={() => navigationRef.current?.navigate("Movielist", { data, type, title })}
          style={[Styles.textMore, { color: theme.primary }]}
        >
          More
        </Text>
      </View>
      <FlatList
        data={data}
        horizontal
        renderItem={({ item }) => <MoviePoster item={item} type={type} />}
        keyExtractor={(item) => item.id.toString()}
        style={{ margin: 8, marginTop: 4 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default MoviesRow;

const Styles = StyleSheet.create({
  text: {
    fontSize: normalize(14),
    margin: 16,
    marginBottom: 0,
    fontFamily: "Montserrat-SemiBold",
  },

  textMore: {
    fontSize: normalize(12),
    margin: 16,
    marginBottom: 0,
    fontFamily: "Montserrat-SemiBold",
    alignSelf: "flex-end",
  },
});
