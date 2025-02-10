function Menu({startGame}) {
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
        </select>
      </div>
      <button onClick={() => startGame(true)}>Go!</button>
    </div>
  );
}
export default Menu;
