import "../App.css";
import { PokerCard } from "../components/PokerCard";
import { CardLocalCalculator } from "../service/CardLocalCalculator";

import { skCardInfo } from "../service/GetPokerCardConfig";
import { hkCardInfo } from "../service/GetPokerCardConfig";
import { dkCardInfo } from "../service/GetPokerCardConfig";
import { ckCardInfo } from "../service/GetPokerCardConfig";

import { sqCardInfo } from "../service/GetPokerCardConfig";
import { hqCardInfo } from "../service/GetPokerCardConfig";
import { dqCardInfo } from "../service/GetPokerCardConfig";
import { cqCardInfo } from "../service/GetPokerCardConfig";

import { sjCardInfo } from "../service/GetPokerCardConfig";
import { hjCardInfo } from "../service/GetPokerCardConfig";
import { djCardInfo } from "../service/GetPokerCardConfig";
import { cjCardInfo } from "../service/GetPokerCardConfig";

import { useState, useEffect } from "react";
import MagicManage from "../service/MagicManage";
import debounce from "debounce";

const FreezeCardTimeSpan = 3000; // 蓋住6張牌後, 凍結使用者下一次消失牌的時間間隔, 防止按太快 誤觸消失卡片

export function MindMagicPage() {
  const width = window.outerWidth;
  const height = window.outerHeight;

  const cardHeight = Math.floor(height * 0.41); // 根據裝置高, 設定卡片高度
  const cardWidth = Math.floor(cardHeight / 1.375);

  console.log("width, height", width, height);

  const cardLocalCalculator = new CardLocalCalculator(
    width,
    height,
    cardWidth,
    cardHeight
  );
  const topLeftCardX = cardLocalCalculator.getLeftX();
  const topMidCardX = cardLocalCalculator.getMidX();
  const topRightCardX = cardLocalCalculator.getRightX();

  const topLineY = cardLocalCalculator.getTopY();
  const bottomLineY = cardLocalCalculator.getBottomY();

  console.log("topLineY, bottomLineY", topLineY, bottomLineY);

  const [oneCardSrc, setOneCardSrc] = useState(ckCardInfo); // 對應 skCard
  const [twoCardSrc, setTwoCardSrc] = useState(hkCardInfo); // 對應 dkCard
  const [threeCardSrc, setThreeCardSrc] = useState(sqCardInfo); // 對應 cqCard

  const [fourCardSrc, setFourCardSrc] = useState(dqCardInfo); // 對應 hqCard
  const [fiveCardSrc, setFiveCardSrc] = useState(sjCardInfo); // 對應 cjCard
  const [sixCardSrc, setSixCardSrc] = useState(djCardInfo); // 對應 hjCard

  const [oneCardIsHide, setOneCardIsHide] = useState(false);
  const [twoCardIsHide, setTwoCardIsHide] = useState(false);
  const [threeCardIsHide, setThreeCardIsHide] = useState(false);
  const [fourCardIsHide, setFourCardIsHide] = useState(false);
  const [fiveCardIsHide, setFiveCardIsHide] = useState(false);
  const [sixCardIsHide, setSixCardIsHide] = useState(false);

  const [allCardFreeze, setAllCardFreeze] = useState(false);
  const [onlyCanFoldCard, setOnlyCanFoldCard] = useState(true);

  const [deviceXYZ, setDeviceXYZ] = useState({ x: 0, y: 0, z: 0 });

  const [isCanShowDeviceXYZ, setIsCanShowDeviceXYZ] = useState(true);
  console.log(navigator);
  console.log(navigator.accelerometer);

  useEffect(() => {
    console.log("run useEffect: add devicemotion");
    window.addEventListener("devicemotion", processEvent, true);
    function processEvent(event) {
      let accelerationX = event.acceleration.x;
      let accelerationY = event.acceleration.y;
      let accelerationZ = event.acceleration.z;

      if (isCanShowDeviceXYZ) {
        console.log("run devicemotion:");
        console.log("x:", accelerationX);
        console.log("y:", accelerationY);
        console.log("z:", accelerationZ);
        setDeviceXYZ({ x: accelerationX, y: accelerationY, z: accelerationZ });
        setIsCanShowDeviceXYZ(false);
        setTimeout(() => {
          setIsCanShowDeviceXYZ(true);
        }, 1000);
      }
    }
    return () => {
      // remove the event listener
      console.log("remove devicemotion");
      window.removeEventListener("devicemotion", processEvent);
    };
  }, []);

  // 左上到右上 123, 左下到右下 456
  function afterCardEffectRun(cardStatue, cardNumber) {
    const magicManage = MagicManage;

    if (cardStatue === "fold") {
      magicManage.addHideCard(cardNumber);
    } else if (cardStatue === "open") {
      magicManage.subHideCard(cardNumber);
    } else if (cardStatue === "hide") {
      magicManage.subHideCard(cardNumber);
      offHideCardMode();

      freezeAllCard();
      console.log("After hide card so freezeAllCard a while");
      setTimeout(() => {
        unfreezeAllCard();
        console.log("UnfreezeAllCard");
      }, FreezeCardTimeSpan);
    }

    if (magicManage.isAllCardFold()) {
      freezeAllCard();
      setOnlyCanFoldCard(false);

      setOneCardSrc(skCardInfo);
      setTwoCardSrc(dkCardInfo);
      setThreeCardSrc(cqCardInfo);
      setFourCardSrc(hqCardInfo);
      setFiveCardSrc(cjCardInfo);
      setSixCardSrc(hjCardInfo);

      setTimeout(() => {
        letAllCardToHideMode();
        unfreezeAllCard();
        console.log("unfreezeAllCard");
      }, FreezeCardTimeSpan);
    }
  }

  function letAllCardToHideMode() {
    setOneCardIsHide(() => true);
    setTwoCardIsHide(() => true);
    setThreeCardIsHide(() => true);
    setFourCardIsHide(() => true);
    setFiveCardIsHide(() => true);
    setSixCardIsHide(() => true);
  }

  function offHideCardMode() {
    setOneCardIsHide(() => false);
    setTwoCardIsHide(() => false);
    setThreeCardIsHide(() => false);
    setFourCardIsHide(() => false);
    setFiveCardIsHide(() => false);
    setSixCardIsHide(() => false);
  }

  function freezeAllCard() {
    setAllCardFreeze(true);
  }

  function unfreezeAllCard() {
    setAllCardFreeze(false);
  }

  return (
    <div className="App">
      <p>xxxx</p>
      <p>xxxx</p>
      <p className="color-white">===== {deviceXYZ.x}</p>
      <p className="color-white">===== {deviceXYZ.y}</p>
      <p className="color-white">===== {deviceXYZ.z}</p>
      <PokerCard
        cardLocation={{ x: topLeftCardX, y: topLineY }}
        cardWidth={cardWidth}
        cardImg={oneCardSrc.img}
        tableZoom={{ w: width, h: height }}
        onCardChange={(cardStatue) => {
          afterCardEffectRun(cardStatue, 1);
        }}
        nextClickToHideCard={oneCardIsHide}
        freezeCard={allCardFreeze}
        onlyCanFoldCard={onlyCanFoldCard}
        cardId={oneCardSrc.cardId}
      />

      <PokerCard
        cardLocation={{ x: topMidCardX, y: topLineY }}
        cardWidth={cardWidth}
        cardImg={twoCardSrc.img}
        tableZoom={{ w: width, h: height }}
        onCardChange={(cardStatue) => {
          afterCardEffectRun(cardStatue, 2);
        }}
        nextClickToHideCard={twoCardIsHide}
        freezeCard={allCardFreeze}
        onlyCanFoldCard={onlyCanFoldCard}
        cardId={twoCardSrc.cardId}
      />

      <PokerCard
        cardLocation={{ x: topRightCardX, y: topLineY }}
        cardWidth={cardWidth}
        cardImg={threeCardSrc.img}
        tableZoom={{ w: width, h: height }}
        onCardChange={(cardStatue) => {
          afterCardEffectRun(cardStatue, 3);
        }}
        nextClickToHideCard={threeCardIsHide}
        freezeCard={allCardFreeze}
        onlyCanFoldCard={onlyCanFoldCard}
        cardId={threeCardSrc.cardId}
      />

      <PokerCard
        cardLocation={{ x: topLeftCardX, y: bottomLineY }}
        cardWidth={cardWidth}
        cardImg={fourCardSrc.img}
        tableZoom={{ w: width, h: height }}
        onCardChange={(cardStatue) => {
          afterCardEffectRun(cardStatue, 4);
        }}
        nextClickToHideCard={fourCardIsHide}
        freezeCard={allCardFreeze}
        onlyCanFoldCard={onlyCanFoldCard}
        cardId={fourCardSrc.cardId}
      />

      <PokerCard
        cardLocation={{ x: topMidCardX, y: bottomLineY }}
        cardWidth={cardWidth}
        cardImg={fiveCardSrc.img}
        tableZoom={{ w: width, h: height }}
        onCardChange={(cardStatue) => {
          afterCardEffectRun(cardStatue, 5);
        }}
        nextClickToHideCard={fiveCardIsHide}
        freezeCard={allCardFreeze}
        onlyCanFoldCard={onlyCanFoldCard}
        cardId={fiveCardSrc.cardId}
      />

      <PokerCard
        cardLocation={{ x: topRightCardX, y: bottomLineY }}
        cardWidth={cardWidth}
        cardImg={sixCardSrc.img}
        tableZoom={{ w: width, h: height }}
        onCardChange={(cardStatue) => {
          afterCardEffectRun(cardStatue, 6);
        }}
        nextClickToHideCard={sixCardIsHide}
        freezeCard={allCardFreeze}
        onlyCanFoldCard={onlyCanFoldCard}
        cardId={sixCardSrc.cardId}
      />
    </div>
  );
}
