import { defaultHandlers } from '../handlers';

import type {
  CopyActionConfig,
  CreateFolderActionConfig,
  DeleteActionConfig,
  DownloadActionConfig,
  UploadActionConfig,
} from './types';

export const copyActionConfig: CopyActionConfig = {
  viewName: 'CopyView',
  actionListItem: {
    disable: (selected) => !selected || selected.length === 0,
    hide: (permissions) => !permissions.includes('write'),
    icon: 'copy-file',
    label: 'Copy',
  },
  handler: defaultHandlers.copy,
};

export const deleteActionConfig: DeleteActionConfig = {
  viewName: 'DeleteView',
  actionListItem: {
    disable: (selected) => !selected || selected.length === 0,
    hide: (permissions) => !permissions.includes('delete'),
    icon: 'delete-file',
    label: 'Delete',
  },
  handler: defaultHandlers.delete,
};

export const createFolderActionConfig: CreateFolderActionConfig = {
  viewName: 'CreateFolderView',
  actionListItem: {
    hide: (permissions) => !permissions.includes('write'),
    icon: 'create-folder',
    label: 'Create folder',
  },
  handler: defaultHandlers.createFolder,
};

export const uploadActionConfig: UploadActionConfig = {
  viewName: 'UploadView',
  actionListItem: {
    hide: (permissions) => !permissions.includes('write'),
    icon: 'upload-file',
    label: 'Upload',
  },
  handler: defaultHandlers.upload,
};

export const downloadActionConfig: DownloadActionConfig = {
  viewName: 'DownloadView',
  actionListItem: {
    disable: (selected) => !selected || selected.length === 0,
    hide: (permissions) => !permissions.includes('get'),
    icon: 'download',
    label: 'Download',
  },
  handler: defaultHandlers.download,
};

// Action view configs only, does not include `listLocationItems`
export const defaultActionViewConfigs = {
  copy: copyActionConfig,
  createFolder: createFolderActionConfig,
  download: downloadActionConfig,
  delete: deleteActionConfig,
  upload: uploadActionConfig,
};

export type DefaultActionViewType = keyof typeof defaultActionViewConfigs;

export const DEFAULT_ACTION_VIEW_TYPES = Object.keys(
  defaultActionViewConfigs
) as DefaultActionViewType[];

export const isDefaultActionViewType = (
  value?: string
): value is DefaultActionViewType =>
  DEFAULT_ACTION_VIEW_TYPES.some((type) => type === value);

export const defaultActionConfigs = {
  ...defaultActionViewConfigs,
  listLocationItems: defaultHandlers.listLocationItems,
};
