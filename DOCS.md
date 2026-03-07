# Api Docs

The api is available at `https://discord-versions.pages.dev/`

## Endpoints

### Get ios version info

GET `/ios/:release_channel.json`

**Params:**

| Param           | Type               | Description         |
| --------------- | ------------------ | ------------------- |
| release_channel | "stable" \| "beta" | The release channel |

Returns [version object](#version-object)

### Get android version info

GET `/android/:release_channel.json`

**Params:**

| Param           | Type                          | Description         |
| --------------- | ----------------------------- | ------------------- |
| release_channel | "stable" \| "beta" \| "alpha" | The release channel |

Returns [version object](#version-object)

### Get web version info

GET `/web/:release_channel.json`

**Params:**

| Param           | Type                          | Description         |
| --------------- | ----------------------------- | ------------------- |
| release_channel | "stable" \| "canary" \| "ptb" | The release channel |

Returns [version object](#version-object)

### Get desktop version info

GET `/desktop/:arch/:platform/:release_channel.json`

**Params:**

| Param           | Type                          | Description         |
| --------------- | ----------------------------- | ------------------- |
| release_channel | "stable" \| "canary" \| "ptb" | The release channel |
| arch            | "x64" \| "x86" \| "arm64"     | The architecture    |
| platform        | "linux" \| "mac" \| "win"     | The platform        |

Returns [version object](#version-object)

# Version Object

| Field               | Type   | Description                                                     |
| ------------------- | ------ | --------------------------------------------------------------- |
| versionCode?        | string | The version code (e.g: 314.09)                                  |
| versionNumber? [^1] | number | The version number (e.g: 318011)                                |
| buildNumber?        | number | The build number (e.g: 5237)                                    |
| commitHash? [^2]    | string | The commit hash (e.g: eefefc13ce3aac02a2c6c4e23869175c3bb47dee) |

[^1]: This is not the same as the build number.

[^2]: This is the same as the version hash.

**Made with ❤️ by @wavedevgit.**
