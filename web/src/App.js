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

  return (
    <div className="App">
      <PokerCard cardLocation={{x: topLeftCardX, y: topLineY}}
                 cardWidth={cardWidth} cardImg={oneCardSrc} 
                 onCardChange={(cardStatue) => {test(cardStatue)}} />
      <PokerCard cardLocation={{x: topMidCardX, y: topLineY}} cardWidth={cardWidth} cardImg={cqCard}
                 onCardChange={(cardStatue) => {test(cardStatue)}} />
      <PokerCard cardLocation={{x: topRightCardX, y: topLineY}} cardWidth={cardWidth} cardImg={hjCard}
                 onCardChange={(cardStatue) => {test(cardStatue)}} />

      <PokerCard cardLocation={{x: topLeftCardX, y: bottomLineY}} cardWidth={cardWidth} cardImg={cjCard}
                 onCardChange={(cardStatue) => {test(cardStatue)}} />
      <PokerCard cardLocation={{x: topMidCardX, y: bottomLineY}} cardWidth={cardWidth} cardImg={ckCard}
                 onCardChange={(cardStatue) => {test(cardStatue)}} />
      <PokerCard cardLocation={{x: topRightCardX, y: bottomLineY}} cardWidth={cardWidth} cardImg={hqCard}
                 onCardChange={(cardStatue) => {test(cardStatue)}} />
    </div>
  );
}

function test(cardStatue) {
  let magicManage = MagicManage;
  if (cardStatue === "n_hide") {
    magicManage.addHideCard();
  } else {
    magicManage.subHideCard();
  }

  console.log("magicManage.count");
  console.log(magicManage.countHideCard);
}



export default App;
