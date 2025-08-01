import React, { useState, useRef } from 'react';
import { classNames } from '@aws-amplify/ui';

import { Button, Flex, Loader, Text, View } from '@aws-amplify/ui-react';
import { useColorMode } from '@aws-amplify/ui-react/internal';
import { FaceMatchState, clearOvalCanvas, drawStaticOval } from '../service';
import type { UseMediaStreamInVideo } from '../hooks';
import {
  useLivenessActor,
  useLivenessSelector,
  createLivenessSelector,
  useMediaStreamInVideo,
} from '../hooks';
import type {
  InstructionDisplayText,
  ErrorDisplayText,
  HintDisplayText,
  StreamDisplayText,
  CameraDisplayText,
} from '../displayText';

import { Hint, Overlay, selectErrorState, MatchIndicator } from '../shared';
import { LivenessClassNames } from '../types/classNames';
import { isDeviceUserFacing } from '../utils/device';
import {
  FaceLivenessErrorModal,
  renderErrorModal,
} from '../shared/FaceLivenessErrorModal';
import type { FaceLivenessDetectorComponents } from '../shared/DefaultStartScreenComponents';
import {
  DefaultPhotosensitiveWarning,
  DefaultCancelButton,
  DefaultRecordingIcon,
} from '../shared/DefaultStartScreenComponents';
import { FACE_MOVEMENT_CHALLENGE } from '../service/utils/constants';
import { CameraSelector } from './CameraSelector';

export const selectChallengeType = createLivenessSelector(
  (state) => state.context.parsedSessionInformation?.Challenge?.Name
);
export const selectVideoConstraints = createLivenessSelector(
  (state) => state.context.videoAssociatedParams?.videoConstraints
);
export const selectVideoStream = createLivenessSelector(
  (state) => state.context.videoAssociatedParams?.videoMediaStream
);
export const selectFaceMatchPercentage = createLivenessSelector(
  (state) => state.context.faceMatchAssociatedParams?.faceMatchPercentage
);
export const selectFaceMatchState = createLivenessSelector(
  (state) => state.context.faceMatchAssociatedParams?.faceMatchState
);
export const selectSelectedDeviceId = createLivenessSelector(
  (state) => state.context.videoAssociatedParams?.selectedDeviceId
);
export const selectSelectableDevices = createLivenessSelector(
  (state) => state.context.videoAssociatedParams?.selectableDevices
);

export interface LivenessCameraModuleProps {
  isMobileScreen: boolean;
  isRecordingStopped: boolean;
  instructionDisplayText: Required<InstructionDisplayText>;
  streamDisplayText: Required<StreamDisplayText>;
  hintDisplayText: Required<HintDisplayText>;
  errorDisplayText: Required<ErrorDisplayText>;
  cameraDisplayText: Required<CameraDisplayText>;
  components?: FaceLivenessDetectorComponents;
  testId?: string;
}

const showMatchIndicatorStates = [
  FaceMatchState.TOO_FAR,
  FaceMatchState.CANT_IDENTIFY,
  FaceMatchState.FACE_IDENTIFIED,
  FaceMatchState.OFF_CENTER,
];

/**
 * For now we want to memoize the HOC for MatchIndicator because to optimize renders
 * The LivenessCameraModule still needs to be optimized for re-renders and at that time
 * we should be able to remove this memoization
 */
const MemoizedMatchIndicator = React.memo(MatchIndicator);

