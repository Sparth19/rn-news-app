import React, {FC, useLayoutEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  Share,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {Colors, FONTS, FONT_SIZE} from '../../themes/AppTheme';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import Metrics, {size} from '../../themes/Metrics';
import FastImage from 'react-native-fast-image';
import {getImage} from '../../utils/newsUtils';
import moment from 'moment';
import {pinHeadline, unpinHeadline} from '../../redux/reducers/headlineSlice';
import {Headline} from '../../types/interfaces';

interface Props {
  navigation: any;
  route: {params: {headline: Headline}};
}

const NewsDetailScreen: FC<Props> = ({navigation, route}) => {
  const {headline} = route.params;
  const dispatch = useDispatch<AppDispatch>();

  const {theme} = useSelector((state: RootState) => state.theme);
  const {pinnedHeadlines} = useSelector((state: RootState) => state.headlines);

  const isPinned = !!pinnedHeadlines.find(pin => pin.id === headline.id);
  const themeStyles = theme === 'light' ? lightStyles : darkStyles;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerStyle: themeStyles.container,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconMaterial
            name={'arrow-back-ios'}
            size={size(20)}
            color={theme === 'light' ? Colors.greyTheme1 : Colors.white}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => handleShare()}>
          <IconMaterial
            name={'share'}
            size={size(20)}
            color={theme === 'light' ? Colors.greyTheme1 : Colors.white}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, theme]);

  const handleShare = () => {
    Share.share({
      message:
        'Check out this news headline: ' +
        headline.title +
        '\n\n' +
        headline.url,
    })
      .then(() => {})
      .catch(() => {});
  };

  const handlePinHeadline = (headline: Headline) => {
    if (isPinned) {
      dispatch(unpinHeadline(headline)); //unpin
    } else {
      dispatch(pinHeadline(headline)); //pin
    }
  };

  return (
    <SafeAreaView style={[themeStyles.container, styles.screen]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <>
          <View style={styles.topView}>
            <View style={styles.centerView}>
              <FastImage
                source={getImage(headline.source.id || '')}
                style={styles.logo}
                resizeMode="cover"
              />
              <View style={styles.mH10}>
                <Text
                  style={[themeStyles.secText, styles.sourceText]}
                  numberOfLines={2}>
                  {headline.source.name || 'source'}
                </Text>
                <Text style={[themeStyles.secText, styles.secText]}>{`${moment(
                  headline.publishedAt,
                )
                  .startOf('day')
                  .fromNow()}`}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => handlePinHeadline(headline)}>
              <IconMaterial
                name={isPinned ? 'bookmark' : 'bookmark-outline'}
                size={size(25)}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.mH10}>
            <FastImage
              source={{uri: headline.urlToImage}}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={[themeStyles.title, styles.title]} numberOfLines={2}>
              {headline.title}
            </Text>
            <Text style={[themeStyles.secText, styles.secText]}>
              {headline.description}
            </Text>
            <Text style={[themeStyles.secText, styles.authorText]}>
              {`Author : ${headline.author}`}
            </Text>
          </View>
        </>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsDetailScreen;

const lightStyles = StyleSheet.create({
  container: {backgroundColor: Colors.white},
  headlineContainer: {
    backgroundColor: Colors.white,
    borderBottomColor: Colors.greyTheme4,
  },
  title: {color: Colors.black},
  secText: {color: Colors.greyTheme1},
});

const darkStyles = StyleSheet.create({
  container: {backgroundColor: Colors.black},
  headlineContainer: {
    backgroundColor: Colors.black,
    borderBottomColor: Colors.greyTheme1,
  },
  title: {color: Colors.darkText2},
  secText: {color: Colors.darkText},
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerIcon: {
    marginHorizontal: size(15),
  },
  secText: {
    fontSize: FONT_SIZE.small,
    fontFamily: FONTS.Poppins400,
  },
  mH10: {
    marginHorizontal: size(10),
  },
  authorText: {
    fontSize: FONT_SIZE.small,
    fontFamily: FONTS.Poppins500,
    marginVertical: size(15),
  },
  centerView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: size(10),
  },
  sourceText: {
    fontSize: FONT_SIZE.small_medium,
    fontFamily: FONTS.Poppins600,
  },
  title: {
    fontSize: FONT_SIZE.medium,
    fontFamily: FONTS.Poppins500,
    marginVertical: size(10),
  },
  image: {
    height: size(220),
    width: Metrics.width - size(20),
    marginTop: size(0),
    borderRadius: size(10),
    backgroundColor: Colors.greyTheme4,
    borderWidth: size(0.2),
    borderColor: Colors.greyTheme4,
  },
  logo: {
    height: size(40),
    width: size(40),
    borderRadius: size(20),
    backgroundColor: Colors.greyTheme4,
    borderWidth: size(0.5),
    borderColor: Colors.greyTheme4,
  },
});
