import React, { FC } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { navigationRef } from "../../helper/Types";
import { useTheme } from "../../helper/Theme";

interface Props {
  style: object;
  color?: string;
}

const BackIcon: FC<Props> = ({ style, color = "" }) => {
  const { theme } = useTheme();

  return (
    <View style={style}>
      <Icon
        color={color ? color : theme.textColor}
        name="md-chevron-back"
        size={32}
        onPress={() => navigationRef.current?.goBack()}
      />
    </View>
  );
};

export default BackIcon;
