import React, { FC } from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../helper/Theme";

interface Props {
  title: string;
}

const MovieTitle: FC<Props> = ({ title }) => {
  const { theme } = useTheme();

  return (
    <View>
      <Text style={{ fontFamily: "Montserrat-Bold", fontSize: 24, color: theme.backgroundColor }}>{title}</Text>
      <View style={{ width: 30, height: 5, backgroundColor: theme.backgroundColor, marginTop: 4, marginBottom: 8 }} />
    </View>
  );
};

export default MovieTitle;
