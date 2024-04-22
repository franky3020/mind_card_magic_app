import "../App.css";
import { PokerCard } from "../components/PokerCard";
import { ReminderDialog } from "../components/ReminderDialog";
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
import backIcon from "../assets/back.png";


const FreezeCardTimeSpan = 3000; // 蓋住6張牌後, 凍結使用者下一次消失牌的時間間隔, 防止按太快 誤觸消失卡片
const FreezeCardForHideTimeSpan = 6000; // 蓋住6張牌後, 凍結使用者下一次消失牌的時間間隔, 防止按太快 誤觸消失卡片

// 把 加速度感應關閉 因為還正在開發中
const devOpenDevicemotionFeature = false;

export function MindMagicPage() {

  const width = window.outerWidth;
  const height = window.outerHeight;

  // 如過調整以下比例 則 zoomOutCard class 的比例也要調整
  const cardHeight = Math.floor(height * 0.41); // 根據裝置高, 設定卡片高度
  const cardWidth = Math.floor(cardHeight / 1.375); // 等同 29.81% 的 高

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

  const [oneCardSrc, setOneCardSrc] = useState(ckCardInfo); // 對應 skCard // 左上
  const [twoCardSrc, setTwoCardSrc] = useState(djCardInfo); // 對應 hjCard // 中上
  const [threeCardSrc, setThreeCardSrc] = useState(sqCardInfo); // 對應 cqCard // 右上
  const [fourCardSrc, setFourCardSrc] = useState(dqCardInfo); // 對應 hqCard // 左下
  const [fiveCardSrc, setFiveCardSrc] = useState(hkCardInfo); // 對應 dkCard // 中下
  const [sixCardSrc, setSixCardSrc] = useState(sjCardInfo); // 對應 cjCard   // 右下

  const [oneCardIsHide, setOneCardIsHide] = useState(false);
  const [twoCardIsHide, setTwoCardIsHide] = useState(false);
  const [threeCardIsHide, setThreeCardIsHide] = useState(false);
  const [fourCardIsHide, setFourCardIsHide] = useState(false);
  const [fiveCardIsHide, setFiveCardIsHide] = useState(false);
  const [sixCardIsHide, setSixCardIsHide] = useState(false);

  const [allCardFreeze, setAllCardFreeze] = useState(false);
  const [onlyCanFoldCard, setOnlyCanFoldCard] = useState(true);

  const [isGoHomeDialogOpen, setIsGoHomeDialogOpen] = useState(false);

  useEffect(() => {
    console.log("showState");
    MagicManage.showState()
    if (devOpenDevicemotionFeature) {
      console.log("run useEffect: add devicemotion");
      window.addEventListener("devicemotion", processEvent, true);
      function processEvent(event) {
        let accelerationX = event.acceleration.x;
        let accelerationY = event.acceleration.y;
        let accelerationZ = event.acceleration.z;
        console.log("run devicemotion:");
        console.log("x:", accelerationX);
        console.log("y:", accelerationY);
        console.log("z:", accelerationZ);
      }
      return () => {
        // remove the event listener
        console.log("remove devicemotion");
        window.removeEventListener("devicemotion", processEvent);
      };
    }
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
      }, FreezeCardForHideTimeSpan);
    }

    if (magicManage.isAllCardFold()) {
      freezeAllCard();
      setOnlyCanFoldCard(false);

      setOneCardSrc(skCardInfo);
      setTwoCardSrc(hjCardInfo);
      setThreeCardSrc(cqCardInfo);
      setFourCardSrc(hqCardInfo);
      setFiveCardSrc(dkCardInfo);
      setSixCardSrc(cjCardInfo);

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

  function openGoHomeDialog() {
    setIsGoHomeDialogOpen(true);
  }

  const dialogStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '2147483647'
  };

  return (
    <div className="App">
      {/* <Link to="/"> */}
        <img src={backIcon} onClick={openGoHomeDialog} alt='backIcon' className="TAIL-absolute TAIL-top-3 TAIL-left-3 TAIL-w-12"/>
      {/* </Link> */}

      {
        isGoHomeDialogOpen &&
        <div style={dialogStyle} >
          <ReminderDialog title='Exit?' message='You will stop this magic and exit'
          confirmUrl='/' noFunc={() => {setIsGoHomeDialogOpen(false);}}></ReminderDialog>
        </div>
      }


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
