import { Rnd } from "react-rnd";
import { useState } from "react";

import hkCard from "../assets/cards/hk_compressed.jpg";
import cqCard from "../assets/cards/cq_compressed.jpg";

export function PokerCard({cardLocation, cardWidth, maxX}) {
  const [showCardSrc, setShowCardSrc] = useState(hkCard);

  const [cardx, setCardx] = useState(cardLocation.x);
  const [cardy, setCardy] = useState(cardLocation.y);

  function hideCard(e) {
    if (showCardSrc === hkCard) {
      // TODO: 需修正成卡片背面
      setShowCardSrc(cqCard);
    }
  }

  function onDragStart(e, data) {
    hideCard();
    setInterval(() => {
      setCardx((x) => {
        let newPositionX = x + 1;
        if (newPositionX + cardWidth > maxX) {
          newPositionX = x;
        }

        return newPositionX;
      });
    }, 1);
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
      position={{x: cardx, y: cardy}}
    >
      <div onClick={hideCard}>
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
