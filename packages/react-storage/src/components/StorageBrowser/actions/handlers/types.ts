import { LocationCredentialsProvider } from '../../storage-internal';

export type LocationType = 'OBJECT' | 'PREFIX' | 'BUCKET';

export type LocationPermissions = ('delete' | 'get' | 'list' | 'write')[];

/**
 * `location` metadata
 */
export interface LocationData {
  /**
   * `location` s3 bucket
   */
  bucket: string;

  /**
   * Unique identifier
   */
  id: string;

  /**
   * `location` permission granted to user
   */
  permissions: LocationPermissions;

  /**
   * `location` base prefix, delimited by `'/'`. Empty string indicates bucket root
   */
  prefix: string;

  /**
   * `location` grant scope
   *
   * @type "OBJECT" | "PREFIX" | "BUCKET"
   */
  type: LocationType;
}

export interface FolderData {
  key: string;
  id: string;
  type: 'FOLDER';
}

export interface FileData {
  eTag?: string;
  key: string;
  lastModified: Date;
  id: string;
  size: number;
  type: 'FILE';
}

export type LocationItemData = FileData | FolderData;

export interface FileDataItem extends FileData, TaskData {
  fileKey: string;
}

export interface FileItem extends TaskData {
  file: File;
}

export interface ActionInputConfig {
  accountId?: string;
  bucket: string;
  credentials: LocationCredentialsProvider;
  customEndpoint?: string;
  region: string;
}

interface ActionInput<T = any> {
  config: ActionInputConfig;
  prefix: string;
  options?: T;
}

export interface TaskData {
  key: string;
  id: string;
}

export interface TaskHandlerOptions<V = any> {
  onProgress?: (
    data: { key: string; id: string },
    progress: number | undefined
  ) => void;
  onSuccess?: (data: { key: string; id: string }, value: V) => void;
  onError?: (
    data: { key: string; id: string },
    message: string | undefined
  ) => void;
}

export interface TaskHandlerInput<
  T extends TaskData = TaskData,
  K extends TaskHandlerOptions = TaskHandlerOptions,
> {
  config: ActionInputConfig;
  data: T;
  options?: K;
}

export interface TaskHandlerOutput<K = any> {
  cancel?: () => void;
  result: Promise<{
    message?: string;
    status: 'CANCELED' | 'COMPLETE' | 'FAILED' | 'OVERWRITE_PREVENTED';
    value?: K;
  }>;
}

export type TaskHandler<T = any, K = any> = (input: T) => K;

export interface ListHandlerOptions<T = never> {
  exclude?: T;
  nextToken?: string;
  pageSize?: number;
}

export interface ListHandlerInput<T = any> extends ActionInput<T> {}

export interface ListHandlerOutput<T = any> {
  nextToken: string | undefined;
  items: T[];
}

export type ListHandler<T = any, K = any> = (input: T) => Promise<K>;

export interface ListLocationsExcludeOptions {
  exactPermissions?: LocationPermissions;
  type?: LocationType | LocationType[];
}
