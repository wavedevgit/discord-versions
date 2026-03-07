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
│   ├── linux (Electron app for linux)
│   │   ├── canary.json
│   │   ├── ptb.json
│   │   └── stable.json
│   ├── mac (Electron app for mac)
│   │   ├── canary.json
│   │   ├── ptb.json
│   │   └── stable.json
│   └── win (Electron app for windows)
│       ├── canary.json
│       ├── ptb.json
│       └── stable.json
├── ios (Mobile app for ios)
│   └── stable.json
└── web (Web app)
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

| Platform | Supported | Commit Hash | Build Number | All Channels |
| -------- | --------- | ----------- | ------------ | ------------ |
| Web      | ✅        | ✅          | ✅           | ✅           |
| Desktop  | ⚠️        | ❌          | ❌           | ✅           |
| Android  | ✅        | ✅          | ✅           | ✅           |
| iOS      | ⚠️        | ❌          | ❌           | ❌           |

## Why this exists?

This is mainly used to create a header called `X-Super-Properties`.
