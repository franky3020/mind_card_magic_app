import "./App.css";
import { PokerCard } from "./components/PokerCard";
import {CardLocalCalculator} from "./service/CardLocalCalculator";


import skCard from "./assets/cards/sk_compressed.jpg";
import hkCard from "./assets/cards/hk_compressed.jpg";
import dkCard from "./assets/cards/dk_compressed.jpg";
import ckCard from "./assets/cards/ck_compressed.jpg";

import sqCard from "./assets/cards/sq_compressed.jpg";
import hqCard from "./assets/cards/hq_compressed.jpg";
import dqCard from "./assets/cards/dq_compressed.jpg";
import cqCard from "./assets/cards/cq_compressed.jpg";

import sjCard from "./assets/cards/sj_compressed.jpg";
import hjCard from "./assets/cards/hj_compressed.jpg";
import djCard from "./assets/cards/dj_compressed.jpg";
import cjCard from "./assets/cards/cj_compressed.jpg";

import {useState} from "react";
import MagicManage from "./service/MagicManage";

const FreezeCardTimeSpan = 5000; // 蓋住6張牌後, 凍結使用者下一次消失牌的時間間隔, 防止按太快 誤觸消失卡片
function App() {

  const cardWidth = 120;
  const cardHeight = Math.floor(cardWidth * 1.375);
  
  const width = window.outerWidth;
  const height = window.outerHeight;

  console.log("width, height", width, height);

  

  const cardLocalCalculator = new CardLocalCalculator(width, height, cardWidth, cardHeight);
  const topLeftCardX = cardLocalCalculator.getLeftX();
  const topMidCardX = cardLocalCalculator.getMidX();
  const topRightCardX = cardLocalCalculator.getRightX();

  const topLineY = cardLocalCalculator.getTopY();
  const bottomLineY = cardLocalCalculator.getBottomY();

  console.log("topLineY, bottomLineY", topLineY, bottomLineY);

  const [oneCardSrc, setOneCardSrc] = useState(ckCard); // 對應 skCard
  const [twoCardSrc, setTwoCardSrc] = useState(hkCard); // 對應 dkCard
  const [threeCardSrc, setThreeCardSrc] = useState(sqCard);  // 對應 cqCard

  const [fourCardSrc, setFourCardSrc] = useState(dqCard);  // 對應 hqCard
  const [fiveCardSrc, setFiveCardSrc] = useState(sjCard); // 對應 cjCard
  const [sixCardSrc, setSixCardSrc] = useState(djCard); // 對應 hjCard

  const [oneCardIsHide, setOneCardIsHide] = useState(false);
  const [twoCardIsHide, setTwoCardIsHide] = useState(false);
  const [threeCardIsHide, setThreeCardIsHide] = useState(false);
  const [fourCardIsHide, setFourCardIsHide] = useState(false);
  const [fiveCardIsHide, setFiveCardIsHide] = useState(false);
  const [sixCardIsHide, setSixCardIsHide] = useState(false);

  const [allCardFreeze, setAllCardFreeze] = useState(false);

  // 左上到右上 123, 左下到右下 456
  function afterCardEffectRun(cardStatue, cardNumber) {
    const magicManage = MagicManage;

    if (magicManage.isHideCardMode) {
      magicManage.closeHideCardMode();
      offHideCardMode();
      // 換掉其它所有卡片
      setOneCardSrc(skCard);
      setTwoCardSrc(dkCard);
      setThreeCardSrc(cqCard);
      setFourCardSrc(hqCard);
      setFiveCardSrc(cjCard);
      setSixCardSrc(hjCard);
    }
  

    if (cardStatue === "fold") {
      magicManage.addHideCard();
    } else if (cardStatue === "open") {
      magicManage.subHideCard();
    }

    console.log("after magicManage.count");
    console.log(magicManage.countHideCard);
    
    if (magicManage.countHideCard === 6) {

      freezeAllCard();
      setTimeout(() => {
        magicManage.openHideCardMode();
        letAllCardToHideMode();
        unfreezeAllCard();
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
      <PokerCard cardLocation={{x: topLeftCardX, y: topLineY}}
                 cardWidth={cardWidth} cardImg={oneCardSrc} 
                 onCardChange={(cardStatue) => {afterCardEffectRun(cardStatue, 1)}}
                 nextClickToHideCard={oneCardIsHide} 
                 freezeCard={allCardFreeze} />
      <PokerCard cardLocation={{x: topMidCardX, y: topLineY}} cardWidth={cardWidth} cardImg={twoCardSrc}
                 onCardChange={(cardStatue) => {afterCardEffectRun(cardStatue, 2)}}
                 nextClickToHideCard={twoCardIsHide}
                 freezeCard={allCardFreeze} />
      <PokerCard cardLocation={{x: topRightCardX, y: topLineY}} cardWidth={cardWidth} cardImg={threeCardSrc}
                 onCardChange={(cardStatue) => {afterCardEffectRun(cardStatue, 3)}}
                 nextClickToHideCard={threeCardIsHide} 
                 freezeCard={allCardFreeze} />

      <PokerCard cardLocation={{x: topLeftCardX, y: bottomLineY}} cardWidth={cardWidth} cardImg={fourCardSrc}
                 onCardChange={(cardStatue) => {afterCardEffectRun(cardStatue, 4)}}
                 nextClickToHideCard={fourCardIsHide}
                 freezeCard={allCardFreeze} />
      <PokerCard cardLocation={{x: topMidCardX, y: bottomLineY}} cardWidth={cardWidth} cardImg={fiveCardSrc}
                 onCardChange={(cardStatue) => {afterCardEffectRun(cardStatue, 5)}}
                 nextClickToHideCard={fiveCardIsHide}
                 freezeCard={allCardFreeze} />
      <PokerCard cardLocation={{x: topRightCardX, y: bottomLineY}} cardWidth={cardWidth} cardImg={sixCardSrc}
                 onCardChange={(cardStatue) => {afterCardEffectRun(cardStatue, 6)}}
                 nextClickToHideCard={sixCardIsHide}
                 freezeCard={allCardFreeze} />
    </div>
  );
}



export default App;
