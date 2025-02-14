import { useState } from "react"
import { PulseLoader } from "react-spinners"
function Card({pokemonName, spriteURL, handleClick, pokemonId}){
    const [loaded, setLoaded] = useState(false)
    return(
        <div className="card" onClick={() => handleClick(pokemonId)}>
            {!loaded ? <PulseLoader size={8}/> : ""}
            <img src={spriteURL} alt={pokemonName} onLoad={() => setLoaded(true)}/>
            <p>{pokemonName}</p>
        </div>
    )
}
export default Card