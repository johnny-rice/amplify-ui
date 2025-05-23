import React from 'react';
import type { AIConversationInput } from '../types';

export const FallbackComponentContext = React.createContext<
  AIConversationInput['FallbackResponseComponent'] | undefined
>(undefined);

export const FallbackComponentProvider = ({
  children,
  FallbackComponent,
}: {
  children?: React.ReactNode;
  FallbackComponent?: AIConversationInput['FallbackResponseComponent'];
}): React.JSX.Element => {
  return (
    <FallbackComponentContext.Provider value={FallbackComponent}>
      {children}
    </FallbackComponentContext.Provider>
  );
};
