# @aws-amplify/ui-react-storage

## 3.12.0

### Minor Changes

- [#6620](https://github.com/aws-amplify/amplify-ui/pull/6620) [`70e0d1eab7fc476fd09032aef8414e5a43483a49`](https://github.com/aws-amplify/amplify-ui/commit/70e0d1eab7fc476fd09032aef8414e5a43483a49) Thanks [@soberm](https://github.com/soberm)! - feat(storage-browser): Multi File Download

### Patch Changes

- [#6628](https://github.com/aws-amplify/amplify-ui/pull/6628) [`6f45d97a33ed487237326530bf9c1b2190d7c2fa`](https://github.com/aws-amplify/amplify-ui/commit/6f45d97a33ed487237326530bf9c1b2190d7c2fa) Thanks [@bobbor](https://github.com/bobbor)! - feat(storage-browser): paginate upload view

## 3.11.0

### Minor Changes

- [#6575](https://github.com/aws-amplify/amplify-ui/pull/6575) [`a004c2f1b9dc74075515a784edb1ee6ce2485602`](https://github.com/aws-amplify/amplify-ui/commit/a004c2f1b9dc74075515a784edb1ee6ce2485602) Thanks [@tiffanynwyeung](https://github.com/tiffanynwyeung)! - feat(storage-browser): add custom file validation and options config

  **Add custom file validation**

  ```tsx
  import React from 'react';
  import { createStorageBrowser } from '@aws-amplify/ui-react-storage/browser';
  import '@aws-amplify/ui-react-storage/styles.css';

  const MAX_FILE_SIZE = 1000 * 1000; // 1 MB

  const customValidateFile = (file: File) => {
    const isValidSize = file.size <= MAX_FILE_SIZE;
    const isValidType = file.type.includes('image');
    return isValidSize && isValidType;
  };

  const { StorageBrowser } = createStorageBrowser({
    // ...config goes here...
    options: {
      validateFile: customValidateFile,
    },
  });

  export default function Example() {
    return (
      <StorageBrowser
        displayText={{
          UploadView: {
            getFilesValidationMessage: (data) => {
              const invalidFileNames = data?.invalidFiles?.map(
                ({ file }) => file.name
              );
              return {
                content: `Only image files that are 1 MB or smaller are accepted. Invalid files: ${invalidFileNames}`,
                type: 'error',
              };
            },
          },
        }}
      />
    );
  }
  ```

### Patch Changes

- [#6572](https://github.com/aws-amplify/amplify-ui/pull/6572) [`02cb81b87d8b59cef5e7b582b8a1b60e217c780e`](https://github.com/aws-amplify/amplify-ui/commit/02cb81b87d8b59cef5e7b582b8a1b60e217c780e) Thanks [@ashika112](https://github.com/ashika112)! - chore(StorageBrowser) : Generalize table resolver for default actions

## 3.10.3

### Patch Changes

- [#6533](https://github.com/aws-amplify/amplify-ui/pull/6533) [`967559aaa1bb30c76c1b333eaeab998c013bfba4`](https://github.com/aws-amplify/amplify-ui/commit/967559aaa1bb30c76c1b333eaeab998c013bfba4) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(StorageBrowser): update createEnhancedListHandler interfaces

- [#6521](https://github.com/aws-amplify/amplify-ui/pull/6521) [`1002c52796c78243f836c3c0edc95edfe244f112`](https://github.com/aws-amplify/amplify-ui/commit/1002c52796c78243f836c3c0edc95edfe244f112) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(lint): add consistent import/export type eslint rules

- Updated dependencies [[`1002c52796c78243f836c3c0edc95edfe244f112`](https://github.com/aws-amplify/amplify-ui/commit/1002c52796c78243f836c3c0edc95edfe244f112)]:
  - @aws-amplify/ui-react@6.11.2
  - @aws-amplify/ui-react-core@3.4.3
  - @aws-amplify/ui@6.10.3

## 3.10.2

### Patch Changes

- [`cf63046c171b5dd349121d0d8bbf2282fb71aae4`](https://github.com/aws-amplify/amplify-ui/commit/cf63046c171b5dd349121d0d8bbf2282fb71aae4) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(storage-browser): move useProcessTasks concurrency option to dispatch handler

## 3.10.1

### Patch Changes

- [#6512](https://github.com/aws-amplify/amplify-ui/pull/6512) [`8d3eb0ba28dcab0b627134b465c18ca9ae01c4a1`](https://github.com/aws-amplify/amplify-ui/commit/8d3eb0ba28dcab0b627134b465c18ca9ae01c4a1) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(react): add export.types for internal subpath

- [#6434](https://github.com/aws-amplify/amplify-ui/pull/6434) [`ca1acff6c20000e0a04bfd7908ce2027166afef3`](https://github.com/aws-amplify/amplify-ui/commit/ca1acff6c20000e0a04bfd7908ce2027166afef3) Thanks [@AllanZhengYP](https://github.com/AllanZhengYP)! - fix(ui-react-storage): custom views type inference

- [#6520](https://github.com/aws-amplify/amplify-ui/pull/6520) [`14a6df50e04b251aaf7a215ea2a84628303002ab`](https://github.com/aws-amplify/amplify-ui/commit/14a6df50e04b251aaf7a215ea2a84628303002ab) Thanks [@ashwinkumar6](https://github.com/ashwinkumar6)! - chore: update aws-amplify version

- [#6507](https://github.com/aws-amplify/amplify-ui/pull/6507) [`b8fefdba2281af164756963c32fc17f7210ff6de`](https://github.com/aws-amplify/amplify-ui/commit/b8fefdba2281af164756963c32fc17f7210ff6de) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(react-core): refactor and rename useDataState to useAsyncReducer

- Updated dependencies [[`8d3eb0ba28dcab0b627134b465c18ca9ae01c4a1`](https://github.com/aws-amplify/amplify-ui/commit/8d3eb0ba28dcab0b627134b465c18ca9ae01c4a1), [`14a6df50e04b251aaf7a215ea2a84628303002ab`](https://github.com/aws-amplify/amplify-ui/commit/14a6df50e04b251aaf7a215ea2a84628303002ab), [`b8fefdba2281af164756963c32fc17f7210ff6de`](https://github.com/aws-amplify/amplify-ui/commit/b8fefdba2281af164756963c32fc17f7210ff6de)]:
  - @aws-amplify/ui-react@6.11.1
  - @aws-amplify/ui-react-core@3.4.2
  - @aws-amplify/ui@6.10.2

## 3.10.0

### Minor Changes

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

### Patch Changes

- [#6466](https://github.com/aws-amplify/amplify-ui/pull/6466) [`80a0bd6f5179ff585ecc1fec4e6e3f152669258e`](https://github.com/aws-amplify/amplify-ui/commit/80a0bd6f5179ff585ecc1fec4e6e3f152669258e) Thanks [@aadimch](https://github.com/aadimch)! - fix(ui-react): Loader primitive accessibility role

- [#6448](https://github.com/aws-amplify/amplify-ui/pull/6448) [`1c34fbb9273acb8f6b87bce45ee4fd804a770416`](https://github.com/aws-amplify/amplify-ui/commit/1c34fbb9273acb8f6b87bce45ee4fd804a770416) Thanks [@aadimch](https://github.com/aadimch)! - feat(ui-react-storage): add loadingElement to StorageImage

- Updated dependencies [[`e4d8cc8c04dd428d38289085a9bf797b87c058a2`](https://github.com/aws-amplify/amplify-ui/commit/e4d8cc8c04dd428d38289085a9bf797b87c058a2), [`e533dbbdade9d5ffdbd5aa7c446d958dd1980d43`](https://github.com/aws-amplify/amplify-ui/commit/e533dbbdade9d5ffdbd5aa7c446d958dd1980d43), [`80a0bd6f5179ff585ecc1fec4e6e3f152669258e`](https://github.com/aws-amplify/amplify-ui/commit/80a0bd6f5179ff585ecc1fec4e6e3f152669258e), [`58d7b1ba39b41d59f99328a9c46d92cce840fcdf`](https://github.com/aws-amplify/amplify-ui/commit/58d7b1ba39b41d59f99328a9c46d92cce840fcdf)]:
  - @aws-amplify/ui@6.10.1
  - @aws-amplify/ui-react-core@3.4.1
  - @aws-amplify/ui-react@6.11.0

## 3.9.2

### Patch Changes

- [#6484](https://github.com/aws-amplify/amplify-ui/pull/6484) [`e612885d10058ca9deab3f57795569b86ebce9f9`](https://github.com/aws-amplify/amplify-ui/commit/e612885d10058ca9deab3f57795569b86ebce9f9) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(storage-browser): update task statuses before passing to callbacks, add error to TaskResult

- [#6473](https://github.com/aws-amplify/amplify-ui/pull/6473) [`e4e7c4a6ef4dde4c76180f69c8388ae232ea9026`](https://github.com/aws-amplify/amplify-ui/commit/e4e7c4a6ef4dde4c76180f69c8388ae232ea9026) Thanks [@calebpollman](https://github.com/calebpollman)! - feat(storage-browser): add type docs, expose handlers, cleanup interfaces, refactor table content

- Updated dependencies [[`36c631a076b7d3d1aafc18a5854575e20e0592c2`](https://github.com/aws-amplify/amplify-ui/commit/36c631a076b7d3d1aafc18a5854575e20e0592c2)]:
  - @aws-amplify/ui-react-core@3.4.0
  - @aws-amplify/ui-react@6.10.0
  - @aws-amplify/ui@6.10.0

## 3.9.1

### Patch Changes

- [#6450](https://github.com/aws-amplify/amplify-ui/pull/6450) [`8a7ebe57123142b142ba4f30401e2e428200a618`](https://github.com/aws-amplify/amplify-ui/commit/8a7ebe57123142b142ba4f30401e2e428200a618) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(storage-browser): remove key parsing in useDeleteView

- Updated dependencies [[`75bf5408c195fa1745bc88f9329c29c66258f247`](https://github.com/aws-amplify/amplify-ui/commit/75bf5408c195fa1745bc88f9329c29c66258f247)]:
  - @aws-amplify/ui-react-core@3.3.5
  - @aws-amplify/ui-react@6.9.5

## 3.9.0

### Minor Changes

- [#6436](https://github.com/aws-amplify/amplify-ui/pull/6436) [`789cf8801a916e3c6ef52141748ed12c59d998f7`](https://github.com/aws-amplify/amplify-ui/commit/789cf8801a916e3c6ef52141748ed12c59d998f7) Thanks [@tiffanynwyeung](https://github.com/tiffanynwyeung)! - feat(ui-react-storage): allow custom error boundary

### Patch Changes

- Updated dependencies [[`e0fcb4322ab8af7e0699da577dc5fbcf9f7e56cc`](https://github.com/aws-amplify/amplify-ui/commit/e0fcb4322ab8af7e0699da577dc5fbcf9f7e56cc)]:
  - @aws-amplify/ui@6.9.1
  - @aws-amplify/ui-react@6.9.4
  - @aws-amplify/ui-react-core@3.3.4

## 3.8.2

### Patch Changes

- [#6382](https://github.com/aws-amplify/amplify-ui/pull/6382) [`e6248bd8dd8980b095826e6476b65e19af006960`](https://github.com/aws-amplify/amplify-ui/commit/e6248bd8dd8980b095826e6476b65e19af006960) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(react-core): ensure useDataState returns value of last dispatch

- Updated dependencies [[`00fadd4f0fe8c79b6045558053257e9375942ca1`](https://github.com/aws-amplify/amplify-ui/commit/00fadd4f0fe8c79b6045558053257e9375942ca1), [`81543cb38604a80ca2d8b93cfb7d1884d43e0a4f`](https://github.com/aws-amplify/amplify-ui/commit/81543cb38604a80ca2d8b93cfb7d1884d43e0a4f), [`e6248bd8dd8980b095826e6476b65e19af006960`](https://github.com/aws-amplify/amplify-ui/commit/e6248bd8dd8980b095826e6476b65e19af006960)]:
  - @aws-amplify/ui-react@6.9.3
  - @aws-amplify/ui@6.9.0
  - @aws-amplify/ui-react-core@3.3.3

## 3.8.1

### Patch Changes

- [#6346](https://github.com/aws-amplify/amplify-ui/pull/6346) [`f170ffa94e272cb53e6b9aa4cfd6fcf915083739`](https://github.com/aws-amplify/amplify-ui/commit/f170ffa94e272cb53e6b9aa4cfd6fcf915083739) Thanks [@jordanvn](https://github.com/jordanvn)! - Fixed displayText override for LocationDetailView dataTable headers

- [#6369](https://github.com/aws-amplify/amplify-ui/pull/6369) [`f91c69b830d168eb5a7371fb8f34e38ec7e303c0`](https://github.com/aws-amplify/amplify-ui/commit/f91c69b830d168eb5a7371fb8f34e38ec7e303c0) Thanks [@jjarvisp](https://github.com/jjarvisp)! - chore(react-storage): update access level deprecation message

- Updated dependencies [[`fa6984721124029cf2e7d5b4ac5a3cc6c34097a6`](https://github.com/aws-amplify/amplify-ui/commit/fa6984721124029cf2e7d5b4ac5a3cc6c34097a6)]:
  - @aws-amplify/ui@6.8.2
  - @aws-amplify/ui-react@6.9.2
  - @aws-amplify/ui-react-core@3.3.2

## 3.8.0

### Minor Changes

- [#5562](https://github.com/aws-amplify/amplify-ui/pull/5562) [`2e107f96db84d4a2b29bf3c03750fceb92f25bca`](https://github.com/aws-amplify/amplify-ui/commit/2e107f96db84d4a2b29bf3c03750fceb92f25bca) Thanks [@jordanvn](https://github.com/jordanvn)! - Support for multiple buckets added to storage image and file uploader

### Patch Changes

- [#6353](https://github.com/aws-amplify/amplify-ui/pull/6353) [`261310501b8f56b08f378ca895646e17825081ee`](https://github.com/aws-amplify/amplify-ui/commit/261310501b8f56b08f378ca895646e17825081ee) Thanks [@tiffanynwyeung](https://github.com/tiffanynwyeung)! - Hide storage browser data table rows while table data is not available yet

- [#6347](https://github.com/aws-amplify/amplify-ui/pull/6347) [`c850a338051830c6fe9a2fbad3b31856befd0afb`](https://github.com/aws-amplify/amplify-ui/commit/c850a338051830c6fe9a2fbad3b31856befd0afb) Thanks [@jordanvn](https://github.com/jordanvn)! - Fixed bug causing incorrect progress to be displayed during uploads

## 3.7.2

### Patch Changes

- [#6322](https://github.com/aws-amplify/amplify-ui/pull/6322) [`e81446d992a98c4b765e83e9e4fcad8c3d910b75`](https://github.com/aws-amplify/amplify-ui/commit/e81446d992a98c4b765e83e9e4fcad8c3d910b75) Thanks [@jordanvn](https://github.com/jordanvn)! - removed outdated storage browser styles

- [#6314](https://github.com/aws-amplify/amplify-ui/pull/6314) [`f2fc55d7b77b3716ab31237526a65afafcbb2f80`](https://github.com/aws-amplify/amplify-ui/commit/f2fc55d7b77b3716ab31237526a65afafcbb2f80) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(storage-browser): export UseView type

## 3.7.1

### Patch Changes

- [#6305](https://github.com/aws-amplify/amplify-ui/pull/6305) [`ac50ec3efbdd4a976b12d02dd9eb939e0e210cc1`](https://github.com/aws-amplify/amplify-ui/commit/ac50ec3efbdd4a976b12d02dd9eb939e0e210cc1) Thanks [@jjarvisp](https://github.com/jjarvisp)! - fix(react-storage): enable default checksum algorithm for create folder action #6305

- Updated dependencies [[`272ec8e575718ea990dcb9f51d1baaf522f45fb6`](https://github.com/aws-amplify/amplify-ui/commit/272ec8e575718ea990dcb9f51d1baaf522f45fb6), [`6e51c1750f8f3e01cf8827f4c5c2e5ef02240ca6`](https://github.com/aws-amplify/amplify-ui/commit/6e51c1750f8f3e01cf8827f4c5c2e5ef02240ca6)]:
  - @aws-amplify/ui@6.8.1
  - @aws-amplify/ui-react@6.9.1
  - @aws-amplify/ui-react-core@3.3.1

## 3.7.0

### Minor Changes

- [#6296](https://github.com/aws-amplify/amplify-ui/pull/6296) [`8d2aa79b174d4e48aaca913bd568898b8c8975a2`](https://github.com/aws-amplify/amplify-ui/commit/8d2aa79b174d4e48aaca913bd568898b8c8975a2) Thanks [@calebpollman](https://github.com/calebpollman)! - feat(react): reenable react 19 support

### Patch Changes

- Updated dependencies [[`8757f03b7b1d761d9a13cfe29382a2208d4f3999`](https://github.com/aws-amplify/amplify-ui/commit/8757f03b7b1d761d9a13cfe29382a2208d4f3999), [`8d2aa79b174d4e48aaca913bd568898b8c8975a2`](https://github.com/aws-amplify/amplify-ui/commit/8d2aa79b174d4e48aaca913bd568898b8c8975a2)]:
  - @aws-amplify/ui@6.8.0
  - @aws-amplify/ui-react@6.9.0
  - @aws-amplify/ui-react-core@3.3.0

## 3.6.1

### Patch Changes

- [#6278](https://github.com/aws-amplify/amplify-ui/pull/6278) [`475e4a37a404bd116ec55e95579acb8f2d23c9a4`](https://github.com/aws-amplify/amplify-ui/commit/475e4a37a404bd116ec55e95579acb8f2d23c9a4) Thanks [@jordanvn](https://github.com/jordanvn)! - revert changes introduced for React 19 support

- Updated dependencies [[`475e4a37a404bd116ec55e95579acb8f2d23c9a4`](https://github.com/aws-amplify/amplify-ui/commit/475e4a37a404bd116ec55e95579acb8f2d23c9a4)]:
  - @aws-amplify/ui-react-core@3.2.1
  - @aws-amplify/ui-react@6.8.1

## 3.6.0

### Minor Changes

- [#5826](https://github.com/aws-amplify/amplify-ui/pull/5826) [`954e9be2d055a57ebddab5b902e3e6b427d09f67`](https://github.com/aws-amplify/amplify-ui/commit/954e9be2d055a57ebddab5b902e3e6b427d09f67) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(react): add support for React 19

### Patch Changes

- Updated dependencies [[`c623990d5fb6af635b1964a51a8ff2c807938235`](https://github.com/aws-amplify/amplify-ui/commit/c623990d5fb6af635b1964a51a8ff2c807938235), [`825cccc92f5c326f0f110c8439a1c2c6553ff00a`](https://github.com/aws-amplify/amplify-ui/commit/825cccc92f5c326f0f110c8439a1c2c6553ff00a), [`954e9be2d055a57ebddab5b902e3e6b427d09f67`](https://github.com/aws-amplify/amplify-ui/commit/954e9be2d055a57ebddab5b902e3e6b427d09f67)]:
  - @aws-amplify/ui-react@6.8.0
  - @aws-amplify/ui-react-core@3.2.0

## 3.5.1

### Patch Changes

- [#6252](https://github.com/aws-amplify/amplify-ui/pull/6252) [`1cb03be29c9485104d65d9bf7d224e694975143d`](https://github.com/aws-amplify/amplify-ui/commit/1cb03be29c9485104d65d9bf7d224e694975143d) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(react-storage): default nullish progress to 100% if status is "complete"

- [#6252](https://github.com/aws-amplify/amplify-ui/pull/6252) [`1cb03be29c9485104d65d9bf7d224e694975143d`](https://github.com/aws-amplify/amplify-ui/commit/1cb03be29c9485104d65d9bf7d224e694975143d) Thanks [@calebpollman](https://github.com/calebpollman)! - chore: add user agent string to createStorageBrowser

- Updated dependencies [[`4a9e16c194e145c6881583f2362bccd8974bc1fc`](https://github.com/aws-amplify/amplify-ui/commit/4a9e16c194e145c6881583f2362bccd8974bc1fc), [`96be188317d72b89b6bfbc14a3d4ee76daad2a8b`](https://github.com/aws-amplify/amplify-ui/commit/96be188317d72b89b6bfbc14a3d4ee76daad2a8b)]:
  - @aws-amplify/ui-react@6.7.2
  - @aws-amplify/ui@6.7.2
  - @aws-amplify/ui-react-core@3.1.2

## 3.5.0

### Minor Changes

- [#6220](https://github.com/aws-amplify/amplify-ui/pull/6220) [`efbfd14e35967388acaa333089cc3737218c9008`](https://github.com/aws-amplify/amplify-ui/commit/efbfd14e35967388acaa333089cc3737218c9008) Thanks [@calebpollman](https://github.com/calebpollman)! - feat(storage-browser): add custom actions

  ```

  ```

- [#6219](https://github.com/aws-amplify/amplify-ui/pull/6219) [`8bf3c306f7df74d514fcd496edb10cfe69b0158b`](https://github.com/aws-amplify/amplify-ui/commit/8bf3c306f7df74d514fcd496edb10cfe69b0158b) Thanks [@ashwinkumar6](https://github.com/ashwinkumar6)! - fix(react-storage): expose additional storage browser types

### Patch Changes

- Updated dependencies [[`9ab56f499f4596062fe4614a016efc3dfc88ef03`](https://github.com/aws-amplify/amplify-ui/commit/9ab56f499f4596062fe4614a016efc3dfc88ef03)]:
  - @aws-amplify/ui@6.7.1
  - @aws-amplify/ui-react@6.7.1
  - @aws-amplify/ui-react-core@3.1.1

## 3.4.1

### Patch Changes

- [#6050](https://github.com/aws-amplify/amplify-ui/pull/6050) [`36e1ee7782e8e6f73e44e08da379cbb17e278e9d`](https://github.com/aws-amplify/amplify-ui/commit/36e1ee7782e8e6f73e44e08da379cbb17e278e9d) Thanks [@choyky](https://github.com/choyky)! - fix (Storage/FileUploader): FileUploader does not upload processed file contents in certain scenarios

## 3.4.0

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
  - @aws-amplify/ui-react@6.7.0
  - @aws-amplify/ui-react-core@3.1.0
  - @aws-amplify/ui@6.7.0

## 3.3.10

### Patch Changes

- Updated dependencies [[`90ea18ba0`](https://github.com/aws-amplify/amplify-ui/commit/90ea18ba076f884cad7f49b646f3f820e1b80c0e), [`2e3a051d9`](https://github.com/aws-amplify/amplify-ui/commit/2e3a051d9c2d48d5be22d2e83095cbd060ce2b40), [`f1b1da8a1`](https://github.com/aws-amplify/amplify-ui/commit/f1b1da8a1adfb23948156a5618cbf605279d941d), [`0d4d2b91c`](https://github.com/aws-amplify/amplify-ui/commit/0d4d2b91c84b2eb5e9365bb837855e5a9b4e3c06), [`24635cfd5`](https://github.com/aws-amplify/amplify-ui/commit/24635cfd5fb6b01bfd3bde1464c7064b2d1484c4)]:
  - @aws-amplify/ui-react-core@3.0.30
  - @aws-amplify/ui-react@6.6.0
  - @aws-amplify/ui@6.6.6

## 3.3.9

### Patch Changes

- [#5917](https://github.com/aws-amplify/amplify-ui/pull/5917) [`3655af2be`](https://github.com/aws-amplify/amplify-ui/commit/3655af2be54733d364e71d3c7f86f32d7bbcf811) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - chore(ai): adding UA string for AIConversation

- Updated dependencies [[`6fea94b89`](https://github.com/aws-amplify/amplify-ui/commit/6fea94b890d9d497a3f13e189ea0b52e8dcdadb8), [`3655af2be`](https://github.com/aws-amplify/amplify-ui/commit/3655af2be54733d364e71d3c7f86f32d7bbcf811)]:
  - @aws-amplify/ui-react@6.5.5
  - @aws-amplify/ui-react-core@3.0.29
  - @aws-amplify/ui@6.6.5

## 3.3.8

### Patch Changes

- Updated dependencies [[`ac7cb271a`](https://github.com/aws-amplify/amplify-ui/commit/ac7cb271aff895e643fb5dc927030df9245b7c5b)]:
  - @aws-amplify/ui@6.6.4
  - @aws-amplify/ui-react@6.5.4
  - @aws-amplify/ui-react-core@3.0.28

## 3.3.7

### Patch Changes

- [#5867](https://github.com/aws-amplify/amplify-ui/pull/5867) [`bbe4ca0aa`](https://github.com/aws-amplify/amplify-ui/commit/bbe4ca0aaf81d87905783e1f3c708a7f1150dae6) Thanks [@esauerbo](https://github.com/esauerbo)! - chore: Manually recreate `StorageAccessLevel` type and remove `@aws-amplify/core` peerDep from ui-react-storage package.

- Updated dependencies [[`0d86485fc`](https://github.com/aws-amplify/amplify-ui/commit/0d86485fc4bf74766a1b82c69cfa322ed1e9baf7)]:
  - @aws-amplify/ui@6.6.3
  - @aws-amplify/ui-react@6.5.3
  - @aws-amplify/ui-react-core@3.0.27

## 3.3.6

### Patch Changes

- [#5849](https://github.com/aws-amplify/amplify-ui/pull/5849) [`22e285f58`](https://github.com/aws-amplify/amplify-ui/commit/22e285f5802e40b78c5a055a7384943c41252428) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(utils): prefer isFunction

- [#5830](https://github.com/aws-amplify/amplify-ui/pull/5830) [`545aa6a60`](https://github.com/aws-amplify/amplify-ui/commit/545aa6a608b68b9fb78f5df56da0e1e09b537d58) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(rollup): upgrade rollup deps, migrate to mjs config file, enforce linting on mjs files

- [#5853](https://github.com/aws-amplify/amplify-ui/pull/5853) [`87d74a7de`](https://github.com/aws-amplify/amplify-ui/commit/87d74a7deaa7d0cf393dfed3fb3cc85a3790c382) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(deps): remove @aws-amplify/core devDep from react-core

- Updated dependencies [[`22e285f58`](https://github.com/aws-amplify/amplify-ui/commit/22e285f5802e40b78c5a055a7384943c41252428), [`545aa6a60`](https://github.com/aws-amplify/amplify-ui/commit/545aa6a608b68b9fb78f5df56da0e1e09b537d58), [`87d74a7de`](https://github.com/aws-amplify/amplify-ui/commit/87d74a7deaa7d0cf393dfed3fb3cc85a3790c382)]:
  - @aws-amplify/ui-react-core@3.0.26
  - @aws-amplify/ui-react@6.5.2
  - @aws-amplify/ui@6.6.2

## 3.3.5

### Patch Changes

- [#5796](https://github.com/aws-amplify/amplify-ui/pull/5796) [`bf9dbc334`](https://github.com/aws-amplify/amplify-ui/commit/bf9dbc334293aff844a835e1717ee529e1abded3) Thanks [@esauerbo](https://github.com/esauerbo)! - chore(deps): Fix transitive dependencies.

- Updated dependencies [[`bf9dbc334`](https://github.com/aws-amplify/amplify-ui/commit/bf9dbc334293aff844a835e1717ee529e1abded3), [`3a677a1af`](https://github.com/aws-amplify/amplify-ui/commit/3a677a1afa60652fcd1a5adb734b9c94d4ba5c3d)]:
  - @aws-amplify/ui-react-core@3.0.25
  - @aws-amplify/ui-react@6.5.1
  - @aws-amplify/ui@6.6.1

## 3.3.4

### Patch Changes

- [#5815](https://github.com/aws-amplify/amplify-ui/pull/5815) [`028a91ba8`](https://github.com/aws-amplify/amplify-ui/commit/028a91ba8a4bdc433abf9a91bf82a4d30faf031d) Thanks [@esauerbo](https://github.com/esauerbo)! - chore(storage): Export `FileUploaderHandle` and `StorageManagerHandle`

- [#5818](https://github.com/aws-amplify/amplify-ui/pull/5818) [`0d50470c8`](https://github.com/aws-amplify/amplify-ui/commit/0d50470c82c811e47fc7c99ab44ceeb7b287f7ba) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(file-uploader): fix duplicate upload requests

- Updated dependencies [[`0ddeea9d4`](https://github.com/aws-amplify/amplify-ui/commit/0ddeea9d432f12621e0e32dae346e72881b790db), [`7a12237d2`](https://github.com/aws-amplify/amplify-ui/commit/7a12237d2c96107ef97d3c62d9d26d6b6f1d824c)]:
  - @aws-amplify/ui-react@6.5.0
  - @aws-amplify/ui@6.6.0
  - @aws-amplify/ui-react-core@3.0.24

## 3.3.3

### Patch Changes

- Updated dependencies [[`0ebf8b346`](https://github.com/aws-amplify/amplify-ui/commit/0ebf8b346bc744cd73e1e7891eafc07538d6419d)]:
  - @aws-amplify/ui-react@6.4.0
  - @aws-amplify/ui@6.5.0
  - @aws-amplify/ui-react-core@3.0.23

## 3.3.2

### Patch Changes

- Updated dependencies [[`9d96dd1fe`](https://github.com/aws-amplify/amplify-ui/commit/9d96dd1fe51212e8e55b0dde816122a6f5672762)]:
  - @aws-amplify/ui@6.4.1
  - @aws-amplify/ui-react@6.3.1
  - @aws-amplify/ui-react-core@3.0.22

## 3.3.1

### Patch Changes

- Updated dependencies [[`afffa89cb`](https://github.com/aws-amplify/amplify-ui/commit/afffa89cb29bb08ff1b626c727a2c9fb93bf11b3), [`afffa89cb`](https://github.com/aws-amplify/amplify-ui/commit/afffa89cb29bb08ff1b626c727a2c9fb93bf11b3), [`afffa89cb`](https://github.com/aws-amplify/amplify-ui/commit/afffa89cb29bb08ff1b626c727a2c9fb93bf11b3)]:
  - @aws-amplify/ui-react@6.3.0
  - @aws-amplify/ui@6.4.0
  - @aws-amplify/ui-react-core@3.0.21

## 3.3.0

### Minor Changes

- [#5744](https://github.com/aws-amplify/amplify-ui/pull/5744) [`c3dfbe044`](https://github.com/aws-amplify/amplify-ui/commit/c3dfbe044fd18e084cd411ce0ff84dcab1a80224) Thanks [@jordanvn](https://github.com/jordanvn)! - Adds FileUploader as new default name of StorageManager to avoid confusion with new components

### Patch Changes

- Updated dependencies [[`c3dfbe044`](https://github.com/aws-amplify/amplify-ui/commit/c3dfbe044fd18e084cd411ce0ff84dcab1a80224)]:
  - @aws-amplify/ui@6.3.0
  - @aws-amplify/ui-react@6.2.2
  - @aws-amplify/ui-react-core@3.0.20

## 3.2.1

### Patch Changes

- [#5645](https://github.com/aws-amplify/amplify-ui/pull/5645) [`634815ff0`](https://github.com/aws-amplify/amplify-ui/commit/634815ff07defd89123963bab98f410c5e1fc9cd) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - chore(utils): moving humanFileSize to ui package

- Updated dependencies [[`6e67ab6be`](https://github.com/aws-amplify/amplify-ui/commit/6e67ab6beb65e8ac7c7db6c6586df3c4f219bdbf), [`634815ff0`](https://github.com/aws-amplify/amplify-ui/commit/634815ff07defd89123963bab98f410c5e1fc9cd)]:
  - @aws-amplify/ui@6.2.0
  - @aws-amplify/ui-react@6.2.1
  - @aws-amplify/ui-react-core@3.0.19

## 3.2.0

### Minor Changes

- [#5501](https://github.com/aws-amplify/amplify-ui/pull/5501) [`ba17d387b`](https://github.com/aws-amplify/amplify-ui/commit/ba17d387bda17d4e72cecbfdb25c5ec69be5de0c) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - feat(storagemanager): add useAccelerateEndpoint

  ```jsx
  <StorageManager
    acceptedFileTypes={['image/*']}
    path="public/"
    useAccelerateEndpoint
  />
  ```

### Patch Changes

- Updated dependencies [[`0919e55ba`](https://github.com/aws-amplify/amplify-ui/commit/0919e55ba6d5ec5f21fbf6d2062618c51b91c09b), [`50ef7ca8e`](https://github.com/aws-amplify/amplify-ui/commit/50ef7ca8e3d6ba116f587158c80ea08a5deeb868), [`d73bd9cc8`](https://github.com/aws-amplify/amplify-ui/commit/d73bd9cc84a2bd07c86d0c6937cbde35fc2c4bc2), [`29f11a53c`](https://github.com/aws-amplify/amplify-ui/commit/29f11a53cc196bde1c25d15f2f79e332f6156cdc), [`e52db7be1`](https://github.com/aws-amplify/amplify-ui/commit/e52db7be1792fb3f83fd7934f25524cdaee2d100)]:
  - @aws-amplify/ui@6.1.0
  - @aws-amplify/ui-react@6.2.0
  - @aws-amplify/ui-react-core@3.0.18

## 3.1.6

### Patch Changes

- [#5477](https://github.com/aws-amplify/amplify-ui/pull/5477) [`adb985c98`](https://github.com/aws-amplify/amplify-ui/commit/adb985c98c5b150280bdf2592aced3c5d3b1fc78) Thanks [@thaddmt](https://github.com/thaddmt)! - fix(storage): fix looping calls to processFile

## 3.1.5

### Patch Changes

- Updated dependencies [[`a0248855b`](https://github.com/aws-amplify/amplify-ui/commit/a0248855b85fe4a95d5b941b98b9d34cbc46298f), [`98135dfac`](https://github.com/aws-amplify/amplify-ui/commit/98135dfacccd5213e52b5001adbd1702e6f883fe)]:
  - @aws-amplify/ui-react@6.1.14

## 3.1.4

### Patch Changes

- [#5357](https://github.com/aws-amplify/amplify-ui/pull/5357) [`70354b0c3`](https://github.com/aws-amplify/amplify-ui/commit/70354b0c3f3c91fa99e8f091cfea720fe2b82635) Thanks [@calebpollman](https://github.com/calebpollman)! - fix(storage-manager): update file processedKey on process file complete

- Updated dependencies [[`31b9f299e`](https://github.com/aws-amplify/amplify-ui/commit/31b9f299e0b6253b9880700f836f47292453b40e), [`0483dd833`](https://github.com/aws-amplify/amplify-ui/commit/0483dd833698b518d1c88d98871cafb1b6019c75)]:
  - @aws-amplify/ui-react@6.1.13
  - @aws-amplify/ui@6.0.17
  - @aws-amplify/ui-react-core@3.0.17

## 3.1.3

### Patch Changes

- Updated dependencies [[`d7098c2fd`](https://github.com/aws-amplify/amplify-ui/commit/d7098c2fda994fc1ef285b349108c0e8ada9cc34)]:
  - @aws-amplify/ui-react@6.1.12

## 3.1.2

### Patch Changes

- [#5258](https://github.com/aws-amplify/amplify-ui/pull/5258) [`dc1b3be5b`](https://github.com/aws-amplify/amplify-ui/commit/dc1b3be5bb7307a28c856547500384f9bee52d34) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(deps): update amplify scoped and RN dep versions

- Updated dependencies [[`dc1b3be5b`](https://github.com/aws-amplify/amplify-ui/commit/dc1b3be5bb7307a28c856547500384f9bee52d34)]:
  - @aws-amplify/ui-react@6.1.11
  - @aws-amplify/ui-react-core@3.0.16
  - @aws-amplify/ui@6.0.16

## 3.1.1

### Patch Changes

- Updated dependencies [[`1ca7c38e1`](https://github.com/aws-amplify/amplify-ui/commit/1ca7c38e15c5a7d307aa7e704b77d596167accb2), [`3af3e6b7a`](https://github.com/aws-amplify/amplify-ui/commit/3af3e6b7aca2914f67870b09fd5b2d81847f8e39), [`225bde836`](https://github.com/aws-amplify/amplify-ui/commit/225bde83640e9efba1b4edfce4696c74d6569b95), [`4b3f69917`](https://github.com/aws-amplify/amplify-ui/commit/4b3f6991706b774d45eb80beea2ddd606b21ce2a), [`bad0da7b9`](https://github.com/aws-amplify/amplify-ui/commit/bad0da7b9cc70069f504a37e80849b306b04f7d7), [`b92c34a99`](https://github.com/aws-amplify/amplify-ui/commit/b92c34a992b0f3d118711527360cdceeff503abb)]:
  - @aws-amplify/ui@6.0.15
  - @aws-amplify/ui-react@6.1.10
  - @aws-amplify/ui-react-core@3.0.15

## 3.1.0

### Minor Changes

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

### Patch Changes

- [#5193](https://github.com/aws-amplify/amplify-ui/pull/5193) [`de2402842`](https://github.com/aws-amplify/amplify-ui/commit/de2402842c75e186e2c5515d20cb1873bbabc4a0) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(aws-amplify): point amplify to 6.2.0

- Updated dependencies [[`de2402842`](https://github.com/aws-amplify/amplify-ui/commit/de2402842c75e186e2c5515d20cb1873bbabc4a0), [`9ce5f9d88`](https://github.com/aws-amplify/amplify-ui/commit/9ce5f9d88dce131fe15870bda9545915e72e7e01)]:
  - @aws-amplify/ui-react-core@3.0.14
  - @aws-amplify/ui-react@6.1.9
  - @aws-amplify/ui@6.0.14

## 3.0.18

### Patch Changes

- Updated dependencies [[`18da6aede`](https://github.com/aws-amplify/amplify-ui/commit/18da6aede31bf7d82939542f1646f06c577bd2c4)]:
  - @aws-amplify/ui-react@6.1.8

## 3.0.17

### Patch Changes

- [#5120](https://github.com/aws-amplify/amplify-ui/pull/5120) [`842c00ad4`](https://github.com/aws-amplify/amplify-ui/commit/842c00ad42701659228aea2fc526e34125a7e3d0) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(deps): update peerDep versions in public packages, point to 6.0.26 for examples and docs

- Updated dependencies [[`a26e9eb86`](https://github.com/aws-amplify/amplify-ui/commit/a26e9eb86b5e78cad0aaf6ee5230f46900b0a016), [`842c00ad4`](https://github.com/aws-amplify/amplify-ui/commit/842c00ad42701659228aea2fc526e34125a7e3d0)]:
  - @aws-amplify/ui@6.0.13
  - @aws-amplify/ui-react-core@3.0.13
  - @aws-amplify/ui-react@6.1.7

## 3.0.16

### Patch Changes

- Updated dependencies [[`3cc2f8fc1`](https://github.com/aws-amplify/amplify-ui/commit/3cc2f8fc121e818d68c7d10abc863eebd5620902), [`f64ea459e`](https://github.com/aws-amplify/amplify-ui/commit/f64ea459e5008ebb764697177958ee8307ce7542)]:
  - @aws-amplify/ui@6.0.12
  - @aws-amplify/ui-react@6.1.6
  - @aws-amplify/ui-react-core@3.0.12

## 3.0.15

### Patch Changes

- Updated dependencies [[`1d9c5c862`](https://github.com/aws-amplify/amplify-ui/commit/1d9c5c8629fd94b4e1b5fa045afe0dd1ccc1b21d), [`4eae32e91`](https://github.com/aws-amplify/amplify-ui/commit/4eae32e91ecc64b24a0092c4aee234b87420ce07), [`32702d9c9`](https://github.com/aws-amplify/amplify-ui/commit/32702d9c976e81b23b4e8f1c7e935b48288e058d)]:
  - @aws-amplify/ui@6.0.11
  - @aws-amplify/ui-react@6.1.5
  - @aws-amplify/ui-react-core@3.0.11

## 3.0.14

### Patch Changes

- [#5013](https://github.com/aws-amplify/amplify-ui/pull/5013) [`d5ea9a773`](https://github.com/aws-amplify/amplify-ui/commit/d5ea9a773930e6694529e763bfc8cbb7250f4585) Thanks [@calebpollman](https://github.com/calebpollman)! - Fix/update storage manager path handling

- Updated dependencies [[`80ad8cda6`](https://github.com/aws-amplify/amplify-ui/commit/80ad8cda66800f88150054fa51a7bbcdd0730566)]:
  - @aws-amplify/ui@6.0.10
  - @aws-amplify/ui-react@6.1.4
  - @aws-amplify/ui-react-core@3.0.10

## 3.0.13

### Patch Changes

- [#4993](https://github.com/aws-amplify/amplify-ui/pull/4993) [`ab29d9618`](https://github.com/aws-amplify/amplify-ui/commit/ab29d9618bc2c949c5c8872ebae89601cb1b7369) Thanks [@hbuchel](https://github.com/hbuchel)! - fix(react-storage): use targetIdentityId instead of identityId to get URL of image

  Fixes an issue in `<StorageImage />` where users could not load an image with `accessLevel` of "protected" even when an `identityId` was supplied.

## 3.0.12

### Patch Changes

- Updated dependencies [[`d66aa68df`](https://github.com/aws-amplify/amplify-ui/commit/d66aa68df8e3e191015fba6f5f03d5a1ce385a97), [`7eeb0ae7c`](https://github.com/aws-amplify/amplify-ui/commit/7eeb0ae7c0ee651a0a2ec0e6e945732219dbacf2)]:
  - @aws-amplify/ui-react@6.1.3
  - @aws-amplify/ui-react-core@3.0.9
  - @aws-amplify/ui@6.0.9

## 3.0.11

### Patch Changes

- Updated dependencies [[`0f767c7fa`](https://github.com/aws-amplify/amplify-ui/commit/0f767c7fa9d106e8be34aa53edd9f5afe064ac6a), [`9dc52eb1b`](https://github.com/aws-amplify/amplify-ui/commit/9dc52eb1b2f4ad8c1f2956c7ad8a5073cf203172), [`d61690d01`](https://github.com/aws-amplify/amplify-ui/commit/d61690d0170eba69b23a785832e107db05a038ca), [`6721c15f8`](https://github.com/aws-amplify/amplify-ui/commit/6721c15f88e9a465a12a3b79557859c8390ae944)]:
  - @aws-amplify/ui-react@6.1.2
  - @aws-amplify/ui@6.0.8
  - @aws-amplify/ui-react-core@3.0.8

## 3.0.10

### Patch Changes

- Updated dependencies [[`ad070697b`](https://github.com/aws-amplify/amplify-ui/commit/ad070697ba81871e26905d08f049b3486a0ce6f9), [`067e2b1cf`](https://github.com/aws-amplify/amplify-ui/commit/067e2b1cf435db2acb1c25ca3e50a65b53478530), [`7b0666036`](https://github.com/aws-amplify/amplify-ui/commit/7b0666036863f47417959aeaa054a84a35cdbea9), [`da41cca8c`](https://github.com/aws-amplify/amplify-ui/commit/da41cca8c62fb2c77c1f251ebc5071b947416959)]:
  - @aws-amplify/ui@6.0.7
  - @aws-amplify/ui-react@6.1.1
  - @aws-amplify/ui-react-core@3.0.7

## 3.0.9

### Patch Changes

- Updated dependencies [[`8d41213bc`](https://github.com/aws-amplify/amplify-ui/commit/8d41213bc96f3f37342c09756cf16a07ea4e2090)]:
  - @aws-amplify/ui-react@6.1.0

## 3.0.8

### Patch Changes

- Updated dependencies [[`4f643b05b`](https://github.com/aws-amplify/amplify-ui/commit/4f643b05b010901226bf200f8d0b06601d0ecab5), [`190bf28d1`](https://github.com/aws-amplify/amplify-ui/commit/190bf28d1b570329f415d2d4c03e608a3b30412b)]:
  - @aws-amplify/ui-react-core@3.0.6
  - @aws-amplify/ui@6.0.6
  - @aws-amplify/ui-react@6.0.7

## 3.0.7

### Patch Changes

- Updated dependencies [[`38bae5ee5`](https://github.com/aws-amplify/amplify-ui/commit/38bae5ee522bf572cc065953b2a94710e6913cc2)]:
  - @aws-amplify/ui-react@6.0.6
  - @aws-amplify/ui@6.0.5
  - @aws-amplify/ui-react-core@3.0.5

## 3.0.6

### Patch Changes

- Updated dependencies [[`c526cf53b`](https://github.com/aws-amplify/amplify-ui/commit/c526cf53bc07bb85c0789aa5edfdfcb4485fa5f5), [`cc2740b9a`](https://github.com/aws-amplify/amplify-ui/commit/cc2740b9a033e587715a37c379166388b267ff4e)]:
  - @aws-amplify/ui-react@6.0.5
  - @aws-amplify/ui@6.0.4
  - @aws-amplify/ui-react-core@3.0.4

## 3.0.5

### Patch Changes

- Updated dependencies [[`ed55a6a36`](https://github.com/aws-amplify/amplify-ui/commit/ed55a6a36b9250db50e3edaf31b53ce4fc35edfe), [`272a05edc`](https://github.com/aws-amplify/amplify-ui/commit/272a05edcafa8f9e0e53ed1eb66f566f308d09b3)]:
  - @aws-amplify/ui@6.0.3
  - @aws-amplify/ui-react@6.0.4
  - @aws-amplify/ui-react-core@3.0.3

## 3.0.4

### Patch Changes

- Updated dependencies [[`4ff26e27e`](https://github.com/aws-amplify/amplify-ui/commit/4ff26e27e4bc8909cc2b86c738eca5085b2a42d1), [`bb141a719`](https://github.com/aws-amplify/amplify-ui/commit/bb141a719fd9bc2d7680e539f2ff047deb88ee7e)]:
  - @aws-amplify/ui-react@6.0.3
  - @aws-amplify/ui@6.0.2
  - @aws-amplify/ui-react-core@3.0.2

## 3.0.3

### Patch Changes

- Updated dependencies [[`9dd0e58e5`](https://github.com/aws-amplify/amplify-ui/commit/9dd0e58e5167d307c2154b3280de3c0e52f607e1)]:
  - @aws-amplify/ui@6.0.1
  - @aws-amplify/ui-react@6.0.2
  - @aws-amplify/ui-react-core@3.0.1

## 3.0.2

### Patch Changes

- [#4760](https://github.com/aws-amplify/amplify-ui/pull/4760) [`74f834422`](https://github.com/aws-amplify/amplify-ui/commit/74f83442276c73af60da740acf4b7bc2b2878544) Thanks [@thaddmt](https://github.com/thaddmt)! - fix(storagemanager): upload action now displays state properly (#4666)

## 3.0.1

### Patch Changes

- Updated dependencies [[`2ab62defe`](https://github.com/aws-amplify/amplify-ui/commit/2ab62defe14da3dce3bc960aeae47b2342e36da1)]:
  - @aws-amplify/ui-react@6.0.1

## 3.0.0

### Major Changes

- Major version bump for all Amplify UI packages due to uprade of peerDependency aws-amplify to v6

### Patch Changes

- [#4667](https://github.com/aws-amplify/amplify-ui/pull/4667) [`bc4831cc2`](https://github.com/aws-amplify/amplify-ui/commit/bc4831cc2756c767a56e125af1f03b665dcd5396) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - fix(react-storage): StorageImage now fires onStorageGetError when an object is not found

  StorageImage now has a prop called `validateObjectExistence` which is default to `true`. This checks if there is a file at the given path before adding it as the `src` on an image.

- [#4716](https://github.com/aws-amplify/amplify-ui/pull/4716) [`5bd721183`](https://github.com/aws-amplify/amplify-ui/commit/5bd72118342c4a3040c13e923024d476a643a795) Thanks [@calebpollman](https://github.com/calebpollman)! - chore(deps): upgrade aws-amplify deps

- Updated dependencies [[`de87be6d3`](https://github.com/aws-amplify/amplify-ui/commit/de87be6d3b5dfa87f5e295a7bfd42cb21b3198d8), [`55d1f4940`](https://github.com/aws-amplify/amplify-ui/commit/55d1f49401359bb0b75756742658b173edc0fb72), [`7b55f4f78`](https://github.com/aws-amplify/amplify-ui/commit/7b55f4f781c3adab19c3d91ef9f293647566ecd9), [`27783d65a`](https://github.com/aws-amplify/amplify-ui/commit/27783d65a06e712bb3ca8c116798a52db3d4a3a4), [`59c042c17`](https://github.com/aws-amplify/amplify-ui/commit/59c042c170358c6cc2ca09d13ffcc7e517586ef2), [`91372387c`](https://github.com/aws-amplify/amplify-ui/commit/91372387c29f5d68526070e4c3b8a13bbf079e5c), [`23c0910d0`](https://github.com/aws-amplify/amplify-ui/commit/23c0910d00d92441f9b23b37726fafcbef28f2d2), [`f9e4fa838`](https://github.com/aws-amplify/amplify-ui/commit/f9e4fa8388a1994996a132f50261f431d1a52e43), [`27be6ccf5`](https://github.com/aws-amplify/amplify-ui/commit/27be6ccf51ce093d3589f9f36b4530e6825a317b), [`5bd721183`](https://github.com/aws-amplify/amplify-ui/commit/5bd72118342c4a3040c13e923024d476a643a795)]:
  - @aws-amplify/ui-react@6.0.0
  - @aws-amplify/ui@6.0.0
  - @aws-amplify/ui-react-core@3.0.0

## 2.3.2

### Patch Changes

- [#4649](https://github.com/aws-amplify/amplify-ui/pull/4649) [`1dbe3f46c`](https://github.com/aws-amplify/amplify-ui/commit/1dbe3f46c2423c407aa2e499f383745b45b2e640) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - fix(storage): fixing drop handler for file extensions

  Previously, adding a file extension for an `acceptedFileTypes` when a customer would drop a file it would show as rejected even if it was a valid file type. This fixes that issue.

- Updated dependencies [[`1dbe3f46c`](https://github.com/aws-amplify/amplify-ui/commit/1dbe3f46c2423c407aa2e499f383745b45b2e640)]:
  - @aws-amplify/ui-react@5.3.2

## 2.3.1

### Patch Changes

- Updated dependencies [[`d570694c7`](https://github.com/aws-amplify/amplify-ui/commit/d570694c7e0d9d112449d3aade2d567773555926), [`6a5a4d79c`](https://github.com/aws-amplify/amplify-ui/commit/6a5a4d79ce60124fba2dc00d86b9e1a9b5f21c39), [`c393b74af`](https://github.com/aws-amplify/amplify-ui/commit/c393b74af6574593b2e7a5c9f00d27b052966a12), [`7e11a3b7e`](https://github.com/aws-amplify/amplify-ui/commit/7e11a3b7e4761a39a973ecd9a632a619660e18dd)]:
  - @aws-amplify/ui-react@5.3.1
  - @aws-amplify/ui@5.8.1
  - @aws-amplify/ui-react-core@2.1.33

## 2.3.0

### Minor Changes

- [#4359](https://github.com/aws-amplify/amplify-ui/pull/4359) [`ec495a6f6`](https://github.com/aws-amplify/amplify-ui/commit/ec495a6f638c53970edd8706a0eeb5f95d142689) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - feat(react): DropZone component

  ```jsx
  export default function DefaultDropZoneExample() {
    const [files, setFiles] = React.useState([]);
    return (
      <>
        <DropZone
          onDropComplete={({ files }) => {
            setFiles(files);
          }}
        >
          Drag images here
        </DropZone>
        {files.map((file) => (
          <Text key={file.name}>{file.name}</Text>
        ))}
      </>
    );
  }
  ```

- [#4367](https://github.com/aws-amplify/amplify-ui/pull/4367) [`e1fc61119`](https://github.com/aws-amplify/amplify-ui/commit/e1fc61119224a92a4648d1d1673177647b1a8e53) Thanks [@ioanabrooks](https://github.com/ioanabrooks)! - feat(ui-react-storage): Added upload actions and option to upload files on click. Usage:

  ```
   <StorageManager
        acceptedFileTypes={['image/*']}
        accessLevel="public"
        autoUpload={false}
      />
  ```

### Patch Changes

- Updated dependencies [[`276968530`](https://github.com/aws-amplify/amplify-ui/commit/276968530ba1049cfa4a9fd1efe8bd870b3e4b18), [`265f0b482`](https://github.com/aws-amplify/amplify-ui/commit/265f0b48249c89b004a40a1a06abc0c3551f45f7), [`ec495a6f6`](https://github.com/aws-amplify/amplify-ui/commit/ec495a6f638c53970edd8706a0eeb5f95d142689), [`e1fc61119`](https://github.com/aws-amplify/amplify-ui/commit/e1fc61119224a92a4648d1d1673177647b1a8e53), [`5b6c9bfe4`](https://github.com/aws-amplify/amplify-ui/commit/5b6c9bfe4ef1c0727270bffacb5f9e8045a8325d), [`14e402b6e`](https://github.com/aws-amplify/amplify-ui/commit/14e402b6eedab6bdef5cec21b0b084f230b0ce26), [`9471ea53a`](https://github.com/aws-amplify/amplify-ui/commit/9471ea53a2414879d197adb5f52c8dcb3e0df946), [`2407ac294`](https://github.com/aws-amplify/amplify-ui/commit/2407ac294270214bd20c414349d2423ab14b8066), [`5bc0c8a32`](https://github.com/aws-amplify/amplify-ui/commit/5bc0c8a32d1552313df496f96b96738637d0b157), [`64fba0fd2`](https://github.com/aws-amplify/amplify-ui/commit/64fba0fd2ec4a0c5061b461f527c8a45235eee13)]:
  - @aws-amplify/ui-react@5.3.0
  - @aws-amplify/ui@5.8.0
  - @aws-amplify/ui-react-core@2.1.32

## 2.2.0

### Minor Changes

- [#4268](https://github.com/aws-amplify/amplify-ui/pull/4268) [`f8c5b77e4`](https://github.com/aws-amplify/amplify-ui/commit/f8c5b77e46f2b304e33776b28ed5a18141f9b364) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - feat(react): Add IconsProvider to customize icons globally for all Amplify UI components

  Components that use icons:

  - Alert
  - Checkbox
  - Expander
  - Field
  - Menu
  - Pagination
  - PasswordField
  - Rating
  - SearchField
  - Select
  - StepperField
  - StorageManager

  Wrap your application with the `<IconsProvider>` (or whatever part of your app you want to customize the icons).

  ```jsx
  <IconsProvider icons={{
    alert: {
      info: <MdInfo />
    }
  }}>
    {/* ... */}
  </IconProvider>
  ```

  Works well with the react-icons package!

### Patch Changes

- Updated dependencies [[`5cc76794a`](https://github.com/aws-amplify/amplify-ui/commit/5cc76794a71584e26b1ec699c1dc1713d8a986c9), [`f8c5b77e4`](https://github.com/aws-amplify/amplify-ui/commit/f8c5b77e46f2b304e33776b28ed5a18141f9b364), [`00f2344e5`](https://github.com/aws-amplify/amplify-ui/commit/00f2344e593b47d6a7413869220606f32e5eaf1a)]:
  - @aws-amplify/ui@5.7.2
  - @aws-amplify/ui-react@5.2.0
  - @aws-amplify/ui-react-core@2.1.31

## 2.1.4

### Patch Changes

- Updated dependencies [[`00c7abc25`](https://github.com/aws-amplify/amplify-ui/commit/00c7abc25b263bb42b67d8980b31212d0a206d1c), [`54d884dd0`](https://github.com/aws-amplify/amplify-ui/commit/54d884dd0ae7f16cc1f5b71ae767e0ccf477c4b5), [`5040faf51`](https://github.com/aws-amplify/amplify-ui/commit/5040faf51ce2dc87882d452e6f90ad4ab0bd6967)]:
  - @aws-amplify/ui-react@5.1.1
  - @aws-amplify/ui@5.7.1
  - @aws-amplify/ui-react-core@2.1.30

## 2.1.3

### Patch Changes

- [#4321](https://github.com/aws-amplify/amplify-ui/pull/4321) [`d0d9ac2de`](https://github.com/aws-amplify/amplify-ui/commit/d0d9ac2de9714c5e3d020bdac486291c50761441) Thanks [@thaddmt](https://github.com/thaddmt)! - chore: set amplify dependencies to be ^ instead of >=

- Updated dependencies [[`d0d9ac2de`](https://github.com/aws-amplify/amplify-ui/commit/d0d9ac2de9714c5e3d020bdac486291c50761441), [`30624bd4f`](https://github.com/aws-amplify/amplify-ui/commit/30624bd4f165ed07a1cc94071a2d5550510b07b7)]:
  - @aws-amplify/ui-react-core@2.1.29
  - @aws-amplify/ui-react@5.1.0
  - @aws-amplify/ui@5.7.0

## 2.1.2

### Patch Changes

- Updated dependencies [[`e7e75874d`](https://github.com/aws-amplify/amplify-ui/commit/e7e75874dea238046c94e4fdd965029620171254), [`0417bd41c`](https://github.com/aws-amplify/amplify-ui/commit/0417bd41c065673eb70dd916c9008d88671445c9)]:
  - @aws-amplify/ui-react@5.0.7
  - @aws-amplify/ui@5.6.9
  - @aws-amplify/ui-react-core@2.1.28

## 2.1.1

### Patch Changes

- Updated dependencies [[`6b71ec46c`](https://github.com/aws-amplify/amplify-ui/commit/6b71ec46ccbf63c4605c9a57d3ecff098a42938a)]:
  - @aws-amplify/ui-react@5.0.6
  - @aws-amplify/ui@5.6.8
  - @aws-amplify/ui-react-core@2.1.27

## 2.1.0

### Minor Changes

- [#4262](https://github.com/aws-amplify/amplify-ui/pull/4262) [`aea82ff1b`](https://github.com/aws-amplify/amplify-ui/commit/aea82ff1bb6e066ed8b70433f4d72cd34bf0ccae) Thanks [@zchenwei](https://github.com/zchenwei)! - feat(ui-react-storage): Add a new connected component `StorageImage`. It allows you load the images managed by Amplify Storage.

  _Example:_

  ```jsx
  import { StorageImage } from '@aws-amplify/ui-react-storage';

  <StorageImage alt="StorageImage" imgKey="image.jpg" accessLevel="public" />;
  ```

### Patch Changes

- Updated dependencies [[`78fdfd6c8`](https://github.com/aws-amplify/amplify-ui/commit/78fdfd6c8268c56204f905402162ad8cb40a0c8e), [`d3ee05415`](https://github.com/aws-amplify/amplify-ui/commit/d3ee054159e1de81861bcd9273be9b1c87924cf4), [`165a8abbd`](https://github.com/aws-amplify/amplify-ui/commit/165a8abbda8aa3e95fb9466fc60f8694c646d5bc), [`13098b36a`](https://github.com/aws-amplify/amplify-ui/commit/13098b36a75452d839955d141bd25f57538b1a22), [`f0b32d275`](https://github.com/aws-amplify/amplify-ui/commit/f0b32d27509cbc00013e96f6cfc735695b7784c8), [`c3a418d8d`](https://github.com/aws-amplify/amplify-ui/commit/c3a418d8d8bd057c27de59379033c2c538762141), [`37e490d39`](https://github.com/aws-amplify/amplify-ui/commit/37e490d3997a1dc55e2998c277790945921e6dc3), [`6d14bf3f3`](https://github.com/aws-amplify/amplify-ui/commit/6d14bf3f386523bacd6832e56cc5903f644da88e), [`aea82ff1b`](https://github.com/aws-amplify/amplify-ui/commit/aea82ff1bb6e066ed8b70433f4d72cd34bf0ccae)]:
  - @aws-amplify/ui@5.6.7
  - @aws-amplify/ui-react@5.0.5
  - @aws-amplify/ui-react-core@2.1.26

## 2.0.4

### Patch Changes

- Updated dependencies [[`572730f7b`](https://github.com/aws-amplify/amplify-ui/commit/572730f7b16b87a6b2ab0c40116a4c8c5acdbd36)]:
  - @aws-amplify/ui-react@5.0.4

## 2.0.3

### Patch Changes

- Updated dependencies [[`b0e16e78c`](https://github.com/aws-amplify/amplify-ui/commit/b0e16e78c6a41945aa79f3e14fa3f9e6cb0e5e76), [`d930e2ed1`](https://github.com/aws-amplify/amplify-ui/commit/d930e2ed17f3e638e2b62699ba2dd164b32f8118)]:
  - @aws-amplify/ui-react@5.0.3
  - @aws-amplify/ui@5.6.6
  - @aws-amplify/ui-react-core@2.1.25

## 2.0.2

### Patch Changes

- Updated dependencies [[`23180b470`](https://github.com/aws-amplify/amplify-ui/commit/23180b470c7b3b78a5970d00f8c2dc5ce8773eff), [`3cecd0765`](https://github.com/aws-amplify/amplify-ui/commit/3cecd0765b46c77c49af24fae7cfb9054ebe2cdb)]:
  - @aws-amplify/ui-react-core@2.1.24
  - @aws-amplify/ui@5.6.5
  - @aws-amplify/ui-react@5.0.2

## 2.0.1

### Patch Changes

- Updated dependencies [[`be856b057`](https://github.com/aws-amplify/amplify-ui/commit/be856b057750f9d2706c2a1e43c6ff1669e50a7b)]:
  - @aws-amplify/ui-react@5.0.1

## 2.0.0

### Major Changes

- [#4048](https://github.com/aws-amplify/amplify-ui/pull/4048) [`c19278b0b`](https://github.com/aws-amplify/amplify-ui/commit/c19278b0bee7c9b499bd619c8ee0f458cbb5da83) Thanks [@calebpollman](https://github.com/calebpollman)! - What changed:

  - Wrapped StorageManager with ForwardRef to allow for exposed imperative handles and potential future DOM manipulation.
  - This allows for clearing of the files list from a separate component where the Storage Manager component is being used.

  Why was the change made:

  - There was no easy way to clear the list of files without unmounting the component.
  - This capability is important when using Storage Manager inside a form. After submit, clear all entries including uploaded files.

  How should a customer update their code:

  - No changes are required by the customer since the added prop is optional in the Storage Manager component.
  - If customers want to take advantage of this change, they can create a files ref and include it in the Storage Manager component, then made calls to clearFiles from the ref.

### Patch Changes

- Updated dependencies [[`c19278b0b`](https://github.com/aws-amplify/amplify-ui/commit/c19278b0bee7c9b499bd619c8ee0f458cbb5da83)]:
  - @aws-amplify/ui-react@5.0.0

## 1.2.4

### Patch Changes

- [#4009](https://github.com/aws-amplify/amplify-ui/pull/4009) [`9c0935c6e`](https://github.com/aws-amplify/amplify-ui/commit/9c0935c6e0093c369a4aa2c8177b847f82df11b8) Thanks [@thaddmt](https://github.com/thaddmt)! - fix(storage): allow any file types when using drag/drop

## 1.2.3

### Patch Changes

- Updated dependencies [[`7f59b3c4d`](https://github.com/aws-amplify/amplify-ui/commit/7f59b3c4dd27205a35c1b07ddc0f06a0db9de776), [`ca591a2fc`](https://github.com/aws-amplify/amplify-ui/commit/ca591a2fc319556f705be74bacd141d48f3531bd)]:
  - @aws-amplify/ui-react-core@2.1.23
  - @aws-amplify/ui-react@4.6.4
  - @aws-amplify/ui@5.6.4

## 1.2.2

### Patch Changes

- Updated dependencies [[`62425139f`](https://github.com/aws-amplify/amplify-ui/commit/62425139fb5e41a3b36b46aac1d31b965a2739fc)]:
  - @aws-amplify/ui@5.6.3
  - @aws-amplify/ui-react@4.6.3
  - @aws-amplify/ui-react-core@2.1.22

## 1.2.1

### Patch Changes

- Updated dependencies [[`998a8c74f`](https://github.com/aws-amplify/amplify-ui/commit/998a8c74ff42c250d0d028efb20afa2d54528c86), [`82f3968b7`](https://github.com/aws-amplify/amplify-ui/commit/82f3968b7f750f069bda4ad7bfa9c34d7ee6091f)]:
  - @aws-amplify/ui-react-core@2.1.21
  - @aws-amplify/ui-react@4.6.2
  - @aws-amplify/ui@5.6.2

## 1.2.0

### Minor Changes

- [#3798](https://github.com/aws-amplify/amplify-ui/pull/3798) [`89e67899c`](https://github.com/aws-amplify/amplify-ui/commit/89e67899c1b48b6bb6b235fa22b62e3f6c1e1112) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - feat(storage-manager): make processFile async. This allows for reading the file contents and performing async validations or mutations like creating a hash of the file contents.

  ```jsx
  const processFile = async ({ file }) => {
    const fileExtension = file.name.split('.').pop();

    return file
      .arrayBuffer()
      .then((filebuffer) => window.crypto.subtle.digest('SHA-1', filebuffer))
      .then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
          .map((a) => a.toString(16).padStart(2, '0'))
          .join('');
        return { file, key: `${hashHex}.${fileExtension}` };
      });
  };

  export const StorageManagerHashExample = () => {
    return (
      <StorageManager
        acceptedFileTypes={['image/*']}
        accessLevel="public"
        maxFileCount={1}
        processFile={processFile}
      />
    );
  };
  ```

- [#3788](https://github.com/aws-amplify/amplify-ui/pull/3788) [`37d63424e`](https://github.com/aws-amplify/amplify-ui/commit/37d63424e23e971713f76d201ce829ec6974fc54) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - feat(storage-manager): add metadata and the rest of the Storage.put params

  ```jsx
  const processFile = ({ file, key }) => {
    return {
      file,
      key,
      metadata: {
        id: key,
      },
    };
  };

  export function StorageManagerMetadataExample() {
    return (
      <StorageManager
        acceptedFileTypes={['image/*']}
        accessLevel="private"
        maxFileCount={3}
        showThumbnails={true}
        processFile={processFile}
      />
    );
  }
  ```

### Patch Changes

- Updated dependencies [[`4ca838978`](https://github.com/aws-amplify/amplify-ui/commit/4ca838978d23a086f80859a7cb57f184ff49e2d4), [`1412aa4eb`](https://github.com/aws-amplify/amplify-ui/commit/1412aa4eb4837c44c4e5ecce66188e1e256f952c), [`d6a3676f2`](https://github.com/aws-amplify/amplify-ui/commit/d6a3676f2295ed39fa83b9d31a9540f3437ba129), [`37d63424e`](https://github.com/aws-amplify/amplify-ui/commit/37d63424e23e971713f76d201ce829ec6974fc54), [`9551c521b`](https://github.com/aws-amplify/amplify-ui/commit/9551c521b8bed4844f5d57a8cf842ed8b5bd6bee)]:
  - @aws-amplify/ui@5.6.1
  - @aws-amplify/ui-react@4.6.1
  - @aws-amplify/ui-react-core@2.1.20

## 1.1.0

### Minor Changes

- [#3669](https://github.com/aws-amplify/amplify-ui/pull/3669) [`5d78e3b4b`](https://github.com/aws-amplify/amplify-ui/commit/5d78e3b4b554f355ecd3a80678e0b9df6be0b228) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - feat(storage-manager): add `onUploadStart` event handler and add the file key to `onUploadError`

  ```jsx
  export function StorageManagerExample() {
    const [files, setFiles] = React.useState({});
    return (
        <StorageManager
          acceptedFileTypes={['image/*']}
          accessLevel="private"
          maxFileCount={3}
          onFileRemove={({ key }) => {
            setFiles((prevFiles) => {
              return {
                ...prevFiles,
                [key]: undefined,
              };
            });
          }}
          onUploadError={(error, { key }) => {
            setFiles((prevFiles) => {
              return {
                ...prevFiles,
                [key]: {
                  status: 'error',
                },
              };
            });
          }}
          onUploadSuccess={({ key }) => {
            setFiles((prevFiles) => {
              return {
                ...prevFiles,
                [key]: {
                  status: 'success',
                },
              };
            });
          }}
          onUploadStart={({ key }) => {
            setFiles((prevFiles) => {
              return {
                ...prevFiles,
                [key]: {
                  status: 'uploading',
                },
              };
            });
          }}
        />
        {Object.keys(files).map((key) => {
          return files[key] ? (
            <div>
              {key}: {files[key].status}
            </div>
          ) : null;
        })}
    );
  }
  ```

### Patch Changes

- [#3672](https://github.com/aws-amplify/amplify-ui/pull/3672) [`fed85d4d7`](https://github.com/aws-amplify/amplify-ui/commit/fed85d4d7d54b5f845bc409a9a5f3ca5acd605c6) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - fix(storage): fix defaultFiles

  Previously if you added `defaultFiles` to the StorageManager you would get weird behavior saying it was uploading when it actually wasn't. Also if you passed null or improper file objects you would get an error.

- Updated dependencies [[`bc3fd6d95`](https://github.com/aws-amplify/amplify-ui/commit/bc3fd6d951b1ab1b188722f59ce04118d04d16af), [`c3918d9ab`](https://github.com/aws-amplify/amplify-ui/commit/c3918d9aba1a9bedf8f1c8d45097f85b8ca9d482), [`747516159`](https://github.com/aws-amplify/amplify-ui/commit/747516159d504b551dab09cbe8f214fa7b4505df)]:
  - @aws-amplify/ui@5.6.0
  - @aws-amplify/ui-react@4.6.0
  - @aws-amplify/ui-react-core@2.1.19

## 1.0.1

### Patch Changes

- [#3657](https://github.com/aws-amplify/amplify-ui/pull/3657) [`fefc4cb3d`](https://github.com/aws-amplify/amplify-ui/commit/fefc4cb3df12d344792b33ad100c6252c9fa2819) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Adding in missing changeset from previous release.

- Updated dependencies [[`fefc4cb3d`](https://github.com/aws-amplify/amplify-ui/commit/fefc4cb3df12d344792b33ad100c6252c9fa2819)]:
  - @aws-amplify/ui@5.5.10
  - @aws-amplify/ui-react@4.5.1
  - @aws-amplify/ui-react-core@2.1.18

## 1.0.0

### Major Changes

- [#3589](https://github.com/aws-amplify/amplify-ui/pull/3589) [`3c3fbf4d7`](https://github.com/aws-amplify/amplify-ui/commit/3c3fbf4d73d9381cb3ee6d5590eb97062143f589) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - FileUploader becomes StorageManager!

  Creating a new package `@aws-amplify/ui-react-storage` to keep all future Storage related connected components, the first of which is the StorageManager.
  The StorageManager is a partial re-write of the FileUploader to address some customer issues and make the component more scalable for the future.

  Some notable changes from FileUploader -> StorageManager

  - Component slots: You can override each part of the StorageManager with your custom UI
  - Pre-upload process files: You can use this to programatically change file names before upload or perform optimizations and validations.
  - Easy text updates: The StorageManager component has a `displayText` prop where you can pass in all the text the component uses.

  ```jsx
  import { StorageManager } from '@aws-amplify/ui-react-storage';

  export const DefaultStorageManagerExample = () => {
    return (
      <StorageManager
        acceptedFileTypes={['image/*']}
        accessLevel="public"
        maxFileCount={1}
      />
    );
  };
  ```

### Patch Changes

- Updated dependencies [[`61f525f53`](https://github.com/aws-amplify/amplify-ui/commit/61f525f531978a894373b41a70bd788d507bb514), [`3c3fbf4d7`](https://github.com/aws-amplify/amplify-ui/commit/3c3fbf4d73d9381cb3ee6d5590eb97062143f589), [`72d5e06eb`](https://github.com/aws-amplify/amplify-ui/commit/72d5e06ebbf024735ec44c04ad6e61b62a7dd20a)]:
  - @aws-amplify/ui-react@4.5.0
