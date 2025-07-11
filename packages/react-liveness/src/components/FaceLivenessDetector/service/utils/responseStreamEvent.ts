import type { LivenessResponseStream } from '@aws-sdk/client-rekognitionstreaming';
import { WEBSOCKET_CONNECTION_TIMEOUT_MESSAGE } from './createStreamingClient/CustomWebSocketFetchHandler';

export const isServerSessionInformationEvent = (
  value: unknown
): value is LivenessResponseStream.ServerSessionInformationEventMember => {
  return !!(value as LivenessResponseStream.ServerSessionInformationEventMember)
    ?.ServerSessionInformationEvent;
};

export const isConnectionTimeoutError = (error: unknown): error is Error => {
  const { message } = error as Error;
  return message.includes(WEBSOCKET_CONNECTION_TIMEOUT_MESSAGE);
};

export const isDisconnectionEvent = (
  value: unknown
): value is LivenessResponseStream.DisconnectionEventMember => {
  return !!(value as LivenessResponseStream.DisconnectionEventMember)
    ?.DisconnectionEvent;
};

export const isValidationExceptionEvent = (
  value: unknown
): value is LivenessResponseStream.ValidationExceptionMember => {
  return !!(value as LivenessResponseStream.ValidationExceptionMember)
    ?.ValidationException;
};

export const isInternalServerExceptionEvent = (
  value: unknown
): value is LivenessResponseStream.InternalServerExceptionMember => {
  return !!(value as LivenessResponseStream.InternalServerExceptionMember)
    ?.InternalServerException;
};

export const isThrottlingExceptionEvent = (
  value: unknown
): value is LivenessResponseStream.ThrottlingExceptionMember => {
  return !!(value as LivenessResponseStream.ThrottlingExceptionMember)
    ?.ThrottlingException;
};

export const isServiceQuotaExceededExceptionEvent = (
  value: unknown
): value is LivenessResponseStream.ServiceQuotaExceededExceptionMember => {
  return !!(value as LivenessResponseStream.ServiceQuotaExceededExceptionMember)
    ?.ServiceQuotaExceededException;
};

export const isInvalidSignatureRegionException = (
  error: unknown
): error is Error => {
  const { message, name } = error as Error;
  return (
    name === 'InvalidSignatureException' && message.includes('valid region')
  );
};