export const LivenessCameraModule = (
  props: LivenessCameraModuleProps
): React.JSX.Element => {
  const {
    isMobileScreen,
    isRecordingStopped,
    instructionDisplayText,
    streamDisplayText,
    hintDisplayText,
    errorDisplayText,
    cameraDisplayText,
    components: customComponents,
    testId,
  } = props;

  const { cancelLivenessCheckText, recordingIndicatorText } = streamDisplayText;

  const {
    ErrorView = FaceLivenessErrorModal,
    PhotosensitiveWarning = DefaultPhotosensitiveWarning,
  } = customComponents ?? {};

  const [state, send] = useLivenessActor();

  const isFaceMovementChallenge =
    useLivenessSelector(selectChallengeType) === FACE_MOVEMENT_CHALLENGE.type;

  const videoStream = useLivenessSelector(selectVideoStream);
  const videoConstraints = useLivenessSelector(selectVideoConstraints);
  const selectedDeviceId = useLivenessSelector(selectSelectedDeviceId);
  const selectableDevices = useLivenessSelector(selectSelectableDevices);

  const faceMatchPercentage = useLivenessSelector(selectFaceMatchPercentage);
  const faceMatchState = useLivenessSelector(selectFaceMatchState);
  const errorState = useLivenessSelector(selectErrorState);

  const colorMode = useColorMode();

  const { videoRef, videoWidth, videoHeight } = useMediaStreamInVideo(
    videoStream!
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const freshnessColorRef = useRef<HTMLCanvasElement | null>(null);

  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const [isMetadataLoaded, setIsMetadataLoaded] = useState<boolean>(false);
  const [isCameraUserFacing, setIsCameraUserFacing] = useState<boolean>(true);
  const isInitCamera = state.matches('initCamera');
  const isInitWebsocket = state.matches('initWebsocket');
  const isCheckingCamera = state.matches({ initCamera: 'cameraCheck' });
  const isWaitingForCamera = state.matches({
    initCamera: 'waitForDOMAndCameraDetails',
  });
  const isStartView = state.matches('start') || state.matches('userCancel');
  const isDetectFaceBeforeStart = state.matches('detectFaceBeforeStart');
  const isRecording = state.matches('recording');
  const isCheckSucceeded = state.matches('checkSucceeded');
  const isFlashingFreshness = state.matches({
    recording: 'flashFreshnessColors',
  });

  // Android/Firefox and iOS flip the values of width/height returned from
  // getUserMedia, so we'll reset these in useLayoutEffect with the videoRef
  // element's intrinsic videoWidth and videoHeight attributes
  const [mediaWidth, setMediaWidth] =
    useState<UseMediaStreamInVideo['videoWidth']>(videoWidth);
  const [mediaHeight, setMediaHeight] =
    useState<UseMediaStreamInVideo['videoHeight']>(videoHeight);
  const [aspectRatio, setAspectRatio] = useState<number>(() =>
    videoWidth && videoHeight ? videoWidth / videoHeight : 0
  );

  // Only mobile device camera selection for no light challenge
  const hasMultipleDevices =
    !!selectableDevices?.length && selectableDevices.length > 1;
  const allowDeviceSelection =
    isStartView &&
    hasMultipleDevices &&
    (!isMobileScreen || isFaceMovementChallenge);

  React.useEffect(() => {
    async function checkCameraFacing() {
      const isUserFacing = await isDeviceUserFacing(selectedDeviceId);
      setIsCameraUserFacing(isUserFacing);
    }
    checkCameraFacing();
  }, [selectedDeviceId]);

  React.useEffect(() => {
    const shouldDrawOval =
      canvasRef?.current &&
      videoRef?.current &&
      videoStream &&
      isStartView &&
      isMetadataLoaded;

    if (shouldDrawOval) {
      drawStaticOval(canvasRef.current, videoRef.current!, videoStream);
    }

    const updateColorModeHandler = (e: MediaQueryListEvent) => {
      if (e.matches && shouldDrawOval) {
        drawStaticOval(canvasRef.current, videoRef.current!, videoStream);
      }
    };

    const darkModePreference = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );
    const lightModePreference = window.matchMedia(
      '(prefers-color-scheme: light)'
    );

    darkModePreference.addEventListener('change', updateColorModeHandler);
    lightModePreference.addEventListener('change', updateColorModeHandler);

    return () => {
      darkModePreference.removeEventListener('change', updateColorModeHandler);
      lightModePreference.addEventListener('change', updateColorModeHandler);
    };
  }, [videoRef, videoStream, colorMode, isStartView, isMetadataLoaded]);

  React.useLayoutEffect(() => {
    if (isCameraReady) {
      send({
        type: 'SET_DOM_AND_CAMERA_DETAILS',
        data: {
          videoEl: videoRef.current,
          canvasEl: canvasRef.current,
          freshnessColorEl: freshnessColorRef.current,
          isMobile: isMobileScreen,
        },
      });
    }

    if (videoRef.current) {
      setMediaWidth(videoRef.current.videoWidth);
      setMediaHeight(videoRef.current.videoHeight);
      setAspectRatio(
        videoRef.current.videoWidth / videoRef.current.videoHeight
      );
    }
  }, [send, videoRef, isCameraReady, isMobileScreen]);

  React.useEffect(() => {
    if (isDetectFaceBeforeStart) {
      clearOvalCanvas({ canvas: canvasRef.current! });
    }
  }, [isDetectFaceBeforeStart]);

  const photoSensitivityWarning = React.useMemo(() => {
    return (
      <View style={{ visibility: isStartView ? 'visible' : 'hidden' }}>
        <PhotosensitiveWarning
          bodyText={instructionDisplayText.photosensitivityWarningBodyText}
          headingText={
            instructionDisplayText.photosensitivityWarningHeadingText
          }
          infoText={instructionDisplayText.photosensitivityWarningInfoText}
          labelText={instructionDisplayText.photosensitivityWarningLabelText}
        />
      </View>
    );
  }, [PhotosensitiveWarning, instructionDisplayText, isStartView]);

  const handleMediaPlay = () => {
    setIsCameraReady(true);
  };

  const handleLoadedMetadata = () => {
    setIsMetadataLoaded(true);
  };

  const beginLivenessCheck = React.useCallback(() => {
    send({
      type: 'BEGIN',
    });
  }, [send]);

  const onCameraChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newDeviceId = e.target.value;
      const changeCamera = async () => {
        setIsMetadataLoaded(false);
        const newStream = await navigator.mediaDevices.getUserMedia({
          video: {
            ...videoConstraints,
            deviceId: { exact: newDeviceId },
          },
          audio: false,
        });
        send({
          type: 'UPDATE_DEVICE_AND_STREAM',
          data: { newDeviceId, newStream },
        });
      };
      changeCamera();
    },
    [videoConstraints, send]
  );

  if (isCheckingCamera) {
    return (
      <Flex
        justifyContent={'center'}
        className={LivenessClassNames.StartScreenCameraWaiting}
      >
        <Loader
          size="large"
          className={LivenessClassNames.CenteredLoader}
          data-testid="centered-loader"
          position="unset"
        />
        <Text
          fontSize="large"
          fontWeight="bold"
          data-testid="waiting-camera-permission"
          className={`${LivenessClassNames.StartScreenCameraWaiting}__text`}
        >
          {cameraDisplayText.waitingCameraPermissionText}
        </Text>
      </Flex>
    );
  }

  const shouldShowCenteredLoader = isInitCamera || isInitWebsocket;

  // We don't show full screen camera on the pre check screen (isStartView/isWaitingForCamera)
  const shouldShowFullScreenCamera =
    isMobileScreen && !isStartView && !shouldShowCenteredLoader;

  return (
    <>
      {!isFaceMovementChallenge && photoSensitivityWarning}

      {shouldShowCenteredLoader && (
        <Flex className={LivenessClassNames.ConnectingLoader}>
          <Loader
            size="large"
            className={LivenessClassNames.Loader}
            data-testid="centered-loader"
          />
          <Text className={LivenessClassNames.LandscapeErrorModalHeader}>
            {hintDisplayText.hintConnectingText}
          </Text>
        </Flex>
      )}

      <Flex
        className={classNames(
          LivenessClassNames.CameraModule,
          shouldShowFullScreenCamera &&
            `${LivenessClassNames.CameraModule}--mobile`
        )}
        data-testid={testId}
        gap="zero"
      >
        <Overlay
          horizontal="center"
          vertical={
            isRecording && !isFlashingFreshness ? 'start' : 'space-between'
          }
          className={LivenessClassNames.InstructionOverlay}
        >
          {isRecording && (
            <DefaultRecordingIcon
              recordingIndicatorText={recordingIndicatorText}
            />
          )}

          {!isStartView && !isWaitingForCamera && !isCheckSucceeded && (
            <DefaultCancelButton
              cancelLivenessCheckText={cancelLivenessCheckText}
            />
          )}

          <Flex
            className={classNames(
              LivenessClassNames.Hint,
              shouldShowFullScreenCamera && `${LivenessClassNames.Hint}--mobile`
            )}
          >
            <Hint hintDisplayText={hintDisplayText} />
          </Flex>

          {errorState && (
            <ErrorView
              onRetry={() => {
                send({ type: 'CANCEL' });
              }}
              displayText={errorDisplayText}
            >
              {renderErrorModal({
                errorState,
                overrideErrorDisplayText: errorDisplayText,
              })}
            </ErrorView>
          )}

          {/* 
              We only want to show the MatchIndicator when we're recording
              and when the face is in either the too far state, or the 
              initial face identified state. Using the a memoized MatchIndicator here
              so that even when this component re-renders the indicator is only
              re-rendered if the percentage prop changes.
            */}
          {isRecording &&
          !isFlashingFreshness &&
          showMatchIndicatorStates.includes(faceMatchState!) ? (
            <MemoizedMatchIndicator
              percentage={Math.ceil(faceMatchPercentage!)}
            />
          ) : null}
        </Overlay>

        <View
          as="canvas"
          ref={freshnessColorRef}
          className={LivenessClassNames.FreshnessCanvas}
          hidden
        />
        <View
          className={LivenessClassNames.VideoAnchor}
          style={{
            aspectRatio: `${aspectRatio}`,
          }}
        >
          <video
            ref={videoRef}
            muted
            autoPlay
            playsInline
            width={mediaWidth}
            height={mediaHeight}
            onCanPlay={handleMediaPlay}
            onLoadedMetadata={handleLoadedMetadata}
            data-testid="video"
            className={classNames(
              LivenessClassNames.Video,
              isCameraUserFacing && LivenessClassNames.UserFacingVideo,
              isRecordingStopped && LivenessClassNames.FadeOut
            )}
            aria-label={cameraDisplayText.a11yVideoLabelText}
          />
          <Flex
            className={classNames(
              LivenessClassNames.OvalCanvas,
              shouldShowFullScreenCamera &&
                `${LivenessClassNames.OvalCanvas}--mobile`,
              isRecordingStopped && LivenessClassNames.FadeOut
            )}
          >
            <View as="canvas" ref={canvasRef} />
          </Flex>

          {allowDeviceSelection ? (
            <CameraSelector
              onSelect={onCameraChange}
              devices={selectableDevices}
              deviceId={selectedDeviceId}
            />
          ) : null}
        </View>
      </Flex>

      {isStartView && (
        <Flex justifyContent="center">
          <Button
            variation="primary"
            type="button"
            onClick={beginLivenessCheck}
          >
            {instructionDisplayText.startScreenBeginCheckText}
          </Button>
        </Flex>
      )}
    </>
  );
};
