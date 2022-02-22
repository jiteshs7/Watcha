import React, { FC } from "react";
import { StatusBar, View, SafeAreaView, Platform, StyleSheet } from "react-native";

import { getStatusBarHeight } from "react-native-status-bar-height";
import { useTheme } from "../helper/Theme";

const Container: FC = ({ children }) => {
  const { theme } = useTheme();
  if (Platform.OS === "ios") {
    return <View style={[_styles.container, { backgroundColor: theme.backgroundColor }]}>{children}</View>;
  } else {
    return <SafeAreaView style={[_styles.container, { backgroundColor: theme.backgroundColor }]}>{children}</SafeAreaView>;
  }
};

const Screen: FC = ({ children }) => {
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <Container>
        <StatusBar barStyle="dark-content" translucent />
        {children}
      </Container>
    </View>
  );
};

export default Screen;

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? getStatusBarHeight() : StatusBar.currentHeight,
  },
});
