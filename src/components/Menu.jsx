import '../styles/Menu.css'
function Menu({startGame, setGen, setDif}) {
  return (
    <div className="menu">
      <div className="selectItem">
        <label htmlFor="difficulty">difficulty</label>
        <select
          name="difficulty"
          id="difficulty"
          onChange={(e) => setDif(e.target.value)}
        >
          <option value="0">easy</option>
          <option value="1">medium</option>
          <option value="2">hard</option>
        </select>
      </div>
      <div className="selectItem">
        <label htmlFor="generation">generation</label>
        <select
          name="generation"
          id="generation"
          onChange={(e) => setGen(e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
      </div>
      <button className='go' onClick={() => startGame(true)}>Go!</button>
    </div>
  );
}
export default Menu;
