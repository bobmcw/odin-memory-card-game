import { useEffect, useState } from "react";
import Card from "./Card.jsx";

function CardContainer({ difficulty = 0, generation = 1, setGame }) {
  const api = "https://pokeapi.co/api/v2/pokemon/";
  const [pokemons, setPokemons] = useState([]);
  const [guessed, setGuessed] = useState([]);
  const [draw, setDraw] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  async function generatePokemons(count, rangeStart, rangeEnd) {
    let idArray = Array.from(
      { length: rangeEnd - rangeStart + 1 },
      (_, i) => i + rangeStart
    );
    idArray = shuffle(idArray);
    let promises = idArray.slice(0, count);
    promises = promises.map((num) => getPokemonWithID(num));
    const results = await Promise.all(promises);
    setPokemons(results.filter((pokemon) => pokemon !== null));
  }
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
      return null;
    }
  }
  function drawCards(count) {
    if (guessed.length == 0) {
      //if all no cards guessed already all cards will be new
      setDraw([...pokemons.slice(0, count)]);
    } else if (guessed.length < count) {
      //if guessed cards are less than total number of cards to draw take all of them and add some new ones
      setDraw(
        shuffle([...guessed].concat(pokemons.slice(0, count - guessed.length)))
      );
    } else {
      //if there are enough guessed cards to draw the selection, pick one new and fill the rest with guessed cards
      //TODO change it to randomly select between new and already guessed cards
      setDraw(shuffle([pokemons[0]].concat(guessed.slice(0, count - 1))));
    }
  }
  function handleClick(id) {
    if (pokemons.find((pokemon) => pokemon.id === id) === undefined) {
      console.log("game over!");
      setGameOver(true);
    } else {
      setGuessed((previousGuessed) => [
        ...previousGuessed,
        pokemons.find((pokemon) => pokemon.id === id),
      ]);
      setPokemons(pokemons.filter((pokemon) => pokemon.id !== id));
    }
  }
  function shuffle(arr) {
    //Fisher-Yates Shuffle
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  //on render
  useEffect(() => {
    //make this difficulty/generation dependent
    let ignore = false;
    generatePokemons(10, 1, 100).then(() => {
      if (!ignore) {
        setLoaded(true);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);
  //on guess
  useEffect(() => {
    setPokemons(shuffle(pokemons));
    drawCards(5);
    console.log(pokemons);
    console.log(guessed);
  }, [pokemons]);
  if (gameOver) {
    return (
      <>
        <h1>Game over</h1>
        <button onClick={() => setGame(false)}>play again?</button>
      </>
    );
  } else if (pokemons.length !== 0) {
    return (
      <div className="cardContainer">
        {draw.map((pokemon) => (
          <Card
            pokemonName={pokemon.species.name}
            spriteURL={pokemon.sprites.front_default}
            handleClick={handleClick}
            pokemonId={pokemon.id}
          />
        ))}
      </div>
    );
  } else if (loaded) {
    return <h1>You won!</h1>;
  } else {
    return <h1>Loading...</h1>;
  }
}
export default CardContainer;
