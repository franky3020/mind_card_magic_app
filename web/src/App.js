import "./App.css";
import { PokerCard } from "./components/PokerCard";
import {CardLocalCalculator} from "./service/CardLocalCalculator";

import hkCard from "./assets/cards/hk_compressed.jpg";
import skCard from "./assets/cards/sk_compressed.jpg";
import cqCard from "./assets/cards/cq_compressed.jpg";

import hjCard from "./assets/cards/hj_compressed.jpg";
import cjCard from "./assets/cards/cj_compressed.jpg";
import ckCard from "./assets/cards/ck_compressed.jpg";
import hqCard from "./assets/cards/hq_compressed.jpg";
import {useState} from "react";
import MagicManage from "./service/MagicManage";


function App() {

  let cardWidth = 120;
  
  const cardLocalCalculator = new CardLocalCalculator(851, 393, cardWidth, 112);
  const topLeftCardX = cardLocalCalculator.getLeftX();
  const topMidCardX = cardLocalCalculator.getMidX();
  const topRightCardX = cardLocalCalculator.getRightX();

  let topLineY = 20;
  let bottomLineY = 200;

  const [oneCardSrc, setOneCardSrc] = useState(hkCard);

  const [oneCardIsHide, setOneCardIsHide] = useState(false);
  const [twoCardIsHide, setTwoCardIsHide] = useState(false);
  const [threeCardIsHide, setThreeCardIsHide] = useState(false);
  const [fourCardIsHide, setFourCardIsHide] = useState(false);
  const [fiveCardIsHide, setFiveCardIsHide] = useState(false);
  const [sixCardIsHide, setSixCardIsHide] = useState(false);

  // 左上到右上 123, 左下到右下 456
  function controlLetCardChange(cardStatue, cardNumber) {

    let magicManage = MagicManage;

    if (magicManage.isHideCardMode) {
      hideCardById(cardNumber);
      magicManage.closeHideCardMode();
      setOneCardSrc(skCard);
      // 換掉其它所有卡片
      return;
    }


    if (cardStatue === "fold") {
      magicManage.addHideCard();
    } else {
      magicManage.subHideCard();
    }
  
    console.log("magicManage.count");
    console.log(magicManage.countHideCard);
    if (magicManage.countHideCard === 6) {
      magicManage.openHideCardMode();
    }
  }

  function hideCardById(cardNumber) {
    switch (cardNumber) {
      case 1:
        setOneCardIsHide(true);
        break;
      case 2:
        setTwoCardIsHide(true);
        break;
      case 3:
        setThreeCardIsHide(true);
        break;
      case 4:
        setFourCardIsHide(true);
        break;
      case 5:
        setFiveCardIsHide(true);
        break;
      case 6:
        setSixCardIsHide(true);
        break;
    }
  }

  return (
    <div className="App">
      <PokerCard cardLocation={{x: topLeftCardX, y: topLineY}}
                 cardWidth={cardWidth} cardImg={oneCardSrc} 
                 onCardChange={(cardStatue) => {controlLetCardChange(cardStatue, 1)}}
                 hideCard={oneCardIsHide} />
      <PokerCard cardLocation={{x: topMidCardX, y: topLineY}} cardWidth={cardWidth} cardImg={cqCard}
                 onCardChange={(cardStatue) => {controlLetCardChange(cardStatue, 2)}}
                 hideCard={twoCardIsHide} />
      <PokerCard cardLocation={{x: topRightCardX, y: topLineY}} cardWidth={cardWidth} cardImg={hjCard}
                 onCardChange={(cardStatue) => {controlLetCardChange(cardStatue, 3)}}
                 hideCard={threeCardIsHide}/>

      <PokerCard cardLocation={{x: topLeftCardX, y: bottomLineY}} cardWidth={cardWidth} cardImg={cjCard}
                 onCardChange={(cardStatue) => {controlLetCardChange(cardStatue, 4)}}
                 hideCard={fourCardIsHide}/>
      <PokerCard cardLocation={{x: topMidCardX, y: bottomLineY}} cardWidth={cardWidth} cardImg={ckCard}
                 onCardChange={(cardStatue) => {controlLetCardChange(cardStatue, 5)}}
                 hideCard={fiveCardIsHide}/>
      <PokerCard cardLocation={{x: topRightCardX, y: bottomLineY}} cardWidth={cardWidth} cardImg={hqCard}
                 onCardChange={(cardStatue) => {controlLetCardChange(cardStatue, 6)}}
                 hideCard={sixCardIsHide}/>
    </div>
  );
}



export default App;
