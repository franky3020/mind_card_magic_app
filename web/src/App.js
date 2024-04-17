import "./App.css";
import {Link} from "react-router-dom";
import appLogo from "./assets/app_logo.png";


export default function App() {

  return (
    <div className="App">
      <div className="TAIL-flex TAIL-justify-center TAIL-my-8">
        <img src={appLogo} alt='appLogo' className="TAIL-w-10/12"/>
      </div>

      <div className="TAIL-flex TAIL-justify-center TAIL-my-8">
        <Link to="/magicPage">
          <button className="btn grey lighten-5 waves-effect waves-light btn-large pulse">Start</button>
        </Link>
      </div>

      <div className="TAIL-flex TAIL-justify-center TAIL-my-8">
        <Link to="/magicPage">
          <button className="btn waves-effect waves-light btn-large">Tutorial</button>
        </Link>
      </div>

    </div>
  );
}
