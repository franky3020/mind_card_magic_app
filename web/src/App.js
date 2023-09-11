import "./App.css";
import { PokerCard } from "./components/PokerCard";

function App() {

  return (
    <div className="App">
      <PokerCard cardLocation={{x: 20, y: 20}}/>
      <PokerCard cardLocation={{x: 40, y: 40}}/>
      <PokerCard cardLocation={{x: 60, y: 60}}/>
      <PokerCard cardLocation={{x: 80, y: 80}}/>
      <PokerCard cardLocation={{x: 100, y: 100}}/>
    </div>
  );
}

export default App;
