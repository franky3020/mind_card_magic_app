import './App.css';
import { Rnd } from "react-rnd";
import { useState } from 'react';

import hkCard from "./assets/cards/hk_compressed.jpg";

import cqCard from "./assets/cards/cq_compressed.jpg";


function App() {

  const [showCardSrc, setShowCardSrc] = useState(hkCard);

  function hideCard(e) {
    if (showCardSrc === hkCard) {
      // TODO: 需修正成卡片背面
      setShowCardSrc(cqCard);
    }
    
  }

  function onDragStart(e, data) {
    hideCard();
  }



  return (
    <div className="App">
      <Rnd
        default={{
          x: 100,
          y: 100,
        }}
        bounds={'parent'}
        onDragStart={onDragStart}
      >
        <div onClick={hideCard}>
          <img
            className="Cannot-select"
            src={showCardSrc}
            width={80}
            alt="hk_compressed"
            draggable="false"
          />
        </div>
      </Rnd>

      <Rnd
        default={{
          x: 200,
          y: 200,
        }}
        bounds={'parent'}
        onDragStart={onDragStart}
      >
        <div onClick={hideCard}>
          <img
            className="Cannot-select"
            src={showCardSrc}
            width={80}
            alt="hk_compressed"
            draggable="false"
          />
        </div>
      </Rnd>

      <Rnd
        default={{
          x: 100,
          y: 300,
        }}
        bounds={'parent'}
        onDragStart={onDragStart}
      >
        <div onClick={hideCard}>
          <img
            className="Cannot-select"
            src={showCardSrc}
            width={80}
            alt="hk_compressed"
            draggable="false"
          />
        </div>
      </Rnd>

      <Rnd
        default={{
          x: 200,
          y: 400,
        }}
        bounds={'parent'}
        onDragStart={onDragStart}
      >
        <div onClick={hideCard}>
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
  );
}

export default App;
