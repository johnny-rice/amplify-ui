import type {
  LivenessOvalDetails,
  Face,
  BoundingBox,
  ErrorState,
  FaceMovementAndLightChallenge,
  ParsedSessionInformation,
  FaceDetection,
} from '../types';
import {
  IlluminationState,
  FaceMatchState,
  LivenessErrorState,
} from '../types';

import type { ColorSequence, SequenceColorValue } from './ColorSequenceDisplay';
import {
  FACE_HEIGHT_WEIGHT,
  OVAL_HEIGHT_WIDTH_RATIO,
  PUPIL_DISTANCE_WEIGHT,
} from './constants';

/**
 * Returns the random number between min and max
 * seeded with the provided random seed.
 */
function getScaledValueFromRandomSeed(
  randomSeed: number,
  min: number,
  max: number
): number {
  return randomSeed * (max - min) + min;
}

interface OvalBoundingBox {
  ovalBoundingBox: BoundingBox;
  minOvalX: number;
  maxOvalX: number;
  minOvalY: number;
  maxOvalY: number;
}

/**
 * Returns the bounding box details from an oval
 */
export function getOvalBoundingBox(
  ovalDetails: LivenessOvalDetails
): OvalBoundingBox {
  const minOvalX = ovalDetails.flippedCenterX - ovalDetails.width / 2;
  const maxOvalX = ovalDetails.flippedCenterX + ovalDetails.width / 2;
  const minOvalY = ovalDetails.centerY - ovalDetails.height / 2;
  const maxOvalY = ovalDetails.centerY + ovalDetails.height / 2;
  const ovalBoundingBox: BoundingBox = {
    left: minOvalX,
    top: minOvalY,
    right: maxOvalX,
    bottom: maxOvalY,
  };

  return { ovalBoundingBox, minOvalX, maxOvalX, minOvalY, maxOvalY };
}

/**
 * Returns the ratio of intersection and union of two bounding boxes.
 */
export function getIntersectionOverUnion(
  box1: BoundingBox,
  box2: BoundingBox
): number {
  const xA = Math.max(box1.left, box2.left);
  const yA = Math.max(box1.top, box2.top);
  const xB = Math.min(box1.right, box2.right);
  const yB = Math.min(box1.bottom, box2.bottom);

  const intersectionArea = Math.abs(
    Math.max(0, xB - xA) * Math.max(0, yB - yA)
  );

  if (intersectionArea === 0) {
    return 0;
  }

  const boxAArea = Math.abs(
    (box1.right - box1.left) * (box1.bottom - box1.top)
  );
  const boxBArea = Math.abs(
    (box2.right - box2.left) * (box2.bottom - box2.top)
  );

  return intersectionArea / (boxAArea + boxBArea - intersectionArea);
}

/**
 * Returns the details of a randomly generated liveness oval
 * from SDK
 */
export function getOvalDetailsFromSessionInformation({
  parsedSessionInformation,
  videoWidth,
}: {
  parsedSessionInformation: ParsedSessionInformation;
  videoWidth: number;
}): LivenessOvalDetails {
  const ovalParameters = parsedSessionInformation.Challenge!.OvalParameters;
  if (
    !ovalParameters ||
    !ovalParameters.CenterX ||
    !ovalParameters.CenterY ||
    !ovalParameters.Width ||
    !ovalParameters.Height
  ) {
    throw new Error('Oval parameters not returned from session information.');
  }

  // We need to include a flippedCenterX for visualizing the oval on a flipped camera view
  // The camera view we show the customer is flipped to making moving left and right more obvious
  // The video stream sent to the liveness service is not flipped
  return {
    flippedCenterX: videoWidth - ovalParameters.CenterX,
    centerX: ovalParameters.CenterX,
    centerY: ovalParameters.CenterY,
    width: ovalParameters.Width,
    height: ovalParameters.Height,
  };
}

/**
 * Returns the details of a statically generated liveness oval based on the video dimensions
 */
