import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../helper/Theme";

type GenreProp = {
  id: number;
  name: string;
};

interface Props {
  genre: ReadonlyArray<GenreProp>;
}

const MovieGenres: FC<Props> = ({ genre = [] }) => {
  const { theme } = useTheme();

  let component = genre.map((item: GenreProp, index: number) => {
    return (
      <View key={index.toString()} style={[_styles.view, { borderColor: theme.darkBlue }]}>
        <Text style={[_styles.text, { color: theme.darkBlue }]}>{item.name}</Text>
      </View>
    );
  });

  return <View style={_styles.container}>{component}</View>;
};

export default MovieGenres;

const _styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "70%",
  },

  view: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 0.75,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },

  text: {
    fontFamily: "Montserrat-Light",
    fontSize: 12,
  },
});
