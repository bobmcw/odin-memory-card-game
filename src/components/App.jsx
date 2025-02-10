import "../styles/App.css";

function App() {
  return (
    <>
      <button onClick={() => generatePokemons(5, 1, 100)}>Go!</button>
    </>
  );
}

export default App;
