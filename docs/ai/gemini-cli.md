# gemini cli

## Development Setup and Workflow

**Prerequisites:**

1.  **Node.js**:
    - **Development:** Please use Node.js `~20.19.0`. This specific version is required due to an upstream development dependency issue. You can use a tool like [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions.
    - **Production:** For running the CLI in a production environment, any version of Node.js `>=20` is acceptable.
2.  **Git**

### Build Process

To clone the repository:

```sh
git clone https://github.com/google-gemini/gemini-cli.git # Or your fork's URL
cd gemini-cli
```

To install dependencies defined in `package.json` as well as root dependencies:

```bash
npm install
```

To build the entire project (all packages):

```bash
npm run build
```

### Running

To start the Gemini CLI from the source code (after building), run the following command from the root directory:

```bash
npm start
```

## [Uninstalling the CLI](https://google-gemini.github.io/gemini-cli/docs/Uninstall.html)

### Method 1: Using npx

npx runs packages from a temporary cache without a permanent installation. To “uninstall” the CLI, you must clear this cache, which will remove gemini-cli and any other packages previously executed with npx.

The npx cache is a directory named \_npx inside your main npm cache folder. You can find your npm cache path by running npm config get cache.

::: code-group

```sh [For macOS / Linux]
# The path is typically ~/.npm/_npx
$ rm -rf "$(npm config get cache)/\_npx"
```

```sh [For Windows]
# The path is typically %LocalAppData%\npm-cache_npx
$ rmdir /s /q "%LocalAppData%\npm-cache_npx"
```

```sh [For PowerShell]
# The path is typically $env:LocalAppData\npm-cache_npx
$ Remove-Item -Path (Join-Path $env:LocalAppData "npm-cache_npx") -Recurse -Force
```

:::

### Method 2: Using npm (Global Install)

If you installed the CLI globally (e.g., npm install -g @google/gemini-cli), use the npm uninstall command with the -g flag to remove it.

```sh
$ npm uninstall -g @google/gemini-cli
```

This command completely removes the package from your system.

## solve login with google issues

### [connect ETIMEDOUT](https://github.com/google-gemini/gemini-cli/issues/2961)

> Failed to login. Message: request to https://oauth2.googleapis.com/token failed, reason: connect ETIMEDOUT 64.233.189.95:443

open the TUN mode in the VPN's setttings.

### [requires setting the GOOGLE_CLOUD_PROJECT env var](https://github.com/google-gemini/gemini-cli/issues/3001)

> Failed to login. Message: This account requires setting the GOOGLE_CLOUD_PROJECT env var. See │
> │ https://goo.gle/gemini-cli-auth-docs#workspace-gca

Add your Project ID to the .env file:
Open the newly created .env file and add the following line, replacing [YOUR_PROJECT_ID] with your actual Google Cloud Project ID:

```sh
GOOGLE_CLOUD_PROJECT=[YOUR_PROJECT_ID]
For example: GOOGLE_CLOUD_PROJECT=massive-capsule-465212
```

Obtain your Project ID (if you don't have a project yet):
If you don't already have a Google Cloud Project, go to the [Google Cloud Console](https://cloud.google.com/gemini/docs/discover/set-up-gemini#enable-api) and create a new project. You will get your [YOUR_PROJECT_ID] during the project creation process.

Run Gemini CLI and Authenticate:
After saving the .env file, open your terminal (or command prompt) and run any gemini CLI command. You should now be prompted to log in with your Google account in your browser. Once authenticated, the "Failed to login" error should be resolved, and you can use the Gemini CLI normally.
