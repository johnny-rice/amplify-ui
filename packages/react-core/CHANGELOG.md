# @aws-amplify/ui-react-core

## 3.4.3

### Patch Changes

- [#6521](https://github.com/aws-amplify/amplify-ui/pull/6521) [`1002c52796c78243f836c3c0edc95edfe244f112`](https://github.com/aws-amplify/amplify-ui/commit/1002c52796c78243f836c3c0edc95edfe244f112) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(lint): add consistent import/export type eslint rules

- Updated dependencies [[`1002c52796c78243f836c3c0edc95edfe244f112`](https://github.com/aws-amplify/amplify-ui/commit/1002c52796c78243f836c3c0edc95edfe244f112)]:
  - @aws-amplify/ui@6.10.3

## 3.4.2

### Patch Changes

- [#6520](https://github.com/aws-amplify/amplify-ui/pull/6520) [`14a6df50e04b251aaf7a215ea2a84628303002ab`](https://github.com/aws-amplify/amplify-ui/commit/14a6df50e04b251aaf7a215ea2a84628303002ab) Thanks [@ashwinkumar6](https://github.com/ashwinkumar6)! - chore: update aws-amplify version

- [#6507](https://github.com/aws-amplify/amplify-ui/pull/6507) [`b8fefdba2281af164756963c32fc17f7210ff6de`](https://github.com/aws-amplify/amplify-ui/commit/b8fefdba2281af164756963c32fc17f7210ff6de) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(react-core): refactor and rename useDataState to useAsyncReducer

- Updated dependencies [[`14a6df50e04b251aaf7a215ea2a84628303002ab`](https://github.com/aws-amplify/amplify-ui/commit/14a6df50e04b251aaf7a215ea2a84628303002ab)]:
  - @aws-amplify/ui@6.10.2

## 3.4.1

### Patch Changes

- [#6504](https://github.com/aws-amplify/amplify-ui/pull/6504) [`e533dbbdade9d5ffdbd5aa7c446d958dd1980d43`](https://github.com/aws-amplify/amplify-ui/commit/e533dbbdade9d5ffdbd5aa7c446d958dd1980d43) Thanks [@calebpollman](https://github.com/calebpollman)! - feat(storage-browser): add defaultValue, value, and onValueChange props

  **Controlled `StorageBrowser`**

  ```tsx
  'use client';

  import React from 'react';
  import { useRouter, usePathname, useSearchParams } from 'next/navigation';

  import { StorageBrowser } from '@aws-amplify/ui-react-storage';
  import { StorageBrowserEventValue } from '@aws-amplify/ui-react-storage/browser';

  export default function Page() {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const value = params.get('value');

    const handleValueChange = React.useCallback(
      (nextValue: StorageBrowserEventValue) => {
        const nextParams = new URLSearchParams();
        nextParams.set('value', JSON.stringify(nextValue));

        router.push(`${pathname}?${nextParams.toString()}`);
      },
      [pathname, router]
    );

    return (
      <StorageBrowser
        onValueChange={handleValueChange}
        value={value ? JSON.parse(value) : null}
      />
    );
  }
  ```

  **Initialize with `defaultValue`**

  ```tsx
  'use client';

  import { StorageBrowser } from '@aws-amplify/ui-react-storage';
  import { useSearchParams } from 'next/navigation';

  export default function Page() {
    const params = useSearchParams();

    const value = params.get('value');

    return <StorageBrowser defaultValue={value ? JSON.parse(value) : null} />;
  }
  ```

- Updated dependencies [[`e4d8cc8c04dd428d38289085a9bf797b87c058a2`](https://github.com/aws-amplify/amplify-ui/commit/e4d8cc8c04dd428d38289085a9bf797b87c058a2), [`e533dbbdade9d5ffdbd5aa7c446d958dd1980d43`](https://github.com/aws-amplify/amplify-ui/commit/e533dbbdade9d5ffdbd5aa7c446d958dd1980d43)]:
  - @aws-amplify/ui@6.10.1

## 3.4.0

### Minor Changes

- [#6469](https://github.com/aws-amplify/amplify-ui/pull/6469) [`36c631a076b7d3d1aafc18a5854575e20e0592c2`](https://github.com/aws-amplify/amplify-ui/commit/36c631a076b7d3d1aafc18a5854575e20e0592c2) Thanks [@jjarvisp](https://github.com/jjarvisp)! - feat(authenticator): add support for email otp and select mfa type challenges

### Patch Changes

- Updated dependencies [[`36c631a076b7d3d1aafc18a5854575e20e0592c2`](https://github.com/aws-amplify/amplify-ui/commit/36c631a076b7d3d1aafc18a5854575e20e0592c2)]:
  - @aws-amplify/ui@6.10.0

## 3.3.5

### Patch Changes

- [#6445](https://github.com/aws-amplify/amplify-ui/pull/6445) [`75bf5408c195fa1745bc88f9329c29c66258f247`](https://github.com/aws-amplify/amplify-ui/commit/75bf5408c195fa1745bc88f9329c29c66258f247) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(react-core): update useDataState for RN compat

## 3.3.4

### Patch Changes

- Updated dependencies [[`e0fcb4322ab8af7e0699da577dc5fbcf9f7e56cc`](https://github.com/aws-amplify/amplify-ui/commit/e0fcb4322ab8af7e0699da577dc5fbcf9f7e56cc)]:
  - @aws-amplify/ui@6.9.1

## 3.3.3

### Patch Changes

- [#6382](https://github.com/aws-amplify/amplify-ui/pull/6382) [`e6248bd8dd8980b095826e6476b65e19af006960`](https://github.com/aws-amplify/amplify-ui/commit/e6248bd8dd8980b095826e6476b65e19af006960) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(react-core): ensure useDataState returns value of last dispatch

- Updated dependencies [[`81543cb38604a80ca2d8b93cfb7d1884d43e0a4f`](https://github.com/aws-amplify/amplify-ui/commit/81543cb38604a80ca2d8b93cfb7d1884d43e0a4f)]:
  - @aws-amplify/ui@6.9.0

## 3.3.2

### Patch Changes

- Updated dependencies [[`fa6984721124029cf2e7d5b4ac5a3cc6c34097a6`](https://github.com/aws-amplify/amplify-ui/commit/fa6984721124029cf2e7d5b4ac5a3cc6c34097a6)]:
  - @aws-amplify/ui@6.8.2

## 3.3.1

### Patch Changes

- Updated dependencies [[`272ec8e575718ea990dcb9f51d1baaf522f45fb6`](https://github.com/aws-amplify/amplify-ui/commit/272ec8e575718ea990dcb9f51d1baaf522f45fb6)]:
  - @aws-amplify/ui@6.8.1

## 3.3.0

### Minor Changes

- [#6296](https://github.com/aws-amplify/amplify-ui/pull/6296) [`8d2aa79b174d4e48aaca913bd568898b8c8975a2`](https://github.com/aws-amplify/amplify-ui/commit/8d2aa79b174d4e48aaca913bd568898b8c8975a2) Thanks [@calebpollman](https://github.com/calebpollman)! - feat(react): reenable react 19 support

### Patch Changes

- Updated dependencies [[`8757f03b7b1d761d9a13cfe29382a2208d4f3999`](https://github.com/aws-amplify/amplify-ui/commit/8757f03b7b1d761d9a13cfe29382a2208d4f3999), [`8d2aa79b174d4e48aaca913bd568898b8c8975a2`](https://github.com/aws-amplify/amplify-ui/commit/8d2aa79b174d4e48aaca913bd568898b8c8975a2)]:
  - @aws-amplify/ui@6.8.0

## 3.2.1

### Patch Changes

- [#6278](https://github.com/aws-amplify/amplify-ui/pull/6278) [`475e4a37a404bd116ec55e95579acb8f2d23c9a4`](https://github.com/aws-amplify/amplify-ui/commit/475e4a37a404bd116ec55e95579acb8f2d23c9a4) Thanks [@jordanvn](https://github.com/jordanvn)! - revert changes introduced for React 19 support

## 3.2.0

### Minor Changes

- [#5826](https://github.com/aws-amplify/amplify-ui/pull/5826) [`954e9be2d055a57ebddab5b902e3e6b427d09f67`](https://github.com/aws-amplify/amplify-ui/commit/954e9be2d055a57ebddab5b902e3e6b427d09f67) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(react): add support for React 19

### Patch Changes

- [#6255](https://github.com/aws-amplify/amplify-ui/pull/6255) [`825cccc92f5c326f0f110c8439a1c2c6553ff00a`](https://github.com/aws-amplify/amplify-ui/commit/825cccc92f5c326f0f110c8439a1c2c6553ff00a) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(react): remove direct usage of react-test-renderer and types

## 3.1.2

### Patch Changes

- Updated dependencies [[`96be188317d72b89b6bfbc14a3d4ee76daad2a8b`](https://github.com/aws-amplify/amplify-ui/commit/96be188317d72b89b6bfbc14a3d4ee76daad2a8b)]:
  - @aws-amplify/ui@6.7.2

## 3.1.1

### Patch Changes

- Updated dependencies [[`9ab56f499f4596062fe4614a016efc3dfc88ef03`](https://github.com/aws-amplify/amplify-ui/commit/9ab56f499f4596062fe4614a016efc3dfc88ef03)]:
  - @aws-amplify/ui@6.7.1

## 3.1.0

### Minor Changes

- [#6175](https://github.com/aws-amplify/amplify-ui/pull/6175) [`70971f310`](https://github.com/aws-amplify/amplify-ui/commit/70971f310f69717657849f29d0a9e1d993b08d9a) Thanks [@calebpollman](https://github.com/calebpollman)! - feat(storage-browser): add `StorageBrowser` and `createStorageBrowser`

  ```tsx
  import { Amplify } from 'aws-amplify';

  import { StorageBrowser } from '@aws-amplify/ui-react-storage';
  import '@aws-amplify/ui-react-storage/styles.css';

  import config from './aws-exports';

  Amplify.configure(config);

  function App() {
    return <StorageBrowser />;
  }
  ```

  ```tsx
  import { Amplify } from 'aws-amplify';

  import {
    createAmplifyAuthAdapter,
    createStorageBrowser,
  } from '@aws-amplify/ui-react-storage/browser';
  import '@aws-amplify/ui-react-storage/styles.css';

  import config from './aws-exports';

  Amplify.configure(config);

  const { StorageBrowser } = createStorageBrowser({
    config: createAmplifyAuthAdapter(),
  });

  function App() {
    return <StorageBrowser />;
  }
  ```

### Patch Changes

- Updated dependencies [[`70971f310`](https://github.com/aws-amplify/amplify-ui/commit/70971f310f69717657849f29d0a9e1d993b08d9a)]:
  - @aws-amplify/ui@6.7.0

## 3.0.30

### Patch Changes

- [#6145](https://github.com/aws-amplify/amplify-ui/pull/6145) [`90ea18ba0`](https://github.com/aws-amplify/amplify-ui/commit/90ea18ba076f884cad7f49b646f3f820e1b80c0e) Thanks [@dindjarinjs](https://github.com/dindjarinjs)! - chore: fix issue where drag and drop throws illegal invocation

- Updated dependencies [[`0d4d2b91c`](https://github.com/aws-amplify/amplify-ui/commit/0d4d2b91c84b2eb5e9365bb837855e5a9b4e3c06), [`24635cfd5`](https://github.com/aws-amplify/amplify-ui/commit/24635cfd5fb6b01bfd3bde1464c7064b2d1484c4)]:
  - @aws-amplify/ui@6.6.6

## 3.0.29

### Patch Changes

- [#5917](https://github.com/aws-amplify/amplify-ui/pull/5917) [`3655af2be`](https://github.com/aws-amplify/amplify-ui/commit/3655af2be54733d364e71d3c7f86f32d7bbcf811) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - chore(ai): adding UA string for AIConversation

- Updated dependencies [[`3655af2be`](https://github.com/aws-amplify/amplify-ui/commit/3655af2be54733d364e71d3c7f86f32d7bbcf811)]:
  - @aws-amplify/ui@6.6.5

## 3.0.28

### Patch Changes

- Updated dependencies [[`ac7cb271a`](https://github.com/aws-amplify/amplify-ui/commit/ac7cb271aff895e643fb5dc927030df9245b7c5b)]:
  - @aws-amplify/ui@6.6.4

## 3.0.27

### Patch Changes

- Updated dependencies [[`0d86485fc`](https://github.com/aws-amplify/amplify-ui/commit/0d86485fc4bf74766a1b82c69cfa322ed1e9baf7)]:
  - @aws-amplify/ui@6.6.3

## 3.0.26

### Patch Changes

- [#5849](https://github.com/aws-amplify/amplify-ui/pull/5849) [`22e285f58`](https://github.com/aws-amplify/amplify-ui/commit/22e285f5802e40b78c5a055a7384943c41252428) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(utils): prefer isFunction

- [#5830](https://github.com/aws-amplify/amplify-ui/pull/5830) [`545aa6a60`](https://github.com/aws-amplify/amplify-ui/commit/545aa6a608b68b9fb78f5df56da0e1e09b537d58) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(rollup): upgrade rollup deps, migrate to mjs config file, enforce linting on mjs files

- [#5853](https://github.com/aws-amplify/amplify-ui/pull/5853) [`87d74a7de`](https://github.com/aws-amplify/amplify-ui/commit/87d74a7deaa7d0cf393dfed3fb3cc85a3790c382) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(deps): remove @aws-amplify/core devDep from react-core

- Updated dependencies [[`22e285f58`](https://github.com/aws-amplify/amplify-ui/commit/22e285f5802e40b78c5a055a7384943c41252428), [`545aa6a60`](https://github.com/aws-amplify/amplify-ui/commit/545aa6a608b68b9fb78f5df56da0e1e09b537d58), [`87d74a7de`](https://github.com/aws-amplify/amplify-ui/commit/87d74a7deaa7d0cf393dfed3fb3cc85a3790c382)]:
  - @aws-amplify/ui@6.6.2

## 3.0.25

### Patch Changes

- [#5796](https://github.com/aws-amplify/amplify-ui/pull/5796) [`bf9dbc334`](https://github.com/aws-amplify/amplify-ui/commit/bf9dbc334293aff844a835e1717ee529e1abded3) Thanks [@esauerbo](https://github.com/esauerbo)! - chore(deps): Fix transitive dependencies.

- Updated dependencies [[`bf9dbc334`](https://github.com/aws-amplify/amplify-ui/commit/bf9dbc334293aff844a835e1717ee529e1abded3), [`3a677a1af`](https://github.com/aws-amplify/amplify-ui/commit/3a677a1afa60652fcd1a5adb734b9c94d4ba5c3d)]:
  - @aws-amplify/ui@6.6.1

## 3.0.24

### Patch Changes

- Updated dependencies [[`0ddeea9d4`](https://github.com/aws-amplify/amplify-ui/commit/0ddeea9d432f12621e0e32dae346e72881b790db), [`7a12237d2`](https://github.com/aws-amplify/amplify-ui/commit/7a12237d2c96107ef97d3c62d9d26d6b6f1d824c)]:
  - @aws-amplify/ui@6.6.0

## 3.0.23

### Patch Changes

- Updated dependencies [[`0ebf8b346`](https://github.com/aws-amplify/amplify-ui/commit/0ebf8b346bc744cd73e1e7891eafc07538d6419d)]:
  - @aws-amplify/ui@6.5.0

## 3.0.22

### Patch Changes

- Updated dependencies [[`9d96dd1fe`](https://github.com/aws-amplify/amplify-ui/commit/9d96dd1fe51212e8e55b0dde816122a6f5672762)]:
  - @aws-amplify/ui@6.4.1

## 3.0.21

### Patch Changes

- Updated dependencies [[`afffa89cb`](https://github.com/aws-amplify/amplify-ui/commit/afffa89cb29bb08ff1b626c727a2c9fb93bf11b3)]:
  - @aws-amplify/ui@6.4.0

## 3.0.20

### Patch Changes

- Updated dependencies [[`c3dfbe044`](https://github.com/aws-amplify/amplify-ui/commit/c3dfbe044fd18e084cd411ce0ff84dcab1a80224)]:
  - @aws-amplify/ui@6.3.0

## 3.0.19

### Patch Changes

- Updated dependencies [[`6e67ab6be`](https://github.com/aws-amplify/amplify-ui/commit/6e67ab6beb65e8ac7c7db6c6586df3c4f219bdbf), [`634815ff0`](https://github.com/aws-amplify/amplify-ui/commit/634815ff07defd89123963bab98f410c5e1fc9cd)]:
  - @aws-amplify/ui@6.2.0

## 3.0.18

### Patch Changes

- Updated dependencies [[`0919e55ba`](https://github.com/aws-amplify/amplify-ui/commit/0919e55ba6d5ec5f21fbf6d2062618c51b91c09b), [`50ef7ca8e`](https://github.com/aws-amplify/amplify-ui/commit/50ef7ca8e3d6ba116f587158c80ea08a5deeb868), [`d73bd9cc8`](https://github.com/aws-amplify/amplify-ui/commit/d73bd9cc84a2bd07c86d0c6937cbde35fc2c4bc2)]:
  - @aws-amplify/ui@6.1.0

## 3.0.17

### Patch Changes

- Updated dependencies [[`0483dd833`](https://github.com/aws-amplify/amplify-ui/commit/0483dd833698b518d1c88d98871cafb1b6019c75)]:
  - @aws-amplify/ui@6.0.17

## 3.0.16

### Patch Changes

- [#5258](https://github.com/aws-amplify/amplify-ui/pull/5258) [`dc1b3be5b`](https://github.com/aws-amplify/amplify-ui/commit/dc1b3be5bb7307a28c856547500384f9bee52d34) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(deps): update amplify scoped and RN dep versions

- Updated dependencies [[`dc1b3be5b`](https://github.com/aws-amplify/amplify-ui/commit/dc1b3be5bb7307a28c856547500384f9bee52d34)]:
  - @aws-amplify/ui@6.0.16

## 3.0.15

### Patch Changes

- Updated dependencies [[`1ca7c38e1`](https://github.com/aws-amplify/amplify-ui/commit/1ca7c38e15c5a7d307aa7e704b77d596167accb2), [`3af3e6b7a`](https://github.com/aws-amplify/amplify-ui/commit/3af3e6b7aca2914f67870b09fd5b2d81847f8e39), [`225bde836`](https://github.com/aws-amplify/amplify-ui/commit/225bde83640e9efba1b4edfce4696c74d6569b95), [`4b3f69917`](https://github.com/aws-amplify/amplify-ui/commit/4b3f6991706b774d45eb80beea2ddd606b21ce2a), [`bad0da7b9`](https://github.com/aws-amplify/amplify-ui/commit/bad0da7b9cc70069f504a37e80849b306b04f7d7), [`b92c34a99`](https://github.com/aws-amplify/amplify-ui/commit/b92c34a992b0f3d118711527360cdceeff503abb)]:
  - @aws-amplify/ui@6.0.15

## 3.0.14

### Patch Changes

- [#5193](https://github.com/aws-amplify/amplify-ui/pull/5193) [`de2402842`](https://github.com/aws-amplify/amplify-ui/commit/de2402842c75e186e2c5515d20cb1873bbabc4a0) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(aws-amplify): point amplify to 6.2.0

- [#5186](https://github.com/aws-amplify/amplify-ui/pull/5186) [`9ce5f9d88`](https://github.com/aws-amplify/amplify-ui/commit/9ce5f9d88dce131fe15870bda9545915e72e7e01) Thanks [@calebpollman](https://github.com/calebpollman)! - feat(@aws-amplify/ui-react-storage): Add handling for `aws-amplify/storage` improvements:

  **Update `StorageManager` to support differing usages of `path` prop** - existing: `accessLevel` prop provided with or without optional `path` prop - additive: no `accessLevel` prop provided with required `path` as either a `string` or a callback provided the current `identityId`

  Migrate from `accessLevel` to `path` as a `string`:

  ```diff
    <StorageManager
  -   accessLevel="guest"
  +   path="public/"
      maxFileCount={1}
    />
  ```

  Migrate from `accessLevel` to `path` as a callback:

  ```diff
    <StorageManager
  -   accessLevel="private"
  -   path="images/"
  +   path={({ identityId }) => `private/${identityId}/images/`}
      maxFileCount={1}
    />
  ```

  **Update `StorageImage` to support `path` prop**

  Migrate from `imagKey` and `accessLevel` to `path`:

  ```diff
    <StorageImage
  -   imgKey="cat.jpeg"
  -   accessLevel="public"
  +   path="public/cat.jpeg"
    />
  ```

- Updated dependencies [[`de2402842`](https://github.com/aws-amplify/amplify-ui/commit/de2402842c75e186e2c5515d20cb1873bbabc4a0)]:
  - @aws-amplify/ui@6.0.14

## 3.0.13

### Patch Changes

- [#5120](https://github.com/aws-amplify/amplify-ui/pull/5120) [`842c00ad4`](https://github.com/aws-amplify/amplify-ui/commit/842c00ad42701659228aea2fc526e34125a7e3d0) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(deps): update peerDep versions in public packages, point to 6.0.26 for examples and docs

- Updated dependencies [[`a26e9eb86`](https://github.com/aws-amplify/amplify-ui/commit/a26e9eb86b5e78cad0aaf6ee5230f46900b0a016), [`842c00ad4`](https://github.com/aws-amplify/amplify-ui/commit/842c00ad42701659228aea2fc526e34125a7e3d0)]:
  - @aws-amplify/ui@6.0.13

## 3.0.12

### Patch Changes

- Updated dependencies [[`3cc2f8fc1`](https://github.com/aws-amplify/amplify-ui/commit/3cc2f8fc121e818d68c7d10abc863eebd5620902), [`f64ea459e`](https://github.com/aws-amplify/amplify-ui/commit/f64ea459e5008ebb764697177958ee8307ce7542)]:
  - @aws-amplify/ui@6.0.12

## 3.0.11

### Patch Changes

- Updated dependencies [[`1d9c5c862`](https://github.com/aws-amplify/amplify-ui/commit/1d9c5c8629fd94b4e1b5fa045afe0dd1ccc1b21d), [`4eae32e91`](https://github.com/aws-amplify/amplify-ui/commit/4eae32e91ecc64b24a0092c4aee234b87420ce07), [`32702d9c9`](https://github.com/aws-amplify/amplify-ui/commit/32702d9c976e81b23b4e8f1c7e935b48288e058d)]:
  - @aws-amplify/ui@6.0.11

## 3.0.10

### Patch Changes

- Updated dependencies [[`80ad8cda6`](https://github.com/aws-amplify/amplify-ui/commit/80ad8cda66800f88150054fa51a7bbcdd0730566)]:
  - @aws-amplify/ui@6.0.10

## 3.0.9

### Patch Changes

- [#4978](https://github.com/aws-amplify/amplify-ui/pull/4978) [`7eeb0ae7c`](https://github.com/aws-amplify/amplify-ui/commit/7eeb0ae7c0ee651a0a2ec0e6e945732219dbacf2) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(Authenticator): update state machine to include onDone in federated sign in flow

- Updated dependencies [[`7eeb0ae7c`](https://github.com/aws-amplify/amplify-ui/commit/7eeb0ae7c0ee651a0a2ec0e6e945732219dbacf2)]:
  - @aws-amplify/ui@6.0.9

## 3.0.8

### Patch Changes

- Updated dependencies [[`0f767c7fa`](https://github.com/aws-amplify/amplify-ui/commit/0f767c7fa9d106e8be34aa53edd9f5afe064ac6a), [`9dc52eb1b`](https://github.com/aws-amplify/amplify-ui/commit/9dc52eb1b2f4ad8c1f2956c7ad8a5073cf203172), [`d61690d01`](https://github.com/aws-amplify/amplify-ui/commit/d61690d0170eba69b23a785832e107db05a038ca)]:
  - @aws-amplify/ui@6.0.8

## 3.0.7

### Patch Changes

- Updated dependencies [[`ad070697b`](https://github.com/aws-amplify/amplify-ui/commit/ad070697ba81871e26905d08f049b3486a0ce6f9), [`067e2b1cf`](https://github.com/aws-amplify/amplify-ui/commit/067e2b1cf435db2acb1c25ca3e50a65b53478530), [`7b0666036`](https://github.com/aws-amplify/amplify-ui/commit/7b0666036863f47417959aeaa054a84a35cdbea9)]:
  - @aws-amplify/ui@6.0.7

## 3.0.6

### Patch Changes

- [#4777](https://github.com/aws-amplify/amplify-ui/pull/4777) [`4f643b05b`](https://github.com/aws-amplify/amplify-ui/commit/4f643b05b010901226bf200f8d0b06601d0ecab5) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(ui): fix defaultAuthHubListener unit tests, remove asynchronous declaration

- Updated dependencies [[`4f643b05b`](https://github.com/aws-amplify/amplify-ui/commit/4f643b05b010901226bf200f8d0b06601d0ecab5), [`190bf28d1`](https://github.com/aws-amplify/amplify-ui/commit/190bf28d1b570329f415d2d4c03e608a3b30412b)]:
  - @aws-amplify/ui@6.0.6

## 3.0.5

### Patch Changes

- Updated dependencies [[`38bae5ee5`](https://github.com/aws-amplify/amplify-ui/commit/38bae5ee522bf572cc065953b2a94710e6913cc2)]:
  - @aws-amplify/ui@6.0.5

## 3.0.4

### Patch Changes

- Updated dependencies [[`c526cf53b`](https://github.com/aws-amplify/amplify-ui/commit/c526cf53bc07bb85c0789aa5edfdfcb4485fa5f5), [`cc2740b9a`](https://github.com/aws-amplify/amplify-ui/commit/cc2740b9a033e587715a37c379166388b267ff4e)]:
  - @aws-amplify/ui@6.0.4

## 3.0.3

### Patch Changes

- Updated dependencies [[`ed55a6a36`](https://github.com/aws-amplify/amplify-ui/commit/ed55a6a36b9250db50e3edaf31b53ce4fc35edfe), [`272a05edc`](https://github.com/aws-amplify/amplify-ui/commit/272a05edcafa8f9e0e53ed1eb66f566f308d09b3)]:
  - @aws-amplify/ui@6.0.3

## 3.0.2

### Patch Changes

- Updated dependencies [[`4ff26e27e`](https://github.com/aws-amplify/amplify-ui/commit/4ff26e27e4bc8909cc2b86c738eca5085b2a42d1), [`bb141a719`](https://github.com/aws-amplify/amplify-ui/commit/bb141a719fd9bc2d7680e539f2ff047deb88ee7e)]:
  - @aws-amplify/ui@6.0.2

## 3.0.1

### Patch Changes

- Updated dependencies [[`9dd0e58e5`](https://github.com/aws-amplify/amplify-ui/commit/9dd0e58e5167d307c2154b3280de3c0e52f607e1)]:
  - @aws-amplify/ui@6.0.1

## 3.0.0

### Major Changes

- Major version bump for all Amplify UI packages due to uprade of peerDependency aws-amplify to v6

### Patch Changes

- [#4716](https://github.com/aws-amplify/amplify-ui/pull/4716) [`5bd721183`](https://github.com/aws-amplify/amplify-ui/commit/5bd72118342c4a3040c13e923024d476a643a795) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(deps): upgrade aws-amplify deps

- Updated dependencies [[`55d1f4940`](https://github.com/aws-amplify/amplify-ui/commit/55d1f49401359bb0b75756742658b173edc0fb72), [`7b55f4f78`](https://github.com/aws-amplify/amplify-ui/commit/7b55f4f781c3adab19c3d91ef9f293647566ecd9), [`27783d65a`](https://github.com/aws-amplify/amplify-ui/commit/27783d65a06e712bb3ca8c116798a52db3d4a3a4), [`59c042c17`](https://github.com/aws-amplify/amplify-ui/commit/59c042c170358c6cc2ca09d13ffcc7e517586ef2), [`91372387c`](https://github.com/aws-amplify/amplify-ui/commit/91372387c29f5d68526070e4c3b8a13bbf079e5c), [`f9e4fa838`](https://github.com/aws-amplify/amplify-ui/commit/f9e4fa8388a1994996a132f50261f431d1a52e43), [`27be6ccf5`](https://github.com/aws-amplify/amplify-ui/commit/27be6ccf51ce093d3589f9f36b4530e6825a317b), [`5bd721183`](https://github.com/aws-amplify/amplify-ui/commit/5bd72118342c4a3040c13e923024d476a643a795)]:
  - @aws-amplify/ui@6.0.0

## 2.1.33

### Patch Changes

- Updated dependencies [[`d570694c7`](https://github.com/aws-amplify/amplify-ui/commit/d570694c7e0d9d112449d3aade2d567773555926), [`6a5a4d79c`](https://github.com/aws-amplify/amplify-ui/commit/6a5a4d79ce60124fba2dc00d86b9e1a9b5f21c39)]:
  - @aws-amplify/ui@5.8.1

## 2.1.32

### Patch Changes

- [#4381](https://github.com/aws-amplify/amplify-ui/pull/4381) [`5bc0c8a32`](https://github.com/aws-amplify/amplify-ui/commit/5bc0c8a32d1552313df496f96b96738637d0b157) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(ui-react-core): add named returned values to createContextUtilities

- Updated dependencies [[`276968530`](https://github.com/aws-amplify/amplify-ui/commit/276968530ba1049cfa4a9fd1efe8bd870b3e4b18), [`ec495a6f6`](https://github.com/aws-amplify/amplify-ui/commit/ec495a6f638c53970edd8706a0eeb5f95d142689), [`e1fc61119`](https://github.com/aws-amplify/amplify-ui/commit/e1fc61119224a92a4648d1d1673177647b1a8e53), [`14e402b6e`](https://github.com/aws-amplify/amplify-ui/commit/14e402b6eedab6bdef5cec21b0b084f230b0ce26), [`2407ac294`](https://github.com/aws-amplify/amplify-ui/commit/2407ac294270214bd20c414349d2423ab14b8066), [`64fba0fd2`](https://github.com/aws-amplify/amplify-ui/commit/64fba0fd2ec4a0c5061b461f527c8a45235eee13)]:
  - @aws-amplify/ui@5.8.0

## 2.1.31

### Patch Changes

- Updated dependencies [[`5cc76794a`](https://github.com/aws-amplify/amplify-ui/commit/5cc76794a71584e26b1ec699c1dc1713d8a986c9)]:
  - @aws-amplify/ui@5.7.2

## 2.1.30

### Patch Changes

- [#4331](https://github.com/aws-amplify/amplify-ui/pull/4331) [`54d884dd0`](https://github.com/aws-amplify/amplify-ui/commit/54d884dd0ae7f16cc1f5b71ae767e0ccf477c4b5) Thanks [@calebpollman](https://github.com/calebpollman)! - feat(ui-react-core): add createContextUtilities

- Updated dependencies [[`00c7abc25`](https://github.com/aws-amplify/amplify-ui/commit/00c7abc25b263bb42b67d8980b31212d0a206d1c), [`54d884dd0`](https://github.com/aws-amplify/amplify-ui/commit/54d884dd0ae7f16cc1f5b71ae767e0ccf477c4b5), [`5040faf51`](https://github.com/aws-amplify/amplify-ui/commit/5040faf51ce2dc87882d452e6f90ad4ab0bd6967)]:
  - @aws-amplify/ui@5.7.1

## 2.1.29

### Patch Changes

- [#4321](https://github.com/aws-amplify/amplify-ui/pull/4321) [`d0d9ac2de`](https://github.com/aws-amplify/amplify-ui/commit/d0d9ac2de9714c5e3d020bdac486291c50761441) Thanks [@thaddmt](https://github.com/thaddmt)! - chore: set amplify dependencies to be ^ instead of >=

- Updated dependencies [[`d0d9ac2de`](https://github.com/aws-amplify/amplify-ui/commit/d0d9ac2de9714c5e3d020bdac486291c50761441), [`30624bd4f`](https://github.com/aws-amplify/amplify-ui/commit/30624bd4f165ed07a1cc94071a2d5550510b07b7)]:
  - @aws-amplify/ui@5.7.0

## 2.1.28

### Patch Changes

- Updated dependencies [[`e7e75874d`](https://github.com/aws-amplify/amplify-ui/commit/e7e75874dea238046c94e4fdd965029620171254), [`0417bd41c`](https://github.com/aws-amplify/amplify-ui/commit/0417bd41c065673eb70dd916c9008d88671445c9)]:
  - @aws-amplify/ui@5.6.9

## 2.1.27

### Patch Changes

- Updated dependencies [[`6b71ec46c`](https://github.com/aws-amplify/amplify-ui/commit/6b71ec46ccbf63c4605c9a57d3ecff098a42938a)]:
  - @aws-amplify/ui@5.6.8

## 2.1.26

### Patch Changes

- [#4107](https://github.com/aws-amplify/amplify-ui/pull/4107) [`6d14bf3f3`](https://github.com/aws-amplify/amplify-ui/commit/6d14bf3f386523bacd6832e56cc5903f644da88e) Thanks [@ioanabrooks](https://github.com/ioanabrooks)! - chore(ui-react-native): Add Authenticator fields validations

- Updated dependencies [[`78fdfd6c8`](https://github.com/aws-amplify/amplify-ui/commit/78fdfd6c8268c56204f905402162ad8cb40a0c8e), [`d3ee05415`](https://github.com/aws-amplify/amplify-ui/commit/d3ee054159e1de81861bcd9273be9b1c87924cf4), [`165a8abbd`](https://github.com/aws-amplify/amplify-ui/commit/165a8abbda8aa3e95fb9466fc60f8694c646d5bc), [`13098b36a`](https://github.com/aws-amplify/amplify-ui/commit/13098b36a75452d839955d141bd25f57538b1a22), [`37e490d39`](https://github.com/aws-amplify/amplify-ui/commit/37e490d3997a1dc55e2998c277790945921e6dc3), [`aea82ff1b`](https://github.com/aws-amplify/amplify-ui/commit/aea82ff1bb6e066ed8b70433f4d72cd34bf0ccae)]:
  - @aws-amplify/ui@5.6.7

## 2.1.25

### Patch Changes

- [#4168](https://github.com/aws-amplify/amplify-ui/pull/4168) [`d930e2ed1`](https://github.com/aws-amplify/amplify-ui/commit/d930e2ed17f3e638e2b62699ba2dd164b32f8118) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(RWA/RNA): deprecate passwordSettings prop

- Updated dependencies [[`b0e16e78c`](https://github.com/aws-amplify/amplify-ui/commit/b0e16e78c6a41945aa79f3e14fa3f9e6cb0e5e76), [`d930e2ed1`](https://github.com/aws-amplify/amplify-ui/commit/d930e2ed17f3e638e2b62699ba2dd164b32f8118)]:
  - @aws-amplify/ui@5.6.6

## 2.1.24

### Patch Changes

- [#4013](https://github.com/aws-amplify/amplify-ui/pull/4013) [`23180b470`](https://github.com/aws-amplify/amplify-ui/commit/23180b470c7b3b78a5970d00f8c2dc5ce8773eff) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(ui-react-native): disable Authenticator submit button on invalid form

- Updated dependencies [[`3cecd0765`](https://github.com/aws-amplify/amplify-ui/commit/3cecd0765b46c77c49af24fae7cfb9054ebe2cdb)]:
  - @aws-amplify/ui@5.6.5

## 2.1.23

### Patch Changes

- [#3901](https://github.com/aws-amplify/amplify-ui/pull/3901) [`7f59b3c4d`](https://github.com/aws-amplify/amplify-ui/commit/7f59b3c4dd27205a35c1b07ddc0f06a0db9de776) Thanks [@sreeramsama](https://github.com/sreeramsama)! - - Adds new `ui-react-core-notifications` package for utilities related to the Notifications category, and new `ui-react-notifications` package for components like InAppMessaging. Also sets deprecation messages for `InAppMessagingDisplay`, `InAppMessagingProvider` and `useInAppMessaging` in `ui-react` package as they will be moved out in a future breaking change release.
  - Adds new `ui-react-geo` package for Geo related components like `MapView` and `LocationSearch`. They will be moved out from `ui-react` in a future breaking change release.
- Updated dependencies [[`ca591a2fc`](https://github.com/aws-amplify/amplify-ui/commit/ca591a2fc319556f705be74bacd141d48f3531bd)]:
  - @aws-amplify/ui@5.6.4

## 2.1.22

### Patch Changes

- Updated dependencies [[`62425139f`](https://github.com/aws-amplify/amplify-ui/commit/62425139fb5e41a3b36b46aac1d31b965a2739fc)]:
  - @aws-amplify/ui@5.6.3

## 2.1.21

### Patch Changes

- [#3806](https://github.com/aws-amplify/amplify-ui/pull/3806) [`998a8c74f`](https://github.com/aws-amplify/amplify-ui/commit/998a8c74ff42c250d0d028efb20afa2d54528c86) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(ui): add event callbacks to defaultAuthHubHandler

- [#3836](https://github.com/aws-amplify/amplify-ui/pull/3836) [`82f3968b7`](https://github.com/aws-amplify/amplify-ui/commit/82f3968b7f750f069bda4ad7bfa9c34d7ee6091f) Thanks [@zchenwei](https://github.com/zchenwei)! - chore: add `types` field to `exports` in `package.json` for `@aws-amplify/ui-react-core` and `@aws-amplify/ui-vue`

- Updated dependencies [[`998a8c74f`](https://github.com/aws-amplify/amplify-ui/commit/998a8c74ff42c250d0d028efb20afa2d54528c86)]:
  - @aws-amplify/ui@5.6.2

## 2.1.20

### Patch Changes

- Updated dependencies [[`4ca838978`](https://github.com/aws-amplify/amplify-ui/commit/4ca838978d23a086f80859a7cb57f184ff49e2d4), [`d6a3676f2`](https://github.com/aws-amplify/amplify-ui/commit/d6a3676f2295ed39fa83b9d31a9540f3437ba129), [`37d63424e`](https://github.com/aws-amplify/amplify-ui/commit/37d63424e23e971713f76d201ce829ec6974fc54)]:
  - @aws-amplify/ui@5.6.1

## 2.1.19

### Patch Changes

- Updated dependencies [[`bc3fd6d95`](https://github.com/aws-amplify/amplify-ui/commit/bc3fd6d951b1ab1b188722f59ce04118d04d16af), [`747516159`](https://github.com/aws-amplify/amplify-ui/commit/747516159d504b551dab09cbe8f214fa7b4505df)]:
  - @aws-amplify/ui@5.6.0

## 2.1.18

### Patch Changes

- Updated dependencies [[`fefc4cb3d`](https://github.com/aws-amplify/amplify-ui/commit/fefc4cb3df12d344792b33ad100c6252c9fa2819)]:
  - @aws-amplify/ui@5.5.10

## 2.1.17

### Patch Changes

- Updated dependencies [[`5ee48f997`](https://github.com/aws-amplify/amplify-ui/commit/5ee48f99780ba5df889c1d66f24a0ebc9f601125)]:
  - @aws-amplify/ui@5.5.9

## 2.1.16

### Patch Changes

- Updated dependencies [[`ee2c6981e`](https://github.com/aws-amplify/amplify-ui/commit/ee2c6981e19413f0d9a9fd093d14be934ae5d63b), [`9cc835828`](https://github.com/aws-amplify/amplify-ui/commit/9cc8358284be497e67911c335dfda76c8f41bf98)]:
  - @aws-amplify/ui@5.5.8

## 2.1.15

### Patch Changes

- [#3497](https://github.com/aws-amplify/amplify-ui/pull/3497) [`5249a450d`](https://github.com/aws-amplify/amplify-ui/commit/5249a450dcd07487188fc57d5b6b04dbf52e1970) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(tsconfig): add configs directory and ts configuration

- Updated dependencies [[`a55aa4584`](https://github.com/aws-amplify/amplify-ui/commit/a55aa4584dd9aba4e97d4e36acc289238710d30e), [`6501852a7`](https://github.com/aws-amplify/amplify-ui/commit/6501852a7916cc2afb90bfb52461877c1e637b99), [`50fbe91de`](https://github.com/aws-amplify/amplify-ui/commit/50fbe91defab6172c09eb03c71671a5cc5f4d265), [`5249a450d`](https://github.com/aws-amplify/amplify-ui/commit/5249a450dcd07487188fc57d5b6b04dbf52e1970)]:
  - @aws-amplify/ui@5.5.7

## 2.1.14

### Patch Changes

- Updated dependencies [[`3c5fef84c`](https://github.com/aws-amplify/amplify-ui/commit/3c5fef84cb6ad0cb830416e70028c0bb313dd99c), [`e08e62234`](https://github.com/aws-amplify/amplify-ui/commit/e08e6223473f56cbbc2d0ce4bab85ebd1caf020c), [`12d166209`](https://github.com/aws-amplify/amplify-ui/commit/12d166209b91ee94661e586a2f77e9fbf75b3d64), [`e283f14ca`](https://github.com/aws-amplify/amplify-ui/commit/e283f14cadf54c6f6ab7e729151ea5fe97776c6a), [`d28e31c36`](https://github.com/aws-amplify/amplify-ui/commit/d28e31c36a243d04737b6c13ce0307495680498a), [`c3116b894`](https://github.com/aws-amplify/amplify-ui/commit/c3116b89470587c127d53a5cb370b2574bde553a)]:
  - @aws-amplify/ui@5.5.6

## 2.1.13

### Patch Changes

- Updated dependencies [[`0c8fa2ac2`](https://github.com/aws-amplify/amplify-ui/commit/0c8fa2ac2b89e7617bbc601f29cc9cbf902d08ae), [`d214551f0`](https://github.com/aws-amplify/amplify-ui/commit/d214551f0edb001878f7a04b4206c57a677ecfa8)]:
  - @aws-amplify/ui@5.5.5

## 2.1.12

### Patch Changes

- Updated dependencies [[`bebe7b1cb`](https://github.com/aws-amplify/amplify-ui/commit/bebe7b1cb6a5efe1111eae237fedfabdd07ca7fc), [`7435b53fd`](https://github.com/aws-amplify/amplify-ui/commit/7435b53fd1a3303e2db0b74bf69b67fe41687563)]:
  - @aws-amplify/ui@5.5.4

## 2.1.11

### Patch Changes

- [#3333](https://github.com/aws-amplify/amplify-ui/pull/3333) [`4ba0fb5c1`](https://github.com/aws-amplify/amplify-ui/commit/4ba0fb5c13484a36c8f44be5eb41313bf3d676cc) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(authenticator): migrate totpSecretCode generation to state machine

- [#3287](https://github.com/aws-amplify/amplify-ui/pull/3287) [`412538be9`](https://github.com/aws-amplify/amplify-ui/commit/412538be9e37a8dec7cb5e57281895a5b3b63184) Thanks [@zchenwei](https://github.com/zchenwei)! - build: updates to support Node ESM

  Confirmed that both #3155 and #3206 are fixed without having to apply any workaround

  Also, test out the changes with the following frameworks/tools:

  | Name               | Tested? | Notes                                                                                                                                         |
  | ------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
  | Next.js@11, 12, 13 | ✅      |                                                                                                                                               |
  | Gatsby             | ✅      | Works with ESM. Not support loading CJS build                                                                                                 |
  | Remix              | ✅      |                                                                                                                                               |
  | Astro              | ✅      | Works with ESM. Not support loading CJS build                                                                                                 |
  | webpack            | ✅      |                                                                                                                                               |
  | Vite               | ✅      | Works with ESM. Not support loading CJS build                                                                                                 |
  | Rollup             | ✅      | Works with ESM. Not support loading CJS build                                                                                                 |
  | esbuild            | ✅      |                                                                                                                                               |
  | Parcel             | ✅      |                                                                                                                                               |
  | Snowpack           | ✅      | Need `--polyfill-node` to fix JS incompatibility in dev mode, but is a known [issue](https://github.com/FredKSchott/snowpack/discussions/718) |

- [#3291](https://github.com/aws-amplify/amplify-ui/pull/3291) [`9ce2d01b0`](https://github.com/aws-amplify/amplify-ui/commit/9ce2d01b09e2f7aa0b218a97bb829a4210350a0a) Thanks [@ioanabrooks](https://github.com/ioanabrooks)! - chore(ui,ui-react-core): Add type guard utils

- Updated dependencies [[`4ba0fb5c1`](https://github.com/aws-amplify/amplify-ui/commit/4ba0fb5c13484a36c8f44be5eb41313bf3d676cc), [`412538be9`](https://github.com/aws-amplify/amplify-ui/commit/412538be9e37a8dec7cb5e57281895a5b3b63184), [`9ce2d01b0`](https://github.com/aws-amplify/amplify-ui/commit/9ce2d01b09e2f7aa0b218a97bb829a4210350a0a), [`13d0882a8`](https://github.com/aws-amplify/amplify-ui/commit/13d0882a8fe3a9ef63e4b217c5f67cef2c75e148)]:
  - @aws-amplify/ui@5.5.3

## 2.1.10

### Patch Changes

- Updated dependencies [[`57f1a3f43`](https://github.com/aws-amplify/amplify-ui/commit/57f1a3f438b8288ffda46764f7a87e1739e61313), [`dd9de348a`](https://github.com/aws-amplify/amplify-ui/commit/dd9de348abcafdcd721600f543d58353957dac25), [`4d652033e`](https://github.com/aws-amplify/amplify-ui/commit/4d652033e120daa82665b4bb4035b56fa8d33bf8)]:
  - @aws-amplify/ui@5.5.2

## 2.1.9

### Patch Changes

- [#3265](https://github.com/aws-amplify/amplify-ui/pull/3265) [`08111e7e6`](https://github.com/aws-amplify/amplify-ui/commit/08111e7e60af5baf3b7e408f9545514c34e09078) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(ui-react): lint primitives (P-S)

- Updated dependencies [[`98a632137`](https://github.com/aws-amplify/amplify-ui/commit/98a63213766d598ed6a64a06b53fffc408d547fd), [`01912077c`](https://github.com/aws-amplify/amplify-ui/commit/01912077c6d4fcdd3cbe9b6de2bb53fc490d0f41)]:
  - @aws-amplify/ui@5.5.1

## 2.1.8

### Patch Changes

- Updated dependencies [[`59321c9cc`](https://github.com/aws-amplify/amplify-ui/commit/59321c9cc15f8243edd6f5dd0113e7c396f7b488), [`9b09654a7`](https://github.com/aws-amplify/amplify-ui/commit/9b09654a7e47ab70fb6d6b31f06de0289f25bbe9)]:
  - @aws-amplify/ui@5.5.0

## 2.1.7

### Patch Changes

- Updated dependencies [[`2912fe3af`](https://github.com/aws-amplify/amplify-ui/commit/2912fe3af6f29cde562a35e931bc2e3a0de470ed), [`ea1b10a2c`](https://github.com/aws-amplify/amplify-ui/commit/ea1b10a2c802b08ee019669ba442d7446f23bd05)]:
  - @aws-amplify/ui@5.4.2

## 2.1.6

### Patch Changes

- [#3183](https://github.com/aws-amplify/amplify-ui/pull/3183) [`cbbf51f53`](https://github.com/aws-amplify/amplify-ui/commit/cbbf51f53c428dc378d8986ae27c3bf9e52f67ab) Thanks [@ErikCH](https://github.com/ErikCH)! - Fixed MFA totpIssuer and totpUsername so it displays correctly in QR code when scanned.

- Updated dependencies [[`db8f019a7`](https://github.com/aws-amplify/amplify-ui/commit/db8f019a7737c4762ff19c1b03c7c06625277989)]:
  - @aws-amplify/ui@5.4.1

## 2.1.5

### Patch Changes

- Updated dependencies [[`0bbb9980c`](https://github.com/aws-amplify/amplify-ui/commit/0bbb9980c55f212ce54c5449a2dcc64bfce6ca8f), [`168185211`](https://github.com/aws-amplify/amplify-ui/commit/1681852112748717e44d199d0c62de83ab1541ca)]:
  - @aws-amplify/ui@5.4.0

## 2.1.4

### Patch Changes

- Updated dependencies [[`c31a9bf69`](https://github.com/aws-amplify/amplify-ui/commit/c31a9bf693b3507e8a2b9d0790423a9f64e533cf), [`1847840c0`](https://github.com/aws-amplify/amplify-ui/commit/1847840c00c0f9f7be31e9735c31bd596f4056e9)]:
  - @aws-amplify/ui@5.3.1

## 2.1.3

### Patch Changes

- Updated dependencies [[`3653c8f39`](https://github.com/aws-amplify/amplify-ui/commit/3653c8f3914e3dc51fbcc328e59326afb422aa68), [`145d0b5f5`](https://github.com/aws-amplify/amplify-ui/commit/145d0b5f596ff7c9f623898af0bb3836516c51fe), [`e3867e369`](https://github.com/aws-amplify/amplify-ui/commit/e3867e369b4aeb5b240916cb88105353483b9b7c), [`4b2dbeb18`](https://github.com/aws-amplify/amplify-ui/commit/4b2dbeb18c79175bc0bfe0cf50a0e9d0429544d6), [`0377bccfb`](https://github.com/aws-amplify/amplify-ui/commit/0377bccfbea55606d007ae914a5d7f202bf87478)]:
  - @aws-amplify/ui@5.3.0

## 2.1.2

### Patch Changes

- Updated dependencies [[`b416aca55`](https://github.com/aws-amplify/amplify-ui/commit/b416aca553649d37e2686c02f3223a77bf36ed98), [`8e5e696f4`](https://github.com/aws-amplify/amplify-ui/commit/8e5e696f4d0ae61e74537cdfe4395005cc21ce12), [`7f4248db4`](https://github.com/aws-amplify/amplify-ui/commit/7f4248db457639d1bb34c8318569ab047aa80c5e), [`a5b8696bc`](https://github.com/aws-amplify/amplify-ui/commit/a5b8696bc41d8cb2ff2c6fc39f8fd1afc349955a)]:
  - @aws-amplify/ui@5.2.0

## 2.1.1

### Patch Changes

- Updated dependencies [[`d062010f4`](https://github.com/aws-amplify/amplify-ui/commit/d062010f4690321129c1fb1f777a7df82898640b)]:
  - @aws-amplify/ui@5.1.1

## 2.1.0

### Minor Changes

- [#3067](https://github.com/aws-amplify/amplify-ui/pull/3067) [`ce3378ee9`](https://github.com/aws-amplify/amplify-ui/commit/ce3378ee90c1545bb41551817bee8662629920c1) Thanks [@joebuono](https://github.com/joebuono)! - feat: Add React Native Authenticator

### Patch Changes

- Updated dependencies [[`ce3378ee9`](https://github.com/aws-amplify/amplify-ui/commit/ce3378ee90c1545bb41551817bee8662629920c1), [`0234889ea`](https://github.com/aws-amplify/amplify-ui/commit/0234889eaf6dd8337e1140ee993be0380e80a5bf)]:
  - @aws-amplify/ui@5.1.0

## 2.0.0

### Major Changes

- [#2703](https://github.com/aws-amplify/amplify-ui/pull/2703) [`5ec150f4e`](https://github.com/aws-amplify/amplify-ui/commit/5ec150f4ee6fd5d0186fa3b8e55cc98089f4c80e) Thanks [@calebpollman](https://github.com/calebpollman)! - Remove useAuthenticator internal variables `_state` and `_send` (See #2685)

- [#2772](https://github.com/aws-amplify/amplify-ui/pull/2772) [`4a22217e0`](https://github.com/aws-amplify/amplify-ui/commit/4a22217e0f92ef71baaffc4346bee9599db62c20) Thanks [@zchenwei](https://github.com/zchenwei)! - BREAKING CHANGE(react): bump up React minimum support version to 16.14.0 and update JSX transform

### Patch Changes

- Updated dependencies [[`ab8942c54`](https://github.com/aws-amplify/amplify-ui/commit/ab8942c54d0d758d79521ba1a9bf06bf28e30bc7), [`82903f7bb`](https://github.com/aws-amplify/amplify-ui/commit/82903f7bbc0325e709fe48b851e8752cde3c309a), [`d90b148c0`](https://github.com/aws-amplify/amplify-ui/commit/d90b148c0e06b3321f4f05fad2b32ef52c04214d)]:
  - @aws-amplify/ui@5.0.0

## 1.0.5

### Patch Changes

- Updated dependencies [[`702a35738`](https://github.com/aws-amplify/amplify-ui/commit/702a3573850639c492c51ce10e27e194d720d5ac), [`0935da51a`](https://github.com/aws-amplify/amplify-ui/commit/0935da51ac04334e458339da2bf0ef72f248cf26)]:
  - @aws-amplify/ui@4.1.0

## 1.0.4

### Patch Changes

- Updated dependencies [[`05bb8c792`](https://github.com/aws-amplify/amplify-ui/commit/05bb8c79264e37c9d0592405f4a33e9a309de732), [`5bd5e695a`](https://github.com/aws-amplify/amplify-ui/commit/5bd5e695a71e0cbef85a17f4ee1c851c84b4d51d), [`6aa1132e7`](https://github.com/aws-amplify/amplify-ui/commit/6aa1132e760eef892021dbadafa63456c1c3a39d), [`ea1ea36a6`](https://github.com/aws-amplify/amplify-ui/commit/ea1ea36a650bd6677c97556b8c1e85705cd37a35)]:
  - @aws-amplify/ui@4.0.1

## 1.0.3

### Patch Changes

- [#2746](https://github.com/aws-amplify/amplify-ui/pull/2746) [`2893da04b`](https://github.com/aws-amplify/amplify-ui/commit/2893da04b4616efc342f6973169d03fef0113c7b) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(ui-react-core): add missing value to AuthenticatorRouteComponentKey

## 1.0.2

### Patch Changes

- [#2702](https://github.com/aws-amplify/amplify-ui/pull/2702) [`1b1567c0c`](https://github.com/aws-amplify/amplify-ui/commit/1b1567c0c7788120ca4e7c4533228d2672dda906) Thanks [@slaymance](https://github.com/slaymance)! - Make xstate core dependency of only framework libraries

- Updated dependencies [[`1b1567c0c`](https://github.com/aws-amplify/amplify-ui/commit/1b1567c0c7788120ca4e7c4533228d2672dda906)]:
  - @aws-amplify/ui@4.0.0

## 1.0.1

### Patch Changes

- Updated dependencies [[`42143228f`](https://github.com/aws-amplify/amplify-ui/commit/42143228fd8e99500e05fee34cee3f8067189c4e)]:
  - @aws-amplify/ui@3.14.0

## 1.0.0

### Major Changes

- [#2659](https://github.com/aws-amplify/amplify-ui/pull/2659) [`477a00593`](https://github.com/aws-amplify/amplify-ui/commit/477a005935f242b49e776d42054810bc5d115857) Thanks [@calebpollman](https://github.com/calebpollman)! - feat(ui-react-core): merge ui-react-core in to main
