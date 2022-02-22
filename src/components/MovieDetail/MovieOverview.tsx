import React, { FC, useState } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";

import { Styles } from "./Styles";
import { useTheme } from "../../helper/Theme";

interface Props {
  overview: string | null;
}

const MovieOverview: FC<Props> = ({ overview = null }) => {
  const [textShown, setTextShown] = useState(false);
  const { theme } = useTheme();
  if (!overview) return null;

  return (
    <View>
      <Text style={[Styles.titleText, { color: theme.textColor }]}>Overview</Text>
      <TouchableWithoutFeedback onPress={() => setTextShown(!textShown)}>
        <Text numberOfLines={textShown ? 0 : 3} style={[Styles.textOverview, { color: theme.textColor }]}>
          {overview}
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default MovieOverview;
