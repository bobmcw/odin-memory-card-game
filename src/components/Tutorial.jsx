import "../styles/Tutorial.css";
function Tutorial() {
  return (
    <div className="screenCover hidden">
        <div className="tutorial">
          <button className="close" onClick={()=>{
            document.querySelector(".screenCover").classList.add("hidden")
          }}>X</button>
          <h1>Tutorial</h1>
          <p>
            Welcome to pokemon memory game! <br/>
            After choosing difficulty and generation
            you will be presented with cards showing you different pokemons. Your
            objective is to reach the point goal, but click each pokemon only once.
            Clicking on a pokemon you clicked already will result in a game over. <br/>
            Have fun!
          </p>
        </div>
    </div>
  );
}
export default Tutorial;
