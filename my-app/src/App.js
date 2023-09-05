import "./App.css";
import { Rnd } from "react-rnd";
import { useState } from "react";

import hkCard from "./assets/cards/hk_compressed.jpg";

import cqCard from "./assets/cards/cq_compressed.jpg";

function App() {
  const [showCardSrc, setShowCardSrc] = useState(hkCard);

  const [cardx, setCardx] = useState(100);
  const [cardy, setCardy] = useState(200);

  function hideCard(e) {
    if (showCardSrc === hkCard) {
      // TODO: 需修正成卡片背面
      setShowCardSrc(cqCard);
    }
  }

  function onDragStart(e, data) {
    hideCard();
    // setInterval(() => {
    //   setCardx(cardx => cardx + 20);
    //   setCardy(cardy => cardy + 20);
    // }, 500);

    // position={{ x: cardx, y: cardy }}
  }

  return (
    <div className="App">
      <Rnd
        default={{
          x: 100,
          y: 100,
        }}
        bounds={"parent"}
        onDragStart={onDragStart}
        enableResizing={false}
      >
        <div onClick={hideCard}>
          <img
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
