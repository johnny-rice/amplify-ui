import React from 'react';
import { act, render } from '@testing-library/react';

import * as UseCreateFolderViewModule from '../useCreateFolderView';
import { CreateFolderViewState } from '../types';

import { MessageProps } from '../../../../components';
import { ControlsContext } from '../../../../controls';
import { LocationData } from '../../../../actions';

import { CreateFolderView } from '../CreateFolderView';

const getActionCompleteMessage = jest.fn();
const getValidationMessage = jest.fn();
jest.mock('../../../../displayText', () => ({
  useDisplayText: () => ({
    CreateFolderView: { getActionCompleteMessage, getValidationMessage },
  }),
}));

const mockControlsContextProvider = jest.fn(
  (_: any) => 'ControlsContextProvider'
);

jest.mock('../../../../controls/context', () => ({
  ControlsContextProvider: (ctx: any) => mockControlsContextProvider(ctx),
  useControlsContext: () => ({ actionConfig: {}, data: {} }),
}));

const mockIsValidFolderName = jest.fn((_: string) => true);
jest.mock('../utils', () => ({
  isValidFolderName: (value: string) => mockIsValidFolderName(value),
}));

const current: LocationData = {
  id: 'an-id-👍🏼',
  bucket: 'test-bucket',
  permissions: ['write'],
  prefix: 'test-prefix/',
  type: 'PREFIX' as const,
};

const onActionStart = jest.fn();
const onActionExit = jest.fn();
const onFolderNameChange = jest.fn();

const folderNameId = 'some-id';

const defaultViewState: CreateFolderViewState = {
  folderName: '',
  folderNameId: folderNameId,
  isProcessing: false,
  isProcessingComplete: false,
  location: { current, key: 'test-prefix/', path: '' },
  onActionExit,
  onActionStart,
  onFolderNameChange,
  statusCounts: {
    CANCELED: 0,
    COMPLETE: 0,
    FAILED: 0,
    OVERWRITE_PREVENTED: 0,
    PENDING: 0,
    QUEUED: 3,
    TOTAL: 0,
  },
  tasks: [],
};

const preprocessingViewState: CreateFolderViewState = {
  ...defaultViewState,
  folderName: 'cool-folder-name',
};

const processingViewState: CreateFolderViewState = {
  ...preprocessingViewState,
  isProcessing: true,
  statusCounts: {
    ...preprocessingViewState.statusCounts,
    PENDING: 1,
    TOTAL: 1,
  },
};

const postProcessingViewState: CreateFolderViewState = {
  ...processingViewState,
  folderName: 'cool-folder-name',
  isProcessing: false,
  isProcessingComplete: true,
  statusCounts: {
    ...processingViewState.statusCounts,
    PENDING: 0,
    COMPLETE: 1,
  },
};

const useCreateFolderViewSpy = jest
  .spyOn(UseCreateFolderViewModule, 'useCreateFolderView')
  .mockReturnValue(defaultViewState);

describe('CreateFolderView', () => {
  afterEach(jest.clearAllMocks);

  it('has the expected composable components', () => {
    expect(CreateFolderView.Exit).toBeDefined();
    expect(CreateFolderView.NameField).toBeDefined();
    expect(CreateFolderView.Message).toBeDefined();
    expect(CreateFolderView.Start).toBeDefined();
    expect(CreateFolderView.Title).toBeDefined();
  });

  it('provides the expected values to `ControlsContextProvider` on initial render', () => {
    render(<CreateFolderView />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toMatchObject({
      data: {
        isActionStartDisabled: true,
        folderNameId,
        message: undefined,
      },
      onValidateFolderName: expect.any(Function),
    });
  });

  it('provides the expected values to `ControlsContextProvider` prior to processing', () => {
    useCreateFolderViewSpy.mockReturnValue(preprocessingViewState);
    render(<CreateFolderView />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toMatchObject({
      data: {
        isActionStartDisabled: false,
        folderNameId,
        message: undefined,
      },
      onValidateFolderName: expect.any(Function),
    });
  });

  it('provides the expected values to `ControlsContextProvider` while processing', () => {
    useCreateFolderViewSpy.mockReturnValue(processingViewState);
    render(<CreateFolderView />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toMatchObject({
      data: {
        isActionStartDisabled: true,
        folderNameId,
        message: undefined,
      },
      onValidateFolderName: expect.any(Function),
    });
  });

  it('provides the expected values to `ControlsContextProvider` post processing', () => {
    const mockMessage: MessageProps = { content: 'Success!', type: 'info' };
    getActionCompleteMessage.mockReturnValue(mockMessage);
    useCreateFolderViewSpy.mockReturnValue(postProcessingViewState);
    render(<CreateFolderView />);

    const { calls } = mockControlsContextProvider.mock;
    expect(calls).toHaveLength(1);
    expect(calls[0][0]).toMatchObject({
      data: {
        isActionStartDisabled: true,
        folderNameId,
        message: mockMessage,
      },
      onValidateFolderName: expect.any(Function),
    });
  });

  it('runs validation on call to onValidateFolderName', () => {
    useCreateFolderViewSpy.mockReturnValue(defaultViewState);

    mockIsValidFolderName.mockReturnValueOnce(false);

    render(<CreateFolderView />);

    const { calls } = mockControlsContextProvider.mock;

    const { onValidateFolderName } = calls[0][0] as ControlsContext;

    expect(mockIsValidFolderName).not.toHaveBeenCalled();

    act(() => {
      onValidateFolderName?.('');
    });

    expect(mockIsValidFolderName).toHaveBeenCalledTimes(1);
    // get validation error message
    expect(getValidationMessage).toHaveBeenCalledTimes(1);

    act(() => {
      onValidateFolderName?.('valid!');
    });

    expect(mockIsValidFolderName).toHaveBeenCalledTimes(2);
    // do not get validation error message
    expect(getValidationMessage).toHaveBeenCalledTimes(1);
  });
});
