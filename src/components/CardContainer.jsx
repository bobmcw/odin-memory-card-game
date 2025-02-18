import { useEffect, useState } from "react";
import Card from "./Card.jsx";
import "../styles/CardContainer.css";

function CardContainer({
  difficulty = 0,
  generation = 1,
  setGame,
  setBest,
  bestScore,
}) {
  const difficultyTable = {
    0: 5,
    1: 10,
    2: 20,
    3: 50,
  };
  const generationTable = {
    1: {
      start: 1,
      end: 151,
    },
    2: {
      start: 152,
      end: 251,
    },
    3: {
      start: 252,
      end: 386,
    },
    4: {
      start: 387,
      end: 493,
    },
    5: {
      start: 494,
      end: 649,
    },
    6: {
      start: 650,
      end: 721,
    },
    7: {
      start: 722,
      end: 809,
    },
    8: {
      start: 810,
      end: 905,
    },
    9: {
      start: 906,
      end: 1025,
    },
  };
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
      let all = [...new Set(guessed.concat(pokemons.slice(1)))];
      all = shuffle(all);
      setDraw(shuffle([pokemons[0]].concat(all.slice(0, count - 1))));
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
  function preloadImages() {
    pokemons.forEach((pokemon) => {
      const img = new Image();
      img.src = pokemon.sprites.front_default;
    });
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
    let ignore = false;
    generatePokemons(
      difficultyTable[difficulty],
      generationTable[generation].start,
      generationTable[generation].end
    ).then(() => {
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
  useEffect(() => {
    preloadImages();
  }, [loaded]);
  useEffect(() => {
    if (guessed.length > bestScore) {
      setBest(guessed.length);
    }
  }, [gameOver]);

  if (gameOver) {
    return (
      <>
        <h1 className="message">Game over</h1>
        <button className="playAgain" onClick={() => setGame(false)}>&gt; play again &lt;</button>
      </>
    );
  } else if (pokemons.length !== 0) {
    return (
      <>
        <h1 className="scoreCounter">
          score: {guessed.length} / {difficultyTable[difficulty]}
        </h1>
        <div className="cardContainer">
          {draw.map((pokemon) => (
            <Card
              pokemonName={pokemon.species.name}
              spriteURL={pokemon.sprites.front_default}
              handleClick={handleClick}
              pokemonId={pokemon.id}
              key={pokemon.id}
            />
          ))}
        </div>
      </>
    );
  } else if (loaded) {
    return (
      <>
        <h1 className="message">You won!</h1>
        <button className="playAgain" onClick={() => setGame(false)}>play again?</button>
      </>
    );
  } else {
    return <h1 className="message">Loading...</h1>;
  }
}
export default CardContainer;
