import type {
  ClientSessionInformationEvent,
  LivenessResponseStream,
  SessionInformation,
} from '@aws-sdk/client-rekognitionstreaming';
import { nanoid } from 'nanoid';
import { createMachine, assign, actions, spawn } from 'xstate';

import {
  getColorsSequencesFromSessionInformation,
  getFaceMatchState,
  getBoundingBox,
  getIntersectionOverUnion,
  getOvalBoundingBox,
  isFaceDistanceBelowThreshold,
  generateBboxFromLandmarks,
} from '../utils/liveness';

import type {
  ErrorState,
  Face,
  FaceMatchAssociatedParams,
  FreshnessColorAssociatedParams,
  IlluminationState,
  LivenessContext,
  LivenessError,
  LivenessEvent,
  OvalAssociatedParams,
  StreamActorCallback,
  VideoAssociatedParams,
} from '../types';
import { FaceMatchState, LivenessErrorState } from '../types';
import {
  BlazeFaceFaceDetection,
  drawLivenessOvalInCanvas,
  getFaceMatchStateInLivenessOval,
  getOvalDetailsFromSessionInformation,
  LivenessStreamProvider,
  estimateIllumination,
  isCameraDeviceVirtual,
  FreshnessColorDisplay,
  drawStaticOval,
} from '../utils';

import { getStaticLivenessOvalDetails } from '../utils/liveness';
import {
  isConnectionTimeoutError,
  isThrottlingExceptionEvent,
  isServiceQuotaExceededExceptionEvent,
  isValidationExceptionEvent,
  isInternalServerExceptionEvent,
  isServerSesssionInformationEvent,
  isDisconnectionEvent,
  isInvalidSignatureRegionException,
} from '../utils/eventUtils';

import { STATIC_VIDEO_CONSTRAINTS } from '../../utils/helpers';
import { WS_CLOSURE_CODE } from '../utils/constants';

const CAMERA_ID_KEY = 'AmplifyLivenessCameraId';
const DEFAULT_FACE_FIT_TIMEOUT = 7000;

let responseStream: Promise<AsyncIterable<LivenessResponseStream>>;
const responseStreamActor = async (callback: StreamActorCallback) => {
  try {
    const stream = await responseStream;
    for await (const event of stream) {
      if (isServerSesssionInformationEvent(event)) {
        callback({
          type: 'SET_SESSION_INFO',
          data: {
            sessionInfo: event.ServerSessionInformationEvent.SessionInformation,
          },
        });
      } else if (isDisconnectionEvent(event)) {
        callback({ type: 'DISCONNECT_EVENT' });
      } else if (isValidationExceptionEvent(event)) {
        callback({
          type: 'SERVER_ERROR',
          data: { error: { ...event.ValidationException } },
        });
      } else if (isInternalServerExceptionEvent(event)) {
        callback({
          type: 'SERVER_ERROR',
          data: { error: { ...event.InternalServerException } },
        });
      } else if (isThrottlingExceptionEvent(event)) {
        callback({
          type: 'SERVER_ERROR',
          data: { error: { ...event.ThrottlingException } },
        });
      } else if (isServiceQuotaExceededExceptionEvent(event)) {
        callback({
          type: 'SERVER_ERROR',
          data: { error: { ...event.ServiceQuotaExceededException } },
        });
      }
    }
  } catch (error: unknown) {
    if (isInvalidSignatureRegionException(error)) {
      callback({
        type: 'SERVER_ERROR',
        data: {
          error: new Error(
            'Invalid region in FaceLivenessDetector or credentials are scoped to the wrong region.'
          ),
        },
      });
    } else if (error instanceof Error) {
      callback({
        type: isConnectionTimeoutError(error)
          ? 'CONNECTION_TIMEOUT'
          : 'SERVER_ERROR',
        data: { error },
      });
    }
  }
};

function getLastSelectedCameraId(): string | null {
  return localStorage.getItem(CAMERA_ID_KEY);
}

function setLastSelectedCameraId(deviceId: string) {
  localStorage.setItem(CAMERA_ID_KEY, deviceId);
}

