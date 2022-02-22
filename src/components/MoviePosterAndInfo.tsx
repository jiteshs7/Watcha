import React, { FC } from "react";
import { genres } from "../helper/Genres";
import { View, TouchableOpacity, Text } from "react-native";
import MoviePoster from "./MoviePoster";
import MovieRating from "./MovieDetail/MovieRating";
import { navigationRef } from "../helper/Types";
import { useTheme } from "../helper/Theme";

interface Props {
  data: any;
  type: "tv" | "movie";
}

const MoviesPosterandInfo: FC<Props> = ({ data, type }) => {
  const { theme } = useTheme();

  const Genres = (genreId = []) => {
    const text = genreId.map((item: number) => {
      return genres[item].name;
    });

    return text.join(", ");
  };

  return (
    <View style={{ marginHorizontal: 16, marginVertical: 8, backgroundColor: theme.backgroundColor }}>
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={() => {
          if (type === "tv") {
            navigationRef.current?.navigate("TVDetail", { id: data.id });
          } else {
            navigationRef.current?.navigate("MovieDetail", { id: data.id });
          }
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <MoviePoster item={data} type={type} showTitle={false} />
          <View style={{ margin: 16, justifyContent: "center", marginBottom: 24, flex: 1 }}>
            <Text
              style={{ fontFamily: "Montserrat-Bold", fontSize: 16, marginBottom: 10, color: theme.textColor }}
              numberOfLines={2}
            >
              {data.name}
              {data.title}
            </Text>
            <MovieRating rating={data.vote_average} />
            <Text
              style={{ fontFamily: "Montserrat-Light", fontSize: 12, marginTop: 10, width: "75%", color: theme.textColor }}
            >
              {Genres(data.genre_ids)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MoviesPosterandInfo;
