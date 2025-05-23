## Build System Tests

Build System Tests is to create Apps using different Frameworks, Built Tools with Amplify UI and run build test against them.

### Github Action

There are two Github workflows:

- Build System Test
- Build System Test React Native (runs less frequently because the tests take longer)

We currently test for the following versions:

#### Build System Test

| Framework       | Version | Build Tool  | Version |
| --------------- | ------- | ----------- | ------- |
| React (Next.js) | Latest  | Next CLI    | Latest  |
| React           | Latest  | Vite        | Latest  |
| React (Next.js) | 18      | Next CLI    | 13      |
| React           | 18      | Vite        | 3       |
| Angular         | Latest  | Angular CLI | Latest  |
| Angular         | 14      | Angular CLI | 14      |
| Vue (Nuxt)      | Latest  | Nuxt CLI    | Latest  |
| Vue             | Latest  | Vite        | Latest  |
| Vue             | Latest  | Vue CLI     | Latest  |
| Vue             | 3       | Vite        | 3       |

#### Build System Test — React Native

| React Native Version | Build Tool/Framework | Version |
| -------------------- | -------------------- | ------- |
| Latest               | CLI                  | Latest  |
| Latest               | Expo                 | Latest  |
| 0.71 - 0.77          | CLI                  | Latest  |
| 0.76 - 0.77          | Expo                 | 52      |
| 0.74 - 0.75          | Expo                 | 51      |
| 0.73                 | Expo                 | 50      |

### Local

In this _build-system-tests_ folder, run

```sh
$ npm run <MEGA_APP_NAME> # e.g. npm run react-latest-vite-latest-ts
$ npm run test:<FRAMEWORK>:<BUILD_TOOL> -- --framework-version <FRAMEWORK_VERSION_NUMBER> --build-tool-version <BUILD_TOOL_VERSION_NUMBER> # e.g npm run test:vue:vite -- -f latest -b 2
```

Note:
We test different environments by changing the NodeJS versions and npm/yarn versions on Github Workflows, which need to be changed manually when testing on local.

To change the node versions

```sh
nvm install <VERSION-NUMBER> # if hasn't installed
nvm use <VERSION-NUMBER>
```

### Create A New MegaApp not exist in package.json

If the MegaApp you want to create is not pre-configured in the package.json, here are several ways to create it using the scripts/ .

#### Setup MegaApp in One Step

```sh
$ ./mega-app-create-app.sh --build-tool next --build-tool-version latest --name react-latest-next-latest-node-18-ts --framework react --framework-version latest

$ npm run test:<FRAMEWORK>:<BUILD_TOOL> -- --framework-version <FRAMEWORK_VERSION_NUMBER> --build-tool-version <BUILD_TOOL_VERSION_NUMBER> # e.g npm run test:vue:vite -- -f latest -b 2
```

### Setup MegaApp Step by Step

- Step 1: Create

```sh
$ ./mega-app-create-app.sh --build-tool next --build-tool-version latest --name react-latest-next-latest-node-18-ts --framework react --framework-version latest
```

- Step 2: Copy/Modify Files

```sh
$ ./mega-app-copy-files.sh --build-tool  next --build-tool-version latest --name react-latest-next-latest-node-18-ts --framework react --framework-version latest
$ ./mega-app-copy-files.sh -n react-latest-next-latest-node-18-ts
$ ./mega-app-copy-files.sh -B next -b latest -l typescript -n react-latest-next-latest-node-18-ts -F react -f latest
```

- Step 3: Install Dependencies

```sh
$ ./mega-app-install.sh --build-tool next --build-tool-version latest --name react-latest-next-latest-node-18-ts --framework react --framework-version latest --pkg-manager npm
$ ./mega-app-install.sh -B next -b latest -l typescript -n react-latest-next-latest-node-18-ts -F react -f latest -P npm -p latest
$ ./mega-app-install.sh -n react-latest-next-latest-node-18-ts
```

- Step 4: Run Build

```sh
$ ./mega-app-build.sh --build-tool next --build-tool-version latest --name react-latest-next-latest-node-18-ts --framework react --framework-version latest --pkg-manager npm
$ ./mega-app-build.sh -B next -b latest -l typescript -n react-latest-next-latest-node-18-ts -F react -f latest -P npm
$ ./mega-app-build.sh -n react-latest-next-latest-node-18-ts
```

### Troubleshooting

- If see the following error message:

> “Your global Angular CLI version (14.2.11) is greater than your local version (12.2.18). The local Angular CLI version is used.”

It might be a @angular/cli@12.2.18 installed in root-folder _node_modules_. Deleting it would resolve the error.
