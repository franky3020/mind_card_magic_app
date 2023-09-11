import { Rnd } from "react-rnd";
import { useState } from "react";

import hkCard from "../assets/cards/hk_compressed.jpg";
import cqCard from "../assets/cards/cq_compressed.jpg";

export function PokerCard({cardLocation}) {
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
    <Rnd
      default={{
        x: cardLocation.x,
        y: cardLocation.y,
      }}
      bounds={"parent"}
      onDragStart={onDragStart}
      enableResizing={false}
    >
      <div onClick={hideCard}>
        <img
          src={showCardSrc}
          width={120}
          alt="hk_compressed"
          draggable="false"
        />
      </div>
    </Rnd>
  );
}
