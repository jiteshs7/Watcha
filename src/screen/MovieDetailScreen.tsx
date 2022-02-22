import React, { FC, useEffect, useState } from "react";
import { View, StatusBar, ScrollView, StyleSheet } from "react-native";

import { requestMovieDetailScreen } from "../api/api";
import { useTheme } from "../helper/Theme";

import MovieBackdrop from "../components/MovieDetail/MovieBackdrop";
import MovieOverview from "../components/MovieDetail/MovieOverview";
import MovieImages from "../components/MovieDetail/MovieImages";
import MovieCast from "../components/MovieDetail/MovieCast";
import MovieRecommendations from "../components/MovieDetail/MovieRecommendations";
import MovieGenres from "../components/MovieDetail/MovieGenres";
import MovieRating from "../components/MovieDetail/MovieRating";
import MoviePlayButton from "../components/MovieDetail/MoviePlayButton";
import MovieTitle from "../components/MovieDetail/MovieTitle";
import BackIcon from "../components/Utils/BackIcon";

interface Props {
  route: {
    params: {
      id: number;
    };
  };
}

const MovieDetailScreen: FC<Props> = ({ route }) => {
  const { theme } = useTheme();

  const [movieData, setMovieData] = useState<any>({});
  const [credit, setCredit] = useState<any>({});
  const [images, setImages] = useState<any>({});
  const [videos, setVideos] = useState<any>({});
  const [recommendations, setRecommendations] = useState<any>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    requestInfoDetail();
  }, []);

  const requestInfoDetail = async () => {
    await requestMovieDetailScreen(route.params.id, callbackRequest);
  };

  const callbackRequest = (response = []) => {
    const [movieData, credit, images, videos, recommendations] = response;

    setMovieData(movieData);
    setCredit(credit);
    setImages(images);
    setVideos(videos);
    setRecommendations(recommendations);
    setIsLoaded(true);
  };

  const movieInfoGeneral = () => {
    return (
      <MovieBackdrop backdrop={movieData.backdrop_path}>
        {isLoaded && (
          <View>
            <MovieTitle title={movieData.title} />
            <MovieRating rating={movieData.vote_average} textClr={theme.backgroundColor} />
          </View>
        )}
      </MovieBackdrop>
    );
  };

  const movieInfoDetail = () => {
    return (
      <View style={{ flex: 1, backgroundColor: theme.textColor }}>
        <View style={[Styles.movieDetail, { backgroundColor: theme.backgroundColor }]}>
          {isLoaded && (
            <View>
              <MovieGenres genre={movieData.genres} />
              <MovieOverview overview={movieData.overview} />
              <MovieCast credit={credit} />
              <MovieImages images={images} />
              <MovieRecommendations recommendations={recommendations} />
            </View>
          )}
        </View>
        <MoviePlayButton videoData={videos} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <ScrollView
        style={[Styles.scrollview, { backgroundColor: theme.backgroundColor }]}
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
      >
        <StatusBar translucent backgroundColor={"transparent"} />
        {movieInfoGeneral()}
        {movieInfoDetail()}
      </ScrollView>
      <BackIcon style={{ marginLeft: 5, position: "absolute", top: 40 }} color={theme.backgroundColor} />
    </View>
  );
};

export default MovieDetailScreen;

const Styles = StyleSheet.create({
  scrollview: {
    flexGrow: 1,
  },

  movieDetail: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});
