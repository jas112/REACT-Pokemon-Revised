import React, {useState} from 'react';
import axios from 'axios';
import useLocalStorageState from './useLocalStorageState';


function usePokemonState(initialPokemon) {

    const [pokemon, setPokemonData] = useLocalStorageState('pokemonData', initialPokemon);

    return {
        pokemon,
        getPokemon: async () => {
            const response1 = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=300&offset=0`);
            setPokemonData(response1.data.results);
            return response1.data.results;
        }
    };

}

export default usePokemonState;
