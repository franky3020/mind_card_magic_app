import { Rnd } from "react-rnd";
import { useState } from "react";

import flod_card from "../assets/cards/flod_card.jpg";
import MagicManage from "../service/MagicManage";
import { getPokerCardClipPath } from "../service/GetPokerCardConfig";
import { useRef } from 'react';
import { createNanoEvents } from 'nanoevents'

window.emitter = createNanoEvents();
const Efficient_Click_Time_Span = 400;
// tableZoom={w, h}
export function PokerCard({cardLocation, cardWidth, cardImg, tableZoom, onCardChange = () => {},
                            nextClickToHideCard = false, freezeCard = false,
                          onlyCanFoldCard = true, cardId = ""}) {


  const magicManage = MagicManage;
  const [showCardSrc, setShowCardSrc] = useState(cardImg);

  const [firstPressTime, setFirstPressTime] = useState(0);

  const clipPathSetting = getPokerCardClipPath(cardId);
  const [cardStyle, setCardStyle] = useState({"clipPath": clipPathSetting});


  const [firstTimeToZeroTimeoutIdArray, setFirstTimeToZeroTimeoutIdArray] = useState([]);

  const [cardPosition, setCardPosition] = useState({x: cardLocation.x, y: cardLocation.y});

  const cardMoveInterval = useRef(undefined);

  const isSettedStopEvent = useRef(false);
  const isSendStopEvent = useRef(false);

  const imgRef = useRef(null);


  window.emitter.on('down', () => {
    goDown();
  });

  if (isSettedStopEvent.current === false) {
    console.log("franky-test: ");
    isSettedStopEvent.current = true;
    window.emitter.on('stop', (stopCardId) => {
      console.log("call stop cardId:", stopCardId);
      removeCardMove(stopCardId);
    });
  }



  function afterDoubleClickCard(e) {

    if (freezeCard) {
      return;
    }

    if (nextClickToHideCard) {

      setCardStyle((preStyle) => {

        let newStyle = preStyle;
        if (nextClickToHideCard) {
          newStyle["animationName"] = "displayCard";
          newStyle["animationDuration"] = "2s";
          newStyle["animationFillMode"] = "forwards";

        }
        return newStyle;
      });

      onCardChange("hide"); // 移除卡片

      return;
    }

    if (showCardSrc !== cardImg) {
      setShowCardSrc(cardImg);
      const clipPathSetting = getPokerCardClipPath(cardId);
      setCardStyle((preStyle) => {
        let newStyle = preStyle;
        newStyle["clipPath"] = clipPathSetting;
        return newStyle;
      });

      onCardChange("open");
    }
  }

  function onDragStart(e, data) {

    removeCardMove(cardId);

    setCardStyle((preStyle) => {
      let newStyle = preStyle;
      magicManage.addTableCardMaxZindex();

      newStyle["display"] = cardStyle["display"];
      newStyle["zIndex"] = magicManage.tableCardMaxZindex;

      return newStyle;
    });

    if (onlyCanFoldCard) {
      setShowCardSrc(flod_card);
      setFoldCardStyle();

      onCardChange("fold");

    } else {
      changeCardWhenDoubleClick();
    }
  }

  function goDown() {

    if (typeof cardMoveInterval.current !== "undefined") {
      return;
    }

    const cardH = imgRef.current.clientHeight;


    const cardMoveIntervalId = setInterval(() => {

      setCardPosition((pred) => {
        const x = pred.x;
        const y = pred.y + 0.5;
        if (y + cardH < tableZoom.h) {
          return {x, y};
        } else {
          if (isSendStopEvent.current === false) {
            console.log("send stop");
            isSendStopEvent.current = true;
            window.emitter.emit('stop', cardId);
          }

          return {x: pred.x, y: pred.y};
        }
      });

    }, 20);
    console.log("goDown(), cardMoveIntervalId: ", cardMoveIntervalId);
    cardMoveInterval.current = cardMoveIntervalId;

  }

  function removeCardMove(stopCardId) {
    if (stopCardId !== cardId) {
      return;
    }
    if (typeof cardMoveInterval.current !== "undefined") {
      clearInterval(cardMoveInterval.current);
      cardMoveInterval.current = undefined;
    }
  }

  function setFoldCardStyle() {
    const clipPathSetting = getPokerCardClipPath("foldCard");
    setCardStyle((preStyle) => {
      let newStyle = preStyle;
      newStyle["clipPath"] = clipPathSetting;
      return newStyle;
    });
  }

  function onDragStop(e, d) {
    setCardPosition({x: d.x, y: d.y});
  }

  function changeCardWhenDoubleClick() {
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

        return [...firstTimeToZeroTimeoutIdArray, timeoutId];
      })

    } else {
      let nowTime = new Date().getTime();
      let timeSpan = nowTime - firstPressTime;
      console.log("click: ", nowTime - firstPressTime);

      clearTimeoutArray(firstTimeToZeroTimeoutIdArray);

      if (timeSpan < Efficient_Click_Time_Span) {
        afterDoubleClickCard();
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
      position={{
        x: cardPosition.x,
        y: cardPosition.y,
      }}
      bounds={"parent"}
      onDragStart={onDragStart}
      onDragStop={onDragStop}
      enableResizing={false}
      style={cardStyle}
    >
      <div>
        <img
          ref={imgRef}
          src={showCardSrc}
          width={cardWidth}
          alt="card"
          draggable="false"
        />
      </div>
    </Rnd>
  );
}
