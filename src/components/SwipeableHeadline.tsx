import React, {memo, useRef} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {Headline} from '../types/interfaces';
import moment from 'moment';
import {size} from '../themes/Metrics';
import {Colors, FONTS, FONT_SIZE} from '../themes/AppTheme';
import FastImage from 'react-native-fast-image';
import {getImage} from '../utils/newsUtils';
import {Swipeable} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

interface SwipeableHeadlineProps {
  headline: Headline;
  index: string;
  isPinned: boolean;
  pinnedLength: number;
  onDelete: (headline: Headline) => void;
  onPin: (headline: Headline, isPinned: boolean) => void;
}

const SwipeableHeadline = memo((props: SwipeableHeadlineProps) => {
  const {headline, index, onDelete, onPin, isPinned, pinnedLength} = props;
  const swipeableRef = useRef(null);
  const swipeTranslation = React.useRef(new Animated.Value(0)).current;

  const {theme} = useSelector((state: RootState) => state.theme);
  const themeStyles = theme === 'light' ? lightStyles : darkStyles;

  const handleSwipeOpen = () => {
    Animated.spring(swipeTranslation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const handlePin = () => {
    onPin(headline, isPinned);
    handleSwipeOpen();
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };

  const handleDelete = () => {
    onDelete(headline);
    handleSwipeOpen();
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };

  const renderRightActions = () => (
    <View style={styles.deleteButton}>
      <Text style={styles.buttonText}>Delete</Text>
    </View>
  );

  const renderLeftActions = () => (
    <View style={styles.pinButton}>
      <Text style={styles.buttonText}>{isPinned ? 'Unpin' : 'Pin'}</Text>
    </View>
  );

  if (isPinned && parseInt(index) > pinnedLength - 1) return null;

  return (
    <Swipeable
      ref={swipeableRef}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      overshootRight={false}
      overshootLeft={false}
      onSwipeableOpen={direction => {
        if (direction === 'left') handlePin();
        else handleDelete();
      }}>
      <Animated.View
        style={[
          themeStyles.headlineContainer,
          styles.headlineContainer,
          {transform: [{translateX: swipeTranslation}]},
        ]}
        key={index}>
        <FastImage
          source={{uri: headline.urlToImage}}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.rightView}>
          <View style={styles.rowBetween}>
            <Text
              style={[themeStyles.secText, styles.secText]}
              numberOfLines={2}>
              {headline.author || 'Author'}
            </Text>
            {isPinned ? (
              <IconMaterial
                name={'bookmark'}
                size={size(20)}
                color={Colors.greyTheme3}
              />
            ) : null}
          </View>
          <Text style={[themeStyles.title, styles.title]} numberOfLines={2}>
            {headline.title}
          </Text>
          <View style={styles.rowBetween}>
            <View style={styles.centerRow}>
              {headline.source.id ? (
                <FastImage
                  source={getImage(headline.source.id || '')}
                  style={styles.logo}
                  resizeMode="cover"
                />
              ) : null}
              <Text
                style={[themeStyles.secText, styles.sourceText]}
                numberOfLines={2}>
                {headline.source.name || 'source'}
              </Text>
            </View>
            <Text style={[themeStyles.secText, styles.secText]}>{`${moment(
              headline.publishedAt,
            )
              .startOf('day')
              .fromNow()}`}</Text>
          </View>
        </View>
      </Animated.View>
    </Swipeable>
  );
});

export default SwipeableHeadline;

const lightStyles = {
  headlineContainer: {
    backgroundColor: Colors.white,
    borderBottomColor: Colors.greyTheme4,
  },
  title: {color: Colors.black},
  secText: {color: Colors.greyTheme1},
};

const darkStyles = {
  headlineContainer: {
    backgroundColor: Colors.black,
    borderBottomColor: Colors.greyTheme1,
  },
  title: {color: Colors.darkText2},
  secText: {color: Colors.darkText},
};

const styles = StyleSheet.create({
  headlineContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: size(10),
    borderBottomWidth: size(0.5),
  },
  title: {
    fontSize: FONT_SIZE.small_medium,
    fontFamily: FONTS.Poppins400,
    marginVertical: size(5),
  },
  secText: {
    fontSize: FONT_SIZE.small,
    fontFamily: FONTS.Poppins400,
  },
  sourceText: {
    fontSize: FONT_SIZE.small,
    fontFamily: FONTS.Poppins600,
  },
  image: {
    height: size(100),
    width: size(100),
    borderRadius: size(10),
    backgroundColor: Colors.greyTheme4,
  },
  logo: {
    height: size(20),
    width: size(20),
    borderRadius: size(10),
    marginRight: size(5),
  },
  centerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rightView: {
    flex: 1,
    marginLeft: size(10),
  },
  deleteButton: {
    backgroundColor: Colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  pinButton: {
    backgroundColor: Colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
  buttonText: {
    fontFamily: FONTS.Poppins600,
    fontSize: FONT_SIZE.small_medium,
    color: Colors.white,
  },
});
