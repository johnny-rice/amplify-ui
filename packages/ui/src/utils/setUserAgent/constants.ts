import type {
  AuthUserAgentInput,
  GeoUserAgentInput,
  InAppMessagingUserAgentInput,
  StorageUserAgentInput,
  AiUserAgentInput,
} from '@aws-amplify/core/internals/utils';
import {
  AuthAction,
  GeoAction,
  InAppMessagingAction,
  StorageAction,
  Category,
  AiAction,
} from '@aws-amplify/core/internals/utils';

export const AI_INPUT_BASE: Omit<AiUserAgentInput, 'additionalDetails'> = {
  category: Category.AI,
  apis: [
    AiAction.CreateConversation,
    AiAction.DeleteConversation,
    AiAction.ListConversations,
    AiAction.UpdateConversation,
    AiAction.OnMessage,
    AiAction.SendMessage,
    AiAction.Generation,
  ],
};

export const ACCOUNT_SETTINGS_INPUT_BASE: Omit<
  AuthUserAgentInput,
  'additionalDetails'
> = {
  apis: [AuthAction.DeleteUser, AuthAction.UpdatePassword],
  category: Category.Auth,
};

export const AUTHENTICATOR_INPUT_BASE: Omit<
  AuthUserAgentInput,
  'additionalDetails'
> = {
  apis: [
    AuthAction.SignUp,
    AuthAction.ConfirmSignUp,
    AuthAction.ResendSignUpCode,
    AuthAction.SignIn,
    AuthAction.ConfirmSignIn,
    AuthAction.FetchUserAttributes,
    AuthAction.SignOut,
    AuthAction.ResetPassword,
    AuthAction.ConfirmResetPassword,
    AuthAction.SignInWithRedirect,
  ],
  category: Category.Auth,
};

export const FILE_UPLOADER_BASE_INPUT: Omit<
  StorageUserAgentInput,
  'additionalDetails'
> = {
  apis: [StorageAction.UploadData],
  category: Category.Storage,
};

export const IN_APP_MESSAGING_INPUT_BASE: Omit<
  InAppMessagingUserAgentInput,
  'additionalDetails'
> = {
  apis: [InAppMessagingAction.NotifyMessageInteraction],
  category: Category.InAppMessaging,
};

export const LOCATION_SEARCH_INPUT_BASE: Omit<
  GeoUserAgentInput,
  'additionalDetails'
> = {
  category: Category.Geo,
  apis: [
    GeoAction.SearchByText,
    GeoAction.SearchForSuggestions,
    GeoAction.SearchByPlaceId,
  ],
};

export const MAP_VIEW_INPUT_BASE: Omit<GeoUserAgentInput, 'additionalDetails'> =
  {
    category: Category.Geo,
    apis: [],
  };

export const STORAGE_MANAGER_INPUT_BASE: Omit<
  StorageUserAgentInput,
  'additionalDetails'
> = {
  apis: [StorageAction.UploadData],
  category: Category.Storage,
};

export const STORAGE_BROWSER_INPUT_BASE: Omit<
  StorageUserAgentInput,
  'additionalDetails'
> = {
  apis: [
    StorageAction.UploadData,
    StorageAction.Copy,
    StorageAction.GetUrl,
    StorageAction.List,
    StorageAction.Remove,
    StorageAction.GetDataAccess,
    StorageAction.ListCallerAccessGrants,
  ],
  category: Category.Storage,
};
