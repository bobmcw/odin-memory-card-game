import { useEffect, useState } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import "../styles/App.css";

function App() {
  const [count, setCount] = useState(0);
  const api = "https://pokeapi.co/api/v2/pokemon/";
  const [pokemons, setPokemons] = useState([]);
  async function getRandomPokemon() {
    try {
      const response = await fetch(api + Math.floor(Math.random() * 150));
      if (!response.ok) {
        throw new Error("response status: " + response.status);
      }
      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      console.error(error.message);
      return null
    }
  }
  useEffect(() => {
    console.log(pokemons);
  }, [pokemons]);
  return (
    <>
      <button onClick={() => getRandomPokemon()}></button>
    </>
  );
}

export default App;
