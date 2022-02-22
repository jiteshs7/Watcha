import React, { FC } from "react";
import PropTypes from "prop-types";
import { FlatList, View, Text } from "react-native";
import FastImage from "react-native-fast-image";

import { getImageUrl } from "../../api/url";
import { Styles } from "./Styles";
import { useTheme } from "../../helper/Theme";

interface Props {
  credit: any;
}

const MovieCast: FC<Props> = ({ credit }) => {
  let cast = credit.cast.sort((a: { order: number }, b: { order: number }) => (a.order > b.order ? 1 : -1));
  cast = credit.cast.slice(0, 10);

  const { theme } = useTheme();

  if (cast.length === 0) return null;

  return (
    <View>
      <Text style={[Styles.titleText, { color: theme.textColor }]}>Cast</Text>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={cast}
        renderItem={({ item }) => <Cast cast={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

interface CasrProps {
  cast: {
    profile_path: string;
    name: string;
  };
}

const Cast: FC<CasrProps> = ({ cast }) => {
  const imageUrl = getImageUrl(cast.profile_path, "uri", "w185");

  const { theme } = useTheme();

  return (
    <View>
      <View style={Styles.castImageContainer}>
        <FastImage source={imageUrl} style={Styles.castImage} resizeMode={"cover"} />
      </View>
      <Text style={[Styles.bottomText, { color: theme.textColor }]} numberOfLines={2}>
        {cast.name}
      </Text>
    </View>
  );
};

export default MovieCast;

MovieCast.propTypes = {
  credit: PropTypes.object,
};
