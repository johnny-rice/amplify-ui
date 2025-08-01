import React from 'react';
import { render } from '@testing-library/react';

import { LocationData } from '../../actions';
import * as StoreModule from '../../store';
import * as ViewsModule from '../../views';

import StorageBrowserDefault from '../StorageBrowserDefault';

jest.spyOn(ViewsModule, 'useViews').mockReturnValue({
  primary: {
    LocationsView: () => <div data-testid="LOCATIONS_VIEW" />,
    LocationDetailView: () => <div data-testid="LOCATION_DETAIL_VIEW" />,
    LocationActionView: () => <div data-testid="LOCATION_ACTION_VIEW" />,
  },
  action: {
    copy: () => <div />,
    createFolder: () => <div />,
    download: () => <div />,
    delete: () => <div />,
    upload: () => <div />,
  },
});

const useStoreSpy = jest.spyOn(StoreModule, 'useStore');

const location: LocationData = {
  id: 'an-id-👍🏼',
  bucket: 'test-bucket',
  permissions: ['list'],
  prefix: 'test-prefix/',
  type: 'PREFIX',
};

describe('StorageBrowserDefault', () => {
  afterEach(jest.clearAllMocks);

  it('renders the `LocationsView` by default', () => {
    useStoreSpy.mockReturnValueOnce([
      {
        actionType: undefined,
        location: { current: undefined },
      } as StoreModule.StoreState,
      jest.fn(),
    ]);
    const { getByTestId } = render(<StorageBrowserDefault />);

    expect(getByTestId('LOCATIONS_VIEW')).toBeInTheDocument();
  });

  it('renders the `LocationDetailView` when a location is selected', () => {
    useStoreSpy.mockReturnValueOnce([
      {
        actionType: undefined,
        location: { current: location },
      } as StoreModule.StoreState,
      jest.fn(),
    ]);

    const { getByTestId } = render(<StorageBrowserDefault />);

    expect(getByTestId('LOCATION_DETAIL_VIEW')).toBeInTheDocument();
  });

  it('renders the `LocationActionView` when an action is selected', () => {
    useStoreSpy.mockReturnValueOnce([
      {
        actionType: 'super-coll-action-type',
        location: { current: location },
      } as StoreModule.StoreState,
      jest.fn(),
    ]);
    const { getByTestId } = render(<StorageBrowserDefault />);

    expect(getByTestId('LOCATION_ACTION_VIEW')).toBeInTheDocument();
  });
});
