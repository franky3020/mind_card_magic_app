import './App.css';
import { Rnd } from "react-rnd";

import hk from "./assets/cards/hk_compressed.jpg";

function App() {
  return (
    <div className="App">
      <Rnd
        default={{
          x: 0,
          y: 0,
          width: 320,
          height: 200,
        }}
      >
        <div>
          <img
            className="Cannot-select"
            src={hk}
            alt="hk_compressed"
            draggable="false"
          />
        </div>

      </Rnd>
    </div>
  );
}

export default App;
