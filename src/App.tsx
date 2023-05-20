import { useState } from "react";
import { ResponseAPI, MyPokemon } from "./interfaces/Pokemon";
import { ErrorTypes } from "./interfaces/ErrorTypes";
import "./App.css";

const baseUrl = "http://localhost:3000/api/";

function App(): JSX.Element {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<ErrorTypes | null>(null);
  const [pokemon, setPokemon] = useState<MyPokemon | null>(null);
  const getPokemon = async () => {
    try {
      const response = await fetch(`${baseUrl}${text.toLowerCase()}`);
      if (response.status === 200) {
        const data: ResponseAPI = await response.json();
        const myPokemon: MyPokemon = data.myPokemon;
        setPokemon(myPokemon);
        setError(null);
      } else if (response.status === 404) {
        setError(ErrorTypes.NOT_FOUND);
        setPokemon(null);
      } else if (response.status === 400) {
        setError(ErrorTypes.BAD_REQUEST);
      } else if (response.status === 500) {
        setError(ErrorTypes.SERVER_ERROR);
      }
    } catch (error) {
      setError(ErrorTypes.BAD_REQUEST);
    }
  };
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
          <button className="btn" onClick={getPokemon} type="button">
            Search
          </button>
        </section>
        {error === ErrorTypes.NOT_FOUND ? (
          <h3 className="center-text">{ErrorTypes.NOT_FOUND} 🤡</h3>
        ) : null}
        {error === ErrorTypes.BAD_REQUEST ? (
          <h3 className="center-text">{ErrorTypes.BAD_REQUEST} 🙄</h3>
        ) : null}
        {error === ErrorTypes.SERVER_ERROR ? (
          <h3 className="center-text">{ErrorTypes.SERVER_ERROR} 🧐</h3>
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
                <span className="text-center">Name:</span>
              </article>
              <article className="field-l">
                <span>{pokemon.name}</span>
              </article>
              <article className="field-d">
                <span>Types:</span>
              </article>
              <article className="field-l">
                <ul>
                  {pokemon.types.map((type: string) => (
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
      <footer className="footer">
        <p className="center-text">
          Made with love 💚
          <a
            className="link-snaky"
            href="https://github.com/SnakyDH"
            target="_blank"
          >
            @SnakyDH
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
