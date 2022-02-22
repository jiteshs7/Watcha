import React, { FC, useState } from "react";
import FastImage from "react-native-fast-image";
import { View, Text, FlatList, Modal, TouchableWithoutFeedback } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

import { getImageUrl } from "../../api/url";
import { Styles } from "./Styles";
import { useTheme } from "../../helper/Theme";

interface Props {
  images: {
    backdrops: ReadonlyArray<any>;
  };
}

const MovieImages: FC<Props> = ({ images = {} }) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [imageModalIndex, setImageModalIndex] = useState<number>(0);

  const { theme } = useTheme();

  const onPressImage = (index: number = 0) => {
    setIsShowModal(!isShowModal);
    setImageModalIndex(index);
  };

  const modalImage = () => {
    const imageFull: any[] = modalImagesUrl();

    return (
      <Modal visible={isShowModal} transparent={true}>
        <ImageViewer imageUrls={imageFull} onCancel={onPressImage} enableSwipeDown index={imageModalIndex} />
      </Modal>
    );
  };

  const modalImagesUrl = () => {
    if (!images.backdrops) return [];
    let imageFull = [];
    imageFull = images?.backdrops.map((item: any) => {
      const imageurl = getImageUrl(item.file_path, "url", "original");
      return { ...imageurl, ...{ width: item.width, height: item.height } };
    });
    return imageFull;
  };

  if (Object.keys(images).length === 0 || !images.backdrops || images.backdrops.length === 0) return null;

  return (
    <View>
      <Text style={[Styles.titleText, { color: theme.textColor }]}>Images</Text>
      <FlatList
        keyExtractor={(item) => item.file_path}
        data={images.backdrops}
        renderItem={({ item, index }) => <ImageComponent onPress={() => onPressImage(index)} data={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      {modalImage()}
    </View>
  );
};

interface ImageProps {
  data: any;
  onPress: () => void;
}

const ImageComponent: FC<ImageProps> = ({ data, onPress }) => {
  const imageUrl = getImageUrl(data?.file_path, "uri", "w300");
  const style = { ...Styles.movieImages, ...{ width: 100 * data.aspect_ratio } };

  return (
    <TouchableWithoutFeedback onPress={onPress} style={[style, Styles.imagePlaceholder]}>
      <FastImage source={imageUrl} style={style} />
    </TouchableWithoutFeedback>
  );
};

export default MovieImages;
