import type {
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native';

import type { IconProps } from '../Icon';

export interface ErrorMessageProps extends ViewProps {
  iconStyle?: IconProps['style'];
  labelStyle?: StyleProp<TextStyle>;
  onDismiss?: () => void;
}

export interface ErrorMessageStyles {
  container?: ViewStyle;
  icon?: ImageStyle;
  label?: TextStyle;
}
