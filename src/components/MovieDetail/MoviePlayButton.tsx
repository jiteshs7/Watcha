import React, { FC, useState } from "react";
import Modal from "react-native-modal";
import { View, StyleSheet, TouchableWithoutFeedback, Text } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";

import { navigationRef } from "../../helper/Types";
import { useTheme } from "../../helper/Theme";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

interface Props {
  videoData: any;
}

const MoviePlayButton: FC<Props> = ({ videoData = {} }) => {
  const [isModalShown, setIsModalShown] = useState(false);

  const { theme } = useTheme();

  const scaleAnim = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleAnim.value }],
    };
  });

  const handlePressIn = () => {
    scaleAnim.value = withSpring(1.2);
  };
  const handlePressOut = () => {
    scaleAnim.value = withSpring(1);
  };

  const toggleModal = () => {
    scaleAnim.value = withSpring(1);
    setIsModalShown(!isModalShown);
  };

  const renderPlayButton = () => {
    return (
      <TouchableWithoutFeedback
        style={{ padding: "5%" }}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={toggleModal}
      >
        <Animated.View style={[_styles.wrapper, animStyle, { backgroundColor: theme.primary }]}>
          <Icon name="play" size={20} color={theme.backgroundColor} style={_styles.icon} />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  const onPressPlay = (key: string) => {
    toggleModal();
    navigationRef.current?.navigate("Webview", { id: key });
  };

  const videoItem = () => {
    const results = videoData.results.slice(0, 7);
    return results.map((item: any) => (
      <View key={item.key} style={{ marginBottom: 8, flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ width: "80%" }}>
          <Text style={{ fontFamily: "Montserrat-Regular", fontSize: 14 }}>{item.name}</Text>
          <Text style={{ fontFamily: "Montserrat-Light", fontSize: 12 }}>{item.type}</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => onPressPlay(item.key)}>
          <View style={{ alignSelf: "flex-start", borderRadius: 6, overflow: "hidden" }}>
            <Text style={[_styles.playText, { backgroundColor: theme.primary, color: theme.backgroundColor }]}>Play</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    ));
  };

  const renderModal = () => {
    const { results = [] } = videoData;

    if (isModalShown && results.length !== 0) {
      return (
        <Modal
          isVisible={isModalShown}
          style={{ justifyContent: "flex-end", margin: 0 }}
          swipeDirection={"down"}
          onBackButtonPress={toggleModal}
          onBackdropPress={toggleModal}
          onSwipeComplete={toggleModal}
        >
          <View style={[_styles.modalStyle, { backgroundColor: theme.backgroundColor }]}>
            <View style={[_styles.bar, { backgroundColor: theme.primary }]} />
            <Text style={_styles.videoText}>Videos</Text>
            {videoItem()}
          </View>
        </Modal>
      );
    }
  };

  return (
    <>
      {renderPlayButton()}
      {renderModal()}
    </>
  );
};

export default MoviePlayButton;

const _styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    right: 0,
    top: -30,
    marginRight: 32,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
  },

  icon: {
    alignSelf: "center",
  },

  modalStyle: {
    paddingHorizontal: 24,
    paddingTop: 0,
    paddingBottom: 48,
    minHeight: "40%",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },

  bar: {
    width: 40,
    height: 5,
    marginBottom: 24,
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 8,
  },

  playText: {
    fontFamily: "Montserrat-SemiBold",
    textAlign: "right",
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 14,
  },

  videoText: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 18,
    paddingBottom: 12,
  },
});
