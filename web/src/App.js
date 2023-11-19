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


function App() {

  let cardWidth = 120;
  
  // TODO: 還需偵測螢幕大小
  const cardLocalCalculator = new CardLocalCalculator(851, 393, cardWidth, 112);
  const topLeftCardX = cardLocalCalculator.getLeftX();
  const topMidCardX = cardLocalCalculator.getMidX();
  const topRightCardX = cardLocalCalculator.getRightX();

  let topLineY = 20;
  let bottomLineY = 200;

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

  // 左上到右上 123, 左下到右下 456
  function controlLetCardChange(cardStatue, cardNumber) {
    console.log("controlLetCardChange run");
    let magicManage = MagicManage;

    if (magicManage.isHideCardMode) {
      magicManage.subHideCard();
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
    } else {
      magicManage.subHideCard();
    }

    console.log("after magicManage.count");
    console.log(magicManage.countHideCard);
    
    
    if (magicManage.countHideCard === 6) {
      magicManage.openHideCardMode();
      hideCardById(1);
      hideCardById(2);
      hideCardById(3);
      hideCardById(4);
      hideCardById(5);
      hideCardById(6);
    }
  }

  function hideCardById(cardNumber) {
    switch (cardNumber) {
      case 1:
        setOneCardIsHide(() => true);
        break;
      case 2:
        setTwoCardIsHide(() => true);
        break;
      case 3:
        setThreeCardIsHide(() => true);
        break;
      case 4:
        setFourCardIsHide(() => true);
        break;
      case 5:
        setFiveCardIsHide(() => true);
        break;
      case 6:
        setSixCardIsHide(() => true);
        break;
      default:
        break;
    }
  }

  function offHideCardMode() {
    setOneCardIsHide(() => false);
    setTwoCardIsHide(() => false);
    setThreeCardIsHide(() => false);
    setFourCardIsHide(() => false);
    setFiveCardIsHide(() => false);
    setSixCardIsHide(() => false);
  }

  return (
    <div className="App">
      <PokerCard cardLocation={{x: topLeftCardX, y: topLineY}}
                 cardWidth={cardWidth} cardImg={oneCardSrc} 
                 onCardChange={(cardStatue) => {controlLetCardChange(cardStatue, 1)}}
                 nextClickToHideCard={oneCardIsHide} />
      <PokerCard cardLocation={{x: topMidCardX, y: topLineY}} cardWidth={cardWidth} cardImg={twoCardSrc}
                 onCardChange={(cardStatue) => {controlLetCardChange(cardStatue, 2)}}
                 nextClickToHideCard={twoCardIsHide} />
      <PokerCard cardLocation={{x: topRightCardX, y: topLineY}} cardWidth={cardWidth} cardImg={threeCardSrc}
                 onCardChange={(cardStatue) => {controlLetCardChange(cardStatue, 3)}}
                 nextClickToHideCard={threeCardIsHide}/>

      <PokerCard cardLocation={{x: topLeftCardX, y: bottomLineY}} cardWidth={cardWidth} cardImg={fourCardSrc}
                 onCardChange={(cardStatue) => {controlLetCardChange(cardStatue, 4)}}
                 nextClickToHideCard={fourCardIsHide}/>
      <PokerCard cardLocation={{x: topMidCardX, y: bottomLineY}} cardWidth={cardWidth} cardImg={fiveCardSrc}
                 onCardChange={(cardStatue) => {controlLetCardChange(cardStatue, 5)}}
                 nextClickToHideCard={fiveCardIsHide}/>
      <PokerCard cardLocation={{x: topRightCardX, y: bottomLineY}} cardWidth={cardWidth} cardImg={sixCardSrc}
                 onCardChange={(cardStatue) => {controlLetCardChange(cardStatue, 6)}}
                 nextClickToHideCard={sixCardIsHide}/>
    </div>
  );
}



export default App;
