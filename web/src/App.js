import "./App.css";
import { PokerCard } from "./components/PokerCard";
import {CardLocalCalculator} from "./service/CardLocalCalculator";

function App() {

  const cardLocalCalculator = new CardLocalCalculator(851, 393, 120, 112);
  const topLeftCardX = cardLocalCalculator.getLeftX();
  const topMidCardX = cardLocalCalculator.getMidX();
  const topRightCardX = cardLocalCalculator.getRightX();
  
  
  
  return (
    <div className="App">
      <PokerCard cardLocation={{x: topLeftCardX, y: 20}} cardWidth={120} maxX={851}/>
      {/* <PokerCard cardLocation={{x: topMidCardX, y: 20}}/>
      <PokerCard cardLocation={{x: topRightCardX, y: 20}}/>

      <PokerCard cardLocation={{x: topLeftCardX, y: 200}}/>
      <PokerCard cardLocation={{x: topMidCardX, y: 200}}/>
      <PokerCard cardLocation={{x: topRightCardX, y: 200}}/> */}
    </div>
  );
}

export default App;
