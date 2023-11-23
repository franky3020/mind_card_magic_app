import "./App.css";
import {Link} from "react-router-dom";

export default function App() {

  return (
    <div className="App">
      <Link to="/magicPage">
        <button>Start</button>
      </Link>
    </div>
  );
}
