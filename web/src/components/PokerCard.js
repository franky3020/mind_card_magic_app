import { Rnd } from "react-rnd";
import { useState } from "react";

import flod_card from "../assets/cards/flod_card.jpg";

export function PokerCard({cardLocation, cardWidth, cardImg, onCardChange = () => {}, nextClickToHideCard = false}) {

  const [showCardSrc, setShowCardSrc] = useState(cardImg);
  const [firstPressTime, setFirstPressTime] = useState(0);

  const [cardStyle, setCardStyle] = useState({});

  function runCardEffect(e) {

    if (nextClickToHideCard) {

      setCardStyle((preStyle) => {

        let newStytle = preStyle;
        if (nextClickToHideCard) {
          newStytle["display"] = "none";
        }
        
        return newStytle;
      });
      onCardChange("hide"); // 移除卡片

      return;
    }

    if (showCardSrc !== cardImg) {
      setShowCardSrc(cardImg);
      onCardChange("open");
    } else {
      setShowCardSrc(flod_card);
      onCardChange("fold");
    }
  }

  function onDragStart(e, data) {

    setCardStyle((preStyle) => {
      let newStytle = preStyle;
      newStytle["zIndex"] = 9;
      return newStytle;
    });

    changeCard();
    
  }

  function onDragStop() {
    setCardStyle((preStyle) => {
      let newStytle = preStyle;
      newStytle["zIndex"] = 0;
      console.log("franky-test newStytle:", newStytle);
      return newStytle;
    });
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
      let nowTime = new Date().getTime();
      let timeSpan = nowTime - firstPressTime;
      console.log("click: ", nowTime - firstPressTime);
      if (timeSpan < 300) {
        runCardEffect();
      }
      setFirstPressTime((x) => {
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
      onDragStop={onDragStop}
      enableResizing={false}
      style={cardStyle}
    >
      <div>
        <img
          src={showCardSrc}
          width={cardWidth}
          alt="card"
          draggable="false"
        />
      </div>
    </Rnd>
  );
}
