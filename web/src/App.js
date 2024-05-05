import "./App.css";
import {Link} from "react-router-dom";
import appLogo from "./assets/app_logo.png";
import MagicManage from "./service/MagicManage";
import { useEffect } from "react";
import CheckNeedUpdateForAndroid from "./CheckNeedUpdate";

export default function App() {

  useEffect(() => {
    document.addEventListener("deviceready", onDeviceReady, false);

    CheckNeedUpdateForAndroid('1.0.0', '24', ()=> { console.log('franky-test')});
    MagicManage.init();
  }, []);

  function onDeviceReady() {
    console.log("In onDeviceReady device:", window.device);

    window.cordova.getAppVersion.getVersionNumber().then((version) => {
      console.log("In onDeviceReady version:", version);
    });
  }

  return (
    <div className="App">
      <div className="TAIL-flex TAIL-justify-center TAIL-my-8">
        <img src={appLogo} alt='appLogo' className="TAIL-w-10/12"/>
      </div>

      <div className="TAIL-flex TAIL-justify-center TAIL-my-8">
        <Link to="/magicPage">
          <button className="no-uppercase grey darken-1 waves-effect waves-light btn-large pulse flow-text">
            Start
          </button>
        </Link>
      </div>

      <div className="TAIL-flex TAIL-justify-center TAIL-my-8">
        <Link to="/magicPage">
          <button className="no-uppercase waves-effect grey darken-1 waves-light btn-large flow-text">Learn</button>
        </Link>
      </div>

    </div>
  );
}
