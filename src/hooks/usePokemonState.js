import React, {useState} from 'react';
import useLocalStorageState from './useLocalStorageState';


function usePokemonState(initialPokemon) {

    const [pokemon, setPokemon] = useLocalStorageState('tasks', initialPokemon);

    return {
        pokemon,
        getPokemon: () => {
            
        }
    };

}

export default usePokemonState;
