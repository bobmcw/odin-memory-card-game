import CardContainer from "./CardContainer";
import Menu from "./Menu";
import "../styles/App.css";
import { useState } from "react";
function App() {
  const [dif, setDif] = useState(0);
  const [gen, setGen] = useState(1);
  const [game,setGame] = useState(false);
  return (
    <>
      {game ? <CardContainer /> : <Menu startGame={setGame}/>}
    </>
  );
}

export default App;
