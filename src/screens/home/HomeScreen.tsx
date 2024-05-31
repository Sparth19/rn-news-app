import React, {
  FC,
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect,
} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
// import SplashScreen from 'react-native-splash-screen';
import {Colors, FONTS, FONT_SIZE} from '../../themes/AppTheme';
import {size} from '../../themes/Metrics';
import {Headline} from '../../types/interfaces';
import SwipeableHeadline from '../../components/SwipeableHeadline';
import SvgIcon from '../../components/SvgIcon';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {
  fetchHeadlines,
  loadNextBatch,
} from '../../redux/actions/headlineAction';
import {
  deleteHeadline,
  pinHeadline,
  unpinHeadline,
} from '../../redux/reducers/headlineSlice';
import {loadTheme, setTheme} from '../../redux/actions/themeAction';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconFontisto from 'react-native-vector-icons/Fontisto';

const HomeScreen: FC = ({navigation}) => {
  const dispatch = useDispatch<AppDispatch>();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const {headlines, pinnedHeadlines, loading, error} = useSelector(
    (state: RootState) => state.headlines,
  );
  const {theme} = useSelector((state: RootState) => state.theme);
  const themeStyles = theme === 'light' ? lightStyles : darkStyles;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerStyle: themeStyles.container,
      headerLeft: () => <Text style={styles.headerTitle}>Latest News</Text>,
      headerRight: () => renderHeaderRight(),
    });
  }, [navigation, theme]);

  useEffect(() => {
    dispatch(fetchHeadlines());
    dispatch(loadTheme());
  }, [dispatch]);

  useEffect(() => {
    // startTimer();
    return () => stopTimer(); // Cleanup on unmount
  }, [headlines]);

  const startTimer = () => {
    stopTimer(); // Ensure no duplicate timers
    timerRef.current = setInterval(() => {
      dispatch(loadNextBatch());
    }, 10000);
  };

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleFetchNextBatch = useCallback(() => {
    stopTimer();
    dispatch(loadNextBatch()).then(() => startTimer());
  }, [dispatch, startTimer, stopTimer]);

  const handlePinHeadline = (headline: Headline, isPinned: boolean) => {
    if (isPinned) {
      dispatch(unpinHeadline(headline)); //unpin
    } else {
      dispatch(pinHeadline(headline)); //pin
    }
  };

  const handleDeleteHeadline = (headline: Headline) => {
    dispatch(deleteHeadline(headline));
  };

  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
  };

  const renderHeaderRight = () => {
    return (
      <View style={styles.rowCenter}>
        <TouchableOpacity onPress={handleFetchNextBatch}>
          <IconFontisto
            name={'spinner-refresh'}
            size={size(18)}
            color={theme === 'light' ? Colors.greyTheme1 : Colors.white}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToggleTheme}>
          <IconMaterial
            name={theme === 'light' ? 'dark-mode' : 'light-mode'}
            size={size(22)}
            color={theme === 'light' ? Colors.greyTheme1 : Colors.warning}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({item, index}: {item: Headline; index: string}) => (
    <SwipeableHeadline
      headline={item}
      index={index}
      onDelete={handleDeleteHeadline}
      onPin={handlePinHeadline}
      isPinned={!!(pinnedHeadlines.findIndex(pin => pin.id === item.id) > -1)}
      pinnedLength={pinnedHeadlines.length}
    />
  );

  if (loading) {
    return (
      <View style={[themeStyles.container, styles.container]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[themeStyles.container, styles.container]}>
        <Text style={[themeStyles.errorText, styles.errorText]}>{error}</Text>
        <TouchableOpacity onPress={handleFetchNextBatch}>
          <Text style={styles.headerTitle}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={[themeStyles.container, styles.screen]}>
      <StatusBar
        backgroundColor={themeStyles.container.backgroundColor}
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
        animated
      />
      {pinnedHeadlines.length || headlines.length ? (
        <FlatList
          nestedScrollEnabled
          data={[...pinnedHeadlines, ...headlines]}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
      ) : (
        <View style={[themeStyles.container, styles.container]}>
          <Text style={[themeStyles.errorText, styles.errorText]}>
            News list is Empty!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const lightStyles = {
  container: {backgroundColor: Colors.white},
  errorText: {color: Colors.error},
};

const darkStyles = {
  container: {backgroundColor: Colors.black},
  errorText: {color: Colors.white},
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: FONTS.Poppins600,
    fontSize: FONT_SIZE.medium,
    color: Colors.primary,
    marginHorizontal: size(20),
    letterSpacing: 0.2,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontFamily: FONTS.Poppins500,
    fontSize: FONT_SIZE.medium,
    marginBottom: size(15),
  },
  headerIcon: {
    marginHorizontal: size(10),
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
