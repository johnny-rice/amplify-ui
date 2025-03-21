import React from 'react';
import { Button, Text } from 'react-native';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

import { initializeInAppMessaging } from 'aws-amplify/in-app-messaging';

import { Amplify } from 'aws-amplify';
import {
  Authenticator,
  useAuthenticator,
  InAppMessageDisplay,
  InAppMessagingProvider,
} from '@aws-amplify/ui-react-native';

import awsExports from './aws-exports';

Amplify.configure(awsExports);
initializeInAppMessaging();

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button title="Sign Out" onPress={signOut} />;
}

function App(): React.JSX.Element {
  return (
    <>
      <Authenticator.Provider>
        <Authenticator>
          <SignOutButton />
        </Authenticator>
      </Authenticator.Provider>
      <InAppMessagingProvider>
        <InAppMessageDisplay />
        <Text>In-App Messaging Example</Text>
      </InAppMessagingProvider>
    </>
  );
}

export default App;
