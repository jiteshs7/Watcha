import React, { FC, useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

import Screen from "../components/Screen";
import { requestSearchMovie, requestSearchTv } from "../api/api";
import MovieList from "../components/MovieList";

import Icon from "react-native-vector-icons/Ionicons";
import BackIcon from "../components/Utils/BackIcon";
import { useTheme } from "../helper/Theme";

interface PROPS {
  route: {
    params: {
      type: "movie" | "tv";
    };
  };
}

const SearchScreen: FC<PROPS> = ({ route }) => {
  const [search, setSearch] = useState<any>({});

  const { theme } = useTheme();

  const renderHeaderTitle = () => {
    const { type } = route.params;

    const title = type === "tv" ? "TV Shows" : "Movies";

    return (
      <View>
        <View style={{ flexDirection: "row", marginTop: 24 }}>
          <BackIcon style={{ flex: 1, paddingLeft: 12, alignSelf: "flex-start" }} />
          <Text style={[_styles.headerTitle, { color: theme.textColor }]}>{`Search ${title}`}</Text>
          <View style={{ flex: 1, paddingRight: 12 }}></View>
        </View>
        <View style={[_styles.titleBar, { backgroundColor: theme.primary }]} />
        <Text style={[_styles.subTitle, { color: theme.textColor }]}>
          {`We'll help you find your favorite ${title.toLowerCase()}. Discover wonderful ${title.toLowerCase()}.`}
        </Text>
      </View>
    );
  };

  const renderSearchText = () => {
    return (
      <View style={[_styles.searchContainer, { backgroundColor: theme.lightGray }]}>
        <Icon name={"search"} size={20} style={{ margin: 12 }} />
        <View style={{ alignSelf: "center", flex: 1 }}>
          <TextInput
            style={[_styles.searchInput, { color: theme.textColor }]}
            placeholder={"Avengers: End Game"}
            onChangeText={(text) => requestMovie(text)}
            returnKeyType={"search"}
            autoCorrect={false}
          />
        </View>
      </View>
    );
  };

  const renderListMovies = () => {
    const { results = [] } = search;
    const { type } = route.params;
    return <MovieList results={results} type={type} />;
  };

  const requestMovie = async (text: string) => {
    const { type } = route.params;
    const requestSearch = type === "tv" ? requestSearchTv : requestSearchMovie;
    if (text !== "") {
      const src = await requestSearch(text);
      if (src) setSearch(src);
    }
  };

  return (
    <Screen>
      {renderHeaderTitle()}
      {renderSearchText()}
      {renderListMovies()}
    </Screen>
  );
};
export default SearchScreen;

const _styles = StyleSheet.create({
  headerTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
    flex: 8,
    textAlign: "center",
    alignSelf: "center",
  },

  titleBar: {
    width: 40,
    height: 5,
    marginTop: 4,
    marginBottom: 12,
    alignSelf: "center",
  },

  subTitle: {
    margin: 16,
    marginTop: 5,
    fontFamily: "Montserrat-Regular",
    fontSize: 12,
    textAlign: "center",
    alignSelf: "center",
    width: "70%",
  },

  searchContainer: {
    marginHorizontal: 16,
    borderRadius: 24,
    flexDirection: "row",
  },

  searchInput: {
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    flex: 1,
    marginRight: 12,
  },
});
