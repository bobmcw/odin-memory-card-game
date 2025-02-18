import CardContainer from "./CardContainer";
import Menu from "./Menu";
import "../styles/App.css";
import background from "../assets/background.jpg"
import { useEffect, useState } from "react";
function App() {
  const [dif, setDif] = useState(0);
  const [gen, setGen] = useState(1);
  const [game, setGame] = useState(false);
  const [best, setBest] = useState(0);
  useEffect(() => {
    const bestScore = localStorage.getItem("bestScore");
    if(bestScore != 0){
      setBest(bestScore)
    }
  },[])
  useEffect(() => {
    localStorage.setItem("bestScore", best)
  },[best])
  return (
    <div className="game" style={{backgroundImage: `url("${background}")`}}>
    <h1 className="bestScore">best score: {best}</h1>
      {game ? (
        <CardContainer setGame={setGame} difficulty={dif} generation={gen} setBest={setBest} bestScore={best} />
      ) : (
        <Menu startGame={setGame} setDif={setDif} setGen={setGen} gen={gen} dif={dif} />
      )}
    </div>
  );
}

export default App;
