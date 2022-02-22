import React, { FC, useEffect, useState, useRef } from "react";
import { Text, View, FlatList, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Modal from "react-native-modal";
import FastImage from "react-native-fast-image";
import { BlurView } from "@react-native-community/blur";

import Screen from "../components/Screen";
import { request } from "../api/api";
import { getTvShowSeasonUrl, getImageUrl } from "../api/url";
import { Styles } from "../components/MovieDetail/Styles";
import BackIcon from "../components/Utils/BackIcon";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../helper/Theme";

interface PROPS {
  route: {
    params: {
      movieid: number;
      season: any;
      listSeason: any;
    };
  };
}

const MovieSeasonScreen: FC<PROPS> = ({ route }) => {
  const [dataSeason, setDataSeason] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [seasonNum, setSeasonNum] = useState<number>(route.params.season.season_number);
  const [scrollOffset, setScrollOffset] = useState<number>(0);

  const seasonRef = useRef<FlatList>(null);

  const { theme } = useTheme();

  useEffect(() => {
    fetchSeasonData(seasonNum);
  }, []);

  const fetchSeasonData = async (num: number) => {
    const { movieid } = route.params;
    let tempData = dataSeason;
    if (!tempData[num]) tempData[num] = await request(getTvShowSeasonUrl(movieid, num));

    if (tempData[num]) {
      setDataSeason(tempData);
      setIsLoaded(true);
      setSeasonNum(num);
    }
  };

  const seasonEpisode = (data: any) => {
    const imageUrl = getImageUrl(data.still_path, "uri", "w500");
    return (
      <View style={{ margin: 8, backgroundColor: theme.backgroundColor, overflow: "hidden", flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={[Styles.imagePlaceholder, { height: 90, width: 160 }]}>
            <FastImage source={imageUrl} style={{ height: 90, width: 160 }} />
          </View>
          <View style={{ flex: 1, padding: 12, justifyContent: "center" }}>
            <Text
              style={{ color: theme.textColor, fontFamily: "Montserrat-Regular", fontSize: 14 }}
            >{`Episode ${data.episode_number}`}</Text>
            <Text style={{ color: theme.textColor, fontFamily: "Montserrat-SemiBold", fontSize: 18 }} numberOfLines={2}>
              {data.name}
            </Text>
            <View style={{ width: 30, height: 5, backgroundColor: theme.primary, marginTop: 4 }} />
          </View>
        </View>
        <Text
          style={{
            color: theme.textColor,
            fontFamily: "Montserrat-Regular",
            fontSize: 14,
            paddingVertical: 8,
            textAlign: "justify",
          }}
          numberOfLines={4}
        >
          {data.overview}
        </Text>
      </View>
    );
  };

  const onPressSeason = (index: number) => {
    fetchSeasonData(index);
    toggleModal();
  };

  const handleOnScroll = (event: any) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const handleScrollTo = (p: number) => {
    seasonRef.current?.scrollToOffset({
      offset: p,
      animated: true,
    });
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const seasonTab = (item: string, index: number) => {
    return (
      <View style={{ margin: 8, flex: 1 }}>
        <TouchableWithoutFeedback
          onPress={() => {
            onPressSeason(index);
          }}
        >
          <Text
            style={{
              fontFamily: seasonNum === index ? "Montserrat-Bold" : "Montserrat-Regular",
              fontSize: seasonNum === index ? 24 : 16,
              color: seasonNum === index ? theme.primary : theme.backgroundColor,
              textAlign: "center",
            }}
          >
            {item}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const renderTitle = () => {
    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          <BackIcon style={{ flex: 1, paddingLeft: 12, alignSelf: "flex-start" }} />
          <Text style={[_styles.headerTitle, { color: theme.textColor }]}>Season Detail</Text>
          <View style={{ flex: 1, paddingRight: 12 }}></View>
        </View>
        <View style={[_styles.titleBar, { backgroundColor: theme.primary }]} />
      </View>
    );
  };

  const renderSeasonDropdown = () => {
    const { listSeason } = route.params;
    return (
      <View style={{ padding: 16, paddingBottom: 8 }}>
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
            <Text
              style={{
                alignSelf: "center",
                color: theme.textColor,
                fontFamily: "Montserrat-Bold",
                fontSize: 16,
              }}
            >
              {listSeason[seasonNum]}
            </Text>
            <Icon name={"chevron-down"} size={24} style={{ marginLeft: 8 }} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const renderEpisodeList = () => {
    return (
      <View style={{ backgroundColor: theme.backgroundColor, flex: 1 }}>
        {isLoaded && (
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={dataSeason[seasonNum].episodes}
            renderItem={({ item }) => seasonEpisode(item)}
            contentContainerStyle={{ margin: 8 }}
          />
        )}
      </View>
    );
  };

  const renderListSeasonModal = () => {
    const { listSeason } = route.params;
    return (
      <Modal
        isVisible={isModalVisible}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        style={{ height: "50%", margin: 0 }}
        onBackButtonPress={toggleModal}
        scrollTo={handleScrollTo}
        scrollOffset={scrollOffset}
        propagateSwipe={true}
      >
        <BlurView
          style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}
          blurType={"dark"}
          reducedTransparencyFallbackColor={theme.backgroundColor}
        />
        <View style={{ maxHeight: "50%", alignSelf: "center" }}>
          <FlatList
            ref={seasonRef}
            onScroll={handleOnScroll}
            data={listSeason}
            renderItem={({ item, index }) => seasonTab(item, index)}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item}
          />
        </View>
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              bottom: 0,
              marginBottom: 64,
              padding: 8,
              backgroundColor: theme.primary,
              borderRadius: 8,
            }}
          >
            <Icon name={"close"} size={32} color={theme.backgroundColor} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <Screen>
      {renderTitle()}
      {renderSeasonDropdown()}
      {renderEpisodeList()}
      {renderListSeasonModal()}
    </Screen>
  );
};

export default MovieSeasonScreen;

const _styles = StyleSheet.create({
  headerTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
    flex: 8,
    textAlign: "center",
    alignSelf: "center",
  },

  titleBar: {
    width: 40,
    height: 5,
    marginTop: 4,
    alignSelf: "center",
  },
});
