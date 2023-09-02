import './App.css';
import { Rnd } from "react-rnd";
import { useState } from 'react';

import hkCard from "./assets/cards/hk_compressed.jpg";

import cqCard from "./assets/cards/cq_compressed.jpg";


function App() {

  const [showCardSrc, setShowCardSrc] = useState(hkCard);


  function hideCard() {
    if (showCardSrc === hkCard) {
      // TODO: 需修正成卡片背面
      setShowCardSrc(cqCard);
    }
  }



  return (
    <div className="App">

      <div className="card-zoom">

      <Rnd
        default={{
          x: 100,
          y: 100,
        }}
        bounds={'parent'}
      >
        <div onClick={hideCard} onTouchStart={hideCard}>
          <img
            className="Cannot-select"
            src={showCardSrc}
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
