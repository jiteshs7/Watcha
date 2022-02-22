import React, { FC } from "react";
import { useRoute, StackActions } from "@react-navigation/native";
import { View, Text, FlatList, TouchableWithoutFeedback } from "react-native";
import FastImage from "react-native-fast-image";

import { getImageUrl } from "../../api/url";
import { Styles } from "./Styles";
import { useTheme } from "../../helper/Theme";
import { navigationRef } from "../../helper/Types";

interface MovieProps {
  recommendations: any;
}

const MovieRecommendations: FC<MovieProps> = ({ recommendations }) => {
  const movieData = recommendations.results.slice(0, 10);
  const routeName = useRoute().name;

  const { theme } = useTheme();

  if (movieData.length === 0) return null;

  return (
    <View>
      <Text style={[Styles.titleText, { color: theme.textColor }]}>Recommendations</Text>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={movieData}
        renderItem={({ item }) => <Recommendations data={item} route={routeName} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

interface RProps {
  data: any;
  route: string;
}

const Recommendations: FC<RProps> = ({ data, route }) => {
  const imageUrl = getImageUrl(data.poster_path, "uri", "w185");

  const { theme } = useTheme();

  return (
    <TouchableWithoutFeedback onPress={() => navigationRef.current?.dispatch(StackActions.push(route, { id: data.id }))}>
      <View>
        <View style={[Styles.imagePlaceholder, Styles.movieRecommImages]}>
          <FastImage source={imageUrl} style={Styles.movieRecommImages} />
        </View>
        <Text style={[Styles.bottomText, { width: 100, color: theme.textColor }]} numberOfLines={2}>
          {data.title}
          {data.name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MovieRecommendations;
