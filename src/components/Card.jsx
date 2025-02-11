function Card({pokemonName, spriteURL, handleClick, pokemonId}){
    return(
        <div className="card" onClick={() => handleClick(pokemonId)}>
            <img src={spriteURL} alt={pokemonName} />
            <p>{pokemonName}</p>
        </div>
    )
}
export default Card