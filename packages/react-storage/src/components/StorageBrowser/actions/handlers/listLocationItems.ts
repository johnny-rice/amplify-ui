import type {
  StorageSubpathStrategy,
  ListPaginateInput,
  ListOutput,
} from '../../storage-internal';
import { list } from '../../storage-internal';
import type {
  ListHandler,
  ListHandlerInput,
  ListHandlerOptions,
  ListHandlerOutput,
  LocationItemData,
} from './types';

const DEFAULT_PAGE_SIZE = 1000;

type ListOutputItem = ListOutput['items'][number];

export type LocationItemType = LocationItemData['type'];

export interface ListLocationItemsHandlerOptions
  extends ListHandlerOptions<LocationItemType> {
  delimiter?: string;
  query?: string;
}

export interface ListLocationItemsHandlerInput
  extends ListHandlerInput<ListLocationItemsHandlerOptions> {}

export interface ListLocationItemsHandlerOutput
  extends ListHandlerOutput<LocationItemData> {}

export interface ListLocationItemsHandler
  extends ListHandler<
    ListLocationItemsHandlerInput,
    ListLocationItemsHandlerOutput
  > {}

const parseItems = (
  items: ListOutputItem[],
  excludedPath: string
): LocationItemData[] =>
  items
    // remove root `key` from results
    .filter(({ path }) => path !== excludedPath)
    .map(({ path: key, lastModified, size, eTag }) => {
      const id = crypto.randomUUID();
      // Mark zero byte files as Folders
      if (size === 0 && key.endsWith('/')) {
        return { key, id, type: 'FOLDER' };
      }

      return {
        key,
        id,
        eTag,
        lastModified: lastModified!,
        size: size!,
        type: 'FILE',
      };
    });

const parseExcludedPaths = (paths: string[] | undefined): LocationItemData[] =>
  paths?.map((key) => ({ key, id: crypto.randomUUID(), type: 'FOLDER' })) ?? [];

export const filterDotItems = (
  items: LocationItemData[],
  prefix: string
): LocationItemData[] =>
  items.filter((item) => {
    const key = (
      item.key.startsWith(prefix) ? item.key.substring(prefix.length) : item.key
    ).trim();
    // matches object keys that would cause problems either as folder names in navigation (`/`, `./`, `../`) or as objects (`.`, `..`)
    return !(
      key === '/' ||
      key === './' ||
      key === '../' ||
      key === '.' ||
      key === '..'
    );
  });

export const parseResult = (
  { excludedSubpaths, items }: ListOutput,
  prefix: string
): LocationItemData[] =>
  filterDotItems(
    [...parseExcludedPaths(excludedSubpaths), ...parseItems(items, prefix)],
    prefix
  );

export const listLocationItemsHandler: ListLocationItemsHandler = async (
  input
) => {
  const { config, prefix, options } = input;
  const {
    bucket: _bucket,
    credentials,
    customEndpoint,
    region,
    accountId,
  } = config;

  const {
    exclude,
    delimiter,
    nextToken,
    pageSize: _pageSize = DEFAULT_PAGE_SIZE,
    ..._options
  } = options ?? {};

  const bucket = { bucketName: _bucket, region };
  const subpathStrategy: StorageSubpathStrategy = {
    delimiter,
    strategy: delimiter ? 'exclude' : 'include',
  };

  // `ListObjectsV2` returns the root `key` on initial request which, when from
  // filtered from `results` by `parseResult`, creates a scenario where the
  // return count of `results` is one item less than the provided `pageSize`.
  // To mitigate, if a `pageSize` is provided and there are no previous `results`
  // or `refresh` is `true` increment the provided `pageSize` by `1`
  const hasOffset = !nextToken;
  const pageSize = hasOffset ? _pageSize + 1 : _pageSize;

  const result: LocationItemData[] = [];
  let nextNextToken = nextToken;

  do {
    const listInput: ListPaginateInput = {
      path: prefix,
      options: {
        nextToken: nextNextToken,
        ..._options,
        bucket,
        customEndpoint,
        expectedBucketOwner: accountId,
        locationCredentialsProvider: credentials,
        pageSize,
        subpathStrategy,
      },
    };

    const output = await list(listInput);
    nextNextToken = output.nextToken;

    const items = parseResult(output, prefix);

    result.push(
      ...(exclude ? items.filter((item) => item.type !== exclude) : items)
    );
  } while (nextNextToken && result.length < _pageSize);

  return { items: result, nextToken: nextNextToken };
};
