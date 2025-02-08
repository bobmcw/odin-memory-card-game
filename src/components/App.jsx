import { useEffect, useState } from "react";
import Card from "./Card.jsx"
import "../styles/App.css";

function App() {
  const [count, setCount] = useState(5);
  const api = "https://pokeapi.co/api/v2/pokemon/";
  const [pokemons, setPokemons] = useState([]);
  async function getRandomPokemon() {
    try {
      const response = await fetch(api + Math.floor(Math.random() * 150));
      if (!response.ok) {
        throw new Error("response status: " + response.status);
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error.message);
      return null
    }
  }
  async function generatePokemons(){
      const promises = Array.from({length: count}, getRandomPokemon)
      const results = await Promise.all(promises)
      setPokemons(results.filter(pokemon => pokemon !== null))
  }
  useEffect(() => {
    console.log(pokemons);
  }, [pokemons]);
  return (
    <>
      {pokemons.map(pokemon => <Card pokemonName={pokemon.species.name} spriteURL={pokemon.sprites.back_default} />)}
      <button onClick={() => generatePokemons()}>Go!</button>
    </>
  );
}

export default App;
