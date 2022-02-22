import { DrawerNavigationProp } from "@react-navigation/drawer";
import React, { FC } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useTheme } from "../../helper/Theme";
interface Props {
  navigation: any;
  type: "tv" | "movie";
}

const HomeHeader: FC<Props> = ({ navigation, type }) => {
  const { theme } = useTheme();

  return (
    <View style={{ margin: 16, flexDirection: "row", justifyContent: "space-between" }}>
      <Icon name="align-left" size={25} onPress={() => navigation.toggleDrawer()} color={theme.textColor} />
      <Icon name="search" size={20} onPress={() => navigation.navigate("Search", { type: type })} color={theme.textColor} />
    </View>
  );
};

export default HomeHeader;
