import axios from 'axios';

// res e.g.
// {
//     lastVersion: {
//         miniOS: "11.0",
//         minSDK: "24",
//         version: "1.0.0"
//     },
//     versionDict: {
//         1.0.0: {
//         miniOS: "11.0",
//         minSDK: "24",
//         forceUpdate: false
//         }
//     }
// }


const CHECK_VERSION_UEL = "https://b4hqov4gxu2nkkztjvk6amsqba0pwmqx.lambda-url.us-east-2.on.aws/";

// deviceSDKVersion 傳入字串
export function CheckNeedUpdateForAndroid (currentVersion, deviceSDKVersion, callback) {

    if (typeof deviceSDKVersion === "undefined" ||
        typeof currentVersion === "undefined") {
        console.error('需要傳入 deviceSDKVersion & currentVersion');
        return;
    }

    let versionCheckRes = {
        lastVersion: {
            miniOS: undefined,
            minSDK: undefined,
            version: undefined
        },
        versionDict: undefined
    };

    axios.get(CHECK_VERSION_UEL)
      .then((res) => {
        versionCheckRes = res.data;
        console.log(versionCheckRes);

        const currentVersionInfo = versionCheckRes.versionDict[currentVersion];
        if (typeof currentVersionInfo !== "undefined") {
            const needForceUpdate = currentVersionInfo.forceUpdate;
            if (needForceUpdate) {
                const sdkVersionOfNewApp = parseFloat(versionCheckRes.lastVersion.minSDK);
                const thisDeviceSdkVersion = parseFloat(deviceSDKVersion);
                if (sdkVersionOfNewApp <= thisDeviceSdkVersion) {
                    callback();
                }
            }
        }
    })
}


export function CheckNeedUpdateForiOS (currentVersion, deviceiOSVersion, callback) {

    if (typeof deviceiOSVersion === "undefined" ||
        typeof currentVersion === "undefined") {
        console.error('需要傳入 deviceiOSVersion & currentVersion');
        return;
    }

    let versionCheckRes = {
        lastVersion: {
            miniOS: undefined,
            minSDK: undefined,
            version: undefined
        },
        versionDict: undefined
    };

    axios.get(CHECK_VERSION_UEL)
      .then((res) => {
        versionCheckRes = res.data;
        console.log(versionCheckRes);

        const currentVersionInfo = versionCheckRes.versionDict[currentVersion];
        if (typeof currentVersionInfo !== "undefined") {
            const needForceUpdate = currentVersionInfo.forceUpdate;
            if (needForceUpdate) {
                const iOSVersionOfNewApp = parseFloat(versionCheckRes.lastVersion.miniOS);
                const thisDeviceiOSVersion = parseFloat(deviceiOSVersion);
                if (iOSVersionOfNewApp <= thisDeviceiOSVersion) {
                    callback();
                }
            }
        }
    })
}
