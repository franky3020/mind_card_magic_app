import "./App.css";
import {Link} from "react-router-dom";

export default function App() {

  return (
    <div className="App">
      <Link to="/magicPage">
        <button className="btn waves-effect waves-light">Start</button>
      </Link>
    </div>
  );
}
