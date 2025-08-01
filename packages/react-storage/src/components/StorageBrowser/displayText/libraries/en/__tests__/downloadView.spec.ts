import { ACTION_SCENARIOS } from './scenarios';
import { DEFAULT_DOWNLOAD_VIEW_DISPLAY_TEXT } from '../downloadView';

describe('DownloadView display text values', () => {
  it('should match snapshot values', () => {
    expect(DEFAULT_DOWNLOAD_VIEW_DISPLAY_TEXT).toMatchSnapshot();
  });

  it.each(ACTION_SCENARIOS)(
    '`getActionCompleteMessage` returns the expected values in the %s scenario',
    (_, counts) => {
      const { getActionCompleteMessage } = DEFAULT_DOWNLOAD_VIEW_DISPLAY_TEXT;

      expect(getActionCompleteMessage({ counts })).toMatchSnapshot();
    }
  );
});
