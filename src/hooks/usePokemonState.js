import React, {useState} from 'react';
import axios from 'axios';
import useLocalStorageState from './useLocalStorageState';


function usePokemonState(initialPokemonData, initialCurrentPokemonIdx, initialCurrentPokemonDetails) {

    const [pokemonData, setPokemonData] = useLocalStorageState('pokemonData', initialPokemonData);
    const [currentPokemonIdx, setCurrentPokemonIdx] = useLocalStorageState('currentPokemonIdx', initialCurrentPokemonIdx);
    const [currentPokemonDetails, setCurrentPokemonDetails] = useLocalStorageState('currentPokemonDetails', initialCurrentPokemonDetails);

    return {
        pokemon,
        getPokemonData: async () => {
            const pokemonDataResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=300&offset=0`);
            setPokemonData(pokemonDataResponse.data.results);
            window.localStorage.setItem('pokemonData', JSON.stringify(responseInitDetails.data));
            return pokemonDataResponse.data.results;
        },
        getSpecificPokemon: async (idx) => {
            const specificPokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idx + 1}`);
            setCurrentPokemonDetails(specificPokemonResponse.data);
            window.localStorage.setItem('currentPokemonDetails', JSON.stringify(specificPokemonResponse.data));
        }
    };

}

export default usePokemonState;
