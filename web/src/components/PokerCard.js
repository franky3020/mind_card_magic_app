import { Rnd } from "react-rnd";
import { useState } from "react";

import hkCard from "../assets/cards/hk_compressed.jpg";
import cqCard from "../assets/cards/cq_compressed.jpg";

export function PokerCard({cardLocation, cardWidth, maxX, maxY}) {
  const [showCardSrc, setShowCardSrc] = useState(hkCard);

  const [clickTime, setClickTime] = useState(0);

  function hideCard(e) {
    if (showCardSrc === hkCard) {
      // TODO: 需修正成卡片背面
      setShowCardSrc(cqCard);
    }
  }

  function onDragStart(e, data) {
    showTime();
    hideCard();
  }
  
  function showTime() {
    // 需在這計算兩次按下的間隔時間 判對是否為有效
    setClickTime((x) => {
      return x + 1;
    })
    console.log("franky-showTime: ", clickTime);
  }

  return (
    <Rnd
      default={{
        x: cardLocation.x,
        y: cardLocation.y,
      }}
      bounds={"parent"}
      onDragStart={onDragStart}
      enableResizing={false}
    >
      <div>
        <img
          src={showCardSrc}
          width={cardWidth}
          alt="hk_compressed"
          draggable="false"
        />
      </div>
    </Rnd>
  );
}