export const livenessMachine = createMachine<LivenessContext, LivenessEvent>(
  {
    id: 'livenessMachine',
    initial: 'cameraCheck',
    predictableActionArguments: true,
    context: {
      challengeId: nanoid(),
      maxFailedAttempts: 0, // Set to 0 for now as we are not allowing front end based retries for streaming
      failedAttempts: 0,
      componentProps: undefined,
      serverSessionInformation: undefined,
      videoAssociatedParams: {
        videoConstraints: STATIC_VIDEO_CONSTRAINTS,
        selectableDevices: [],
      },
      ovalAssociatedParams: undefined,
      faceMatchAssociatedParams: {
        illuminationState: undefined,
        faceMatchState: undefined,
        /**
         * faceMatchPercentage is a starting point we set as a baseline
         * for what we want our progress bar to visually start at. This correlates
         * to the formula we use to calculate the faceMatchPercentage
         * in getFaceMatchStateInLivenessOval
         */
        faceMatchPercentage: 25,
        currentDetectedFace: undefined,
        startFace: undefined,
        endFace: undefined,
      },
      freshnessColorAssociatedParams: {
        freshnessColorEl: undefined,
        freshnessColors: [],
        freshnessColorsComplete: false,
        freshnessColorDisplay: undefined,
      },
      errorState: undefined,
      livenessStreamProvider: undefined,
      responseStreamActorRef: undefined,
      shouldDisconnect: false,
      faceMatchStateBeforeStart: undefined,
      isFaceFarEnoughBeforeRecording: undefined,
      isRecordingStopped: false,
    },
    on: {
      CANCEL: 'userCancel',
      TIMEOUT: {
        target: 'retryableTimeout',
        actions: 'updateErrorStateForTimeout',
      },
      SET_SESSION_INFO: {
        internal: true,
        actions: 'updateSessionInfo',
      },
      DISCONNECT_EVENT: {
        internal: true,
        actions: 'updateShouldDisconnect',
      },
      SET_DOM_AND_CAMERA_DETAILS: {
        actions: 'setDOMAndCameraDetails',
      },
      UPDATE_DEVICE_AND_STREAM: {
        actions: 'updateDeviceAndStream',
      },
      SERVER_ERROR: {
        target: 'error',
        actions: 'updateErrorStateForServer',
      },
      CONNECTION_TIMEOUT: {
        target: 'error',
        actions: 'updateErrorStateForConnectionTimeout',
      },
      RUNTIME_ERROR: {
        target: 'error',
        actions: 'updateErrorStateForRuntime',
      },
      MOBILE_LANDSCAPE_WARNING: {
        target: 'mobileLandscapeWarning',
        actions: 'updateErrorStateForServer',
      },
    },
    states: {
      cameraCheck: {
        entry: 'resetErrorState',
        invoke: {
          src: 'checkVirtualCameraAndGetStream',
          onDone: {
            target: 'waitForDOMAndCameraDetails',
            actions: 'updateVideoMediaStream',
          },
          onError: {
            target: 'permissionDenied',
          },
        },
      },
      waitForDOMAndCameraDetails: {
        after: {
          0: {
            target: 'start',
            cond: 'hasDOMAndCameraDetails',
          },
          10: { target: 'waitForDOMAndCameraDetails' },
        },
      },
      start: {
        entry: ['drawStaticOval', 'initializeFaceDetector'],
        always: [
          {
            target: 'detectFaceBeforeStart',
            cond: 'shouldSkipStartScreen',
          },
        ],
        on: {
          BEGIN: 'detectFaceBeforeStart',
        },
      },
      detectFaceBeforeStart: {
        invoke: {
          src: 'detectFace',
          onDone: {
            target: 'checkFaceDetectedBeforeStart',
            actions: 'updateFaceMatchBeforeStartDetails',
          },
        },
      },
      checkFaceDetectedBeforeStart: {
        after: {
          0: {
            target: 'detectFaceDistanceBeforeRecording',
            cond: 'hasSingleFaceBeforeStart',
          },
          100: { target: 'detectFaceBeforeStart' },
        },
      },
      detectFaceDistanceBeforeRecording: {
        invoke: {
          src: 'detectFaceDistance',
          onDone: {
            target: 'checkFaceDistanceBeforeRecording',
            actions: 'updateFaceDistanceBeforeRecording',
          },
        },
      },
      checkFaceDistanceBeforeRecording: {
        after: {
          0: {
            target: 'initializeLivenessStream',
            cond: 'hasEnoughFaceDistanceBeforeRecording',
          },
          100: { target: 'detectFaceDistanceBeforeRecording' },
        },
      },
      initializeLivenessStream: {
        invoke: {
          src: 'openLivenessStreamConnection',
          onDone: {
            target: 'notRecording',
            actions: [
              'updateLivenessStreamProvider',
              'spawnResponseStreamActor',
            ],
          },
        },
      },
      notRecording: {
        initial: 'waitForSessionInfo',
        states: {
          waitForSessionInfo: {
            after: {
              0: {
                target: '#livenessMachine.recording',
                cond: 'hasServerSessionInfo',
              },
              100: { target: 'waitForSessionInfo' },
            },
          },
        },
      },
      recording: {
        entry: [
          'clearErrorState',
          'startRecording',
          'sendTimeoutAfterOvalDrawingDelay',
        ],
        initial: 'ovalDrawing',
        states: {
          ovalDrawing: {
            invoke: {
              src: 'detectInitialFaceAndDrawOval',
              onDone: {
                target: 'checkFaceDetected',
                actions: [
                  'updateOvalAndFaceDetailsPostDraw',
                  'sendTimeoutAfterOvalMatchDelay',
                ],
              },
              onError: {
                target: '#livenessMachine.error',
                actions: 'updateErrorStateForRuntime',
              },
            },
          },
          checkFaceDetected: {
            after: {
              0: {
                target: 'cancelOvalDrawingTimeout',
                cond: 'hasSingleFace',
              },
              100: { target: 'ovalDrawing' },
            },
          },
          cancelOvalDrawingTimeout: {
            entry: [
              'cancelOvalDrawingTimeout',
              'sendTimeoutAfterRecordingDelay',
            ],
            after: {
              0: {
                target: 'checkRecordingStarted',
              },
            },
          },
          checkRecordingStarted: {
            after: {
              0: {
                target: 'ovalMatching',
                cond: 'hasRecordingStarted',
                actions: 'updateRecordingStartTimestampMs',
              },
              100: { target: 'checkRecordingStarted' },
            },
          },
          // Evaluates face match and moves to checkMatch
          // which continually checks for match until either timeout or face match
          ovalMatching: {
            entry: 'cancelRecordingTimeout',
            invoke: {
              src: 'detectFaceAndMatchOval',
              onDone: {
                target: 'checkMatch',
                actions: 'updateFaceDetailsPostMatch',
              },
            },
          },
          // If `hasFaceMatchedInOval` is true, then move to `delayBeforeFlash`, which pauses
          // for one second to show "Hold still" text before moving to `flashFreshnessColors`.
          // If not, move back to ovalMatching and re-evaluate match state
          checkMatch: {
            after: {
              0: {
                target: 'delayBeforeFlash',
                cond: 'hasFaceMatchedInOval',
                actions: [
                  'setFaceMatchTimeAndStartFace',
                  'updateEndFaceMatch',
                  'setupFlashFreshnessColors',
                  'cancelOvalMatchTimeout',
                  'cancelOvalDrawingTimeout',
                ],
              },
              1: {
                target: 'ovalMatching',
              },
            },
          },
          delayBeforeFlash: {
            after: {
              1000: 'flashFreshnessColors',
            },
          },
          flashFreshnessColors: {
            invoke: {
              src: 'flashColors',
              onDone: [
                {
                  target: 'success',
                  cond: 'hasFreshnessColorShown',
                },
                {
                  target: 'flashFreshnessColors',
                  actions: 'updateFreshnessDetails',
                },
              ],
            },
          },
          success: {
            entry: 'stopRecording',
            type: 'final',
          },
        },
        onDone: 'uploading',
      },
      uploading: {
        initial: 'pending',
        states: {
          pending: {
            entry: ['pauseVideoStream'],
            invoke: {
              src: 'stopVideo',
              onDone: 'waitForDisconnectEvent',
              onError: {
                target: '#livenessMachine.error',
                actions: 'updateErrorStateForRuntime',
              },
            },
          },
          waitForDisconnectEvent: {
            after: {
              0: {
                target: 'getLivenessResult',
                cond: 'getShouldDisconnect',
              },
              100: { target: 'waitForDisconnectEvent' },
            },
          },
          getLivenessResult: {
            entry: ['freezeStream'],
            invoke: {
              src: 'getLiveness',
              onError: {
                target: '#livenessMachine.error',
                actions: 'updateErrorStateForServer',
              },
            },
          },
        },
      },
      retryableTimeout: {
        entry: 'updateFailedAttempts',
        always: [
          {
            target: 'timeout',
            cond: 'shouldTimeoutOnFailedAttempts',
          },
          { target: 'notRecording' },
        ],
      },
      permissionDenied: {
        entry: 'callUserPermissionDeniedCallback',
        on: { RETRY_CAMERA_CHECK: 'cameraCheck' },
      },
      mobileLandscapeWarning: {
        entry: 'callMobileLandscapeWarningCallback',
        always: { target: 'error' },
      },
      timeout: {
        entry: ['cleanUpResources', 'callUserTimeoutCallback', 'freezeStream'],
      },
      error: {
        entry: [
          'cleanUpResources',
          'callErrorCallback',
          'cancelOvalDrawingTimeout',
          'cancelOvalMatchTimeout',
          'cancelRecordingTimeout',
          'freezeStream',
        ],
      },
      userCancel: {
        entry: ['cleanUpResources', 'callUserCancelCallback', 'resetContext'],
        always: { target: 'cameraCheck' },
      },
    },
  },
  {
    actions: {
      spawnResponseStreamActor: assign({
        responseStreamActorRef: () => spawn(responseStreamActor),
      }),
      updateFailedAttempts: assign({
        failedAttempts: (context) => context.failedAttempts! + 1,
      }),
      updateVideoMediaStream: assign({
        videoAssociatedParams: (context, event) => ({
          ...context.videoAssociatedParams,
          videoMediaStream: event.data
            ?.stream as VideoAssociatedParams['videoMediaStream'],
          selectedDeviceId: event.data
            ?.selectedDeviceId as VideoAssociatedParams['selectedDeviceId'],
          selectableDevices: event.data
            ?.selectableDevices as VideoAssociatedParams['selectableDevices'],
        }),
      }),
      initializeFaceDetector: assign({
        ovalAssociatedParams: (context) => {
          const { componentProps } = context;
          const { faceModelUrl, binaryPath } = componentProps!.config!;

          const faceDetector = new BlazeFaceFaceDetection(
            binaryPath,
            faceModelUrl
          );
          faceDetector.triggerModelLoading();

          return { ...context.ovalAssociatedParams, faceDetector };
        },
      }),
      updateLivenessStreamProvider: assign({
        livenessStreamProvider: (context, event) =>
          event.data?.livenessStreamProvider as LivenessStreamProvider,
      }),
      setDOMAndCameraDetails: assign({
        videoAssociatedParams: (context, event) => ({
          ...context.videoAssociatedParams,
          videoEl: event.data?.videoEl as VideoAssociatedParams['videoEl'],
          canvasEl: event.data?.canvasEl as VideoAssociatedParams['canvasEl'],
          isMobile: event.data?.isMobile as VideoAssociatedParams['isMobile'],
        }),
        freshnessColorAssociatedParams: (context, event) => ({
          ...context.freshnessColorAssociatedParams,
          freshnessColorEl: event.data
            ?.freshnessColorEl as FreshnessColorAssociatedParams['freshnessColorEl'],
        }),
      }),
      updateDeviceAndStream: assign({
        videoAssociatedParams: (context, event) => {
          setLastSelectedCameraId(event.data?.newDeviceId as string);
          return {
            ...context.videoAssociatedParams,
            selectedDeviceId: event.data
              ?.newDeviceId as VideoAssociatedParams['selectedDeviceId'],
            videoMediaStream: event.data
              ?.newStream as VideoAssociatedParams['videoMediaStream'],
          };
        },
      }),
      drawStaticOval: (context) => {
        const { canvasEl, videoEl, videoMediaStream } =
          context.videoAssociatedParams!;

        drawStaticOval(canvasEl!, videoEl!, videoMediaStream!);
      },
      updateRecordingStartTimestampMs: assign({
        videoAssociatedParams: (context) => {
          const {
            challengeId,
            videoAssociatedParams,
            ovalAssociatedParams,
            livenessStreamProvider,
          } = context;
          const { recordingStartApiTimestamp, recorderStartTimestamp } =
            livenessStreamProvider!.videoRecorder;
          const { videoMediaStream } = videoAssociatedParams!;
          const { initialFace } = ovalAssociatedParams!;

          /**
           * This calculation is provided by Science team after doing analysis
           * of unreliable .onstart() (recorderStartTimestamp) timestamp that is
           * returned from mediaRecorder.
           */
          const timestamp = Math.round(
            0.73 * (recorderStartTimestamp! - recordingStartApiTimestamp!) +
              recordingStartApiTimestamp!
          );

          // Send client info for initial face position
          const { width, height } = videoMediaStream!
            .getTracks()[0]
            .getSettings();
          const flippedInitialFaceLeft =
            width! - initialFace!.left - initialFace!.width;

          context.livenessStreamProvider!.sendClientInfo({
            Challenge: {
              FaceMovementAndLightChallenge: {
                ChallengeId: challengeId,
                VideoStartTimestamp: timestamp,
                InitialFace: {
                  InitialFaceDetectedTimestamp: initialFace!.timestampMs,
                  BoundingBox: getBoundingBox({
                    deviceHeight: height!,
                    deviceWidth: width!,
                    height: initialFace!.height,
                    width: initialFace!.width,
                    top: initialFace!.top,
                    left: flippedInitialFaceLeft,
                  }),
                },
              },
            },
          });

          return {
            ...context.videoAssociatedParams,
            recordingStartTimestampMs: timestamp,
          };
        },
      }),
      startRecording: assign({
        videoAssociatedParams: (context) => {
          if (!context.serverSessionInformation) {
            throw new Error(
              'Session information was not received from response stream'
            );
          }
          if (
            context.livenessStreamProvider!.videoRecorder &&
            context.livenessStreamProvider!.videoRecorder.getState() !==
              'recording'
          ) {
            context.livenessStreamProvider!.startRecordingLivenessVideo();
          }

          return { ...context.videoAssociatedParams };
        },
      }),
      stopRecording: () => {},
      updateFaceMatchBeforeStartDetails: assign({
        faceMatchStateBeforeStart: (_, event) =>
          event.data!.faceMatchState as FaceMatchState,
      }),
      updateFaceDistanceBeforeRecording: assign({
        isFaceFarEnoughBeforeRecording: (_, event) =>
          !!event.data!.isFaceFarEnoughBeforeRecording,
      }),
      updateFaceDistanceWhileLoading: assign({
        isFaceFarEnoughBeforeRecording: (_, event) =>
          !!event.data!.isFaceFarEnoughBeforeRecording,
        errorState: (_, event) => event.data?.error as ErrorState,
      }),
      updateOvalAndFaceDetailsPostDraw: assign({
        ovalAssociatedParams: (context, event) => ({
          ...context.ovalAssociatedParams,
          initialFace: event.data!
            .initialFace as OvalAssociatedParams['initialFace'],
          ovalDetails: event.data!
            .ovalDetails as OvalAssociatedParams['ovalDetails'],
          scaleFactor: event.data!
            .scaleFactor as OvalAssociatedParams['scaleFactor'],
        }),
        faceMatchAssociatedParams: (context, event) => ({
          ...context.faceMatchAssociatedParams,
          faceMatchState: event.data!
            .faceMatchState as FaceMatchAssociatedParams['faceMatchState'],
          illuminationState: event.data!
            .illuminationState as FaceMatchAssociatedParams['illuminationState'],
        }),
      }),
      updateFaceDetailsPostMatch: assign({
        faceMatchAssociatedParams: (context, event) => ({
          ...context.faceMatchAssociatedParams,
          faceMatchState: event.data!
            .faceMatchState as FaceMatchAssociatedParams['faceMatchState'],
          faceMatchPercentage: event.data!
            .faceMatchPercentage as FaceMatchAssociatedParams['faceMatchPercentage'],
          illuminationState: event.data!
            .illuminationState as FaceMatchAssociatedParams['illuminationState'],
          currentDetectedFace: event.data!
            .detectedFace as FaceMatchAssociatedParams['currentDetectedFace'],
        }),
      }),
      updateEndFaceMatch: assign({
        faceMatchAssociatedParams: (context) => ({
          ...context.faceMatchAssociatedParams,
          endFace: context.faceMatchAssociatedParams!.currentDetectedFace,
        }),
      }),
      setFaceMatchTimeAndStartFace: assign({
        faceMatchAssociatedParams: (context) => {
          return {
            ...context.faceMatchAssociatedParams,
            startFace:
              context.faceMatchAssociatedParams!.startFace === undefined
                ? context.faceMatchAssociatedParams!.currentDetectedFace
                : context.faceMatchAssociatedParams!.startFace,
          };
        },
      }),
      resetErrorState: assign({ errorState: (_) => undefined }),
      updateErrorStateForConnectionTimeout: assign({
        errorState: (_) => LivenessErrorState.CONNECTION_TIMEOUT,
      }),
      updateErrorStateForTimeout: assign({
        errorState: (_, event) =>
          (event.data?.errorState as ErrorState) || LivenessErrorState.TIMEOUT,
        errorMessage: (_, event) => event.data?.message as string,
      }),
      updateErrorStateForRuntime: assign({
        errorState: (_, event) =>
          (event.data?.errorState as ErrorState) ||
          LivenessErrorState.RUNTIME_ERROR,
      }),
      updateErrorStateForServer: assign({
        errorState: (_) => LivenessErrorState.SERVER_ERROR,
      }),
      clearErrorState: assign({ errorState: (_) => undefined }),
      updateSessionInfo: assign({
        serverSessionInformation: (_, event) => {
          return event.data!.sessionInfo as SessionInformation;
        },
      }),
      updateShouldDisconnect: assign({ shouldDisconnect: () => true }),
      updateFreshnessDetails: assign({
        freshnessColorAssociatedParams: (context, event) => {
          return {
            ...context.freshnessColorAssociatedParams,
            freshnessColorsComplete: event.data!
              .freshnessColorsComplete as FreshnessColorAssociatedParams['freshnessColorsComplete'],
          };
        },
      }),
      setupFlashFreshnessColors: assign({
        freshnessColorAssociatedParams: (context) => {
          const { serverSessionInformation } = context;
          const freshnessColors = getColorsSequencesFromSessionInformation(
            serverSessionInformation!
          );
          const freshnessColorDisplay = new FreshnessColorDisplay(
            context as unknown as LivenessContext,
            freshnessColors
          );

          return {
            ...context.freshnessColorAssociatedParams,
            freshnessColorDisplay,
          };
        },
      }),

      // timeouts
      sendTimeoutAfterOvalDrawingDelay: actions.send(
        {
          type: 'RUNTIME_ERROR',
          data: {
            message: 'Client failed to draw oval.',
          },
        },
        {
          delay: 5000,
          id: 'ovalDrawingTimeout',
        }
      ),
      cancelOvalDrawingTimeout: actions.cancel('ovalDrawingTimeout'),
      sendTimeoutAfterRecordingDelay: actions.send(
        {
          type: 'RUNTIME_ERROR',
          data: {
            message: 'Client failed to start recording.',
          },
        },
        {
          delay: 5000,
          id: 'recordingTimeout',
        }
      ),
      cancelRecordingTimeout: actions.cancel('recordingTimeout'),
      sendTimeoutAfterOvalMatchDelay: actions.send(
        {
          type: 'TIMEOUT',
          data: {
            message: 'Client timed out waiting for face to match oval.',
          },
        },
        {
          delay: (context) => {
            return (
              context.serverSessionInformation?.Challenge
                ?.FaceMovementAndLightChallenge?.ChallengeConfig
                ?.OvalFitTimeout ?? DEFAULT_FACE_FIT_TIMEOUT
            );
          },
          id: 'ovalMatchTimeout',
        }
      ),
      cancelOvalMatchTimeout: actions.cancel('ovalMatchTimeout'),

      // callbacks
      callUserPermissionDeniedCallback: assign({
        errorState: (context, event) => {
          let errorState: ErrorState;

          if ((event.data!.message as string).includes('15 fps')) {
            errorState = LivenessErrorState.CAMERA_FRAMERATE_ERROR;
          } else {
            errorState = LivenessErrorState.CAMERA_ACCESS_ERROR;
          }

          const errorMessage =
            (event.data!.message as ErrorState) || event.data!.Message;
          const error = new Error(errorMessage);

          const livenessError: LivenessError = {
            state: errorState,
            error: error,
          };
          context.componentProps!.onError?.(livenessError);

          return errorState;
        },
      }),
      callMobileLandscapeWarningCallback: assign({
        errorState: () => LivenessErrorState.MOBILE_LANDSCAPE_ERROR,
      }),
      callUserCancelCallback: (context) => {
        context.componentProps!.onUserCancel?.();
      },
      callUserTimeoutCallback: (context) => {
        const error = new Error(context.errorMessage ?? 'Client Timeout');
        error.name = context.errorState!;
        const livenessError: LivenessError = {
          state: context.errorState!,
          error: error,
        };
        context.componentProps!.onError?.(livenessError);
      },
      callErrorCallback: (context, event) => {
        const livenessError: LivenessError = {
          state: context.errorState!,
          error: (event.data?.error as Error) || event.data,
        };
        context.componentProps!.onError?.(livenessError);
      },
      cleanUpResources: (context) => {
        const { freshnessColorEl } = context.freshnessColorAssociatedParams!;
        if (freshnessColorEl) {
          freshnessColorEl.style.display = 'none';
        }

        let closureCode = WS_CLOSURE_CODE.DEFAULT_ERROR_CODE;
        if (context.errorState === LivenessErrorState.TIMEOUT) {
          closureCode = WS_CLOSURE_CODE.FACE_FIT_TIMEOUT;
        } else if (context.errorState === LivenessErrorState.RUNTIME_ERROR) {
          closureCode = WS_CLOSURE_CODE.RUNTIME_ERROR;
        } else if (
          context.errorState === LivenessErrorState.FACE_DISTANCE_ERROR ||
          context.errorState === LivenessErrorState.MULTIPLE_FACES_ERROR
        ) {
          closureCode = WS_CLOSURE_CODE.USER_ERROR_DURING_CONNECTION;
        } else if (context.errorState === undefined) {
          closureCode = WS_CLOSURE_CODE.USER_CANCEL;
        }

        context.livenessStreamProvider?.endStreamWithCode(closureCode);
      },
      freezeStream: (context) => {
        const { videoMediaStream, videoEl } = context.videoAssociatedParams!;
        context.isRecordingStopped = true;
        videoEl?.pause();
        videoMediaStream?.getTracks().forEach(function (track) {
          track.stop();
        });
      },
      pauseVideoStream: (context) => {
        const { videoEl } = context.videoAssociatedParams!;
        context.isRecordingStopped = true;
        videoEl!.pause();
      },
      resetContext: assign({
        challengeId: nanoid(),
        maxFailedAttempts: 0, // Set to 0 for now as we are not allowing front end based retries for streaming
        failedAttempts: 0,
        componentProps: (context) => context.componentProps,
        serverSessionInformation: (_) => undefined,
        videoAssociatedParams: (_) => {
          return {
            videoConstraints: STATIC_VIDEO_CONSTRAINTS,
          };
        },
        ovalAssociatedParams: (_) => undefined,
        errorState: (_) => undefined,
        livenessStreamProvider: (_) => undefined,
        responseStreamActorRef: (_) => undefined,
        shouldDisconnect: false,
        faceMatchStateBeforeStart: (_) => undefined,
        isFaceFarEnoughBeforeRecording: (_) => undefined,
        isRecordingStopped: false,
      }),
    },
    guards: {
      shouldTimeoutOnFailedAttempts: (context) =>
        context.failedAttempts! >= context.maxFailedAttempts!,
      hasFaceMatchedInOval: (context) => {
        return (
          context.faceMatchAssociatedParams!.faceMatchState ===
          FaceMatchState.MATCHED
        );
      },
      hasSingleFace: (context) => {
        return (
          context.faceMatchAssociatedParams!.faceMatchState ===
          FaceMatchState.FACE_IDENTIFIED
        );
      },
      hasSingleFaceBeforeStart: (context) => {
        return (
          context.faceMatchStateBeforeStart === FaceMatchState.FACE_IDENTIFIED
        );
      },
      hasEnoughFaceDistanceBeforeRecording: (context) => {
        return context.isFaceFarEnoughBeforeRecording!;
      },
      hasNotEnoughFaceDistanceBeforeRecording: (context) => {
        return !context.isFaceFarEnoughBeforeRecording;
      },
      hasFreshnessColorShown: (context) =>
        context.freshnessColorAssociatedParams!.freshnessColorsComplete!,
      hasServerSessionInfo: (context) => {
        return context.serverSessionInformation !== undefined;
      },
      hasDOMAndCameraDetails: (context) => {
        return (
          context.videoAssociatedParams!.videoEl !== undefined &&
          context.videoAssociatedParams!.canvasEl !== undefined &&
          context.freshnessColorAssociatedParams!.freshnessColorEl !== undefined
        );
      },
      getShouldDisconnect: (context) => {
        return !!context.shouldDisconnect;
      },
      hasRecordingStarted: (context) => {
        return (
          context.livenessStreamProvider!.videoRecorder.firstChunkTimestamp !==
          undefined
        );
      },
      shouldSkipStartScreen: (context) => {
        return !!context.componentProps?.disableStartScreen;
      },
    },
    services: {
      async checkVirtualCameraAndGetStream(context) {
        const { videoConstraints } = context.videoAssociatedParams!;

        // Get initial stream to enumerate devices with non-empty labels
        const existingDeviceId = getLastSelectedCameraId();
        const initialStream = await navigator.mediaDevices.getUserMedia({
          video: {
            ...videoConstraints,
            ...(existingDeviceId ? { deviceId: existingDeviceId } : {}),
          },
          audio: false,
        });
        const devices = await navigator.mediaDevices.enumerateDevices();
        const realVideoDevices = devices
          .filter((device) => device.kind === 'videoinput')
          .filter((device) => !isCameraDeviceVirtual(device));

        if (!realVideoDevices.length) {
          throw new Error('No real video devices found');
        }

        // Ensure that at least one of the cameras is capable of at least 15 fps
        const tracksWithMoreThan15Fps = initialStream
          .getTracks()
          .filter((track) => {
            const settings = track.getSettings();
            return settings.frameRate! >= 15;
          });

        if (tracksWithMoreThan15Fps.length < 1) {
          throw new Error('No camera found with more than 15 fps');
        }

        // If the initial stream is of real camera, use it otherwise use the first real camera
        const initialStreamDeviceId =
          tracksWithMoreThan15Fps[0].getSettings().deviceId;
        const isInitialStreamFromRealDevice = realVideoDevices.some(
          (device) => device.deviceId === initialStreamDeviceId
        );

        const deviceId = isInitialStreamFromRealDevice
          ? initialStreamDeviceId
          : realVideoDevices[0].deviceId;

        let realVideoDeviceStream = initialStream;
        if (!isInitialStreamFromRealDevice) {
          realVideoDeviceStream = await navigator.mediaDevices.getUserMedia({
            video: {
              ...videoConstraints,
              deviceId: { exact: deviceId },
            },
            audio: false,
          });
        }
        setLastSelectedCameraId(deviceId!);

        return {
          stream: realVideoDeviceStream,
          selectedDeviceId: initialStreamDeviceId,
          selectableDevices: realVideoDevices,
        };
      },
      // eslint-disable-next-line @typescript-eslint/require-await
      async openLivenessStreamConnection(context) {
        const { config } = context.componentProps!;
        const { credentialProvider, endpointOverride, systemClockOffset } =
          config!;
        const livenessStreamProvider = new LivenessStreamProvider({
          sessionId: context.componentProps!.sessionId,
          region: context.componentProps!.region,
          systemClockOffset,
          stream: context.videoAssociatedParams!.videoMediaStream!,
          videoEl: context.videoAssociatedParams!.videoEl!,
          credentialProvider,
          endpointOverride,
        });

        responseStream = livenessStreamProvider.getResponseStream();
        return { livenessStreamProvider };
      },
      async detectFace(context) {
        const { videoEl } = context.videoAssociatedParams!;
        const { faceDetector } = context.ovalAssociatedParams!;

        // initialize models
        try {
          await faceDetector!.modelLoadingPromise;
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log({ err });
        }

        // detect face
        const faceMatchState = await getFaceMatchState(faceDetector!, videoEl!);

        return { faceMatchState };
      },
      async detectFaceDistance(context) {
        const {
          isFaceFarEnoughBeforeRecording: faceDistanceCheckBeforeRecording,
        } = context;
        const { videoEl, videoMediaStream, isMobile } =
          context.videoAssociatedParams!;
        const { faceDetector } = context.ovalAssociatedParams!;

        const { width, height } = videoMediaStream!
          .getTracks()[0]
          .getSettings();

        const ovalDetails = getStaticLivenessOvalDetails({
          width: width!,
          height: height!,
        });

        const { isDistanceBelowThreshold: isFaceFarEnoughBeforeRecording } =
          await isFaceDistanceBelowThreshold({
            faceDetector: faceDetector!,
            videoEl: videoEl!,
            ovalDetails,
            reduceThreshold: faceDistanceCheckBeforeRecording, // if this is the second face distance check reduce the threshold
            isMobile,
          });

        return { isFaceFarEnoughBeforeRecording };
      },
      async detectFaceDistanceWhileLoading(context) {
        const {
          isFaceFarEnoughBeforeRecording: faceDistanceCheckBeforeRecording,
        } = context;
        const { videoEl, videoMediaStream, isMobile } =
          context.videoAssociatedParams!;
        const { faceDetector } = context.ovalAssociatedParams!;

        const { width, height } = videoMediaStream!
          .getTracks()[0]
          .getSettings();

        const ovalDetails = getStaticLivenessOvalDetails({
          width: width!,
          height: height!,
        });

        const {
          isDistanceBelowThreshold: isFaceFarEnoughBeforeRecording,
          error,
        } = await isFaceDistanceBelowThreshold({
          faceDetector: faceDetector!,
          isMobile,
          ovalDetails,
          videoEl: videoEl!,
          // if this is the second face distance check reduce the threshold
          reduceThreshold: faceDistanceCheckBeforeRecording,
        });

        return { isFaceFarEnoughBeforeRecording, error };
      },
      async detectInitialFaceAndDrawOval(context) {
        const { serverSessionInformation, livenessStreamProvider } = context;
        const { videoEl, canvasEl, isMobile } = context.videoAssociatedParams!;
        const { faceDetector } = context.ovalAssociatedParams!;

        // initialize models
        try {
          await faceDetector!.modelLoadingPromise;
          await livenessStreamProvider!.videoRecorder.recorderStarted;
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log({ err });
        }

        // detect face
        const detectedFaces = await faceDetector!.detectFaces(videoEl!);
        let initialFace: Face;
        let faceMatchState: FaceMatchState;
        let illuminationState: IlluminationState | undefined;

        switch (detectedFaces.length) {
          case 0: {
            // no face detected;
            faceMatchState = FaceMatchState.CANT_IDENTIFY;
            illuminationState = estimateIllumination(videoEl!);
            break;
          }
          case 1: {
            //exactly one face detected;

            faceMatchState = FaceMatchState.FACE_IDENTIFIED;
            initialFace = detectedFaces[0];
            break;
          }
          default: {
            //more than one face detected ;
            faceMatchState = FaceMatchState.TOO_MANY;
            break;
          }
        }

        if (!initialFace!) {
          return { faceMatchState, illuminationState };
        }

        // Get width/height of video element so we can compute scaleFactor
        // and set canvas width/height.
        const { width: videoScaledWidth, height: videoScaledHeight } =
          videoEl!.getBoundingClientRect();

        if (isMobile) {
          canvasEl!.width = window.innerWidth;
          canvasEl!.height = window.innerHeight;
        } else {
          canvasEl!.width = videoScaledWidth;
          canvasEl!.height = videoScaledHeight;
        }

        // Compute scaleFactor which is how much our video element is scaled
        // vs the intrinsic video resolution
        const scaleFactor = videoScaledWidth / videoEl!.videoWidth;

        // generate oval details from initialFace and video dimensions
        const ovalDetails = getOvalDetailsFromSessionInformation({
          sessionInformation: serverSessionInformation!,
          videoWidth: videoEl!.width,
        });

        // renormalize initial face
        const renormalizedFace = generateBboxFromLandmarks(
          initialFace,
          ovalDetails,
          videoEl!.videoHeight
        );
        initialFace.top = renormalizedFace.top;
        initialFace.left = renormalizedFace.left;
        initialFace.height = renormalizedFace.bottom - renormalizedFace.top;
        initialFace.width = renormalizedFace.right - renormalizedFace.left;

        // Draw oval in canvas using ovalDetails and scaleFactor
        drawLivenessOvalInCanvas({
          canvas: canvasEl!,
          oval: ovalDetails,
          scaleFactor,
          videoEl: videoEl!,
        });

        return {
          faceMatchState,
          ovalDetails,
          scaleFactor,
          initialFace,
        };
      },
      async detectFaceAndMatchOval(context) {
        const { serverSessionInformation } = context;
        const { videoEl } = context.videoAssociatedParams!;
        const { faceDetector, ovalDetails, initialFace } =
          context.ovalAssociatedParams!;

        // detect face
        const detectedFaces = await faceDetector!.detectFaces(videoEl!);
        let faceMatchState: FaceMatchState;
        let faceMatchPercentage: number = 0;
        let detectedFace: Face | undefined;
        let illuminationState: IlluminationState | undefined;

        const initialFaceBoundingBox = generateBboxFromLandmarks(
          initialFace!,
          ovalDetails!,
          videoEl!.videoHeight
        );

        const { ovalBoundingBox } = getOvalBoundingBox(ovalDetails!);

        const initialFaceIntersection = getIntersectionOverUnion(
          initialFaceBoundingBox,
          ovalBoundingBox
        );

        switch (detectedFaces.length) {
          case 0: {
            //no face detected;
            faceMatchState = FaceMatchState.CANT_IDENTIFY;
            illuminationState = estimateIllumination(videoEl!);
            break;
          }
          case 1: {
            //exactly one face detected, match face with oval;
            detectedFace = detectedFaces[0];
            const {
              faceMatchState: faceMatchStateInLivenessOval,
              faceMatchPercentage: faceMatchPercentageInLivenessOval,
            } = getFaceMatchStateInLivenessOval({
              face: detectedFace,
              ovalDetails: ovalDetails!,
              initialFaceIntersection,
              sessionInformation: serverSessionInformation!,
              frameHeight: videoEl!.videoHeight,
            });

            faceMatchState = faceMatchStateInLivenessOval;
            faceMatchPercentage = faceMatchPercentageInLivenessOval;
            break;
          }
          default: {
            //more than one face detected ;
            faceMatchState = FaceMatchState.TOO_MANY;
            break;
          }
        }

        return {
          faceMatchState,
          faceMatchPercentage,
          illuminationState,
          detectedFace,
        };
      },
      async flashColors(context) {
        const { freshnessColorsComplete, freshnessColorDisplay } =
          context.freshnessColorAssociatedParams!;

        if (freshnessColorsComplete) {
          return;
        }

        const completed = await freshnessColorDisplay!.displayColorTick();

        return { freshnessColorsComplete: completed };
      },
      async stopVideo(context) {
        const { challengeId, livenessStreamProvider } = context;
        const { videoMediaStream } = context.videoAssociatedParams!;
        const { initialFace, ovalDetails } = context.ovalAssociatedParams!;
        const { startFace, endFace } = context.faceMatchAssociatedParams!;

        const { width, height } = videoMediaStream!
          .getTracks()[0]
          .getSettings();

        const flippedInitialFaceLeft =
          width! - initialFace!.left - initialFace!.width;

        await livenessStreamProvider!.stopVideo();

        const livenessActionDocument: ClientSessionInformationEvent = {
          Challenge: {
            FaceMovementAndLightChallenge: {
              ChallengeId: challengeId,
              InitialFace: {
                InitialFaceDetectedTimestamp: initialFace!.timestampMs,
                BoundingBox: getBoundingBox({
                  deviceHeight: height!,
                  deviceWidth: width!,
                  height: initialFace!.height,
                  width: initialFace!.width,
                  top: initialFace!.top,
                  left: flippedInitialFaceLeft,
                }),
              },
              TargetFace: {
                FaceDetectedInTargetPositionStartTimestamp:
                  startFace!.timestampMs,
                FaceDetectedInTargetPositionEndTimestamp: endFace!.timestampMs,
                BoundingBox: getBoundingBox({
                  deviceHeight: height!,
                  deviceWidth: width!,
                  height: ovalDetails!.height,
                  width: ovalDetails!.width,
                  top: ovalDetails!.centerY - ovalDetails!.height / 2,
                  left: ovalDetails!.centerX - ovalDetails!.width / 2,
                }),
              },
              VideoEndTimestamp:
                livenessStreamProvider!.videoRecorder.recorderEndTimestamp,
            },
          },
        };

        if (livenessStreamProvider!.videoRecorder.getVideoChunkSize() === 0) {
          throw new Error('Video chunks not recorded successfully.');
        }

        livenessStreamProvider!.sendClientInfo(livenessActionDocument);

        livenessStreamProvider!.dispatchStopVideoEvent();
      },
      async getLiveness(context) {
        const { onAnalysisComplete } = context.componentProps!;

        // Get liveness result
        await onAnalysisComplete();
      },
    },
  }
);
