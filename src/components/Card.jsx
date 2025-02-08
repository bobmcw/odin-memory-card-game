function Card({pokemonName, spriteURL}){
    return(
        <div className="card">
            <img src={spriteURL} alt={pokemonName} />
            <p>{pokemonName}</p>
        </div>
    )
}
export default Card