import { Rnd } from "react-rnd";
import { useState } from "react";

import hkCard from "../assets/cards/hk_compressed.jpg";
import cqCard from "../assets/cards/cq_compressed.jpg";

export function PokerCard({cardLocation, cardWidth}) {
  const [showCardSrc, setShowCardSrc] = useState(hkCard);

  const [clickTime, setClickTime] = useState(0);

  const [firstPressTime, setFirstPressTime] = useState(0);

  const [secondPressTime, setSecondPressTime] = useState(0);

  function hideCard(e) {
    if (showCardSrc === hkCard) {
      // TODO: 需修正成卡片背面
      setShowCardSrc(cqCard);
    }
  }

  function onDragStart(e, data) {
    changeCard();
  }
  
  function changeCard() {
    // 測試快速按兩下 才會變換卡片
    
    if (firstPressTime === 0) {
      setFirstPressTime((x) => {
        return new Date().getTime();
      });
      setTimeout(() => {
        setFirstPressTime((x) => {
          return 0;
        })
      }, 250);
    } else {
      setSecondPressTime((x) => {

        let nowTime = new Date().getTime();
        let timeSpan = nowTime - firstPressTime;
        console.log("click: ", nowTime - firstPressTime);
        if (timeSpan < 300) {
          hideCard();
        }
        return nowTime;
      })
      setFirstPressTime((x) => {
        return 0;
      })
      setSecondPressTime((x) => {
        return 0;
      })
    }
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
