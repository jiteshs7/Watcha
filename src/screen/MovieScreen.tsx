import React, { FC, useEffect, useState } from "react";

import HomeComponent from "../components/Home/HomeComponent";
import { requestMovieScreen as RequestMovieApi } from "../api/api";
import { MovieTypes } from "../helper/Types";
import { StackScreenProps } from "@react-navigation/stack";

interface Props {
  navigation: StackScreenProps<any, any>;
}

const MovieScreen: FC<Props> = ({ navigation }) => {
  const [moviesData, setMoviesData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    requestMovieScreen();
  }, []);

  const requestMovieScreen = async () => {
    if (!isLoading) setIsLoading(true);
    await RequestMovieApi((data: any) => setMoviesData(data));
    setIsLoading(false);
  };

  return (
    <HomeComponent
      type="movie"
      subTitle={MovieTypes}
      navigation={navigation}
      data={moviesData}
      onRefresh={requestMovieScreen}
      loader={isLoading}
    />
  );
};

export default MovieScreen;
