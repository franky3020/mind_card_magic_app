import "./App.css";
import { PokerCard } from "./components/PokerCard";
import {CardLocalCalculator} from "./service/CardLocalCalculator";

function App() {

  const cardLocalCalculator = new CardLocalCalculator(851, 393, 80, 112);
  const topLeftCardX = cardLocalCalculator.getLeftX();
  const topMidCardX = cardLocalCalculator.getMidX();
  const topRightCardX = cardLocalCalculator.getRightX();
  
  return (
    <div className="App">
      <PokerCard cardLocation={{x: topLeftCardX, y: 80}}/>
      <PokerCard cardLocation={{x: topMidCardX, y: 80}}/>
      <PokerCard cardLocation={{x: topRightCardX, y: 80}}/>
    </div>
  );
}

export default App;