export function getStaticLivenessOvalDetails({
  width,
  height,
  widthSeed = 1.0,
  centerXSeed = 0.5,
  centerYSeed = 0.5,
  ratioMultiplier = 0.8,
  ovalHeightWidthRatio = OVAL_HEIGHT_WIDTH_RATIO,
}: {
  width: number;
  height: number;
  widthSeed?: number;
  centerXSeed?: number;
  centerYSeed?: number;
  ratioMultiplier?: number;
  ovalHeightWidthRatio?: number;
}): LivenessOvalDetails {
  const videoHeight = height;
  let videoWidth = width;

  const ovalRatio = widthSeed * ratioMultiplier;

  const minOvalCenterX = Math.floor((7 * width) / 16);
  const maxOvalCenterX = Math.floor((9 * width) / 16);
  const minOvalCenterY = Math.floor((7 * height) / 16);
  const maxOvalCenterY = Math.floor((9 * height) / 16);

  const centerX = getScaledValueFromRandomSeed(
    centerXSeed,
    minOvalCenterX,
    maxOvalCenterX
  );
  const centerY = getScaledValueFromRandomSeed(
    centerYSeed,
    minOvalCenterY,
    maxOvalCenterY
  );

  if (width >= height) {
    videoWidth = (3 / 4) * videoHeight;
  }

  const ovalWidth = ovalRatio * videoWidth;
  const ovalHeight = ovalHeightWidthRatio * ovalWidth;

  return {
    flippedCenterX: Math.floor(videoWidth - centerX),
    centerX: Math.floor(centerX),
    centerY: Math.floor(centerY),
    width: Math.floor(ovalWidth),
    height: Math.floor(ovalHeight),
  };
}

/**
 * Draws the provided liveness oval on the canvas.
 */
export function drawLivenessOvalInCanvas({
  canvas,
  oval,
  scaleFactor,
  videoEl,
  isStartScreen,
}: {
  canvas: HTMLCanvasElement;
  oval: LivenessOvalDetails;
  scaleFactor: number;
  videoEl: HTMLVideoElement;
  isStartScreen?: boolean;
}): void {
  const { flippedCenterX, centerY, width, height } = oval;

  const { width: canvasWidth, height: canvasHeight } =
    canvas.getBoundingClientRect();
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.restore();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // fill the canvas with a transparent rectangle
    ctx.fillStyle = isStartScreen
      ? getComputedStyle(canvas).getPropertyValue(
          '--amplify-colors-background-primary'
        )
      : '#fff';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // On mobile our canvas is the width/height of the full screen.
    // We need to calculate horizontal and vertical translation to reposition
    // our canvas drawing so the oval is still placed relative to the dimensions
    // of the video element.
    const baseDims = { width: videoEl.videoWidth, height: videoEl.videoHeight };

    const translate = {
      x: (canvasWidth - baseDims.width * scaleFactor) / 2,
      y: (canvasHeight - baseDims.height * scaleFactor) / 2,
    };
    // Set the transform to scale
    ctx.setTransform(scaleFactor, 0, 0, scaleFactor, translate.x, translate.y);

    // draw the oval path
    ctx.beginPath();
    ctx.ellipse(
      flippedCenterX,
      centerY,
      width / 2,
      height / 2,
      0,
      0,
      2 * Math.PI
    );

    // add stroke to the oval path
    ctx.strokeStyle = getComputedStyle(canvas).getPropertyValue(
      '--amplify-colors-border-secondary'
    );
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.save();
    ctx.clip();

    // Restore default canvas transform matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // clear the oval content from the rectangle
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  } else {
    throw new Error('Cannot find Canvas.');
  }
}

export function drawStaticOval(
  canvasEl: HTMLCanvasElement,
  videoEl: HTMLVideoElement,
  videoMediaStream: MediaStream
): void {
  const { width, height } = videoMediaStream.getTracks()[0].getSettings();

  // Get width/height of video element so we can compute scaleFactor
  // and set canvas width/height.
  const { width: videoScaledWidth, height: videoScaledHeight } =
    videoEl.getBoundingClientRect();

  canvasEl.width = Math.ceil(videoScaledWidth);
  canvasEl.height = Math.ceil(videoScaledHeight);

  const ovalDetails = getStaticLivenessOvalDetails({
    width: width!,
    height: height!,
    ratioMultiplier: 0.3,
  });
  ovalDetails.flippedCenterX = width! - ovalDetails.centerX;

  // Compute scaleFactor which is how much our video element is scaled
  // vs the intrinsic video resolution
  const scaleFactor = videoScaledWidth / videoEl.videoWidth;

  // Draw oval in canvas using ovalDetails and scaleFactor
  drawLivenessOvalInCanvas({
    canvas: canvasEl,
    oval: ovalDetails,
    scaleFactor,
    videoEl: videoEl,
    isStartScreen: true,
  });
}

