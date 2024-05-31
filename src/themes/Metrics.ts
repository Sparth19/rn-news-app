import {Dimensions, Platform, StatusBar, PixelRatio} from 'react-native';

// Retrieve device dimensions
const {width, height} = Dimensions.get('window');

// Calculate device height considering the presence of status bar or iPhone X notch
const calculateDeviceHeight = (): number => {
  const standardLength = Math.max(width, height);
  const offset =
    Platform.OS === 'ios'
      ? height > width
        ? 78
        : 0
      : StatusBar.currentHeight || 0;
  return standardLength - offset;
};

// Check if the device is an iPhone with a notch
const isIphoneNotch = (): boolean =>
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTV &&
  ([780, 812, 844, 852, 896, 926, 932].includes(height) ||
    [780, 812, 844, 852, 896, 926, 932].includes(width));

// Check if the device is a tablet
const isTablet = (): boolean => {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = width * pixelDensity;
  const adjustedHeight = height * pixelDensity;
  return (
    (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) ||
    (pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920))
  );
};

// Calculate responsive font size
export const size = (fontSize: number, standardScreenHeight = 812): number => {
  const baseScreenWidth = 375;
  const wid = Math.min(width, height);
  const deviceHeight = calculateDeviceHeight();
  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
  return Platform.isPad || isTablet() || width > 500
    ? Number(heightPercent.toFixed(2))
    : wid / (baseScreenWidth / fontSize);
};

// Export optimized metrics object
const Metrics = {
  width: Math.min(width, height),
  height: Math.max(width, height),
  rfv: size,
  isIphoneNotch: isIphoneNotch(),
  isTablet: isTablet(),
};

export default Metrics;
