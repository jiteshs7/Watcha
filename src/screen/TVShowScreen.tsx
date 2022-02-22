import React, { FC, useEffect, useState } from "react";
import PropTypes from "prop-types";

import HomeComponent from "../components/Home/HomeComponent";
import { requestTVShowScreen as requestTVShowAPI } from "../api/api";
import { TVShowTypes } from "../helper/Types";

interface PROPS {
  navigation: any;
}

const TVShowScreen: FC<PROPS> = ({ navigation }) => {
  const [moviesData, setMoviesData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    requestMovieScreen();
  }, []);

  const requestMovieScreen = async () => {
    if (!isLoading) setIsLoading(true);
    await requestTVShowAPI((data: any) => setMoviesData(data));
    setIsLoading(false);
  };

  return (
    <HomeComponent
      type="tv"
      subTitle={TVShowTypes}
      navigation={navigation}
      data={moviesData}
      onRefresh={requestMovieScreen}
      loader={isLoading}
    />
  );
};

export default TVShowScreen;

TVShowScreen.propTypes = {
  navigation: PropTypes.object,
};
