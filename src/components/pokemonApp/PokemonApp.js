import React, {useState, useEffect} from 'react';
import {v4 as uuidV4} from 'uuid';
import axios from 'axios';

function PokemonApp() {

    const [pokemonData, setPokemonData] = useState([]);
    const [currentPokemon, setCurrentPokemon] = useState(0);

    useEffect(() => {

        async function fetchPokemonData(){
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=0`);
            // console.log(JSON.stringify(response.data.results));
            setPokemonData(response.data.results);
            
        }

        fetchPokemonData();

    }, [pokemonData]);

    let pokemon = pokemonData.map((pokemon, idx) => (
        <option key={uuidV4()} value={idx}>{pokemon.name}</option>
    ));

  return (
    <div>
        <h1>Welcome to PokemonApp!!!</h1>
        <select value={currentPokemon} onChange={evt => setCurrentPokemon(evt.target.value)}>
            {/* {pokemonData.map(pokemon => (
                <option key={uuidV4}>{pokemon.name}</option>
            ))} */}
            {pokemon}
        </select>
        <h1>{pokemonData[currentPokemon].name}</h1>
    </div>
  )
}

export default PokemonApp;