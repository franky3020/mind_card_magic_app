import './App.css';
import { Rnd } from "react-rnd";

import hk from "./assets/cards/hk_compressed.jpg";

function App() {
  return (
    <div className="App">

      <div class="card-zoom">

      <Rnd
        default={{
          x: 100,
          y: 100,
        }}
        bounds={'parent'}
      >
        <div>
          <img
            className="Cannot-select"
            src={hk}
            width={80}
            alt="hk_compressed"
            draggable="false"
          />
        </div>

      </Rnd>

      </div>
    </div>
  );
}

export default App;
