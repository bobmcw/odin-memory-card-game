import { useState } from "react"
import { PulseLoader } from "react-spinners"
import "../styles/Card.css"
function Card({pokemonName, spriteURL, handleClick, pokemonId}){
    const [loaded, setLoaded] = useState(false)
    return(
        <div className="card" tabIndex={1} aria-label={"card " + pokemonName} onClick={() => handleClick(pokemonId)}>
            {!loaded ? <PulseLoader size={8}/> : ""}
            <img src={spriteURL} alt={pokemonName} onLoad={() => setLoaded(true)}/>
            <p className="name">{pokemonName}</p>
        </div>
    )
}
export default Card