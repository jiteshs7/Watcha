import React, { FC } from "react";
import { View, Text, FlatList, TouchableWithoutFeedback } from "react-native";
import FastImage from "react-native-fast-image";

import { getImageUrl } from "../../api/url";
import { Styles } from "./Styles";
import { useTheme } from "../../helper/Theme";
import { navigationRef } from "../../helper/Types";

interface MovieProp {
  seasonData: any;
  movieid: number;
}

const MovieSeason: FC<MovieProp> = ({ seasonData, movieid }) => {
  const seasons = seasonData[0].season_number < 1 ? [...seasonData.slice(1), seasonData[0]] : seasonData;
  const seasonName = seasonData.map((item: any) => item.name);

  const { theme } = useTheme();

  return (
    <View>
      <Text style={[Styles.titleText, { color: theme.textColor }]}>Seasons</Text>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={seasons}
        renderItem={({ item }) => <SeasonItem data={item} seasonName={seasonName} movieid={movieid} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

interface SeasonProp {
  data: any;
  seasonName: string;
  movieid: number;
}

const SeasonItem: FC<SeasonProp> = ({ data, seasonName, movieid }) => {
  const imageUrl = getImageUrl(data.poster_path, "uri", "w185");

  const { theme } = useTheme();

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigationRef.current?.navigate("Movieseason", { season: data, listSeason: seasonName, movieid: movieid })
      }
    >
      <View>
        <View style={[Styles.imagePlaceholder, { height: 180, width: 120, marginRight: 8, borderRadius: 10 }]}>
          <FastImage source={imageUrl} style={{ height: 180, width: 120, marginRight: 8, borderRadius: 10 }} />
        </View>
        <Text
          style={{
            color: theme.primary,
            fontFamily: "Montserrat-SemiBold",
            fontSize: 15,
            marginTop: 4,
            width: 100,
          }}
        >
          {data.name}
        </Text>
        <Text
          style={{
            color: theme.blue,
            fontFamily: "Montserrat-Light",
            width: 100,
            fontSize: 14,
          }}
        >{`${data.episode_count}${data.episode_count > 1 ? "episodes" : "episode"}`}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MovieSeason;
