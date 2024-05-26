import "./App.css";
import { Link } from "react-router-dom";
import appLogo from "./assets/app_logo.png";
import MagicManage from "./service/MagicManage";
import { useState, useEffect } from "react";
import {
  CheckNeedUpdateForAndroid,
  CheckNeedUpdateForiOS,
} from "./CheckNeedUpdate";

import { ReminderDialog } from "./components/ReminderDialog";

const dialogStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: "2147483647",
};

export default function App() {

  const [showForceUpdate, setShowForceUpdate] = useState(false);

  let runPlatform = "";

  useEffect(() => {
    document.addEventListener("deviceready", onDeviceReady, false);
    MagicManage.init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onDeviceReady() {
    console.log("In onDeviceReady device:", window.device);

    window.cordova.getAppVersion.getVersionNumber().then((versionNumber) => {
      console.log("versionNumber:", versionNumber);
      runPlatform = window.device.platform;
      if (window.device.platform === "Android") {
        CheckNeedUpdateForAndroid(
          versionNumber,
          window.device.sdkVersion,
          () => {
            setShowForceUpdate(true);
          }
        );
      } else {
        // window.device.version 是指 iOS 版本
        CheckNeedUpdateForiOS(versionNumber, window.device.version, () => {
          setShowForceUpdate(true);
        });
      }
    });
  }

  function goToLearnVedio() {
    window.open("https://www.youtube.com/watch?v=6DfUauc_3g4", "_system");
  }

  function goToStore() {
    if (runPlatform === "Android") {
      window.open(
        "https://play.google.com/store/apps/details?id=tw.franky.princesscard",
        "_system"
      );
    } else {
      window.open(
        "https://apps.apple.com/us/app/princess-card-magic-trick/id6480343480",
        "_system"
      );
    }
  }

  return (
    <div className="App">
      <div onClick={goToStore} className="TAIL-flex TAIL-justify-center TAIL-my-8">
        <img src={appLogo} alt="appLogo" className="TAIL-w-10/12" />
      </div>

      <div className="TAIL-flex TAIL-justify-center TAIL-my-8">
        <Link to="/magicPage">
          <button className="no-uppercase grey darken-1 waves-effect waves-light btn-large pulse flow-text">
            Start
          </button>
        </Link>
      </div>

      <div className="TAIL-flex TAIL-justify-center TAIL-my-8">
        <button
          onClick={goToLearnVedio}
          className="no-uppercase waves-effect grey darken-1 waves-light btn-large flow-text"
        >
          Learn
        </button>
      </div>
      {showForceUpdate && (
        <div style={dialogStyle}>
          <ReminderDialog
            title="New App release"
            message="You need to update"
            confirmFunc={() => {
              goToStore();
            }}
            noFunc={() => {}}
            confirmBtnText="Go!"
            onlyConfirm={true}
          ></ReminderDialog>
        </div>
      )}
    </div>
  );
}