export function clearOvalCanvas({
  canvas,
}: {
  canvas: HTMLCanvasElement;
}): void {
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.restore();
    ctx.clearRect(0, 0, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
  } else {
    throw new Error('Cannot find Canvas.');
  }
}

function getPupilDistanceAndFaceHeight(face: Face) {
  const { leftEye, rightEye, mouth } = face;

  const eyeCenter = [];
  eyeCenter[0] = (leftEye[0] + rightEye[0]) / 2;
  eyeCenter[1] = (leftEye[1] + rightEye[1]) / 2;

  const pupilDistance = Math.sqrt(
    (leftEye[0] - rightEye[0]) ** 2 + (leftEye[1] - rightEye[1]) ** 2
  );
  const faceHeight = Math.sqrt(
    (eyeCenter[0] - mouth[0]) ** 2 + (eyeCenter[1] - mouth[1]) ** 2
  );

  return { pupilDistance, faceHeight };
}

export function generateBboxFromLandmarks({
  ovalHeightWidthRatio = OVAL_HEIGHT_WIDTH_RATIO,
  face,
  oval,
  frameHeight,
}: {
  ovalHeightWidthRatio?: number;
  face: Face;
  oval: LivenessOvalDetails;
  frameHeight: number;
}): BoundingBox {
  const { leftEye, rightEye, nose, leftEar, rightEar } = face;
  const { height: ovalHeight, centerY } = oval;
  const ovalTop = centerY - ovalHeight / 2;

  const eyeCenter = [];
  eyeCenter[0] = (leftEye[0] + rightEye[0]) / 2;
  eyeCenter[1] = (leftEye[1] + rightEye[1]) / 2;

  const { pupilDistance: pd, faceHeight: fh } =
    getPupilDistanceAndFaceHeight(face);

  const ocularWidth =
    (PUPIL_DISTANCE_WEIGHT * pd + FACE_HEIGHT_WEIGHT * fh) / 2;

  let centerFaceX, centerFaceY: number;

  if (eyeCenter[1] <= (ovalTop + ovalHeight) / 2) {
    centerFaceX = (eyeCenter[0] + nose[0]) / 2;
    centerFaceY = (eyeCenter[1] + nose[1]) / 2;
  } else {
    // when face tilts down
    centerFaceX = eyeCenter[0];
    centerFaceY = eyeCenter[1];
  }

  const faceWidth = ocularWidth;
  const faceHeight = ovalHeightWidthRatio * faceWidth;

  const top = Math.max(centerFaceY - faceHeight / 2, 0);
  const bottom = Math.min(centerFaceY + faceHeight / 2, frameHeight);
  const left = Math.min(centerFaceX - ocularWidth / 2, rightEar[0]);
  const right = Math.max(centerFaceX + ocularWidth / 2, leftEar[0]);

  return { bottom, left, right, top };
}

/**
 * Returns the illumination state in the provided video frame.
 */
export function estimateIllumination(
  videoEl: HTMLVideoElement
): IlluminationState | undefined {
  const canvasEl = document.createElement('canvas');
  canvasEl.width = videoEl.videoWidth;
  canvasEl.height = videoEl.videoHeight;

  const ctx = canvasEl.getContext('2d');
  if (ctx) {
    ctx.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
    const frame = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height).data;

    // histogram
    const MAX_SCALE = 8;
    const hist = new Array(MAX_SCALE).fill(0) as number[];

    for (let i = 0; i < frame.length; i++) {
      const luma = Math.round(
        frame[i++] * 0.2126 + frame[i++] * 0.7152 + frame[i++] * 0.0722
      );
      hist[luma % 32]++;
    }

    let ind = -1,
      maxCount = 0;
    for (let i = 0; i < MAX_SCALE; i++) {
      if (hist[i] > maxCount) {
        maxCount = hist[i];
        ind = i;
      }
    }

    canvasEl.remove();

    if (ind === 0) return IlluminationState.DARK;
    if (ind === MAX_SCALE) return IlluminationState.BRIGHT;
    return IlluminationState.NORMAL;
  } else {
    throw new Error('Cannot find Video Element.');
  }
}

