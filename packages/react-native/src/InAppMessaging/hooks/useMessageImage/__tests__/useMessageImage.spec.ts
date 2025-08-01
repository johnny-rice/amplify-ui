import { Image } from 'react-native';
import { renderHook, waitFor } from '@testing-library/react-native';
import { ConsoleLogger as Logger } from 'aws-amplify/utils';
import type { InAppMessageImage } from '@aws-amplify/ui-react-core-notifications';

import { getLayoutImageDimensions, prefetchNetworkImage } from '../utils';
import useMessageImage from '../useMessageImage';

jest.mock('react-native', () => ({
  Dimensions: { get: jest.fn(() => ({ height: 844, width: 400 })) },
  Image: { getSize: jest.fn() },
}));
jest.mock('../utils');

// use empty mockImplementation to turn off console output
const errorSpy = jest.spyOn(Logger.prototype, 'error').mockImplementation();

const src = 'https://test.jpeg';
const image = { src };

describe('useMessageImage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('behaves as expected in the happy path', async () => {
    const imageDimensions = { height: 100, width: 100 };
    (prefetchNetworkImage as jest.Mock).mockResolvedValue('loaded');
    (getLayoutImageDimensions as jest.Mock).mockReturnValueOnce(
      imageDimensions
    );
    (Image.getSize as jest.Mock).mockImplementationOnce(
      (_, onSuccess: () => void) => {
        onSuccess();
      }
    );

    const { result } = renderHook(() => useMessageImage(image, 'TOP_BANNER'));

    // first render
    expect(result.current).toStrictEqual({
      hasRenderableImage: false,
      imageDimensions: { height: undefined, width: undefined },
      isImageFetching: true,
    });

    await waitFor(() => {
      expect(result.current).toStrictEqual({
        hasRenderableImage: true,
        imageDimensions,
        isImageFetching: false,
      });
    });
  });

  it('handles size retrieval errors as expected', async () => {
    const error = 'ERROR';

    (prefetchNetworkImage as jest.Mock).mockResolvedValue('loaded');
    (Image.getSize as jest.Mock).mockImplementationOnce(
      (_, __, onError: (error: string) => void) => {
        onError(error);
      }
    );

    const { result } = renderHook(() => useMessageImage(image, 'TOP_BANNER'));

    // first render
    expect(result.current).toStrictEqual({
      hasRenderableImage: false,
      imageDimensions: { height: undefined, width: undefined },
      isImageFetching: true,
    });

    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalledWith(
        `Unable to retrieve size for image: ${error}`
      );
      expect(errorSpy).toHaveBeenCalledTimes(1);

      expect(result.current).toStrictEqual({
        hasRenderableImage: false,
        imageDimensions: { height: undefined, width: undefined },
        isImageFetching: false,
      });
    });
  });

  it('handles prefetching errors as expected', async () => {
    (prefetchNetworkImage as jest.Mock).mockResolvedValue('failed');

    const { result } = renderHook(() => useMessageImage(image, 'TOP_BANNER'));

    // first render
    expect(result.current).toStrictEqual({
      hasRenderableImage: false,
      imageDimensions: { height: undefined, width: undefined },
      isImageFetching: true,
    });

    await waitFor(() => {
      expect(errorSpy).not.toHaveBeenCalled();

      expect(result.current).toStrictEqual({
        hasRenderableImage: false,
        imageDimensions: { height: undefined, width: undefined },
        isImageFetching: false,
      });
    });
  });

  it('returns the expected values when the image argument is an empty object', () => {
    const { result } = renderHook(() =>
      useMessageImage({} as InAppMessageImage, 'TOP_BANNER')
    );

    expect(result.current).toStrictEqual({
      hasRenderableImage: false,
      imageDimensions: { height: undefined, width: undefined },
      isImageFetching: false,
    });
  });

  it('returns the expected values when the image argument is undefined', () => {
    const { result } = renderHook(() =>
      useMessageImage(undefined, 'TOP_BANNER')
    );

    expect(result.current).toStrictEqual({
      hasRenderableImage: false,
      imageDimensions: { height: undefined, width: undefined },
      isImageFetching: false,
    });
  });
});
