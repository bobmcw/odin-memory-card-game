import { useState } from "react";
import { PulseLoader } from "react-spinners";
import "../styles/Card.css";
function Card({ pokemonName, spriteURL, handleClick, pokemonId }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className="card"
      tabIndex={1}
      aria-label={"card " + pokemonName}
      onClick={() => handleClick(pokemonId)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick(pokemonId);
        }
      }}
    >
      <div className="cardInner">
        <div className="cardFront">
          {!loaded ? <PulseLoader size={8} /> : ""}
          <img
            src={spriteURL}
            alt={pokemonName}
            onLoad={() => setLoaded(true)}
          />
          <p className="name">{pokemonName}</p>
        </div>
        <div className="cardBack">
            <h1>back</h1>
        </div>
      </div>
    </div>
  );
}
export default Card;
