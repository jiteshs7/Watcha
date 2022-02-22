import React, { FC } from "react";
import { FlatList } from "react-native";

import MoviesPosterandInfo from "./MoviePosterAndInfo";

interface Props {
  results: any;
  type: "tv" | "movie";
  onReachEnd?: () => void;
}

const MovieList: FC<Props> = ({ results, type, onReachEnd = null }) => {
  return (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      keyboardShouldPersistTaps="handled"
      data={results}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <MoviesPosterandInfo data={item} type={type} />}
      contentContainerStyle={{ marginVertical: 8 }}
      onEndReached={onReachEnd}
      onEndReachedThreshold={0.9}
    />
  );
};

export default MovieList;
