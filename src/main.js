const fs = require('fs/promises');
const path = require('path');
const child_process = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(child_process.exec);

const fetchOpts = {
    headers: {
        'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
    },
};

const WebReleaseChannels = {
    stable: 'https://discord.com/app',
    ptb: 'https://ptb.discord.com/app',
    canary: 'https://canary.discord.com/app',
};

async function getWebVersion(releaseChannel = 'canary') {
    const html = await (
        await fetch(WebReleaseChannels[releaseChannel], fetchOpts)
    ).text();
    const match = html.match(
        /"BUILD_NUMBER":"(?<buildNumber>\d+)",.+?,"VERSION_HASH":"(?<versionHash>[a-fA-F0-9]{40})"/,
    ).groups;
    return {
        buildNumber: Number(match.buildNumber),
        commitHash: match.versionHash,
    };
}

async function getDesktopVersion(
    releaseChannel = 'canary',
    platform = 'win',
    arch = 'x64',
) {
    const result = {};
    if (platform === 'win') {
        result.versionCode = (
            await (
                await fetch(
                    `https://updates.discord.com/distributions/app/manifests/latest?channel=${releaseChannel}&platform=win&arch=` +
                        arch,
                )
            ).json()
        ).full.host_version.join('.');
    }
    const Platforms = {
        win: 'win',
        mac: 'osx',
        linux: 'linux',
    };
    if (!result.versionCode)
        // this doesnt fucking have arch
        // i'll honestly make this get all the info from the app bundle instead
        result.versionCode = (
            await (
                await fetch(
                    `https://discord.com/api/v9/updates/${releaseChannel}?platform=${Platforms[platform]}`,
                )
            ).json()
        )?.name;
    return result;
}

async function getAndroidVersion(releaseChannel = 'alpha') {
    const { latest } = await (
        await fetch('https://tracker.vendetta.rocks/tracker/index')
    ).json();
    if (!latest[releaseChannel])
        throw new Error(
            'Expected android release channel to be one of alpha, beta, stable',
        );
    const version = latest[releaseChannel].toString();

    let manifest = {};

    if (typeof latest[releaseChannel] === 'number') {
        await execAsync(
            `mkdir -p android_app_workdir && wget https://tracker.vendetta.rocks/tracker/download/${latest[releaseChannel]}/base -O ./android_app_workdir/base.apk`,
        );
        await execAsync(
            'unzip ./android_app_workdir/base.apk -d ./android_app_workdir/base',
        );
        manifest = JSON.parse(
            await fs.readFile(
                './android_app_workdir/base/assets/manifest.json',
                'utf-8',
            ),
        );

        await fs.rm('./android_app_workdir', { recursive: true, force: true });
    }

    return {
        // this is not build number, build number is actually from manifest.json, this is only used for user agent
        versionNumber: latest[releaseChannel],
        versionCode: version.slice(0, -3) + '.' + version.slice(-2),
        commitHash: manifest?.metadata?.commit,
        buildNumber: Number(manifest?.metadata?.build),
    };
}

const mkdir = async (path, opts) => {
    try {
        return await fs.mkdir(path, opts);
    } catch {}
};

async function main() {
    /**
     * Current status:
     * Web (full support)
     * Desktop (needs: commit hash & build number)
     * Android (full support)
     * Ios (needs: beta channel, build number & commit hash)
     */
    try {
        await mkdir('./data');
        await mkdir('./data/web');
        await mkdir('./data/ios');
        await mkdir('./data/android');
        await mkdir('./data/desktop/x86/linux', { recursive: true });
        await mkdir('./data/desktop/x86/windows', { recursive: true });
        await mkdir('./data/desktop/x86/mac', { recursive: true });

        await mkdir('./data/desktop/x64/linux', { recursive: true });
        await mkdir('./data/desktop/x64/windows', { recursive: true });
        await mkdir('./data/desktop/x64/mac', { recursive: true });

        await mkdir('./data/desktop/arm64/linux', { recursive: true });
        await mkdir('./data/desktop/arm64/windows', { recursive: true });
        await mkdir('./data/desktop/arm64/mac', { recursive: true });
    } catch (err) {
        console.log('failed to make dirs', err);
    }

    const web = ['stable', 'ptb', 'canary'];
    const desktop = ['stable', 'canary', 'ptb'];
    const desktopPlatforms = ['linux', 'mac', 'win'];
    const desktopArchs = ['x86', 'x64', 'arm64'];
    const android = ['stable', 'beta', 'alpha'];

    for (let channel of web)
        await fs.writeFile(
            './data/web/' + channel + '.json',
            JSON.stringify(await getWebVersion(channel), 'utf-8'),
        );

    for (let channel of android)
        await fs.writeFile(
            './data/android/' + channel + '.json',
            JSON.stringify(await getAndroidVersion(channel), 'utf-8'),
        );

    for (let platform of desktopPlatforms)
        for (let channel of desktop)
            for (let arch of desktopArchs)
                await fs.writeFile(
                    path.join(
                        './data/desktop/',
                        arch,
                        platform,
                        channel + '.json',
                    ),
                    JSON.stringify(
                        await getDesktopVersion(channel, platform, arch),
                    ),
                );

    // there is no way rn of getting ipa to get manifest.json and grab build number and commit hash sadly
    const ios = {
        versionCode: (
            await (
                await fetch(
                    'https://itunes.apple.com/lookup?bundleId=com.hammerandchisel.discord',
                    fetchOpts,
                )
            ).json()
        ).results?.[0]?.version,
    };

    await fs.writeFile('./data/ios/stable.json', JSON.stringify(ios));
}

main();
