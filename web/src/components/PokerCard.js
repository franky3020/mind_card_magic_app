import { Rnd } from "react-rnd";
import { useState } from "react";

import flod_card from "../assets/cards/flod_card.jpg";
import MagicManage from "../service/MagicManage";

const Efficient_Click_Time_Span = 400;
export function PokerCard({cardLocation, cardWidth, cardImg, onCardChange = () => {}, nextClickToHideCard = false}) {


  const magicManage = MagicManage;

  const [showCardSrc, setShowCardSrc] = useState(cardImg);
  const [firstPressTime, setFirstPressTime] = useState(0);

  const [cardStyle, setCardStyle] = useState({});

  const [firstTimeToZeroTimeoutIdArray, setFirstTimeToZeroTimeoutIdArray] = useState([]);

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

    setCardStyle(() => {
      magicManage.addTableCardMaxZindex();
      return {
        "display": cardStyle["display"],
        "zIndex": magicManage.tableCardMaxZindex
      };
    });

    changeCard();
    
  }

  function onDragStop() {
  }
  
  function changeCard() {
    // 測試快速按兩下 才會變換卡片
    
    if (firstPressTime === 0) {
      setFirstPressTime((x) => {
        return new Date().getTime();
      });

      setFirstTimeToZeroTimeoutIdArray(() => {
        const timeoutId = setTimeout(() => {
          setFirstPressTime(() => {
            return 0;
          })
          clearTimeoutArray(firstTimeToZeroTimeoutIdArray);
        }, Efficient_Click_Time_Span);

        const result = [...firstTimeToZeroTimeoutIdArray, timeoutId];
        return result;
      })
      
    } else {
      let nowTime = new Date().getTime();
      let timeSpan = nowTime - firstPressTime;
      console.log("click: ", nowTime - firstPressTime);

      clearTimeoutArray(firstTimeToZeroTimeoutIdArray);

      if (timeSpan < Efficient_Click_Time_Span) {
        runCardEffect();
      }
      
      setFirstPressTime((x) => {
        return 0;
      })
    }
  }

  function clearTimeoutArray(timeoutIdArray) {
    timeoutIdArray.forEach(id => {
      clearTimeout(id);
    });
    setFirstTimeToZeroTimeoutIdArray(() => {
      return [];
    });
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
