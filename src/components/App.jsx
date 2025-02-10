import CardContainer from "./CardContainer";
import "../styles/App.css";
import { useState } from "react";
function App() {
  const [dif, setDif] = useState(0);
  const [gen, setGen] = useState(1);
  const [game,setGame] = useState(false);
  return (
    <>
      <div className="selectItem">
        <label htmlFor="difficulty">difficulty</label>
        <select name="difficulty" id="difficulty" onChange={(e) => setDif(e.target.value)}>
          <option value="0">easy</option>
          <option value="1">medium</option>
          <option value="2">hard</option>
        </select>
      </div>
      <div className="selectItem">
        <label htmlFor="generation">generation</label>
        <select name="generation" id="generation" onChange={(e) => setGen(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </div>
      { game ? "" : <button onClick={() => setGame(true)}>Go!</button>}
      {game ? <CardContainer /> : ""}
    </>
  );
}

export default App;
