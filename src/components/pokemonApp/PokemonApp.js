import React, {useState, useEffect} from 'react';
import {v4 as uuidV4} from 'uuid';
import axios from 'axios';
import PokemonDetails from '../pokemonDetails/PokemonDetails';

function PokemonApp(props) {

    const [pokemonData, setPokemonData] = useState([]);
    const [currentPokemon, setCurrentPokemon] = useState(0);
    const [currentPokemonDetails, setCurrentPokemonDetails] = useState(pokemonData[0]);

    useEffect(() => {
        async function fetchPokemonData(){
            try {
                const response1 = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=300&offset=0`);
                setPokemonData(response1.data.results);
                const response2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${0 + 1}`);
                setCurrentPokemonDetails(response2.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchPokemonData();
    },[]);

    useEffect(() => {
        async function updateCurrentPokemon(){
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${Number(currentPokemon) + 1}`);
                setCurrentPokemonDetails(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        updateCurrentPokemon();
    },[currentPokemon]);

    const handleChangeEvent = (evt) => {
        let pokemonIdx = evt.target.value;
        setCurrentPokemon(pokemonIdx);
    }

    let pokemon = pokemonData.map((pokemon, idx) => (
        <option key={uuidV4()} value={idx}>{pokemon.name}</option>
    ));

  return (
    <div>
        <h1>Welcome to PokemonApp!!!</h1>
        <select value={currentPokemon} onChange={handleChangeEvent}>
            {pokemon}
        </select>
        {currentPokemonDetails ? <PokemonDetails pokemonIdx={currentPokemon} pokemon={currentPokemonDetails} /> : null}
    </div>
  )
}

export default PokemonApp;