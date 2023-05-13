import { useEffect, useState } from "react";
import { ResponseAPI, MyPokemon } from "./interfaces/Pokemon";
import "./App.css";

const baseUrl = "http://localhost:3000/api/";

function App(): JSX.Element {
  const [text, setText] = useState("");
  const [clicked, setClicked] = useState(false);
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const getPokemon = async () => {
      const response = await fetch(`${baseUrl}${text.toLowerCase()}`);
      if (response.status === 200) {
        const data: ResponseAPI = await response.json();
        const myPokemon: MyPokemon = data.myPokemon;
        setPokemon(myPokemon);
      } else {
        setPokemon(null);
      }
    };
    clicked ? getPokemon() : null;
  }, [clicked]);
  return (
    <>
      <header className="header">
        <h1 className="center-text">Pokemon Filter Project</h1>
      </header>
      <main className="container">
        <h2 className="center-text">Select your Favorite Pokemon</h2>
        <section className="section-form">
          <input
            className="input-text"
            onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder="Your Pokemon"
          />
          <button
            className="btn"
            onClick={() => setClicked((prev) => !prev)}
            type="button"
          >
            Search
          </button>
          {!clicked ? <span>Click Again</span> : null}
        </section>
        {pokemon === null ? (
          <h3 className="center-text">
            You have not searched for a valid Pokemon
          </h3>
        ) : null}
        {pokemon ? (
          <>
            <h2 className="center-text">Data Pokemon</h2>
            <section className="section-grid">
              <article className="field-d">
                <span>ID:</span>
              </article>
              <article className="field-l">
                <span>{pokemon.id}</span>
              </article>
              <article className="field-d">
                <span>Name:</span>
              </article>
              <article className="field-l">
                <span>{pokemon.name}</span>
              </article>
              <article className="field-d">
                <span>Types:</span>
              </article>
              <article className="field-l">
                <ul>
                  {pokemon.types.map((type: string, key: string) => (
                    <li>{type}</li>
                  ))}
                </ul>
              </article>
            </section>
            <section className="sprites">
              {pokemon.sprites.front_default ? (
                <figure>
                  <img src={pokemon.sprites.front_default} alt="" />
                  <figcaption>Default Front</figcaption>
                </figure>
              ) : null}
              {pokemon.sprites.front_female ? (
                <figure>
                  <img src={pokemon.sprites.front_female} alt="" />
                  <figcaption>Female Front</figcaption>
                </figure>
              ) : null}
              {pokemon.sprites.front_shiny ? (
                <figure>
                  <img src={pokemon.sprites.front_shiny} alt="" />
                  <figcaption>Shiny Front</figcaption>
                </figure>
              ) : null}
              {pokemon.sprites.front_shiny_female ? (
                <figure>
                  <img src={pokemon.sprites.front_shiny_female} alt="" />
                  <figcaption>Shiny Front</figcaption>
                </figure>
              ) : null}
              {pokemon.sprites.back_default ? (
                <figure>
                  <img src={pokemon.sprites.back_default} alt="" />
                  <figcaption>Default Back</figcaption>
                </figure>
              ) : null}
              {pokemon.sprites.back_female ? (
                <figure>
                  <img src={pokemon.sprites.back_female} alt="" />
                  <figcaption>Female Back</figcaption>
                </figure>
              ) : null}
              {pokemon.sprites.back_shiny ? (
                <figure>
                  <img src={pokemon.sprites.back_shiny} alt="" />
                  <figcaption>Shiny Back</figcaption>
                </figure>
              ) : null}
              {pokemon.sprites.back_shiny_female ? (
                <figure>
                  <img src={pokemon.sprites.back_shiny_female} alt="" />
                  <figcaption>Shiny Female Back</figcaption>
                </figure>
              ) : null}
            </section>
          </>
        ) : null}
      </main>
      <footer></footer>
    </>
  );
}

export default App;