/**
 * Checks if the provided media device is a virtual camera.
 * @param device
 */
export function isCameraDeviceVirtual(device: MediaDeviceInfo): boolean {
  return device.label.toLowerCase().includes('virtual');
}

export const LivenessErrorStateStringMap = {
  [LivenessErrorState.CONNECTION_TIMEOUT]: 'CONNECTION_TIMEOUT',
  [LivenessErrorState.RUNTIME_ERROR]: 'RUNTIME_ERROR',
  [LivenessErrorState.SERVER_ERROR]: 'SERVER_ERROR',
  [LivenessErrorState.TIMEOUT]: 'TIMEOUT',
  [LivenessErrorState.FACE_DISTANCE_ERROR]: 'FACE_DISTANCE_ERROR',
  [LivenessErrorState.MULTIPLE_FACES_ERROR]: 'MULTIPLE_FACES_ERROR',
  [LivenessErrorState.CAMERA_FRAMERATE_ERROR]: 'CAMERA_FRAMERATE_ERROR',
  [LivenessErrorState.CAMERA_ACCESS_ERROR]: 'CAMERA_ACCESS_ERROR',
  [LivenessErrorState.MOBILE_LANDSCAPE_ERROR]: 'MOBILE_LANDSCAPE_ERROR',
  [LivenessErrorState.FRESHNESS_TIMEOUT]: 'FRESHNESS_TIMEOUT',
};

const INITIAL_ALPHA = 0.9;
const SECONDARY_ALPHA = 0.75;

function fillFractionalContext({
  ctx,
  prevColor,
  nextColor,
  fraction,
}: {
  ctx: CanvasRenderingContext2D;
  prevColor: string;
  nextColor: string;
  fraction: number;
}) {
  const canvasWidth = ctx.canvas.width;
  const canvasHeight = ctx.canvas.height;

  ctx.fillStyle = nextColor;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight * fraction);

  if (fraction !== 1) {
    ctx.fillStyle = prevColor;
    ctx.fillRect(
      0,
      canvasHeight * fraction,
      canvasWidth,
      canvasHeight * (1 - fraction)
    );
  }
}

interface FillOverlayCanvasFractionalInput {
  overlayCanvas: HTMLCanvasElement;
  prevColor: string;
  nextColor: string;
  videoEl: HTMLVideoElement;
  ovalDetails: LivenessOvalDetails;
  heightFraction: number;
  scaleFactor: number;
}

export function fillOverlayCanvasFractional({
  overlayCanvas,
  prevColor,
  nextColor,
  videoEl,
  ovalDetails,
  heightFraction,
  scaleFactor,
}: FillOverlayCanvasFractionalInput): void {
  const { x: videoX, y: videoY } = videoEl.getBoundingClientRect();

  const { flippedCenterX, centerY, width, height } = ovalDetails;

  const updatedCenterX = flippedCenterX * scaleFactor + videoX;
  const updatedCenterY = centerY * scaleFactor + videoY;

  const canvasWidth = overlayCanvas.width;
  const canvasHeight = overlayCanvas.height;
  const ctx = overlayCanvas.getContext('2d');

  if (ctx) {
    // Because the canvas is set to to 100% we need to manually set the height for the canvas to use pixel values
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // fill the complete canvas
    fillFractionalContext({
      ctx,
      prevColor,
      nextColor,
      fraction: heightFraction,
    });

    // save the current state
    ctx.save();

    // draw the rectangle path and fill it
    ctx.beginPath();
    ctx.rect(0, 0, canvasWidth, canvasHeight);
    ctx.clip();

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.globalAlpha = INITIAL_ALPHA;
    fillFractionalContext({
      ctx,
      prevColor,
      nextColor,
      fraction: heightFraction,
    });

    // draw the oval path and fill it
    ctx.beginPath();
    ctx.ellipse(
      updatedCenterX,
      updatedCenterY,
      (width * scaleFactor) / 2,
      (height * scaleFactor) / 2,
      0,
      0,
      2 * Math.PI
    );
    // add stroke to the oval path
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 8;
    ctx.stroke();
    ctx.clip();

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.globalAlpha = SECONDARY_ALPHA;
    fillFractionalContext({
      ctx,
      prevColor,
      nextColor,
      fraction: heightFraction,
    });

    // restore the state
    ctx.restore();
  } else {
    throw new Error('Cannot find Overlay Canvas.');
  }
}

