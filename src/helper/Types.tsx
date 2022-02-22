import React from "react";
import type { NavigationContainerRef } from "@react-navigation/native";

import {
  getPopularMoviesUrl,
  getTopRatedMoviesUrl,
  getMustWatchMoviesUrl,
  getUpcomingMoviesUrl,
  getPopularTVShowUrl,
  getTopRatedTVShowUrl,
  getMustWatchTVShowUrl,
  getOnTheAirTVShowUrl,
} from "../api/url";
import { request } from "../api/api";

export const MovieTypes = ["Popular", "Top Rated", "Must Watch", "Upcoming"];
export const TVShowTypes = ["Popular", "Top Rated", "Must Watch", "On The Air"];

export const fetchFunctionListScreen = (type: "tv" | "movie", title: string) => {
  if (type === "tv") {
    return tvGet(title);
  } else {
    return movieGet(title);
  }
};

const movieGet = (title: string) => {
  switch (title) {
    case "Popular":
      return (page: number) => request(getPopularMoviesUrl(page));
    case "Top Rated":
      return (page: number) => request(getTopRatedMoviesUrl(page));
    case "Must Watch":
      return (page: number) => request(getMustWatchMoviesUrl(page));
    case "Upcoming":
      return (page: number) => request(getUpcomingMoviesUrl(page));
  }
};

const tvGet = (title: string) => {
  switch (title) {
    case "Popular":
      return (page: number) => request(getPopularTVShowUrl(page));
    case "Top Rated":
      return (page: number) => request(getTopRatedTVShowUrl(page));
    case "Must Watch":
      return (page: number) => request(getMustWatchTVShowUrl(page));
    case "On The Air":
      return (page: number) => request(getOnTheAirTVShowUrl(page));
  }
};

export const navigationRef = React.createRef<NavigationContainerRef>();
