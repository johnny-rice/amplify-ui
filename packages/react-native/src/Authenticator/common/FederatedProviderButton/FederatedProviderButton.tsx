import React from 'react';

import { Button, Icon, Label } from '../../../primitives';
import { usePressableContainerStyles } from '../../../hooks';

import type { FederatedProviderButtonProps } from './types';

export default function FederatedProviderButton({
  children,
  source,
  style,
  textStyle,
  ...rest
}: FederatedProviderButtonProps): React.JSX.Element {
  const pressableStyle = usePressableContainerStyles({
    overrideStyle: style,
  });

  return (
    <Button {...rest} style={pressableStyle}>
      <Icon source={source} size={20} />
      <Label style={textStyle}>{children}</Label>
    </Button>
  );
}