const isColorSequence = (
  obj: ColorSequence | undefined
): obj is ColorSequence => !!obj;

export function getColorsSequencesFromSessionInformation(
  parsedSessionInformation: ParsedSessionInformation
): ColorSequence[] {
  const colorSequenceFromServerChallenge =
    (parsedSessionInformation.Challenge as FaceMovementAndLightChallenge)
      .ColorSequences ?? [];
  const colorSequences: (ColorSequence | undefined)[] =
    colorSequenceFromServerChallenge.map(
      ({
        FreshnessColor,
        DownscrollDuration: downscrollDuration,
        FlatDisplayDuration: flatDisplayDuration,
      }) => {
        const colorArray = FreshnessColor!.RGB!;
        const color: SequenceColorValue = `rgb(${colorArray[0]},${colorArray[1]},${colorArray[2]})`;
        return typeof color !== 'undefined' &&
          typeof downscrollDuration !== 'undefined' &&
          typeof flatDisplayDuration !== 'undefined'
          ? {
              color,
              downscrollDuration,
              flatDisplayDuration,
            }
          : undefined;
      }
    );

  return colorSequences.filter(isColorSequence);
}

export async function getFaceMatchState(
  faceDetector: FaceDetection,
  videoEl: HTMLVideoElement
): Promise<FaceMatchState> {
  const detectedFaces = await faceDetector.detectFaces(videoEl);
  let faceMatchState: FaceMatchState;

  switch (detectedFaces.length) {
    case 0: {
      //no face detected;
      faceMatchState = FaceMatchState.CANT_IDENTIFY;
      break;
    }
    case 1: {
      //exactly one face detected, match face with oval;
      faceMatchState = FaceMatchState.FACE_IDENTIFIED;
      break;
    }
    default: {
      //more than one face detected ;
      faceMatchState = FaceMatchState.TOO_MANY;
      break;
    }
  }

  return faceMatchState;
}

export async function isFaceDistanceBelowThreshold({
  parsedSessionInformation,
  faceDetector,
  videoEl,
  ovalDetails,
  reduceThreshold = false,
}: {
  parsedSessionInformation: ParsedSessionInformation;
  faceDetector: FaceDetection;
  videoEl: HTMLVideoElement;
  ovalDetails: LivenessOvalDetails;
  reduceThreshold?: boolean;
}): Promise<{
  isDistanceBelowThreshold: boolean;
  error?: ErrorState;
}> {
  const challengeConfig = parsedSessionInformation.Challenge!.ChallengeConfig;

  const { FaceDistanceThresholdMin, FaceDistanceThreshold } = challengeConfig!;

  const detectedFaces = await faceDetector.detectFaces(videoEl);
  let detectedFace: Face;

  let isDistanceBelowThreshold = false;
  let error: ErrorState | undefined;

  switch (detectedFaces.length) {
    case 0: {
      //no face detected;
      error = LivenessErrorState.FACE_DISTANCE_ERROR;
      break;
    }
    case 1: {
      //exactly one face detected, match face with oval;
      detectedFace = detectedFaces[0];

      const { width } = ovalDetails;
      const { pupilDistance, faceHeight } =
        getPupilDistanceAndFaceHeight(detectedFace);

      const calibratedPupilDistance =
        (PUPIL_DISTANCE_WEIGHT * pupilDistance +
          FACE_HEIGHT_WEIGHT * faceHeight) /
        2 /
        PUPIL_DISTANCE_WEIGHT;

      if (width) {
        isDistanceBelowThreshold =
          calibratedPupilDistance / width <
          (!reduceThreshold
            ? FaceDistanceThresholdMin!
            : FaceDistanceThreshold!);
        if (!isDistanceBelowThreshold) {
          error = LivenessErrorState.FACE_DISTANCE_ERROR;
        }
      }
      break;
    }
    default: {
      //more than one face detected
      error = LivenessErrorState.MULTIPLE_FACES_ERROR;
      break;
    }
  }

  return { isDistanceBelowThreshold, error };
}
