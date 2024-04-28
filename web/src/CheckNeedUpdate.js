import axios from 'axios';

// interface CheckVersionRes {
//     lastVersion: {
//         miniOS: string,
//         minSDK: string,
//         version: string
//     };
//     versionDict: 
//     firstName: string;
// }

// 如果 是 ios 裝置 則 deviceSDKVersion 為 undefined
// 如果 是 android 裝置 則 deviceIOSVersion 為 undefined
export default function CheckNeedUpdate (deviceSDKVersion, deviceIOSVersion) {
    let isIOS = false;

    if (typeof deviceSDKVersion !== "undefined" && typeof deviceIOSVersion !== "undefined") {
        console.error('不該兩個版本同時有設定');
        return false;
    }

    if (typeof deviceSDKVersion !== "undefined") {
        isIOS = false;
    }

    if (typeof deviceIOSVersion !== "undefined") {
        isIOS = true;
    }

    axios.get('https://b4hqov4gxu2nkkztjvk6amsqba0pwmqx.lambda-url.us-east-2.on.aws/')
      .then((res) => {
        console.log(res);
    })
}
