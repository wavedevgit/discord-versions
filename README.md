# discord-versions

Discord versions with their build number for all types of platforms and apps of discord

## Data Structure

```
data
├── android (Mobile app for android)
│   ├── alpha.json
│   ├── beta.json
│   └── stable.json
├── desktop
│   ├── arm64
│   │   ├── linux (Electron Desktop app for linux)
│   │   │   ├── canary.json
│   │   │   ├── ptb.json
│   │   │   └── stable.json
│   │   ├── mac (Electron Desktop app for macOS)
│   │   │   ├── canary.json
│   │   │   ├── ptb.json
│   │   │   └── stable.json
│   │   └── win (Electron Desktop app for windows)
│   │       ├── canary.json
│   │       ├── ptb.json
│   │       └── stable.json
│   ├── x64
│   │   ├── linux (Electron Desktop app for linux)
│   │   │   ├── canary.json
│   │   │   ├── ptb.json
│   │   │   └── stable.json
│   │   ├── mac (Electron Desktop app for macOS)
│   │   │   ├── canary.json
│   │   │   ├── ptb.json
│   │   │   └── stable.json
│   │   └── win (Electron Desktop app for windows)
│   │       ├── canary.json
│   │       ├── ptb.json
│   │       └── stable.json
│   └── x86
│       ├── linux (Electron Desktop app for linux)
│       │   ├── canary.json
│       │   ├── ptb.json
│       │   └── stable.json
│       ├── mac (Electron Desktop app for macOS)
│       │   ├── canary.json
│       │   ├── ptb.json
│       │   └── stable.json
│       └── win (Electron Desktop app for windows)
│           ├── canary.json
│           ├── ptb.json
│           └── stable.json
├── ios (Mobile app for IOS)
│   └── stable.json
└── web (Web App)
    ├── canary.json
    ├── ptb.json
    └── stable.json
```

## Data type

```ts
interface Version {
    /**
     * The version code (e.g: 314.09)
     * This is different from the build number
     */
    versionCode?: string;
    /**
     * The version number (e.g: 319111)
     * This is not the build number, instead its a different number for the version code
     */
    versionNumber?: number;
    /**
     * The build number that increments every build
     * */
    buildNumber?: number;
    /**
     * Commit hash
     * On web its same as version hash
     */
    commitHash?: string;
}
```

## Current data progress

| Platform | Supported | Commit Hash  | Build Number | All Channels |
| -------- | --------- | ------------ | ------------ | ------------ |
| Web      | ✅        | ✅           | ✅           | ✅           |
| Desktop  | ✅        | doesnt exist | ✅           | ✅           |
| Android  | ✅        | ✅           | ✅           | ✅           |
| iOS      | ⚠️        | ❌           | ❌           | ❌           |

## Why this exists?

This is mainly used to create a header called `X-Super-Properties`.
