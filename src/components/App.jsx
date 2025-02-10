import { useEffect, useState } from "react";
import Card from "./Card.jsx"
import "../styles/App.css";

function App() {
  const api = "https://pokeapi.co/api/v2/pokemon/";
  const [pokemons, setPokemons] = useState([]);
  async function getPokemonWithID(id) {
    try {
      const response = await fetch(api + id);
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
  function shuffle(arr){
      //Fisher-Yates Shuffle
      for (let i = arr.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr
  }
  async function generatePokemons(count,rangeStart,rangeEnd){
      let idArray = Array.from({length: rangeEnd - rangeStart + 1}, (_, i) => i+rangeStart)
      idArray = shuffle(idArray);
      let promises = idArray.slice(0,count);
      promises = promises.map((num) => getPokemonWithID(num));
      const results = await Promise.all(promises)
      setPokemons(results.filter(pokemon => pokemon !== null))
  }
  useEffect(() => {
    console.log(pokemons);
  }, [pokemons]);
  return (
    <>
      {pokemons.map(pokemon => <Card pokemonName={pokemon.species.name} spriteURL={pokemon.sprites.front_default} />)}
      <button onClick={() => generatePokemons(5, 1, 100)}>Go!</button>
    </>
  );
}

export default App;
